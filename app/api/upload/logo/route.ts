import { NextRequest, NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
import { getSession } from "@/lib/auth";
import { getSettings, saveSettings } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads", "logo");

export async function POST(req: NextRequest) {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const form = await req.formData();
  const file = form.get("file") as File | null;
  if (!file) return NextResponse.json({ error: "no file" }, { status: 400 });
  if (file.size > 2 * 1024 * 1024) return NextResponse.json({ error: "file too large (max 2 MB)" }, { status: 400 });
  const ext = (file.name.split(".").pop() || "png").toLowerCase();
  if (!["jpg", "jpeg", "png", "webp", "gif", "svg"].includes(ext)) {
    return NextResponse.json({ error: "unsupported format" }, { status: 400 });
  }
  if (!fs.existsSync(UPLOAD_DIR)) fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  const filename = `logo.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  fs.writeFileSync(path.join(UPLOAD_DIR, filename), buffer);
  const publicPath = `/uploads/logo/${filename}`;
  const s = await getSettings();
  await saveSettings({ ...s, logoPath: publicPath });
  return NextResponse.json({ ok: true, path: publicPath });
}

export async function DELETE() {
  if (!getSession()) return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  const s = await getSettings();
  await saveSettings({ ...s, logoPath: null });
  return NextResponse.json({ ok: true });
}
