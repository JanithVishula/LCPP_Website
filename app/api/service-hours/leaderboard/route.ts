import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';

// GET /api/service-hours/leaderboard - Get service hours leaderboard
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');

    const client = await clientPromise;
    const db = client.db('leo_club');

    // Aggregate approved service hours by user
    const leaderboard = await db
      .collection('service_hours')
      .aggregate([
        { $match: { status: 'approved' } },
        {
          $group: {
            _id: '$userId',
            userName: { $first: '$userName' },
            totalHours: { $sum: '$hours' },
            projectCount: { $sum: 1 },
          },
        },
        { $sort: { totalHours: -1 } },
        { $limit: limit },
      ])
      .toArray();

    return NextResponse.json({ leaderboard });
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return NextResponse.json(
      { error: 'Failed to fetch leaderboard' },
      { status: 500 }
    );
  }
}
