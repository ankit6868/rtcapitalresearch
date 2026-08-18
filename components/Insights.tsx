type SideArticle = { category: string; date: string; title: string; byline: string; highlight?: boolean };
type FeaturedArticle = { category: string; readTime: string; date: string; title: string; excerpt: string };
type InsightsContent = {
  eyebrow?: string;
  headline?: string;
  allArticlesLabel?: string;
  featured?: FeaturedArticle;
  side?: SideArticle[];
};

const DEFAULT: Required<Omit<InsightsContent, "featured" | "side">> & {
  featured: FeaturedArticle;
  side: SideArticle[];
} = {
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
};

export default function Insights({ content = {} }: { content?: InsightsContent } = {}) {
  const c = {
    eyebrow: content.eyebrow || DEFAULT.eyebrow,
    headline: content.headline || DEFAULT.headline,
    allArticlesLabel: content.allArticlesLabel || DEFAULT.allArticlesLabel,
    featured: content.featured || DEFAULT.featured,
    side: content.side && content.side.length ? content.side : DEFAULT.side,
  };
  return (
    <section className="insights" id="insights">
      <div className="container">
        <div className="insights-head">
          <div>
            <div className="eyebrow">{c.eyebrow}</div>
            <h2>{c.headline}</h2>
          </div>
          <a className="btn btn-light btn-arrow">{c.allArticlesLabel}</a>
        </div>
        <div className="insights-grid">
          <article className="feature">
            <div className="hero-img"></div>
            <div className="feature-meta">
              <span>{c.featured.category}</span><span>·</span>
              <span>{c.featured.readTime}</span><span>·</span>
              <span>{c.featured.date}</span>
            </div>
            <h3>{c.featured.title}</h3>
            <p>{c.featured.excerpt}</p>
          </article>
          <aside className="sidearticles">
            {c.side.map((s, i) => (
              <div key={i} className="sart">
                <div className="sart-meta"><span>{s.category}</span><span>·</span><span>{s.date}</span></div>
                <h4 style={s.highlight ? { color: "var(--blue)" } : undefined}>{s.title}</h4>
                <div className="byline">{s.byline}</div>
              </div>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
}
