import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export function CTA() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-brand-600 to-brand-700 text-white">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Create Amazing Content?</h2>
        <p className="text-xl text-brand-100 mb-8">
          Join thousands of creators using CreatorKit AI to save hours on content creation.
        </p>
        <Link href="/repurpose">
          <Button
            size="lg"
            className="bg-white text-brand-600 hover:bg-brand-50 h-14 text-lg font-semibold flex items-center justify-center gap-2 group"
          >
            Start Creating Now
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </section>
  );
}
