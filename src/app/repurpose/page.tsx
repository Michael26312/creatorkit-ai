'use client';

import { useState } from 'react';
import { ContentRepurposer } from '@/components/repurposer/content-repurposer';
import { GeneratedContentViewer } from '@/components/dashboard/generated-content-viewer';

export default function RepurposePage() {
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  if (generatedContent) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <GeneratedContentViewer data={generatedContent} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <ContentRepurposer
          onGenerate={setGeneratedContent}
          setIsLoading={setIsLoading}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
