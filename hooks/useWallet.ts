'use client';
import { useCurrentAccount, useCurrentWallet, useDisconnectWallet, useConnectWallet } from '@mysten/dapp-kit';
import { useState, useCallback } from 'react';

export type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'failed';

// Re-export the types from dapp-kit for convenience
export type { WalletStatus as WalletKitStatus };

export interface WalletState {
  status: WalletStatus;
  address: string | null;
  error: string | null;
}

// Thin wrapper that maps @mysten/dapp-kit hooks to the existing WalletState interface
export function useWallet() {
  const { connectionStatus, currentWallet } = useCurrentWallet();
  const { mutateAsync: connect } = useConnectWallet();
  const { mutateAsync: disconnect } = useDisconnectWallet();
  const currentAccount = useCurrentAccount();
  const [connectError, setConnectError] = useState<string | null>(null);

  // Map dapp-kit connection status to our WalletStatus
  let status: WalletStatus = 'disconnected';
  if (connectionStatus === 'connecting') {
    status = 'connecting';
  } else if (connectionStatus === 'connected' && currentAccount) {
    status = 'connected';
  } else if (connectionStatus === 'disconnected') {
    status = 'disconnected';
  }

  const address = currentAccount?.address ?? null;

  const handleConnect = useCallback(async () => {
    setConnectError(null);
    if (!currentWallet) {
      setConnectError('No wallet detected. Please install Petra, Martian, or Sui Wallet extension.');
      return { success: false, error: 'No wallet detected.' };
    }
    try {
      await connect({ wallet: currentWallet });
      return { success: true, address };
    } catch (err: any) {
      const msg = err?.message || 'Connection failed. Please try again.';
      setConnectError(msg);
      return { success: false, error: msg };
    }
  }, [currentWallet, connect, address]);

  const handleDisconnect = useCallback(() => {
    disconnect();
    setConnectError(null);
  }, [disconnect]);

  return {
    status,
    address,
    error: connectError,
    connect: handleConnect,
    disconnect: handleDisconnect,
  };
}
