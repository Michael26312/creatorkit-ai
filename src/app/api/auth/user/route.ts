import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // TODO: Validate session/JWT token
    // TODO: Fetch user from database

    return NextResponse.json(
      { error: 'Not authenticated' },
      { status: 401 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
