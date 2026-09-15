import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-brand-50 via-white to-brand-50 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-1/4 w-96 h-96 bg-brand-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-8 left-1/4 w-96 h-96 bg-brand-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-brand-200 rounded-full px-4 py-2">
          <Sparkles className="w-4 h-4 text-brand-600" />
          <span className="text-sm font-medium text-gray-700">Powered by Advanced AI</span>
        </div>

        {/* Main headline */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
          Turn 1 Idea Into <span className="text-brand-600">30 Pieces</span> of Content
        </h1>

        {/* Subheadline */}
        <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
          Paste a transcript, article, idea, or product description and let AI create your social, video and SEO content in seconds.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link href="/repurpose">
            <Button size="lg" className="w-full sm:w-auto h-14 text-lg font-semibold flex items-center justify-center gap-2 group">
              Start Creating Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
          <Button variant="outline" size="lg" className="w-full sm:w-auto h-14 text-lg font-semibold">
            See How It Works
          </Button>
        </div>

        {/* Trust badges */}
        <div className="text-sm text-gray-600">
          <p className="mb-2">✨ No credit card required • 🚀 Free to start • 💨 Results in seconds</p>
        </div>
      </div>
    </div>
  );
}
