-- RT Capital Research — initial schema
-- Paste this entire file into: Supabase Dashboard → SQL Editor → New query → Run

-- ============ Settings (single row) ============
create table if not exists public.settings (
  id integer primary key default 1,
  data jsonb not null,
  updated_at timestamptz default now(),
  constraint settings_singleton check (id = 1)
);

-- ============ Sections ============
create table if not exists public.sections (
  id text primary key,
  title text not null,
  key text not null unique,
  "order" integer not null default 0,
  visible boolean not null default true,
  content jsonb not null default '{}'::jsonb,
  updated_at timestamptz default now()
);
create index if not exists sections_order_idx on public.sections ("order");

-- ============ Nav (single-row jsonb array for simplicity) ============
create table if not exists public.nav (
  id integer primary key default 1,
  items jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now(),
  constraint nav_singleton check (id = 1)
);

-- ============ Footer (single-row jsonb array) ============
create table if not exists public.footer (
  id integer primary key default 1,
  columns jsonb not null default '[]'::jsonb,
  updated_at timestamptz default now(),
  constraint footer_singleton check (id = 1)
);

-- ============ Enquiries ============
create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  program text,
  capital text,
  message text,
  source text not null default 'modal',
  status text not null default 'new',
  created_at timestamptz not null default now()
);
create index if not exists enquiries_created_at_idx on public.enquiries (created_at desc);
create index if not exists enquiries_status_idx on public.enquiries (status);

-- ============ Admin (single row) ============
create table if not exists public.admin (
  id integer primary key default 1,
  username text not null,
  password_hash text not null,
  updated_at timestamptz default now(),
  constraint admin_singleton check (id = 1)
);

-- Seed default admin: username=admin, password=admin123
-- sha256('admin123') = 240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9
insert into public.admin (id, username, password_hash)
values (1, 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9')
on conflict (id) do nothing;

-- ============ Row-Level Security ============
-- Server code uses the SERVICE_ROLE key which bypasses RLS.
-- Enable RLS + deny-all policies so nothing leaks if the anon key is ever misused.
alter table public.settings   enable row level security;
alter table public.sections   enable row level security;
alter table public.nav        enable row level security;
alter table public.footer     enable row level security;
alter table public.enquiries  enable row level security;
alter table public.admin      enable row level security;

-- Deny-all for anon/authenticated (only service_role bypasses).
-- Anon can still POST enquiries via /api/enquiries because the API uses the service role key.
