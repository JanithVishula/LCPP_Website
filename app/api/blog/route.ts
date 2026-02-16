import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { BlogPost } from '@/lib/models';
import { ObjectId } from 'mongodb';

// GET /api/blog - Get all blog posts (published only for non-admin)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    const client = await clientPromise;
    const db = client.db('leo_club');

    // If slug is provided, get single post
    if (slug) {
      const post = await db.collection<BlogPost>('blog_posts').findOne({ slug });
      
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      // Only show unpublished posts to admin/officer
      if (!post.published && session?.user?.role !== 'admin' && session?.user?.role !== 'officer') {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }

      // Increment view count
      await db.collection<BlogPost>('blog_posts').updateOne(
        { slug },
        { $inc: { views: 1 } }
      );

      return NextResponse.json({ post: { ...post, views: post.views + 1 } });
    }

    // Get all posts
    const query: any = {};
    
    // Non-admin users can only see published posts
    if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'officer')) {
      query.published = true;
    }

    const posts = await db
      .collection<BlogPost>('blog_posts')
      .find(query)
      .sort({ publishedAt: -1, createdAt: -1 })
      .toArray();

    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

// POST /api/blog - Create blog post (any logged-in user; member posts stay unpublished until approved)
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { title, content, excerpt, coverImage, tags, published } = body;

    if (!title || !content || !excerpt) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

    const client = await clientPromise;
    const db = client.db('leo_club');

    // Check if slug already exists
    const existing = await db.collection<BlogPost>('blog_posts').findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 400 }
      );
    }

    const isAdminOrOfficer =
      session.user.role === 'admin' || session.user.role === 'officer';

    const shouldPublish = isAdminOrOfficer && !!published;

    const newPost: BlogPost = {
      title,
      slug,
      content,
      excerpt,
      coverImage,
      author: new ObjectId(session.user.id),
      authorName: session.user.name || '',
      tags: tags || [],
      // Members' posts stay unpublished until approved
      published: shouldPublish,
      publishedAt: shouldPublish ? new Date() : undefined,
      views: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const result = await db.collection<BlogPost>('blog_posts').insertOne(newPost);

    return NextResponse.json(
      {
        message: 'Blog post created successfully',
        id: result.insertedId,
        slug,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

// PATCH /api/blog - Update blog post publish status (admin/officer only)
export async function PATCH(request: NextRequest) {
  try {
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
    const { id, published } = body as { id?: string; published?: boolean };

    if (!id) {
      return NextResponse.json(
        { error: 'Missing blog post id' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('leo_club');

    const update: Partial<BlogPost> = {
      updatedAt: new Date(),
    } as Partial<BlogPost>;

    if (typeof published === 'boolean') {
      (update as any).published = published;
      (update as any).publishedAt = published ? new Date() : undefined;
    }

    const result = await db
      .collection<BlogPost>('blog_posts')
      .updateOne({ _id: new ObjectId(id) }, { $set: update });

    if (result.matchedCount === 0) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Blog post updated successfully' });
  } catch (error) {
    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}
