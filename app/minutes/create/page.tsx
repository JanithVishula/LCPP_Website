'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function CreateMinutesPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [attendees, setAttendees] = useState(['']);
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    agenda: '',
    discussion: '',
    decisions: '',
    actionItems: '',
    nextMeetingDate: '',
  });

  const handleAddAttendee = () => {
    setAttendees([...attendees, '']);
  };

  const handleRemoveAttendee = (index: number) => {
    setAttendees(attendees.filter((_, i) => i !== index));
  };

  const handleAttendeeChange = (index: number, value: string) => {
    const newAttendees = [...attendees];
    newAttendees[index] = value;
    setAttendees(newAttendees);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/minutes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          attendees: attendees.filter(a => a.trim() !== ''),
        }),
      });

      if (res.ok) {
        router.push('/minutes');
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to create minutes');
      }
    } catch (error) {
      console.error('Error creating minutes:', error);
      alert('Failed to create minutes');
    } finally {
      setLoading(false);
    }
  };

  if (session?.user?.role !== 'admin' && session?.user?.role !== 'officer') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl text-red-600">Access Denied</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Add Meeting Minutes</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Meeting Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              placeholder="e.g., Monthly General Meeting - January 2026"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Meeting Date *
              </label>
              <input
                type="date"
                required
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Next Meeting Date
              </label>
              <input
                type="date"
                value={formData.nextMeetingDate}
                onChange={(e) => setFormData({ ...formData, nextMeetingDate: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attendees
            </label>
            {attendees.map((attendee, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={attendee}
                  onChange={(e) => handleAttendeeChange(index, e.target.value)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                  placeholder="Member name"
                />
                {attendees.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAttendee(index)}
                    className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddAttendee}
              className="mt-2 text-primary hover:text-primary-dark"
            >
              + Add Attendee
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Agenda *
            </label>
            <textarea
              required
              rows={4}
              value={formData.agenda}
              onChange={(e) => setFormData({ ...formData, agenda: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              placeholder="What was discussed..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discussion Summary
            </label>
            <textarea
              rows={4}
              value={formData.discussion}
              onChange={(e) => setFormData({ ...formData, discussion: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Decisions Made
            </label>
            <textarea
              rows={4}
              value={formData.decisions}
              onChange={(e) => setFormData({ ...formData, decisions: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Action Items
            </label>
            <textarea
              rows={4}
              value={formData.actionItems}
              onChange={(e) => setFormData({ ...formData, actionItems: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              placeholder="What needs to be done and by whom..."
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-primary text-white py-3 rounded-lg hover:bg-primary-dark disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Minutes'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-8 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
