import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@/lib/userService';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, phone, membershipNumber } = body;

    // Validation
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }

    const user = await createUser({
      name,
      email,
      password,
      phone: phone || '',
      membershipNumber: membershipNumber || '',
      role: 'member',
      joinedDate: new Date(),
      active: true,
    });

    if (!user) {
      return NextResponse.json(
        { error: 'Failed to create user. Email may already exist.' },
        { status: 400 }
      );
    }

    // Don't send password back
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      { message: 'User created successfully', user: userWithoutPassword },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
