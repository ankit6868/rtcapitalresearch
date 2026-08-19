type Card = { num: string; title: string; desc: string };
type ServicesContent = { eyebrow?: string; headline?: string; sub?: string; cards?: Card[] };

const DEFAULT_CARDS: Card[] = [
  { num: "01", title: "Stock Market Learning Program", desc: "Learn the stock market through a structured and practical approach designed for beginners and growing traders." },
  { num: "02", title: "LHT Traders", desc: "LHT Traders is designed to help beginners grow into confident and disciplined traders through practical market education." },
  { num: "03", title: "Options Trading Program", desc: "Master options trading with a structured learning approach designed for serious traders." },
  { num: "04", title: "Advanced Psychology Program", desc: "Develop the discipline, emotional control, and decision-making skills required for consistent trading success." },
  { num: "05", title: "Access Floor Trading", desc: "Get direct access to our professional trading floor environment where traders learn and trade alongside an active trading community." },
  { num: "06", title: "Remote Trading", desc: "Trade from anywhere with professional support, market guidance, research access, and remote trading assistance." },
];

function Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" /><path d="M7 15l4-4 3 3 5-6" />
    </svg>
  );
}

export default function Services({ content = {} }: { content?: ServicesContent } = {}) {
  const c = {
    eyebrow: content.eyebrow || "WHAT WE DO",
    headline: content.headline || "One desk. One system.",
    sub: content.sub || "We train, evaluate, and fund traders through a performance-focused trading environment designed around discipline and consistency.",
    cards: content.cards && content.cards.length ? content.cards : DEFAULT_CARDS,
  };
  return (
    <section className="what" id="services">
      <div className="container">
        <div className="what-head">
          <div>
            <div className="eyebrow">{c.eyebrow}</div>
            <h2>{c.headline}</h2>
          </div>
          <p>{c.sub}</p>
        </div>
        <div className="what-grid">
          {c.cards.map((card) => (
            <div key={card.num} className="wcard">
              <div className="wcard-head">
                <div className="wcard-icon"><Icon /></div>
                <div className="wcard-num">{card.num}</div>
              </div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
