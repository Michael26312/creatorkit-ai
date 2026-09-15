import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Validate user authentication
    // TODO: Fetch usage stats from database

    return NextResponse.json({
      plan: 'free',
      generationsUsed: 0,
      monthlyLimit: 5,
      remaining: 5,
      percentageUsed: 0,
    });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch usage stats' },
      { status: 500 }
    );
  }
}
