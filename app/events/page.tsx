'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';

interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  endDate?: string;
  location: string;
  category: string;
  maxAttendees?: number;
  registrationDeadline?: string;
  meetingType?: 'general' | 'board' | 'event';
  rsvps: Array<{
    userId: string;
    userName: string;
    status: string;
    respondedAt: string;
  }>;
  attendance?: Array<{
    userId: string;
    userName: string;
    status: string;
    markedAt: string;
  }>;
}

export default function EventsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'upcoming'>('upcoming');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchEvents();
    }
  }, [status, filter]);

  const fetchEvents = async () => {
    try {
      const url = filter === 'upcoming' ? '/api/events?upcoming=true' : '/api/events';
      const res = await fetch(url);
      const data = await res.json();
      setEvents(data.events || []);
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRSVP = async (eventId: string, status: 'going' | 'maybe' | 'notgoing') => {
    try {
      const res = await fetch(`/api/events/${eventId}/rsvp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        fetchEvents(); // Refresh events
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to update RSVP');
      }
    } catch (error) {
      console.error('Error updating RSVP:', error);
      alert('Failed to update RSVP');
    }
  };

  const getUserRSVP = (event: Event) => {
    return event.rsvps.find(r => r.userId === session?.user?.id);
  };

  const getRSVPCounts = (event: Event) => {
    return {
      going: event.rsvps.filter(r => r.status === 'going').length,
      maybe: event.rsvps.filter(r => r.status === 'maybe').length,
      notgoing: event.rsvps.filter(r => r.status === 'notgoing').length,
    };
  };

  const markAttendance = async (eventId: string, status: 'present' | 'absent' | 'late') => {
    try {
      const res = await fetch(`/api/events/${eventId}/attendance`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });

      if (res.ok) {
        alert('Attendance marked successfully!');
        fetchEvents();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to mark attendance');
      }
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert('Failed to mark attendance');
    }
  };

  const getUserAttendance = (event: Event) => {
    return event.attendance?.find(a => a.userId === session?.user?.id);
  };

  const getAttendanceCounts = (event: Event) => {
    return {
      present: event.attendance?.filter(a => a.status === 'present').length || 0,
      absent: event.attendance?.filter(a => a.status === 'absent').length || 0,
      late: event.attendance?.filter(a => a.status === 'late').length || 0,
    };
  };

  const isEventDay = (eventDate: Date) => {
    const today = new Date();
    const diffTime = eventDate.getTime() - today.getTime();
    const diffDays = diffTime / (1000 * 60 * 60 * 24);
    return diffDays >= -1 && diffDays <= 1; // Event day or within 24 hours
  };

  const canMarkAttendance = (event: Event) => {
    const eventDate = new Date(event.date);
    return isEventDay(eventDate);
  };

  const canAccessBoardMeeting = () => {
    return session?.user?.role === 'admin' || session?.user?.role === 'officer';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <BackButton />
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-primary mb-4">📅 Club Events</h1>
          <p className="text-gray-600 mb-6">
            Stay connected with our upcoming events and meetings. RSVP and mark your attendance!
          </p>

          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setFilter('upcoming')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                filter === 'upcoming'
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary border-2 border-primary'
              }`}
            >
              Upcoming Events
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold ${
                filter === 'all'
                  ? 'bg-primary text-white'
                  : 'bg-white text-primary border-2 border-primary'
              }`}
            >
              All Events
            </button>
          </div>
        </div>

        {events.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No events found</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => {
              const userRSVP = getUserRSVP(event);
              const counts = getRSVPCounts(event);
              const userAttendance = getUserAttendance(event);
              const attendanceCounts = getAttendanceCounts(event);
              const eventDate = new Date(event.date);
              const isPast = eventDate < new Date();
              const showAttendanceBtn = canMarkAttendance(event);
              const isBoardMeeting = event.meetingType === 'board';
              const canAccess = !isBoardMeeting || canAccessBoardMeeting();

              if (isBoardMeeting && !canAccess) {
                return null; // Hide board meetings from regular members
              }

              return (
                <div key={event._id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="mb-4">
                    <div className="flex gap-2 mb-2">
                      <span className="inline-block px-3 py-1 text-sm bg-secondary text-primary rounded-full">
                        {event.category}
                      </span>
                      {isBoardMeeting && (
                        <span className="inline-block px-3 py-1 text-sm bg-purple-600 text-white rounded-full">
                          👮 Board Meeting
                        </span>
                      )}
                      {event.meetingType === 'general' && (
                        <span className="inline-block px-3 py-1 text-sm bg-blue-600 text-white rounded-full">
                          📋 General Meeting
                        </span>
                      )}
                    </div>
                    <h2 className="text-2xl font-bold text-primary mb-2">{event.title}</h2>
                    <p className="text-gray-600 mb-4">{event.description}</p>
                  </div>

                  <div className="space-y-2 mb-4 text-sm text-gray-700">
                    <p>📅 {new Date(event.date).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</p>
                    <p>🕐 {new Date(event.date).toLocaleTimeString('en-US', { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}</p>
                    <p>📍 {event.location}</p>
                    {event.maxAttendees && (
                      <p>👥 {counts.going} / {event.maxAttendees} attending</p>
                    )}
                  </div>

                  <div className="border-t pt-4 mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      ✅ {counts.going} Going | 🤔 {counts.maybe} Maybe | ❌ {counts.notgoing} Not Going
                    </p>
                  </div>

                  {/* Attendance Section */}
                  {showAttendanceBtn && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
                      <h4 className="font-bold text-primary mb-2">📋 Mark Your Attendance</h4>
                      {userAttendance ? (
                        <p className="text-sm text-green-600 font-semibold mb-2">
                          ✅ You marked: {userAttendance.status.toUpperCase()}
                        </p>
                      ) : (
                        <p className="text-sm text-gray-600 mb-3">Event is happening now or today!</p>
                      )}
                      <div className="flex gap-2">
                        <button
                          onClick={() => markAttendance(event._id, 'present')}
                          className={`flex-1 py-2 rounded font-semibold text-sm ${
                            userAttendance?.status === 'present'
                              ? 'bg-green-600 text-white'
                              : 'bg-green-100 text-green-700 hover:bg-green-200'
                          }`}
                        >
                          ✅ Present
                        </button>
                        <button
                          onClick={() => markAttendance(event._id, 'late')}
                          className={`flex-1 py-2 rounded font-semibold text-sm ${
                            userAttendance?.status === 'late'
                              ? 'bg-yellow-600 text-white'
                              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                          }`}
                        >
                          ⏰ Late
                        </button>
                        <button
                          onClick={() => markAttendance(event._id, 'absent')}
                          className={`flex-1 py-2 rounded font-semibold text-sm ${
                            userAttendance?.status === 'absent'
                              ? 'bg-red-600 text-white'
                              : 'bg-red-100 text-red-700 hover:bg-red-200'
                          }`}
                        >
                          ❌ Absent
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Present: {attendanceCounts.present} | Late: {attendanceCounts.late} | Absent: {attendanceCounts.absent}
                      </p>
                    </div>
                  )}

                  {!isPast && !showAttendanceBtn && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleRSVP(event._id, 'going')}
                        className={`flex-1 py-2 rounded ${
                          userRSVP?.status === 'going'
                            ? 'bg-green-600 text-white'
                            : 'bg-green-100 text-green-700 hover:bg-green-200'
                        }`}
                      >
                        Going
                      </button>
                      <button
                        onClick={() => handleRSVP(event._id, 'maybe')}
                        className={`flex-1 py-2 rounded ${
                          userRSVP?.status === 'maybe'
                            ? 'bg-yellow-600 text-white'
                            : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                        }`}
                      >
                        Maybe
                      </button>
                      <button
                        onClick={() => handleRSVP(event._id, 'notgoing')}
                        className={`flex-1 py-2 rounded ${
                          userRSVP?.status === 'notgoing'
                            ? 'bg-red-600 text-white'
                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                        }`}
                      >
                        Can't Go
                      </button>
                    </div>
                  )}

                  {isPast && (
                    <div className="text-center py-2 bg-gray-100 rounded text-gray-500">
                      Event Completed{attendanceCounts.present > 0 && ` • ${attendanceCounts.present + attendanceCounts.late} attended`}
                    </div>
                  )}
                </div>
              );
            }).filter(Boolean)}
          </div>
        )}
      </div>
    </div>
  );
}
