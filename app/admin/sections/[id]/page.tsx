import Link from "next/link";
import { notFound } from "next/navigation";
import { getSections } from "@/lib/db";
import SectionEditor from "@/components/admin/SectionEditor";

export const dynamic = "force-dynamic";

export default async function EditSection({ params }: { params: { id: string } }) {
  const list = await getSections();
  const section = list.find((s) => s.id === params.id);
  if (!section) notFound();
  return (
    <>
      <header className="admin-topbar">
        <h1>Edit Section</h1>
        <div className="actions">
          <Link className="a-btn a-btn-ghost" href="/" target="_blank">View Site ↗</Link>
        </div>
      </header>
      <div className="a-content">
        <div className="a-toolbar">
          <Link href="/admin/sections" className="a-btn a-btn-ghost">← Back to Sections</Link>
          <span className="a-hint">Editing: <b style={{ color: "var(--a-ink)" }}>{section.key}</b></span>
        </div>
        <SectionEditor initial={section} />
      </div>
    </>
  );
}
