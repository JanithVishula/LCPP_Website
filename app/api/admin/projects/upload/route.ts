import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import OpenAI from 'openai';

// POST /api/admin/projects/upload - Upload PDF and create project with AI summary
export async function POST(request: NextRequest) {
  try {
    // Check if user is admin
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('pdf') as File;
    const year = formData.get('year') as string || '2025-26';
    const category = formData.get('category') as string || 'Community Service';

    if (!file) {
      return NextResponse.json(
        { error: 'No PDF file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    if (file.type !== 'application/pdf') {
      return NextResponse.json(
        { error: 'File must be a PDF' },
        { status: 400 }
      );
    }

    // Convert file to buffer and base64
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64PDF = buffer.toString('base64');

    console.log('📄 PDF file received:', file.name, 'Size:', buffer.length, 'bytes');

    // Initialize OpenAI client
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // Use GPT-4o to directly process the PDF (no pdf-parse needed!)
    let projectData: any = {};
    try {
      console.log('🤖 Processing PDF with GPT-4o Vision...');
      
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: `You are analyzing a Leo Club project report PDF. Please extract:
1. Project Title (extract or infer from content)
2. Date (if mentioned, format as YYYY-MM-DD)
3. Brief Description (2-3 sentences summary)
4. Key Activities (list of activities performed)
5. Impact/Outcomes (describe the impact)
6. Number of Participants (if mentioned)

Format your response as JSON:
{
  "title": "Project Title",
  "date": "YYYY-MM-DD or null",
  "description": "Brief summary",
  "activities": ["activity 1", "activity 2"],
  "impact": "Impact description",
  "participants": number
}`
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:application/pdf;base64,${base64PDF}`
                }
              }
            ]
          }
        ],
        max_tokens: 1500,
      });

      const aiResponse = completion.choices[0].message.content || '';
      console.log('✅ GPT-4o response received');

      // Parse JSON from response
      const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        projectData = JSON.parse(jsonMatch[0]);
        console.log('✅ Extracted project data:', projectData.title);
      } else {
        throw new Error('No JSON found in AI response');
      }

    } catch (aiError: any) {
      console.error('❌ AI processing failed:', aiError.message);
      
      // Fallback: Create project with basic info
      const client = await clientPromise;
      const db = client.db('leo_club');
      const projects = db.collection('projects');

      const fallbackProject = {
        title: file.name.replace('.pdf', '').replace(/_/g, ' '),
        date: new Date().toISOString().split('T')[0],
        description: 'Project uploaded via PDF. AI summary unavailable - please edit manually.',
        category: category,
        activities: [],
        impact: '',
        participants: 0,
        year: year,
        pdfFileName: file.name,
        pdfText: 'AI processing failed - file saved for manual review',
        createdBy: new ObjectId(session.user.id),
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const result = await projects.insertOne(fallbackProject);

      return NextResponse.json({
        success: true,
        message: 'Project created (AI summary unavailable - please edit manually)',
        project: {
          id: result.insertedId.toString(),
          ...fallbackProject,
          createdBy: session.user.id,
        },
        warning: 'AI processing failed: ' + aiError.message
      });
    }

    // Save project to MongoDB with AI-extracted data
    const client = await clientPromise;
    const db = client.db('leo_club');
    const projects = db.collection('projects');

    const newProject = {
      title: projectData.title || file.name.replace('.pdf', '').replace(/_/g, ' '),
      date: projectData.date || new Date().toISOString().split('T')[0],
      description: projectData.description || 'Project details extracted from uploaded document.',
      category: category,
      activities: Array.isArray(projectData.activities) ? projectData.activities : [],
      impact: projectData.impact || '',
      participants: projectData.participants || 0,
      year: year,
      pdfFileName: file.name,
      pdfText: 'Processed by GPT-4o Vision',
      createdBy: new ObjectId(session.user.id),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await projects.insertOne(newProject);

    return NextResponse.json({
      success: true,
      message: '✅ Project created successfully with AI-generated summary!',
      project: {
        id: result.insertedId.toString(),
        ...newProject,
        createdBy: session.user.id,
      },
    });

  } catch (error: any) {
    console.error('Error processing PDF:', error);
    
    if (error.message?.includes('API key')) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured. Please add OPENAI_API_KEY to .env.local' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to process PDF and create project', details: error.message },
      { status: 500 }
    );
  }
}

// GET /api/admin/projects/upload - Get all projects (for admin management)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json(
        { error: 'Unauthorized - Admin access required' },
        { status: 403 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');
    const projects = db.collection('projects');

    const allProjects = await projects.find({}).sort({ createdAt: -1 }).toArray();

    return NextResponse.json({
      success: true,
      count: allProjects.length,
      projects: allProjects,
    });

  } catch (error: any) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}
