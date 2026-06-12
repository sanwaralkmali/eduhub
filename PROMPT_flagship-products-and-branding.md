# Agent Prompt — Edu-Hub "Products & Trust" Flagship Page + Branding Elevation

> Paste this to your coding agent. It is written for the existing Edu-Hub codebase.
> Replace anything in **[brackets]** with your real details, or let the agent use clearly-marked placeholders.

---

## Role & context
You are continuing work on **Edu-Hub**, a bilingual (Arabic / English) **Next.js 14** marketing site + catalogue for an education-services company that sells to **schools** across three pillars: **Activities, School Services, Graduation**.

**Before writing any code, read `CLAUDE.md` and `EDU_HUB_PRODUCT_MAP.md`** and obey every canonical pattern: Pattern 1 (page → View → Data → loading, `error.tsx` for Supabase routes), Pattern 3 (Supabase clients), **Pattern 4 (bilingual i18n — never hardcode a user-facing string; every string lives in `src/content/i18n/{en,ar}.json` with matching keys + full RTL)**, Pattern 5 (`next/image`), Pattern 7 (shadcn-style primitives + the brand tokens in §6, no ad-hoc CSS).

Phases 1–3 are already built and must keep working: the landing page, the catalogue (`/services` → `/services/[category]` → item detail) with a **typed seed fallback**, the `/contact` enquiry form + `POST /api/enquiries`, and the admin panel. Build on these — do not replace or break them.

## The mission (read this twice)
Schools are **cautious buyers**. The one goal of this work is to make a school visitor **feel safe, instantly understand what we offer, and trust us enough to send an enquiry**. Build the most professional, trust-forward **products/services showcase** this codebase can support, and **elevate the brand** so it feels premium, warm, and unmistakably Edu-Hub.

Optimise every decision for **conversion** (visitor → enquiry), because enquiries are what become paying contracts. Treat "would a principal trust this with their school's graduation?" as the bar for every section.

Use **clearly-labelled placeholders** for products, photos, logos, testimonials, guarantees, and contact details — the owner will swap in real ones. Make placeholder copy obviously placeholder.

## Deliverables

### 1) Flagship products / services page
- Elevate the catalogue into a showcase a buyer would call "professional." Build on `/services` and the item pages; if a richer, dedicated products landing helps conversion, add it and link it from the navbar/hero.
- Show the full product list with **placeholder items** across all three pillars: polished cards with image (or branded placeholder), name, one-line value, a price/"request a quote" line, an optional **Featured** highlight, and an obvious **Enquire / Request a quote** CTA on every card and at the end of every section.
- Clear hierarchy: a hero with a single strong promise → trust bar → products by pillar → featured → how-it-works → proof → guarantees → FAQ → final CTA. Mobile-first (design at 375px, scale up), fast, accessible (labels, focus states, alt text, contrast).

### 2) Trust & safety system — the heart of this task
Design and build credibility throughout:
- **Social proof, high up:** "Trusted by [N]+ schools," testimonials from named schools/principals (placeholder), a partner/school logo strip (placeholder), simple star ratings.
- **Guarantees beside the CTAs:** on-time delivery, quality guarantee, satisfaction/refund promise, "we reply within 1 business day." (Mark as editable placeholders — never promise what the business can't honor.)
- **How it works in 3 steps** (Enquire → Plan & quote → Delivered) to kill uncertainty.
- **Transparency:** visible contact (phone / WhatsApp / email placeholders), a warm "why schools trust us" block, and an **FAQ** that answers a cautious buyer's real objections (pricing, timelines, minimum orders, payment, support, areas served).
- A subtle **established/secure** feel (e.g. "serving schools since [year]," policy links). Never present placeholder certifications/logos as real — label them.

### 3) Branding elevation — make it special
Build **on** the existing identity (CLAUDE.md §6: deep-emerald `#1A6B4A`, warm-amber `#F5A623`, Sora/Cairo fonts, the diagonal **ribbon** motif) and raise it to a premium, cohesive system:
- A clean **wordmark/logo** (SVG, works in both scripts), a **favicon**, and a branded **Open Graph / social share image**.
- A refined visual language: confident type scale, generous whitespace, one consistent card/shadow/radius system, the ribbon used as the signature accent, cohesive icons, and a few restrained, delightful micro-interactions (hover, scroll-in).
- A short **brand mini-guide** committed to the repo (colors, type, voice, do/don'ts) so it stays consistent.
- Tone: warm and celebration-forward (these are school events) while reading as organised and trustworthy.

## Guardrails
- **Bilingual + RTL from the first commit.** New strings → i18n with matching `en`/`ar` keys; use logical Tailwind utilities (`ps/pe`, `ms/me`, `start/end`); run an en/ar key-parity check before you commit.
- Follow Patterns 1 & 7; use `next/image` for all images; keep the **seed fallback** so everything renders without Supabase.
- No dark patterns, no fake scarcity, no unverifiable claims stated as fact. Trust is earned with clarity, not tricks.
- Work the **audit → plan → one atomic commit** loop, **one reviewable slice at a time**. Verify with `npm run build` + lint + i18n parity before each commit. Don't regress Phases 1–3.

## What only the owner can give you (ask, or use marked placeholders)
Real logo/brand assets · real testimonials + school names · the actual guarantees/policies you can honor · contact details (phone/WhatsApp/email) · pricing model · real photos · company "since [year]" and service area. Where these aren't provided, use obvious placeholders and **return a checklist of exactly what you need from me**.

## Definition of done
A school visitor lands and within seconds: understands what we sell, sees credible proof and clear guarantees, and can enquire in one tap from anywhere on the page — on a fast, polished, on-brand, fully bilingual (AR/EN + RTL) experience, with a brand that feels like a premium, trustworthy school-events partner. Finish with a short **before/after summary** and the **placeholder checklist**.

## How to start
Begin by reading `CLAUDE.md` + the product map, then reply with a **short plan** (proposed page structure, new files/i18n keys, branding assets) and your **questions about my real details** before building. Then ship it slice by slice.
