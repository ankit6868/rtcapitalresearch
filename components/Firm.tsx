"use client";

const ITEMS = [
  { n: "01", t: "Market Research", d: "Institutional-grade market intelligence powered by macro analysis, order-flow data, derivatives positioning, and proprietary trading models." },
  { n: "02", t: "Proprietary Trading", d: "We deploy internal capital across crypto, cash, F&O, and global derivative markets using systematic and discretionary strategies." },
  { n: "03", t: "Risk Management", d: "Professional risk frameworks around exposure control, drawdown protection, liquidity management, and disciplined capital preservation." },
  { n: "04", t: "Trader Development", d: "An intensive trader development program focused on market structure, execution, psychology, and performance-based capital allocation." },
];

export default function Firm() {
  const scroll = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="firm" id="firm">
      <div className="container firm-grid">
        <div>
          <div className="eyebrow">THE FIRM · EST. 2025</div>
          <h2>Built on discipline, <em>driven by performance.</em></h2>
          <p className="lede">We train traders with institutional concepts and provide capital to those who demonstrate consistency and risk control.</p>
          <button className="btn btn-dark btn-arrow" onClick={scroll}>Speak to the Desk</button>
        </div>
        <div className="firm-list">
          {ITEMS.map((i) => (
            <div key={i.n} className="firm-item">
              <div className="firm-num">{i.n}</div>
              <div><h3>{i.t}</h3><p>{i.d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
