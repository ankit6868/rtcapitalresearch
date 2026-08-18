import { NextRequest, NextResponse } from "next/server";
import { deleteSection, updateSection } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  const section = await updateSection(params.id, body);
  if (!section) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true, section });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await deleteSection(params.id);
  return NextResponse.json({ ok: true });
}
