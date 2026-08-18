"use client";
import HeroCards from "./HeroCards";
import type { Settings } from "@/lib/types";

const DEFAULT: Settings["hero"] = {
  badge: "MARKETS OPEN · GLOBAL INDICES",
  headline: "We use the principles of elite performance to grow new and",
  italic: "developing trader.",
  description:
    "RT Capital Research is a professional trading and market education firm focused on helping traders build real consistency in the markets. We provide structured learning, practical trading guidance, and a professional trading desk environment designed to develop disciplined and profitable traders. Traders who demonstrate strong performance and risk management may also receive funding opportunities to scale their trading journey.",
  btn1: "Explore Research",
  btn2: "Trade With Capital",
};

export default function Hero({ hero = DEFAULT }: { hero?: Settings["hero"] }) {
  const scroll = (id: string) => () => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <section className="hero" id="top">
      <div className="container hero-grid">
        <div>
          <div className="badge"><span className="dot"></span> {hero.badge}</div>
          <h1>
            {hero.headline} <em>{hero.italic}</em>
          </h1>
          <p className="lede">{hero.description}</p>
          <div className="hero-cta">
            <button className="btn btn-dark btn-arrow" onClick={scroll("insights")}>{hero.btn1}</button>
            <button className="btn btn-light btn-arrow" onClick={scroll("traders")}>{hero.btn2}</button>
          </div>
        </div>
        <HeroCards />
      </div>

      <div className="container" style={{ marginTop: 80 }}>
        <div className="eyebrow-sm">Coverage Across</div>
        <div className="coverage-marks">
          <span>NSE</span><span>BSE</span><span>NYSE</span><span>NASDAQ</span><span>LSE</span><span>CME</span>
        </div>
      </div>
    </section>
  );
}
