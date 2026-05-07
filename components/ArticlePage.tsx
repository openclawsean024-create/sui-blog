'use client';
import { useRouter } from 'next/navigation';
import { getPostById, formatAddress } from '../lib/posts';

// ── Category Badge ─────────────────────────────────────────────────────────
function CategoryBadge({ category }: { category: string }) {
  const cls = category === 'Development' ? 'cat-development'
    : category === 'Ecosystem' ? 'cat-ecosystem'
    : category === 'Technical' ? 'cat-technical'
    : 'cat-research';
  return <span className={`post-category-badge ${cls}`}>{category}</span>;
}

// ── Markdown Renderer ────────────────────────────────────────────────────────
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
    .replace(/(<li>.*<\/li>)+/g, '<ul>$&</ul>')
    .replace(/^---$/gm, '<hr style="border:none;border-top:1px solid var(--border-subtle);margin:2rem 0;" />')
    .replace(/\n\n/g, '</p><p>')
    .replace(/^(?!<[h|p|u|o|l|t|b|c|pre])(.+)$/gm, '<p>$1</p>')
    .replace(/<p><\/p>/g, '');
}

// ── Article Page ───────────────────────────────────────────────────────────
export default function ArticlePage({ id }: { id: number }) {
  const router = useRouter();
  const post = getPostById(id);

  if (!post) {
    return (
      <div className="article-page">
        <div className="article-inner" style={{ textAlign: 'center', paddingTop: '80px' }}>
          <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', marginBottom: '1rem' }}>Article not found</h1>
          <a href="/posts" className="btn-primary">← Back to Posts</a>
        </div>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="article-inner">
        <button
          className="back-link"
          onClick={() => router.push('/posts')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}
        >
          ← Back to Posts
        </button>

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