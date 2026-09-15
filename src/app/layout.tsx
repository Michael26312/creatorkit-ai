import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { Providers } from '@/components/providers';
import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'CreatorKit AI - Turn 1 Idea Into 30 Pieces of Content',
  description: 'AI-powered content repurposing tool. Paste a transcript or article and get social media posts, video scripts, SEO content, and more in seconds.',
  openGraph: {
    title: 'CreatorKit AI - Content Repurposing Made Easy',
    description: 'Turn your content into 30+ pieces optimized for every platform',
    url: 'https://creatorkit.ai',
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
        <Providers>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
