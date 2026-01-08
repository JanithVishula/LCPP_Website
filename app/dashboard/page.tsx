'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === 'unauthenticated') {
      redirect('/login');
    }
  }, [status]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gold mx-auto mb-4"></div>
          <p className="text-primary text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-primary to-primary-light text-white rounded-2xl p-8 mb-8 shadow-xl">
            <h1 className="text-4xl font-bold mb-2">Welcome back, {session.user?.name}!</h1>
            <p className="text-xl text-gold">Member Dashboard</p>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">12</div>
              <p className="text-primary font-semibold">Projects Participated</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">45</div>
              <p className="text-primary font-semibold">Service Hours</p>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center">
              <div className="text-4xl font-bold text-primary mb-2">Gold</div>
              <p className="text-primary font-semibold">Member Status</p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Profile */}
            <div className="bg-white border-2 border-primary rounded-xl p-6">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-primary text-xl">👤</span>
                </div>
                Your Profile
              </h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="text-primary font-semibold">{session.user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="text-primary font-semibold">{session.user?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Role</p>
                  <p className="text-primary font-semibold capitalize">{session.user?.role}</p>
                </div>
                <button className="w-full bg-gold text-primary hover:bg-gold-dark font-bold py-2 px-4 rounded-lg transition-all duration-300 mt-4">
                  Edit Profile
                </button>
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white border-2 border-primary rounded-xl p-6">
              <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
                <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                  <span className="text-primary text-xl">📅</span>
                </div>
                Upcoming Events
              </h2>
              <div className="space-y-4">
                <div className="border-l-4 border-gold pl-4 py-2">
                  <p className="font-semibold text-primary">Monthly Meeting</p>
                  <p className="text-sm text-gray-600">Jan 15, 2026 - 6:00 PM</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-semibold text-primary">Community Clean-Up</p>
                  <p className="text-sm text-gray-600">Jan 22, 2026 - 8:00 AM</p>
                </div>
                <div className="border-l-4 border-primary pl-4 py-2">
                  <p className="font-semibold text-primary">Leadership Workshop</p>
                  <p className="text-sm text-gray-600">Jan 29, 2026 - 2:00 PM</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-6 bg-white border-2 border-primary rounded-xl p-6">
            <h2 className="text-2xl font-bold text-primary mb-4 flex items-center gap-2">
              <div className="w-10 h-10 bg-gold rounded-full flex items-center justify-center">
                <span className="text-primary text-xl">📊</span>
              </div>
              Recent Activity
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl">✅</div>
                <div className="flex-1">
                  <p className="text-primary font-semibold">Attended Tree Plantation Drive</p>
                  <p className="text-sm text-gray-600">2 days ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl">📚</div>
                <div className="flex-1">
                  <p className="text-primary font-semibold">Completed Leadership Training</p>
                  <p className="text-sm text-gray-600">1 week ago</p>
                </div>
              </div>
              <div className="flex items-center gap-4 p-3 bg-blue-50 rounded-lg">
                <div className="text-2xl">🤝</div>
                <div className="flex-1">
                  <p className="text-primary font-semibold">Volunteered at Food Drive</p>
                  <p className="text-sm text-gray-600">2 weeks ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
