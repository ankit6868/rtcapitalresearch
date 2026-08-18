"use client";
import { useModal } from "./ModalProvider";

const DEFAULT_STATS = [
  { number: "₹50L",  label: "Starting capital allocated to top residents" },
  { number: "12 wks", label: "Structured residency programme" },
  { number: "70/30", label: "Profit-share for trained residents" },
  { number: "0₹",     label: "Out-of-pocket — we fund accepted traders" },
];

export default function Trader({
  stats = DEFAULT_STATS,
}: {
  stats?: { number: string; label: string }[];
} = {}) {
  const { open } = useModal();
  return (
    <section className="trader" id="traders">
      <div className="container trader-inner">
        <div className="trader-top">
          <div>
            <div className="eyebrow">TRADER PROGRAMME</div>
            <h2>Become a Data-Driven <em>professional trader.</em></h2>
            <p className="lede">
              We first help traders understand market knowledge, trading psychology, and risk management through real market data and
              practical learning. Traders who show discipline, consistency, and strong performance may receive access to capital and
              professional trading opportunities.
            </p>
            <button className="btn btn-light btn-arrow" onClick={() => open("Trader Residency")}>Apply for Residency</button>
          </div>
          <div className="stats">
            {stats.slice(0, 4).map((s, i) => (
              <div key={i} className="stat"><b>{s.number}</b><span>{s.label}</span></div>
            ))}
          </div>
        </div>

        <div className="trader-cards">
          <div className="tcard">
            <div className="tcard-icon">🏢</div>
            <h3>Access Floor Trading</h3>
            <p>Get direct access to our professional trading floor environment where you learn and trade alongside an active community with real market exposure and collaborative learning.</p>
            <ul>
              <li>Professional desk setup with Level II access</li>
              <li>Live trading alongside senior PMs</li>
              <li>Collaborative community and peer learning</li>
              <li>Real-time market exposure and daily feedback</li>
            </ul>
          </div>
          <div className="tcard blue">
            <div className="tcard-icon">🌐</div>
            <h3>Remote Trading</h3>
            <p>Trade from anywhere with full professional support. Complete access to platforms, research feeds, risk systems, and senior PM oversight — no geography required.</p>
            <ul>
              <li>Full platform and research feed access</li>
              <li>Real-time risk system integration</li>
              <li>Daily desk briefs and live trade signals</li>
              <li>Remote PM oversight and mentorship</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
