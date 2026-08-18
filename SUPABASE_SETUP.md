# Supabase setup

The app auto-detects which backend to use:

- **If `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are set** → uses Supabase (Postgres).
- **Otherwise** → uses local JSON files under `./data/` (great for dev, not for production).

Follow these steps to move to Supabase.

---

## 1. Create the project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. **New Project** → give it a name (e.g. `rt-capital-research`), pick a region close to your users, and set a database password.
3. Wait ~2 minutes while the project provisions.

## 2. Run the schema

1. In your project, open **SQL Editor** in the left sidebar.
2. Click **New query**.
3. Open `supabase/migrations/001_init.sql` from this repo, copy the entire file, paste it into the query editor.
4. Click **Run** (or press Ctrl+Enter).

You should see a success message. This creates six tables: `settings`, `sections`, `nav`, `footer`, `enquiries`, `admin`, and seeds the default admin user (`admin` / `admin123`).

## 3. Grab your credentials

1. Open **Project Settings → API** in the left sidebar.
2. Copy these two values:
   - **Project URL** → this is your `SUPABASE_URL`
   - **`service_role` secret** (under Project API keys) → this is your `SUPABASE_SERVICE_ROLE_KEY`

> ⚠️ The `service_role` key **bypasses Row-Level Security**. Never expose it to a browser or commit it to git. It only lives in server-side env vars.

## 4. Configure your environment

### Local

Create `.env.local` in the project root (this file is gitignored):

```
SUPABASE_URL=https://xxxxxxxxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...long-string...
AUTH_SECRET=<paste a random 64-char hex string here>
```

Generate a random `AUTH_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Restart the dev server (`npm run dev`). It'll now read/write Supabase instead of local JSON files.

### Vercel

1. In your Vercel project, open **Settings → Environment Variables**.
2. Add three variables (available to Production, Preview, and Development):
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `AUTH_SECRET`
3. Redeploy.

## 5. Change the admin password

Log in at `/login` with `admin` / `admin123`, then go to **Account** in the sidebar and set a new password. The old one is immediately overwritten in Supabase.

## 6. (Optional) Migrate existing data

If you have data in `./data/*.json` you want to keep:

```bash
# From the project root
node -e "
const fs = require('fs');
const path = 'data/enquiries.json';
if (fs.existsSync(path)) {
  const rows = JSON.parse(fs.readFileSync(path,'utf8'));
  console.log(rows.length + ' enquiries — paste this into a Supabase SQL Editor:');
  console.log('insert into enquiries (id,name,email,phone,program,capital,message,source,status,created_at) values');
  console.log(rows.map(r => \`('\${r.id}',\$\$\${r.name}\$\$,\$\$\${r.email}\$\$,\$\$\${r.phone||''}\$\$,\$\$\${r.program||''}\$\$,\$\$\${r.capital||''}\$\$,\$\$\${r.message||''}\$\$,'\${r.source}','\${r.status}','\${r.createdAt}')\`).join(',\\n') + ';');
}
"
```

Copy the output, paste into Supabase SQL Editor, run.

For settings/sections/nav/footer: just edit them from the admin UI after logging in — much easier than migrating JSON.

---

## Verify it's working

After configuring env vars and restarting, hit any admin page — the top of `layout.tsx` calls `getSettings()`. If it renders, Supabase is wired. If you see an error, check:

- Correct `SUPABASE_URL` (with `https://` and no trailing slash)
- Correct `SUPABASE_SERVICE_ROLE_KEY` (starts with `eyJ`, not the anon key)
- SQL migration ran successfully (check the `admin` table has one row in Supabase → Table Editor)

## Troubleshooting

**Error: "relation public.settings does not exist"** — the SQL migration didn't run. Re-run `001_init.sql`.

**Login fails immediately** — the admin table wasn't seeded. In Supabase SQL Editor run:
```sql
insert into public.admin (id, username, password_hash) values
  (1, 'admin', '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9')
on conflict (id) do update set username=excluded.username, password_hash=excluded.password_hash;
```

**Logo upload doesn't persist on Vercel** — Vercel serverless has a read-only filesystem. Move logo uploads to Supabase Storage (create a bucket named `logos`, replace `/api/upload/logo` to use `sb().storage.from('logos').upload(...)`). This is a follow-up — the rest of the app works fine without it.
