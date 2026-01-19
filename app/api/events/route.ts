import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { Event } from '@/lib/models';
import { ObjectId } from 'mongodb';

// GET /api/events - Get all events (optionally filtered)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const upcoming = searchParams.get('upcoming') === 'true';
    const category = searchParams.get('category');

    const client = await clientPromise;
    const db = client.db('leo_club');
    
    let query: any = {};
    
    if (upcoming) {
      query.date = { $gte: new Date() };
    }
    
    if (category) {
      query.category = category;
    }

    const events = await db
      .collection<Event>('events')
      .find(query)
      .sort({ date: 1 })
      .toArray();

    return NextResponse.json({ events });
  } catch (error) {
    console.error('Error fetching events:', error);
    return NextResponse.json(
      { error: 'Failed to fetch events' },
      { status: 500 }
    );
  }
}

// POST /api/events - Create new event (admin/officer only)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    if (session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden - Admin only' }, { status: 403 });
    }

    const body = await request.json();
    const { title, description, date, endDate, location, category, maxAttendees, registrationDeadline } = body;

    if (!title || !description || !date || !location || !category) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    const newEvent: Event = {
      title,
      description,
      date: new Date(date),
      endDate: endDate ? new Date(endDate) : undefined,
      location,
      category,
      maxAttendees,
      registrationDeadline: registrationDeadline ? new Date(registrationDeadline) : undefined,
      rsvps: [],
      createdBy: new ObjectId(session.user.id),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Event>('events').insertOne(newEvent);

    return NextResponse.json({
      message: 'Event created successfully',
      eventId: result.insertedId,
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating event:', error);
    return NextResponse.json(
      { error: 'Failed to create event' },
      { status: 500 }
    );
  }
}
