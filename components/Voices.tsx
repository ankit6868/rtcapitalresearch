type T = { av: string; ini: string; name: string; role: string; metricLabel: string; metricValue: string; metricClass: string; quote: string };
type VoicesContent = { eyebrow?: string; headline?: string; testimonials?: T[] };

const DEFAULT_T: T[] = [
  { av: "a1", ini: "AK", name: "Aditya Kapoor",  role: "Family office · Mumbai",       metricLabel: "Returns FY25", metricValue: "+34.2%", metricClass: "up",      quote: "The desk notes have replaced three of my research subscriptions. The conviction level is the highest I've seen outside a hedge fund." },
  { av: "a2", ini: "PN", name: "Priya Nair",     role: "Resident trader · Bengaluru",  metricLabel: "Sharpe FY25",  metricValue: "2.41",   metricClass: "neutral", quote: "Joined the trader residency in 2023. Today I run a ₹1.2 Cr book funded by the firm. The supervision is what made the difference." },
  { av: "a3", ini: "RM", name: "Rohan Mehra",    role: "Prop trader · Singapore",      metricLabel: "Max DD",       metricValue: "-3.1%",  metricClass: "down",    quote: "The risk infrastructure is what separates RT from the rest. I sleep at night knowing the kill-switch is doing its job before I can panic." },
];

export default function Voices({ content = {} }: { content?: VoicesContent } = {}) {
  const c = {
    eyebrow: content.eyebrow || "CLIENT VOICES",
    headline: content.headline || "Trusted by traders who already know better.",
    testimonials: content.testimonials && content.testimonials.length ? content.testimonials : DEFAULT_T,
  };
  return (
    <section className="voices">
      <div className="container">
        <div className="voices-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>{c.eyebrow}</div>
          <h2>{c.headline}</h2>
        </div>
        <div className="voices-grid">
          {c.testimonials.map((v) => (
            <div key={v.name} className="vcard">
              <div className="vstars">★★★★★</div>
              <blockquote>&quot;{v.quote}&quot;</blockquote>
              <div className="vbottom">
                <div className="vperson">
                  <div className={`avatar ${v.av}`}>{v.ini}</div>
                  <div><b>{v.name}</b><span>{v.role}</span></div>
                </div>
                <div className={`vmetric ${v.metricClass}`}><span>{v.metricLabel}</span><b>{v.metricValue}</b></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
