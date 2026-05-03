import { Metadata } from 'next';
import ArticlePage from '../../../components/ArticlePage';

interface PageProps {
  params: Promise<{ address: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { address } = await params;
  return {
    title: `Author ${address.slice(0, 8)}... — Sui Blog`,
    description: `Articles published by Sui wallet ${address}`,
  };
}

export default async function AuthorRoute({ params }: PageProps) {
  const { address } = await params;
  return <ArticlePage address={address} />;
}