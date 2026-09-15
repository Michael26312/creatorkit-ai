import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');

    const pages = await prisma.seoPage.findMany({
      where: {
        isPublished: true,
        ...(category && { category }),
      },
      select: {
        slug: true,
        title: true,
        category: true,
        viewCount: true,
      },
      orderBy: { viewCount: 'desc' },
      take: 50,
    });

    return NextResponse.json(pages, { status: 200 });
  } catch (error) {
    console.error('SEO pages list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
