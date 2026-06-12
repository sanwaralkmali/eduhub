import { createClient } from "@supabase/supabase-js";

/**
 * Service-role Supabase client — SERVER ONLY (CLAUDE.md Pattern 6 exception).
 * Bypasses Row Level Security, so it must only run inside authenticated admin
 * code paths (behind the /admin gate). Never import this from a Client Component.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}
