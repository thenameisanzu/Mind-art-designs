import type { Metadata } from 'next';
import CursorFollower from '@/components/CursorFollower';
import SmoothScroll from '@/components/SmoothScroll';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mindart Designs | Contemporary Architecture & Design Studio',
  description: 'Mindart Designs is a premium contemporary architecture studio specializing in custom luxury villas, cultural spaces, bespoke interior curation, and ecological landscape masterplans.',
  keywords: ['Architecture', 'Interior Design', 'Brutalist Villa', 'Zurich Architect', 'Bespoke Design', 'Luxury Estates', 'Mindart'],
  authors: [{ name: 'Mindart Designs' }],
  creator: 'Mindart Designs',
  metadataBase: new URL('https://mindartdesigns.com'),
  openGraph: {
    title: 'Mindart Designs | Contemporary Architecture & Design Studio',
    description: 'Bespoke architectural designs that fuse conceptual art with spatial functionality.',
    url: 'https://mindartdesigns.com',
    siteName: 'Mindart Designs',
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <CursorFollower />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
