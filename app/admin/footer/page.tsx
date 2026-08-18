import Link from "next/link";
import { getFooter } from "@/lib/db";
import FooterEditor from "@/components/admin/FooterEditor";

export const dynamic = "force-dynamic";

export default async function FooterPage() {
  const footer = await getFooter();
  return (
    <>
      <header className="admin-topbar">
        <h1>Footer</h1>
        <div className="actions">
          <Link className="a-btn a-btn-ghost" href="/" target="_blank">View Site ↗</Link>
        </div>
      </header>
      <div className="a-content">
        <FooterEditor initial={footer} />
      </div>
    </>
  );
}
