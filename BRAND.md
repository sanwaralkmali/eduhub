# Eduhub — Brand Guide ("The Scholar")

> The practical rules that keep Eduhub looking like one trustworthy, established, calm partner for schools. Tokens live in `tailwind.config.ts` and `src/app/globals.css`; this is the human-readable companion. (Supersedes the earlier emerald/amber identity.)

## Who we are
Eduhub is a B2B school-services company in **Istanbul**: from competitions and trips to uniforms, gifts, and graduation — planned, supplied, and run, in Arabic and English. Audience: **school administrators and principals** at international schools. The brand must feel **trustworthy, established, organised, calm, warm** — a respected institution, not a startup or a "crayon" school cliché.

## Voice
Clear, confident, reassuring. Short declarative sentences. Lead with outcomes for the school ("handled," "one team," "from the first bell to graduation"). **Avoid:** hype, exclamation marks, playful slang, emoji, heavy gradients, stock-photo overload. When in doubt, choose the more restrained, more institutional option.

## Colour
| Token | Hex | Use |
|---|---|---|
| Harbor Navy `brand-navy` | `#14355A` | Headings, footer, CTA band, logo ground |
| Eduhub Blue `brand-blue` / `primary` | `#1A4D8F` | Buttons, links, primary actions |
| Sky `brand-sky` | `#2E86C7` | Secondary accents, hovers |
| Sky Light `brand-skylight` | `#5FB0E6` | Subtle accents |
| Mist `brand-mist` / `secondary` | `#DCEBF7` | Tinted section backgrounds, cards |
| Brass `brand-brass` / `accent` | `#D9A441` | **Accent only** — thin rules, icon ticks, the cap-tassel. Never a button fill or large area. |
| Paper `brand-paper` / `background` | `#F7F5EF` | Warm off-white page background |
| Ink `brand-ink` / `foreground` | `#1C2A36` | Body text |
| Slate `brand-slate` / `muted-foreground` | `#5C6B78` | Secondary/muted text |

**Ratio:** ~70% navy + neutrals (Paper/white), ~25% blues, ~5% brass. Use semantic classes (`bg-primary`, `text-muted-foreground`, `bg-secondary`) so themes stay correct — don't hardcode hex in components.

## Type
- **Display / headings:** **Spectral** (serif) → `font-display`, weights 400–700, slight negative tracking on large sizes. H1–H3, hero, section titles, the "Eduhub" wordmark.
- **Body / UI:** **Hanken Grotesk** (sans) → `font-body`, weights 400/600/800. Body, nav, buttons, labels.
- **Arabic:** **IBM Plex Sans Arabic** → `font-arabic`, applied automatically in RTL.
- Loaded via `next/font` in `src/app/layout.tsx`; body text ≥16px, never below 14px.

## Logo (the Scholar crest)
- A graduation-cap crest inside a thin double-ring seal (navy ring + brass inner ring) with a brass tassel, paired with a serif "Eduhub" wordmark. Files in `public/eduhub-scholar-*.png`.
- **Header:** crest mark (`eduhub-scholar-mark-color.png`) + serif "Eduhub" wordmark, navy on light.
- **Footer:** reverse stacked lockup (`eduhub-scholar-reverse-navy.png`) on the navy footer.
- **Favicon / app icon:** the crest mark only.
- Maintain clear space around the logo. Never stretch, recolour, re-skin, or replace the serif wordmark.

## Layout & components
- Generous whitespace, max content width ~1200px (`max-w-6xl`), calm editorial rhythm. Sections alternate white / Paper / Mist; **one navy band** for emphasis (the CTA band) with light text.
- **Buttons:** primary = solid Eduhub Blue, white text, `font-body` 600. Secondary = navy/border outline. On navy bands, buttons are Paper/white with navy text (never brass).
- **Cards:** white, ~14–18px radius (`rounded-xl`), 1px warm border (`border` = `#EAE6DC`), soft low shadow (`shadow-sm` → `hover:shadow-md`). Optional thin brass accent for featured cards.
- **Ribbon motif:** kept as a *restrained* brass detail only — `RibbonCorner` (small brass corner on feature panels) and `RibbonDivider` (a thin brass rule). No gradient bands.
- **Icons:** hand-coded SVGs in `src/components/ui/icons.tsx` — 24×24, 1.75 stroke, `currentColor`, `aria-hidden`. Minimal and consistent; no detailed illustrations. **Do not add `lucide-react`.**
- **Imagery:** real photography of schools/students/events with a subtle navy treatment; use plain Mist placeholders where photos are missing — never AI-illustrate.

## Bilingual & RTL (non-negotiable)
Every user-facing string lives in `src/content/i18n/{en,ar}.json` with matching keys (`npm run i18n:check` before committing). Use logical utilities (`ps/pe`, `ms/me`, `start/end`); mirror directional glyphs with `rtl:-scale-x-100`. `dir` is set on `<html>` from the locale. Same visual system across both languages.

## Accessibility
Visible focus rings, discernible text on every CTA, `alt` on real images (decorative ones empty), AA contrast (brass for fills/marks, not small text on light), keyboard-operable FAQ.
