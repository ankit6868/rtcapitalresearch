"use client";
import { useModal } from "./ModalProvider";

type Program = { icon: string; label: string; title: string; desc: string; preset?: string };
type LHTContent = { eyebrow?: string; headline?: string; sub?: string; programs?: Program[] };

const DEFAULT_PROGRAMS: Program[] = [
  { icon: "📈", label: "PROGRAM 01", title: "Stock Market Learning Program", desc: "A structured and practical approach covering market basics, trading psychology, risk management, and technical analysis.", preset: "Stock Market Learning" },
  { icon: "⚡", label: "PROGRAM 02", title: "Options Trading Program",       desc: "Advanced option strategies, hedging techniques, risk management, and disciplined trade execution in real market conditions.", preset: "Options Trading" },
  { icon: "🧠", label: "PROGRAM 03", title: "Advanced Psychology Program",   desc: "Develop discipline, emotional control, and decision-making skills for consistent trading success.", preset: "Advanced Psychology" },
];

export default function LHT({ content = {} }: { content?: LHTContent } = {}) {
  const { open } = useModal();
  const c = {
    eyebrow: content.eyebrow || "LHT TRADERS",
    headline: content.headline || "Programs for Serious Market Students",
    sub: content.sub || "LHT Traders grows beginners into confident, disciplined traders.",
    programs: content.programs && content.programs.length ? content.programs : DEFAULT_PROGRAMS,
  };
  return (
    <section className="lht">
      <div className="container">
        <div className="lht-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>{c.eyebrow}</div>
          <h2>{c.headline}</h2>
          <p>{c.sub}</p>
        </div>
        <div className="lht-grid">
          {c.programs.map((p) => (
            <div key={p.label} className="pcard">
              <div className="pcard-icon">{p.icon}</div>
              <div className="plabel">{p.label}</div>
              <h3>{p.title}</h3>
              <p>{p.desc}</p>
              <a className="enroll" onClick={() => open(p.preset || "")}>Enroll Now </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
