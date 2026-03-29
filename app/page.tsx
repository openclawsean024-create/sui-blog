// Sui Blog — Sigle-inspired Web3 writing platform on Sui
// https://github.com/openclawsean024-create/sui-blog

const posts = [
  {
    title: "Getting Started with Sui Move — A Developer's Guide",
    category: "Development",
    excerpt: "Learn how to write smart contracts on Sui using Move. This guide covers object ownership, transferable assets, and building your first dApp on Sui.",
    date: "2026-03-28",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=800&q=80",
  },
  {
    title: "Sui Name Service (SNS) — Decentralized Identity on Sui",
    category: "Ecosystem",
    excerpt: "How Sui Name Service is bringing human-readable names to the Sui blockchain, enabling seamless identity and payments across Web3.",
    date: "2026-03-25",
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80",
  },
  {
    title: "Deep Dive: Sui's Object Model vs EVM Account Model",
    category: "Technical",
    excerpt: "Understanding the fundamental architectural differences between Sui's object-centric model and Ethereum's account-based approach.",
    date: "2026-03-20",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  },
  {
    title: "Building a NFT Marketplace on Sui with Kiosk",
    category: "Development",
    excerpt: "Step-by-step tutorial for building a royalty-enforcing NFT marketplace using Sui's native Kiosk framework and Creatie Capsules.",
    date: "2026-03-15",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80",
  },
  {
    title: "The Sui Economy — Tokenomics and Sustainable Growth",
    category: "Research",
    excerpt: "An in-depth analysis of SUI token economics, staking rewards, and how the network maintains long-term sustainability.",
    date: "2026-03-10",
    image: "https://images.unsplash.com/photo-1620321023374-d1a68fbc720d?w=800&q=80",
  },
  {
    title: "Privacy on Sui — ZK Proofs and Zero-Knowledge Transactions",
    category: "Technical",
    excerpt: "Exploring how Sui is incorporating zero-knowledge proof technology to enable private transactions while maintaining scalability.",
    date: "2026-03-05",
    image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&q=80",
  },
];

export default function Home() {
  return (
    <div className="page">
      {/* Header */}
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
          </a>
          <nav className="header-nav">
            <a href="#posts">Posts</a>
            <a href="#about">About</a>
            <a href="https://sui.io" target="_blank" rel="noopener">Ecosystem</a>
          </nav>
          <a href="https://github.com/openclawsean024-create/sui-blog" target="_blank" rel="noopener" className="btn-sui">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
            </svg>
            GitHub
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="hero">
        <div className="hero-inner">
          <div className="hero-eyebrow">
            <svg width="8" height="8" viewBox="0 0 8 8"><circle cx="4" cy="4" r="4" fill="#A78BFA"/></svg>
            Built on Sui Blockchain
          </div>
          <h1 className="hero-title">
            Where <span className="grad">Web3 Stories</span><br />Come to Life
          </h1>
          <p className="hero-sub">
            A secure, open-source blog for the Sui ecosystem. Exploring Move language,
            dApp development, and the future of scalable blockchain.
          </p>
          <div className="hero-actions">
            <a href="#posts" className="btn-sui">
              Read Posts
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a href="https://sui.io/developers" target="_blank" rel="noopener" className="btn-outline-sui">
              Sui Developers
            </a>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* Featured Post */}
      <section className="featured-section">
        <div className="section-container">
          <div className="section-label">Featured</div>
          {posts && posts[0] && (
          <div className="featured-post">
            <img src={posts[0].image} alt={posts[0].title} className="featured-post-img" />
            <div className="featured-post-body">
              <div className="featured-post-label">Development</div>
              <h2 className="featured-post-title">{posts[0].title}</h2>
              <p className="featured-post-excerpt">{posts[0].excerpt}</p>
              <div className="featured-post-meta">{posts[0].date}</div>
            </div>
          </div>
          )}
        </div>
      </section>

      <div className="divider"></div>

      {/* All Posts */}
      <section id="posts" className="featured-section">
        <div className="section-container">
          <div className="section-label">All Posts</div>
          <h2 className="section-heading">Latest from <span style={{color: 'var(--sui-accent)'}}>the Blog</span></h2>
          <div className="posts-grid">
            {(posts ?? []).slice(1).map((post) => (
              <article key={post.title} className="post-card">
                <img src={post.image} alt={post.title} className="post-image" />
                <div className="post-body">
                  <span className="post-category">{post.category}</span>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.excerpt}</p>
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span style={{color: 'var(--sui-accent)', fontSize: '0.8rem'}}>Read →</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* About */}
      <section id="about" className="about-section">
        <div className="about-grid">
          <div className="about-text">
            <div className="section-label">About</div>
            <h2>Why Sui is the <span style={{color: 'var(--sui-accent)'}}>Future</span></h2>
            <p>
              Sui is the first permissionless Layer 1 blockchain designed from the ground up to enable creators and developers to build experiences that cater to the next billion users of Web3.
            </p>
            <p>
              With its Move-based smart contract language, horizontal scaling via transaction parallellism, and user-friendly account model, Sui removes the friction that has held back blockchain adoption.
            </p>
            <div className="about-check">
              <div className="about-check-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              Move Language — Safe, expressive smart contracts
            </div>
            <div className="about-check">
              <div className="about-check-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              Horizontal Scaling — Transaction parallellism
            </div>
            <div className="about-check">
              <div className="about-check-icon">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
              </div>
              Object Model — Fine-grained ownership and composability
            </div>
          </div>
          <div className="sui-stats">
            <div className="sui-stats-grid">
              {[
                { num: "10M+", label: "Daily Transactions" },
                { num: "< 500ms", label: "Finality Time" },
                { num: "100+", label: "dApps Live" },
                { num: "$2B+", label: "Total Value Locked" },
              ].map(s => (
                <div key={s.label} className="sui-stat">
                  <div className="sui-stat-num">{s.num}</div>
                  <div className="sui-stat-label">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="divider"></div>

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Start Building on <span style={{color: 'var(--sui-accent)'}}>Sui</span></h2>
          <p className="cta-sub">
            Explore the Sui documentation, join the developer community, and ship your first dApp today.
          </p>
          <div className="cta-actions">
            <a href="https://docs.sui.io" target="_blank" rel="noopener" className="btn-sui">
              Sui Documentation
            </a>
            <a href="https://github.com/openclawsean024-create/sui-blog" target="_blank" rel="noopener" className="btn-outline-sui">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="site-footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
              <path d="M10 2L3 7l7 5 7-5-7-5z" fill="#A78BFA" opacity="0.9"/>
              <path d="M3 13l7 5 7-5" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
            </svg>
            © 2026 Sui Blog — Powered by Sui Blockchain
          </div>
          <div className="footer-tagline">Open-source • Built with Next.js</div>
        </div>
      </footer>
    </div>
  );
}
