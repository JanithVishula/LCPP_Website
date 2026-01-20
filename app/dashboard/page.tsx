'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';

interface UserStats {
  user: {
    name: string;
    email: string;
    role: string;
    membershipNumber: string;
    joinedDate: string;
    phone: string;
  };
  stats: {
    projectsParticipated: number;
    serviceHours: number;
    eventsAttended: number;
    monthsMember: number;
  };
  upcomingEvents: Array<{
    title: string;
    date: string;
    location: string;
    time: string;
  }>;
  recentActivities: Array<{
    title: string;
    date: string;
    type: string;
    hours: number;
  }>;
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
    if (status === 'authenticated') {
      fetchStats();
    }
  }, [status]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/user/stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold mx-auto mb-4"></div>
          <p className="text-primary text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session || !stats) {
    return null;
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <BackButton />
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-8 mb-8 shadow-xl">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {stats.user.name}!</h1>
            <p className="text-xl text-gold">Member Dashboard</p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="bg-white/20 px-3 py-1 rounded-full">
                📧 {stats.user.email}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full">
                🎫 {stats.user.membershipNumber}
              </span>
              <span className="bg-white/20 px-3 py-1 rounded-full capitalize">
                👤 {stats.user.role}
              </span>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stats.stats.projectsParticipated}</div>
              <p className="text-primary font-semibold">Projects Participated</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stats.stats.serviceHours}</div>
              <p className="text-primary font-semibold">Service Hours</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stats.stats.eventsAttended}</div>
              <p className="text-primary font-semibold">Events Attended</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">{stats.stats.monthsMember}</div>
              <p className="text-primary font-semibold">Months as Member</p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Upcoming Events */}
            <div className="bg-white border-2 border-primary rounded-xl p-6">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-primary text-xl">📅</span>
                </div>
                Upcoming Events
              </h2>
              <div className="space-y-4">
                {stats.upcomingEvents.map((event, index) => (
                  <div key={index} className="border-l-4 border-gold pl-4 py-2">
                    <h3 className="font-bold text-primary">{event.title}</h3>
                    <p className="text-sm text-gray-600">📍 {event.location}</p>
                    <p className="text-sm text-gray-600">
                      🕐 {new Date(event.date).toLocaleDateString()} at {event.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white border-2 border-primary rounded-xl p-6">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-primary text-xl">🏆</span>
                </div>
                Recent Activities
              </h2>
              <div className="space-y-4">
                {stats.recentActivities.map((activity, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-bold text-primary">{activity.title}</h3>
                    <p className="text-sm text-gray-600">🏷️ {activity.type}</p>
                    <p className="text-sm text-gray-600">
                      📆 {new Date(activity.date).toLocaleDateString()} • ⏱️ {activity.hours} hours
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
