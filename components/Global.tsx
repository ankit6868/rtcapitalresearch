type Region = { flag: string; title: string; desc: string; exchanges: string[]; perf: string };
type GlobalContent = { eyebrow?: string; headline?: string; regions?: Region[] };

const DEFAULT_REGIONS: Region[] = [
  { flag: "🗽",  title: "US Markets",       desc: "Equities, options, and futures across leading American exchanges with deep liquidity.", exchanges: ["NYSE","NASDAQ","CME","CBOE"],   perf: "+0.38%" },
  { flag: "🏛️", title: "European Markets", desc: "Coverage across leading European exchanges with focus on macro indices and events.",     exchanges: ["LSE","EURONEXT","XETRA"],       perf: "+0.21%" },
  { flag: "🌏",  title: "Asian Markets",    desc: "Home market expertise across NSE/BSE plus broader Asian coverage for cross-market strategies.", exchanges: ["NSE","BSE","HKEx","SGX"], perf: "+0.42%" },
];

export default function Global({ content = {} }: { content?: GlobalContent } = {}) {
  const c = {
    eyebrow: content.eyebrow || "GLOBAL REACH",
    headline: content.headline || "Trade The World Markets",
    regions: content.regions && content.regions.length ? content.regions : DEFAULT_REGIONS,
  };
  return (
    <section className="global">
      <div className="container">
        <div className="global-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>{c.eyebrow}</div>
          <h2>{c.headline}</h2>
        </div>
        <div className="global-grid">
          {c.regions.map((r) => (
            <div key={r.title} className="gcard">
              <div className="flag">{r.flag}</div>
              <h3>{r.title}</h3>
              <p>{r.desc}</p>
              <div className="exch">{r.exchanges.map((e) => <span key={e}>{e}</span>)}</div>
              <div className="perf">{r.perf}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
