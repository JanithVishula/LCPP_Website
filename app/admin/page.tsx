'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import BackButton from '@/components/BackButton';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalMembers: 0,
    totalHours: 0,
    totalSuggestions: 0,
    upcomingEvents: 0,
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/dashboard');
      return;
    }

    if (status === 'authenticated') {
      fetchStats();
    }
  }, [status, session]);

  const fetchStats = async () => {
    try {
      const [membersRes, hoursRes, suggestionsRes, eventsRes] = await Promise.all([
        fetch('/api/members'),
        fetch('/api/service-hours'),
        fetch('/api/suggestions'),
        fetch('/api/events?upcoming=true'),
      ]);

      const members = await membersRes.json();
      const hours = await hoursRes.json();
      const suggestions = await suggestionsRes.json();
      const events = await eventsRes.json();

      setStats({
        totalMembers: members.members?.length || 0,
        totalHours: hours.hours?.reduce((sum: number, h: any) => sum + (h.hours || 0), 0) || 0,
        totalSuggestions: suggestions.suggestions?.length || 0,
        upcomingEvents: events.events?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (session?.user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-purple-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <BackButton />
        {/* Header with Crown */}
        <div className="mb-8 text-center">
          <div className="inline-block mb-4">
            <div className="text-6xl animate-bounce">👑</div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
            Admin Command Center
          </h1>
          <p className="text-gray-600 text-lg">Welcome back, {session?.user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Members */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">👥</div>
              <div className="text-3xl font-bold">{stats.totalMembers}</div>
            </div>
            <div className="text-blue-100 font-semibold">Total Members</div>
          </div>

          {/* Total Hours */}
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">⏰</div>
              <div className="text-3xl font-bold">{stats.totalHours}</div>
            </div>
            <div className="text-green-100 font-semibold">Service Hours</div>
          </div>

          {/* Total Suggestions */}
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">💡</div>
              <div className="text-3xl font-bold">{stats.totalSuggestions}</div>
            </div>
            <div className="text-purple-100 font-semibold">Project Ideas</div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-4xl">📅</div>
              <div className="text-3xl font-bold">{stats.upcomingEvents}</div>
            </div>
            <div className="text-orange-100 font-semibold">Upcoming Events</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Event */}
          <Link href="/events/create">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-blue-500">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Create Event</h3>
              <p className="text-gray-600">Schedule new club events and meetings</p>
            </div>
          </Link>

          {/* Make Announcement */}
          <Link href="/announcements/create">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-green-500">
              <div className="text-5xl mb-4">📢</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Announcements</h3>
              <p className="text-gray-600">Post important club announcements</p>
            </div>
          </Link>

          {/* Manage Members */}
          <Link href="/members">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-purple-500">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Manage Members</h3>
              <p className="text-gray-600">Edit member details and roles</p>
            </div>
          </Link>

          {/* Create Account */}
          <Link href="/members/create">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-orange-500">
              <div className="text-5xl mb-4">➕</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Create Account</h3>
              <p className="text-gray-600">Add new members, officers, or admins</p>
            </div>
          </Link>

          {/* Review Suggestions */}
          <Link href="/suggestions">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-yellow-500">
              <div className="text-5xl mb-4">💡</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Project Ideas</h3>
              <p className="text-gray-600">Review member project suggestions</p>
            </div>
          </Link>

          {/* Service Hours */}
          <Link href="/service-hours">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-red-500">
              <div className="text-5xl mb-4">⏱️</div>
              <h3 className="text-2xl font-bold text-primary mb-2">Service Hours</h3>
              <p className="text-gray-600">Approve and track service hours</p>
            </div>
          </Link>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">📊 Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Average Hours/Member</p>
              <p className="text-2xl font-bold text-blue-600">
                {stats.totalMembers > 0 ? (stats.totalHours / stats.totalMembers).toFixed(1) : 0}
              </p>
            </div>
            <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Ideas per Member</p>
              <p className="text-2xl font-bold text-green-600">
                {stats.totalMembers > 0 ? (stats.totalSuggestions / stats.totalMembers).toFixed(1) : 0}
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4">
              <p className="text-sm text-gray-600">Events This Month</p>
              <p className="text-2xl font-bold text-purple-600">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
