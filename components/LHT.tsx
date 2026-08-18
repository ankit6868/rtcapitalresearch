"use client";
import { useModal } from "./ModalProvider";

const PROGRAMS = [
  { ic: "📈", n: "PROGRAM 01", t: "Stock Market Learning Program", d: "A structured and practical approach covering market basics, trading psychology, risk management, and technical analysis.", preset: "Stock Market Learning" },
  { ic: "⚡", n: "PROGRAM 02", t: "Options Trading Program",       d: "Advanced option strategies, hedging techniques, risk management, and disciplined trade execution in real market conditions.", preset: "Options Trading" },
  { ic: "🧠", n: "PROGRAM 03", t: "Advanced Psychology Program",   d: "Develop discipline, emotional control, and decision-making skills for consistent trading success.", preset: "Advanced Psychology" },
];

export default function LHT() {
  const { open } = useModal();
  return (
    <section className="lht">
      <div className="container">
        <div className="lht-head">
          <div className="eyebrow" style={{ justifyContent: "center" }}>LHT TRADERS</div>
          <h2>Programs for Serious Market Students</h2>
          <p>LHT Traders grows beginners into confident, disciplined traders.</p>
        </div>
        <div className="lht-grid">
          {PROGRAMS.map((p) => (
            <div key={p.n} className="pcard">
              <div className="pcard-icon">{p.ic}</div>
              <div className="plabel">{p.n}</div>
              <h3>{p.t}</h3>
              <p>{p.d}</p>
              <a className="enroll" onClick={() => open(p.preset)}>Enroll Now </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
