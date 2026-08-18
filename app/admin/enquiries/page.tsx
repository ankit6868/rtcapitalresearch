import Link from "next/link";
import { getEnquiries } from "@/lib/db";
import EnquiryActions from "@/components/admin/EnquiryActions";
import ExportCsvButton from "@/components/admin/ExportCsvButton";

export const dynamic = "force-dynamic";

function fmt(iso: string) {
  const d = new Date(iso);
  const m = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate(), y = d.getFullYear();
  const h = d.getHours(), min = String(d.getMinutes()).padStart(2, "0");
  const ap = h >= 12 ? "pm" : "am";
  const h12 = ((h + 11) % 12) + 1;
  return `${m} ${day}, ${y}\n${h12}:${min}${ap}`;
}
function isToday(iso: string) {
  const d = new Date(iso), n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
}

export default async function EnquiriesPage() {
  const enquiries = await getEnquiries();
  const unread = enquiries.filter((e) => e.status === "new").length;
  const today = enquiries.filter((e) => isToday(e.createdAt)).length;

  return (
    <>
      <header className="admin-topbar">
        <h1>Enquiries</h1>
        <div className="actions">
          <ExportCsvButton />
          <Link className="a-btn a-btn-ghost" href="/" target="_blank">View Site ↗</Link>
        </div>
      </header>
      <div className="a-content">
        <div className="a-toolbar">
          <div style={{ display: "flex", gap: 8 }}>
            <span className="pill-count b">{enquiries.length} total</span>
            <span className="pill-count r">{unread} unread</span>
            <span className="pill-count g">{today} today</span>
          </div>
          <ExportCsvButton />
        </div>
        <div className="a-card" style={{ padding: 0, overflow: "hidden" }}>
          <table className="a-table">
            <thead>
              <tr>
                <th style={{ padding: "14px 22px" }}>Name</th>
                <th>Contact</th>
                <th>Program</th>
                <th>Capital</th>
                <th>Message</th>
                <th>When</th>
                <th style={{ paddingRight: 22 }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 && (
                <tr><td colSpan={7} style={{ textAlign: "center", padding: 40, color: "var(--a-muted)" }}>
                  No enquiries yet.
                </td></tr>
              )}
              {enquiries.map((e) => (
                <tr key={e.id} className={e.status === "new" ? "unread" : ""}>
                  <td className="name-cell" style={{ paddingLeft: 22 }}>
                    <b>{e.name}</b>
                    {e.status === "new" && <span className="pill-new">New</span>}
                  </td>
                  <td>
                    <a href={`mailto:${e.email}`}>{e.email}</a><br />
                    <span style={{ color: "var(--a-muted)", fontSize: 13 }}>{e.phone}</span>
                  </td>
                  <td>{e.program || <em style={{ color: "var(--a-muted)" }}>—</em>}</td>
                  <td>{e.capital || <em style={{ color: "var(--a-muted)" }}>—</em>}</td>
                  <td style={{ maxWidth: 260 }}>{e.message
                    ? <div style={{ color: "var(--a-ink-2)", fontSize: 13, lineHeight: 1.5, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{e.message}</div>
                    : <em style={{ color: "var(--a-muted)" }}>—</em>}</td>
                  <td style={{ whiteSpace: "pre-line", fontSize: 12, color: "var(--a-muted)" }}>{fmt(e.createdAt)}</td>
                  <td style={{ paddingRight: 22 }}>
                    <EnquiryActions id={e.id} status={e.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
