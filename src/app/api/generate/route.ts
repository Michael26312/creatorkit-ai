import { OpenAI } from 'openai';
import { NextRequest, NextResponse } from 'next/server';
import { generateContentWithAI } from '@/lib/ai/generate';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    // TODO: Validate user authentication
    // TODO: Check usage limits

    const { contentType, input, projectTitle } = await request.json();

    if (!contentType || !input) {
      return NextResponse.json(
        { error: 'Content type and input are required' },
        { status: 400 }
      );
    }

    if (input.length < 100) {
      return NextResponse.json(
        { error: 'Input must be at least 100 characters' },
        { status: 400 }
      );
    }

    // Generate content using AI
    const generatedContent = await generateContentWithAI(
      input,
      contentType,
      openai
    );

    // TODO: Save to database
    // TODO: Update usage stats

    return NextResponse.json({
      project: {
        id: Date.now().toString(),
        title: projectTitle || `${contentType} - ${new Date().toLocaleDateString()}`,
      },
      generation: {
        id: Math.random().toString(36).substr(2, 9),
        content: generatedContent,
        createdAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error('Generate error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
