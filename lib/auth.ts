import crypto from "node:crypto";
import { cookies } from "next/headers";

const SECRET = process.env.AUTH_SECRET || "rtcap-dev-secret-change-me-in-prod";
const COOKIE = "rt_session";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 days

function sign(payload: string) {
  const h = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${payload}.${h}`;
}
function verify(token: string): string | null {
  const idx = token.lastIndexOf(".");
  if (idx < 0) return null;
  const payload = token.slice(0, idx);
  const h = token.slice(idx + 1);
  const expected = crypto.createHmac("sha256", SECRET).update(payload).digest("hex");
  if (h !== expected) return null;
  return payload;
}

export function createSession(username: string) {
  const payload = JSON.stringify({ u: username, t: Date.now() });
  const encoded = Buffer.from(payload).toString("base64url");
  const token = sign(encoded);
  cookies().set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}
export function destroySession() {
  cookies().set(COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
}
export function getSession(): { username: string } | null {
  const c = cookies().get(COOKIE);
  if (!c) return null;
  const payload = verify(c.value);
  if (!payload) return null;
  try {
    const decoded = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (!decoded.u) return null;
    return { username: decoded.u };
  } catch {
    return null;
  }
}
export function requireSession() {
  const s = getSession();
  if (!s) throw new Error("UNAUTHORIZED");
  return s;
}
