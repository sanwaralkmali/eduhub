import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";

/**
 * Supabase client for Client Components.
 * CLAUDE.md Pattern 3 — never import from `@supabase/supabase-js` in page code.
 */
export function createBrowserClient() {
  return createSupabaseBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
