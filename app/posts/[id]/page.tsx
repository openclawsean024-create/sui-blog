'use client';
import { useParams } from 'next/navigation';
import ArticlePage from '../../../components/ArticlePage';

export default function PostDetailPage() {
  const params = useParams();
  const id = Number(params.id);

  if (!params.id || isNaN(id)) {
    return (
      <div style={{ padding: '120px 24px', textAlign: 'center' }}>
        <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2rem', marginBottom: '1rem' }}>Invalid article ID</h1>
        <a href="/posts" style={{ color: '#6F7DFB', textDecoration: 'none' }}>← Back to Posts</a>
      </div>
    );
  }

  return <ArticlePage id={id} />;
}