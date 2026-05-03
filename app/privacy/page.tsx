import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy — Sui Blog',
  description: 'Sui Blog privacy policy and data handling practices.',
};

export default function PrivacyPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px', color: 'var(--text-primary)' }}>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
        Privacy Policy
      </h1>
      <div style={{ lineHeight: '1.8', fontSize: '1rem', color: 'var(--text-muted)' }}>
        <p>Last updated: May 2026</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>1. Information We Collect</h2>
        <p>Sui Blog stores blockchain wallet addresses to provide author identification. When you connect your Sui wallet, we only access your public address — no private keys or seed phrases are ever collected.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>2. How We Use Information</h2>
        <p>Your wallet address is used to attribute published articles to your identity on-chain. Transaction hashes for publishing and tipping are recorded to provide verifiable proof of authorship and donations.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>3. Data Storage</h2>
        <p>Article content and metadata are stored on IPFS and the Sui blockchain. These are decentralized and cannot be deleted or modified by us. Published articles are permanent.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>4. Cookies</h2>
        <p>We use minimal local storage to keep your wallet connection and draft articles. No third-party tracking cookies are used.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>5. Third-Party Services</h2>
        <p>We use Sui fullnodes (fullnode.mainnet.sui.io) to read wallet and transaction data. IPFS pinning services may be used for article storage.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>6. Contact</h2>
        <p>For privacy concerns, reach out via the contact form at <a href="/contact" style={{ color: 'var(--primary)' }}>/contact</a>.</p>
      </div>
    </div>
  );
}