import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

// GET all project suggestions
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Officers and admin can view all suggestions
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'officer')) {
      return NextResponse.json(
        { error: 'Unauthorized - Officers only' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');

    const db = await connectDB();
    const query: any = {};
    
    if (status) {
      query.status = status;
    }

    const suggestions = await db.collection('project_suggestions')
      .find(query)
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json({ suggestions });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch suggestions', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Submit new project suggestion (any authenticated member)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const {
      title,
      description,
      language,
      targetAudience,
      category,
      estimatedBudget,
      proposedDates,
      beneficiaries,
      location,
      expectedOutcome,
      resources
    } = body;

    if (!title || !description) {
      return NextResponse.json(
        { error: 'Title and description are required' },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const suggestion = {
      title,
      description,
      language: language || 'en', // 'en' or 'si' (Sinhala)
      targetAudience,
      category: category || 'community-service',
      estimatedBudget,
      proposedDates: proposedDates || [],
      beneficiaries,
      location,
      expectedOutcome,
      resources: resources || [],
      suggestedBy: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
      status: 'pending', // pending, approved, rejected, under-review
      submittedAt: new Date(),
      reviewedBy: null,
      reviewedAt: null,
      reviewNotes: '',
      votes: 0,
      votedBy: [],
    };

    const result = await db.collection('project_suggestions').insertOne(suggestion);

    return NextResponse.json({
      message: 'Project suggestion submitted successfully',
      suggestionId: result.insertedId,
    });
  } catch (error: any) {
    console.error('Suggestion submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit suggestion', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Update suggestion status (officers/admin only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'officer')) {
      return NextResponse.json(
        { error: 'Unauthorized - Officers only' },
        { status: 401 }
      );
    }

    const { suggestionId, status, reviewNotes } = await request.json();

    if (!suggestionId || !status) {
      return NextResponse.json(
        { error: 'Suggestion ID and status are required' },
        { status: 400 }
      );
    }

    if (!['pending', 'approved', 'rejected', 'under-review'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const result = await db.collection('project_suggestions').updateOne(
      { _id: new ObjectId(suggestionId) },
      {
        $set: {
          status,
          reviewNotes: reviewNotes || '',
          reviewedBy: {
            id: session.user.id,
            name: session.user.name,
          },
          reviewedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { error: 'Suggestion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: `Suggestion ${status} successfully`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update suggestion', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete suggestion (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin only' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const suggestionId = searchParams.get('id');

    if (!suggestionId) {
      return NextResponse.json(
        { error: 'Suggestion ID is required' },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const result = await db.collection('project_suggestions').deleteOne({
      _id: new ObjectId(suggestionId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Suggestion not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: 'Suggestion deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete suggestion', details: error.message },
      { status: 500 }
    );
  }
}
