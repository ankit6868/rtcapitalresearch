"use client";
import { useModal } from "./ModalProvider";

type Block = { icon: string; title: string; desc: string; bullets: string[]; blue?: boolean };
type TraderContent = {
  eyebrow?: string;
  headline?: string;
  italic?: string;
  desc?: string;
  ctaLabel?: string;
  blocks?: Block[];
};

const DEFAULT_BLOCKS: Block[] = [
  {
    icon: "🏢",
    title: "Access Floor Trading",
    desc: "Get direct access to our professional trading floor environment where you learn and trade alongside an active community with real market exposure and collaborative learning.",
    bullets: [
      "Professional desk setup with Level II access",
      "Live trading alongside senior PMs",
      "Collaborative community and peer learning",
      "Real-time market exposure and daily feedback",
    ],
  },
  {
    icon: "🌐",
    title: "Remote Trading",
    desc: "Trade from anywhere with full professional support. Complete access to platforms, research feeds, risk systems, and senior PM oversight — no geography required.",
    bullets: [
      "Full platform and research feed access",
      "Real-time risk system integration",
      "Daily desk briefs and live trade signals",
      "Remote PM oversight and mentorship",
    ],
    blue: true,
  },
];

export default function Trader({
  stats = [
    { number: "₹50L",  label: "Starting capital allocated to top residents" },
    { number: "12 wks", label: "Structured residency programme" },
    { number: "70/30", label: "Profit-share for trained residents" },
    { number: "0₹",     label: "Out-of-pocket — we fund accepted traders" },
  ],
  content = {},
}: {
  stats?: { number: string; label: string }[];
  content?: TraderContent;
} = {}) {
  const { open } = useModal();
  const c = {
    eyebrow: content.eyebrow || "TRADER PROGRAMME",
    headline: content.headline || "Become a Data-Driven",
    italic: content.italic || "professional trader.",
    desc: content.desc || "We first help traders understand market knowledge, trading psychology, and risk management through real market data and practical learning. Traders who show discipline, consistency, and strong performance may receive access to capital and professional trading opportunities.",
    ctaLabel: content.ctaLabel || "Apply for Residency",
    blocks: content.blocks && content.blocks.length ? content.blocks : DEFAULT_BLOCKS,
  };
  return (
    <section className="trader" id="traders">
      <div className="container trader-inner">
        <div className="trader-top">
          <div>
            <div className="eyebrow">{c.eyebrow}</div>
            <h2>{c.headline} <em>{c.italic}</em></h2>
            <p className="lede">{c.desc}</p>
            <button className="btn btn-light btn-arrow" onClick={() => open("Trader Residency")}>{c.ctaLabel}</button>
          </div>
          <div className="stats">
            {stats.slice(0, 4).map((s, i) => (
              <div key={i} className="stat"><b>{s.number}</b><span>{s.label}</span></div>
            ))}
          </div>
        </div>

        <div className="trader-cards">
          {c.blocks.map((b, i) => (
            <div key={i} className={"tcard" + (b.blue ? " blue" : "")}>
              <div className="tcard-icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.desc}</p>
              <ul>{b.bullets.map((li, j) => <li key={j}>{li}</li>)}</ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
