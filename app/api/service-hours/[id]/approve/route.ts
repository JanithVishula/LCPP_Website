import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ServiceHour } from '@/lib/models';
import { ObjectId } from 'mongodb';

// PUT /api/service-hours/[id]/approve - Approve/reject service hours (admin/officer only)
export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const params = await context.params;
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
    const { action, rejectionReason } = body; // action: 'approve' or 'reject'

    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action' },
        { status: 400 }
      );
    }

    if (action === 'reject' && !rejectionReason) {
      return NextResponse.json(
        { error: 'Rejection reason is required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    const updateData: any = {
      status: action === 'approve' ? 'approved' : 'rejected',
      approvedBy: new ObjectId(session.user.id),
      approvedAt: new Date(),
      updatedAt: new Date(),
    };

    if (action === 'reject') {
      updateData.rejectionReason = rejectionReason;
    }

    const result = await db
      .collection<ServiceHour>('service_hours')
      .updateOne({ _id: new ObjectId(params.id) }, { $set: updateData });

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Service hour entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Service hours ${action}d successfully`,
    });
  } catch (error) {
    console.error('Error approving/rejecting service hours:', error);
    return NextResponse.json(
      { error: 'Failed to process service hours' },
      { status: 500 }
    );
  }
}
