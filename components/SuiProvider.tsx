'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SuiClientProvider, WalletProvider } from '@mysten/dapp-kit';
import { SuiJsonRpcClient } from '@mysten/sui/jsonRpc';
import { useState } from 'react';

const networks = {
  mainnet: new SuiJsonRpcClient({ url: 'https://fullnode.mainnet.sui.io:443', network: 'mainnet' }),
  testnet: new SuiJsonRpcClient({ url: 'https://fullnode.testnet.sui.io:443', network: 'testnet' }),
} as const;

export function SuiProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networks} defaultNetwork="mainnet">
        <WalletProvider autoConnect>
          {children}
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  );
}
