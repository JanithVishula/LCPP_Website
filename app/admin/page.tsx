'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-gold/10 py-8">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-gold-dark via-primary to-primary-dark bg-clip-text text-transparent mb-2">
            Admin Command Center
          </h1>
          <p className="text-gray-600 text-lg">Welcome back, {session?.user?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Members */}
          <div className="bg-gradient-to-br from-primary to-primary-light rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold">{stats.totalMembers}</div>
            </div>
            <div className="text-gold-light font-semibold">Total Members</div>
          </div>

          {/* Total Hours */}
          <div className="bg-gradient-to-br from-gold to-gold-dark rounded-xl shadow-lg p-6 text-primary transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold">{stats.totalHours}</div>
            </div>
            <div className="text-primary font-semibold">Service Hours</div>
          </div>

          {/* Total Suggestions */}
          <div className="bg-gradient-to-br from-primary-dark to-primary rounded-xl shadow-lg p-6 text-white transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold">{stats.totalSuggestions}</div>
            </div>
            <div className="text-gold-light font-semibold">Project Ideas</div>
          </div>

          {/* Upcoming Events */}
          <div className="bg-gradient-to-br from-gold-dark to-gold rounded-xl shadow-lg p-6 text-primary transform hover:scale-105 transition-transform">
            <div className="flex items-center justify-between mb-4">
              <div className="text-3xl font-bold">{stats.upcomingEvents}</div>
            </div>
            <div className="text-primary font-semibold">Upcoming Events</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Create Event */}
          <Link href="/events/create">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-blue-500">
              <h3 className="text-2xl font-bold text-primary mb-2">Create Event</h3>
              <p className="text-gray-600">Schedule new club events and meetings</p>
            </div>
          </Link>

          {/* Manage Members */}
          <Link href="/members">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-primary">
              <h3 className="text-2xl font-bold text-primary mb-2">Manage Members</h3>
              <p className="text-gray-600">Edit member details and roles</p>
            </div>
          </Link>

          {/* Create Account */}
          <Link href="/members/create">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-gold">
              <h3 className="text-2xl font-bold text-primary mb-2">Create Account</h3>
              <p className="text-gray-600">Add new members, officers, or admins</p>
            </div>
          </Link>

          {/* Review Suggestions */}
          <Link href="/suggestions">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-gold">
              <h3 className="text-2xl font-bold text-primary mb-2">Project Ideas</h3>
              <p className="text-gray-600">Review member project suggestions</p>
            </div>
          </Link>

          {/* Service Hours */}
          <Link href="/service-hours">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-primary-dark">
              <h3 className="text-2xl font-bold text-primary mb-2">Service Hours</h3>
              <p className="text-gray-600">Approve and track service hours</p>
            </div>
          </Link>

          {/* Membership Applications */}
          <Link href="/admin/applications">
            <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transform hover:scale-[1.02] transition-all cursor-pointer border-2 border-transparent hover:border-gold-dark">
              <h3 className="text-2xl font-bold text-primary mb-2">Membership Applications</h3>
              <p className="text-gray-600">Review applications submitted from the Join page</p>
            </div>
          </Link>
        </div>

        {/* Quick Stats Section */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Quick Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 rounded-lg p-4">
              <p className="text-sm text-gray-600">Average Hours/Member</p>
              <p className="text-2xl font-bold text-primary">
                {stats.totalMembers > 0 ? (stats.totalHours / stats.totalMembers).toFixed(1) : 0}
              </p>
            </div>
            <div className="bg-gradient-to-r from-gold/10 to-gold/20 rounded-lg p-4">
              <p className="text-sm text-gray-600">Ideas per Member</p>
              <p className="text-2xl font-bold text-primary">
                {stats.totalMembers > 0 ? (stats.totalSuggestions / stats.totalMembers).toFixed(1) : 0}
              </p>
            </div>
            <div className="bg-gradient-to-r from-primary/5 to-primary/15 rounded-lg p-4">
              <p className="text-sm text-gray-600">Events This Month</p>
              <p className="text-2xl font-bold text-primary">{stats.upcomingEvents}</p>
            </div>
          </div>
        </div>
        </div>
    </div>
  );
}
