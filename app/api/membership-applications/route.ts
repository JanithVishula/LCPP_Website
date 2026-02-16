import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

// Phone must be +94 followed by exactly 7 digits (local part)
const PHONE_REGEX = /^\+94\d{7}$/;

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      fullName,
      email,
      phone,
      dateOfBirth,
      address,
      schoolOrUniversity,
      gradeOrYear,
      motivation,
      experience,
    } = body;

    if (!fullName || !email || !phone || !dateOfBirth || !address || !motivation) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    if (!PHONE_REGEX.test(phone)) {
      return NextResponse.json(
        { error: 'Phone number must start with +94 and be followed by 7 digits' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    const application = {
      fullName,
      email: email.toLowerCase(),
      phone,
      dateOfBirth: new Date(dateOfBirth),
      address,
      schoolOrUniversity: schoolOrUniversity || '',
      gradeOrYear: gradeOrYear || '',
      motivation,
      experience: experience || '',
      status: 'pending',
      createdAt: new Date(),
    };

    const result = await db.collection('membership_applications').insertOne(application);

    return NextResponse.json({
      message: 'Application submitted successfully',
      id: result.insertedId,
    });
  } catch (error) {
    console.error('Error creating membership application:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Only admins and officers can view applications
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'officer')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    const applications = await db
      .collection('membership_applications')
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ applications });
  } catch (error) {
    console.error('Error fetching membership applications:', error);
    return NextResponse.json({ error: 'Failed to fetch applications' }, { status: 500 });
  }
}
