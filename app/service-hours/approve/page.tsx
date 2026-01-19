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
  status: string;
}

export default function ApproveHoursPage() {
  const { data: session, status: authStatus } = useSession();
  const router = useRouter();
  const [hours, setHours] = useState<ServiceHour[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authStatus === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (authStatus === 'authenticated') {
      if (session?.user?.role !== 'admin' && session?.user?.role !== 'officer') {
        router.push('/service-hours');
        return;
      }
      fetchPendingHours();
    }
  }, [authStatus, session]);

  const fetchPendingHours = async () => {
    try {
      const res = await fetch('/api/service-hours?status=pending');
      const data = await res.json();
      setHours(data.hours || []);
    } catch (error) {
      console.error('Error fetching hours:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    try {
      const res = await fetch(`/api/service-hours/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'approve' }),
      });

      if (res.ok) {
        fetchPendingHours();
      }
    } catch (error) {
      console.error('Error approving hours:', error);
    }
  };

  const handleReject = async (id: string) => {
    const reason = prompt('Please provide a reason for rejection:');
    if (!reason) return;

    try {
      const res = await fetch(`/api/service-hours/${id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'reject', rejectionReason: reason }),
      });

      if (res.ok) {
        fetchPendingHours();
      }
    } catch (error) {
      console.error('Error rejecting hours:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading submissions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8">Approve Service Hours</h1>

        {hours.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">No pending submissions</p>
          </div>
        ) : (
          <div className="space-y-6">
            {hours.map((hour) => (
              <div key={hour._id} className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-primary">{hour.projectName}</h3>
                    <p className="text-gray-600">Submitted by: {hour.userName}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-green-600">{hour.hours}h</p>
                    <p className="text-sm text-gray-500">
                      {new Date(hour.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">{hour.description}</p>

                <div className="flex gap-4">
                  <button
                    onClick={() => handleApprove(hour._id)}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 font-semibold"
                  >
                    ✓ Approve
                  </button>
                  <button
                    onClick={() => handleReject(hour._id)}
                    className="flex-1 bg-red-600 text-white py-3 rounded-lg hover:bg-red-700 font-semibold"
                  >
                    ✗ Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => router.back()}
            className="text-primary hover:text-primary-dark underline"
          >
            ← Back to Service Hours
          </button>
        </div>
      </div>
    </div>
  );
}
