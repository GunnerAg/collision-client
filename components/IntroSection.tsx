import React, { useState, useCallback } from "react";
import { Metrics } from "@/types";

interface IntroSectionProps {
  metrics: Metrics;
  donationAddress: string;
}

const MetricCard: React.FC<{ label: string; value: string | number }> = ({
  label,
  value,
}) => (
  <div className="bg-gray-800/50 border border-teal-500/30 rounded-lg p-2 text-center backdrop-blur-sm shadow-lg shadow-teal-500/10">
    {/* CAMBIO: text-xs para la etiqueta en móvil */}
    <p className="text-xs text-teal-400">{label}</p>
    {/* CAMBIO: text-lg para el valor numérico en móvil (base) */}
    <p className="text-lg sm:text-2xl md:text-3xl font-bold text-white break-words">
      {value}
    </p>
  </div>
);

const IntroSection: React.FC<IntroSectionProps> = ({
  metrics,
  donationAddress,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(donationAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [donationAddress]);

  return (
    <section className="h-screen w-full snap-start flex flex-col items-center justify-center px-4 py-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900 to-black opacity-80"></div>
      <div className="z-10 text-center w-full max-w-4xl mx-auto px-4 flex flex-col flex-grow items-center justify-center gap-y-6 max-h-full">
        <h1
          className="text-3xl sm:text-4xl md:text-6xl font-bold mb-0 text-teal-400"
          style={{ textShadow: "0 0 10px rgba(45, 212, 191, 0.7)" }}
        >
          The Collision Project
        </h1>
        <p className="text-xs sm:text-sm md:text-base leading-snug text-gray-300 max-w-2xl mx-auto mb-0">
          This project is an <b>empirical demonstration</b> of Ethereum
          cryptographic security. Our server continuously derives and validates
          billions of key pairs, simulating a brute-force search for a wallet
          collision—an event <b>mathematically near impossible</b>.
          <b>Ethical Protocol:</b> This is a{" "}
          <b>no-theft educational initiative</b>. Should a collision occur, the
          original seed phrase is stored, and its{" "}
          <b>SHA-256 hash is immediately published</b> below. This public hash
          allows the legitimate owner to prove ownership and reclaim their
          assets by contacting us with the matching seed phrase.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
          <MetricCard
            label="Wallets Derived"
            value={metrics.walletsDerived.toLocaleString()}
          />
          <MetricCard
            label="Collisions Found"
            value={metrics.collisions.toLocaleString()}
          />
          <MetricCard
            label="Total ETH Found"
            value={metrics.ethFound.toFixed(6)}
          />
          <MetricCard label="Time Up" value={metrics.uptime} />
        </div>
        <div className="bg-gray-800/70 border border-gray-700 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-sm w-full">
          <p className="text-teal-400 hidden sm:block">Donate:</p>
          <span className="text-xs sm:text-sm text-white break-all">
            {donationAddress}
          </span>
          <button
            onClick={handleCopy}
            className="bg-teal-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-teal-400 transition-all duration-300 w-full sm:w-auto flex-shrink-0"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default IntroSection;
