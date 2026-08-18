"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { NavItem } from "@/lib/types";

export default function NavEditor({ initial }: { initial: NavItem[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [newLbl, setNewLbl] = useState("");
  const [newHref, setNewHref] = useState("");
  const [msg, setMsg] = useState("");

  const add = () => {
    if (!newLbl.trim() || !newHref.trim()) return;
    setItems((p) => [...p, { label: newLbl.trim(), href: newHref.trim(), visible: true }]);
    setNewLbl("");
    setNewHref("");
  };
  const remove = (i: number) => setItems((p) => p.filter((_, idx) => idx !== i));
  const update = (i: number, k: keyof NavItem, v: string | boolean) =>
    setItems((p) => p.map((it, idx) => (idx === i ? { ...it, [k]: v } : it)));

  const save = async () => {
    const r = await fetch("/api/nav", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nav: items }),
    });
    setMsg(r.ok ? "Navigation saved ✓" : "Save failed");
    if (r.ok) router.refresh();
    setTimeout(() => setMsg(""), 2500);
  };

  return (
    <>
      {msg && <div style={{ background: "var(--a-green-soft)", color: "var(--a-green)", padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 500 }}>{msg}</div>}

      <div className="a-section">
        <h3>Add Navigation Item</h3>
        <div className="add-nav-row">
          <div className="a-field"><label>LABEL</label><input placeholder="Label" value={newLbl} onChange={(e) => setNewLbl(e.target.value)} /></div>
          <div className="a-field"><label>URL OR ANCHOR</label><input placeholder="#section" value={newHref} onChange={(e) => setNewHref(e.target.value)} /></div>
          <button className="a-btn a-btn-primary add-nav-btn" onClick={add}>Add</button>
        </div>
      </div>

      <div className="a-section">
        <h3>Navigation Items</h3>
        {items.map((it, i) => (
          <div key={i} className="nav-row">
            <div className="n">{i + 1}</div>
            <input value={it.label} onChange={(e) => update(i, "label", e.target.value)} />
            <input value={it.href} onChange={(e) => update(i, "href", e.target.value)} />
            <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
              <label><input type="checkbox" checked={it.visible} onChange={(e) => update(i, "visible", e.target.checked)} /> Visible</label>
              <button className="a-btn a-btn-danger a-btn-sm" onClick={() => remove(i)}>Del</button>
            </div>
          </div>
        ))}
        <button className="a-btn a-btn-primary" style={{ marginTop: 16 }} onClick={save}>Save Navigation</button>
      </div>
    </>
  );
}
