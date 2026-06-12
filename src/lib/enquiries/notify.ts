import type { EnquiryInput } from "./schema";
import { SITE } from "@/lib/site/config";

// Phase 7 — notify the team when a new enquiry is submitted.
// Sends via Resend's HTTP API (no SDK dependency). Disabled (safe no-op) until
// RESEND_API_KEY is set, so the contact form keeps working without it.

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/** Where alerts land. Defaults to the team inbox. */
const NOTIFY_TO = process.env.ENQUIRY_NOTIFY_TO ?? SITE.email;

/**
 * Sender address. On Resend's free tier (no verified domain) the only working
 * `from` is "onboarding@resend.dev", and it delivers ONLY to the Resend
 * account's own email — which is why NOTIFY_TO must be that same address until a
 * domain is verified. After verifying a domain, set ENQUIRY_NOTIFY_FROM to e.g.
 * "Eduhub <hello@yourdomain>" and you can also notify/auto-ack any address.
 */
const NOTIFY_FROM = process.env.ENQUIRY_NOTIFY_FROM ?? "Eduhub <onboarding@resend.dev>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Digits-only phone for a wa.me link (strips +, spaces, dashes, parentheses). */
function waNumber(phone: string): string {
  return phone.replace(/\D/g, "");
}

/** Human-ish summary of what the enquiry is about, if any context was passed. */
function buildContext(input: EnquiryInput): string | null {
  if (input.categorySlug && input.itemId) return `${input.categorySlug} · item ${input.itemId}`;
  return input.categorySlug ?? null;
}

/**
 * Best-effort: emails the team about a new enquiry. Never throws — a failed
 * notification must not fail the enquiry submission. Returns immediately (no-op)
 * when RESEND_API_KEY is absent.
 */
export async function notifyNewEnquiry(input: EnquiryInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return;

  const name = input.name;
  const subject = `New enquiry from ${name.replace(/[\r\n]+/g, " ")}${
    input.school ? ` · ${input.school.replace(/[\r\n]+/g, " ")}` : ""
  }`;

  const context = buildContext(input);
  const phone = input.phone?.trim();
  const waText = `Hello ${name}, thank you for your enquiry to Eduhub — we'd be glad to help.`;
  const wa = phone ? `https://wa.me/${waNumber(phone)}?text=${encodeURIComponent(waText)}` : null;
  const mailto = `mailto:${input.email}?subject=${encodeURIComponent("Re: your Eduhub enquiry")}`;
  // Defense-in-depth: HTML-escape URLs before placing them in href attributes.
  const mailtoHref = escapeHtml(mailto);
  const waHref = wa ? escapeHtml(wa) : null;

  const rows: Array<[string, string]> = [
    ["Name", escapeHtml(name)],
    ...(input.school ? [["School", escapeHtml(input.school)] as [string, string]] : []),
    ["Email", `<a href="${mailtoHref}">${escapeHtml(input.email)}</a>`],
    ...(phone ? [["Phone", escapeHtml(phone)] as [string, string]] : []),
    ...(context ? [["Interested in", escapeHtml(context)] as [string, string]] : []),
    ["Message", escapeHtml(input.message).replace(/\n/g, "<br>")],
  ];

  const tableHtml = rows
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;color:#5C6B78;font-weight:600;vertical-align:top;white-space:nowrap">${k}</td><td style="padding:6px 12px;color:#1C2A36">${v}</td></tr>`,
    )
    .join("");

  const waButton = wa
    ? `<a href="${waHref}" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600;margin-left:8px">Reply on WhatsApp</a>`
    : "";

  const html = `<div style="font-family:system-ui,Segoe UI,Arial,sans-serif;max-width:560px;margin:0 auto;color:#1C2A36">
    <h2 style="color:#14355A;margin:0 0 4px">New enquiry</h2>
    <p style="color:#5C6B78;margin:0 0 16px">A school just submitted the Eduhub contact form.</p>
    <table style="border-collapse:collapse;width:100%;background:#F7F5EF;border-radius:10px">${tableHtml}</table>
    <p style="margin:20px 0 0">
      <a href="${mailtoHref}" style="display:inline-block;background:#14355A;color:#F7F5EF;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:600">Reply by email</a>
      ${waButton}
    </p>
    <p style="color:#9aa7b1;font-size:12px;margin:20px 0 0">Submitted ${new Date().toUTCString()} · Eduhub website</p>
  </div>`;

  const text = [
    `New enquiry from ${name}${input.school ? ` (${input.school})` : ""}`,
    "",
    `Email: ${input.email}`,
    phone ? `Phone: ${phone}` : null,
    context ? `Interested in: ${context}` : null,
    "",
    "Message:",
    input.message,
    ...(wa ? ["", `Reply on WhatsApp: ${wa}`] : []),
  ]
    .filter((line) => line !== null)
    .join("\n");

  try {
    const res = await fetch(RESEND_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: NOTIFY_FROM,
        to: [NOTIFY_TO],
        reply_to: input.email,
        subject,
        html,
        text,
      }),
    });
    if (!res.ok) {
      const detail = await res.text().catch(() => "");
      console.error(`[enquiries/notify] Resend responded ${res.status}: ${detail}`);
    }
  } catch (err) {
    console.error("[enquiries/notify] failed to send notification:", err);
  }
}
