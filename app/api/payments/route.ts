import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { Payment } from '@/lib/models';
import { ObjectId } from 'mongodb';

// GET /api/payments - Get payments (admin only or own payments)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    let query: any = {};

    // Regular members can only see their own payments
    if (session.user.role === 'member') {
      query.userId = new ObjectId(session.user.id);
    }

    const payments = await db
      .collection<Payment>('payments')
      .find(query)
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ payments });
  } catch (error) {
    console.error('Error fetching payments:', error);
    return NextResponse.json(
      { error: 'Failed to fetch payments' },
      { status: 500 }
    );
  }
}

// POST /api/payments - Create payment record
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, relatedId, amount, currency, paymentMethod, payerName, payerEmail, payerPhone, metadata } = body;

    if (!type || !amount || !paymentMethod || !payerName || !payerEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);

    const client = await clientPromise;
    const db = client.db('leo_club');

    const newPayment: Payment = {
      userId: session?.user?.id ? new ObjectId(session.user.id) : undefined,
      type,
      relatedId: relatedId ? new ObjectId(relatedId) : undefined,
      amount,
      currency: currency || 'LKR',
      paymentMethod,
      status: 'pending', // Will be updated by payment gateway webhook
      payerName,
      payerEmail,
      payerPhone,
      metadata,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<Payment>('payments').insertOne(newPayment);

    return NextResponse.json(
      {
        message: 'Payment record created',
        id: result.insertedId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating payment:', error);
    return NextResponse.json(
      { error: 'Failed to create payment' },
      { status: 500 }
    );
  }
}
