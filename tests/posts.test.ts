import { describe, it, expect } from 'vitest';
import {
  posts,
  getPostById,
  getPostsByCategory,
  formatAddress,
} from '../lib/posts';

describe('lib/posts', () => {
  describe('posts data', () => {
    it('exports a non-empty array of posts', () => {
      expect(Array.isArray(posts)).toBe(true);
      expect(posts.length).toBeGreaterThan(0);
    });

    it('every post has the required fields', () => {
      for (const p of posts) {
        expect(typeof p.id).toBe('number');
        expect(typeof p.title).toBe('string');
        expect(p.title.length).toBeGreaterThan(0);
        expect(typeof p.excerpt).toBe('string');
        expect(typeof p.content).toBe('string');
        expect(['Development', 'Ecosystem', 'Technical', 'Research']).toContain(p.category);
        expect(typeof p.date).toBe('string');
        expect(typeof p.author).toBe('string');
      }
    });

    it('post ids are unique', () => {
      const ids = posts.map((p) => p.id);
      expect(new Set(ids).size).toBe(ids.length);
    });
  });

  describe('getPostById', () => {
    it('returns a post when id matches', () => {
      const post = getPostById(posts[0].id);
      expect(post).toBeDefined();
      expect(post?.id).toBe(posts[0].id);
    });

    it('returns undefined when id does not match', () => {
      expect(getPostById(99999)).toBeUndefined();
      expect(getPostById(-1)).toBeUndefined();
    });
  });

  describe('getPostsByCategory', () => {
    it('returns all posts when category is "All"', () => {
      const all = getPostsByCategory('All');
      expect(all.length).toBe(posts.length);
    });

    it('returns only matching category posts', () => {
      const dev = getPostsByCategory('Development');
      expect(dev.length).toBeGreaterThan(0);
      for (const p of dev) {
        expect(p.category).toBe('Development');
      }
    });

    it('returns empty array for unknown category', () => {
      const none = getPostsByCategory('NonExistentCategory');
      expect(none).toEqual([]);
    });

    it('covers all 4 expected categories', () => {
      const cats = new Set(posts.map((p) => p.category));
      expect(cats.size).toBeGreaterThanOrEqual(3);
      for (const c of ['Development', 'Ecosystem', 'Technical', 'Research']) {
        expect(getPostsByCategory(c).length).toBeGreaterThan(0);
      }
    });
  });

  describe('formatAddress', () => {
    it('shortens a long hex address to first-6 + last-4', () => {
      const addr = '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcd';
      const result = formatAddress(addr);
      expect(result).toBe(addr.slice(0, 6) + '...' + addr.slice(-4));
      expect(result).toBe('0x1234...abcd');
    });

    it('handles empty string gracefully (returns ... )', () => {
      const result = formatAddress('');
      expect(result).toBe('...');
    });
  });
});
