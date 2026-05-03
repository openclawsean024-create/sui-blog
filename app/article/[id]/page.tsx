import { Metadata } from 'next';
import ArticlePage from '../../../components/ArticlePage';
import { getPostById } from '../../../lib/posts';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const post = getPostById(parseInt(id));
  if (!post) return { title: 'Article Not Found — Sui Blog' };
  return {
    title: `${post.title} — Sui Blog`,
    description: post.excerpt,
  };
}

export default async function ArticleRoute({ params }: PageProps) {
  const { id } = await params;
  return <ArticlePage id={parseInt(id)} />;
}