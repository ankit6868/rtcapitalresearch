"use client";
import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";

type Ctx = { open: (preset?: string) => void; close: () => void; isOpen: boolean; preset: string };
const ModalCtx = createContext<Ctx | null>(null);

export function useModal() {
  const c = useContext(ModalCtx);
  if (!c) throw new Error("useModal must be used inside ModalProvider");
  return c;
}

const PROGRAMS = [
  "Stock Market Learning",
  "Options Trading",
  "Advanced Psychology",
  "Trader Residency",
  "Research Subscription",
  "Platform Access",
];

export default function ModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  const [preset, setPreset] = useState("");

  const open = useCallback((p?: string) => { setPreset(p ?? ""); setOpen(true); }, []);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
  }, [isOpen]);

  return (
    <ModalCtx.Provider value={{ open, close, isOpen, preset }}>
      {children}
      {isOpen && (
        <div className="modal-backdrop" onClick={close}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <button className="m-close" onClick={close} aria-label="Close">×</button>
            <div className="m-eyebrow">LIMITED SEATS AVAILABLE</div>
            <h3>Get Expert Guidance</h3>
            <div className="m-sub">Tell us your goals — we&apos;ll suggest the right program.</div>
            <ModalForm preset={preset} onDone={close} />
          </div>
        </div>
      )}
    </ModalCtx.Provider>
  );
}

function ModalForm({ preset, onDone }: { preset: string; onDone: () => void }) {
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    setBusy(true);
    setErr("");
    const r = await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        phone: fd.get("phone"),
        program: fd.get("program"),
        message: fd.get("message"),
        source: "modal",
      }),
    });
    setBusy(false);
    if (!r.ok) {
      const d = await r.json().catch(() => ({}));
      setErr(d.error || "Failed to send");
      return;
    }
    alert("Thanks — the desk will be in touch shortly.");
    onDone();
  };
  return (
    <form onSubmit={submit}>
      {err && <div style={{ background: "#fbeaea", color: "#e14747", padding: "8px 12px", borderRadius: 6, fontSize: 13, marginBottom: 12 }}>{err}</div>}
      <div className="form-grid">
        <div className="field">
          <label className="req">NAME</label>
          <input name="name" type="text" placeholder="Your name" required />
        </div>
        <div className="field">
          <label className="req">PHONE</label>
          <input name="phone" type="tel" placeholder="+91 98..." required />
        </div>
      </div>
      <div className="field">
        <label className="req">EMAIL</label>
        <input name="email" type="email" placeholder="you@email.com" required />
      </div>
      <div className="field">
        <label>INTERESTED IN</label>
        <select name="program" defaultValue={preset || ""}>
          <option value="">Select a program...</option>
          {PROGRAMS.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
      </div>
      <div className="field">
        <label>MESSAGE</label>
        <textarea name="message" placeholder="Your goals..." />
      </div>
      <button type="submit" className="btn btn-dark btn-arrow send-full" disabled={busy}>{busy ? "Sending..." : "Send Enquiry"}</button>
    </form>
  );
}
