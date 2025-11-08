'use client';

import ContactSection from "@/components/ContactSection";
import FeedSection from "@/components/FeedSection";
import IntroSection from "@/components/IntroSection";
import { useWebSocketFeed } from "@/hooks/useWebSocketFeed";


const DONATION_ADDRESS = '0x3bB805646fcF318a665c61B536E5f5e09524b9E7';

export default function Home() {
  const { metrics, wallets } = useWebSocketFeed();

  return (
    <main className="bg-gray-900 text-gray-200 font-mono w-full">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 -z-10"></div>
      <IntroSection metrics={metrics} donationAddress={DONATION_ADDRESS} />
      <FeedSection wallets={wallets} />
      <ContactSection />
    </main>
  );
}
