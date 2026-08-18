import { NextRequest, NextResponse } from "next/server";
import { addSection, getSections, saveSections } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ sections: await getSections() });
}

export async function POST(req: NextRequest) {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  if (Array.isArray(body.sections)) {
    await saveSections(body.sections);
    return NextResponse.json({ ok: true });
  }
  await addSection({ title: body.title, key: body.key, content: body.content });
  return NextResponse.json({ ok: true });
}
