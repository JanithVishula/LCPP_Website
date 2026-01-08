import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    // Get user details
    const user = await db.collection('users').findOne({
      _id: new ObjectId(session.user.id)
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Calculate membership duration
    const joinedDate = new Date(user.joinedDate);
    const now = new Date();
    const monthsMember = Math.floor(
      (now.getTime() - joinedDate.getTime()) / (1000 * 60 * 60 * 24 * 30)
    );

    // For now, return mock stats. Later you can add actual project participation tracking
    const stats = {
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        membershipNumber: user.membershipNumber,
        joinedDate: user.joinedDate,
        phone: user.phone,
      },
      stats: {
        projectsParticipated: Math.floor(Math.random() * 15) + 5, // Random for demo
        serviceHours: Math.floor(Math.random() * 60) + 20, // Random for demo
        eventsAttended: Math.floor(Math.random() * 20) + 8, // Random for demo
        monthsMember,
      },
      upcomingEvents: [
        {
          title: 'Beach Cleanup Drive',
          date: '2026-01-15',
          location: 'Mount Lavinia Beach',
          time: '7:00 AM',
        },
        {
          title: 'Blood Donation Camp',
          date: '2026-01-22',
          location: 'Pannipitiya Community Center',
          time: '8:00 AM',
        },
        {
          title: 'Educational Supplies Distribution',
          date: '2026-02-05',
          location: 'Rural Schools - Homagama',
          time: '9:00 AM',
        },
      ],
      recentActivities: [
        {
          title: 'Tree Planting Project',
          date: '2025-12-20',
          type: 'Environmental',
          hours: 4,
        },
        {
          title: 'Food Distribution Drive',
          date: '2025-12-10',
          type: 'Community Service',
          hours: 6,
        },
        {
          title: 'Senior Citizens Home Visit',
          date: '2025-11-28',
          type: 'Social Service',
          hours: 3,
        },
      ],
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error('Error fetching user stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
