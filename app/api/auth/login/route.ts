import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/db";
import { createSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json().catch(() => ({}));
  try {
    if (!(await verifyAdmin(String(username || ""), String(password || "")))) {
      return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
    }
    createSession(String(username));
    return NextResponse.json({ ok: true });
  } catch (e) {
    const msg = (e as Error)?.message || String(e);
    console.error("[login] verifyAdmin error:", msg);
    if (msg.toLowerCase().includes("does not exist") || msg.toLowerCase().includes("schema cache")) {
      return NextResponse.json(
        { error: "Database not initialized — run supabase/migrations/001_init.sql in the Supabase SQL editor." },
        { status: 503 }
      );
    }
    if (msg.toLowerCase().includes("certificate")) {
      return NextResponse.json(
        { error: "Database SSL connection failed — check POSTGRES_URL_NON_POOLING env var." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: "Login backend error: " + msg }, { status: 500 });
  }
}
