'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface LeaderboardEntry {
  _id: string;
  userName: string;
  totalHours: number;
  projectCount: number;
}

export default function LeaderboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchLeaderboard();
    }
  }, [status]);

  const fetchLeaderboard = async () => {
    try {
      const res = await fetch('/api/service-hours/leaderboard?limit=50');
      const data = await res.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading leaderboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">
          🏆 Service Hours Leaderboard
        </h1>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {leaderboard.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              <p className="text-lg">No approved service hours yet</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Rank</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold">Member</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Total Hours</th>
                    <th className="px-6 py-4 text-center text-sm font-semibold">Projects</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {leaderboard.map((entry, index) => (
                    <tr
                      key={entry._id}
                      className={`${
                        index === 0
                          ? 'bg-yellow-50'
                          : index === 1
                          ? 'bg-gray-100'
                          : index === 2
                          ? 'bg-orange-50'
                          : ''
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-2xl font-bold">
                          {index === 0 && '🥇'}
                          {index === 1 && '🥈'}
                          {index === 2 && '🥉'}
                          {index > 2 && `#${index + 1}`}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {entry.userName}
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-2xl font-bold text-green-600">
                          {entry.totalHours.toFixed(1)}h
                        </span>
                      </td>
                      <td className="px-6 py-4 text-center text-gray-600">
                        {entry.projectCount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

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
