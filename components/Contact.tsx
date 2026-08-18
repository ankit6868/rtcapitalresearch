"use client";
import { useState } from "react";

const CHIPS = ["Research", "Learning Program", "Platform Access", "Floor Trading", "Remote Trading"];

export default function Contact({
  phoneDisplay = "+91  8003051188",
  email = "DUDNJD096@GMAIL.COM",
  udaipurAddress = "RT Capital, The Keys Hotel E 263, First Floor, Madri Industrial Area, Udaipur, Rajasthan 313001",
}: {
  phoneDisplay?: string;
  email?: string;
  udaipurAddress?: string;
} = {}) {
  const [active, setActive] = useState<Set<string>>(new Set(["Research"]));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");
  const toggle = (c: string) => {
    const n = new Set(active);
    n.has(c) ? n.delete(c) : n.add(c);
    setActive(n);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setMsg("");
    const r = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        capital: fd.get("capital"),
        program: [...active].join(", "),
        message: fd.get("message"),
        source: "contact",
      }),
    });
    setBusy(false);
    if (r.ok) {
      setMsg("Thanks — the desk will be in touch shortly.");
      (e.target as HTMLFormElement).reset();
    } else {
      const d = await r.json().catch(() => ({}));
      setMsg(d.error || "Failed to send");
    }
    setTimeout(() => setMsg(""), 4000);
  };

  return (
    <section className="contact" id="contact">
      <div className="container contact-grid">
        <div className="contact-side">
          <div className="eyebrow">GET IN TOUCH</div>
          <h2>Speak directly with the desk.</h2>
          <p className="lede">Whether you are a serious trader, family office, or institution — a senior PM will personally respond within one trading session.</p>
          <div className="contact-block">
            <div className="label">UDAIPUR · REVIEW TRADING</div>
            <div className="addr">{udaipurAddress}</div>
          </div>
          <div className="contact-row">
            <div>
              <div className="label">PHONE</div>
              <div className="val">{phoneDisplay}</div>
            </div>
            <div>
              <div className="label">EMAIL</div>
              <div className="val">{email}</div>
            </div>
          </div>
          <div className="contact-block" style={{ marginTop: 22 }}>
            <div className="label">WHATSAPP</div>
            <div className="val wa">{phoneDisplay}</div>
          </div>
        </div>

        <form className="form-card" onSubmit={submit}>
          <h3>Send the desk a note</h3>
          <div className="sub">Average response during market hours: 28 minutes.</div>
          {msg && (
            <div style={{
              padding: "10px 14px",
              borderRadius: 8,
              marginBottom: 16,
              fontSize: 13,
              background: msg.includes("Thanks") ? "var(--green-soft)" : "#fbeaea",
              color: msg.includes("Thanks") ? "var(--green)" : "#e14747",
            }}>{msg}</div>
          )}
          <div className="form-grid">
            <div className="field"><label>FULL NAME</label><input name="name" type="text" placeholder="Your name" required /></div>
            <div className="field"><label>EMAIL</label><input name="email" type="email" placeholder="you@firm.com" required /></div>
            <div className="field"><label>PHONE</label><input name="phone" type="tel" placeholder="+91 98..." /></div>
            <div className="field">
              <label>CAPITAL AVAILABLE</label>
              <select name="capital">
                <option>Under ₹10 Lakh</option>
                <option>₹10L – ₹50L</option>
                <option>₹50L – ₹2Cr</option>
                <option>₹2Cr+</option>
              </select>
            </div>
          </div>
          <div className="field" style={{ marginBottom: 20 }}>
            <label>I&apos;M INTERESTED IN</label>
            <div className="chips">
              {CHIPS.map((c) => (
                <span key={c} className={`chip${active.has(c) ? " active" : ""}`} onClick={() => toggle(c)}>{c}</span>
              ))}
            </div>
          </div>
          <div className="field"><label>MESSAGE</label><textarea name="message" placeholder="Tell us what you're looking for..." /></div>
          <div className="form-foot">
            <small>By submitting you agree to our privacy policy.</small>
            <button type="submit" className="btn btn-dark btn-arrow" disabled={busy}>{busy ? "Sending..." : "Send to desk"}</button>
          </div>
        </form>
      </div>
    </section>
  );
}
