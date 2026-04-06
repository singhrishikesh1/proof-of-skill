import { http, createConfig } from 'wagmi';
import { polygon, polygonAmoy, mainnet, sepolia } from 'wagmi/chains';
import { injected, walletConnect } from 'wagmi/connectors';

const projectId = 'skillchain-demo'; // Replace with real WalletConnect project ID

export const config = createConfig({
  chains: [polygon, polygonAmoy, mainnet, sepolia],
  connectors: [
    injected(),
  ],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
