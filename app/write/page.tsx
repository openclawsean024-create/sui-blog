'use client';

import { useState, useRef } from 'react';
import { useWalletContext } from '@/context/WalletContext';
import { DEMO_POSTS } from '@/types';
import Link from 'next/link';
import { PenLine, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { CATEGORIES } from '@/types';
import type { Post } from '@/types';

export default function WritePage() {
  const { address, connected } = useWalletContext();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState<string>('Development');
  const [tags, setTags] = useState('');
  const [preview, setPreview] = useState(false);
  const [publishing, setPublishing] = useState(false);
  const [published, setPublished] = useState<Post | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const insertMd = (prefix: string, suffix = '') => {
    const ta = textareaRef.current;
    if (!ta) return;
    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selected = content.slice(start, end);
    const newContent = content.slice(0, start) + prefix + selected + suffix + content.slice(end);
    setContent(newContent);
    setTimeout(() => {
      ta.focus();
      ta.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 0);
  };

  const handlePublish = async () => {
    if (!connected || !title.trim() || !content.trim()) return;
    setPublishing(true);
    // Simulate IPFS upload + Sui tx
    await new Promise(r => setTimeout(r, 2000));
    const newPost: Post = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      category: category as Post['category'],
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      author: address!,
      date: new Date().toISOString().split('T')[0],
      txHash: '0x' + Array.from({length: 64}, () => Math.floor(Math.random()*16).toString(16)).join(''),
      ipfsCid: 'bafybeigdyrzt5sfp7udm7hu76uh7y26nf3efuylqabf3oclgtqy55fbzdi',
    };
    DEMO_POSTS.unshift(newPost);
    setPublished(newPost);
    setPublishing(false);
  };

  if (!connected) {
    return (
      <div style={{textAlign: 'center', padding: '5rem 2rem'}}>
        <div style={{fontSize: '3rem', marginBottom: '1rem'}}>🔒</div>
        <h2 style={{color: 'var(--text-primary)', marginBottom: '0.75rem'}}>Wallet Not Connected</h2>
        <p style={{color: 'var(--text-muted)'}}>Please connect your Sui wallet to write and publish articles.</p>
      </div>
    );
  }

  if (published) {
    return (
      <div style={{textAlign: 'center', padding: '5rem 2rem', maxWidth: 600, margin: '0 auto'}}>
        <div style={{fontSize: '3.5rem', marginBottom: '1rem'}}>🎉</div>
        <h2 style={{color: 'var(--text-primary)', marginBottom: '0.75rem'}}>Article Published!</h2>
        <p style={{color: 'var(--text-muted)', marginBottom: '1.5rem'}}>Your article is now on the Sui blockchain.</p>
        <div style={{background: 'var(--bg-card)', border: '1px solid var(--border)', borderRadius: 12, padding: '1rem', marginBottom: '1.5rem', textAlign: 'left'}}>
          <div style={{fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)'}}>TX Hash</div>
          <div style={{fontSize: '0.78rem', color: 'var(--sui-accent)', fontFamily: 'var(--font-mono)', wordBreak: 'break-all'}}>{published.txHash}</div>
        </div>
        <div style={{display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap'}}>
          <Link href={`/article/${published.id}`} className="btn-sui">
            Read Article
          </Link>
          <button className="btn-outline-sui" onClick={() => { setPublished(null); setTitle(''); setContent(''); setTags(''); }}>
            Write Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="write-page">
      <div className="write-header">
        <input
          className="write-title-input"
          placeholder="Article Title..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button
          className="btn-outline-sui"
          onClick={() => setPreview(p => !p)}
        >
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {!preview && (
        <>
          <div className="editor-toolbar">
            {[
              { label: 'Bold', action: () => insertMd('**', '**') },
              { label: 'Italic', action: () => insertMd('_', '_') },
              { label: 'H2', action: () => insertMd('\n## ') },
              { label: 'H3', action: () => insertMd('\n### ') },
              { label: 'Code', action: () => insertMd('`', '`') },
              { label: 'Code Block', action: () => insertMd('\n```\n', '\n```\n') },
              { label: 'Quote', action: () => insertMd('\n> ') },
              { label: 'Link', action: () => insertMd('[', '](url)') },
              { label: 'UL', action: () => insertMd('\n- ') },
              { label: 'OL', action: () => insertMd('\n1. ') },
            ].map(b => (
              <button key={b.label} className="toolbar-btn" onClick={b.action}>{b.label}</button>
            ))}
          </div>
          <div className="editor-container">
            <div className="editor-pane">
              <div className="editor-pane-label">Markdown</div>
              <textarea
                ref={textareaRef}
                className="editor-textarea"
                placeholder="Write your article in Markdown..."
                value={content}
                onChange={e => setContent(e.target.value)}
              />
            </div>
          </div>
        </>
      )}

      {preview && (
        <div className="editor-container">
          <div className="preview-pane" style={{gridColumn: '1/-1'}}>
            <div className="preview-pane-label">Preview</div>
            <div className="preview-content article-content">
              {title && <h1 style={{color: 'var(--text-primary)', marginBottom: '1rem'}}>{title}</h1>}
              {content ? (
                <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
              ) : (
                <p style={{color: 'var(--text-muted)'}}>Nothing to preview yet...</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="write-meta">
        <select className="meta-select" value={category} onChange={e => setCategory(e.target.value)}>
          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input
          className="write-tags-input"
          placeholder="Tags: tag1, tag2, tag3"
          value={tags}
          onChange={e => setTags(e.target.value)}
        />
      </div>

      <div className="write-actions">
        <button
          className="btn-sui"
          onClick={handlePublish}
          disabled={!title.trim() || !content.trim() || publishing}
        >
          {publishing ? (
            <><span className="spin" style={{display:'inline-block'}}>⟳</span> Publishing...</>
          ) : (
            <><Send size={14} /> Publish to Sui Blockchain</>
          )}
        </button>
      </div>
    </div>
  );
}
