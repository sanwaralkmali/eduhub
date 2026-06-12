# EDU-HUB — Agent System Configuration
> Claude Cowork project root · read this file before every session · last updated: 2026-06-09

---

## 0 · Project Overview

**Edu-Hub** is an education services company whose primary customers are schools.
It operates across three service pillars:

| Pillar | What we sell |
|---|---|
| **Activities** | School competitions, indoor & outdoor trips, events |
| **School Services** | Uniforms, teacher-day gifts, event merchandise |
| **Graduation** | Gowns, ceremony packages, grad coordination |

**The deliverable** is a bilingual (Arabic / English) marketing website that doubles as a product catalogue / shop front. It is a standalone Next.js project — **completely independent** of Mathlogame / Schola.

**Stack** · Next.js 14 (App Router) · TypeScript · Tailwind CSS · shadcn/ui · Supabase (auth + DB) · Vercel (deploy target)

---

## 1 · Workspace Layout

```
workspace/
├── mathlogame/          ← HANDS OFF — finished product, source of pattern inspiration only
└── edu-hub/             ← THIS project — all agent work lives here
    ├── CLAUDE.md        ← this file
    ├── EDU_HUB_PRODUCT_MAP.md
    ├── src/
    │   ├── app/         ← Next.js App Router pages & layouts
    │   ├── components/  ← shared UI components
    │   ├── lib/         ← utilities, Supabase client, helpers
    │   └── content/     ← static copy, translations, catalogue data
    ├── public/
    ├── db/
    │   └── migrations/
    └── tests/
```

**Hard rule:** The agent MUST NOT read, modify, or reference files inside `mathlogame/` except to borrow a structural pattern — and only after stating which file it is borrowing from and why.

---

## 2 · Token-Efficiency Rules (read before every task)

These rules exist to make every session cheap. Violating them silently wastes budget.

### 2.1 — Graph-first, grep-last

Always use `code-review-graph` MCP tools before shelling out to `grep` / `find` / `cat`:

| Need | Use first | Shell fallback |
|---|---|---|
| Understand codebase shape | `get_architecture_overview` | `ls -R` |
| Find a component | `semantic_search_nodes` | `grep -r` |
| Understand dependencies | `query_graph imports_of` | — |
| Who calls a function | `query_graph callers_of` | — |
| Blast radius of a change | `get_impact_radius` | — |
| Dead code | `refactor_tool --mode dead_code` | — |

Load cached context first: `get_minimal_context(task="<current task name>")` — this replaces up to 40 file reads.

### 2.2 — Subagent wide reads

If a task requires reading more than 5 files to understand context, **spawn a subagent** for the read phase and have it return a compact summary (≤ 400 tokens). Never read files serially in the main agent loop when a subagent can batch them.

### 2.3 — One slice per session

Each session handles **one feature slice** — a route, a component, or a data model. Never bundle unrelated changes. If the user asks for two unrelated things, do the first, commit, then start the second.

### 2.4 — Suppress graph rebuild during audits

Before any `/audit` or `/god-mode-audit` session, output exactly:

```
⚠️ Set CLAUDE_AUDIT_MODE=1 in your terminal before we begin.
   This disables the post-tool graph rebuild hook (~30s per file edit).
```

### 2.5 — Default read depth

- **Quick task** (copy fix, style tweak): `detail="minimal"` on all reads
- **Feature build**: `detail="standard"` for files you'll edit, `"minimal"` for context
- **Audit**: escalate to `"full"` only on 🟠/🔴 findings
- Never read a file you won't use. State why you're reading each file before reading it.

---

## 3 · Canonical Patterns (cite these by number in commit messages)

### Pattern 1 — Page anatomy
Every App Router page follows this 4-file layout:

```
src/app/<route>/
├── page.tsx          ← thin shell, metadata export, Suspense boundary
├── <Route>View.tsx   ← client component, all interactivity
├── <Route>Data.ts    ← server-side data fetching (no UI)
└── loading.tsx       ← skeleton / spinner
```
`error.tsx` is required for any route that calls Supabase.

### Pattern 2 — Component structure
```
src/components/<domain>/<ComponentName>/
├── index.tsx          ← barrel export
├── <ComponentName>.tsx
└── <ComponentName>.test.tsx
```

### Pattern 3 — Supabase client (CRITICAL — never bypass)
- **Server components / API routes:** `createServerClient()` from `@/lib/supabase/server`
- **Client components:** `createBrowserClient()` from `@/lib/supabase/client`
- Never import directly from `@supabase/supabase-js` in page code.
- Row-Level Security is ON by default. Every new table needs an RLS policy before it ships.

### Pattern 4 — Bilingual copy
All user-facing strings live in `src/content/i18n/<lang>.json`. Never hardcode Arabic or English text inside TSX. Use the `useTranslation()` hook (wrapper around next-intl).
RTL is toggled via `<html dir="rtl" lang="ar">` — never via per-component `direction` CSS hacks.

### Pattern 5 — Image handling
All images go through `next/image` with explicit `width` + `height` or `fill` + a `sizes` prop. No raw `<img>` tags. Product catalogue images are stored in Supabase Storage under the `catalogue` bucket.

### Pattern 6 — API routes (auth boundary)
Every `/api/` route that mutates data must:
1. Call `getUser()` from `createServerClient()` and 401 if no session.
2. Validate the request body with a Zod schema before touching the DB.
3. Return typed `{ data, error }` — never throw unhandled exceptions.

### Pattern 7 — Styling
- Tailwind utility classes only — no custom CSS files except `globals.css` (resets + CSS vars).
- shadcn/ui components are the baseline; customise via `className` prop, never by editing `components/ui/`.
- Design tokens live in `tailwind.config.ts` under `theme.extend`.
- **No inline `style={{}}` props** except for dynamic values that cannot be expressed as Tailwind classes (e.g., a background image URL from the DB).

---

## 4 · Graphify Setup

Graphify (code-review-graph MCP) must be configured for the `edu-hub` folder, not the workspace root.

**On first session:**
1. Confirm the MCP server is running: `list_graph_stats` — if it returns 0 nodes, run the indexer.
2. Set the project root to `workspace/edu-hub/` — not the workspace root (to avoid indexing `mathlogame`).
3. After the initial index, run `get_architecture_overview` and paste the output into `EDU_HUB_PRODUCT_MAP.md`.
4. The graph rebuilds automatically on every file edit via the PostToolUse hook — **unless** `CLAUDE_AUDIT_MODE=1` is set.

---

## 5 · Skills & Commands

Every skill maps to a slash command. Read the skill file before invoking.

### Core workflow skills

| Command | Skill file | When to use |
|---|---|---|
| `/new-feature` | `skills/new-feature/SKILL.md` | New route, component, API, or admin surface |
| `/commit` | `skills/commit/SKILL.md` | After every completed slice |
| `/pattern-check` | `skills/pattern-check/SKILL.md` | Before committing anything that touches Patterns 1–7 |
| `/review-changes` | `skills/review-changes/SKILL.md` | Before a merge / PR |
| `/debug-issue` | `skills/debug-issue/SKILL.md` | Bug hunt |
| `/clean-workspace` | `skills/clean-workspace/SKILL.md` | Dead-code sweep |

### Audit skills

| Command | Skill file | When to use |
|---|---|---|
| `/audit-feature` | `skills/audit-game/SKILL.md` *(adapted)* | Forensic review of one feature |
| `/god-mode-audit` | `skills/god-mode-audit/SKILL.md` | Full codebase health-check |

### Design skills

| Command | Skill file | When to use |
|---|---|---|
| `/design` | `skills/frontend-design/SKILL.md` | New page layout or visual direction decision |
| `/theme` | `skills/theme-factory/SKILL.md` | Apply or generate a brand theme |
| `/build-ui` | `skills/web-artifacts-builder/SKILL.md` | Complex multi-component UI prototype |

### Content & copy skills

| Command | When to use |
|---|---|
| `/add-copy <lang> <key> <value>` | Add a new string to the i18n JSON |
| `/translate <key>` | Request Arabic ↔ English translation of a copy key |

---

## 6 · Edu-Hub Brand & Design System

### 6.1 — Identity
Edu-Hub positions itself as **energetic, trustworthy, and celebration-forward**. Schools are the buyers; students and parents are the emotional audience. The brand should feel like a well-organised school event — colourful, structured, and warm.

### 6.2 — Colour tokens (define in `tailwind.config.ts`)
```
brand-primary:    #1A6B4A   /* deep emerald — trust, education */
brand-accent:     #F5A623   /* warm amber — energy, celebration */
brand-dark:       #0F1F17   /* near-black with green undertone */
brand-surface:    #F8FAF9   /* off-white with slight warmth */
brand-muted:      #6B8C7A   /* muted sage for secondary text */
```

### 6.3 — Typography
- **Display:** `Sora` (Latin) / `Cairo` (Arabic) — loaded via `next/font/google`
- **Body:** `Inter` (Latin) / `Noto Sans Arabic` (Arabic)
- **Scale:** use the Tailwind default scale; heading sizes are `text-5xl` → `text-2xl` by level

### 6.4 — Signature element
The single memorable visual: a **diagonal ribbon motif** in `brand-accent` that appears as a corner badge on service cards and as a divider on the hero section — evoking graduation sashes and award ribbons without being literal.

---

## 7 · Database Schema Conventions

Table naming: `snake_case`, plural (e.g., `service_categories`, `catalogue_items`).
All tables include: `id uuid DEFAULT gen_random_uuid() PRIMARY KEY`, `created_at timestamptz DEFAULT now()`, `updated_at timestamptz DEFAULT now()`.

Core tables (to be created in Phase 1):
- `service_categories` — Activities / School Services / Graduation
- `catalogue_items` — individual products / service packages
- `enquiries` — school contact form submissions
- `testimonials` — optional social proof

Every migration file lives in `db/migrations/` and is named `YYYYMMDD_HHMM_<description>.sql`.

---

## 8 · Build Phases (the roadmap)

Work in strict phase order. Do not start Phase N+1 until Phase N is committed.

### Phase 0 — Scaffold (do this first)
- [ ] `npx create-next-app edu-hub --typescript --tailwind --app --src-dir --import-alias "@/*"`
- [ ] Install: `shadcn/ui`, `next-intl`, `@supabase/ssr`, `zod`
- [ ] Create `tailwind.config.ts` with brand tokens (§6.2)
- [ ] Create `src/lib/supabase/server.ts` and `client.ts` (Pattern 3)
- [ ] Create `src/content/i18n/en.json` and `ar.json` with placeholder keys
- [ ] Create `CLAUDE.md` (this file), `EDU_HUB_PRODUCT_MAP.md` (empty)
- [ ] Initial commit: `scaffold: initialise edu-hub Next.js project`

### Phase 1 — Landing Page (marketing shell)
Hero → Services overview → Why Edu-Hub → Testimonials → Contact CTA
All static content. No Supabase needed yet.

### Phase 2 — Catalogue / Shop Front
Service category pages → Item detail pages → Enquiry form (Supabase insert)
Schema: `service_categories`, `catalogue_items`, `enquiries`

### Phase 3 — Admin Panel (optional / internal)
Simple password-protected route to manage catalogue items and view enquiries.
Uses Supabase Auth (email magic link).

### Phase 4 — Polish & Launch
SEO metadata, Open Graph images, performance audit, mobile QA, Vercel deploy.

---

## 9 · Commit Discipline

Every commit follows `/commit` (§5). Additional rules for Edu-Hub:

- Commit message prefix convention:
  - `scaffold:` — initial setup
  - `feat(landing):` — landing page work
  - `feat(catalogue):` — shop / catalogue work
  - `feat(admin):` — admin panel work
  - `fix:` — bug fix
  - `design:` — visual / CSS only
  - `copy:` — i18n / content only
  - `db:` — migration only
  - `refactor:` — no behaviour change
  - `chore:` — deps, config, tooling

- Never commit: API keys, `.env.local`, `node_modules`, build artefacts.

---

## 10 · Session Startup Checklist

Before writing a single line of code in any session, the agent MUST:

1. Read this file (`CLAUDE.md`) — state "✅ CLAUDE.md loaded"
2. Read `EDU_HUB_PRODUCT_MAP.md` if it exists — state "✅ product map loaded" (or "⚠️ not yet created")
3. Call `get_minimal_context(task="<what this session will do>")` — state the token count saved
4. State the current Phase from §8 and the specific slice being worked on
5. State which Pattern(s) from §3 apply to this session's work

If any of steps 1–5 are skipped, the session is non-compliant. Stop and restart.

---

## 11 · Hard Rules (never violate)

1. **Read before write.** Open every file before editing it. Never assume its current contents.
2. **Cite or shut up.** Every claim about the codebase = `path:line`. No "some files have…".
3. **One slice, one commit.** Never bundle unrelated changes.
4. **RLS on every table.** No Supabase table ships without a Row Level Security policy.
5. **No secrets in code.** All keys via `process.env`. Never hardcode credentials.
6. **Pattern-check before commit.** Any file touching Patterns 1–7 must pass `/pattern-check`.
7. **No `mathlogame/` writes.** That directory is read-only reference material.
8. **Bilingual from day one.** No English-only strings in TSX files — everything through i18n.
9. **Mobile-first.** All layouts are designed for 375px viewport, then scaled up.
10. **`next/image` only.** No raw `<img>` tags anywhere in the project.

---

*End of CLAUDE.md — this file is the single source of truth for the Edu-Hub project agent.*
