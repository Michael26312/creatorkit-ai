import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const { email, password, firstName, lastName } = await request.json();

    if (!email || !password || !firstName) {
      return NextResponse.json(
        { error: 'Email, password, and first name are required' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email already in use' },
        { status: 400 }
      );
    }

    // TODO: Hash password before storing
    // TODO: Send verification email
    const user = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        passwordHash: password, // TODO: Hash this properly
        subscription: {
          create: {
            plan: 'free',
            status: 'active',
          },
        },
      },
      include: { subscription: true },
    });

    return NextResponse.json(
      { message: 'Account created. Please verify your email.' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json(
      { error: 'Signup failed' },
      { status: 500 }
    );
  }
}
