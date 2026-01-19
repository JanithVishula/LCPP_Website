import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import bcrypt from 'bcryptjs';

export async function PATCH(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    // Only admins can update member details
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { userId, updates } = body;

    if (!userId || !updates) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    // Prepare update object
    const updateObj: any = {};

    if (updates.name) updateObj.name = updates.name;
    if (updates.email) updateObj.email = updates.email;
    if (updates.phone) updateObj.phone = updates.phone;
    if (updates.membershipNumber) updateObj.membershipNumber = updates.membershipNumber;
    if (updates.role) updateObj.role = updates.role;
    if (updates.active !== undefined) updateObj.active = updates.active;
    
    // Hash password if provided
    if (updates.password) {
      const hashedPassword = await bcrypt.hash(updates.password, 10);
      updateObj.password = hashedPassword;
    }

    const result = await db.collection('users').updateOne(
      { _id: new ObjectId(userId) },
      { $set: updateObj }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ 
      message: 'Member updated successfully',
      modified: result.modifiedCount > 0
    });
  } catch (error) {
    console.error('Error updating member:', error);
    return NextResponse.json(
      { error: 'Failed to update member' },
      { status: 500 }
    );
  }
}
