"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function EnquiryActions({ id, status }: { id: string; status: string }) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  const mark = async (newStatus: "read" | "responded") => {
    setBusy(true);
    await fetch(`/api/enquiries/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    router.refresh();
    setBusy(false);
  };
  const del = async () => {
    if (!confirm("Delete this enquiry? This cannot be undone.")) return;
    setBusy(true);
    await fetch(`/api/enquiries/${id}`, { method: "DELETE" });
    router.refresh();
    setBusy(false);
  };

  return (
    <div className="a-actions">
      {status === "new" && (
        <button className="icon-btn green" title="Mark responded" onClick={() => mark("responded")} disabled={busy}>✓</button>
      )}
      <Link className="icon-btn" title="View" href={`/admin/enquiries/${id}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
      </Link>
      <button className="icon-btn red" title="Delete" onClick={del} disabled={busy}>×</button>
    </div>
  );
}
