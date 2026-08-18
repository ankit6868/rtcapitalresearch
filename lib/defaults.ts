import type { Settings, Section, NavItem, FooterColumn } from "./types";

export const DEFAULT_SETTINGS: Settings = {
  logoPath: "/logo.jpg",
  siteName: "RT Capital Research",
  logoFallback: "R",
  hero: {
    badge: "MARKETS OPEN · GLOBAL INDICES",
    headline: "We use the principles of elite performance to grow new and",
    italic: "developing trader.",
    description:
      "RT Capital Research is a professional trading and market education firm focused on helping traders build real consistency in the markets. We provide structured learning, practical trading guidance, and a professional trading desk environment designed to develop disciplined and profitable traders. Traders who demonstrate strong performance and risk management may also receive funding opportunities to scale their trading journey.",
    btn1: "Explore Research",
    btn2: "Trade With Capital",
  },
  stats: [
    { number: "₹50L", label: "Starting capital allocated to top residents" },
    { number: "12 wks", label: "Structured residency programme" },
    { number: "70/30", label: "Profit-share for trained residents" },
    { number: "0₹", label: "Out-of-pocket — we fund accepted traders" },
  ],
  contact: {
    phoneDisplay: "+91  8003051188",
    whatsappDigits: "918003051188",
    email: "DUDNJD096@GMAIL.COM",
    deskPhone: "+91  8003051188",
    mumbaiAddress: "",
    udaipurAddress:
      "RT Capital, The Keys Hotel E 263, First Floor, Madri Industrial Area, Udaipur, Rajasthan 313001",
  },
  popup: { enabled: true, delayMs: 6000 },
  footerText: {
    copyright: "© 2026 RT Capital Research. All rights reserved.",
    disclaimer:
      "RT Capital Research is not registered with any exchange as it's member neither regulated by SEBI, bearstreet only facilitates individuals and traders to complete the learning curve & practice for trading and tools to start their journey as a trader. RT Capital Research does not charge any security deposit towards trading and trading margin. RT Capital Research does not have any other branch.",
  },
};

export const DEFAULT_SECTIONS: Section[] = [
  {
    id: "sec-about",
    title: "The Firm",
    key: "about",
    order: 1,
    visible: true,
    content: {
      eyebrow: "The Firm · Est. 2025",
      headline: "Built on discipline,",
      italic: "driven by performance.",
      desc: "We train traders with institutional concepts and provide capital to those who demonstrate consistency and risk control.",
      points: [
        { num: "01", title: "Market Research", desc: "Institutional-grade market intelligence powered by macro analysis, order-flow data, derivatives positioning, and proprietary trading models." },
        { num: "02", title: "Proprietary Trading", desc: "We deploy internal capital across crypto, cash, F&O, and global derivative markets using systematic and discretionary strategies." },
        { num: "03", title: "Risk Management", desc: "Professional risk frameworks around exposure control, drawdown protection, liquidity management, and disciplined capital preservation." },
        { num: "04", title: "Trader Development", desc: "An intensive trader development program focused on market structure, execution, psychology, and performance-based capital allocation." },
      ],
    },
  },
  { id: "sec-services", title: "Services", key: "services", order: 2, visible: true, content: { eyebrow: "WHAT WE DO", headline: "One desk. One system." } },
  { id: "sec-programs", title: "Programs", key: "programs", order: 3, visible: false, content: {} },
  { id: "sec-markets", title: "Markets", key: "markets", order: 4, visible: true, content: { eyebrow: "GLOBAL REACH", headline: "Trade The World Markets" } },
  { id: "sec-platform", title: "Platform", key: "platform", order: 5, visible: true, content: { eyebrow: "THE PLATFORM", headline: "Professional Trading Platform." } },
  { id: "sec-traders", title: "Trader Programme", key: "traders", order: 6, visible: true, content: { eyebrow: "TRADER PROGRAMME", headline: "Become a Data-Driven professional trader." } },
  { id: "sec-testimonials", title: "Testimonials", key: "testimonials", order: 7, visible: true, content: { eyebrow: "CLIENT VOICES", headline: "Trusted by traders who already know better." } },
  { id: "sec-insights", title: "Insights", key: "insights", order: 8, visible: false, content: { eyebrow: "FROM THE DESK", headline: "Insights, weekly." } },
  { id: "sec-faq", title: "FAQ", key: "faq", order: 9, visible: true, content: { eyebrow: "FREQUENTLY ASKED", headline: "Common Questions" } },
];

export const DEFAULT_NAV: NavItem[] = [
  { label: "Firm", href: "#firm", visible: true },
  { label: "Services", href: "#services", visible: true },
  { label: "Platform", href: "#platform", visible: true },
  { label: "Traders", href: "#traders", visible: true },
  { label: "Insights", href: "#insights", visible: true },
  { label: "Contact", href: "#contact", visible: true },
];

export const DEFAULT_FOOTER: FooterColumn[] = [
  { heading: "Firm", links: [
    { label: "About", href: "#about" }, { label: "Services", href: "#services" },
    { label: "Traders", href: "#traders" }, { label: "Contact", href: "#contact" },
  ]},
  { heading: "Services", links: [
    { label: "Equity Research", href: "#services" }, { label: "Options Trading", href: "#services" },
    { label: "Portfolio Advisory", href: "#services" }, { label: "Trader Residency", href: "#traders" },
  ]},
  { heading: "Platform", links: [
    { label: "Terminal", href: "#platform" }, { label: "API Access", href: "#platform" },
    { label: "Pricing", href: "#contact" }, { label: "Status", href: "#contact" },
  ]},
  { heading: "Resources", links: [
    { label: "Insights", href: "#insights" }, { label: "Research Library", href: "#insights" },
    { label: "Help Centre", href: "#contact" }, { label: "SEBI Disclosures", href: "#contact" },
  ]},
];
