import Link from "next/link";
import { getEnquiries, getSections } from "@/lib/db";

export const dynamic = "force-dynamic";

function fmtDate(iso: string) {
  const d = new Date(iso);
  const m = d.toLocaleString("en-US", { month: "short" });
  const day = d.getDate();
  const h = d.getHours();
  const min = String(d.getMinutes()).padStart(2, "0");
  const ap = h >= 12 ? "pm" : "am";
  const h12 = ((h + 11) % 12) + 1;
  return `${m} ${day}, ${h12}:${min}${ap}`;
}
function isToday(iso: string) {
  const d = new Date(iso), n = new Date();
  return d.getFullYear() === n.getFullYear() && d.getMonth() === n.getMonth() && d.getDate() === n.getDate();
}

export default async function Dashboard() {
  const enquiries = await getEnquiries();
  const sections = await getSections();
  const total = enquiries.length;
  const unread = enquiries.filter((e) => e.status === "new").length;
  const today = enquiries.filter((e) => isToday(e.createdAt)).length;
  const recent = enquiries.slice(0, 12);

  return (
    <>
      <header className="admin-topbar">
        <h1>Dashboard</h1>
        <div className="actions">
          <Link className="a-btn a-btn-ghost" href="/" target="_blank">View Site ↗</Link>
        </div>
      </header>
      <div className="a-content">
        <div className="a-grid-4">
          <div className="a-stat blue"><div className="num">{total}</div><div className="lbl">Total Enquiries</div></div>
          <div className="a-stat red"><div className="num">{unread}</div><div className="lbl">Unread</div></div>
          <div className="a-stat dark"><div className="num">{today}</div><div className="lbl">Today</div></div>
          <div className="a-stat green"><div className="num">{sections.length}</div><div className="lbl">Sections</div></div>
        </div>

        <div className="a-card">
          <h2>Recent Enquiries</h2>
          {recent.length === 0 ? (
            <p style={{ color: "var(--a-muted)", padding: "20px 0" }}>No enquiries yet. Once someone fills the form on the site, it&apos;ll appear here.</p>
          ) : (
            <table className="a-table">
              <thead>
                <tr>
                  <th>Name</th><th>Email / Phone</th><th>Program</th><th>Date</th><th>Status</th><th></th>
                </tr>
              </thead>
              <tbody>
                {recent.map((e) => (
                  <tr key={e.id} className={e.status === "new" ? "unread" : ""}>
                    <td className="name-cell"><b>{e.name}</b></td>
                    <td><a href={`mailto:${e.email}`}>{e.email}</a><br /><span style={{ color: "var(--a-muted)" }}>{e.phone}</span></td>
                    <td>{e.program || <em style={{ color: "var(--a-muted)" }}>—</em>}</td>
                    <td>{fmtDate(e.createdAt)}</td>
                    <td>{e.status === "new" ? <span className="pill-new-lg">New</span> : <span className="pill-read">Read</span>}</td>
                    <td><Link className="a-btn a-btn-ghost a-btn-sm" href={`/admin/enquiries/${e.id}`}>View</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}
