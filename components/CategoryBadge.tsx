'use client';
export default function CategoryBadge({ category }: { category: string }) {
  const cls = category === 'Development' ? 'cat-development'
    : category === 'Ecosystem' ? 'cat-ecosystem'
    : category === 'Technical' ? 'cat-technical'
    : 'cat-research';
  return <span className={`post-category-badge ${cls}`}>{category}</span>;
}