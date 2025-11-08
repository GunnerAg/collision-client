import React, { useState, useCallback } from 'react';
import { Metrics } from '@/types';

interface IntroSectionProps {
  metrics: Metrics;
  donationAddress: string;
}

const MetricCard: React.FC<{ label: string; value: string | number }> = ({ label, value }) => (
  <div className="bg-gray-800/50 border border-teal-500/30 rounded-lg p-4 text-center backdrop-blur-sm shadow-lg shadow-teal-500/10">
    <p className="text-sm text-teal-400">{label}</p>
    <p className="text-2xl md:text-3xl font-bold text-white break-words">{value}</p>
  </div>
);

const IntroSection: React.FC<IntroSectionProps> = ({ metrics, donationAddress }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(donationAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [donationAddress]);

  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black opacity-80"></div>
      <div className="z-10 text-center w-full max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 text-teal-400" style={{ textShadow: '0 0 10px rgba(45, 212, 191, 0.7)' }}>
          The Collision Project
        </h1>
        <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto mb-8">
          A 24/7 live feed showcasing derived Ethereum wallet key pairs and their balances, in a search for wallet collisions from a known seed.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Wallets Derived" value={metrics.walletsDerived.toLocaleString()} />
          <MetricCard label="Collisions Found" value={metrics.collisions.toLocaleString()} />
          <MetricCard label="Total ETH Found" value={metrics.ethFound.toFixed(6)} />
          <MetricCard label="Time Up" value={metrics.uptime} />
        </div>

        <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm w-full">
          <p className="text-teal-400 hidden sm:block">Donate:</p>
          <span className="text-xs sm:text-sm text-white break-all">{donationAddress}</span>
          <button
            onClick={handleCopy}
            className="bg-teal-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-teal-400 transition-all duration-300 w-full sm:w-auto flex-shrink-0"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
