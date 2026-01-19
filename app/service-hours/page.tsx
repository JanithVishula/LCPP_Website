'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface ServiceHour {
  _id: string;
  userName: string;
  projectName: string;
  date: string;
  hours: number;
  description: string;
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  createdAt: string;
}

export default function ServiceHoursPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [hours, setHours] = useState<ServiceHour[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    projectName: '',
    date: '',
    hours: '',
    description: '',
  });

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (authStatus === 'authenticated') {
      fetchHours();
    }
  }, [authStatus]);

  const fetchHours = async () => {
    try {
      const res = await fetch('/api/service-hours');
      const data = await res.json();
      setHours(data.hours || []);
    } catch (error) {
      console.error('Error fetching hours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/service-hours', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          hours: parseFloat(formData.hours),
        }),
      });

      if (res.ok) {
        setFormData({ projectName: '', date: '', hours: '', description: '' });
        setShowForm(false);
        fetchHours();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to submit hours');
      }
    } catch (error) {
      console.error('Error submitting hours:', error);
      alert('Failed to submit hours');
    }
  };

  const totalApprovedHours = hours
    .filter(h => h.status === 'approved')
    .reduce((sum, h) => sum + h.hours, 0);

  const totalPendingHours = hours
    .filter(h => h.status === 'pending')
    .reduce((sum, h) => sum + h.hours, 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading service hours...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Service Hours</h1>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
          >
            {showForm ? 'Cancel' : 'Log Hours'}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Approved</h3>
            <p className="text-4xl font-bold text-green-600">{totalApprovedHours.toFixed(1)}h</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Pending Approval</h3>
            <p className="text-4xl font-bold text-yellow-600">{totalPendingHours.toFixed(1)}h</p>
          </div>
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Total Entries</h3>
            <p className="text-4xl font-bold text-primary">{hours.length}</p>
          </div>
        </div>

        {showForm && (
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-8 mb-8 space-y-6">
            <h2 className="text-2xl font-bold text-primary mb-4">Log Service Hours</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Project/Activity Name *
              </label>
              <input
                type="text"
                required
                value={formData.projectName}
                onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date *
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
                  Hours *
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="0.5"
                  max="24"
                  required
                  value={formData.hours}
                  onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                required
                rows={4}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
                placeholder="Describe what you did during this service activity..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-white py-3 rounded-lg hover:bg-primary-dark"
            >
              Submit Hours
            </button>
          </form>
        )}

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="px-6 py-4 bg-primary">
            <h2 className="text-2xl font-bold text-white">Your Service Hours Log</h2>
          </div>

          {hours.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No service hours logged yet</p>
              <p className="mt-2">Click "Log Hours" to add your first entry!</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Project</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Hours</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Description</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {hours.map((hour) => (
                    <tr key={hour._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {new Date(hour.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">{hour.projectName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                        {hour.hours}h
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{hour.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            hour.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : hour.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {hour.status}
                        </span>
                        {hour.status === 'rejected' && hour.rejectionReason && (
                          <p className="text-xs text-red-600 mt-1">{hour.rejectionReason}</p>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {(session?.user?.role === 'admin' || session?.user?.role === 'officer') && (
          <div className="mt-6 flex justify-between">
            <button
              onClick={() => router.push('/service-hours/approve')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700"
            >
              Review Submissions
            </button>
            <button
              onClick={() => router.push('/service-hours/leaderboard')}
              className="bg-secondary text-primary px-6 py-2 rounded-lg hover:bg-yellow-400"
            >
              View Leaderboard
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
