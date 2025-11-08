"use client";

import ContactSection from "@/components/ContactSection";
import FeedSection from "@/components/FeedSection";
import IntroSection from "@/components/IntroSection";
import { useWebSocketFeed } from "@/hooks/useWebSocketFeed";

const DONATION_ADDRESS = process.env.NEXT_PUBLIC_DONATION_ADDRESS || "ADDRESS_NOT_SET";
const SOURCE_CODE_URL = process.env.NEXT_PUBLIC_SOURCE_CODE_URL || "#";
const GITHUB_URL = process.env.NEXT_PUBLIC_GITHUB_URL || "#";
const LINKEDIN_URL = process.env.NEXT_PUBLIC_LINKEDIN_URL || "#";
const WEBSITE_URL = process.env.NEXT_PUBLIC_WEBSITE_URL || "#";

export default function Home() {
  const { metrics, wallets } = useWebSocketFeed();

  return (
    <main className="bg-gray-900 text-gray-200 font-mono w-full">
      <div className="fixed inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5 -z-10"></div>

      <IntroSection metrics={metrics} donationAddress={DONATION_ADDRESS} />

      <FeedSection wallets={wallets} />

      <ContactSection
        sourceCodeUrl={SOURCE_CODE_URL}
        githubUrl={GITHUB_URL}
        linkedinUrl={LINKEDIN_URL}
        websiteUrl={WEBSITE_URL}
      />
    </main>
  );
}
