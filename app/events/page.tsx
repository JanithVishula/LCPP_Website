'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

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
  rsvps: Array<{
    userId: string;
    userName: string;
    status: string;
    respondedAt: string;
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading events...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-primary">Events</h1>
          {session?.user?.role === 'admin' && (
            <button
              onClick={() => router.push('/events/create')}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark"
            >
              Create Event
            </button>
          )}
        </div>

        <div className="mb-6 flex gap-4">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded ${
              filter === 'upcoming'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            Upcoming Events
          </button>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded ${
              filter === 'all'
                ? 'bg-primary text-white'
                : 'bg-white text-gray-700'
            }`}
          >
            All Events
          </button>
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
              const eventDate = new Date(event.date);
              const isPast = eventDate < new Date();

              return (
                <div key={event._id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-sm bg-secondary text-primary rounded-full mb-2">
                      {event.category}
                    </span>
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

                  {!isPast && (
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
                      Event Completed
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
