import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us — Sui Blog',
  description: 'Get in touch with the Sui Blog team.',
};

export default function ContactPage() {
  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '120px 24px 80px', color: 'var(--text-primary)' }}>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.5rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
        Contact Us
      </h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem', lineHeight: '1.7' }}>
        Have questions about Sui Blog, want to report a bug, or collaborate? Reach out below.
      </p>

      <div style={{ background: 'var(--card-bg)', borderRadius: '20px', padding: '2.5rem', border: '1px solid var(--border-subtle)' }}>
        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>GitHub</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Open an issue or pull request:<br />
            <a href="https://github.com/openclawsean024-create/sui-blog" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.9rem' }}>
              github.com/openclawsean024-create/sui-blog
            </a>
          </p>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Sui Discord</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Join the Sui developer community:<br />
            <a href="https://discord.gg/sui" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
              discord.gg/sui
            </a>
          </p>
        </div>

        <div>
          <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.75rem', fontSize: '1.1rem' }}>Sui Foundation</h3>
          <p style={{ color: 'var(--text-muted)' }}>
            Official documentation and developer portal:<br />
            <a href="https://docs.sui.io" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)' }}>
              docs.sui.io
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}