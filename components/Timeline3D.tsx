'use client';

import { useEffect, useMemo, useState } from 'react';

interface TimelineEvent {
  id: number;
  month: string;
  title: string;
  description: string;
  category: string;
  date: string;

  summary?: string;
  details?: Array<{ label: string; value: string }>;
  hoverPreviewImage?: string;
  gallery?: {
    prefix: string;
    ext: 'jpg' | 'jpeg' | 'png' | 'webp';
    max: number;
    pad: number;
  };
}

const leoYearProjects: TimelineEvent[] = [
  {
    id: 1,
    month: 'Jul 2025',
    title: 'Sadaham Puja – 10 July 2025',
    description: 'A peaceful religious & cultural service project with community participation.',
    category: 'Community',
    date: '2025-07-10',
    summary:
      'Sadaham Puja is a club project focused on peace, spiritual reflection, and cultural values, bringing members together to serve the community through a respectful religious event.',
    details: [
      { label: 'Project Type', value: 'Club Project' },
      { label: 'Date', value: '2025-07-10' },
      { label: 'Venue', value: 'Vidya Shanthi Maha Pirivena' },
      { label: 'Project Chairman', value: 'Winnath Edirisooriya' },
      { label: 'Secretary', value: 'Sanaya Dewmini' },
      { label: 'Treasurer', value: 'Uvin Kaveesh' },
      {
        label: 'Categories',
        value: 'Best Project for Peace, Religious & Cultural Activities; Most Outstanding Service Project'
      },
      { label: 'Beneficiaries', value: '50' },
      { label: 'Mode of Funds', value: 'Donation' },
      { label: 'Service Hours', value: '20 HRS' },
      { label: 'Participation', value: 'Leos – 10' }
    ],
    hoverPreviewImage: '/SadahamPuja01.jpeg',
    gallery: { prefix: '/SadahamPuja', ext: 'jpeg', max: 20, pad: 2 }
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

function buildGalleryCandidateUrls(gallery: NonNullable<TimelineEvent['gallery']>): string[] {
  const urls: string[] = [];
  for (let i = 1; i <= gallery.max; i += 1) {
    const index = String(i).padStart(gallery.pad, '0');
    urls.push(`${gallery.prefix}${index}.${gallery.ext}`);
  }
  return urls;
}

async function discoverExistingImages(urls: string[]): Promise<string[]> {
  const checks = urls.map(
    (url) =>
      new Promise<string | null>((resolve) => {
        const img = new Image();
        img.onload = () => resolve(url);
        img.onerror = () => resolve(null);
        img.src = url;
      })
  );
  const results = await Promise.all(checks);
  return results.filter((u): u is string => Boolean(u));
}

function TimelineModal({
  event,
  images,
  imagesLoading,
  activeImageIndex,
  onClose,
  onPrevImage,
  onNextImage,
  onSelectImage,
}: {
  event: TimelineEvent;
  images: string[];
  imagesLoading: boolean;
  activeImageIndex: number;
  onClose: () => void;
  onPrevImage: () => void;
  onNextImage: () => void;
  onSelectImage: (index: number) => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/60 transition-opacity"
        aria-label="Close"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-2xl bg-white shadow-2xl border border-gray-200"
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b border-gray-100 px-6 py-4 flex items-start justify-between gap-4">
          <div>
            <div className="text-sm text-gray-500">{event.category}</div>
            <h3 className="text-xl md:text-2xl font-bold text-primary">{event.title}</h3>
          </div>
          <button
            type="button"
            className="shrink-0 inline-flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 hover:bg-gray-50 transition"
            aria-label="Close"
            onClick={onClose}
          >
            <span className="text-xl leading-none">×</span>
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Summary */}
          <div className="bg-gradient-to-br from-blue-50 to-white border border-primary/20 rounded-xl p-5">
            <h4 className="text-lg font-bold text-primary mb-2">Summary</h4>
            <p className="text-gray-700 leading-relaxed">
              {event.summary ?? event.description}
            </p>
          </div>

          {/* Details */}
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="text-lg font-bold text-primary mb-4">Project Details</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
              {(event.details ?? [
                { label: 'Date', value: event.date },
                { label: 'Category', value: event.category },
              ]).map((item) => (
                <div key={item.label} className="flex gap-3">
                  <div className="w-40 text-sm font-semibold text-gray-600">{item.label}:</div>
                  <div className="flex-1 text-sm text-gray-800">{item.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="border border-gray-200 rounded-xl p-5">
            <div className="flex items-center justify-between gap-4 mb-4">
              <h4 className="text-lg font-bold text-primary">Gallery</h4>
              {images.length > 1 && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={onPrevImage}
                    className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition text-sm"
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    onClick={onNextImage}
                    className="px-3 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition text-sm"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {imagesLoading ? (
              <div className="text-gray-600">Loading images…</div>
            ) : images.length === 0 ? (
              <div className="text-gray-600">
                No images found yet. Add files like <span className="font-semibold">sadahampuja01.jpg</span>,
                <span className="font-semibold"> sadahampuja02.jpg</span> to the <span className="font-semibold">public</span> folder.
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-gray-50">
                  <img
                    src={images[Math.min(activeImageIndex, images.length - 1)]}
                    alt={`${event.title} image ${activeImageIndex + 1}`}
                    className="w-full h-[240px] sm:h-[320px] md:h-[420px] object-cover"
                  />
                </div>

                {images.length > 1 && (
                  <div className="flex flex-wrap gap-2">
                    {images.map((url, idx) => (
                      <button
                        key={url}
                        type="button"
                        onClick={() => onSelectImage(idx)}
                        className={`w-3 h-3 rounded-full transition border ${
                          idx === activeImageIndex ? 'bg-primary border-primary' : 'bg-white border-gray-300'
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Timeline3D() {
  const [activeIndex, setActiveIndex] = useState(6); // Current month (January 2026)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [galleryLoading, setGalleryLoading] = useState(false);
  const [galleryActiveIndex, setGalleryActiveIndex] = useState(0);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    if (openIndex === null) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpenIndex(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [openIndex]);

  const openEvent = openIndex === null ? null : leoYearProjects[openIndex];

  const galleryCandidates = useMemo(() => {
    if (!openEvent?.gallery) return [];
    return buildGalleryCandidateUrls(openEvent.gallery);
  }, [openEvent]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setGalleryActiveIndex(0);
      setGalleryImages([]);
      if (!openEvent?.gallery) return;

      setGalleryLoading(true);
      try {
        const found = await discoverExistingImages(galleryCandidates);
        if (!cancelled) setGalleryImages(found);
      } finally {
        if (!cancelled) setGalleryLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [openEvent, galleryCandidates]);

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
              const showHoverPreview = Boolean(event.hoverPreviewImage) && hoverIndex === index;

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
                            {/* Hover image preview (desktop only) */}
                            {event.hoverPreviewImage && (
                              <div
                                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 right-full mr-6 hidden lg:block z-20`}
                              >
                                <div
                                  className={`w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-out ${
                                    showHoverPreview ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                  }`}
                                >
                                  <img
                                    src={event.hoverPreviewImage}
                                    alt={`${event.title} preview`}
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                              </div>
                            )}

                            <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-3 ${colors.bg} ${colors.text}`}>
                              {event.category}
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                              {event.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">{event.description}</p>

                            <div className="flex items-center justify-between mt-4 gap-4">
                              <p className="text-gold font-semibold text-sm">{event.month}</p>
                              <button
                                type="button"
                                className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenIndex(index);
                                }}
                              >
                                More
                              </button>
                            </div>
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
                            {/* Hover image preview (desktop only) */}
                            {event.hoverPreviewImage && (
                              <div
                                className={`pointer-events-none absolute top-1/2 -translate-y-1/2 left-full ml-6 hidden lg:block z-20`}
                              >
                                <div
                                  className={`w-72 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl transition-all duration-300 ease-out ${
                                    showHoverPreview ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                                  }`}
                                >
                                  <img
                                    src={event.hoverPreviewImage}
                                    alt={`${event.title} preview`}
                                    className="w-full h-48 object-cover"
                                  />
                                </div>
                              </div>
                            )}

                            <div className={`inline-block px-4 py-1 rounded-full text-sm font-bold mb-3 ${colors.bg} ${colors.text}`}>
                              {event.category}
                            </div>
                            <h3 className={`text-xl font-bold mb-2 ${isActive ? 'text-primary' : 'text-gray-700'}`}>
                              {event.title}
                            </h3>
                            <p className="text-gray-600 text-sm mb-2">{event.description}</p>

                            <div className="flex items-center justify-between mt-4 gap-4">
                              <p className="text-gold font-semibold text-sm">{event.month}</p>
                              <button
                                type="button"
                                className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setOpenIndex(index);
                                }}
                              >
                                More
                              </button>
                            </div>
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

                        <div className="flex items-center justify-between mt-3 gap-4">
                          <p className="text-gold font-semibold text-sm">{event.month}</p>
                          <button
                            type="button"
                            className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary/90 transition"
                            onClick={(e) => {
                              e.stopPropagation();
                              setOpenIndex(index);
                            }}
                          >
                            More
                          </button>
                        </div>
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

          {openEvent && (
            <TimelineModal
              event={openEvent}
              images={galleryImages}
              imagesLoading={galleryLoading}
              activeImageIndex={galleryActiveIndex}
              onClose={() => setOpenIndex(null)}
              onPrevImage={() =>
                setGalleryActiveIndex((curr) =>
                  galleryImages.length === 0 ? 0 : (curr - 1 + galleryImages.length) % galleryImages.length
                )
              }
              onNextImage={() =>
                setGalleryActiveIndex((curr) =>
                  galleryImages.length === 0 ? 0 : (curr + 1) % galleryImages.length
                )
              }
              onSelectImage={(idx) => setGalleryActiveIndex(idx)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
