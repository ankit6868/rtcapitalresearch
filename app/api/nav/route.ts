import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { getNav, saveNav } from "@/lib/db";
import { getSession } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ nav: await getNav() });
}

export async function POST(req: NextRequest) {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const body = await req.json();
  if (!Array.isArray(body.nav)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  await saveNav(body.nav);
  revalidatePath("/", "layout");
  return NextResponse.json({ ok: true });
}
