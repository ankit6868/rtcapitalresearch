"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Settings } from "@/lib/types";

export default function SettingsForm({ initial }: { initial: Settings }) {
  const router = useRouter();
  const [s, setS] = useState<Settings>(initial);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setS((p) => ({ ...p, [k]: v }));
  const setHero = (k: keyof Settings["hero"], v: string) => setS((p) => ({ ...p, hero: { ...p.hero, [k]: v } }));
  const setContact = (k: keyof Settings["contact"], v: string) => setS((p) => ({ ...p, contact: { ...p.contact, [k]: v } }));
  const setStat = (i: number, k: "number" | "label", v: string) =>
    setS((p) => ({ ...p, stats: p.stats.map((st, idx) => (idx === i ? { ...st, [k]: v } : st)) }));
  const setPopup = (k: keyof Settings["popup"], v: string | number | boolean) =>
    setS((p) => ({ ...p, popup: { ...p.popup, [k]: v as never } }));
  const setFooterText = (k: keyof Settings["footerText"], v: string) =>
    setS((p) => ({ ...p, footerText: { ...p.footerText, [k]: v } }));

  const uploadLogo = async (file: File) => {
    const fd = new FormData();
    fd.append("file", file);
    const r = await fetch("/api/upload/logo", { method: "POST", body: fd });
    const d = await r.json();
    if (r.ok) {
      set("logoPath", d.path);
      setMsg("Logo uploaded ✓");
      router.refresh();
    } else {
      setMsg(d.error || "Upload failed");
    }
  };
  const removeLogo = async () => {
    await fetch("/api/upload/logo", { method: "DELETE" });
    set("logoPath", null);
    router.refresh();
  };

  const save = async () => {
    setSaving(true);
    const r = await fetch("/api/settings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(s),
    });
    setSaving(false);
    setMsg(r.ok ? "Settings saved ✓" : "Save failed");
    if (r.ok) router.refresh();
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <>
      {msg && <div style={{ position: "sticky", top: 0, background: "var(--a-green-soft)", color: "var(--a-green)", padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontWeight: 500, fontSize: 13 }}>{msg}</div>}

      <div className="a-section">
        <h3>Site Logo</h3>
        <p style={{ color: "var(--a-muted)", fontSize: 13, marginBottom: 16, lineHeight: 1.5 }}>
          Upload an image to replace the text square logo across the entire site (navbar, loader, footer). Supported formats: <b>JPG, PNG, WebP, GIF, SVG</b>. Max size: <b>2 MB</b>. Recommended: square image, at least 200 × 200 px, transparent PNG or SVG for best results.
        </p>
        <div className="logo-upload">
          <div className="preview">{s.logoPath ? <img src={s.logoPath} alt="" /> : s.logoFallback}</div>
          <div className="info" style={{ flex: 1 }}>
            <b>{s.logoPath ? "Logo uploaded ✓" : "No logo uploaded"}</b>
            <p>Click Choose File to upload a new logo. The new logo will appear on the live site immediately after upload.</p>
            <div className="btnrow">
              <label className="a-btn a-btn-primary" style={{ cursor: "pointer" }}>
                ↑ Upload Logo
                <input type="file" accept="image/*" hidden onChange={(e) => e.target.files?.[0] && uploadLogo(e.target.files[0])} />
              </label>
              {s.logoPath && <button className="a-btn a-btn-danger" onClick={removeLogo}>Remove Logo</button>}
            </div>
          </div>
        </div>
        {s.logoPath && <div className="mono-line"><b>Current path:</b> {s.logoPath}</div>}
      </div>

      <div className="a-section">
        <h3>Site Identity</h3>
        <div className="a-row-2">
          <div className="a-field"><label>SITE NAME</label><input value={s.siteName} onChange={(e) => set("siteName", e.target.value)} /></div>
          <div className="a-field"><label>LOGO TEXT FALLBACK (SHOWN IF NO IMAGE UPLOADED)</label><input value={s.logoFallback} onChange={(e) => set("logoFallback", e.target.value)} /></div>
        </div>
      </div>

      <div className="a-section">
        <h3>Hero Section</h3>
        <div className="a-field"><label>BADGE TEXT</label><input value={s.hero.badge} onChange={(e) => setHero("badge", e.target.value)} /></div>
        <div className="a-field" style={{ marginTop: 16 }}><label>MAIN HEADLINE</label><input value={s.hero.headline} onChange={(e) => setHero("headline", e.target.value)} /></div>
        <div className="a-field" style={{ marginTop: 16 }}><label>ITALIC / GRADIENT LINE</label><input value={s.hero.italic} onChange={(e) => setHero("italic", e.target.value)} /></div>
        <div className="a-field" style={{ marginTop: 16 }}><label>DESCRIPTION</label><textarea rows={4} value={s.hero.description} onChange={(e) => setHero("description", e.target.value)} /></div>
        <div className="a-row-2" style={{ marginTop: 16 }}>
          <div className="a-field"><label>BUTTON 1 TEXT</label><input value={s.hero.btn1} onChange={(e) => setHero("btn1", e.target.value)} /></div>
          <div className="a-field"><label>BUTTON 2 TEXT</label><input value={s.hero.btn2} onChange={(e) => setHero("btn2", e.target.value)} /></div>
        </div>
      </div>

      <div className="a-section">
        <h3>Stats Strip</h3>
        {s.stats.map((st, i) => (
          <div key={i} className="a-row-2" style={{ marginBottom: 14 }}>
            <div className="a-field"><label>STAT {i + 1} NUMBER</label><input value={st.number} onChange={(e) => setStat(i, "number", e.target.value)} /></div>
            <div className="a-field"><label>STAT {i + 1} LABEL</label><input value={st.label} onChange={(e) => setStat(i, "label", e.target.value)} /></div>
          </div>
        ))}
      </div>

      <div className="a-section">
        <h3>Contact Details</h3>
        <div className="a-row-2">
          <div className="a-field"><label>PHONE / WHATSAPP DISPLAY</label><input value={s.contact.phoneDisplay} onChange={(e) => setContact("phoneDisplay", e.target.value)} /></div>
          <div className="a-field"><label>WHATSAPP NUMBER (DIGITS ONLY)</label><input value={s.contact.whatsappDigits} onChange={(e) => setContact("whatsappDigits", e.target.value)} /></div>
        </div>
        <div className="a-row-2" style={{ marginTop: 16 }}>
          <div className="a-field"><label>EMAIL</label><input value={s.contact.email} onChange={(e) => setContact("email", e.target.value)} /></div>
          <div className="a-field"><label>DESK PHONE</label><input value={s.contact.deskPhone} onChange={(e) => setContact("deskPhone", e.target.value)} /></div>
        </div>
        <div className="a-field" style={{ marginTop: 16 }}>
          <label>WHATSAPP LINK URL (opens when the green button is clicked)</label>
          <input
            value={s.contact.whatsappUrl || ""}
            placeholder="https://wa.link/xxxxxx  or  https://wa.me/919XXXXXXXXX"
            onChange={(e) => setContact("whatsappUrl", e.target.value)}
          />
        </div>
        <div className="a-field" style={{ marginTop: 16 }}><label>MUMBAI ADDRESS</label><textarea rows={2} value={s.contact.mumbaiAddress} onChange={(e) => setContact("mumbaiAddress", e.target.value)} /></div>
        <div className="a-field" style={{ marginTop: 16 }}><label>UDAIPUR ADDRESS</label><textarea rows={2} value={s.contact.udaipurAddress} onChange={(e) => setContact("udaipurAddress", e.target.value)} /></div>
      </div>

      <div className="a-section">
        <h3>Lead Capture Popup</h3>
        <div className="a-row-2">
          <div className="a-field"><label>ENABLE POPUP</label>
            <select value={s.popup.enabled ? "1" : "0"} onChange={(e) => setPopup("enabled", e.target.value === "1")}>
              <option value="1">Enabled</option><option value="0">Disabled</option>
            </select>
          </div>
          <div className="a-field"><label>DELAY (MS)</label><input type="number" value={s.popup.delayMs} onChange={(e) => setPopup("delayMs", Number(e.target.value))} /></div>
        </div>
      </div>

      <div className="a-section">
        <h3>Footer Text</h3>
        <div className="a-field"><label>COPYRIGHT LINE</label><input value={s.footerText.copyright} onChange={(e) => setFooterText("copyright", e.target.value)} /></div>
        <div className="a-field" style={{ marginTop: 16 }}><label>DISCLAIMER</label><textarea rows={4} value={s.footerText.disclaimer} onChange={(e) => setFooterText("disclaimer", e.target.value)} /></div>
      </div>

      <button className="a-btn a-btn-primary" style={{ padding: "12px 22px", fontSize: 14 }} onClick={save} disabled={saving}>
        {saving ? "Saving..." : "Save All Settings"}
      </button>
    </>
  );
}
