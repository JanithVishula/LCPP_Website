import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { Announcement } from '@/lib/models';
import { ObjectId } from 'mongodb';

// GET /api/announcements - Get announcements (filtered by audience)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    // Filter announcements based on user role and target audience
    const query: any = {
      $and: [
        {
          $or: [
            { targetAudience: 'all' },
            { targetAudience: session.user.role },
          ],
        },
        {
          $or: [
            { expiryDate: { $exists: false } },
            { expiryDate: null },
            { expiryDate: { $gte: new Date() } },
          ],
        },
      ],
    };

    const announcements = await db
      .collection<Announcement>('announcements')
      .find(query)
      .sort({ pinned: -1, createdAt: -1 })
      .toArray();

    return NextResponse.json({ announcements });
  } catch (error) {
    console.error('Error fetching announcements:', error);
    return NextResponse.json(
      { error: 'Failed to fetch announcements' },
      { status: 500 }
    );
  }
}

// POST /api/announcements - Create announcement (admin/officer only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Forbidden - Admin only' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, content, priority, expiryDate, targetAudience, pinned } = body;

    if (!title || !content || !priority || !targetAudience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    const newAnnouncement: Announcement = {
      title,
      content,
      priority,
      expiryDate: expiryDate ? new Date(expiryDate) : undefined,
      targetAudience,
      createdBy: new ObjectId(session.user.id),
      createdByName: session.user.name || '',
      pinned: pinned || false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection<Announcement>('announcements')
      .insertOne(newAnnouncement);

    return NextResponse.json(
      {
        message: 'Announcement created successfully',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating announcement:', error);
    return NextResponse.json(
      { error: 'Failed to create announcement' },
      { status: 500 }
    );
  }
}
