"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { Section } from "@/lib/types";

export default function SectionsList({ initial }: { initial: Section[] }) {
  const router = useRouter();
  const [items, setItems] = useState(initial);
  const [adding, setAdding] = useState(false);

  const toggleVisible = async (id: string, visible: boolean) => {
    await fetch(`/api/sections/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visible: !visible }),
    });
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, visible: !visible } : s)));
    router.refresh();
  };
  const del = async (id: string) => {
    if (!confirm("Delete this section?")) return;
    await fetch(`/api/sections/${id}`, { method: "DELETE" });
    setItems((prev) => prev.filter((s) => s.id !== id));
    router.refresh();
  };
  const add = async () => {
    const title = prompt("Section title?");
    if (!title) return;
    const key = prompt("Section key (lowercase, no spaces)?", title.toLowerCase().replace(/\s+/g, "-"));
    if (!key) return;
    setAdding(true);
    await fetch("/api/sections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, key, content: {} }),
    });
    setAdding(false);
    router.refresh();
  };

  return (
    <>
      <div className="a-toolbar">
        <span className="a-hint">{items.length} sections · click Edit to modify content JSON</span>
        <button className="a-btn a-btn-primary" onClick={add} disabled={adding}>+ Add Section</button>
      </div>

      {items.map((s, i) => (
        <div key={s.id} className="sec-row">
          <div style={{ display: "flex", alignItems: "flex-start" }}>
            <div className="idx">#{i + 1}</div>
            <div>
              <div className="ttl">{s.title}</div>
              <div className="kv">key: <b>{s.key}</b> · order: <b>{s.order}</b></div>
            </div>
          </div>
          <div className="r-actions">
            {s.visible ? <span className="pill-visible">Visible</span> : <span className="pill-hidden">Hidden</span>}
            <Link href={`/admin/sections/${s.id}`} className="a-btn a-btn-primary a-btn-sm">Edit</Link>
            <button className="a-btn a-btn-ghost a-btn-sm" onClick={() => toggleVisible(s.id, s.visible)}>{s.visible ? "Hide" : "Show"}</button>
            <button className="a-btn a-btn-danger a-btn-sm" onClick={() => del(s.id)}>Del</button>
          </div>
        </div>
      ))}
    </>
  );
}
