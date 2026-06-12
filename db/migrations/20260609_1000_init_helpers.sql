-- Edu-Hub · shared extensions + helpers
-- Run order: this file first, then the table migrations, then the seed.

create extension if not exists pgcrypto;

-- Keep updated_at fresh on every UPDATE.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
