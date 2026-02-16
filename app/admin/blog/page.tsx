'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface AdminBlogPost {
  _id: string;
  title: string;
  excerpt: string;
  authorName: string;
  published: boolean;
  publishedAt?: string;
  createdAt: string;
}

export default function AdminBlogReviewPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [posts, setPosts] = useState<AdminBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      if (session?.user?.role !== 'admin' && session?.user?.role !== 'officer') {
        router.push('/dashboard');
        return;
      }
      fetchPosts();
    }
  }, [status, session]);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to load blog posts');
      }

      setPosts(data.posts || []);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const updatePublishStatus = async (id: string, published: boolean) => {
    try {
      const res = await fetch('/api/blog', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, published }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to update post');
      }

      fetchPosts();
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Failed to update post');
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading blog posts...</div>
      </div>
    );
  }

  if (!session?.user || (session.user.role !== 'admin' && session.user.role !== 'officer')) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-gold/10 py-8 px-4">
      <div className="lg:flex max-w-6xl mx-auto">
        <div className="flex-1">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gold-dark via-primary to-primary-dark bg-clip-text text-transparent mb-2">
              Blog Moderation
            </h1>
            <p className="text-gray-600">Review and publish member-submitted blog posts</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {posts.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-6 text-center text-gray-600">
              No blog posts found.
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post._id}
                  className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
                >
                  <div>
                    <h2 className="text-xl font-semibold text-primary mb-1">{post.title}</h2>
                    <p className="text-sm text-gray-500 mb-2">By {post.authorName}</p>
                    <p className="text-sm text-gray-700 line-clamp-2">{post.excerpt}</p>
                    <p className="text-xs text-gray-400 mt-2">
                      Submitted: {new Date(post.createdAt).toLocaleString()}
                    </p>
                    {post.published && post.publishedAt && (
                      <p className="text-xs text-green-600 mt-1">
                        Published: {new Date(post.publishedAt).toLocaleString()}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col gap-2 w-full md:w-56">
                    <span
                      className={`inline-flex items-center justify-center px-3 py-1 rounded-full text-xs font-semibold mb-1 ${
                        post.published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {post.published ? 'Published' : 'Pending Approval'}
                    </span>
                    <button
                      onClick={() => updatePublishStatus(post._id, !post.published)}
                      className={`w-full px-4 py-2 rounded-lg font-semibold text-sm ${
                        post.published
                          ? 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {post.published ? 'Unpublish' : 'Approve & Publish'}
                    </button>
                    <button
                      onClick={() => router.push(`/blog/${post._id}`)}
                      className="w-full px-4 py-2 rounded-lg font-semibold text-sm bg-primary text-white hover:bg-primary-dark"
                    >
                      View Post
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
