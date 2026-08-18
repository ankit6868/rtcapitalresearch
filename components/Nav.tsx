"use client";
import { useModal } from "./ModalProvider";
import type { NavItem } from "@/lib/types";

export default function Nav({
  nav = [
    { label: "Firm", href: "#firm", visible: true },
    { label: "Services", href: "#services", visible: true },
    { label: "Platform", href: "#platform", visible: true },
    { label: "Traders", href: "#traders", visible: true },
    { label: "Insights", href: "#insights", visible: true },
    { label: "Contact", href: "#contact", visible: true },
  ],
  siteName = "RT Capital Research",
  logoPath = null,
  logoFallback = "R",
}: {
  nav?: NavItem[];
  siteName?: string;
  logoPath?: string | null;
  logoFallback?: string;
}) {
  const { open } = useModal();
  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = href;
    }
  };
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="logo" href="#top" onClick={scrollTo("#top")}>
          <span className="logo-mark" style={logoPath ? { padding: 0, overflow: "hidden" } : undefined}>
            {logoPath ? <img src={logoPath} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : logoFallback}
          </span>
          <span className="logo-text">
            <b>{siteName}</b>
            <span>RESEARCH</span>
          </span>
        </a>
        <nav className="nav-links">
          {nav.map((n) => <a key={n.href} href={n.href} onClick={scrollTo(n.href)}>{n.label}</a>)}
        </nav>
        <div className="nav-cta">
          <button className="btn btn-ghost" onClick={() => open()}>Client Login</button>
          <button className="btn btn-dark btn-arrow" onClick={scrollTo("#contact")}>Book a Call</button>
        </div>
      </div>
    </header>
  );
}
