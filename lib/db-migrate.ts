import { Client } from "pg";

// Runs the init migration ONCE per process cold start.
// Uses the direct Postgres connection URL that the Vercel-Supabase
// integration injects automatically. Idempotent (uses IF NOT EXISTS).
//
// The SQL is inlined (not read from disk) because Vercel's serverless
// bundler doesn't include arbitrary files from the source tree — only
// what's traceable through imports.

const INIT_SQL = `
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
alter table public.settings   enable row level security;
alter table public.sections   enable row level security;
alter table public.nav        enable row level security;
alter table public.footer     enable row level security;
alter table public.enquiries  enable row level security;
alter table public.admin      enable row level security;
`;

let migrationPromise: Promise<void> | null = null;
let migrated = false;

function pickConnectionString(): string | null {
  return (
    process.env.POSTGRES_URL_NON_POOLING ||
    process.env.POSTGRES_URL ||
    process.env.DATABASE_URL ||
    null
  );
}

async function runMigration(): Promise<void> {
  const conn = pickConnectionString();
  if (!conn) {
    console.warn(
      "[db-migrate] No POSTGRES_URL / DATABASE_URL env var found. " +
        "Skipping auto-migration. Either connect Supabase via Vercel integration " +
        "or run supabase/migrations/001_init.sql manually in the Supabase SQL editor."
    );
    // Mark as done so we don't retry every request when the env is intentionally
    // missing (e.g. someone using their own already-migrated database).
    migrated = true;
    return;
  }

  // Strip sslmode query param — when present in the connection string it
  // overrides the ssl option object, forcing strict cert verification which
  // fails on Supabase's self-signed intermediate chain from Vercel serverless.
  const cleanedConn = conn.replace(/([?&])sslmode=[^&]*(&|$)/g, (_, pre, post) =>
    post === "&" ? pre : ""
  ).replace(/\?$/, "");

  const client = new Client({
    connectionString: cleanedConn,
    ssl: { rejectUnauthorized: false },
  });

  try {
    await client.connect();
    // Quick check: if enquiries table already exists, skip.
    const check = await client.query<{ exists: boolean }>(
      "select exists (select from information_schema.tables where table_schema='public' and table_name='enquiries') as exists"
    );
    if (check.rows[0]?.exists) {
      console.log("[db-migrate] Schema already present — skipping.");
      migrated = true;
      return;
    }
    console.log("[db-migrate] Running initial schema migration...");
    await client.query(INIT_SQL);
    console.log("[db-migrate] Migration complete.");
    migrated = true;
  } finally {
    await client.end().catch(() => {});
  }
}

/** Call this at the top of every Supabase backend method. Runs once.
 *  NEVER throws — if migration fails, logs the error and lets the caller
 *  proceed. This way the app degrades gracefully: either the tables already
 *  exist (previous manual run), or the individual query will fail with a
 *  clearer error that the caller can handle. */
export async function ensureMigrated(): Promise<void> {
  if (migrated) return;
  if (!migrationPromise) {
    migrationPromise = runMigration().catch((err) => {
      console.error("[db-migrate] Migration failed (non-fatal):", err?.message || err);
      // Mark done so we don't hammer the DB with retries every request.
      // If the schema is missing, individual Supabase queries will error
      // and be handled per-call.
      migrated = true;
    });
  }
  await migrationPromise;
}
