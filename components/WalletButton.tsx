'use client';

import { useWalletContext } from '@/context/WalletContext';
import { Wallet, LogOut, Loader2 } from 'lucide-react';

function truncateAddress(addr: string) {
  return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
}

export default function WalletButton() {
  const { address, connected, connecting, connect, disconnect } = useWalletContext();

  if (connecting) {
    return (
      <button className="wallet-btn wallet-btn-connecting">
        <Loader2 size={14} className="spin" /> Connecting...
      </button>
    );
  }

  if (connected && address) {
    return (
      <button className="wallet-btn wallet-btn-connected" onClick={disconnect} title={address}>
        <Wallet size={14} />
        {truncateAddress(address)}
        <LogOut size={12} />
      </button>
    );
  }

  return (
    <button className="wallet-btn wallet-btn-connect" onClick={connect}>
      <Wallet size={14} />
      Connect Wallet
    </button>
  );
}
