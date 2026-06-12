import { redirect } from "next/navigation";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export interface AdminUser {
  email: string;
  demo: boolean;
}

/**
 * Demo admin is DEV-ONLY and only when Supabase isn't configured — so the panel
 * is previewable locally over sample data. It is never unlocked in production.
 */
export function isAdminDemoMode(): boolean {
  return process.env.NODE_ENV !== "production" && !isSupabaseConfigured();
}

function adminEmails(): string[] {
  return (process.env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

/** An email is an admin only if it appears in the ADMIN_EMAILS allowlist. */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  const list = adminEmails();
  return list.length > 0 && list.includes(email.trim().toLowerCase());
}

export async function getAdminUser(): Promise<AdminUser | null> {
  if (isAdminDemoMode()) return { email: "demo@edu-hub.local", demo: true };

  const supabase = createServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email || !isAdminEmail(user.email)) return null;
  return { email: user.email, demo: false };
}

/** Use in protected server components/layouts — redirects to login if not an admin. */
export async function requireAdmin(): Promise<AdminUser> {
  const user = await getAdminUser();
  if (!user) redirect("/admin/login");
  return user;
}
