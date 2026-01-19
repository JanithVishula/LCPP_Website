'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeMembers: 0,
    totalProjects: 0,
    pendingServiceHours: 0,
    totalServiceHours: 0,
    upcomingEvents: 0,
    newMessages: 0,
    recentAnnouncements: 0,
    pendingSuggestions: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      if (session?.user?.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
      fetchStats();
    }
  }, [status, session]);

  const fetchStats = async () => {
    try {
      // Fetch user stats
      const usersRes = await fetch('/api/user/stats');
      const users = usersRes.ok ? await usersRes.json() : { users: [] };

      // Fetch service hours
      const serviceHoursRes = await fetch('/api/service-hours?status=pending');
      const serviceHours = serviceHoursRes.ok ? await serviceHoursRes.json() : { hours: [] };

      // Fetch events
      const eventsRes = await fetch('/api/events?upcoming=true');
      const events = eventsRes.ok ? await eventsRes.json() : { events: [] };

      // Fetch announcements
      const announcementsRes = await fetch('/api/announcements');
      const announcements = announcementsRes.ok ? await announcementsRes.json() : { announcements: [] };

      // Fetch suggestions
      const suggestionsRes = await fetch('/api/suggestions?status=pending');
      const suggestions = suggestionsRes.ok ? await suggestionsRes.json() : { suggestions: [] };

      // Get all service hours for total
      const allHoursRes = await fetch('/api/service-hours?status=approved');
      const allHours = allHoursRes.ok ? await allHoursRes.json() : { hours: [] };
      const totalHours = (allHours.hours || []).reduce(
        (sum: number, h: any) => sum + h.hours,
        0
      );

      setStats({
        totalUsers: users.users?.length || 0,
        activeMembers: users.users?.filter((u: any) => u.active).length || 0,
        totalProjects: 0,
        pendingServiceHours: serviceHours.hours?.length || 0,
        totalServiceHours: totalHours,
        upcomingEvents: events.events?.length || 0,
        newMessages: 0,
        recentAnnouncements: announcements.announcements?.length || 0,
        pendingSuggestions: suggestions.suggestions?.length || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading admin panel...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-bold text-primary mb-2">Admin Panel</h1>
          <p className="text-gray-600">👑 Welcome, {session?.user?.name} - You are the only administrator</p>
        </div>

        {/* Statistics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-500 text-sm mb-2">Total Members</h3>
            <p className="text-4xl font-bold text-primary">{stats.totalUsers}</p>
            <p className="text-sm text-green-600 mt-2">{stats.activeMembers} active</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-500 text-sm mb-2">Service Hours</h3>
            <p className="text-4xl font-bold text-green-600">{stats.totalServiceHours.toFixed(0)}h</p>
            {stats.pendingServiceHours > 0 && (
              <p className="text-sm text-yellow-600 mt-2">{stats.pendingServiceHours} pending</p>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-gray-500 text-sm mb-2">Upcoming Events</h3>
            <p className="text-4xl font-bold text-primary">{stats.upcomingEvents}</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/events/create"
            className="bg-gradient-to-r from-primary to-orange-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">📅 Create Event</h3>
            <p className="text-white/90">Schedule a new Leo Club event</p>
          </Link>

          <Link
            href="/announcements/create"
            className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">📢 Make Announcement</h3>
            <p className="text-white/90">Post important club updates</p>
          </Link>

          <Link
            href="/suggestions/review"
            className="bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">💡 Review Suggestions</h3>
            <p className="text-white/90">{stats.pendingSuggestions} pending review</p>
          </Link>

          <Link
            href="/members"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">👥 View Members</h3>
            <p className="text-white/90">{stats.totalUsers} total members</p>
          </Link>

          <Link
            href="/members/create"
            className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">➕ Add Member</h3>
            <p className="text-white/90">Create new admin, officer, or member</p>
          </Link>

          <Link
            href="/service-hours"
            className="bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:scale-105"
          >
            <h3 className="text-xl font-bold mb-2">⏱️ Service Hours</h3>
            <p className="text-white/90">{stats.pendingServiceHours} pending approval</p>
          </Link>
        </div>
            <h3 className="text-gray-500 text-sm mb-2">Announcements</h3>
            <p className="text-4xl font-bold text-primary">{stats.recentAnnouncements}</p>
          </div>
        </div>


      </div>
    </div>
  );
}
