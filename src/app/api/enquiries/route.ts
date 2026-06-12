import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { enquiryInputSchema } from "@/lib/enquiries/schema";

/**
 * POST /api/enquiries — public enquiry submission (CLAUDE.md Pattern 6).
 * Intentionally has no auth gate: the `enquiries` RLS policy allows anon INSERT.
 * Validates with Zod, returns a typed { data, error }, never throws unhandled.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ data: null, error: "invalid_json" }, { status: 400 });
  }

  const parsed = enquiryInputSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { data: null, error: "validation", issues: parsed.error.flatten().fieldErrors },
      { status: 422 },
    );
  }
  const input = parsed.data;

  // Dev / seed mode: no database configured. Accept the enquiry without persisting
  // so the form works end-to-end, matching the catalogue's seed-fallback behaviour.
  if (!isSupabaseConfigured()) {
    return NextResponse.json({ data: { ok: true, persisted: false }, error: null }, { status: 200 });
  }

  try {
    const supabase = createServerClient();
    const { error } = await supabase.from("enquiries").insert({
      name: input.name,
      school: input.school || null,
      email: input.email,
      phone: input.phone || null,
      message: input.message,
      item_id: input.itemId ?? null,
      category_slug: input.categorySlug ?? null,
    });

    if (error) {
      return NextResponse.json({ data: null, error: "insert_failed" }, { status: 502 });
    }
    return NextResponse.json({ data: { ok: true, persisted: true }, error: null }, { status: 201 });
  } catch {
    return NextResponse.json({ data: null, error: "server_error" }, { status: 500 });
  }
}
