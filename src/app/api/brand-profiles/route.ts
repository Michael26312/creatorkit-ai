import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const profiles = await prisma.brandProfile.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(profiles, { status: 200 });
  } catch (error) {
    console.error('Brand profiles fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

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

    const data = await req.json();

    const profile = await prisma.brandProfile.create({
      data: {
        userId: user.id,
        name: data.name,
        description: data.description,
        targetAudience: data.targetAudience,
        industry: data.industry,
        tone: data.tone,
        preferredWords: data.preferredWords || [],
        wordsToAvoid: data.wordsToAvoid || [],
        ctaStyle: data.ctaStyle,
        writingStyle: data.writingStyle,
        isDefault: data.isDefault || false,
      },
    });

    return NextResponse.json(profile, { status: 201 });
  } catch (error) {
    console.error('Brand profile creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
