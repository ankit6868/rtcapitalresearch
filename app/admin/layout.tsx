import "./admin.css";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { getSettings } from "@/lib/db";
import Sidebar from "@/components/admin/Sidebar";

export const dynamic = "force-dynamic";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  if (!getSession()) redirect("/login");
  const s = await getSettings();
  return (
    <div className="admin-shell">
      <Sidebar siteName={s.siteName} logoPath={s.logoPath} />
      <div className="admin-main">{children}</div>
    </div>
  );
}
