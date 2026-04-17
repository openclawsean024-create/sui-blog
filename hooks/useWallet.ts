'use client';
import { useState, useCallback } from 'react';

export type WalletStatus = 'disconnected' | 'connecting' | 'connected' | 'failed';

export interface WalletState {
  status: WalletStatus;
  address: string | null;
  error: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    status: 'disconnected',
    address: null,
    error: null,
  });

  const connect = useCallback(async () => {
    setState({ status: 'connecting', address: null, error: null });

    // Simulate wallet connection with timeout
    await new Promise(res => setTimeout(res, 1500));

    // In production, this would call Sui wallet adapter
    // For demo, randomly succeed (80%) or fail (20%)
    const shouldSucceed = Math.random() > 0.2;

    if (shouldSucceed) {
      const mockAddress = '0x' + Array.from({ length: 40 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      setState({ status: 'connected', address: mockAddress, error: null });
      return { success: true, address: mockAddress };
    } else {
      setState({ status: 'failed', address: null, error: 'Connection failed. Please try again.' });
      // Auto-reset to disconnected after 3s
      setTimeout(() => {
        setState({ status: 'disconnected', address: null, error: null });
      }, 3000);
      return { success: false, error: 'Connection failed. Please try again.' };
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({ status: 'disconnected', address: null, error: null });
  }, []);

  return { ...state, connect, disconnect };
}
