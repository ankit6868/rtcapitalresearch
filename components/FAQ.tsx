"use client";
import { useState } from "react";

type QA = { q: string; a: string };
type FAQContent = { eyebrow?: string; headline?: string; contactLabel?: string; items?: QA[] };

const DEFAULT_ITEMS: QA[] = [
  { q: "Who can join the Trader Residency?",   a: "We accept traders of all experience levels. Selection is based on discipline, risk awareness, and aptitude — not P&L history. No capital required from your side." },
  { q: "What markets do you cover?",           a: "We actively cover NSE, BSE, NYSE, NASDAQ, LSE, CME and more — 14 global markets spanning equities, derivatives, currencies, and commodities." },
  { q: "What is the LHT Traders program?",     a: "LHT Traders is our education wing designed to take beginners to confident, disciplined traders — covering stocks, crypto, options, and all markets with deep focus on risk and psychology." },
  { q: "Can I access the platform remotely?",  a: "Absolutely. Our Remote Trading program gives full access to our terminal, research feeds, and PM oversight from anywhere in the world." },
  { q: "How do I get started?",                a: "Fill out the contact form or WhatsApp us at +91 6376055187. A senior PM will respond within one trading session." },
  { q: "What software platforms do you use?",  a: "We offer Advanced Backtesting Software, Strategy Automation Software, Sterling Trader Pro (Level II), and Lightspeed Trader with 100+ order routing destinations." },
];

export default function FAQ({ content = {} }: { content?: FAQContent } = {}) {
  const c = {
    eyebrow: content.eyebrow || "FREQUENTLY ASKED",
    headline: content.headline || "Common Questions",
    contactLabel: content.contactLabel || "Contact the desk",
    items: content.items && content.items.length ? content.items : DEFAULT_ITEMS,
  };
  const [open, setOpenIdx] = useState<number | null>(null);
  const scrollContact = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="faq">
      <div className="container faq-grid">
        <div className="faq-side">
          <div className="eyebrow">{c.eyebrow}</div>
          <h2>{c.headline}</h2>
          <p className="lnk">Can&apos;t find your answer? <a onClick={scrollContact}>{c.contactLabel} ↗</a></p>
        </div>
        <div className="faq-list">
          {c.items.map((f, i) => (
            <div key={f.q} className={`faq-item${open === i ? " open" : ""}`}>
              <button className="faq-q" onClick={() => setOpenIdx(open === i ? null : i)}>
                {f.q}<span className="ico">+</span>
              </button>
              <div className="faq-a" style={{ maxHeight: open === i ? 500 : 0 }}>
                <div className="faq-a-inner">{f.a}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
