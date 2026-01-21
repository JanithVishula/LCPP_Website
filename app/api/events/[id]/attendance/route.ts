import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { status, meetingType } = await req.json();
    const eventId = params.id;

    // Validate meeting type for board meetings
    if (meetingType === 'board' && session.user.role !== 'officer' && session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Only officers and admins can attend board meetings' },
        { status: 403 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    // Check if event exists
    const event = await db.collection('events').findOne({
      _id: new ObjectId(eventId),
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check if user already marked attendance
    const existingAttendance = event.attendance?.find(
      (a: any) => a.userId === session.user.id
    );

    if (existingAttendance) {
      // Update existing attendance
      await db.collection('events').updateOne(
        {
          _id: new ObjectId(eventId),
          'attendance.userId': session.user.id,
        },
        {
          $set: {
            'attendance.$.status': status,
            'attendance.$.markedAt': new Date(),
          },
        }
      );
    } else {
      // Add new attendance
      await db.collection('events').updateOne(
        { _id: new ObjectId(eventId) },
        {
          $push: {
            attendance: {
              userId: session.user.id,
              userName: session.user.name,
              userEmail: session.user.email,
              status,
              markedAt: new Date(),
            },
          } as any,
        }
      );
    }

    return NextResponse.json({ message: 'Attendance marked successfully' });
  } catch (error) {
    console.error('Error marking attendance:', error);
    return NextResponse.json(
      { error: 'Failed to mark attendance' },
      { status: 500 }
    );
  }
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const eventId = params.id;

    const client = await clientPromise;
    const db = client.db('leo_club');

    const event = await db.collection('events').findOne({
      _id: new ObjectId(eventId),
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      attendance: event.attendance || [],
      summary: {
        present: event.attendance?.filter((a: any) => a.status === 'present').length || 0,
        absent: event.attendance?.filter((a: any) => a.status === 'absent').length || 0,
        late: event.attendance?.filter((a: any) => a.status === 'late').length || 0,
      },
    });
  } catch (error) {
    console.error('Error fetching attendance:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attendance' },
      { status: 500 }
    );
  }
}
