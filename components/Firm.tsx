"use client";

type Point = { num: string; title: string; desc: string };
type FirmContent = {
  eyebrow?: string;
  headline?: string;
  italic?: string;
  desc?: string;
  ctaLabel?: string;
  points?: Point[];
};

const DEFAULT_POINTS: Point[] = [
  { num: "01", title: "Market Research", desc: "Institutional-grade market intelligence powered by macro analysis, order-flow data, derivatives positioning, and proprietary trading models." },
  { num: "02", title: "Proprietary Trading", desc: "We deploy internal capital across crypto, cash, F&O, and global derivative markets using systematic and discretionary strategies." },
  { num: "03", title: "Risk Management", desc: "Professional risk frameworks around exposure control, drawdown protection, liquidity management, and disciplined capital preservation." },
  { num: "04", title: "Trader Development", desc: "An intensive trader development program focused on market structure, execution, psychology, and performance-based capital allocation." },
];

export default function Firm({ content = {} }: { content?: FirmContent } = {}) {
  const c = {
    eyebrow: content.eyebrow || "THE FIRM · EST. 2025",
    headline: content.headline || "Built on discipline,",
    italic: content.italic || "driven by performance.",
    desc: content.desc || "We train traders with institutional concepts and provide capital to those who demonstrate consistency and risk control.",
    ctaLabel: content.ctaLabel || "Speak to the Desk",
    points: content.points && content.points.length ? content.points : DEFAULT_POINTS,
  };
  const scroll = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="firm" id="firm">
      <div className="container firm-grid">
        <div>
          <div className="eyebrow">{c.eyebrow}</div>
          <h2>{c.headline} <em>{c.italic}</em></h2>
          <p className="lede">{c.desc}</p>
          <button className="btn btn-dark btn-arrow" onClick={scroll}>{c.ctaLabel}</button>
        </div>
        <div className="firm-list">
          {c.points.map((p) => (
            <div key={p.num} className="firm-item">
              <div className="firm-num">{p.num}</div>
              <div><h3>{p.title}</h3><p>{p.desc}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
