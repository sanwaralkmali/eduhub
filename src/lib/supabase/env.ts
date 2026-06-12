/**
 * True only when real Supabase credentials are present (not the .env.local.example
 * placeholders). Used to decide between live queries and the seed/dev fallbacks.
 */
export function isSupabaseConfigured(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return Boolean(url && key && !url.includes("your-project") && !key.includes("your-"));
}
