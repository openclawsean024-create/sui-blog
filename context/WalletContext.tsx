import { createContext, useContext, useState, ReactNode } from 'react';
import { useConnectWallet, useCurrentAccount, useDisconnectWallet } from '@mysten/dapp-kit';

interface WalletContextType {
  address: string | null;
  connected: boolean;
  connecting: boolean;
  connect: () => void;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType>({
  address: null,
  connected: false,
  connecting: false,
  connect: () => {},
  disconnect: () => {},
});

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connecting, setConnecting] = useState(false);
  const currentAccount = useCurrentAccount();
  const { mutate: connectWallet } = useConnectWallet();
  const { mutate: disconnectWallet } = useDisconnectWallet();

  const address = currentAccount?.address ?? null;
  const connected = !!currentAccount;

  return (
    <WalletContext.Provider
      value={{
        address,
        connected,
        connecting,
        connect: () => {
          setConnecting(true);
          connectWallet(undefined as any, {
            onSuccess: () => setConnecting(false),
            onError: () => setConnecting(false),
          });
        },
        disconnect: () => disconnectWallet(undefined as any),
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWalletContext = () => useContext(WalletContext);
