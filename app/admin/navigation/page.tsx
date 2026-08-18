import Link from "next/link";
import { getNav } from "@/lib/db";
import NavEditor from "@/components/admin/NavEditor";

export const dynamic = "force-dynamic";

export default async function NavigationPage() {
  const nav = await getNav();
  return (
    <>
      <header className="admin-topbar">
        <h1>Navigation</h1>
        <div className="actions">
          <Link className="a-btn a-btn-ghost" href="/" target="_blank">View Site ↗</Link>
        </div>
      </header>
      <div className="a-content">
        <NavEditor initial={nav} />
      </div>
    </>
  );
}
