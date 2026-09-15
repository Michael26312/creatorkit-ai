export function Features() {
  const features = [
    {
      title: 'Social Media Content',
      description: 'Generate TikTok, Instagram, Facebook, X, and LinkedIn content',
      items: ['5 TikTok/Reels scripts', '5 Instagram captions', '5 Facebook posts', '5 X posts', '3 LinkedIn posts'],
    },
    {
      title: 'Video Content',
      description: 'Create everything you need for video success',
      items: ['10 viral hooks', '5 video titles', '5 short-video titles', '3 CTAs', 'Thumbnail ideas'],
    },
    {
      title: 'SEO Content',
      description: 'Full SEO optimization and blog articles',
      items: ['Primary keyword', 'Meta description', 'SEO title', 'FAQ questions', 'Full blog article'],
    },
    {
      title: 'Growth Tools',
      description: 'Additional tools for content strategy',
      items: ['Hashtag generator', '30-day calendar', 'Audience insights', 'Content angles', 'Competitor ideas'],
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">What You Get</h2>
          <p className="text-xl text-gray-600">Complete content packages in seconds</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 mb-6">{feature.description}</p>
              <ul className="space-y-3">
                {feature.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-center gap-3 text-gray-700">
                    <span className="text-brand-600 font-bold">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
