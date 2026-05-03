import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service — Sui Blog',
  description: 'Sui Blog terms of service and usage guidelines.',
};

export default function TermsPage() {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '120px 24px 80px', color: 'var(--text-primary)' }}>
      <h1 style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '2.5rem', marginBottom: '2rem', color: 'var(--text-primary)' }}>
        Terms of Service
      </h1>
      <div style={{ lineHeight: '1.8', fontSize: '1rem', color: 'var(--text-muted)' }}>
        <p>Last updated: May 2026</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>1. Acceptance of Terms</h2>
        <p>By connecting your wallet and publishing content on Sui Blog, you agree to these terms. If you do not agree, do not use this platform.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>2. Content Ownership</h2>
        <p>You retain full ownership of content you publish. Sui Blog does not claim any intellectual property rights over your articles. Content published to the blockchain is permanent and cannot be removed by the platform.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>3. Acceptable Use</h2>
        <p>You may not publish illegal, defamatory, or malicious content. Authors are solely responsible for the accuracy and legality of their published articles.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>4. Tip and Payment</h2>
        <p>SUI tips are real on-chain transactions. Once sent, they cannot be reversed or refunded by the platform. The platform does not take any commission on tips.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>5. Paywall</h2>
        <p>Authors may set a paywall amount (in SUI) to unlock full article content. The platform does not guarantee payment collection — ensure your wallet supports SUI tokens before setting a paywall.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>6. Disclaimers</h2>
        <p>Sui Blog is provided "as is" without warranties. We do not guarantee uptime, data persistence, or the functionality of third-party IPFS storage.</p>
        <h2 style={{ color: 'var(--text-primary)', marginTop: '2rem' }}>7. Contact</h2>
        <p>Questions? Contact us at <a href="/contact" style={{ color: 'var(--primary)' }}>/contact</a>.</p>
      </div>
    </div>
  );
}