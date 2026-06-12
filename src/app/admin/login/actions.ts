"use server";

import { headers } from "next/headers";
import { createServerClient } from "@/lib/supabase/server";
import { isAdminDemoMode, isAdminEmail } from "@/lib/auth/admin";

/**
 * Emails a magic sign-in link — but only to allow-listed admins. To avoid email
 * enumeration we always report success regardless of whether a link was sent.
 */
export async function sendMagicLink(email: string): Promise<{ ok: true }> {
  const clean = email.trim().toLowerCase();

  if (isAdminDemoMode() || !isAdminEmail(clean)) {
    return { ok: true };
  }

  const origin = headers().get("origin") ?? process.env.NEXT_PUBLIC_SITE_URL ?? "";
  const supabase = createServerClient();
  await supabase.auth.signInWithOtp({
    email: clean,
    options: { emailRedirectTo: `${origin}/admin/auth/callback` },
  });

  return { ok: true };
}
