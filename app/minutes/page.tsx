'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface MeetingMinute {
  _id: string;
  title: string;
  date: string;
  attendees: string[];
  agenda: string;
  discussion: string;
  decisions: string;
  actionItems: string;
  nextMeetingDate?: string;
}

export default function MinutesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [minutes, setMinutes] = useState<MeetingMinute[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMinute, setSelectedMinute] = useState<MeetingMinute | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchMinutes();
    }
  }, [status]);

  const fetchMinutes = async () => {
    try {
      const res = await fetch('/api/minutes');
      const data = await res.json();
      setMinutes(data.minutes || []);
    } catch (error) {
      console.error('Error fetching minutes:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading meeting minutes...</div>
      </div>
    );
  }

  if (selectedMinute) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <button
            onClick={() => setSelectedMinute(null)}
            className="text-primary hover:text-primary-dark mb-6"
          >
            ← Back to Minutes
          </button>

          <h1 className="text-4xl font-bold text-primary mb-6">{selectedMinute.title}</h1>

          <div className="mb-6 text-gray-600">
            <p>📅 {new Date(selectedMinute.date).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}</p>
          </div>

          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">Attendees</h2>
              <ul className="list-disc list-inside text-gray-700">
                {selectedMinute.attendees.map((attendee, index) => (
                  <li key={index}>{attendee}</li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-3">Agenda</h2>
              <p className="text-gray-700 whitespace-pre-wrap">{selectedMinute.agenda}</p>
            </div>

            {selectedMinute.discussion && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-3">Discussion</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMinute.discussion}</p>
              </div>
            )}

            {selectedMinute.decisions && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-3">Decisions Made</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMinute.decisions}</p>
              </div>
            )}

            {selectedMinute.actionItems && (
              <div>
                <h2 className="text-2xl font-bold text-primary mb-3">Action Items</h2>
                <p className="text-gray-700 whitespace-pre-wrap">{selectedMinute.actionItems}</p>
              </div>
            )}

            {selectedMinute.nextMeetingDate && (
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-primary font-semibold">
                  Next Meeting: {new Date(selectedMinute.nextMeetingDate).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Meeting Minutes</h1>
          {(session?.user?.role === 'admin' || session?.user?.role === 'officer') && (
            <button
              onClick={() => router.push('/minutes/create')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
            >
              Add Minutes
            </button>
          )}
        </div>

        {minutes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">No meeting minutes available</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {minutes.map((minute) => (
              <div
                key={minute._id}
                onClick={() => setSelectedMinute(minute)}
                className="bg-white rounded-lg shadow-lg p-6 cursor-pointer hover:shadow-xl transition-shadow"
              >
                <h2 className="text-xl font-bold text-primary mb-2">{minute.title}</h2>
                <p className="text-gray-600 mb-3">
                  📅 {new Date(minute.date).toLocaleDateString()}
                </p>
                <p className="text-gray-700 text-sm mb-3 line-clamp-2">{minute.agenda}</p>
                <p className="text-sm text-gray-500">
                  👥 {minute.attendees.length} attendees
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
