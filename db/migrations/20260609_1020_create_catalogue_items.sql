-- Edu-Hub · catalogue_items
-- Individual products / service packages, each belonging to one category.

create table if not exists public.catalogue_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.service_categories (id) on delete cascade,
  slug text not null,
  name_en text not null,
  name_ar text not null,
  summary_en text,
  summary_ar text,
  description_en text,
  description_ar text,
  features_en text[] not null default '{}',
  features_ar text[] not null default '{}',
  price_label_en text,
  price_label_ar text,
  image_url text,
  is_featured boolean not null default false,
  is_active boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (category_id, slug)
);

create index if not exists catalogue_items_category_idx
  on public.catalogue_items (category_id, is_active, sort_order);

drop trigger if exists set_catalogue_items_updated_at on public.catalogue_items;
create trigger set_catalogue_items_updated_at
  before update on public.catalogue_items
  for each row execute function public.set_updated_at();

-- RLS: anyone may read active items; writes are service-role / admin only.
alter table public.catalogue_items enable row level security;

drop policy if exists "Public read active items" on public.catalogue_items;
create policy "Public read active items"
  on public.catalogue_items
  for select
  to anon, authenticated
  using (is_active = true);
