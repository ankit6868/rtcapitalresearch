import Link from "next/link";
import { getSections } from "@/lib/db";
import SectionsList from "@/components/admin/SectionsList";

export const dynamic = "force-dynamic";

export default async function SectionsPage() {
  const sections = (await getSections()).sort((a, b) => a.order - b.order);
  return (
    <>
      <header className="admin-topbar">
        <h1>Sections</h1>
        <div className="actions">
          <Link className="a-btn a-btn-ghost" href="/" target="_blank">View Site ↗</Link>
        </div>
      </header>
      <div className="a-content">
        <SectionsList initial={sections} />
      </div>
    </>
  );
}
