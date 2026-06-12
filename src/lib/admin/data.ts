import { createAdminClient } from "@/lib/supabase/admin";
import { isAdminDemoMode } from "@/lib/auth/admin";
import { getAllItems } from "@/lib/catalogue/data";
import { SAMPLE_ENQUIRIES } from "./seed";
import type { EnquiryRow } from "./types";

const ENQUIRY_COLUMNS =
  "id, name, school, email, phone, message, item_id, category_slug, status, created_at";

export async function getEnquiries(): Promise<EnquiryRow[]> {
  if (isAdminDemoMode()) {
    return [...SAMPLE_ENQUIRIES].sort((a, b) => b.created_at.localeCompare(a.created_at));
  }

  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("enquiries")
      .select(ENQUIRY_COLUMNS)
      .order("created_at", { ascending: false });
    if (error) throw error;
    return (data ?? []) as EnquiryRow[];
  } catch {
    return [];
  }
}

export interface AdminStats {
  totalEnquiries: number;
  newEnquiries: number;
  catalogueItems: number;
}

export async function getAdminStats(): Promise<AdminStats> {
  const [enquiries, items] = await Promise.all([getEnquiries(), getAllItems()]);
  return {
    totalEnquiries: enquiries.length,
    newEnquiries: enquiries.filter((e) => e.status === "new").length,
    catalogueItems: items.length,
  };
}
