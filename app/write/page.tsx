'use client';
import { useState } from 'react';
import { useCurrentAccount } from '@mysten/dapp-kit';
import { Loader2, Info } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { formatAddress } from '../../lib/posts';
import { useRouter } from 'next/navigation';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Development');
  const [content, setContent] = useState('');
  const [publishing, setPublishing] = useState(false);
  const currentAccount = useCurrentAccount();
  const { addToast } = useToast();
  const router = useRouter();

  if (!currentAccount) {
    return (
      <div className="write-page">
        <div className="write-inner">
          <h1 className="write-title">Write on Sui Blog</h1>
          <div className="wallet-notice">
            <div className="wallet-notice-icon"><Info size={40} /></div>
            <h3>Wallet Not Connected</h3>
            <p>Please connect your Sui wallet to start publishing articles on-chain.</p>
          </div>
        </div>
      </div>
    );
  }

  async function handlePublish() {
    if (!title.trim() || !content.trim()) {
      addToast('error', 'Please fill in title and content.', 3000);
      return;
    }
    setPublishing(true);
    await new Promise(res => setTimeout(res, 1500));
    setPublishing(false);
    addToast('success', 'Article published successfully!', 3000);
    setTitle(''); setCategory('Development'); setContent('');
    router.push('/posts');
  }

  return (
    <div className="write-page">
      <div className="write-inner">
        <h1 className="write-title">Publish New Article</h1>
        <div className="write-form">
          <div className="form-field">
            <label className="form-label" htmlFor="title">Article Title</label>
            <input
              id="title"
              className="form-input"
              type="text"
              placeholder="Your article title..."
              value={title}
              onChange={e => setTitle(e.target.value)}
              aria-required="true"
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="category">Category</label>
            <select
              id="category"
              className="form-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
              aria-required="true"
            >
              <option value="Development">Development</option>
              <option value="Ecosystem">Ecosystem</option>
              <option value="Technical">Technical</option>
              <option value="Research">Research</option>
            </select>
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="content">Content (Markdown)</label>
            <textarea
              id="content"
              className="form-textarea"
              placeholder="Write your article content in Markdown..."
              value={content}
              onChange={e => setContent(e.target.value)}
              aria-required="true"
            />
          </div>
          <div className="write-actions">
            <button
              className="btn-primary"
              onClick={handlePublish}
              disabled={publishing || !title.trim() || !content.trim()}
              aria-label="Publish article"
            >
              {publishing ? (
                <><Loader2 size={14} className="spin" /> Publishing...</>
              ) : (
                <>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" />
                    <polyline points="13 2 13 9 20 9" />
                  </svg>
                  Publish Article
                </>
              )}
            </button>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'JetBrains Mono, monospace' }}>
              Author: {formatAddress(currentAccount.address)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}