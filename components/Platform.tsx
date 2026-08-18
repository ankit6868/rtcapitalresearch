const CARDS = [
  { tag: "BACKTESTING",  t: "Advanced Backtesting Software",  d: "Test strategies on historical market data before risking real capital. Detailed performance analysis and realistic market simulations." },
  { tag: "AUTOMATION",   t: "Strategy Automation Software",   d: "Transform your trading strategy into a fully automated system. Set rules, entries, exits, and risk parameters — execution handled automatically." },
  { tag: "DIRECT ACCESS",t: "Sterling TradING",               d: "Sterling Trader Pro — a full-featured Level II direct access trading platform designed for professionals in rapidly moving electronic markets." },
  { tag: "MULTI-ROUTE",  t: "Lightspeed Trader",              d: "The ideal platform for stocks and options with over 100 order routing destinations. Professional-grade execution with minimal latency." },
  { tag: "PROPRIETARY",  t: "RT Research Terminal",           d: "Built in-house and hardened on the firm desk. Research, execution, and review — one workspace for the independent professional." },
  { tag: "AI-POWERED",   t: "AI Insight Engine",              d: "Real-time AI signals, order flow interpretation, and probability scoring for live trade decision support." },
];

export default function Platform() {
  return (
    <section className="platform" id="platform">
      <div className="container">
        <div className="platform-head">
          <div>
            <div className="eyebrow">THE PLATFORM</div>
            <h2>Professional Trading Platform.</h2>
          </div>
          <p>We provide a professional trading platform designed to help traders execute trades efficiently with advanced tools, market access, risk management features, and a professional trading environment for serious market participants.</p>
        </div>
        <div className="platform-grid">
          {CARDS.map((c) => (
            <div key={c.tag} className="plcard">
              <div className="plcard-tag">{c.tag}</div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
