import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectDB } from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// GET all projects
export async function GET() {
  try {
    const db = await connectDB();
    const projects = await db.collection('projects')
      .find({})
      .sort({ submittedAt: -1 })
      .toArray();

    return NextResponse.json({ projects });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to fetch projects', details: error.message },
      { status: 500 }
    );
  }
}

// POST - Submit new project (members can submit)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const date = formData.get('date') as string;
    const location = formData.get('location') as string;
    const participantCount = parseInt(formData.get('participantCount') as string);
    const category = formData.get('category') as string;
    
    const photos = formData.getAll('photos') as File[];
    const bills = formData.getAll('bills') as File[];

    if (!title || !description || !date) {
      return NextResponse.json(
        { error: 'Title, description, and date are required' },
        { status: 400 }
      );
    }

    // Create uploads directory if it doesn't exist
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads', 'projects');
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Save photos
    const photoUrls: string[] = [];
    for (const photo of photos) {
      if (photo.size > 0) {
        const bytes = await photo.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${photo.name}`;
        const filepath = path.join(uploadsDir, uniqueName);
        
        await writeFile(filepath, buffer);
        photoUrls.push(`/uploads/projects/${uniqueName}`);
      }
    }

    // Save bills
    const billUrls: string[] = [];
    for (const bill of bills) {
      if (bill.size > 0) {
        const bytes = await bill.arrayBuffer();
        const buffer = Buffer.from(bytes);
        
        const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}-${bill.name}`;
        const filepath = path.join(uploadsDir, uniqueName);
        
        await writeFile(filepath, buffer);
        billUrls.push(`/uploads/projects/${uniqueName}`);
      }
    }

    const db = await connectDB();
    const project = {
      title,
      description,
      date: new Date(date),
      location,
      participantCount,
      category,
      photos: photoUrls,
      bills: billUrls,
      submittedBy: {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
      },
      status: 'pending', // pending, approved, rejected
      submittedAt: new Date(),
      approvedBy: null,
      approvedAt: null,
    };

    const result = await db.collection('projects').insertOne(project);

    return NextResponse.json({
      message: 'Project submitted successfully',
      projectId: result.insertedId,
    });
  } catch (error: any) {
    console.error('Project submission error:', error);
    return NextResponse.json(
      { error: 'Failed to submit project', details: error.message },
      { status: 500 }
    );
  }
}

// PATCH - Approve/reject project (admin/officer only)
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || (session.user.role !== 'admin' && session.user.role !== 'officer')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { projectId, status } = await request.json();

    if (!projectId || !status) {
      return NextResponse.json(
        { error: 'Project ID and status are required' },
        { status: 400 }
      );
    }

    if (!['approved', 'rejected'].includes(status)) {
      return NextResponse.json(
        { error: 'Status must be approved or rejected' },
        { status: 400 }
      );
    }

    const db = await connectDB();
    const result = await db.collection('projects').updateOne(
      { _id: new ObjectId(projectId) },
      {
        $set: {
          status,
          approvedBy: {
            id: session.user.id,
            name: session.user.name,
          },
          approvedAt: new Date(),
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: `Project ${status} successfully` });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to update project', details: error.message },
      { status: 500 }
    );
  }
}

// DELETE - Delete project (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized - Admin only' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const projectId = searchParams.get('id');

    if (!projectId) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const db = await connectDB();
    const result = await db.collection('projects').deleteOne({
      _id: new ObjectId(projectId),
    });

    if (result.deletedCount === 0) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Project deleted successfully' });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Failed to delete project', details: error.message },
      { status: 500 }
    );
  }
}
