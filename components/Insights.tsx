const SIDE = [
  { cat: "OPTIONS",     date: "MAY 09", t: "Skew is screaming. What the BANKNIFTY vol surface is telling us.",   by: "7 min read · Aman Verma",  highlight: false },
  { cat: "PSYCHOLOGY",  date: "MAY 05", t: "The 3pm trap: why most retail traders give back their gains.",       by: "5 min read · Priya Nair",  highlight: true },
  { cat: "MACRO",       date: "MAY 02", t: "Crude, the rupee, and the inflation print: setup into the May RBI meet.", by: "9 min read · Rohan Mehra", highlight: false },
];

export default function Insights() {
  return (
    <section className="insights" id="insights">
      <div className="container">
        <div className="insights-head">
          <div>
            <div className="eyebrow">FROM THE DESK</div>
            <h2>Insights, weekly.</h2>
          </div>
          <a className="btn btn-light btn-arrow">All articles</a>
        </div>
        <div className="insights-grid">
          <article className="feature">
            <div className="hero-img"></div>
            <div className="feature-meta">
              <span>MARKET STRATEGY</span><span>·</span><span>14 MIN READ</span><span>·</span><span>MAY 12, 2026</span>
            </div>
            <h3>Why the next leg of the Nifty rally lives or dies on bank earnings — a flow-based view.</h3>
            <p>A deep dive into FII positioning, derivatives skew, and credit-cycle signals shaping our base case.</p>
          </article>
          <aside className="sidearticles">
            {SIDE.map((s) => (
              <div key={s.t} className="sart">
                <div className="sart-meta"><span>{s.cat}</span><span>·</span><span>{s.date}</span></div>
                <h4 style={s.highlight ? { color: "var(--blue)" } : undefined}>{s.t}</h4>
                <div className="byline">{s.by}</div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
