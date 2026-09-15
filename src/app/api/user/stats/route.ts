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

    const usage = await prisma.usage.findUnique({
      where: { userId: user.id },
    });

    const subscription = await prisma.subscription.findUnique({
      where: { userId: user.id },
    });

    const projectCount = await prisma.project.count({
      where: { userId: user.id },
    });

    const planLimits: Record<string, number> = {
      free: 5,
      creator: 50,
      pro: 200,
      agency: 1000,
    };

    return NextResponse.json(
      {
        generationsUsed: usage?.generationsUsed || 0,
        projectsCreated: projectCount,
        monthlyLimit: planLimits[subscription?.plan || 'free'],
        plan: subscription?.plan || 'free',
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Stats fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
