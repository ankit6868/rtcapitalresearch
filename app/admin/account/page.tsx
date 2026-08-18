import AccountForm from "@/components/admin/AccountForm";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default function AccountPage() {
  return (
    <>
      <header className="admin-topbar">
        <h1>Account</h1>
        <div className="actions">
          <Link className="a-btn a-btn-ghost" href="/" target="_blank">View Site ↗</Link>
        </div>
      </header>
      <div className="a-content">
        <div className="a-card" style={{ maxWidth: 460 }}>
          <h2>Change Password</h2>
          <AccountForm />
        </div>
      </div>
    </>
  );
}
