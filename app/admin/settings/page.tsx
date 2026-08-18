import Link from "next/link";
import { getSettings } from "@/lib/db";
import SettingsForm from "@/components/admin/SettingsForm";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const settings = await getSettings();
  return (
    <>
      <header className="admin-topbar">
        <h1>Site Settings</h1>
        <div className="actions">
          <Link className="a-btn a-btn-ghost" href="/" target="_blank">View Site ↗</Link>
        </div>
      </header>
      <div className="a-content">
        <SettingsForm initial={settings} />
      </div>
    </>
  );
}
