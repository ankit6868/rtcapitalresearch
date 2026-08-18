"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Section } from "@/lib/types";

export default function SectionEditor({ initial }: { initial: Section }) {
  const router = useRouter();
  const [title, setTitle] = useState(initial.title);
  const [order, setOrder] = useState(initial.order);
  const [visible, setVisible] = useState(initial.visible);
  const [json, setJson] = useState(JSON.stringify(initial.content, null, 2));
  const [msg, setMsg] = useState("");
  const [saving, setSaving] = useState(false);

  const save = async () => {
    let content: unknown;
    try {
      content = JSON.parse(json);
    } catch {
      setMsg("Invalid JSON — please fix syntax before saving.");
      return;
    }
    setSaving(true);
    const r = await fetch(`/api/sections/${initial.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, order, visible, content }),
    });
    setSaving(false);
    setMsg(r.ok ? "Section saved ✓" : "Save failed");
    if (r.ok) router.refresh();
    setTimeout(() => setMsg(""), 2500);
  };

  const format = () => {
    try {
      setJson(JSON.stringify(JSON.parse(json), null, 2));
      setMsg("");
    } catch {
      setMsg("Invalid JSON — cannot format.");
    }
  };

  return (
    <div className="a-section">
      {msg && <div style={{ background: msg.includes("Invalid") || msg.includes("failed") ? "var(--a-red-soft)" : "var(--a-green-soft)", color: msg.includes("Invalid") || msg.includes("failed") ? "var(--a-red)" : "var(--a-green)", padding: "10px 16px", borderRadius: 8, marginBottom: 16, fontSize: 13, fontWeight: 500 }}>{msg}</div>}
      <div className="a-row-3">
        <div className="a-field"><label>SECTION TITLE</label><input value={title} onChange={(e) => setTitle(e.target.value)} /></div>
        <div className="a-field"><label>SORT ORDER</label><input type="number" value={order} onChange={(e) => setOrder(Number(e.target.value))} /></div>
        <div className="a-field"><label>VISIBLE</label>
          <select value={visible ? "1" : "0"} onChange={(e) => setVisible(e.target.value === "1")}>
            <option value="1">Yes</option><option value="0">No</option>
          </select>
        </div>
      </div>
      <div className="a-field mono" style={{ marginTop: 20 }}>
        <label>CONTENT JSON</label>
        <p style={{ color: "var(--a-muted)", fontSize: 12, margin: "-2px 0 8px" }}>Edit the JSON data for this section. Invalid JSON will be rejected.</p>
        <textarea rows={22} value={json} onChange={(e) => setJson(e.target.value)} style={{ fontFamily: "var(--mono)", fontSize: 13, lineHeight: 1.6 }} />
      </div>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button className="a-btn a-btn-primary" onClick={save} disabled={saving}>{saving ? "Saving..." : "Save Section"}</button>
        <button className="a-btn a-btn-ghost" onClick={format}>Format JSON</button>
        <a className="a-btn a-btn-ghost" href="/admin/sections">Cancel</a>
      </div>
    </div>
  );
}
