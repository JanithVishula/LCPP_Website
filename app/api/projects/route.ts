import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

// GET /api/projects - Get all projects (public endpoint)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const year = searchParams.get('year');
    const category = searchParams.get('category');

    const client = await clientPromise;
    const db = client.db('leo_club');
    const projects = db.collection('projects');

    // Build query
    const query: any = {};
    if (year) query.year = year;
    if (category) query.category = category;

    const allProjects = await projects
      .find(query)
      .sort({ date: -1 })
      .toArray();

    // Transform for frontend
    const transformedProjects = allProjects.map(project => ({
      id: project._id.toString(),
      title: project.title,
      date: project.date,
      description: project.description,
      category: project.category,
      year: project.year,
      participants: project.participants || 0,
      impact: project.impact || '',
    }));

    return NextResponse.json({
      success: true,
      count: transformedProjects.length,
      projects: transformedProjects,
    });

  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
