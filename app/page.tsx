// Sui Blog Landing Page
// Spec: https://www.notion.so/Sui-Landing-Page-33d449ca65d8814bb9dcc26958aeb2b5
// Built on: Next.js + Vercel

const features = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/>
        <polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    title: "Move Language",
    desc: "Sui's native programming language brings resource-oriented programming to blockchain — preventing entire categories of exploits with strong type safety and formal verification support.",
    accent: "#A78BFA",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="2" y1="12" x2="22" y2="12"/>
        <polyline points="6 8 2 12 6 16"/>
        <polyline points="18 8 22 12 18 16"/>
      </svg>
    ),
    title: "Horizontal Scaling",
    desc: "Sui scales horizontally by processing transactions in parallel. Unlike traditional blockchains with a single validator queue, every object gets its own voting process — enabling true horizontal throughput.",
    accent: "#34d399",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="7" height="7" rx="1"/>
      </svg>
    ),
    title: "Object Model",
    desc: "Everything on Sui is an object — owned, shared, or immutable. This object-centric model enables expressive composability: NFTs, DeFi primitives, and complex protocols built from composable building blocks.",
    accent: "#F59E0B",
  },
];

const stats = [
  { value: "10M+", label: "Daily Transactions", color: "#A78BFA" },
  { value: "< 500ms", label: "Finality Time", color: "#34d399" },
  { value: "100+", label: "Active dApps", color: "#F59E0B" },
  { value: "$2B+", label: "Total Value Locked", color: "#60A5FA" },
];

export default function Home() {
  return (
    <div className="page">

      {/* ── HEADER ── */}
      <header className="site-header">
        <div className="header-inner">
          <a href="#" className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7l7 5 7-5-7-5z" fill="white" opacity="0.9"/>
                <path d="M3 13l7 5 7-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
              </svg>
            </div>
            <span className="logo-name">Sui Blog</span>
            <span className="logo-badge">Blockchain</span>
          </a>
          <nav className="header-nav">
            <a href="#features">Features</a>
            <a href="#ecosystem">Ecosystem</a>
            <a href="#start-building">Build</a>
          </nav>
          <div className="header-actions">
            <a
              href="https://docs.sui.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sui"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
              </svg>
              Docs
            </a>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg-chain" aria-hidden="true">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="chain-link" style={{ left: `${i * 18 + 5}%`, animationDelay: `${i * 0.3}s` }}>
              <div className="chain-node"/>
              <div className="chain-node chain-node-2"/>
            </div>
          ))}
        </div>
        <div className="hero-inner">
          {/* Platform badge */}
          <div className="platform-banner">
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7l7 5 7-5-7-5z" fill="#34d399"/>
              <path d="M3 13l7 5 7-5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Built on Sui Blockchain</span>
            <span className="banner-sep">·</span>
            <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7l7 5 7-5-7-5z" fill="#A78BFA"/>
              <path d="M3 13l7 5 7-5" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <span>Move Language</span>
          </div>

          <div className="hero-eyebrow">
            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#A78BFA"/></svg>
            Web3 Stories on Sui
          </div>

          <h1 className="hero-title">
            Web3 Stories<br/><span className="grad">on Sui</span>
          </h1>

          <p className="hero-sub">
            A developer-focused blog exploring the Sui blockchain ecosystem.
            Deep dives into Move language, dApp development, and the future of scalable Web3.
          </p>

          <div className="hero-actions">
            <a
              href="https://docs.sui.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-publish-hero"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
              Read the Docs
            </a>
            <a
              href="https://github.com/openclawsean024-create/sui-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-sui"
              style={{ padding: "14px 24px", fontSize: "1rem", borderRadius: "14px" }}
            >
              View on GitHub
            </a>
          </div>

          <div className="hero-trust">
            <div className="trust-item">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7l7 5 7-5-7-5z" fill="#34d399"/>
                <path d="M3 13l7 5 7-5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Static Landing Page
            </div>
            <div className="trust-item">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7l7 5 7-5-7-5z" fill="#34d399"/>
                <path d="M3 13l7 5 7-5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Next.js + Vercel
            </div>
            <div className="trust-item">
              <svg width="12" height="12" viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7l7 5 7-5-7-5z" fill="#34d399"/>
                <path d="M3 13l7 5 7-5" stroke="#34d399" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
              Sui Ecosystem
            </div>
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ── FEATURE CARDS ── */}
      <section id="features" className="featured-section">
        <div className="section-container">
          <div className="section-label">Core Technologies</div>
          <h2 className="section-heading">Why Build on <span style={{ color: 'var(--sui-accent)' }}>Sui</span></h2>
          <div className="posts-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
            {features.map((f) => (
              <div key={f.title} className="post-card" style={{ padding: '2rem' }}>
                <div
                  style={{
                    width: '56px', height: '56px', borderRadius: '14px',
                    background: `${f.accent}18`,
                    border: `1px solid ${f.accent}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.25rem',
                  }}
                >
                  {f.icon}
                </div>
                <h3
                  style={{
                    fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  {f.title}
                </h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', lineHeight: 1.75 }}>
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ── STATS ── */}
      <section id="ecosystem" className="featured-section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="section-container">
          <div className="section-label">Ecosystem Metrics</div>
          <h2 className="section-heading">Sui by the <span style={{ color: 'var(--sui-accent)' }}>Numbers</span></h2>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '1.5rem',
              marginTop: '2rem',
            }}
          >
            {stats.map((s) => (
              <div
                key={s.label}
                style={{
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '2rem 1.5rem',
                  textAlign: 'center',
                  transition: 'all 0.3s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-strong)';
                  (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card-hover)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.background = 'var(--bg-card)';
                }}
              >
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    fontFamily: 'var(--font-mono), monospace',
                    background: `linear-gradient(135deg, ${s.color}, ${s.color}aa)`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    marginBottom: '0.5rem',
                  }}
                >
                  {s.value}
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"/>

      {/* ── CTA ── */}
      <section id="start-building" className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">
            Start Building on <span style={{ color: 'var(--sui-accent)' }}>Sui</span>
          </h2>
          <p className="cta-sub">
            Explore the official documentation, join the developer community,
            and deploy your first decentralized app on Sui today.
          </p>
          <div className="cta-actions">
            <a
              href="https://docs.sui.io"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-sui"
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"/>
                <polyline points="13 2 13 9 20 9"/>
              </svg>
              Start Building on Sui
            </a>
            <a
              href="https://github.com/openclawsean024-create/sui-blog"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-sui"
              style={{ padding: '12px 28px', fontSize: '0.95rem' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"/>
              </svg>
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7l7 5 7-5-7-5z" fill="#A78BFA" opacity="0.9"/>
              <path d="M3 13l7 5 7-5" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            </svg>
            © 2026 Sui Blog — Built on Sui Blockchain
          </div>
          <div className="footer-tagline">Open Source · Next.js · Sui Network</div>
        </div>
      </footer>

    </div>
  );
}
