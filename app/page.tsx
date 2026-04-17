'use client';
import { useState, useEffect, useRef } from 'react';
import { Loader2, X, Wallet, ExternalLink, Copy, LogOut, ChevronDown, Menu, Info } from 'lucide-react';
import { posts, getPostById, formatAddress } from '../lib/posts';
import { useWallet } from '../hooks/useWallet';
import { useToast } from '../hooks/useToast';

// ── Toast Component ──────────────────────────────────────────────────────────
function ToastContainer({ toasts, removeToast }: { toasts: any[]; removeToast: (id: string) => void }) {
  return (
    <div className="toast-container" role="status" aria-live="polite">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`} role={t.type === 'error' ? 'alert' : 'status'}>
          <span>{t.type === 'success' ? '✓' : t.type === 'error' ? '✕' : 'ℹ'} {t.message}</span>
          <button className="toast-close" onClick={() => removeToast(t.id)} aria-label="Close">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  );
}

// ── Wallet Button ───────────────────────────────────────────────────────────
function WalletButton({ wallet, addToast }: { wallet: ReturnType<typeof useWallet>; addToast: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  async function handleClick() {
    if (wallet.status === 'connected') { setMenuOpen(!menuOpen); return; }
    const result = await wallet.connect();
    if (result.success) {
      addToast('success', `Wallet connected: ${formatAddress(result.address!)}`, 3000);
    } else {
      addToast('error', result.error || 'Connection failed. Please try again.', 5000);
    }
  }

  function handleCopy() {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address);
      addToast('info', 'Address copied to clipboard', 2000);
      setMenuOpen(false);
    }
  }

  function handleDisconnect() {
    wallet.disconnect();
    setMenuOpen(false);
    addToast('info', 'Wallet disconnected', 2000);
  }

  const btnClass = wallet.status === 'connected'
    ? 'wallet-btn wallet-btn-connected'
    : wallet.status === 'connecting'
    ? 'wallet-btn wallet-btn-connecting'
    : wallet.status === 'failed'
    ? 'wallet-btn wallet-btn-failed'
    : 'wallet-btn wallet-btn-disconnected';

  const label = wallet.status === 'connected'
    ? formatAddress(wallet.address!)
    : wallet.status === 'connecting'
    ? 'Connecting...'
    : wallet.status === 'failed'
    ? 'Retry Connection'
    : 'Connect Wallet';

  return (
    <div className="wallet-dropdown" ref={menuRef}>
      <button
        className={btnClass}
        onClick={handleClick}
        disabled={wallet.status === 'connecting'}
        aria-label={
          wallet.status === 'connected'
            ? `Wallet connected. Address: ${formatAddress(wallet.address!)}. Press Enter for options.`
            : wallet.status === 'connecting'
            ? 'Connecting wallet...'
            : 'Connect wallet'
        }
      >
        {wallet.status === 'connecting' ? (
          <><Loader2 size={14} className="spin" /> {label}</>
        ) : wallet.status === 'connected' ? (
          <><span className="wallet-dot" />{label} <ChevronDown size={12} /></>
        ) : (
          <><Wallet size={14} /> {label}</>
        )}
      </button>

      {wallet.status === 'connected' && (
        <div className={`wallet-dropdown-menu ${menuOpen ? 'open' : ''}`} role="menu">
          <div style={{ padding: '8px 10px 4px', fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
            Connected Wallet
          </div>
          <button className="wallet-dropdown-item" onClick={handleCopy} role="menuitem">
            <Copy size={13} /> Copy Address
          </button>
          <button
            className="wallet-dropdown-item"
            onClick={() => { window.open(`https://suivision.xyz/account/${wallet.address}`, '_blank'); setMenuOpen(false); }}
            role="menuitem"
          >
            <ExternalLink size={13} /> View on Explorer
          </button>
          <div className="wallet-dropdown-divider" />
          <button className="wallet-dropdown-item danger" onClick={handleDisconnect} role="menuitem">
            <LogOut size={13} /> Disconnect
          </button>
        </div>
      )}
    </div>
  );
}

// ── Navbar ─────────────────────────────────────────────────────────────────
function Navbar({ activePage, setActivePage }: { activePage: string; setActivePage: (p: string) => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { wallet } = { wallet: useWallet() };
  const { addToast } = { addToast: useToast().addToast };

  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 100); }
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { id: 'posts', label: 'Posts' },
    { id: 'about', label: 'About' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'write', label: 'Write' },
  ];

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label="Main navigation">
        <div className="navbar-inner">
          <a
            href="#posts"
            className="navbar-logo"
            onClick={(e) => { e.preventDefault(); setActivePage('posts'); setMobileOpen(false); }}
          >
            <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
              <path d="M16 4L6 10l10 6 10-6-10-6z" fill="#6F7DFB" />
              <path d="M6 22l10 6 10-6" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 16l10 6 10-6" stroke="#6F7DFB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.6" />
            </svg>
            Sui Blog
          </a>

          <div className="navbar-nav">
            {links.map(l => (
              <a
                key={l.id}
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); setActivePage(l.id); }}
                className={activePage === l.id ? 'active' : ''}
                aria-current={activePage === l.id ? 'page' : undefined}
              >
                {l.label}
              </a>
            ))}
          </div>

          <div className="navbar-right">
            <button
              className="btn-secondary"
              onClick={() => setActivePage('write')}
              style={{ display: 'none' }}
              aria-label="Write new article"
            >Write</button>
            <WalletButton wallet={useWallet()} addToast={useToast().addToast} />
            <button
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={mobileOpen}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal="true" aria-label="Navigation menu">
        <button className="mobile-close-btn" onClick={() => setMobileOpen(false)} aria-label="Close menu">
          <X size={28} />
        </button>
        {links.map(l => (
          <a
            key={l.id}
            href={`#${l.id}`}
            onClick={(e) => { e.preventDefault(); setActivePage(l.id); setMobileOpen(false); }}
          >
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}

// ── Hero ───────────────────────────────────────────────────────────────────
function Hero({ setActivePage }: { setActivePage: (p: string) => void }) {
  return (
    <section className="hero">
      <div className="hero-glow" aria-hidden="true" />
      <div className="hero-glow-2" aria-hidden="true" />
      <div className="hero-content">
        <div className="hero-eyebrow">
          <span className="hero-badge-icon">◎</span>
          Built on Sui Blockchain
        </div>
        <h1 className="hero-title">
          Where Web3 Stories<br />
          <span className="hero-title-gradient">Come to Life</span>
        </h1>
        <p className="hero-subtitle">
          A developer-focused blog exploring the Sui ecosystem. Deep dives into Move language, dApp development, and the future of scalable Web3.
        </p>
        <div className="hero-actions">
          <a
            href="#posts"
            className="btn-primary"
            onClick={(e) => { e.preventDefault(); setActivePage('posts'); }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
              <polyline points="13 2 13 9 20 9" />
            </svg>
            Browse Articles
          </a>
          <a
            href="#write"
            className="btn-secondary"
            onClick={(e) => { e.preventDefault(); setActivePage('write'); }}
            style={{ padding: '12px 24px', fontSize: '0.95rem', borderRadius: '14px' }}
          >
            Start Writing
          </a>
        </div>
      </div>
    </section>
  );
}

// ── Category Badge ─────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  const cls = category === 'Development' ? 'cat-development'
    : category === 'Ecosystem' ? 'cat-ecosystem'
    : category === 'Technical' ? 'cat-technical'
    : 'cat-research';
  return <span className={`post-category-badge ${cls}`}>{category}</span>;
}

// ── Post Card ───────────────────────────────────────────────────────────────
function PostCard({ post, onClick }: { post: any; onClick: () => void }) {
  return (
    <article
      className="post-card"
      onClick={onClick}
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); } }}
      role="button"
      aria-label={`Read article: ${post.title}`}
    >
      <div className="post-card-image" aria-hidden="true">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M24 8L8 16l16 10 16-10-16-8z" fill="#6F7DFB" opacity="0.5" />
          <path d="M8 32l16 10 16-10" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 24l16 10 16-10" stroke="#6F7DFB" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        </svg>
      </div>
      <div className="post-card-body">
        <div className="post-card-top">
          <CategoryBadge category={post.category} />
        </div>
        <h2 className="post-card-title">{post.title}</h2>
        <p className="post-card-excerpt">{post.excerpt}</p>
        <div className="post-card-meta">
          <span className="post-meta-date">{post.date}</span>
          <span className="post-meta-author">{formatAddress(post.author)}</span>
        </div>
      </div>
    </article>
  );
}

// ── Posts Page ─────────────────────────────────────────────────────────────
function PostsPage({ setActivePage, setArticleId }: { setActivePage: (p: string) => void; setArticleId: (id: number) => void }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', 'Development', 'Ecosystem', 'Technical', 'Research'];
  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  return (
    <div className="section-pad">
      <div className="section-container">
        <div className="section-label">Latest Articles</div>
        <h1 className="section-heading">Web3 Stories on <span className="gradient-text">Sui</span></h1>

        {/* Category Filter */}
        <div className="category-filter" role="tablist" aria-label="Filter articles by category">
          {categories.map(cat => (
            <button
              key={cat}
              className={`category-btn ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              role="tab"
              aria-selected={filter === cat}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Post Grid */}
        <div className="posts-grid">
          {filtered.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onClick={() => { setArticleId(post.id); setActivePage('article'); }}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            No articles in this category yet.
          </div>
        )}
      </div>
    </div>
  );
}

// ── Article Page ───────────────────────────────────────────────────────────
function renderMarkdown(content: string): string {
  // Simple markdown renderer → HTML-like structure (safe for React dangerouslySetInnerHTML)
  return content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code>$2</code></pre>')
    .replace(/^\| (.+) \|$/gm, (m) => {
      const cells = m.split('|').filter(c => c.trim());
      const isHeader = cells.some(c => c.trim().match(/^[-:]+$/));
      if (isHeader) return '';
      const tag = 'td';
      return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
    })
    .replace(/(<tr>[\s\S]+?<\/tr>)+/g, '<table>$&</table>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border-subtle);margin:2rem 0;" />')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|p|u|o|l|t|b|c|pre])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

function ArticlePage({ id, setActivePage }: { id: number; setActivePage: (p: string) => void }) {
  const post = getPostById(id);
  if (!post) {
    return (
      <div className="article-page">
        <div className="article-inner" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', marginBottom: '1rem' }}>Article not found</h1>
          <button className="btn-primary" onClick={() => setActivePage('posts')}>← Back to Posts</button>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="article-inner">
        <a
          href="#posts"
          className="back-link"
          onClick={(e) => { e.preventDefault(); setActivePage('posts'); }}
        >
          ← Back to Posts
        </a>

        <div className="article-header">
          <CategoryBadge category={post.category} />
          <h1 className="article-title" style={{ marginTop: '1rem' }}>{post.title}</h1>
          <div className="article-meta">
            <span className="post-meta-date">{post.date}</span>
            <span className="article-meta-sep">·</span>
            <span className="post-meta-author" style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.8rem' }}>{formatAddress(post.author)}</span>
          </div>
        </div>

        <div className="article-divider" />

        <div
          className="article-body"
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />
      </div>
    </div>
  );
}

// ── About Page ──────────────────────────────────────────────────────────────
function AboutPage() {
  const features = [
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6F7DFB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
        </svg>
      ),
      title: 'Move Language',
      desc: 'Resource-oriented programming with formal verification support prevents entire categories of exploits.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#22C55E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="2" y1="12" x2="22" y2="12" /><polyline points="6 8 2 12 6 16" /><polyline points="18 8 22 12 18 16" />
        </svg>
      ),
      title: 'Horizontal Scaling',
      desc: 'Every object gets its own voting process — enabling true horizontal throughput without total ordering.',
    },
    {
      icon: (
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" />
          <rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" />
        </svg>
      ),
      title: 'Object Model',
      desc: 'Everything is an object — owned, shared, or immutable. Composability built into the protocol itself.',
    },
  ];

  const stats = [
    { value: '10M+', label: 'Daily Transactions', color: '#6F7DFB' },
    { value: '< 500ms', label: 'Finality Time', color: '#22C55E' },
    { value: '100+', label: 'Active dApps', color: '#F59E0B' },
    { value: '$2B+', label: 'Total Value Locked', color: '#A78BFA' },
  ];

  return (
    <div>
      <section className="about-section">
        <div className="section-container">
          <div className="about-grid">
            <div className="about-text">
              <div className="section-label">About Sui</div>
              <h2>The Blockchain Built for <span className="gradient-text">Real Adoption</span></h2>
              <p>
                Sui is a next-generation blockchain designed from the ground up for
                horizontal scaling and mass adoption. Unlike traditional blockchains
                that serialize all transactions, Sui processes them in parallel —
                achieving throughput that was previously impossible.
              </p>
              <p>
                Built by the team behind Move — the programming language originally
                developed at Meta for the Diem blockchain — Sui inherits years of
                smart contract security research.
              </p>
              <div className="about-features">
                {['Formal verification for smart contracts', 'Sub-second finality for most transactions', 'Object-centric data model for composability'].map(f => (
                  <div key={f} className="about-feature">
                    <span className="about-feature-dot" aria-hidden="true" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="about-stats-card">
              <div className="section-label">Key Metrics</div>
              <div className="stats-grid">
                {stats.map(s => (
                  <div key={s.label} className="stat-item">
                    <div className="stat-number" style={{ background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                      {s.value}
                    </div>
                    <div className="stat-label">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-pad" style={{ background: 'var(--bg-deep)' }}>
        <div className="section-container">
          <div className="section-label">Core Technologies</div>
          <h2 className="section-heading">What Makes Sui <span className="gradient-text">Different</span></h2>
          <div className="features-grid">
            {features.map(f => (
              <div key={f.title} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <div className="feature-title">{f.title}</div>
                <div className="feature-desc">{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ── Write Page ─────────────────────────────────────────────────────────────
function WritePage({ wallet, addToast, setActivePage }: {
  wallet: ReturnType<typeof useWallet>;
  addToast: any;
  setActivePage: (p: string) => void;
}) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Development');
  const [content, setContent] = useState('');
  const [publishing, setPublishing] = useState(false);

  if (wallet.status !== 'connected') {
    return (
      <div className="write-page">
        <div className="write-inner">
          <h1 className="write-title">Write on Sui Blog</h1>
          <div className="wallet-notice">
            <div className="wallet-notice-icon"><Info size={40} /></div>
            <h3>Wallet Not Connected</h3>
            <p>Please connect your Sui wallet to start publishing articles on-chain.</p>
          </div>
        </div>
      </div>
    );
  }

  async function handlePublish() {
    if (!title.trim() || !content.trim()) {
      addToast('error', 'Please fill in title and content.', 3000);
      return;
    }
    setPublishing(true);
    await new Promise(res => setTimeout(res, 1500));
    setPublishing(false);
    addToast('success', 'Article published successfully!', 3000);
    setTitle(''); setCategory('Development'); setContent('');
    setActivePage('posts');
  }

  return (
    <div className="write-page">
      <div className="write-inner">
        <h1 className="write-title">Publish New Article</h1>
        <div className="write-form">
          <div className="form-field">
            <label className="form-label" htmlFor="title">Article Title</label>
            <input
              id="title"
              className="form-input"
              type="text"
              placeholder="Your article title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              aria-required="true"
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="category">Category</label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
              aria-required="true"
            >
              <option value="Development">Development</option>
              <option value="Ecosystem">Ecosystem</option>
              <option value="Technical">Technical</option>
              <option value="Research">Research</option>
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="content">Content (Markdown)</label>
            <textarea
              id="content"
              className="form-textarea"
              placeholder="Write your article content in Markdown..."
              value={content}
              onChange={e => setContent(e.target.value)}
              aria-required="true"
            />
          </div>
          <div className="write-actions">
            <button
              className="btn-primary"
              onClick={handlePublish}
              disabled={publishing || !title.trim() || !content.trim()}
              aria-label="Publish article"
            >
              {publishing ? (
                <><Loader2 size={14} className="spin" /> Publishing...</>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                  Publish Article
                </>
              )}
            </button>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              Author: {formatAddress(wallet.address!)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Footer ─────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
            <path d="M16 4L6 10l10 6 10-6-10-6z" fill="#6F7DFB" />
            <path d="M6 22l10 6 10-6" stroke="#00D4FF" strokeWidth="2" strokeLinecap="round" />
            <path d="M6 16l10 6 10-6" stroke="#6F7DFB" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          </svg>
          Sui Blog — Built on Sui Blockchain
        </div>
        <div className="footer-links">
          <a href="https://docs.sui.io" target="_blank" rel="noopener noreferrer" aria-label="Sui Documentation">Docs</a>
          <a href="https://sui.io/developers" target="_blank" rel="noopener noreferrer" aria-label="Sui Developers">Developers</a>
          <a href="https://github.com/openclawsean024-create/sui-blog" target="_blank" rel="noopener noreferrer" aria-label="GitHub">GitHub</a>
        </div>
        <div className="footer-tagline">Open Source · Next.js · Sui Network</div>
      </div>
    </footer>
  );
}

// ── Ecosystem Page ──────────────────────────────────────────────────────────
function EcosystemPage() {
  return (
    <div className="section-pad">
      <div className="section-container">
        <div className="section-label">Explore</div>
        <h1 className="section-heading">Sui <span className="gradient-text">Ecosystem</span></h1>
        <div className="posts-grid">
          {posts.filter(p => p.category === 'Ecosystem').map(post => (
            <PostCard key={post.id} post={post} onClick={() => {}} />
          ))}
          {posts.filter(p => p.category !== 'Ecosystem').slice(0, 4).map(post => (
            <PostCard key={post.id} post={post} onClick={() => {}} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main App ────────────────────────────────────────────────────────────────
export default function Home() {
  const [activePage, setActivePage] = useState('posts');
  const [articleId, setArticleId] = useState<number | null>(null);
  const wallet = useWallet();
  const { toasts, addToast, removeToast } = useToast();

  // Handle hash routing on load
  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['posts', 'about', 'write', 'ecosystem'].includes(hash)) {
      setActivePage(hash);
    }
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar activePage={activePage} setActivePage={setActivePage} />

      <main className="main-content" id="main">
        {activePage === 'posts' && (
          <>
            <Hero setActivePage={setActivePage} />
            <PostsPage setActivePage={setActivePage} setArticleId={(id) => { setArticleId(id); setActivePage('article'); }} />
          </>
        )}
        {activePage === 'article' && articleId && (
          <ArticlePage id={articleId} setActivePage={setActivePage} />
        )}
        {activePage === 'about' && <AboutPage />}
        {activePage === 'write' && (
          <WritePage wallet={wallet} addToast={addToast} setActivePage={setActivePage} />
        )}
        {activePage === 'ecosystem' && <EcosystemPage />}
      </main>

      <Footer />
      <ToastContainer toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
