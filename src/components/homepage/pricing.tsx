import { Button } from '@/components/ui/button';
import { DEFAULT_PRICING } from '@/lib/pricing';

export function Pricing() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Simple, Transparent Pricing</h2>
          <p className="text-xl text-gray-600">Pay for what you use. Cancel anytime.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {DEFAULT_PRICING.map((tier) => (
            <div
              key={tier.id}
              className={`rounded-lg overflow-hidden transition-all ${
                tier.highlighted
                  ? 'ring-2 ring-brand-600 shadow-lg scale-105'
                  : 'border border-gray-200'
              } bg-white`}
            >
              {tier.highlighted && (
                <div className="bg-brand-600 text-white py-2 px-4 text-center text-sm font-bold">
                  MOST POPULAR
                </div>
              )}

              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{tier.name}</h3>
                <p className="text-gray-600 mb-6 text-sm">{tier.description}</p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-gray-900">${tier.price}</span>
                  <span className="text-gray-600 ml-2">/month</span>
                </div>

                <Button
                  className="w-full mb-8"
                  variant={tier.highlighted ? 'default' : 'outline'}
                >
                  {tier.price === 0 ? 'Get Started' : 'Start Free Trial'}
                </Button>

                <div className="space-y-4">
                  {tier.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <span className="text-brand-600 font-bold mt-1">✓</span>
                      <span className="text-gray-700 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
