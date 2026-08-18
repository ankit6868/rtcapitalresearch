# Deploy to Vercel + Supabase (zero-config path)

**TL;DR:** Import repo into Vercel → Connect Supabase from Vercel Storage → Deploy → Done.
The app auto-creates all its tables and seeds defaults on the first request. You never touch SQL.

---

## Recommended: Vercel + Supabase integration (no SQL editor needed)

1. **Push this repo to GitHub** (already done if you're reading this from the pushed copy).
2. In [Vercel](https://vercel.com), click **New Project** → import the GitHub repo.
3. Before deploying, click **Storage** in the project sidebar → **Create Database** → pick **Supabase** → choose a region.
   - This provisions a new Supabase project and **auto-injects all connection env vars** into your Vercel project:
     - `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
     - `POSTGRES_URL`, `POSTGRES_URL_NON_POOLING`, `POSTGRES_HOST`, `POSTGRES_PASSWORD`, etc.
4. Add ONE more env var yourself:
   - `AUTH_SECRET` — a random 64-char hex string. Vercel has a "Generate" button, or run:
     ```
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```
5. Click **Deploy**.
6. Visit your deployed URL. The first request triggers auto-migration — all six tables are created and the default admin user (`admin` / `admin123`) is seeded.
7. Go to `/login`, sign in, and **change the password** from Admin → Account.

That's it. No SQL editor. No `supabase link`. No CLI.

---

## Alternative: standalone Supabase project (no Vercel integration)

If you're hosting somewhere else, or you already have a Supabase project you want to reuse:

1. Create the project at [supabase.com](https://supabase.com) if you don't have one.
2. Grab three values from **Project Settings → API** and **Database**:
   - `SUPABASE_URL` (Project URL)
   - `SUPABASE_SERVICE_ROLE_KEY` (service_role secret — server-side only)
   - `POSTGRES_URL_NON_POOLING` (Connection string → URI, direct connection). Any of `POSTGRES_URL` / `DATABASE_URL` works too.
3. Set those + `AUTH_SECRET` on your host.
4. Deploy and hit any page — the auto-migrator runs the schema for you.

If for some reason you'd rather run the SQL by hand (auditability, custom RLS policies, etc.), the same file the migrator uses is at [`supabase/migrations/001_init.sql`](supabase/migrations/001_init.sql) — paste it into Supabase SQL Editor and run. The migrator will detect the tables already exist and skip.

---

## Local development

Just:
```
npm install
npm run dev
```

If you don't set any Supabase env vars, the app falls back to local JSON files under `./data/` (gitignored). Great for local iteration.

To test against your real Supabase from local, copy `.env.example` to `.env.local` and fill it in.

---

## How the auto-migrator works

- On the first request that hits the Supabase backend, [`lib/db-migrate.ts`](lib/db-migrate.ts) opens a direct Postgres connection using `POSTGRES_URL_NON_POOLING` (or `POSTGRES_URL` / `DATABASE_URL` as fallbacks).
- It runs `select exists (…) from information_schema.tables where table_name='enquiries'`. If true, migration is skipped.
- Otherwise it executes the entire `001_init.sql` file as one transaction: creates all six tables, seeds the default admin user, enables RLS.
- The success is cached in-process, so subsequent requests are instant.
- If a migration ever fails, the flag is reset and the next request retries.

The migration is idempotent (`create table if not exists`, `on conflict do nothing` on seeds) — safe to re-run at any time.

---

## Storage limitations

**Logo uploads** currently write to `/public/uploads/logo/` on the local filesystem. On Vercel's serverless runtime that path is read-only, so uploaded logos won't persist between deployments. Two paths forward when you're ready:

- **Quick fix**: bundle the logo you want as `public/logo.jpg` (already done — that's why the site has a default logo on first deploy).
- **Proper fix**: swap the `/api/upload/logo` route to use Supabase Storage. Create a public bucket named `logos`, then replace the local `fs.writeFileSync` with `sb.storage.from('logos').upload(...)`. All other admin features (enquiries, settings, sections, nav, footer) work on Vercel unchanged with Supabase.

---

## Troubleshooting

**Auto-migration doesn't run?** Check server logs for `[db-migrate]` messages. If you see `No POSTGRES_URL … env var found`, the Vercel-Supabase integration didn't complete — reconnect it from Vercel Storage, or manually add `POSTGRES_URL_NON_POOLING` from your Supabase project.

**Login fails immediately after first deploy?** The admin seed didn't insert. Check `admin` table in Supabase Table Editor — should have one row with `username='admin'`. If empty, run this in SQL Editor:
```sql
insert into public.admin (id, username, password_hash) values
  (1, 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9')
on conflict (id) do update set username=excluded.username, password_hash=excluded.password_hash;
```
Password: `admin123`.
