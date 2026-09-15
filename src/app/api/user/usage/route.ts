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

    const planLimits: Record<string, number> = {
      free: 5,
      creator: 50,
      pro: 200,
      agency: 1000,
    };

    const limit = planLimits[subscription?.plan || 'free'];
    const used = usage?.generationsUsed || 0;

    return NextResponse.json(
      {
        plan: subscription?.plan || 'free',
        generationsUsed: used,
        monthlyLimit: limit,
        remaining: limit - used,
        percentageUsed: Math.round((used / limit) * 100),
        currentPeriodEnd: subscription?.currentPeriodEnd,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Usage fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
