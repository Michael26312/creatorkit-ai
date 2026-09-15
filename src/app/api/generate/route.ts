import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { OpenAI } from 'openai';
import { prisma } from '@/lib/prisma';
import { generateContentWithAI } from '@/lib/ai/generate';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { input, contentType, projectTitle, brandProfileId } = await req.json();

    if (!input || !contentType) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Check user plan and limits
    const userSubscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    const usage = await prisma.usage.findUnique({
      where: { userId: user.id },
    });

    const planLimits: Record<string, number> = {
      free: 5,
      creator: 50,
      pro: 200,
      agency: 1000,
    };

    const limit = planLimits[userSubscription?.plan || 'free'];

    if ((usage?.generationsUsed || 0) >= limit) {
      return NextResponse.json(
        { error: 'Monthly generation limit reached' },
        { status: 429 }
      );
    }

    // Create project
    const project = await prisma.project.create({
      data: {
        userId: user.id,
        title: projectTitle || `${contentType} - ${new Date().toLocaleDateString()}`,
        contentType,
        originalInput: input,
        brandProfileId: brandProfileId || undefined,
      },
    });

    // Generate content with AI
    const generatedContent = await generateContentWithAI(
      input,
      contentType,
      openai
    );

    // Create generations record
    const generation = await prisma.generation.create({
      data: {
        projectId: project.id,
        userId: user.id,
        generationType: 'full_package',
        content: generatedContent,
        aiModel: 'gpt-4-turbo',
      },
    });

    // Update usage
    const currentMonth = new Date();
    currentMonth.setDate(1);

    await prisma.usage.update({
      where: { userId: user.id },
      data: {
        generationsUsed: { increment: 1 },
        currentMonth,
      },
    });

    return NextResponse.json(
      {
        project,
        generation,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Generation error:', error);
    return NextResponse.json(
      { error: 'Failed to generate content' },
      { status: 500 }
    );
  }
}
