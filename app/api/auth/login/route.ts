import { NextRequest, NextResponse } from "next/server";
import { verifyAdmin } from "@/lib/db";
import { createSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json().catch(() => ({}));
  if (!(await verifyAdmin(String(username || ""), String(password || "")))) {
    return NextResponse.json({ error: "invalid credentials" }, { status: 401 });
  }
  createSession(String(username));
  return NextResponse.json({ ok: true });
}
