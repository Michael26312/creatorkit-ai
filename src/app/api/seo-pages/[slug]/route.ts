import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest, { params }: { params: { slug: string } }) {
  try {
    const page = await prisma.seoPage.findUnique({
      where: { slug: params.slug },
    });

    if (!page) {
      return NextResponse.json(
        { error: 'Page not found' },
        { status: 404 }
      );
    }

    // Increment view count
    await prisma.seoPage.update({
      where: { id: page.id },
      data: { viewCount: { increment: 1 } },
    });

    return NextResponse.json(page, { status: 200 });
  } catch (error) {
    console.error('SEO page fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
