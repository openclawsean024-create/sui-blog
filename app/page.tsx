'use client';

import { useState } from 'react';
import Link from 'next/link';
import { DEMO_POSTS, CATEGORIES } from '@/types';
import type { Post } from '@/types';
import WalletButton from '@/components/WalletButton';
import { PenLine } from 'lucide-react';

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered: Post[] = DEMO_POSTS.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchCat && matchSearch;
  });

  const featured = filtered[0];
  const rest = filtered.slice(1);

  function truncate(addr: string) {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  }

  return (
    <div className="page">
      {/* Header */}
      <header className="site-header">
        <div className="header-inner">
          <Link href="/" className="logo">
            <div className="logo-icon">
              <svg viewBox="0 0 20 20" fill="none">
                <path d="M10 2L3 7l7 5 7-5-7-5z" fill="white" opacity="0.9"/>
                <path d="M3 13l7 5 7-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.6"/>
              </svg>
            </div>
            <span className="logo-name">Sui Blog</span>
          </Link>
          <nav className="header-nav">
            <a href="#posts">Posts</a>
            <a href="#about">About</a>
            <a href="https://sui.io" target="_blank" rel="noopener noreferrer">Ecosystem</a>
          </nav>
          <div style={{display: 'flex', gap: 8, alignItems: 'center'}}>
            <Link href="/write" className="nav-write-btn">
              <PenLine size={13} /> Write
            </Link>
            <WalletButton />
          </div>
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
            <a href="https://sui.io/developers" target="_blank" rel="noopener noreferrer" className="btn-outline-sui">
              Sui Developers
            </a>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* Filtered Posts */}
      <section id="posts" className="featured-section">
        <div className="section-container">
          {/* Search + Filter */}
          <div style={{marginBottom: '1.5rem'}}>
            <input
              type="search"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              style={{
                width: '100%', maxWidth: 340, padding: '8px 14px', borderRadius: 10,
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border-strong)',
                color: 'var(--text-primary)', fontSize: '0.85rem', outline: 'none', marginBottom: '1rem',
              }}
            />
          </div>
          <div className="category-filter">
            <button
              className={`category-btn${activeCategory === 'All' ? ' active' : ''}`}
              onClick={() => setActiveCategory('All')}
            >All</button>
            {CATEGORIES.map(c => (
              <button
                key={c}
                className={`category-btn${activeCategory === c ? ' active' : ''}`}
                onClick={() => setActiveCategory(c)}
              >{c}</button>
            ))}
          </div>

          {/* Featured */}
          {featured && (
            <Link href={`/article/${featured.id}`} style={{textDecoration: 'none', display: 'block', marginBottom: '2rem'}}>
              <div className="featured-post">
                {featured.coverImage && <img src={featured.coverImage} alt={featured.title} className="featured-post-img" />}
                <div className="featured-post-body">
                  <div className="featured-post-label">{featured.category}</div>
                  <h2 className="featured-post-title">{featured.title}</h2>
                  <p className="featured-post-excerpt">{featured.content.slice(0, 200).replace(/[#*`>]/g, '')}...</p>
                  <div className="featured-post-meta">
                    {featured.date}
                    <span style={{marginLeft: 12, color: 'var(--sui-accent)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)'}}>
                      ✦ {truncate(featured.author)}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          )}

          {/* Grid */}
          {rest.length > 0 && (
            <>
              <div className="section-label" style={{marginTop: '2.5rem'}}>All Posts</div>
              <div className="posts-grid">
                {rest.map(post => (
                  <Link key={post.id} href={`/article/${post.id}`} style={{textDecoration: 'none'}}>
                    <article className="post-card">
                      {post.coverImage && <img src={post.coverImage} alt={post.title} className="post-image" />}
                      <div className="post-body">
                        <span className="post-category">{post.category}</span>
                        <h3 className="post-title">{post.title}</h3>
                        <p className="post-excerpt">{post.content.slice(0, 100).replace(/[#*`>]/g, '')}...</p>
                        <div className="post-meta">
                          <span className="post-date">{post.date}</span>
                          <span style={{color: 'var(--sui-accent)', fontSize: '0.8rem'}}>Read →</span>
                        </div>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            </>
          )}

          {filtered.length === 0 && (
            <div style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>
              No articles match your search or filter.
            </div>
          )}
        </div>
      </section>

      <div className="divider" />

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
            {['Move Language — Safe, expressive smart contracts', 'Horizontal Scaling — Transaction parallellism', 'Object Model — Fine-grained ownership and composability'].map(item => (
              <div key={item} className="about-check">
                <div className="about-check-icon">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#A78BFA" strokeWidth="2.5" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>
                </div>
                {item}
              </div>
            ))}
          </div>
          <div className="sui-stats">
            <div className="sui-stats-grid">
              {[
                { num: '10M+', label: 'Daily Transactions' },
                { num: '< 500ms', label: 'Finality Time' },
                { num: '100+', label: 'dApps Live' },
                { num: '$2B+', label: 'Total Value Locked' },
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

      <div className="divider" />

      {/* CTA */}
      <section className="cta-section">
        <div className="cta-inner">
          <h2 className="cta-title">Start Building on <span style={{color: 'var(--sui-accent)'}}>Sui</span></h2>
          <p className="cta-sub">
            Explore the Sui documentation, join the developer community, and ship your first dApp today.
          </p>
          <div className="cta-actions">
            <a href="https://docs.sui.io" target="_blank" rel="noopener noreferrer" className="btn-sui">Sui Documentation</a>
            <a href="https://github.com/openclawsean024-create/sui-blog" target="_blank" rel="noopener noreferrer" className="btn-outline-sui">View on GitHub</a>
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
