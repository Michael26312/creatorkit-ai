'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CONTENT_TYPES } from '@/lib/constants/content-types';
import { Zap } from 'lucide-react';
import toast from 'react-hot-toast';

interface ContentRepurposerProps {
  onGenerate: (content: any) => void;
  setIsLoading: (loading: boolean) => void;
  isLoading: boolean;
}

export function ContentRepurposer({
  onGenerate,
  setIsLoading,
  isLoading,
}: ContentRepurposerProps) {
  const [contentType, setContentType] = useState('');
  const [input, setInput] = useState('');
  const [projectTitle, setProjectTitle] = useState('');

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contentType || !input.trim()) {
      toast.error('Please select a content type and enter content');
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contentType,
          input,
          projectTitle: projectTitle || `${contentType} - ${new Date().toLocaleDateString()}`,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error);
      }

      const data = await res.json();
      onGenerate(data);
      toast.success('Content generated successfully!');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to generate content';
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Content Repurposer</h1>
      <p className="text-gray-600 mb-8">
        Enter your content and let AI create 30 pieces for you
      </p>

      <form onSubmit={handleGenerate} className="space-y-6">
        {/* Project Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Project Title (Optional)
          </label>
          <input
            type="text"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
            placeholder="My Content Project"
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500"
          />
        </div>

        {/* Content Type */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">
            What type of content do you have?
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {CONTENT_TYPES.map((type) => (
              <button
                key={type.id}
                type="button"
                onClick={() => setContentType(type.id)}
                className={`p-4 rounded-lg border-2 transition-all text-left ${
                  contentType === type.id
                    ? 'border-brand-600 bg-brand-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-2xl mb-2">{type.icon}</div>
                <div className="font-semibold text-gray-900">{type.name}</div>
                <div className="text-sm text-gray-600">{type.description}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Content Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Paste Your Content
          </label>
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste your transcript, article, or idea here..."
            rows={8}
            required
            disabled={isLoading}
          />
          <p className="text-sm text-gray-500 mt-2">
            {input.length} characters • Minimum 100 characters required
          </p>
        </div>

        {/* Generate Button */}
        <Button
          type="submit"
          size="lg"
          disabled={isLoading || input.length < 100}
          className="w-full flex items-center justify-center gap-2"
        >
          <Zap className="w-5 h-5" />
          {isLoading ? 'Generating...' : 'Generate Content'}
        </Button>
      </form>
    </div>
  );
}
