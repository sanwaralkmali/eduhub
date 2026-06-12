-- Edu-Hub · service_categories
-- The three pillars: Activities, School Services, Graduation.

create table if not exists public.service_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name_en text not null,
  name_ar text not null,
  tagline_en text,
  tagline_ar text,
  description_en text,
  description_ar text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists service_categories_active_idx
  on public.service_categories (is_active, sort_order);

drop trigger if exists set_service_categories_updated_at on public.service_categories;
create trigger set_service_categories_updated_at
  before update on public.service_categories
  for each row execute function public.set_updated_at();

-- RLS: anyone may read active categories; writes are service-role / admin only.
alter table public.service_categories enable row level security;

drop policy if exists "Public read active categories" on public.service_categories;
create policy "Public read active categories"
  on public.service_categories
  for select
  to anon, authenticated
  using (is_active = true);
