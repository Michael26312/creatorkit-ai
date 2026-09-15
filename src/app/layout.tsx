import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/components/providers';

export const metadata: Metadata = {
  title: 'CreatorKit AI - Turn 1 Idea Into 30 Pieces of Content',
  description: 'AI-powered content repurposing platform. Generate social media content, video scripts, and SEO articles in seconds.',
  keywords: 'AI content generator, social media content, YouTube, TikTok, content repurposing',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://creatorkit.ai',
    siteName: 'CreatorKit AI',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@CreatorKitAI',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
        <meta name="theme-color" content="#8b5cf6" />
      </head>
      <body className="font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
