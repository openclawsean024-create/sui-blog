import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sui Blog — Web3 Stories on Sui",
  description: "A secure, open-source blog for the Sui blockchain ecosystem. Where Web3 stories come to life.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
