"use client";
import { useState } from "react";

export default function AccountForm() {
  const [p1, setP1] = useState("");
  const [p2, setP2] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg("");
    if (p1.length < 6) return setMsg("Password must be at least 6 characters.");
    if (p1 !== p2) return setMsg("Passwords don't match.");
    setBusy(true);
    const r = await fetch("/api/account/password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: p1 }),
    });
    setBusy(false);
    if (r.ok) {
      setMsg("Password updated ✓");
      setP1("");
      setP2("");
    } else {
      const d = await r.json().catch(() => ({}));
      setMsg(d.error || "Update failed");
    }
    setTimeout(() => setMsg(""), 3000);
  };

  const isErr = msg && !msg.includes("✓");
  return (
    <form onSubmit={submit} className="a-form">
      {msg && <div style={{ background: isErr ? "var(--a-red-soft)" : "var(--a-green-soft)", color: isErr ? "var(--a-red)" : "var(--a-green)", padding: "10px 12px", borderRadius: 8, fontSize: 13 }}>{msg}</div>}
      <div className="a-field"><label>NEW PASSWORD (MIN 6 CHARS)</label><input type="password" value={p1} onChange={(e) => setP1(e.target.value)} required /></div>
      <div className="a-field"><label>CONFIRM PASSWORD</label><input type="password" value={p2} onChange={(e) => setP2(e.target.value)} required /></div>
      <button className="a-btn a-btn-dark" disabled={busy} style={{ alignSelf: "flex-start" }}>{busy ? "Updating..." : "Update Password"}</button>
    </form>
  );
}
