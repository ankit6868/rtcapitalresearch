"use client";
import { useState } from "react";
import type { FooterColumn } from "@/lib/types";

const DEFAULT_COLS: FooterColumn[] = [
  { heading: "Firm", links: [
    { label: "About", href: "#about" }, { label: "Services", href: "#services" },
    { label: "Traders", href: "#traders" }, { label: "Contact", href: "#contact" }] },
  { heading: "Services", links: [
    { label: "Equity Research", href: "#services" }, { label: "Options Trading", href: "#services" },
    { label: "Portfolio Advisory", href: "#services" }, { label: "Trader Residency", href: "#traders" }] },
  { heading: "Platform", links: [
    { label: "Terminal", href: "#platform" }, { label: "API Access", href: "#platform" },
    { label: "Pricing", href: "#contact" }, { label: "Status", href: "#contact" }] },
  { heading: "Resources", links: [
    { label: "Insights", href: "#insights" }, { label: "Research Library", href: "#insights" },
    { label: "Help Centre", href: "#contact" }, { label: "SEBI Disclosures", href: "#contact" }] },
];

export default function Footer({
  siteName = "RT Capital Research",
  logoPath = null,
  logoFallback = "R",
  columns = DEFAULT_COLS,
  copyright = "© 2026 RT Capital Research. All rights reserved.",
  disclaimer = "RT Capital Research is not registered with any exchange as it's member neither regulated by SEBI, bearstreet only facilitates individuals and traders to complete the learning curve & practice for trading and tools to start their journey as a trader. RT Capital Research does not charge any security deposit towards trading and trading margin. RT Capital Research does not have any other branch.",
}: {
  siteName?: string;
  logoPath?: string | null;
  logoFallback?: string;
  columns?: FooterColumn[];
  copyright?: string;
  disclaimer?: string;
} = {}) {
  const [email, setEmail] = useState("");
  return (
    <footer className="foot">
      <div className="container">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="logo">
              <span className="logo-mark" style={logoPath ? { padding: 0, overflow: "hidden" } : undefined}>
                {logoPath ? <img src={logoPath} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : logoFallback}
              </span>
              <span className="logo-text"><b>{siteName}</b><span>INSTITUTIONAL · MUMBAI / UDAIPUR</span></span>
            </div>
            <p>A proprietary trading and market intelligence firm serving professional traders, family offices, and institutions.</p>
            <div className="sub-label">WEEKLY DESK NOTE</div>
            <form className="sub-form" onSubmit={(e) => { e.preventDefault(); alert("Subscribed."); setEmail(""); }}>
              <input type="email" placeholder="you@firm.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <button type="submit">Subscribe</button>
            </form>
          </div>
          {columns.map((col, i) => (
            <div key={i} className="foot-col">
              <h5>{col.heading.toUpperCase()}</h5>
              <ul>
                {col.links.map((l, j) => <li key={j}><a href={l.href}>{l.label}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
        <div className="disclaimer">
          <b>Disclaimer:</b> {disclaimer}
        </div>
        <div className="foot-bottom">
          <div>{copyright}</div>
          <div className="links"><a>Privacy</a><a>Terms</a><a>SEBI Disclosures</a></div>
        </div>
      </div>
    </footer>
  );
}
