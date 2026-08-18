import { NextRequest, NextResponse } from "next/server";
import { updatePassword } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const { password } = await req.json().catch(() => ({}));
  const p = String(password || "");
  if (p.length < 6) return NextResponse.json({ error: "min 6 chars" }, { status: 400 });
  await updatePassword(p);
  return NextResponse.json({ ok: true });
}
