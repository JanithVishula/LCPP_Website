'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SubmitProjectPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    location: '',
    participantCount: '',
    category: 'community-service',
  });

  const [photos, setPhotos] = useState<File[]>([]);
  const [bills, setBills] = useState<File[]>([]);

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-primary mb-4">Please log in to submit a project</p>
          <Link href="/login" className="text-gold hover:underline">Go to Login</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('date', formData.date);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('participantCount', formData.participantCount);
      formDataToSend.append('category', formData.category);

      // Append photos
      photos.forEach(photo => {
        formDataToSend.append('photos', photo);
      });

      // Append bills
      bills.forEach(bill => {
        formDataToSend.append('bills', bill);
      });

      const res = await fetch('/api/projects', {
        method: 'POST',
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit project');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/projects');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setPhotos(Array.from(e.target.files));
    }
  };

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setBills(Array.from(e.target.files));
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Project Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your project has been submitted for approval. You'll be notified once it's reviewed.
          </p>
          <Link href="/projects" className="text-gold hover:underline">
            View All Projects
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary to-primary-dark py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Submit Project</h1>
          <p className="text-gray-600 mb-6">
            Share your Leo Club project with photos and receipts
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            {/* Project Title */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Project Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-gold"
                placeholder="Beach Cleanup Drive"
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-gold h-32"
                placeholder="Describe the project, activities, and impact..."
                required
                disabled={loading}
              />
            </div>

            {/* Date & Location */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Date *
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-gold"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-gold"
                  placeholder="Colombo Beach"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Participants & Category */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Number of Participants
                </label>
                <input
                  type="number"
                  value={formData.participantCount}
                  onChange={(e) => setFormData({ ...formData, participantCount: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-gold"
                  placeholder="25"
                  min="1"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-primary mb-2">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-gold"
                  disabled={loading}
                >
                  <option value="community-service">Community Service</option>
                  <option value="environmental">Environmental</option>
                  <option value="education">Education</option>
                  <option value="health">Health & Wellness</option>
                  <option value="fundraising">Fundraising</option>
                  <option value="awareness">Awareness Campaign</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            {/* Photos Upload */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                📸 Project Photos
              </label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoChange}
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-gold"
                disabled={loading}
              />
              {photos.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {photos.length} photo(s) selected
                </p>
              )}
            </div>

            {/* Bills/Receipts Upload */}
            <div>
              <label className="block text-sm font-semibold text-primary mb-2">
                📄 Bills & Receipts
              </label>
              <input
                type="file"
                accept="image/*,.pdf"
                multiple
                onChange={handleBillChange}
                className="w-full px-4 py-3 border-2 border-primary rounded-lg focus:ring-2 focus:ring-gold"
                disabled={loading}
              />
              {bills.length > 0 && (
                <p className="text-sm text-gray-600 mt-2">
                  {bills.length} file(s) selected
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gold hover:bg-gold-dark text-primary font-bold py-3 px-6 rounded-lg transition disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Project'}
              </button>
              <Link
                href="/projects"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-primary font-bold py-3 px-6 rounded-lg transition text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
