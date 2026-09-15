export function FAQ() {
  const faqs = [
    {
      question: 'Do I need to provide a credit card for the free plan?',
      answer: 'No, the free plan is completely free. No credit card required to get started.',
    },
    {
      question: 'Can I change my plan anytime?',
      answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
    },
    {
      question: 'What happens when I run out of generations?',
      answer: 'You can upgrade your plan anytime. When you reach your limit, you can still view your previous content.',
    },
    {
      question: 'Is my content private?',
      answer: 'Yes, your content is completely private by default. You can choose to make specific pieces public if you want to share them.',
    },
    {
      question: 'Can I export my content?',
      answer: 'Yes, all plans include the ability to copy and export your content to use on your platforms.',
    },
    {
      question: 'Do you offer refunds?',
      answer: 'We offer a 7-day money-back guarantee if you\'re not satisfied with your purchase.',
    },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-50">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
        </div>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <details key={index} className="bg-white rounded-lg p-6 cursor-pointer group">
              <summary className="flex justify-between items-center text-lg font-semibold text-gray-900 select-none">
                {faq.question}
                <span className="text-brand-600 group-open:rotate-180 transition-transform">▼</span>
              </summary>
              <p className="mt-4 text-gray-600 leading-relaxed">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
