'use client';

import { useState, useEffect } from 'react';

interface TimelineEvent {
  id: number;
  month: string;
  title: string;
  description: string;
  category: string;
  date: string;
}

const leoYearProjects: TimelineEvent[] = [
  {
    id: 1,
    month: 'Jul 2025',
    title: 'Leo Installation Ceremony',
    description: 'Annual installation of new board members',
    category: 'Meeting',
    date: 'July 2025'
  },
  {
    id: 2,
    month: 'Aug 2025',
    title: 'Back to School Drive',
    description: 'Providing school supplies to underprivileged students',
    category: 'Education',
    date: 'August 2025'
  },
  {
    id: 3,
    month: 'Sep 2025',
    title: 'Environmental Clean-up',
    description: 'Beach and park cleanup campaign',
    category: 'Environment',
    date: 'September 2025'
  },
  {
    id: 4,
    month: 'Oct 2025',
    title: 'Health Awareness Program',
    description: 'Free health screening and awareness sessions',
    category: 'Health',
    date: 'October 2025'
  },
  {
    id: 5,
    month: 'Nov 2025',
    title: 'Tree Plantation Drive',
    description: 'Planting 500+ trees in local community',
    category: 'Environment',
    date: 'November 2025'
  },
  {
    id: 6,
    month: 'Dec 2025',
    title: 'Christmas Charity',
    description: 'Gift distribution to orphanages',
    category: 'Community',
    date: 'December 2025'
  },
  {
    id: 7,
    month: 'Jan 2026',
    title: 'New Year Leadership Workshop',
    description: 'Skill development workshop for members',
    category: 'Leadership',
    date: 'January 2026'
  },
  {
    id: 8,
    month: 'Feb 2026',
    title: 'Blood Donation Campaign',
    description: 'Annual blood donation drive',
    category: 'Health',
    date: 'February 2026'
  },
  {
    id: 9,
    month: 'Mar 2026',
    title: 'Education Sponsorship',
    description: 'Scholarship program for deserving students',
    category: 'Education',
    date: 'March 2026'
  },
  {
    id: 10,
    month: 'Apr 2026',
    title: 'Community Fair',
    description: 'Annual community service fair',
    category: 'Community',
    date: 'April 2026'
  },
  {
    id: 11,
    month: 'May 2026',
    title: 'Youth Sports Festival',
    description: 'Sports event for local youth',
    category: 'Sports',
    date: 'May 2026'
  },
  {
    id: 12,
    month: 'Jun 2026',
    title: 'End of Year Celebration',
    description: 'Leo year closing ceremony and awards',
    category: 'Meeting',
    date: 'June 2026'
  }
];

const categoryColors: Record<string, { bg: string; border: string; text: string }> = {
  Meeting: { bg: 'bg-blue-100', border: 'border-primary', text: 'text-primary' },
  Education: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700' },
  Environment: { bg: 'bg-blue-50', border: 'border-primary', text: 'text-primary' },
  Health: { bg: 'bg-gold/20', border: 'border-gold', text: 'text-gray-800' },
  Community: { bg: 'bg-gold/30', border: 'border-gold', text: 'text-gray-800' },
  Leadership: { bg: 'bg-blue-100', border: 'border-blue-600', text: 'text-blue-800' },
  Sports: { bg: 'bg-gold/20', border: 'border-gold-dark', text: 'text-gray-800' }
};

export default function Timeline3D() {
  const [activeIndex, setActiveIndex] = useState(6); // Current month (January 2026)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentIndex = hoverIndex ?? activeIndex;

  return (
    <div className="w-full py-12 md:py-20 bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Leo Year 2025-2026 Projects Timeline
          </h2>
          <p className="text-gray-600 text-lg">
            Our journey of service and leadership throughout the year
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-gold to-primary hidden md:block"></div>

          {/* Timeline Items */}
          <div className="space-y-2 md:space-y-3">
            {leoYearProjects.map((event, index) => {
              const colors = categoryColors[event.category];
              const isLeft = index % 2 === 0;
              const isActive = index === currentIndex;
              const isPast = index < currentIndex;
              const isFuture = index > currentIndex;

              return (
                <div
                  key={event.id}
                  className={`relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoverIndex(index)}
                  onMouseLeave={() => setHoverIndex(null)}
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:block">
                    <div className="grid grid-cols-2 items-center gap-x-28">
                      {/* Left Column */}
                      <div className={`flex ${isLeft ? 'justify-end pr-24' : 'justify-end pr-24'}`}>
                        {isLeft && (
                          <div
                            className={`relative inline-block bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-500 transform ${
                              isActive
                                ? `${colors.border} scale-110 shadow-2xl`
                                : isPast
                                ? 'border-gray-300 opacity-70'
                                : 'border-gray-200 opacity-60'
                            } hover:scale-105 cursor-pointer`}
                            onClick={() => setActiveIndex(index)}
                          >
                            {/* Action / Light Buttons (Left side) */}
                            <div className="absolute top-6 -left-4 -translate-x-full hidden md:flex flex-col gap-2">
                              <button
                                type="button"
                                aria-label="Select timeline item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveIndex(index);
                                }}
                                className="w-10 h-10 rounded-full bg-white border-2 border-primary text-primary shadow hover:bg-blue-50 transition"
                              >
                                <span className="font-bold">Go</span>
                              </button>
                              <button
                                type="button"
                                aria-label="Highlight timeline item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveIndex(index);
                                }}
                                className="w-10 h-10 rounded-full bg-gold/90 border-2 border-gold text-primary shadow hover:bg-gold transition"
                              >
                                <span className="font-bold">★</span>
                              </button>
                            </div>

                            <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-3 ${colors.bg} ${colors.text}`}>
                              {event.category}
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                              {event.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                            <p className="text-gold font-semibold text-sm">{event.month}</p>
                          </div>
                        )}
                      </div>

                      {/* Right Column */}
                      <div className="flex justify-start pl-32">
                        {!isLeft && (
                          <div
                            className={`relative inline-block bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-500 transform ${
                              isActive
                                ? `${colors.border} scale-110 shadow-2xl`
                                : isPast
                                ? 'border-gray-300 opacity-70'
                                : 'border-gray-200 opacity-60'
                            } hover:scale-105 cursor-pointer`}
                            onClick={() => setActiveIndex(index)}
                          >
                            {/* Action / Light Buttons (Right side) */}
                            <div className="absolute top-6 -right-4 translate-x-full hidden md:flex flex-col gap-2">
                              <button
                                type="button"
                                aria-label="Select timeline item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveIndex(index);
                                }}
                                className="w-10 h-10 rounded-full bg-white border-2 border-primary text-primary shadow hover:bg-blue-50 transition"
                              >
                                <span className="font-bold">Go</span>
                              </button>
                              <button
                                type="button"
                                aria-label="Highlight timeline item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveIndex(index);
                                }}
                                className="w-10 h-10 rounded-full bg-gold/90 border-2 border-gold text-primary shadow hover:bg-gold transition"
                              >
                                <span className="font-bold">★</span>
                              </button>
                            </div>

                            <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-3 ${colors.bg} ${colors.text}`}>
                              {event.category}
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                              {event.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                            <p className="text-gold font-semibold text-sm">{event.month}</p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Center Circle (stays on the fixed middle line) */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                      <div
                        className={`relative w-8 h-8 rounded-full border-4 transition-all duration-500 ${
                          isActive
                            ? 'bg-gold border-primary scale-150 shadow-lg'
                            : isPast
                            ? 'bg-primary border-primary scale-100'
                            : 'bg-white border-gray-300 scale-100'
                        }`}
                      >
                        {isActive && (
                          <div className="absolute inset-0 rounded-full bg-gold animate-ping opacity-75"></div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div
                          className={`w-6 h-6 rounded-full border-4 transition-all duration-500 ${
                            isActive
                              ? 'bg-gold border-primary scale-125'
                              : isPast
                              ? 'bg-primary border-primary'
                              : 'bg-white border-gray-300'
                          }`}
                        ></div>
                      </div>
                      <div
                        className={`flex-1 bg-white rounded-xl shadow-lg p-5 border-2 transition-all duration-500 ${
                          isActive ? `${colors.border} shadow-xl` : 'border-gray-200'
                        }`}
                        onClick={() => setActiveIndex(index)}
                      >
                        <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-2 ${colors.bg} ${colors.text}`}>
                          {event.category}
                        </div>
                        <h3 className={`text-lg font-bold mb-2 ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                        <p className="text-gold font-semibold text-sm">{event.month}</p>
                      </div>
                    </div>
                    {index < leoYearProjects.length - 1 && (
                      <div className="ml-3 w-0.5 h-4 bg-gradient-to-b from-primary to-gold"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
