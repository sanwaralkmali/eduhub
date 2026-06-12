"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";
import { getAdminUser } from "@/lib/auth/admin";
import type { EnquiryStatus } from "@/lib/admin/types";

export type ActionResult = { ok: true } | { ok: false; error: string };

const STATUSES: readonly EnquiryStatus[] = ["new", "contacted", "closed"];

/** Server actions are their own endpoints — re-check admin here, not just in the page gate. */
async function isAdmin(): Promise<boolean> {
  const user = await getAdminUser();
  return Boolean(user && !user.demo);
}

export async function updateEnquiryStatus(
  id: string,
  status: EnquiryStatus,
): Promise<ActionResult> {
  if (!(await isAdmin())) return { ok: false, error: "unauthorized" };
  if (!id || !STATUSES.includes(status)) return { ok: false, error: "validation" };
  try {
    const supabase = createAdminClient();
    const { error } = await supabase.from("enquiries").update({ status }).eq("id", id);
    if (error) return { ok: false, error: "update_failed" };
  } catch {
    return { ok: false, error: "server_error" };
  }
  // Refresh the inbox and the dashboard (its "new enquiries" stat depends on status).
  revalidatePath("/admin/enquiries");
  revalidatePath("/admin");
  return { ok: true };
}
