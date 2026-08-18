"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, ReactNode } from "react";

// Cleaner Feather-style icons
const Icons = {
  dashboard: <><rect x="3" y="3" width="7" height="9" rx="1.5" /><rect x="14" y="3" width="7" height="5" rx="1.5" /><rect x="14" y="12" width="7" height="9" rx="1.5" /><rect x="3" y="16" width="7" height="5" rx="1.5" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>,
  sections: <><line x1="4" y1="6" x2="20" y2="6" /><line x1="4" y1="12" x2="20" y2="12" /><line x1="4" y1="18" x2="14" y2="18" /></>,
  nav: <><path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" /><path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" /></>,
  footer: <><rect x="3" y="4" width="18" height="6" rx="1.5" /><rect x="3" y="14" width="18" height="6" rx="1.5" /></>,
  enquiries: <><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" /></>,
  account: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  view: <><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="3" /></>,
  logout: <><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></>,
};

const ITEMS: { href: string; label: string; icon: ReactNode; showBadge?: boolean; exact?: boolean }[] = [
  { href: "/admin",             label: "Dashboard",     icon: Icons.dashboard, exact: true },
  { href: "/admin/settings",    label: "Site Settings", icon: Icons.settings },
  { href: "/admin/sections",    label: "Sections",      icon: Icons.sections },
  { href: "/admin/navigation",  label: "Navigation",    icon: Icons.nav },
  { href: "/admin/footer",      label: "Footer",        icon: Icons.footer },
  { href: "/admin/enquiries",   label: "Enquiries",     icon: Icons.enquiries, showBadge: true },
  { href: "/admin/account",     label: "Account",       icon: Icons.account },
];

export default function Sidebar({ siteName, logoPath }: { siteName: string; logoPath: string | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    fetch("/api/enquiries", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : { enquiries: [] }))
      .then((d) => setUnread((d.enquiries || []).filter((e: { status: string }) => e.status === "new").length))
      .catch(() => {});
  }, [pathname]);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  };

  return (
    <aside className="admin-sidebar">
      <div className="admin-brand">
        <div className="mark">{logoPath ? <img src={logoPath} alt="" /> : "R"}</div>
        <div className="txt">
          <b>{siteName}</b>
          <span>Admin Panel</span>
        </div>
      </div>
      <nav className="admin-nav">
        <div className="cat">Management</div>
        {ITEMS.map((it) => {
          const active = it.exact ? pathname === it.href : pathname === it.href || pathname.startsWith(it.href + "/");
          return (
            <Link key={it.href} href={it.href} className={active ? "active" : ""}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{it.icon}</svg>
              {it.label}
              {it.showBadge && unread > 0 && <span className="badge-count">{unread}</span>}
            </Link>
          );
        })}
      </nav>
      <div className="admin-foot">
        <Link href="/" target="_blank">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{Icons.view}</svg>
          View Website
        </Link>
        <a onClick={logout}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">{Icons.logout}</svg>
          Logout
        </a>
      </div>
    </aside>
  );
}
