'use client';

import { useState } from 'react';
import { Tab } from '@headlessui/react';
import { ContentDisplay } from './content-display';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface GeneratedContentViewerProps {
  data: {
    project?: {
      id: string;
      title: string;
    };
    generation?: {
      content: {
        social?: {
          tikTokScripts?: string[];
          facebookPosts?: string[];
          instagramCaptions?: string[];
          xPosts?: string[];
          linkedInPosts?: string[];
        };
        video?: {
          viralHooks?: string[];
          videoTitles?: string[];
          shortVideoTitles?: string[];
          callsToAction?: string[];
          thumbnailText?: string[];
          youtubeDescription?: string;
          chapters?: string[];
        };
        seo?: {
          primaryKeyword?: string;
          secondaryKeywords?: string[];
          searchIntent?: string;
          seoTitle?: string;
          metaDescription?: string;
          urlSlug?: string;
          faqs?: Array<{ question: string; answer: string }>;
          outline?: string[];
          blogArticle?: string;
        };
        growth?: {
          hashtags?: string[];
          contentIdeas?: string[];
          audiencePainPoints?: string[];
          contentAngles?: string[];
          competitorStyleIdeas?: string[];
        };
      };
    };
  };
}

export function GeneratedContentViewer({ data }: GeneratedContentViewerProps) {
  const content = data?.generation?.content || {};
  const project = data?.project;

  return (
    <div className="max-w-6xl mx-auto">
      <Link href="/dashboard">
        <Button variant="ghost" size="sm" className="mb-6 flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">{project?.title}</h1>
        <p className="text-gray-600">Your AI-generated content package</p>
      </div>

      <Tab.Group>
        <Tab.List className="flex gap-2 border-b border-gray-200 mb-8 overflow-x-auto">
          {[
            { label: 'Social Media', id: 'social' },
            { label: 'Video', id: 'video' },
            { label: 'SEO', id: 'seo' },
            { label: 'Growth', id: 'growth' },
          ].map((tab) => (
            <Tab
              key={tab.id}
              className={({ selected }) =>
                `px-4 py-3 font-medium border-b-2 transition-colors ${
                  selected
                    ? 'border-brand-600 text-brand-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`
              }
            >
              {tab.label}
            </Tab>
          ))}
        </Tab.List>

        <Tab.Panels>
          {/* Social Media */}
          <Tab.Panel className="space-y-6">
            {content.social?.tikTokScripts && (
              <ContentDisplay
                title="TikTok/Reels Scripts"
                items={content.social.tikTokScripts}
                category="Social"
              />
            )}
            {content.social?.instagramCaptions && (
              <ContentDisplay
                title="Instagram Captions"
                items={content.social.instagramCaptions}
                category="Social"
              />
            )}
            {content.social?.facebookPosts && (
              <ContentDisplay
                title="Facebook Posts"
                items={content.social.facebookPosts}
                category="Social"
              />
            )}
            {content.social?.xPosts && (
              <ContentDisplay
                title="X (Twitter) Posts"
                items={content.social.xPosts}
                category="Social"
              />
            )}
            {content.social?.linkedInPosts && (
              <ContentDisplay
                title="LinkedIn Posts"
                items={content.social.linkedInPosts}
                category="Social"
              />
            )}
          </Tab.Panel>

          {/* Video */}
          <Tab.Panel className="space-y-6">
            {content.video?.viralHooks && (
              <ContentDisplay
                title="Viral Hooks"
                items={content.video.viralHooks}
                category="Video"
              />
            )}
            {content.video?.videoTitles && (
              <ContentDisplay
                title="Video Titles"
                items={content.video.videoTitles}
                category="Video"
              />
            )}
            {content.video?.shortVideoTitles && (
              <ContentDisplay
                title="Short Video Titles"
                items={content.video.shortVideoTitles}
                category="Video"
              />
            )}
            {content.video?.callsToAction && (
              <ContentDisplay
                title="Calls to Action"
                items={content.video.callsToAction}
                category="Video"
              />
            )}
            {content.video?.thumbnailText && (
              <ContentDisplay
                title="Thumbnail Text Ideas"
                items={content.video.thumbnailText}
                category="Video"
              />
            )}
            {content.video?.youtubeDescription && (
              <ContentDisplay
                title="YouTube Description"
                items={[content.video.youtubeDescription]}
                category="Video"
              />
            )}
          </Tab.Panel>

          {/* SEO */}
          <Tab.Panel className="space-y-6">
            {content.seo?.seoTitle && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">SEO Title</h3>
                <p className="text-gray-900 mb-2">{content.seo.seoTitle}</p>
                <p className="text-sm text-gray-500">{content.seo.seoTitle.length} characters</p>
              </div>
            )}
            {content.seo?.metaDescription && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Meta Description</h3>
                <p className="text-gray-900 mb-2">{content.seo.metaDescription}</p>
                <p className="text-sm text-gray-500">{content.seo.metaDescription.length} characters</p>
              </div>
            )}
            {content.seo?.faqs && content.seo.faqs.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">FAQs</h3>
                <div className="space-y-4">
                  {content.seo.faqs.map((faq, i) => (
                    <div key={i} className="border-t border-gray-200 pt-4 first:border-t-0 first:pt-0">
                      <p className="font-medium text-gray-900 mb-2">{faq.question}</p>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {content.seo?.blogArticle && (
              <div className="bg-white rounded-lg border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Blog Article</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 whitespace-pre-wrap">{content.seo.blogArticle}</p>
                </div>
              </div>
            )}
          </Tab.Panel>

          {/* Growth */}
          <Tab.Panel className="space-y-6">
            {content.growth?.hashtags && (
              <ContentDisplay
                title="Hashtags"
                items={content.growth.hashtags}
                category="Growth"
              />
            )}
            {content.growth?.contentIdeas && (
              <ContentDisplay
                title="Content Ideas"
                items={content.growth.contentIdeas}
                category="Growth"
              />
            )}
            {content.growth?.audiencePainPoints && (
              <ContentDisplay
                title="Audience Pain Points"
                items={content.growth.audiencePainPoints}
                category="Growth"
              />
            )}
            {content.growth?.contentAngles && (
              <ContentDisplay
                title="Content Angles"
                items={content.growth.contentAngles}
                category="Growth"
              />
            )}
            {content.growth?.competitorStyleIdeas && (
              <ContentDisplay
                title="Competitor Analysis Ideas"
                items={content.growth.competitorStyleIdeas}
                category="Growth"
              />
            )}
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}
