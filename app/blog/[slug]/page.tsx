'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface BlogPost {
  title: string;
  content: string;
  authorName: string;
  publishedAt: string;
  views: number;
  tags: string[];
}

export default function BlogPostPage() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPost();
  }, [params.slug]);

  const fetchPost = async () => {
    try {
      const res = await fetch(`/api/blog?slug=${params.slug}`);
      const data = await res.json();
      
      if (res.ok) {
        setPost(data.post);
      } else {
        router.push('/blog');
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      router.push('/blog');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading post...</div>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
        <button
          onClick={() => router.back()}
          className="text-primary hover:text-primary-dark mb-6 inline-flex items-center"
        >
          ← Back to Blog
        </button>

        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
          {post.title}
        </h1>

        <div className="flex items-center justify-between mb-8 pb-6 border-b">
          <div>
            <p className="text-gray-600">By {post.authorName}</p>
            <p className="text-gray-500 text-sm">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
          </div>
          <div className="text-gray-500 text-sm">
            👁 {post.views} views
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-secondary text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-gray-700 leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </article>
    </div>
  );
}
