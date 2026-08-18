import { NextRequest, NextResponse } from "next/server";
import { deleteEnquiry, updateEnquiry } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const rec = await updateEnquiry(params.id, body);
  if (!rec) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json({ ok: true, enquiry: rec });
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  await deleteEnquiry(params.id);
  return NextResponse.json({ ok: true });
}
