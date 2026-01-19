import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { createUser } from '@/lib/userService';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Only admin and officers can create accounts
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'officer')) {
      return NextResponse.json(
        { error: 'Unauthorized - Only admin and officers can create accounts' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { name, email, password, phone, membershipNumber, role } = body;

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

    // Officers cannot create admin or officer accounts
    if (session.user.role === 'officer') {
      if (role && role !== 'member') {
        return NextResponse.json(
          { error: 'Officers can only create member accounts' },
          { status: 403 }
        );
      }
    }

    // Only admin can create admin/officer accounts
    let userRole = 'member';
    if (role && session.user.role === 'admin') {
      if (['admin', 'officer', 'member'].includes(role)) {
        userRole = role;
      }
    }

    const user = await createUser({
      name,
      email,
      password,
      phone: phone || '',
      membershipNumber: membershipNumber || '',
      role: userRole,
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
