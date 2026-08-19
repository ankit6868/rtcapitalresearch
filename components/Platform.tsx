type Card = { tag: string; title: string; desc: string };
type PlatformContent = { eyebrow?: string; headline?: string; sub?: string; cards?: Card[] };

const DEFAULT_CARDS: Card[] = [
  { tag: "BACKTESTING",  title: "Advanced Backtesting Software", desc: "Test strategies on historical market data before risking real capital. Detailed performance analysis and realistic market simulations." },
  { tag: "AUTOMATION",   title: "Strategy Automation Software",  desc: "Transform your trading strategy into a fully automated system. Set rules, entries, exits, and risk parameters — execution handled automatically." },
  { tag: "DIRECT ACCESS",title: "Sterling TradING",              desc: "Sterling Trader Pro — a full-featured Level II direct access trading platform designed for professionals in rapidly moving electronic markets." },
  { tag: "MULTI-ROUTE",  title: "Lightspeed Trader",             desc: "The ideal platform for stocks and options with over 100 order routing destinations. Professional-grade execution with minimal latency." },
  { tag: "PROPRIETARY",  title: "RT Research Terminal",          desc: "Built in-house and hardened on the firm desk. Research, execution, and review — one workspace for the independent professional." },
  { tag: "AI-POWERED",   title: "AI Insight Engine",             desc: "Real-time AI signals, order flow interpretation, and probability scoring for live trade decision support." },
];

export default function Platform({ content = {} }: { content?: PlatformContent } = {}) {
  const c = {
    eyebrow: content.eyebrow || "THE PLATFORM",
    headline: content.headline || "Professional Trading Platform.",
    sub: content.sub || "We provide a professional trading platform designed to help traders execute trades efficiently with advanced tools, market access, risk management features, and a professional trading environment for serious market participants.",
    cards: content.cards && content.cards.length ? content.cards : DEFAULT_CARDS,
  };
  return (
    <section className="platform" id="platform">
      <div className="container">
        <div className="platform-head">
          <div>
            <div className="eyebrow">{c.eyebrow}</div>
            <h2>{c.headline}</h2>
          </div>
          <p>{c.sub}</p>
        </div>
        <div className="platform-grid">
          {c.cards.map((card) => (
            <div key={card.tag} className="plcard">
              <div className="plcard-tag">{card.tag}</div>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
