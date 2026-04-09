import type { Metadata } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sui Blog — Web3 Stories on Sui",
  description: "A secure, open-source blog for the Sui blockchain ecosystem. Where Web3 stories come to life.",
  keywords: ["Sui", "Sui blockchain", "Move language", "Web3", "dApp", "Sui ecosystem"],
  openGraph: {
    title: "Sui Blog — Web3 Stories on Sui",
    description: "A secure, open-source blog for the Sui blockchain ecosystem.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      </head>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
