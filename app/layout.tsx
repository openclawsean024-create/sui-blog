import type { Metadata } from "next";
import "./globals.css";
import { SuiProviders } from "../components/SuiProvider";
import "@mysten/dapp-kit/dist/index.css";

export const metadata: Metadata = {
  title: "Sui Blog — Where Web3 Stories Come to Life",
  description: "A developer-focused blog exploring the Sui blockchain ecosystem. Deep dives into Move language, dApp development, and scalable Web3.",
  openGraph: {
    title: "Sui Blog — Where Web3 Stories Come to Life",
    description: "A secure, open-source blog for the Sui blockchain ecosystem.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><path d='M16 4L6 10l10 6 10-6-10-6z' fill='%236F7DFB'/><path d='M6 22l10 6 10-6' stroke='%2300D4FF' stroke-width='2' stroke-linecap='round'/></svg>" type="image/svg+xml" />
      </head>
      <body>
        <SuiProviders>{children}</SuiProviders>
      </body>
    </html>
  );
}
