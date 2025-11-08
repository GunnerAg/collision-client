import React from 'react';
import { WalletInfo } from '@/types';

interface FeedSectionProps {
  wallets: WalletInfo[];
}

const WalletRow: React.FC<{ wallet: WalletInfo }> = ({ wallet }) => {
  const isFound = wallet.balance > 0;
  const rowClass = isFound
    ? 'bg-green-500/20 text-green-300'
    : 'bg-gray-800/50 even:bg-gray-800/30';
  
  const truncatedKey = (key: string) => `${key.slice(0, 10)}...${key.slice(-8)}`;

  return (
    <tr className={`${rowClass} transition-all duration-500`}>
      <td className="p-2 text-xs md:text-sm hidden lg:table-cell">{truncatedKey(wallet.privateKey)}</td>
      <td className="p-2 text-xs md:text-sm">{truncatedKey(wallet.address)}</td>
      <td className={`p-2 font-bold text-xs md:text-sm ${isFound ? 'text-green-300' : 'text-gray-400'}`}>{wallet.balance.toFixed(6)}</td>
      <td className="p-2 text-xs md:text-sm hidden sm:table-cell">{wallet.txHash ? truncatedKey(wallet.txHash) : <span className="text-gray-600">null</span>}</td>
    </tr>
  );
};

const FeedSection: React.FC<FeedSectionProps> = ({ wallets }) => {
  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-4 relative">
      <div className="z-10 w-full h-full max-w-7xl mx-auto flex flex-col">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-teal-400" style={{ textShadow: '0 0 8px rgba(45, 212, 191, 0.5)' }}>
          Live Derivation Feed
        </h2>
        <div className="flex-grow bg-black/30 border border-teal-500/30 rounded-lg shadow-2xl shadow-teal-500/10 overflow-hidden backdrop-blur-sm">
          <div className="overflow-y-auto h-full">
            <table className="w-full text-left">
              <thead className="sticky top-0 bg-gray-900/80 backdrop-blur-md">
                <tr>
                  <th className="p-2 text-sm font-semibold text-teal-400 hidden lg:table-cell">Private Key</th>
                  <th className="p-2 text-sm font-semibold text-teal-400">Address</th>
                  <th className="p-2 text-sm font-semibold text-teal-400">Balance (ETH)</th>
                  <th className="p-2 text-sm font-semibold text-teal-400 hidden sm:table-cell">Rescue TX Hash</th>
                </tr>
              </thead>
              <tbody>
                {wallets.map((wallet) => (
                  <WalletRow key={wallet.address} wallet={wallet} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeedSection;
