import '@rainbow-me/rainbowkit/styles.css';
import { useState, type ReactNode } from 'react';
import { RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { WagmiProvider, createConfig } from 'wagmi';
import { base, baseSepolia } from 'wagmi/chains';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import {  http } from 'viem';
import { injected } from 'wagmi/connectors';

// Create config without projectId
const config = createConfig({
  chains: [base, baseSepolia],
  connectors: [
    injected()
  ],
  transports: {
    [base.id]: http(),
    [baseSepolia.id]: http()
  }
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}