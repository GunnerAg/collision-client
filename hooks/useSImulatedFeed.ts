
import { useState, useEffect } from 'react';
import { WalletInfo, Metrics } from '../types';

const generateRandomHex = (length: number) => {
  return '0x' + Array.from({ length }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

const formatUptime = (seconds: number): string => {
  const d = Math.floor(seconds / (3600 * 24));
  const h = Math.floor((seconds % (3600 * 24)) / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${d}d ${h}h ${m}m ${s}s`;
};

export const useSimulatedFeed = () => {
  const [metrics, setMetrics] = useState<Metrics>({
    walletsDerived: 0,
    collisions: 0,
    ethFound: 0,
    uptime: '0d 0h 0m 0s',
  });
  const [wallets, setWallets] = useState<WalletInfo[]>([]);
  const [startTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => {
      // Update metrics
      const uptimeInSeconds = (Date.now() - startTime) / 1000;
      setMetrics(prevMetrics => {
        const shouldFindEth = Math.random() < 0.001; // 0.1% chance to find ETH
        const newEthFound = shouldFindEth ? prevMetrics.ethFound + (Math.random() * 0.1) : prevMetrics.ethFound;
        
        // Create new wallet
        // FIX: Added missing properties coin, path, seedHash, and timestamp to match WalletInfo type.
        const newWallet: WalletInfo = {
          coin: 'ETH',
          path: `m/44'/60'/0'/0/${prevMetrics.walletsDerived}`,
          privateKey: generateRandomHex(64),
          address: generateRandomHex(40),
          balance: shouldFindEth ? (Math.random() * 0.1) : 0,
          seedHash: generateRandomHex(64),
          txHash: shouldFindEth ? generateRandomHex(64) : null,
          timestamp: Date.now(),
        };
        
        // Add new wallet to the list
        setWallets(prevWallets => [newWallet, ...prevWallets.slice(0, 99)]);

        return {
          ...prevMetrics,
          walletsDerived: prevMetrics.walletsDerived + 1,
          ethFound: newEthFound,
          uptime: formatUptime(uptimeInSeconds),
        };
      });
    }, 500); // New wallet every 0.5 seconds

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startTime]);

  return { metrics, wallets };
};
