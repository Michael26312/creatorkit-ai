import { Hero } from '@/components/homepage/hero';
import { HowItWorks } from '@/components/homepage/how-it-works';
import { Features } from '@/components/homepage/features';
import { Pricing } from '@/components/homepage/pricing';
import { FAQ } from '@/components/homepage/faq';
import { CTA } from '@/components/homepage/cta';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Hero />
      <HowItWorks />
      <Features />
      <Pricing />
      <FAQ />
      <CTA />
    </main>
  );
}
