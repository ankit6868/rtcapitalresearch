# RT Capital Research

Next.js 14 (App Router) marketing site + full admin panel for RT Capital Research.

- **Public site** at `/` — hero with live NIFTY/heatmap/desk-signal cards, all sections editable from admin
- **Admin panel** at `/admin` — dashboard, site settings, sections editor, navigation, footer, enquiries inbox, account
- **Enquiries** — both the contact form and the "Get Expert Guidance" popup POST to `/api/enquiries` and land in the admin inbox

## Stack

- Next.js 14 · React 18 · TypeScript
- Supabase (Postgres) in production · local JSON files in dev — [auto-detected](lib/db.ts)
- HMAC-signed cookie session auth (no third-party dep)
- Zero external CSS libraries — hand-rolled design system in [`globals.css`](app/globals.css) + [`admin/admin.css`](app/admin/admin.css)

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the site, `http://localhost:3000/login` for admin.

**Default admin credentials:** `admin` / `admin123` — change from **Admin → Account** on first login.

Without Supabase env vars set, the app uses local JSON files under `./data/` (gitignored). Great for dev.

## Deploy to Vercel + Supabase (zero-config)

1. Import this repo into Vercel.
2. In the project sidebar: **Storage → Create Database → Supabase**. This auto-injects every Supabase and Postgres env var into your project.
3. Add one env var yourself: `AUTH_SECRET` (Vercel has a Generate button).
4. Deploy. Visit the site — the app auto-creates all tables and seeds the default admin user on the first request. No SQL to paste.

Login at `/login` with `admin` / `admin123` and change the password from Admin → Account.

Full step-by-step and alternatives in [`SUPABASE_SETUP.md`](SUPABASE_SETUP.md).

## Project layout

```
app/
  page.tsx                      home
  layout.tsx
  globals.css
  login/                        admin login
  admin/                        admin panel (sidebar + all pages)
  api/                          all API routes
components/
  Nav, Hero, HeroCards, Firm, Services, Global, LHT, Platform,
  Trader, Voices, Insights, FAQ, Contact, Footer, WhatsAppFab,
  ModalProvider (Get Expert Guidance popup)
  admin/                        admin UI components
lib/
  db.ts                         backend selector
  db-fs.ts                      JSON-file backend
  db-supabase.ts                Supabase backend
  auth.ts                       cookie session
  types.ts, defaults.ts
supabase/migrations/001_init.sql
public/logo.svg                 default logo (override via Admin → Site Settings)
```

## Live features on the hero

- **NIFTY 50 chart** — ticks every 1.6s with a mean-reverting drift, redraws the line + area + candles
- **Sector Heatmap** — 8 sectors, values drift every 2.2s with color re-mapping
- **Desk Signal** — rotates through 6 stocks every 4.2s with fade transitions
- All three cards float with staggered CSS keyframe animations

## Admin capabilities

Every field on the public site is editable without touching code:

| Admin page | Controls |
|---|---|
| **Site Settings** | Logo (upload/remove), site name, hero text/headline/description/buttons, stats strip, contact details, popup config, footer text |
| **Sections** | 9 sections with jsonb content, add/edit/hide/delete + inline JSON editor |
| **Navigation** | Nav items with label + href, visibility toggle, add/delete |
| **Footer** | 4 columns with headings + link pairs |
| **Enquiries** | Filter/read/mark responded/delete, export CSV, view detail with reply-via-email + WhatsApp buttons |
| **Account** | Change admin password |
