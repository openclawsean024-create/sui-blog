'use client';

import { SuiClientProvider, WalletProvider as DappKitWalletProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createContext, useContext, useState, ReactNode } from 'react';
import type { ReactNode as RN } from 'react';

const queryClient = new QueryClient();

export default function Providers({ children }: { children: RN }) {
  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider
        networks={{
          mainnet: { url: 'https://fullnode.mainnet.sui.io:443' },
          testnet: { url: 'https://fullnode.testnet.sui.io:443' },
          devnet: { url: 'https://fullnode.devnet.sui.io:443' },
        }}
        network="mainnet"
      >
        <DappKitWalletProvider autoConnect>
          {children}
        </DappKitWalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
