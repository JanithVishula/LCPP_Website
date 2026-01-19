import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { MeetingMinute } from '@/lib/models';
import { ObjectId } from 'mongodb';

// GET /api/minutes - Get all meeting minutes
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    const minutes = await db
      .collection<MeetingMinute>('meeting_minutes')
      .find({})
      .sort({ date: -1 })
      .toArray();

    return NextResponse.json({ minutes });
  } catch (error) {
    console.error('Error fetching minutes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch minutes' },
      { status: 500 }
    );
  }
}

// POST /api/minutes - Create meeting minutes (admin/officer only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'admin' && session.user.role !== 'officer') {
      return NextResponse.json(
        { error: 'Forbidden - Admin/Officer only' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { title, date, attendees, agenda, discussion, decisions, actionItems, nextMeetingDate, fileUrl } = body;

    if (!title || !date || !agenda) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    const newMinute: MeetingMinute = {
      title,
      date: new Date(date),
      attendees: attendees || [],
      agenda,
      discussion: discussion || '',
      decisions: decisions || '',
      actionItems: actionItems || '',
      nextMeetingDate: nextMeetingDate ? new Date(nextMeetingDate) : undefined,
      fileUrl,
      uploadedBy: new ObjectId(session.user.id),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db
      .collection<MeetingMinute>('meeting_minutes')
      .insertOne(newMinute);

    return NextResponse.json(
      {
        message: 'Meeting minutes created successfully',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating minutes:', error);
    return NextResponse.json(
      { error: 'Failed to create minutes' },
      { status: 500 }
    );
  }
}
