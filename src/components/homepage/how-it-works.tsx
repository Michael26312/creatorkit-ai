export function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Paste Your Content',
      description: 'Upload a transcript, article, or idea to get started',
      icon: '📋',
    },
    {
      number: '2',
      title: 'AI Analyzes',
      description: 'Our advanced AI understands the key themes and concepts',
      icon: '🤖',
    },
    {
      number: '3',
      title: 'Get 30 Pieces',
      description: 'Instant social posts, hooks, titles, descriptions, and more',
      icon: '✨',
    },
    {
      number: '4',
      title: 'Copy & Share',
      description: 'One-click copy to clipboard or export for your platforms',
      icon: '📱',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-xl text-gray-600">Four simple steps to create amazing content</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 -right-4 text-brand-300 text-3xl">
                  →
                </div>
              )}

              <div className="bg-brand-50 rounded-lg p-8 h-full">
                <div className="text-4xl mb-4">{step.icon}</div>
                <div className="inline-block bg-brand-600 text-white text-lg font-bold w-10 h-10 rounded-full flex items-center justify-center mb-4">
                  {step.number}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
