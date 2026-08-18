"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { FooterColumn } from "@/lib/types";

const MAX_LINKS = 6;

export default function FooterEditor({ initial }: { initial: FooterColumn[] }) {
  const router = useRouter();
  // pad each column to MAX_LINKS empty slots for editing
  const seed = initial.map((c) => {
    const links = [...c.links];
    while (links.length < MAX_LINKS) links.push({ label: "", href: "" });
    return { ...c, links };
  });
  const [cols, setCols] = useState(seed);
  const [msg, setMsg] = useState("");

  const setHeading = (i: number, v: string) =>
    setCols((p) => p.map((c, idx) => (idx === i ? { ...c, heading: v } : c)));
  const setLink = (i: number, j: number, k: "label" | "href", v: string) =>
    setCols((p) => p.map((c, idx) => idx === i
      ? { ...c, links: c.links.map((l, jj) => (jj === j ? { ...l, [k]: v } : l)) }
      : c));

  const save = async () => {
    // strip empty links before saving
    const clean = cols.map((c) => ({ ...c, links: c.links.filter((l) => l.label.trim() && l.href.trim()) }));
    const r = await fetch("/api/footer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ footer: clean }),
    });
    setMsg(r.ok ? "Footer saved ✓" : "Save failed");
    if (r.ok) router.refresh();
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <>
      {msg && <div style={{ background: "var(--a-green-soft)", color: "var(--a-green)", padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 500 }}>{msg}</div>}
      <div className="foot-cols">
        {cols.map((c, i) => (
          <div key={i} className="foot-col-edit">
            <div className="heading-lbl">COLUMN HEADING</div>
            <input className="head-input" value={c.heading} onChange={(e) => setHeading(i, e.target.value)} />
            <div className="links-lbl">Links (label + URL):</div>
            {c.links.map((l, j) => (
              <div key={j} className="link-pair">
                <input placeholder="+ New link label" value={l.label} onChange={(e) => setLink(i, j, "label", e.target.value)} />
                <input placeholder="#" value={l.href} onChange={(e) => setLink(i, j, "href", e.target.value)} />
              </div>
            ))}
          </div>
        ))}
      </div>
      <button className="a-btn a-btn-primary" onClick={save}>Save Footer</button>
    </>
  );
}
