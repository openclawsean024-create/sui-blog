'use client';
import { useState } from 'react';
import { posts, formatAddress } from '../lib/posts';
import { useRouter } from 'next/navigation';

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
export default function PostsPage() {
  const [filter, setFilter] = useState('All');
  const router = useRouter();
  const categories = ['All', 'Development', 'Ecosystem', 'Technical', 'Research'];
  const filtered = filter === 'All' ? posts : posts.filter(p => p.category === filter);

  function handlePostClick(postId: number) {
    router.push(`/posts/${postId}`);
  }

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
              onClick={() => handlePostClick(post.id)}
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