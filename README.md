# Edu-Hub

Bilingual (Arabic / English) marketing site + product catalogue for **Edu-Hub**, an
education-services company selling to schools across three pillars: **Activities**,
**School Services**, and **Graduation**.

> Standalone Next.js project. Read `CLAUDE.md` before every session — it is the single
> source of truth for patterns, phases, and conventions.

## Stack

Next.js 14 (App Router) · TypeScript · Tailwind CSS 3 · shadcn/ui · next-intl ·
Supabase (`@supabase/ssr`) · Zod · Vercel.

## Getting started

```bash
npm install
cp .env.local.example .env.local   # then fill in your Supabase values
npm run dev
```

Open http://localhost:3000.

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | Lint with `next lint` |

## Project layout

```
src/
├── app/         App Router pages, layouts, globals.css
├── components/  Shared UI (layout, marketing, catalogue, forms, admin, ui)
├── lib/         Supabase clients, i18n config, utils
└── content/     i18n message catalogues (en.json, ar.json)
db/migrations/   SQL migrations
tests/           Test files
```

## Conventions

See `CLAUDE.md` §3 for the 7 canonical patterns and `EDU_HUB_PRODUCT_MAP.md` for the
route map, component domains, and data model.
