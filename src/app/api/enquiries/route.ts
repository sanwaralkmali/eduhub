import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { enquiryInputSchema } from "@/lib/enquiries/schema";
import { notifyNewEnquiry } from "@/lib/enquiries/notify";

// Best-effort, in-memory rate limit. NOTE: this state lives per serverless
// instance and resets on cold start, so it blunts a naive flood from one source
// but is NOT a substitute for a shared store (Vercel KV / Upstash) for
// production-grade limiting. See ROADMAP Phase 7 ("Spam hardening").
const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const recentHits = new Map<string, number[]>();

function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  if (!xff) return "unknown";
  const first = xff.split(",")[0];
  return first ? first.trim() : "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW_MS;
  const hits = (recentHits.get(ip) ?? []).filter((t) => t > windowStart);
  hits.push(now);
  recentHits.set(ip, hits);
  // Bound memory: occasionally drop IPs whose hits have all aged out.
  if (recentHits.size > 5000) {
    for (const [key, times] of recentHits) {
      if (times.every((t) => t <= windowStart)) recentHits.delete(key);
    }
  }
  return hits.length > RATE_LIMIT_MAX;
}

/**
 * POST /api/enquiries — public enquiry submission (CLAUDE.md Pattern 6).
 * Intentionally has no auth gate: the `enquiries` RLS policy allows anon INSERT.
 * Validates with Zod, returns a typed { data, error }, never throws unhandled.
 */
export async function POST(request: Request) {
  // Abuse control: best-effort per-IP rate limit (see note above).
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json({ data: null, error: "rate_limited" }, { status: 429 });
  }

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

  // Honeypot: the form's hidden `company` field must stay empty. A filled value
  // means a bot, so we mimic success without persisting or notifying (matching the
  // client-side trap) rather than reveal the check.
  if (input.company) {
    return NextResponse.json({ data: { ok: true, persisted: false }, error: null }, { status: 200 });
  }

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

    // Notify the team (email + an interim WhatsApp reply link). No-op without
    // RESEND_API_KEY, and swallows its own errors, so a notification failure can
    // never fail the enquiry that was already saved.
    await notifyNewEnquiry(input);

    return NextResponse.json({ data: { ok: true, persisted: true }, error: null }, { status: 201 });
  } catch {
    return NextResponse.json({ data: null, error: "server_error" }, { status: 500 });
  }
}
