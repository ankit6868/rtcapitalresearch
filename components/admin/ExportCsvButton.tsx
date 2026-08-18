"use client";
export default function ExportCsvButton() {
  const download = async () => {
    const r = await fetch("/api/enquiries", { cache: "no-store" });
    const d = await r.json();
    const rows = d.enquiries || [];
    const headers = ["id", "name", "email", "phone", "program", "capital", "message", "source", "status", "createdAt"];
    const esc = (v: unknown) => `"${String(v ?? "").replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
    const csv = [headers.join(","), ...rows.map((r: Record<string, unknown>) => headers.map((h) => esc(r[h])).join(","))].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `enquiries-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <button className="a-btn a-btn-ghost" onClick={download}>Export CSV ↓</button>
  );
}
