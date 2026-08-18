"use client";
import { useEffect, useRef, useState } from "react";

const W = 500, H = 220, PAD_L = 10, PAD_R = 10, PAD_T = 20, PAD_B = 40;
const BASE = 24227.14;
const N = 40;

const SIGNALS = [
  { tk: "RELIANCE",   me: "Long · Swing · 3–7 days",   en: "2,884",  tg: "2,975",  st: "2,842" },
  { tk: "HDFCBANK",   me: "Long · Positional · 2 wks", en: "1,642",  tg: "1,725",  st: "1,608" },
  { tk: "INFY",       me: "Short · Intraday · 1D",     en: "1,538",  tg: "1,502",  st: "1,559" },
  { tk: "TATASTEEL",  me: "Long · Swing · 5–10 days",  en: "158",    tg: "172",    st: "152" },
  { tk: "BAJFINANCE", me: "Long · Swing · 3–7 days",   en: "6,940",  tg: "7,180",  st: "6,845" },
  { tk: "BANKNIFTY",  me: "Short · F&O · Weekly exp",  en: "51,240", tg: "50,600", st: "51,540" },
];

const SECTORS = [
  { name: "IT", v: 2.1 }, { name: "BANK", v: 1.3 }, { name: "PHARMA", v: 0.4 }, { name: "OIL", v: -1.2 },
  { name: "AUTO", v: 1.8 }, { name: "REALTY", v: 0.1 }, { name: "METAL", v: -2.4 }, { name: "FMCG", v: 1.0 },
];

function colorFor(v: number) {
  if (v >= 1.8) return { bg: "#5cd48a", fg: "#04321a" };
  if (v >= 1.0) return { bg: "#8adba3", fg: "#04321a" };
  if (v >= 0.3) return { bg: "#b5e6c5", fg: "#04321a" };
  if (v >= 0)   return { bg: "#dff2e6", fg: "#0a5030" };
  if (v >= -1)  return { bg: "#f4c8c8", fg: "#4a0d0d" };
  return { bg: "#f0b6b6", fg: "#4a0d0d" };
}

export default function HeroCards() {
  const [series, setSeries] = useState<number[]>(() => {
    // smooth uptrend with tiny jitter — mirrors the reference chart's clean curve
    const arr: number[] = [];
    for (let i = 0; i < N; i++) {
      const trend = (i / (N - 1)) * 102;                 // linear rise BASE → BASE+102
      const wave  = Math.sin(i * 0.32) * 4;              // gentle wave
      const noise = (Math.random() - 0.5) * 3;           // tiny noise
      arr.push(BASE + trend + wave + noise);
    }
    arr[N - 1] = 24329.44;
    return arr;
  });
  const [flash, setFlash] = useState(false);
  const [sectors, setSectors] = useState(SECTORS);
  const [time, setTime] = useState("22:27 IST");
  const [sigIdx, setSigIdx] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const mounted = useRef(false);

  // NIFTY tick
  useEffect(() => {
    mounted.current = true;
    const id = setInterval(() => {
      setSeries((prev) => {
        const last = prev[prev.length - 1];
        // small drift with mean-revert toward BASE+100 so the trend stays gentle
        const target = BASE + 100;
        const revert = (target - last) * 0.02;
        const drift = (Math.random() - 0.5) * 6 + revert;
        const next = Math.max(BASE - 40, Math.min(BASE + 180, last + drift));
        return [...prev.slice(1), next];
      });
      setFlash(true);
      setTimeout(() => setFlash(false), 300);
    }, 1600);
    return () => clearInterval(id);
  }, []);

  // Heatmap tick
  useEffect(() => {
    const id = setInterval(() => {
      setSectors((prev) => prev.map((s) => ({ ...s, v: Math.max(-3, Math.min(3, s.v + (Math.random() - 0.5) * 0.35)) })));
    }, 2200);
    return () => clearInterval(id);
  }, []);

  // Clock
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setTime(`${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")} IST`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

  // Signal rotator
  useEffect(() => {
    const id = setInterval(() => {
      setFadeOut(true);
      setTimeout(() => {
        setSigIdx((i) => (i + 1) % SIGNALS.length);
        setFadeOut(false);
      }, 380);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  const min = Math.min(...series), max = Math.max(...series);
  const range = max - min || 1;
  const xStep = (W - PAD_L - PAD_R) / (N - 1);
  const pts = series.map((v, i) => {
    const x = PAD_L + i * xStep;
    const y = PAD_T + (1 - (v - min) / range) * (H - PAD_T - PAD_B);
    return [x, y] as [number, number];
  });
  const linePoints = pts.map((p) => p.join(",")).join(" ");
  const areaD = `M ${pts[0].join(" ")} ${pts.slice(1).map((p) => `L ${p.join(" ")}`).join(" ")} L ${pts[N - 1][0]} ${H} L ${pts[0][0]} ${H} Z`;
  const candleSpots = [Math.floor(N * 0.35), Math.floor(N * 0.5), Math.floor(N * 0.75), Math.floor(N * 0.92)];

  const last = series[series.length - 1];
  const diff = last - BASE;
  const pct = (diff / BASE) * 100;
  const positive = diff >= 0;

  const sig = SIGNALS[sigIdx];

  return (
    <div className="hero-cards">
      {/* NIFTY chart */}
      <div className="card card-chart">
        <div className="card-chart-head">
          <div className="card-chart-title">NIFTY 50 · 5MIN <span className="tag-live">LIVE</span></div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 6 }}>
          <div className={`price${flash ? " flash" : ""}`}>{last.toFixed(2)}</div>
          <div className="change" style={{ color: positive ? "var(--green)" : "var(--red)" }}>
            {positive ? "+ " : "- "}{Math.abs(diff).toFixed(2)}
            <br /><b>{positive ? "+" : ""}{pct.toFixed(2)}%</b>
          </div>
        </div>
        <svg className="chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#2a52ff" stopOpacity=".25" />
              <stop offset="1" stopColor="#2a52ff" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={areaD} fill="url(#ga)" />
          <polyline points={linePoints} fill="none" stroke="#2a52ff" strokeWidth="2.5" strokeLinejoin="round" />
          {candleSpots.map((idx, k) => {
            const [x, y] = pts[idx];
            const up = k !== 1; // one red among four to match the reference
            const h = 16;
            return <rect key={k} x={x - 2.5} y={y - h / 2} width={5} height={h} fill={up ? "#12b76a" : "#e14747"} rx={0.5} />;
          })}
        </svg>
        <div className="chart-pills">
          <span className="pill active">5MIN</span>
          <span className="pill">VWAP</span>
          <span className="pill">OI</span>
          <span className="pill">LIVE</span>
        </div>
      </div>

      {/* Heatmap */}
      <div className="card card-heat">
        <div className="card-heat-head">
          <div className="t">Sector Heatmap</div>
          <div className="time">{time}</div>
        </div>
        <div className="heat-grid">
          {sectors.map((s) => {
            const c = colorFor(s.v);
            return (
              <div key={s.name} className="heat-cell" style={{ background: c.bg, color: c.fg }}>
                <b>{s.name}</b>
                <span>{(s.v >= 0 ? "+" : "") + s.v.toFixed(1)}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Signal */}
      <div className="card card-signal">
        <div className="card-signal-head"><span className="dot"></span> DESK SIGNAL</div>
        <div className={`signal-ticker${fadeOut ? " signal-fade" : ""}`}>{sig.tk}</div>
        <div className={`signal-meta${fadeOut ? " signal-fade" : ""}`}>{sig.me}</div>
        <div className="signal-nums">
          <div className="col"><span>Entry</span><b className={fadeOut ? "signal-fade" : ""}>{sig.en}</b></div>
          <div className="col tgt"><span>Target</span><b className={fadeOut ? "signal-fade" : ""}>{sig.tg}</b></div>
          <div className="col stp"><span>Stop</span><b className={fadeOut ? "signal-fade" : ""}>{sig.st}</b></div>
        </div>
      </div>
    </div>
  );
}
