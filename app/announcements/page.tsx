'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Announcement {
  _id: string;
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  createdByName: string;
  createdAt: string;
  pinned: boolean;
}

export default function AnnouncementsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchAnnouncements();
    }
  }, [status]);

  const fetchAnnouncements = async () => {
    try {
      const res = await fetch('/api/announcements');
      const data = await res.json();
      setAnnouncements(data.announcements || []);
    } catch (error) {
      console.error('Error fetching announcements:', error);
    } finally {
      setLoading(false);
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800 border-red-500';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-500';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-500';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-500';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading announcements...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Announcements</h1>
          {session?.user?.role === 'admin' && (
            <button
              onClick={() => router.push('/announcements/create')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
            >
              New Announcement
            </button>
          )}
        </div>

        {announcements.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No announcements at this time</p>
          </div>
        ) : (
          <div className="space-y-6">
            {announcements.map((announcement) => (
              <div
                key={announcement._id}
                className={`bg-white rounded-lg shadow-lg border-l-4 p-6 ${getPriorityColor(
                  announcement.priority
                )}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {announcement.pinned && <span className="text-2xl">📌</span>}
                    <div>
                      <h2 className="text-2xl font-bold text-primary">{announcement.title}</h2>
                      <p className="text-sm text-gray-500 mt-1">
                        By {announcement.createdByName} •{' '}
                        {new Date(announcement.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white uppercase">
                    {announcement.priority}
                  </span>
                </div>

                <p className="text-gray-700 whitespace-pre-wrap">{announcement.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
