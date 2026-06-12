import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * Supabase client for Server Components, Route Handlers, and Server Actions.
 * Cookie-aware — use for anything that reads the signed-in user or mutates data.
 * CLAUDE.md Pattern 3 — never import from `@supabase/supabase-js` in page code.
 */
export function createServerClient() {
  const cookieStore = cookies();

  return createSupabaseServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options),
          );
        } catch {
          // `setAll` was called from a Server Component. This can be ignored
          // when middleware refreshes the user session.
        }
      },
    },
  });
}

/**
 * Cookie-less anonymous client for PUBLIC, cacheable reads (catalogue, etc.).
 * It reads only what RLS exposes to `anon` and — because it touches no cookies —
 * lets the calling page stay statically rendered / ISR-cached and avoids calling
 * `cookies()` at build time. Use createServerClient() whenever you need the
 * signed-in user or you are writing data.
 */
export function createReadClient() {
  return createSupabaseServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return [];
      },
      setAll() {
        /* no-op: this client never writes auth cookies */
      },
    },
  });
}
