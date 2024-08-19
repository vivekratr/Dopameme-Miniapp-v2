import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { SDKProvider } from "@telegram-apps/sdk-react";

import "./index.css";
import { TelegramProvider } from "./providers/TelegramProvider.jsx";
import Web3Provider from "./providers/Web3Provider.jsx";
import "@telegram-apps/telegram-ui/dist/styles.css";
import { DynamicContextProvider } from "@dynamic-labs/sdk-react-core";
import { EthersExtension } from "@dynamic-labs/ethers-v5";
import { ZeroDevSmartWalletConnectors } from "@dynamic-labs/ethereum-aa";
import { EthereumWalletConnectors } from "@dynamic-labs/ethereum";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const evmNetworks = [
  {
    blockExplorerUrls: ["https://sepolia.arbiscan.io/"],
    chainId: 421614,
    chainName: "Arbitrum Sepolia Testnet",
    iconUrls: [
      "https://sepolia.arbiscan.io/assets/arbsepolia/images/svg/logos/chain-light.svg?v=24.8.2.0",
    ],
    name: "Arbitrum Sepolia",
    nativeCurrency: {
      decimals: 18,
      name: "Arbitrum Sepolia Testnet",
      symbol: "ETH",
    },
    networkId: 421614,

    rpcUrls: ["https://sepolia-rollup.arbitrum.io/rpc"],
  },
];

const queryClient = new QueryClient();


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
      <DynamicContextProvider
    settings={{
      environmentId: "ac7b69c8-2497-4f54-991e-673fd47e061c",
      walletConnectorExtensions: [EthersExtension],
      walletConnectors: [
        EthereumWalletConnectors,
        ZeroDevSmartWalletConnectors,
      ],
      overrides: { evmNetworks },
    }}
  >
      <QueryClientProvider client={queryClient}>
    {/* <Web3Provider> */}
        
      <TelegramProvider>
        <App />
      </TelegramProvider>
    {/* </Web3Provider> */}
      </QueryClientProvider>
      </DynamicContextProvider>
  </React.StrictMode>
);
