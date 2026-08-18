import fs from "node:fs";
import path from "node:path";
import { Client } from "pg";

// Runs the init migration ONCE per process cold start.
// Uses the direct Postgres connection URL that the Vercel-Supabase
// integration injects automatically. Idempotent (uses IF NOT EXISTS).

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
    // No Postgres URL available — we're either on fs backend or user needs to run SQL manually.
    console.warn(
      "[db-migrate] No POSTGRES_URL / DATABASE_URL env var found. " +
        "If you're using Supabase, either connect via Vercel-Supabase integration " +
        "(which auto-injects POSTGRES_URL), or run supabase/migrations/001_init.sql manually in the SQL editor."
    );
    return;
  }

  const sqlPath = path.join(process.cwd(), "supabase", "migrations", "001_init.sql");
  if (!fs.existsSync(sqlPath)) {
    console.warn("[db-migrate] Migration file not found at", sqlPath);
    return;
  }
  const sql = fs.readFileSync(sqlPath, "utf8");

  const client = new Client({
    connectionString: conn,
    // Supabase requires TLS. Vercel-injected URLs already include ?sslmode=require,
    // but be explicit for safety.
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
    await client.query(sql);
    console.log("[db-migrate] Migration complete.");
    migrated = true;
  } finally {
    await client.end().catch(() => {});
  }
}

/** Call this at the top of every Supabase backend method. Runs once. */
export async function ensureMigrated(): Promise<void> {
  if (migrated) return;
  if (!migrationPromise) {
    migrationPromise = runMigration().catch((err) => {
      console.error("[db-migrate] Migration failed:", err);
      // Reset so the next request can retry.
      migrationPromise = null;
      throw err;
    });
  }
  await migrationPromise;
}
