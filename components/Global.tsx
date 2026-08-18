const REGIONS = [
  { flag: "🗽", t: "US Markets",       d: "Equities, options, and futures across leading American exchanges with deep liquidity.", ex: ["NYSE","NASDAQ","CME","CBOE"],   perf: "+0.38%" },
  { flag: "🏛️", t: "European Markets", d: "Coverage across leading European exchanges with focus on macro indices and events.",     ex: ["LSE","EURONEXT","XETRA"],       perf: "+0.21%" },
  { flag: "🌏", t: "Asian Markets",    d: "Home market expertise across NSE/BSE plus broader Asian coverage for cross-market strategies.", ex: ["NSE","BSE","HKEx","SGX"],  perf: "+0.42%" },
];

export default function Global() {
  return (
    <section className="global">
      <div className="container">
        <div className="global-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>GLOBAL REACH</div>
          <h2>Trade The World Markets</h2>
        </div>
        <div className="global-grid">
          {REGIONS.map((r) => (
            <div key={r.t} className="gcard">
              <div className="flag">{r.flag}</div>
              <h3>{r.t}</h3>
              <p>{r.d}</p>
              <div className="exch">{r.ex.map((e) => <span key={e}>{e}</span>)}</div>
              <div className="perf">{r.perf}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
