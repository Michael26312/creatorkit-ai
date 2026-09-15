import { OpenAI } from 'openai';

interface ContentGenerationOptions {
  tone?: string;
  brandVoice?: Record<string, any>;
  additionalContext?: string;
}

export async function generateContentWithAI(
  input: string,
  contentType: string,
  openai: OpenAI,
  options?: ContentGenerationOptions
) {
  const systemPrompt = buildSystemPrompt(options?.brandVoice);
  const userPrompt = buildUserPrompt(input, contentType, options);

  try {
    const message = await openai.messages.create({
      model: 'gpt-4-turbo',
      max_tokens: 4096,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userPrompt,
        },
      ],
    });

    const responseText = message.content[0].type === 'text' ? message.content[0].text : '';
    return parseGeneratedContent(responseText, contentType);
  } catch (error) {
    console.error('AI generation error:', error);
    throw new Error('Failed to generate content');
  }
}

function buildSystemPrompt(brandVoice?: Record<string, any>): string {
  let prompt = `You are an expert content repurposing AI. Your role is to create high-quality, engaging content for social media, video, and SEO purposes.

Respond with valid JSON only. Do not include any markdown formatting or explanations outside the JSON.`;

  if (brandVoice) {
    prompt += `\n\nBrand Voice Guidelines:
- Tone: ${brandVoice.tone || 'professional'}
- Preferred Words: ${(brandVoice.preferredWords || []).join(', ') || 'N/A'}
- Words to Avoid: ${(brandVoice.wordsToAvoid || []).join(', ') || 'N/A'}
- Writing Style: ${brandVoice.writingStyle || 'standard'}
- CTA Style: ${brandVoice.ctaStyle || 'standard'}`;
  }

  return prompt;
}

function buildUserPrompt(
  input: string,
  contentType: string,
  options?: ContentGenerationOptions
): string {
  let prompt = `Please create a complete content package from the following ${contentType}:\n\n${input}`;

  prompt += `\n\nGenerate content in this exact JSON format:\n{
  "social": {
    "tikTokScripts": ["script1", "script2", "script3", "script4", "script5"],
    "facebookPosts": ["post1", "post2", "post3", "post4", "post5"],
    "instagramCaptions": ["caption1", "caption2", "caption3", "caption4", "caption5"],
    "xPosts": ["post1", "post2", "post3", "post4", "post5"],
    "linkedInPosts": ["post1", "post2", "post3"]
  },
  "video": {
    "viralHooks": ["hook1", "hook2", "hook3", "hook4", "hook5", "hook6", "hook7", "hook8", "hook9", "hook10"],
    "videoTitles": ["title1", "title2", "title3", "title4", "title5"],
    "shortVideoTitles": ["title1", "title2", "title3", "title4", "title5"],
    "callsToAction": ["cta1", "cta2", "cta3"],
    "thumbnailText": ["text1", "text2", "text3"],
    "youtubeDescription": "A comprehensive description for YouTube",
    "chapters": ["0:00 Introduction", "1:00 Main Point", "5:00 Conclusion"]
  },
  "seo": {
    "primaryKeyword": "main keyword",
    "secondaryKeywords": ["keyword1", "keyword2", "keyword3"],
    "searchIntent": "The search intent of the primary keyword",
    "seoTitle": "SEO optimized title (60 chars)",
    "metaDescription": "Meta description (160 chars)",
    "urlSlug": "url-slug-here",
    "faqs": [{"question": "Q1?", "answer": "A1"}, {"question": "Q2?", "answer": "A2"}],
    "outline": ["Section 1", "Section 2", "Section 3"],
    "blogArticle": "Full blog article content here"
  },
  "growth": {
    "hashtags": ["#hashtag1", "#hashtag2", "#hashtag3"],
    "contentIdeas": ["idea1", "idea2", "idea3"],
    "audiencePainPoints": ["pain1", "pain2", "pain3"],
    "contentAngles": ["angle1", "angle2", "angle3"],
    "competitorStyleIdeas": ["idea1", "idea2", "idea3"]
  }
}`;

  if (options?.additionalContext) {
    prompt += `\n\nAdditional Context: ${options.additionalContext}`;
  }

  return prompt;
}

function parseGeneratedContent(content: string, contentType: string): any {
  try {
    // Extract JSON from response (handle cases where model adds extra text)
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error('Failed to parse generated content:', error);
    // Return a structured default response
    return {
      social: {
        tikTokScripts: [],
        facebookPosts: [],
        instagramCaptions: [],
        xPosts: [],
        linkedInPosts: [],
      },
      video: {
        viralHooks: [],
        videoTitles: [],
        shortVideoTitles: [],
        callsToAction: [],
        thumbnailText: [],
        youtubeDescription: '',
        chapters: [],
      },
      seo: {
        primaryKeyword: '',
        secondaryKeywords: [],
        searchIntent: '',
        seoTitle: '',
        metaDescription: '',
        urlSlug: '',
        faqs: [],
        outline: [],
        blogArticle: '',
      },
      growth: {
        hashtags: [],
        contentIdeas: [],
        audiencePainPoints: [],
        contentAngles: [],
        competitorStyleIdeas: [],
      },
    };
  }
}
