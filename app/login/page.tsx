"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [u, setU] = useState("");
  const [p, setP] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    const r = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: u, password: p }),
    });
    setBusy(false);
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      setErr(d.error || "Invalid credentials");
      return;
    }
    router.push("/admin");
    router.refresh();
  };

  return (
    <div className="login-shell">
      <form className="login-card" onSubmit={submit}>
        <div className="lbrand">
          <div className="mark">R</div>
          <h2>RT Capital Admin</h2>
          <p>Sign in to manage the site.</p>
        </div>
        {err && <div className="err">{err}</div>}
        <div className="a-field" style={{ marginBottom: 14 }}>
          <label>USERNAME</label>
          <input value={u} onChange={(e) => setU(e.target.value)} required autoComplete="username" />
        </div>
        <div className="a-field" style={{ marginBottom: 22 }}>
          <label>PASSWORD</label>
          <input type="password" value={p} onChange={(e) => setP(e.target.value)} required autoComplete="current-password" />
        </div>
        <button className="a-btn a-btn-dark" disabled={busy}>{busy ? "Signing in..." : "Sign in"}</button>
      </form>
    </div>
  );
}
