'use client';

import { use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { DEMO_POSTS } from '@/types';
import { ArrowLeft, ExternalLink, Hash } from 'lucide-react';

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const post = DEMO_POSTS.find(p => p.id === id);

  if (!post) {
    return (
      <div style={{textAlign: 'center', padding: '5rem 2rem'}}>
        <h2 style={{color: 'var(--text-primary)', marginBottom: '0.75rem'}}>Article Not Found</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem'}}>This article may have been removed or the link is invalid.</p>
        <Link href="/" className="btn-sui">← Back to Home</Link>
      </div>
    );
  }

  function truncate(addr: string) {
    return `${addr.slice(0, 8)}...${addr.slice(-6)}`;
  }

  return (
    <>
      <div style={{maxWidth: 720, margin: '0 auto', padding: '2rem'}}>
        <Link href="/" className="article-back">
          <ArrowLeft size={14} /> Back to Posts
        </Link>
      </div>

      {post.coverImage && (
        <div style={{maxWidth: 720, margin: '0 auto', padding: '0 2rem 1.5rem'}}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={post.coverImage} alt={post.title} className="article-cover" style={{marginBottom: 0}} />
        </div>
      )}

      <div className="article-page" style={{paddingTop: 0}}>
        <div className="article-header">
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <span className="article-category">{post.category}</span>
            <span className="article-date">{post.date}</span>
            <span className="article-author" title={post.author}>
              ✦ {truncate(post.author)}
            </span>
          </div>
        </div>

        <div className="article-divider" />

        {post.tags.length > 0 && (
          <div style={{display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.5rem', alignItems: 'center'}}>
            <Hash size={12} style={{color: 'var(--text-muted)'}} />
            {post.tags.map(tag => (
              <span key={tag} style={{
                padding: '2px 8px', borderRadius: 6, fontSize: '0.72rem',
                background: 'rgba(255,255,255,0.04)', border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}>{tag}</span>
            ))}
          </div>
        )}

        {post.txHash && (
          <div style={{
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: 10, padding: '0.75rem 1rem', marginBottom: '1.5rem',
            display: 'flex', gap: 8, alignItems: 'center', fontSize: '0.78rem',
          }}>
            <div style={{color: 'var(--text-muted)', fontFamily: 'var(--font-mono)'}}>Chain:</div>
            <code style={{color: 'var(--sui-accent)', fontFamily: 'var(--font-mono)', wordBreak: 'break-all', fontSize: '0.75rem'}}>
              {post.txHash}
            </code>
          </div>
        )}

        <div className="article-content">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
        </div>
      </div>
    </>
  );
}
