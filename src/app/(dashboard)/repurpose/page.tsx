'use client';

import { useState } from 'react';
import { DashboardHeader } from '@/components/dashboard/header';
import { ContentRepurposer } from '@/components/repurposer/content-repurposer';
import { GeneratedContent } from '@/components/repurposer/generated-content';

export default function RepurposePage() {
  const [generatedContent, setGeneratedContent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="flex-1">
      <DashboardHeader title="AI Content Repurposer" />

      <div className="px-4 md:px-8 py-8">
        {!generatedContent ? (
          <ContentRepurposer
            onGenerate={setGeneratedContent}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        ) : (
          <GeneratedContent
            content={generatedContent}
            onBack={() => setGeneratedContent(null)}
          />
        )}
      </div>
    </div>
  );
}
