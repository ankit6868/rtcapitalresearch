import Link from "next/link";
import { notFound } from "next/navigation";
import { getEnquiries, updateEnquiry } from "@/lib/db";
import DeleteEnquiryBtn from "@/components/admin/DeleteEnquiryBtn";

export const dynamic = "force-dynamic";

export default async function EnquiryView({ params }: { params: { id: string } }) {
  const list = await getEnquiries();
  const enquiry = list.find((e) => e.id === params.id);
  if (!enquiry) notFound();
  // auto-mark as read on view
  if (enquiry.status === "new") await updateEnquiry(enquiry.id, { status: "read" });

  const d = new Date(enquiry.createdAt);
  const when = d.toLocaleString("en-US", { dateStyle: "medium", timeStyle: "short" });

  return (
    <>
      <header className="admin-topbar">
        <h1>Enquiry Details</h1>
        <div className="actions">
          <Link className="a-btn a-btn-ghost" href="/admin/enquiries">← Back</Link>
          <a className="a-btn a-btn-primary" href={`mailto:${enquiry.email}?subject=Re: your enquiry to RT Capital Research`}>Reply via Email</a>
          <a className="a-btn a-btn-dark" target="_blank" href={`https://wa.me/${enquiry.phone.replace(/\D/g, "")}`}>WhatsApp ↗</a>
        </div>
      </header>
      <div className="a-content">
        <div className="enq-view-card">
          <div className="head">
            <div>
              <h2>{enquiry.name}</h2>
              <div className="sub">Submitted {when} · via {enquiry.source === "modal" ? "Get Expert Guidance popup" : "Contact form"}</div>
            </div>
            <DeleteEnquiryBtn id={enquiry.id} />
          </div>
          <div className="field-row"><div className="k">Email</div><div className="v"><a href={`mailto:${enquiry.email}`} style={{ color: "var(--a-blue)" }}>{enquiry.email}</a></div></div>
          <div className="field-row"><div className="k">Phone</div><div className="v">{enquiry.phone || "—"}</div></div>
          <div className="field-row"><div className="k">Program</div><div className="v">{enquiry.program || "—"}</div></div>
          <div className="field-row"><div className="k">Capital</div><div className="v">{enquiry.capital || "—"}</div></div>
          <div className="field-row"><div className="k">Status</div><div className="v" style={{ textTransform: "capitalize" }}>{enquiry.status}</div></div>
          <div className="field-row msg" style={{ borderBottom: "none" }}><div className="k">Message</div><div className="v">{enquiry.message || <em style={{ color: "var(--a-muted)" }}>No message</em>}</div></div>
        </div>
      </div>
    </>
  );
}
