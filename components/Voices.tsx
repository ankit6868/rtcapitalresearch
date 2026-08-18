const V = [
  { av: "a1", ini: "AK", n: "Aditya Kapoor",  role: "Family office · Mumbai",       mLabel: "Returns FY25", mVal: "+34.2%", mCls: "up",      q: "The desk notes have replaced three of my research subscriptions. The conviction level is the highest I've seen outside a hedge fund." },
  { av: "a2", ini: "PN", n: "Priya Nair",     role: "Resident trader · Bengaluru",  mLabel: "Sharpe FY25",  mVal: "2.41",   mCls: "neutral", q: "Joined the trader residency in 2023. Today I run a ₹1.2 Cr book funded by the firm. The supervision is what made the difference." },
  { av: "a3", ini: "RM", n: "Rohan Mehra",    role: "Prop trader · Singapore",      mLabel: "Max DD",       mVal: "-3.1%",  mCls: "down",    q: "The risk infrastructure is what separates RT from the rest. I sleep at night knowing the kill-switch is doing its job before I can panic." },
];

export default function Voices() {
  return (
    <section className="voices">
      <div className="container">
        <div className="voices-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>CLIENT VOICES</div>
          <h2>Trusted by traders who already know better.</h2>
        </div>
        <div className="voices-grid">
          {V.map((v) => (
            <div key={v.n} className="vcard">
              <div className="vstars">★★★★★</div>
              <blockquote>&quot;{v.q}&quot;</blockquote>
              <div className="vbottom">
                <div className="vperson">
                  <div className={`avatar ${v.av}`}>{v.ini}</div>
                  <div><b>{v.n}</b><span>{v.role}</span></div>
                </div>
                <div className={`vmetric ${v.mCls}`}><span>{v.mLabel}</span><b>{v.mVal}</b></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
