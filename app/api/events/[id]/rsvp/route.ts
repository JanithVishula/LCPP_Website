import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { Event } from '@/lib/models';
import { ObjectId } from 'mongodb';

// POST /api/events/[id]/rsvp - RSVP to event (authenticated members)
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body; // 'going', 'maybe', 'notgoing'

    if (!['going', 'maybe', 'notgoing'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid RSVP status' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    // Check if event exists
    const event = await db.collection<Event>('events').findOne({
      _id: new ObjectId(params.id),
    });

    if (!event) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    // Check if registration is still open
    if (event.registrationDeadline && new Date() > event.registrationDeadline) {
      return NextResponse.json(
        { error: 'Registration deadline has passed' },
        { status: 400 }
      );
    }

    // Check if event is full
    if (event.maxAttendees) {
      const goingCount = event.rsvps.filter(r => r.status === 'going').length;
      if (status === 'going' && goingCount >= event.maxAttendees) {
        return NextResponse.json(
          { error: 'Event is full' },
          { status: 400 }
        );
      }
    }

    const userId = new ObjectId(session.user.id);

    // Remove existing RSVP if any
    await db.collection<Event>('events').updateOne(
      { _id: new ObjectId(params.id) },
      { $pull: { rsvps: { userId } } }
    );

    // Add new RSVP
    const result = await db.collection<Event>('events').updateOne(
      { _id: new ObjectId(params.id) },
      {
        $push: {
          rsvps: {
            userId,
            userName: session.user.name || '',
            userEmail: session.user.email || '',
            status,
            respondedAt: new Date(),
          },
        },
        $set: { updatedAt: new Date() },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Event not found' }, { status: 404 });
    }

    return NextResponse.json({
      message: 'RSVP updated successfully',
      status,
    });
  } catch (error) {
    console.error('Error updating RSVP:', error);
    return NextResponse.json(
      { error: 'Failed to update RSVP' },
      { status: 500 }
    );
  }
}
