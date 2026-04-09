'use client';

import { use } from 'react';
import Link from 'next/link';
import { DEMO_POSTS } from '@/types';
import { ArrowLeft, Wallet } from 'lucide-react';

export default function AuthorPage({ params }: { params: Promise<{ address: string }> }) {
  const { address } = use(params);
  const posts = DEMO_POSTS.filter(p => p.author.toLowerCase() === address.toLowerCase());

  function truncate(addr: string) {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  }

  return (
    <div style={{maxWidth: 900, margin: '0 auto', padding: '3rem 2rem'}}>
      <Link href="/" className="article-back">
        <ArrowLeft size={14} /> Back to Home
      </Link>

      <div style={{
        background: 'var(--bg-card)', border: '1px solid var(--border)',
        borderRadius: 20, padding: '2.5rem', marginTop: '1.5rem', marginBottom: '2.5rem',
        display: 'flex', gap: '1.5rem', alignItems: 'center',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: '50%',
          background: 'linear-gradient(135deg, var(--sui-blue), var(--sui-violet))',
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          <Wallet size={28} color="white" />
        </div>
        <div>
          <div style={{fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.08em'}}>Author</div>
          <div style={{fontFamily: 'var(--font-mono)', fontSize: '1.05rem', color: 'var(--text-primary)', wordBreak: 'break-all', marginBottom: 8}}>
            {address}
          </div>
          <div style={{fontSize: '0.82rem', color: 'var(--text-muted)'}}>
            {posts.length} {posts.length === 1 ? 'article' : 'articles'} published on Sui
          </div>
        </div>
      </div>

      {posts.length === 0 ? (
        <div style={{textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'}}>
          No articles found for this author.
        </div>
      ) : (
        <div className="posts-grid">
          {posts.map(post => (
            <Link key={post.id} href={`/article/${post.id}`} style={{textDecoration: 'none'}}>
              <article className="post-card">
                {post.coverImage && <img src={post.coverImage} alt={post.title} className="post-image" />}
                <div className="post-body">
                  <span className="post-category">{post.category}</span>
                  <h3 className="post-title">{post.title}</h3>
                  <p className="post-excerpt">{post.content.slice(0, 120).replace(/[#*`>]/g, '')}...</p>
                  <div className="post-meta">
                    <span className="post-date">{post.date}</span>
                    <span style={{color: 'var(--sui-accent)', fontSize: '0.8rem'}}>Read →</span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
