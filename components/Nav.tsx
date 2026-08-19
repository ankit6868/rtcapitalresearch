"use client";
import { useEffect, useState } from "react";
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
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollTo = (href: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    if (href.startsWith("#")) {
      // small delay so drawer closes before scrolling
      setTimeout(() => document.querySelector(href)?.scrollIntoView({ behavior: "smooth" }), 60);
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
          <button
            className="nav-burger"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`nav-drawer${menuOpen ? " open" : ""}`} onClick={() => setMenuOpen(false)}>
        <div className="nav-drawer-panel" onClick={(e) => e.stopPropagation()}>
          <div className="nav-drawer-head">
            <b>Menu</b>
            <button className="nav-drawer-close" onClick={() => setMenuOpen(false)} aria-label="Close menu">×</button>
          </div>
          <nav className="nav-drawer-links">
            {nav.map((n) => (
              <a key={n.href} href={n.href} onClick={scrollTo(n.href)}>{n.label}</a>
            ))}
          </nav>
          <div className="nav-drawer-cta">
            <button className="btn btn-ghost" onClick={() => { setMenuOpen(false); open(); }}>Client Login</button>
            <button className="btn btn-dark btn-arrow" onClick={scrollTo("#contact")}>Book a Call</button>
          </div>
        </div>
      </div>
    </header>
  );
}
