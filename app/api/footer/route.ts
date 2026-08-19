import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getFooter, saveFooter } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ footer: await getFooter() });
}

export async function POST(req: NextRequest) {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!Array.isArray(body.footer)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await saveFooter(body.footer);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
