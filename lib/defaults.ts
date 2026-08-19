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
    email: "info@rtcapitalresarch.com",
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
      eyebrow: "THE FIRM · EST. 2025",
      headline: "Built on discipline,",
      italic: "driven by performance.",
      desc: "We train traders with institutional concepts and provide capital to those who demonstrate consistency and risk control.",
      ctaLabel: "Speak to the Desk",
      points: [
        { num: "01", title: "Market Research", desc: "Institutional-grade market intelligence powered by macro analysis, order-flow data, derivatives positioning, and proprietary trading models." },
        { num: "02", title: "Proprietary Trading", desc: "We deploy internal capital across crypto, cash, F&O, and global derivative markets using systematic and discretionary strategies." },
        { num: "03", title: "Risk Management", desc: "Professional risk frameworks around exposure control, drawdown protection, liquidity management, and disciplined capital preservation." },
        { num: "04", title: "Trader Development", desc: "An intensive trader development program focused on market structure, execution, psychology, and performance-based capital allocation." },
      ],
    },
  },
  {
    id: "sec-services",
    title: "Services",
    key: "services",
    order: 2,
    visible: true,
    content: {
      eyebrow: "WHAT WE DO",
      headline: "One desk. One system.",
      sub: "We train, evaluate, and fund traders through a performance-focused trading environment designed around discipline and consistency.",
      cards: [
        { num: "01", title: "Stock Market Learning Program", desc: "Learn the stock market through a structured and practical approach designed for beginners and growing traders. The program covers market basics, trading psychology, risk management, technical analysis, and professional trading strategies step-by-step to build confidence and real market experience." },
        { num: "02", title: "LHT Traders", desc: "LHT Traders is designed to help beginners grow into confident and disciplined traders through practical market education. We teach advanced trading strategies across multiple markets including stocks, crypto, indices, and global markets with a strong focus on risk management, market psychology, and real trading execution." },
        { num: "03", title: "Options Trading Program", desc: "Master options trading with a structured learning approach designed for serious traders. This program covers advanced option strategies, hedging techniques, risk management, capital protection, and disciplined trade execution to help traders perform confidently in real market conditions." },
        { num: "04", title: "Advanced Psychology Program", desc: "Develop the discipline, emotional control, and decision-making skills required for consistent trading success. The program focuses on trading psychology, risk control, patience, confidence building, and managing fear and greed under real market pressure." },
        { num: "05", title: "Access Floor Trading", desc: "Get direct access to our professional trading floor environment where traders learn and trade alongside an active trading community. The program provides real market exposure, collaborative learning, live trading discussions, and a professional desk setup designed to build discipline and confidence." },
        { num: "06", title: "Remote Trading", desc: "Trade from anywhere with professional support, market guidance, research access, and remote trading assistance designed for modern traders." },
      ],
    },
  },
  {
    id: "sec-programs",
    title: "Programs",
    key: "programs",
    order: 3,
    visible: false,
    content: {
      eyebrow: "LHT TRADERS",
      headline: "Programs for Serious Market Students",
      sub: "LHT Traders grows beginners into confident, disciplined traders.",
      programs: [
        { icon: "📈", label: "PROGRAM 01", title: "Stock Market Learning Program", desc: "A structured and practical approach covering market basics, trading psychology, risk management, and technical analysis.", preset: "Stock Market Learning" },
        { icon: "⚡", label: "PROGRAM 02", title: "Options Trading Program",       desc: "Advanced option strategies, hedging techniques, risk management, and disciplined trade execution in real market conditions.", preset: "Options Trading" },
        { icon: "🧠", label: "PROGRAM 03", title: "Advanced Psychology Program",   desc: "Develop discipline, emotional control, and decision-making skills for consistent trading success.", preset: "Advanced Psychology" },
      ],
    },
  },
  {
    id: "sec-markets",
    title: "Markets",
    key: "markets",
    order: 4,
    visible: true,
    content: {
      eyebrow: "GLOBAL REACH",
      headline: "Trade The World Markets",
      regions: [
        { flag: "🗽",  title: "US Markets",       desc: "Equities, options, and futures across leading American exchanges with deep liquidity.", exchanges: ["NYSE","NASDAQ","CME","CBOE"],   perf: "+0.38%" },
        { flag: "🏛️", title: "European Markets", desc: "Coverage across leading European exchanges with focus on macro indices and events.",     exchanges: ["LSE","EURONEXT","XETRA"],       perf: "+0.21%" },
        { flag: "🌏",  title: "Asian Markets",    desc: "Home market expertise across NSE/BSE plus broader Asian coverage for cross-market strategies.", exchanges: ["NSE","BSE","HKEx","SGX"], perf: "+0.42%" },
      ],
    },
  },
  {
    id: "sec-platform",
    title: "Platform",
    key: "platform",
    order: 5,
    visible: true,
    content: {
      eyebrow: "THE PLATFORM",
      headline: "Professional Trading Platform.",
      sub: "We provide a professional trading platform designed to help traders execute trades efficiently with advanced tools, market access, risk management features, and a professional trading environment for serious market participants.",
      cards: [
        { tag: "BACKTESTING",  title: "Advanced Backtesting Software", desc: "Test strategies on historical market data before risking real capital. Detailed performance analysis and realistic market simulations." },
        { tag: "AUTOMATION",   title: "Strategy Automation Software",  desc: "Transform your trading strategy into a fully automated system. Set rules, entries, exits, and risk parameters — execution handled automatically." },
        { tag: "DIRECT ACCESS",title: "Sterling TradING",              desc: "Sterling Trader Pro — a full-featured Level II direct access trading platform designed for professionals in rapidly moving electronic markets." },
        { tag: "MULTI-ROUTE",  title: "Lightspeed Trader",             desc: "The ideal platform for stocks and options with over 100 order routing destinations. Professional-grade execution with minimal latency." },
        { tag: "PROPRIETARY",  title: "RT Research Terminal",          desc: "Built in-house and hardened on the firm desk. Research, execution, and review — one workspace for the independent professional." },
        { tag: "AI-POWERED",   title: "AI Insight Engine",             desc: "Real-time AI signals, order flow interpretation, and probability scoring for live trade decision support." },
      ],
    },
  },
  {
    id: "sec-traders",
    title: "Trader Programme",
    key: "traders",
    order: 6,
    visible: true,
    content: {
      eyebrow: "TRADER PROGRAMME",
      headline: "Become a Data-Driven",
      italic: "professional trader.",
      desc: "We first help traders understand market knowledge, trading psychology, and risk management through real market data and practical learning. Traders who show discipline, consistency, and strong performance may receive access to capital and professional trading opportunities.",
      ctaLabel: "Apply for Residency",
      blocks: [
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
      ],
    },
  },
  {
    id: "sec-testimonials",
    title: "Testimonials",
    key: "testimonials",
    order: 7,
    visible: true,
    content: {
      eyebrow: "CLIENT VOICES",
      headline: "Trusted by traders who already know better.",
      testimonials: [
        { av: "a1", ini: "AK", name: "Aditya Kapoor",  role: "Family office · Mumbai",       metricLabel: "Returns FY25", metricValue: "+34.2%", metricClass: "up",      quote: "The desk notes have replaced three of my research subscriptions. The conviction level is the highest I've seen outside a hedge fund." },
        { av: "a2", ini: "PN", name: "Priya Nair",     role: "Resident trader · Bengaluru",  metricLabel: "Sharpe FY25",  metricValue: "2.41",   metricClass: "neutral", quote: "Joined the trader residency in 2023. Today I run a ₹1.2 Cr book funded by the firm. The supervision is what made the difference." },
        { av: "a3", ini: "RM", name: "Rohan Mehra",    role: "Prop trader · Singapore",      metricLabel: "Max DD",       metricValue: "-3.1%",  metricClass: "down",    quote: "The risk infrastructure is what separates RT from the rest. I sleep at night knowing the kill-switch is doing its job before I can panic." },
      ],
    },
  },
  {
    id: "sec-insights",
    title: "Insights",
    key: "insights",
    order: 8,
    visible: true,
    content: {
      eyebrow: "FROM THE DESK",
      headline: "Insights, weekly.",
      allArticlesLabel: "All articles",
      featured: {
        category: "MARKET STRATEGY",
        readTime: "14 MIN READ",
        date: "MAY 12, 2026",
        title: "Why the next leg of the Nifty rally lives or dies on bank earnings — a flow-based view.",
        excerpt: "A deep dive into FII positioning, derivatives skew, and credit-cycle signals shaping our base case.",
      },
      side: [
        { category: "OPTIONS",    date: "MAY 09", title: "Skew is screaming. What the BANKNIFTY vol surface is telling us.", byline: "7 min read · Aman Verma",  highlight: false },
        { category: "PSYCHOLOGY", date: "MAY 05", title: "The 3pm trap: why most retail traders give back their gains.",    byline: "5 min read · Priya Nair",  highlight: true  },
        { category: "MACRO",      date: "MAY 02", title: "Crude, the rupee, and the inflation print: setup into the May RBI meet.", byline: "9 min read · Rohan Mehra", highlight: false },
      ],
    },
  },
  {
    id: "sec-faq",
    title: "FAQ",
    key: "faq",
    order: 9,
    visible: true,
    content: {
      eyebrow: "FREQUENTLY ASKED",
      headline: "Common Questions",
      contactLabel: "Contact the desk",
      items: [
        { q: "Who can join the Trader Residency?",   a: "We accept traders of all experience levels. Selection is based on discipline, risk awareness, and aptitude — not P&L history. No capital required from your side." },
        { q: "What markets do you cover?",           a: "We actively cover NSE, BSE, NYSE, NASDAQ, LSE, CME and more — 14 global markets spanning equities, derivatives, currencies, and commodities." },
        { q: "What is the LHT Traders program?",     a: "LHT Traders is our education wing designed to take beginners to confident, disciplined traders — covering stocks, crypto, options, and all markets with deep focus on risk and psychology." },
        { q: "Can I access the platform remotely?",  a: "Absolutely. Our Remote Trading program gives full access to our terminal, research feeds, and PM oversight from anywhere in the world." },
        { q: "How do I get started?",                a: "Fill out the contact form or WhatsApp us at +91 6376055187. A senior PM will respond within one trading session." },
        { q: "What software platforms do you use?",  a: "We offer Advanced Backtesting Software, Strategy Automation Software, Sterling Trader Pro (Level II), and Lightspeed Trader with 100+ order routing destinations." },
      ],
    },
  },
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
