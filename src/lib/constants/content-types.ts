export interface ContentType {
  id: string;
  name: string;
  description: string;
  icon: string;
  examples: string[];
}

export const CONTENT_TYPES: ContentType[] = [
  {
    id: 'youtube-transcript',
    name: 'YouTube Transcript',
    description: 'Paste a YouTube transcript or video description',
    icon: '▶️',
    examples: ['Product demo', 'Tutorial', 'Webinar'],
  },
  {
    id: 'podcast-transcript',
    name: 'Podcast Transcript',
    description: 'Convert podcast episodes into social content',
    icon: '🎙️',
    examples: ['Interview', 'Solo episode', 'Discussion'],
  },
  {
    id: 'blog-article',
    name: 'Blog Article',
    description: 'Repurpose blog posts into multiple formats',
    icon: '📝',
    examples: ['How-to guide', 'Case study', 'News post'],
  },
  {
    id: 'social-post',
    name: 'Social Media Post',
    description: 'Expand a single post into a content series',
    icon: '📱',
    examples: ['Twitter thread', 'LinkedIn post', 'Instagram caption'],
  },
  {
    id: 'product-description',
    name: 'Product Description',
    description: 'Create marketing content from product info',
    icon: '📦',
    examples: ['Features', 'Benefits', 'Use cases'],
  },
  {
    id: 'idea-topic',
    name: 'Idea or Topic',
    description: 'Generate content from a topic or idea',
    icon: '💡',
    examples: ['Trend', 'Question', 'Concept'],
  },
];

export function getContentType(id: string): ContentType | undefined {
  return CONTENT_TYPES.find((t) => t.id === id);
}
