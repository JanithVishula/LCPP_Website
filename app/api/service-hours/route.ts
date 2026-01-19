import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ServiceHour } from '@/lib/models';
import { ObjectId } from 'mongodb';

// GET /api/service-hours - Get service hours (filtered by role)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const userId = searchParams.get('userId');

    const client = await clientPromise;
    const db = client.db('leo_club');

    let query: any = {};

    // Regular members can only see their own hours
    if (session.user.role === 'member') {
      query.userId = new ObjectId(session.user.id);
    } else if (userId) {
      // Admin/officers can filter by user
      query.userId = new ObjectId(userId);
    }

    if (status) {
      query.status = status;
    }

    const hours = await db
      .collection<ServiceHour>('service_hours')
      .find(query)
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json({ hours });
  } catch (error) {
    console.error('Error fetching service hours:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service hours' },
      { status: 500 }
    );
  }
}

// POST /api/service-hours - Submit service hours
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { projectId, projectName, date, hours, description } = body;

    if (!projectName || !date || !hours || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (hours <= 0 || hours > 24) {
      return NextResponse.json(
        { error: 'Hours must be between 0 and 24' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    const newServiceHour: ServiceHour = {
      userId: new ObjectId(session.user.id),
      userName: session.user.name || '',
      projectId: projectId ? new ObjectId(projectId) : undefined,
      projectName,
      date: new Date(date),
      hours,
      description,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection<ServiceHour>('service_hours')
      .insertOne(newServiceHour);

    return NextResponse.json(
      {
        message: 'Service hours submitted successfully',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting service hours:', error);
    return NextResponse.json(
      { error: 'Failed to submit service hours' },
      { status: 500 }
    );
  }
}
