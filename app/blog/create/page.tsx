'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateBlogPostPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    tags: '',
  });

  const isAdminOrOfficer =
    session?.user?.role === 'admin' || session?.user?.role === 'officer';
  const [publishNow, setPublishNow] = useState(false);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!session?.user) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          content: formData.content,
          excerpt: formData.excerpt,
          tags: formData.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          // Only let admins/officers request immediate publishing
          published: isAdminOrOfficer && publishNow,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit blog post');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/blog');
      }, 2000);
    } catch (err: any) {
      setError(err.message || 'Failed to submit blog post');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-50 py-12 px-4">
        <div className="lg:flex max-w-4xl mx-auto">
          <div className="flex-1 flex items-center justify-center">
            <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md">
              <h2 className="text-2xl font-bold text-primary mb-2">Post Submitted!</h2>
              <p className="text-gray-600 mb-4">
                {isAdminOrOfficer
                  ? 'Your post has been created. If published, it will now appear in the blog.'
                  : 'Your post has been sent to officers/admin for approval. Once approved, it will appear in the public blog.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-50 py-12 px-4">
      <div className="lg:flex max-w-5xl mx-auto">
        <div className="flex-1 bg-white rounded-3xl shadow-2xl p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">✍️ Write a Blog Post</h1>
            <p className="text-gray-600">
              Share your story, project experience, or club insight. Posts from members will be reviewed by officers/admin before being published.
            </p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-primary/20 focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Short Excerpt *
              </label>
              <textarea
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-primary/20 focus:border-primary"
                placeholder="A short summary that will show on the blog list."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content *
              </label>
              <textarea
                required
                rows={10}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-primary/20 focus:border-primary"
                placeholder="Write your full story here..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:ring-4 focus:ring-primary/20 focus:border-primary"
                placeholder="e.g. service, fundraiser, leadership"
              />
            </div>

            {isAdminOrOfficer && (
              <div className="flex items-center gap-2">
                <input
                  id="publishNow"
                  type="checkbox"
                  checked={publishNow}
                  onChange={(e) => setPublishNow(e.target.checked)}
                  className="h-4 w-4 text-primary border-gray-300 rounded"
                />
                <label htmlFor="publishNow" className="text-sm text-gray-700">
                  Publish immediately (skip approval)
                </label>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark font-semibold disabled:opacity-70"
            >
              {loading ? 'Submitting...' : 'Submit Post'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
