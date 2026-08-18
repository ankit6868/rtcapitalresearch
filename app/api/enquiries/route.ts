import { NextRequest, NextResponse } from "next/server";
import { addEnquiry, getEnquiries } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  return NextResponse.json({ enquiries: await getEnquiries() });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const name = String(body.name || "").trim();
    const email = String(body.email || "").trim();
    const phone = String(body.phone || "").trim();
    if (!name || !email) return NextResponse.json({ error: "name and email required" }, { status: 400 });
    const rec = await addEnquiry({
      name,
      email,
      phone,
      program: body.program ? String(body.program) : undefined,
      capital: body.capital ? String(body.capital) : undefined,
      message: body.message ? String(body.message) : undefined,
      source: body.source === "contact" ? "contact" : "modal",
    });
    return NextResponse.json({ ok: true, id: rec.id });
  } catch (e) {
    return NextResponse.json({ error: "invalid payload" }, { status: 400 });
  }
}
