# Eduhub — Roadmap (Next Phases)

> Written 2026-06-12 for a **fresh session** to pick up cold. Read `CLAUDE.md` and `EDU_HUB_PRODUCT_MAP.md` first, then this. The marketing site is built, rebranded ("The Scholar"), bilingual (AR/EN + RTL), honest (no fake claims), mobile-app-like (PWA + bottom tab bar), and verified locally (`npm run lint` + `npm run build` + `npm run i18n:check` all green). What's left is **getting it live on real data and launched**, then growth.

## Where we are now (done)
- Landing + `/products` flagship + `/services` catalogue + `/contact` + admin panel.
- Trust system: assurances bar, **real** track record (3 camps/outdoor activities + 1 graduation), founder's promise, guarantees (on-time / high quality / fair price / reply <1 business day), Istanbul FAQ, "be one of our first partner schools" invitation, visible contact channels.
- Brand: Scholar palette (Harbor Navy / Eduhub Blue / Mist / Brass / Paper), Spectral + Hanken Grotesk + IBM Plex Sans Arabic, Scholar PNG logos, navy/brass OG image, favicon. See `BRAND.md`. (CLAUDE.md §6 is superseded by BRAND.md.)
- Real contact wired: **eduhub.contact26@gmail.com**, **+90 552 471 86 00** (phone + WhatsApp).
- Mobile app feel: installable PWA (`src/app/manifest.ts`), bottom tab bar (`src/components/layout/MobileTabBar.tsx`), safe-area insets, touch polish.
- Admin allowlist set in `.env.local`: `ADMIN_EMAILS=mtnshsalah@gmail.com,eduhub.contact26@gmail.com`.
- **Supabase keys are present in `.env.local`** (real project) — so the app is no longer in seed-fallback mode; it expects the real DB (see Phase 5).

## How to verify anything (every phase)
`npm run lint` · `npm run build` · `npm run i18n:check` (en/ar parity) · manual 375px check in **both** locales (toggle the `EDU_LOCALE` cookie). Note: on this Windows machine a stale `.next` can throw transient build errors (`vendor-chunks`, page-data, `_not-found`) — `rm -rf .next && npm run build`, and re-run once if the first clean build races.

---

## Phase 5 — Go live on real data (Supabase) ⭐ do first
**Goal:** the catalogue and enquiries run on the real Supabase project, not seed data.
**Why:** keys are already in `.env.local`, so `isSupabaseConfigured()` is true and the data layer (`src/lib/catalogue/data.ts`) now queries Supabase. If the tables aren't created/seeded yet, pages fall back to seed on error — but admin CRUD and enquiry persistence need real tables.
- [ ] In the Supabase project SQL editor, run the migrations in order: `db/migrations/20260609_1000_init_helpers.sql` → `_1010_create_service_categories.sql` → `_1020_create_catalogue_items.sql` → `_1030_create_enquiries.sql` → `_1040_seed_catalogue.sql`.
- [ ] Confirm **RLS** policies: public read on `service_categories`/`catalogue_items`, anon insert-only on `enquiries`, admin read via service role (CLAUDE.md §7, Pattern 6).
- [ ] Test end-to-end: submit `/contact` → row appears in `enquiries`; sign in at `/admin/login` with both allowlisted emails (magic link) → dashboard, enquiries inbox, and catalogue CRUD all work against the DB.
- [ ] Confirm the public catalogue renders from the DB (edit an item in admin → see it on `/services` and `/products`).
**Needs from owner:** confirm the Supabase project is the right one; access to its SQL editor.
**Done when:** an enquiry submitted on the live form is visible in the admin inbox, and an item edited in admin shows on the public site.

> **Status 2026-06-12:** Audited **code-ready, zero blockers** — a 6-auditor sweep (migrations, RLS, Supabase client, data layer, enquiry flow, admin CRUD) plus a dedicated SQL↔TS schema-drift check found no mismatch; `lint` + `build` + `i18n:check` all green. Remaining work is owner-side in the Supabase dashboard: run the 5 migrations in order, then ⚠️ **allowlist `https://eduhub-sable-zeta.vercel.app/admin/auth/callback`** (and `http://localhost:3000/admin/auth/callback` for local) under Auth → URL Configuration — `src/app/admin/login/actions.ts:22` sends the magic link there, and if it isn't allowlisted admin login silently fails. (A full 10-step go-live runbook was produced this session.)

## Phase 6 — Real brand assets & catalogue content
**Goal:** replace remaining placeholders with real assets/content.
- [ ] **PWA icons:** export proper `192×192`, `512×512`, and a **maskable** icon (with safe-zone padding so Android's circular mask doesn't clip the crest ring); add an iOS apple-touch-icon + optional splash. Update `src/app/manifest.ts` and `layout.tsx` `icons`. (Currently the 2048px crest is scaled for all sizes.)
- [~] **Product photos / galleries:** ✅ *2026-06-12* — shop-style **image gallery** built (`src/components/catalogue/ImageGallery.tsx`: large main image + thumbnail toggle, keyboard-accessible + RTL) driven by a slug→images map (`src/lib/catalogue/galleries.ts`). The **Outdoor Adventure Camp** (`/services/activities/adventure-camp`) now shows 10 real photos from `public/camp/web-43/` (full-res twins in `public/camp/full/` for a future lightbox), and cards fall back to the first gallery image as their cover via `getCoverImage()`. **Extend to other items:** drop images in `public/<set>/` and add a slug entry to the map. *Still to do:* real photos for the other items; optionally move galleries to a DB `images` column + admin upload, and/or upload single covers to the Supabase Storage `catalogue` bucket and set `image_url`.
- [ ] **Real catalogue:** replace the 9 seed packages with real packages and descriptions across the three pillars (via the admin UI from Phase 5, or by editing the seed). **Pricing: keep "Request a quote" on every item.** ✅ *2026-06-12:* the 2 leftover SAR placeholder amounts (`From SAR 45 / student`, `From SAR 30 / gown`) were corrected to "Request a quote" / "اطلب عرض سعر" in **both** `db/migrations/..._1040_seed_catalogue.sql` and `src/lib/catalogue/seed.ts`, so all 9 items are now quote-only. Real package content/descriptions still to come.
- [ ] Review founder's-promise wording (`founder.*` in i18n) and guarantee/FAQ copy with the owner.
**Needs from owner:** real photos, final logo icon exports, real package list + pricing, sign-off on copy.

## Phase 7 — Enquiry → lead pipeline
**Goal:** the team actually receives and works leads (today an enquiry only inserts a DB row).
**Decided:** notify via **both email + WhatsApp**; email via **Resend (free tier)**.
> **Status 2026-06-12 — email notify built & verified.** Resend key added; a test send returned HTTP 200. ⚠️ The Resend account is under **mtnshsalah@gmail.com**, and the free tier (onboarding@resend.dev) delivers ONLY to that address — sending to eduhub.contact26@gmail.com returns 403. So `ENQUIRY_NOTIFY_TO=mtnshsalah@gmail.com` for now (alerts land in the owner's personal inbox). To route to **eduhub.contact26@gmail.com** + a branded `from`, verify a domain at resend.com/domains. **Production:** set `RESEND_API_KEY` and `ENQUIRY_NOTIFY_TO=mtnshsalah@gmail.com` in Vercel, then redeploy.
- [x] **Email notify (Resend):** *(built 2026-06-12 — `src/lib/enquiries/notify.ts`, called from the API route after a successful insert; **no-op until `RESEND_API_KEY` is set**, then redeploy)* on a successful `POST /api/enquiries`, send the enquiry details to `eduhub.contact26@gmail.com` via Resend. Add `RESEND_API_KEY` to env. Free tier = 100 emails/day, 3k/month. **Caveat:** no verified sending domain yet (domain is temp), so send from Resend's `onboarding@resend.dev` — which only delivers to the Resend account's own email. ⇒ create the Resend account **with eduhub.contact26@gmail.com** so notifications land there. Move `from:` to a verified domain in Phase 9.
- [ ] **WhatsApp notify:** message the team on new enquiry. Needs the **Meta WhatsApp Business Cloud API** (free service/utility messages within limits, but requires a Meta Business account + registered sender number + an approved template). **Interim — ✅ built 2026-06-12:** the notification email includes a prefilled `wa.me` **Reply on WhatsApp** button (uses the enquirer's phone when provided), opening WhatsApp with a reply pre-typed. Full Meta-API auto-send is still a separate setup task.
- [ ] Auto-acknowledgement email to the school ("we'll reply within one business day") — also via Resend. **Needs a verified sending domain first** (onboarding@resend.dev can't email arbitrary recipients), so this lands after the domain step.
- [x] Admin inbox: enquiry **status workflow** *(2026-06-12)* — each enquiry shows a status badge + **one-click action buttons** (Mark contacted / Close / Reopen — the two states it isn't in) backed by `updateEnquiryStatus` (`src/app/admin/(protected)/enquiries/actions.ts`: admin-re-checked, service-role, enum-validated, `revalidatePath`), with optimistic UI + revert-on-error; the dashboard "new" stat refreshes. Quick reply (mailto w/ prefilled subject) was already present.
- [~] Spam hardening: ✅ *2026-06-12* — server-side **honeypot enforcement** (the `company` field is now rejected in the API route, not just client-side) + a **best-effort in-memory per-IP rate limit** (5 / 10 min) so the new email path can't be trivially flooded. **Still recommended:** swap the in-memory limiter for a shared store (Vercel KV / Upstash) so it holds across serverless instances; add hCaptcha only if spam appears.
**Needs from owner:** a **Resend account created with eduhub.contact26@gmail.com** + its API key; for true WhatsApp auto-send, a Meta WhatsApp Business account (otherwise the interim email-with-`wa.me`-link covers it).

## Phase 8 — SEO, performance, accessibility & legal (CLAUDE.md §8 Phase 4 finish)
**Goal:** discoverable, fast, accessible, and compliant. (OG image + mobile are already done.)
- [x] **Metadata + canonical** for home, `/products`, `/services`, category & item, `/contact`; **`sitemap.ts`** (static + data-driven catalogue) + **`robots.ts`** (blocks `/admin`,`/api`). *(2026-06-12)*
- [x] **Structured data:** `Organization` + `LocalBusiness` JSON-LD (Istanbul/Türkiye, real contact, bilingual) site-wide on public pages — `src/components/seo/StructuredData.tsx`, mounted in `layout.tsx`. No `sameAs` yet (no social profiles to claim — add when they exist). *(2026-06-12)*
- [x] **Privacy + terms** pages — `/privacy` + `/terms`, bilingual (KVKK/GDPR-aware), linked from the footer; new `legal` i18n namespace (en/ar parity, 324 keys). Single SEO source at `src/lib/site/config.ts`. *(2026-06-12)*
- [x] Performance — static review *(2026-06-12)*: `next/font` with `display:swap` (self-hosted, no render-block), all images via `next/image` (logo `priority`; cards use `fill` + responsive `sizes`), no raw `<img>`, reduced-motion-safe CSS reveals (opacity/transform only → no CLS), lean shared First-Load JS (~87 kB; client components scoped to Navbar/TabBar/LanguageSwitcher/ContactView). *Remaining:* confirm with a real **Lighthouse run** in Chrome DevTools (target 90+ mobile) — needs a browser.
- [x] Accessibility pass *(2026-06-12)* — static a11y audit + fixes: **skip-to-content link** (was missing) + `id="main-content"`; contact-form errors now associated (`aria-describedby` + `role="alert"`) with `aria-required` and an announced success (`role="status"`); **nav landmark labels** fixed (the bottom tab bar was mislabeled "Home"; Navbar landmark labelled) with en/ar i18n. Verified already-clean: **RTL** (no physical-direction utilities — all logical/symmetric), **`<details>`** FAQ keyboard-accessible, decorative icons `aria-hidden`, breadcrumb/`aria-current` correct. *Remaining:* manual **375px screen-reader/keyboard QA** in both locales — needs a browser.
**Needs from owner:** company legal details for the privacy policy (**full legal entity name + registered address** — the policy currently points readers to email for these); confirm service area copy.

## Phase 9 — Deploy & launch
**Goal:** live on the real domain.
- [ ] **Git:** the project is not a git repo yet — `git init`, first commit (the work so far), push to GitHub. (Never commit `.env.local`; it's git-ignored.)
- [ ] **Vercel:** import the repo; set env vars in Vercel (NOT from `.env.local`): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADMIN_EMAILS=mtnshsalah@gmail.com,eduhub.contact26@gmail.com`, `RESEND_API_KEY`, `NEXT_PUBLIC_SITE_URL=https://eduhub-sable-zeta.vercel.app`.
- [ ] **Domain: temp for now** — launch on the Vercel-provided URL (`https://eduhub-sable-zeta.vercel.app`); set `NEXT_PUBLIC_SITE_URL` and the Supabase Auth redirect URL (for magic links) to it. Add a custom domain later.
- [ ] Production smoke: both languages, mobile **install to home screen**, enquiry end-to-end (lands in inbox + notifies), admin login with both emails.
- [ ] **Analytics:** add conversion tracking (Vercel Analytics or Plausible) — primary metric = enquiries submitted.
**Needs from owner:** access to the Vercel + Supabase dashboards (domain is locked to the temp Vercel URL).

> **Status 2026-06-12:** Site is **deployed and live** at **https://eduhub-sable-zeta.vercel.app**. Code now defaults `NEXT_PUBLIC_SITE_URL` to this URL (`src/lib/site/config.ts`, `src/app/layout.tsx`) so canonical/OG/sitemap/JSON-LD stay correct even if the Vercel env var is unset; a redeploy ships that default. **Still to confirm:** (1) set `NEXT_PUBLIC_SITE_URL=https://eduhub-sable-zeta.vercel.app` in Vercel → Settings → Environment Variables, then redeploy; (2) Supabase → Auth → URL Configuration — set **Site URL** to the prod URL and add Redirect URL **https://eduhub-sable-zeta.vercel.app/admin/auth/callback** (else admin magic-link login fails in production); (3) production smoke test — both languages, enquiry round-trip into the inbox, admin login with both emails.

## Phase 10 — Post-launch growth (ongoing)
- [ ] Collect **real** testimonials/reviews as events are delivered; add a genuine reviews section (structure is ready — was removed in the honesty pivot, easy to re-add with real quotes).
- [ ] Keep the `trust.delivered` track record updated as more events ship.
- [ ] Add catalogue items / seasonal packages; refine pricing.
- [ ] Optional: case studies / blog for SEO; A/B test hero + CTA copy; WhatsApp click tracking.

---

## Recommended order
**5 → 9 first** to get a working site live fast (you can deploy with seed data even before Phase 6/7 if needed), then **6, 7, 8** to enrich and polish, with **10** ongoing. Phases 6–8 are largely independent and can run in any order once Phase 5 is done.

## Decisions (locked 2026-06-12)
- New-enquiry notifications: **both email + WhatsApp** (Phase 7).
- Email provider: **Resend (free tier)** — create the account with **eduhub.contact26@gmail.com** (Phase 7).
- Domain: **temp for now** — launch on the Vercel URL (Phase 9).
- Pricing: **keep "Request a quote" everywhere** (Phase 6).
- WhatsApp number = phone (**+90 552 471 86 00**).

**Still needed when starting Phase 7:** a Resend account (signed up with eduhub.contact26@gmail.com) + `RESEND_API_KEY`. WhatsApp: full auto-send needs a Meta WhatsApp Business account; the interim email-with-`wa.me`-link works without it.
