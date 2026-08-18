const CARDS = [
  { n: "01", t: "Stock Market Learning Program", d: "Learn the stock market through a structured and practical approach designed for beginners and growing traders. The program covers market basics, trading psychology, risk management, technical analysis, and professional trading strategies step-by-step to build confidence and real market experience." },
  { n: "02", t: "LHT Traders", d: "LHT Traders is designed to help beginners grow into confident and disciplined traders through practical market education. We teach advanced trading strategies across multiple markets including stocks, crypto, indices, and global markets with a strong focus on risk management, market psychology, and real trading execution." },
  { n: "03", t: "Options Trading Program", d: "Master options trading with a structured learning approach designed for serious traders. This program covers advanced option strategies, hedging techniques, risk management, capital protection, and disciplined trade execution to help traders perform confidently in real market conditions." },
  { n: "04", t: "Advanced Psychology Program", d: "Develop the discipline, emotional control, and decision-making skills required for consistent trading success. The program focuses on trading psychology, risk control, patience, confidence building, and managing fear and greed under real market pressure." },
  { n: "05", t: "Access Floor Trading", d: "Get direct access to our professional trading floor environment where traders learn and trade alongside an active trading community. The program provides real market exposure, collaborative learning, live trading discussions, and a professional desk setup designed to build discipline and confidence." },
  { n: "06", t: "Remote Trading", d: "Trade from anywhere with professional support, market guidance, research access, and remote trading assistance designed for modern traders." },
];

function Icon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3v18h18" />
      <path d="M7 15l4-4 3 3 5-6" />
    </svg>
  );
}

export default function Services() {
  return (
    <section className="what" id="services">
      <div className="container">
        <div className="what-head">
          <div>
            <div className="eyebrow">WHAT WE DO</div>
            <h2>One desk. One system.</h2>
          </div>
          <p>We train, evaluate, and fund traders through a performance-focused trading environment designed around discipline and consistency.</p>
        </div>
        <div className="what-grid">
          {CARDS.map((c) => (
            <div key={c.n} className="wcard">
              <div className="wcard-head">
                <div className="wcard-icon"><Icon /></div>
                <div className="wcard-num">{c.n}</div>
              </div>
              <h3>{c.t}</h3>
              <p>{c.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
