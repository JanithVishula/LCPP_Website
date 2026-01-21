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
  Meeting: { bg: 'bg-purple-100', border: 'border-purple-500', text: 'text-purple-700' },
  Education: { bg: 'bg-blue-100', border: 'border-blue-500', text: 'text-blue-700' },
  Environment: { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700' },
  Health: { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700' },
  Community: { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-700' },
  Leadership: { bg: 'bg-indigo-100', border: 'border-indigo-500', text: 'text-indigo-700' },
  Sports: { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-700' }
};

export default function Timeline3D() {
  const [activeIndex, setActiveIndex] = useState(6); // Current month (January 2026)
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
          <div className="space-y-8 md:space-y-12">
            {leoYearProjects.map((event, index) => {
              const colors = categoryColors[event.category];
              const isLeft = index % 2 === 0;
              const isActive = index === activeIndex;
              const isPast = index < activeIndex;
              const isFuture = index > activeIndex;

              return (
                <div
                  key={event.id}
                  className={`relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setActiveIndex(index)}
                >
                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center">
                    {/* Left Side */}
                    <div className={`w-5/12 ${isLeft ? 'text-right pr-8' : 'order-3 text-left pl-8'}`}>
                      <div
                        className={`inline-block bg-white rounded-2xl shadow-lg p-6 border-2 transition-all duration-500 transform ${
                          isActive
                            ? `${colors.border} scale-110 shadow-2xl`
                            : isPast
                            ? 'border-gray-300 opacity-70'
                            : 'border-gray-200 opacity-60'
                        } hover:scale-105 cursor-pointer`}
                      >
                        <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-3 ${colors.bg} ${colors.text}`}>
                          {event.category}
                        </div>
                        <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                          {event.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                        <p className="text-gold font-semibold text-sm">{event.month}</p>
                      </div>
                    </div>

                    {/* Center Circle */}
                    <div className="relative z-10 flex-shrink-0 order-2">
                      <div
                        className={`w-8 h-8 rounded-full border-4 transition-all duration-500 ${
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

                    {/* Right Side */}
                    <div className={`w-5/12 ${!isLeft ? 'text-right pr-8' : 'order-1 text-left pl-8'}`}></div>
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
                      <div className="ml-3 w-0.5 h-8 bg-gradient-to-b from-primary to-gold"></div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Legend */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {Object.entries(categoryColors).map(([category, colors]) => (
            <div key={category} className="flex items-center gap-2">
              <div className={`w-4 h-4 rounded-full border-2 ${colors.border} ${colors.bg}`}></div>
              <span className="text-sm text-gray-700 font-medium">{category}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
