import type { Metadata } from 'next';
import './globals.css';
import React from 'react';

export const metadata: Metadata = {
  title: 'The Collision Project Live Feed',
  description: 'A 24/7 live feed showcasing derived Ethereum wallet key pairs and their balances, simulating the search for wallet collisions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
