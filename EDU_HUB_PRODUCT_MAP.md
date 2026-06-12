# EDU-HUB Product Map
> Auto-populated by the agent during Phase 0 via `get_architecture_overview`.
> Until Phase 0 is complete, this file is a planning skeleton only.
> **Do not hand-edit after Phase 0** — run `/sync-knowledge` to update.

> ▶ **NEXT TASKS: see [`ROADMAP.md`](ROADMAP.md)** — phased plan (Phase 5 go-live on Supabase → … → Phase 9 deploy). Read it after this file. Latest status is in the dated update notes at the bottom.

---

## Company Pillars → Site Sections

```
Edu-Hub
├── Activities
│   ├── School Competitions
│   ├── Indoor Trips & Activities
│   └── Outdoor Trips & Activities
│
├── School Services
│   ├── Uniforms
│   ├── Teacher Day Gifts
│   └── Event Merchandise
│
└── Graduation
    ├── Graduation Gowns
    ├── Ceremony Packages
    └── Grad Coordination Services
```

---

## Planned Route Map (Phase 1 & 2)

```
/                          ← Landing page (hero, trust bar, services, how-it-works, why, testimonials, logos, guarantees, CTA + channels)
/products                  ← Flagship products & trust showcase (hero → trust → featured → pillars → how-it-works → guarantees → FAQ → final CTA)
/services                  ← Service category index
/services/activities       ← Activities catalogue
/services/school-services  ← School services catalogue
/services/graduation       ← Graduation catalogue
/services/[category]/[slug] ← Individual item / package detail
/contact                   ← School enquiry form
/about                     ← Company story (optional Phase 2)
/admin                     ← Protected admin panel (Phase 3)
/admin/catalogue           ← Manage items
/admin/enquiries           ← View submissions
```

---

## Component Domains

| Domain | Directory | Responsibility |
|---|---|---|
| Layout | `src/components/layout/` | Navbar, Footer, PageWrapper |
| Marketing | `src/components/marketing/` | Hero, ServiceCard, Testimonial, CTA |
| Catalogue | `src/components/catalogue/` | CategoryGrid, ItemCard, ItemDetail |
| Forms | `src/components/forms/` | EnquiryForm, field components |
| Admin | `src/components/admin/` | DataTable, ItemEditor |
| UI | `src/components/ui/` | shadcn/ui (DO NOT edit) |

---

## Supabase Tables (Phase 2)

| Table | Purpose | RLS |
|---|---|---|
| `service_categories` | Pillar → sub-category hierarchy | Public read |
| `catalogue_items` | Products & packages | Public read |
| `enquiries` | School contact submissions | Insert only (anon), admin read |
| `testimonials` | Social proof quotes | Public read |

---

## i18n Keys Structure (src/content/i18n/)

```
nav.*              ← Navigation labels
hero.*             ← Hero section
services.*         ← Services section
catalogue.*        ← Catalogue / shop copy
contact.*          ← Contact form
footer.*           ← Footer
meta.*             ← SEO / Open Graph strings
```

---

## Architecture Overview
> Populated automatically after Phase 0 scaffold + graphify index.
> Run: get_architecture_overview → paste output below this line.

*[ graphify output goes here — run after Phase 0 ]*

---

*Last updated: 2026-06-09 · Phases 1–3 complete. Admin: magic-link auth + email allowlist, dashboard, enquiries inbox, and full catalogue CRUD (create/edit/delete via service-role server actions, Zod-validated, admin-guarded; dev demo is read-only). Public chrome hidden on `/admin` via `src/middleware.ts`. Next: Phase 4 (SEO, OG images, performance, mobile QA, Vercel deploy). Run graphify + `/sync-knowledge` to populate the Architecture Overview above.*

*Update 2026-06-11 · Flagship "Products & Trust" + brand elevation shipped. New `/products` flagship route (`page → ProductsView → loading → error`) reusing the catalogue seed-fallback data layer. New component domains: `src/components/products/` (ProductCard, ProductPillar, FeaturedProducts, ProductsHero) and `src/components/trust/` (TrustBar, LogoStrip, HowItWorks, Ratings, Guarantees, Faq, ContactChannels, FinalCta). Branding: `src/components/brand/Logo.tsx` (placeholder mark) swapped into Navbar/Footer; `src/app/icon.svg` favicon; `src/app/opengraph-image.tsx` + `twitter-image.tsx` via `next/og` (edge runtime); metadata (metadataBase/openGraph/twitter) in `layout.tsx`; `BRAND.md` mini-guide. New i18n namespaces `products` + `trust` (+ `nav.products`, `contact.topic*`), full en/ar parity (275 keys) — guarded by `npm run i18n:check` (`scripts/i18n-check.mjs`). Reusable enquiry deep-link helper `src/lib/enquiries/links.ts`; `/contact` now also accepts `?topic=` (backward-compatible with `?item=&category=`). Home page rebuilt to share the trust system. Part of Phase 4 (SEO/OG) now done. Note: `next build` is the real gate (a latent type error in `src/i18n/request.ts` messages typing was fixed). Run graphify + `/sync-knowledge` to refresh the Architecture Overview.*

*Update 2026-06-12 ("The Scholar" rebrand + real content) · Applied the finalized brand (`eduhub-website-rebrand-prompt.md`): palette swapped to Harbor Navy/Eduhub Blue/Mist/Brass/Paper across `globals.css` CSS vars + `tailwind.config.ts` brand tokens; fonts to Spectral (display) + Hanken Grotesk (body) + IBM Plex Sans Arabic; Scholar PNG logos in Navbar (crest + serif wordmark) and Footer (reverse-navy lockup); favicon = crest mark via metadata; OG image recoloured navy/brass; `BRAND.md` rewritten; deleted the old SVG `Logo.tsx` + `icon.svg`. Institutional restraint: removed decorative gradients/blur-blobs, CTA bands now Harbor Navy with Paper buttons (brass is accent-only), `RibbonDivider` is a thin brass rule. Brand name corrected Edu-Hub→Eduhub site-wide. Real content filled (no more placeholders except future photos): founder promise signed "The Eduhub Team · Istanbul", guarantees (On time / High quality / Fair price / Reply within 1 business day), full Istanbul-tailored FAQ, and real contact channels (eduhub.contact26@gmail.com, +90 552 471 86 00 phone+WhatsApp). NOTE: CLAUDE.md §6 (old emerald/amber identity) is now superseded by BRAND.md.*

*Update 2026-06-11 (honesty pivot) · Owner is a brand-new company and wants zero inflated claims. Removed all invented social proof: fake hero stats (120+/450+/8yrs), the "trusted by N / since 2018 / 4.9 rating" trust bar, and the three fabricated testimonials. Replaced with honest trust signals: `TrustBar` now shows day-one capability facts (bilingual · clear quotes · end-to-end · fast replies); new `TrackRecord` shows the REAL early work (3 outdoor camps/activities + 1 full graduation ceremony — `trust.delivered`, update as more is delivered); `FounderPromise` (new, `founder` ns) replaces testimonials with a first-party signed commitment; `LogoStrip` reframed from "schools we work with" to a "be one of our first partner schools" invitation. Deleted `Ratings.tsx` + `Testimonials.tsx`; removed the `testimonials` i18n namespace and the "Reviews" nav/footer links. Founder name/quote are the only placeholders here; the track-record numbers are real.*
