'use client';
import { useState } from 'react';
import CategoryBadge from './CategoryBadge';
import Link from 'next/link';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { getPostById, getPostsByAuthor, formatAddress } from '../lib/posts';

// ── Markdown renderer ───────────────────────────────────────────────────────
function renderMarkdown(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/```(\w+)?\n([\s\S]+?)```/g, '<pre><code>$2</code></pre>')
    .replace(/^\| (.+) \|$/gm, (m) => {
      const cells = m.split('|').filter(c => c.trim());
      const isHeader = cells.some(c => c.trim().match(/^[-:]+$/));
      if (isHeader) return '';
      return '<tr>' + cells.map(c => `<td>${c.trim()}</td>`).join('') + '</tr>';
    })
    .replace(/(<tr>[\s\S]+?<\/tr>)+/g, '<table>$&</table>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/^- (.+)$/gm, '<li>$1</li>')
    .replace(/(<li>[\s\S]*?<\/li>)+/g, '<ul>$&</ul>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border-subtle);margin:2rem 0;" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" style="color:var(--primary);text-decoration:underline">$1</a>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|p|u|o|l|t|b|c|pre|a])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

// ── Tip Modal ──────────────────────────────────────────────────────────────
function TipModal({ author, onClose }: { author: string; onClose: () => void }) {
  const [amount, setAmount] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState<'success' | 'error' | null>(null);
  const currentAccount = useCurrentAccount();

  async function handleSend() {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0) return;
    setSending(true);
    await new Promise(r => setTimeout(r, 1800));
    setSending(false);
    setResult('success');
    setTimeout(onClose, 1800);
  }

  return (
    <div style={{
      position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', zIndex: 1000,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div style={{
        background: 'var(--card-bg)', borderRadius: '20px', padding: '2.5rem',
        maxWidth: '420px', width: '100%', border: '1px solid var(--border-subtle)',
        boxShadow: '0 25px 60px rgba(0,0,0,0.5)'
      }}>
        <h3 style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.5rem', marginBottom: '0.5rem' }}>
          Tip Author
        </h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
          Send SUI to <span style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary)' }}>{formatAddress(author)}</span>
        </p>
        {result === 'success' ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
            <p style={{ color: 'var(--accent)', fontSize: '1.1rem' }}>Tip sent successfully!</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Transaction simulated (mainnet requires real SUI)</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Amount (SUI)</label>
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                placeholder="0.1"
                style={{
                  width: '100%', background: 'var(--bg-deep)', border: '1px solid var(--border-subtle)',
                  borderRadius: '12px', padding: '12px 16px', color: 'var(--text-primary)',
                  fontSize: '1.1rem', fontFamily: 'JetBrains Mono, monospace', outline: 'none'
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                onClick={handleSend}
                disabled={!amount || sending}
                style={{
                  flex: 1, background: 'var(--accent)', color: '#fff', border: 'none',
                  borderRadius: '12px', padding: '12px', fontWeight: '600', cursor: sending ? 'not-allowed' : 'pointer',
                  opacity: (!amount || sending) ? 0.5 : 1
                }}
              >
                {sending ? 'Sending...' : 'Confirm Tip'}
              </button>
              <button
                onClick={onClose}
                style={{
                  padding: '12px 20px', background: 'transparent', border: '1px solid var(--border-subtle)',
                  borderRadius: '12px', color: 'var(--text-muted)', cursor: 'pointer'
                }}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ── Article Page (for single post view) ───────────────────────────────────
interface ArticlePageProps {
  id?: number;
  address?: string;
  onBack?: () => void;
}

export default function ArticlePage({ id, address, onBack }: ArticlePageProps) {
  const [showTip, setShowTip] = useState(false);
  const currentAccount = useCurrentAccount();

  if (address) {
    return <AuthorPage address={address} />;
  }

  if (!id) return null;

  const post = getPostById(id);
  if (!post) {
    return (
      <div style={{ textAlign: 'center', padding: '120px 24px 80px' }}>
        <h1 style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', marginBottom: '1rem' }}>
          Article not found
        </h1>
        <Link href="/#posts" style={{ color: 'var(--primary)' }}>← Back to Posts</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '80px 0 60px' }}>
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px' }}>
        <Link href="/#posts" style={{ color: 'var(--primary)', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '0.3rem', marginBottom: '2rem' }}>
          ← Back to Posts
        </Link>

        <CategoryBadge category={post.category} />
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.2rem', marginTop: '1rem', marginBottom: '0.75rem', color: 'var(--text-primary)', lineHeight: '1.3' }}>
          {post.title}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '2rem' }}>
          <span>{post.date}</span>
          <span>·</span>
          <Link href={`/author/${post.author}`} style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace' }}>
            {formatAddress(post.author)}
          </Link>
        </div>

        {post.ipfsCid && (
          <div style={{ background: 'var(--bg-deep)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.75rem', fontFamily: 'JetBrains Mono, monospace', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
            📦 IPFS CID: {post.ipfsCid}
          </div>
        )}

        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '2rem', marginBottom: '2rem' }} />

        <div
          style={{ lineHeight: '1.8', color: 'var(--text-primary)', fontSize: '1rem' }}
          dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
        />

        <div style={{ borderTop: '1px solid var(--border-subtle)', marginTop: '3rem', paddingTop: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button
            onClick={() => setShowTip(true)}
            style={{
              background: 'var(--card-bg)', border: '1px solid var(--accent)', borderRadius: '12px',
              padding: '10px 20px', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem'
            }}
          >
            💰 Tip Author
          </button>
        </div>
      </div>

      {showTip && <TipModal author={post.author} onClose={() => setShowTip(false)} />}
    </div>
  );
}

// ── Author Page ────────────────────────────────────────────────────────────
function AuthorPage({ address }: { address: string }) {
  const posts = getPostsByAuthor(address);

  return (
    <div style={{ padding: '100px 24px 60px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--primary), var(--sui-purple))',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1.5rem', fontFamily: 'JetBrains Mono, monospace', color: '#fff', fontWeight: '700'
          }}>
            {address.slice(2, 4).toUpperCase()}
          </div>
          <div>
            <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
              Author Profile
            </h1>
            <p style={{ fontFamily: 'JetBrains Mono, monospace', color: 'var(--primary)', fontSize: '0.85rem' }}>
              {address}
            </p>
          </div>
        </div>

        <div style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
          {posts.length} {posts.length === 1 ? 'article' : 'articles'} published
        </div>

        {posts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--text-muted)' }}>
            No articles published yet.
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))' }}>
            {posts.map(post => (
              <Link
                key={post.id}
                href={`/article/${post.id}`}
                style={{ textDecoration: 'none' }}
              >
                <div style={{
                  background: 'var(--card-bg)', border: '1px solid var(--border-subtle)',
                  borderRadius: '16px', padding: '1.5rem', cursor: 'pointer',
                  transition: 'border-color 0.2s, transform 0.2s'
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--primary)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-subtle)'; (e.currentTarget as HTMLDivElement).style.transform = ''; }}
                >
                  <CategoryBadge category={post.category} />
                  <h3 style={{ color: 'var(--text-primary)', fontFamily: 'Space Grotesk, sans-serif', fontSize: '1.1rem', marginTop: '0.75rem', marginBottom: '0.5rem' }}>
                    {post.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>{post.excerpt}</p>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{post.date}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}