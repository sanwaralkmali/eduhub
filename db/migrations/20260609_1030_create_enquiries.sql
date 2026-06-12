-- Edu-Hub · enquiries
-- School contact-form submissions. Insert-only for the public; reads are admin-only.

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  school text,
  email text not null,
  phone text,
  message text not null,
  item_id uuid references public.catalogue_items (id) on delete set null,
  category_slug text,
  status text not null default 'new' check (status in ('new', 'contacted', 'closed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists enquiries_status_idx on public.enquiries (status, created_at desc);

drop trigger if exists set_enquiries_updated_at on public.enquiries;
create trigger set_enquiries_updated_at
  before update on public.enquiries
  for each row execute function public.set_updated_at();

-- RLS: anyone may submit (INSERT) an enquiry. No SELECT policy means reads are
-- denied by default — the admin panel (Phase 3) will read via the service role.
alter table public.enquiries enable row level security;

drop policy if exists "Anyone can submit an enquiry" on public.enquiries;
create policy "Anyone can submit an enquiry"
  on public.enquiries
  for insert
  to anon, authenticated
  with check (true);
