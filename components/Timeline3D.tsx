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
  galleryUrls?: string[];
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
      { label: 'Project Secretary', value: 'Sanaya Dewmini' },
      { label: 'Project Treasurer', value: 'Uvin Kaveesh' }
    ],
    hoverPreviewImage: '/Project%20Images/Sadaham%20Puja%202025/SadahamPuja01.jpeg',
    gallery: {
      prefix: '/Project%20Images/Sadaham%20Puja%202025/SadahamPuja',
      ext: 'jpeg',
      max: 20,
      pad: 2,
    }
  },
 
  {
    id: 2,
    month: 'Sep 2025',
    title: 'Senehe Piruna Pitu – 06 Sep 2025',
    description: 'Supporting underprivileged students by donating 1,000 CR books (120 pages).',
    category: 'Education',
    date: '2025-09-06',
    summary:
      '“Senehe Piruna Pitu” was conducted to support underprivileged students at Mahiyanganaya Kovilyaya Vidyalaya by providing essential educational materials. With the support of the Yuthukama Organization and additional donors, Leos participated in distributing 1,000 CR books, uplifting learning opportunities and strengthening community collaboration.',
    details: [
      { label: 'Project Type', value: 'Club Project' },
      { label: 'Date', value: '2025-09-06' },
      { label: 'Venue', value: 'Mahiyanganaya Kovilyaya Vidyalaya' },
      { label: 'Project Chairman', value: 'Vimuth Methmina' },
      { label: 'Project Secretary', value: 'Anuga Kumarajeewa' },
      { label: 'Project Treasurer', value: 'Onel Herath' }
    ],
    hoverPreviewImage: '/Project%20Images/Senehe%20Piruna%20Pitu/202509090025441359396179.jpeg',
    galleryUrls: [
      '/Project%20Images/Senehe%20Piruna%20Pitu/202509090025441359396179.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/20250909114736638600007.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/20250909114833543531545.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/202509091153241455692918.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/202509091154452002035646.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/202510092045521903323878.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/202510092046391837341903.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/20251009204731781330478.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/202510092107132468342.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/202510092108021794907401.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/202510092111141808225620.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/202510092111311643513280.jpeg',
      '/Project%20Images/Senehe%20Piruna%20Pitu/202510092112051064708016.jpeg'
    ]
  },

  {
    id: 3,
    month: 'Sep 2025',
    title: 'ELITE 25 Installation Ceremony – 20 Sep 2025',
    description:
      'Formal installation ceremony of Leo Club ELITE 25 with leadership transition and recognition of outgoing members.',
    category: 'Leadership',
    date: '2025-09-20',
    summary:
      'The ELITE 25 Installation Ceremony formally inducted the newly elected office bearers of the Leo Club of Pannipitiya Paradise',
    details: [
      { label: 'Project Type', value: 'Club Project' },
      { label: 'Date', value: '2025-09-20' },
      { label: 'Venue', value: 'Vidma House, Boralesgamuwa' },
      { label: 'Project Chairman', value: 'Winnath Edirisooriya' },
      { label: 'Project Secretary', value: 'Sesadi Dilshara' },
      { label: 'Project Treasurer', value: 'Hasindu Induwara' },
    ],
    hoverPreviewImage: '/Project%20Images/ELITE%2025/202510061423151722794723.jpeg',
    galleryUrls: [
      '/Project%20Images/ELITE%2025/202510061423151722794723.jpeg',
      '/Project%20Images/ELITE%2025/20251006142358729209400.jpeg',
      '/Project%20Images/ELITE%2025/20251006142438199798937.jpeg',
      '/Project%20Images/ELITE%2025/20251006142517328323101.jpeg',
      '/Project%20Images/ELITE%2025/202510061426051118596416.jpeg',
      '/Project%20Images/ELITE%2025/202510092040312028265676.jpeg',
      '/Project%20Images/ELITE%2025/202510092041142048999142.jpeg',
      '/Project%20Images/ELITE%2025/20251009204436256080095.jpeg',
    ],
  },

  {
    id: 4,
    month: 'Nov 2025',
    title: 'International Tree Plantation Drive – 22 Nov 2025',
    description:
      'International tree planting initiative supporting reforestation and environmental awareness across multiple Leo clubs.',
    category: 'Environment',
    date: '2025-11-22',
    summary:
      'The International Tree Plantation Drive 5.0 was a global environmental initiative where the Leo Club of Pannipitiya Paradise joined with international partner clubs to promote reforestation and climate action.',
    details: [
      { label: 'Project Type', value: 'Club Project' },
      { label: 'Date', value: '2025-11-22' },
      { label: 'Venue', value: 'Piliyandala' },
      { label: 'Project Chairman', value: 'Winnath Edirisooriya' },
      { label: 'Project Secretary', value: 'Janith Vishula' },
      { label: 'Project Treasurer', value: 'Matheesha De Silva' },
    ],
    hoverPreviewImage:
      '/Project%20Images/International%20Tree%20Plantation%20Drive/202601122006121190925964.jpeg',
    galleryUrls: [
      '/Project%20Images/International%20Tree%20Plantation%20Drive/202601122006121190925964.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/20260112200737899589340.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/202601122009211639179907.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/202601122009391941820572.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/20260112201117146957406.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/202601122011471161910028.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/202601122012131307866075.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/202601122013451441891787.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/20260112201435665349504.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/20260112201535441753713.jpeg',
      '/Project%20Images/International%20Tree%20Plantation%20Drive/202601152202091996883195.jpeg',
    ],
  },

  {
    id: 5,
    month: 'Dec 2025',
    title: 'Paradisaye Sahurda Yathra Flood Relief – 21 Dec 2025',
    description:
      'Flood relief donation drive supporting Sirasa Sahana Yathra to aid affected communities across Sri Lanka.',
    category: 'Community',
    date: '2025-12-21',
    summary:
      'Paradisaye Sahurda Yathra was a focused flood relief donation drive organized by the Leo Club of Pannipitiya Paradise to support families affected by severe flooding in Sri Lanka.',
    details: [
      { label: 'Project Type', value: 'Club Project' },
      { label: 'Date', value: '2025-12-21' },
      { label: 'Venue', value: 'Colombo' },
      { label: 'Project Chairman', value: 'Anuga Kumarajeewa' },
      { label: 'Project Secretary', value: 'Matheesha De Silva' },
      { label: 'Project Treasurer', value: 'Hasindu Induwara & Onel Herath' },
    ],
    hoverPreviewImage:
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/202601122049011662332658.jpeg',
    galleryUrls: [
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/202601122049011662332658.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/202601122049571431762039.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/20260112205202223714041.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/202601122052491670935903.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/20260112205440780965981.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/20260112205513186027367.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/202601152223061825038494.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/20260115222720309334382.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/20260115222737689942931.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/20260115223739144643106.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/20260115224205315589977.jpeg',
      '/Project%20Images/Paradisaye%20Sahurda%20Yathra/20260115232414506820802.jpeg',
    ],
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
                <div className="relative overflow-hidden rounded-xl border border-gray-200 bg-black flex items-center justify-center">
                  <img
                    src={images[Math.min(activeImageIndex, images.length - 1)]}
                    alt={`${event.title} image ${activeImageIndex + 1}`}
                    className="max-h-[70vh] w-auto h-auto object-contain"
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
    if (!openEvent) return [];
    if (openEvent.galleryUrls && openEvent.galleryUrls.length > 0) return openEvent.galleryUrls;
    if (!openEvent.gallery) return [];
    return buildGalleryCandidateUrls(openEvent.gallery);
  }, [openEvent]);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setGalleryActiveIndex(0);
      setGalleryImages([]);
      if (galleryCandidates.length === 0) return;

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
                            className={`relative flex flex-col w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 border-2 md:min-h-40 transition-all duration-500 transform ${
                              isActive
                                ? `${colors.border} shadow-2xl`
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
                                  className={`w-72 overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-2xl transition-all duration-300 ease-out flex items-center justify-center ${
                                    showHoverPreview ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'
                                  }`}
                                >
                                  <img
                                    src={event.hoverPreviewImage}
                                    alt={`${event.title} preview`}
                                    className="max-h-48 w-auto h-auto object-contain"
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

                            <div className="flex items-center justify-between mt-auto pt-4 gap-4">
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
                            className={`relative flex flex-col w-full max-w-lg bg-white rounded-2xl shadow-lg p-6 border-2 md:min-h-40 transition-all duration-500 transform ${
                              isActive
                                ? `${colors.border} shadow-2xl`
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
                                  className={`w-72 overflow-hidden rounded-2xl border border-gray-200 bg-black shadow-2xl transition-all duration-300 ease-out flex items-center justify-center ${
                                    showHoverPreview ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                                  }`}
                                >
                                  <img
                                    src={event.hoverPreviewImage}
                                    alt={`${event.title} preview`}
                                    className="max-h-48 w-auto h-auto object-contain"
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

                            <div className="flex items-center justify-between mt-auto pt-4 gap-4">
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
                        className={`flex-1 flex flex-col bg-white rounded-xl shadow-lg p-5 border-2 transition-all duration-500 ${
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

                        <div className="flex items-center justify-between mt-auto pt-3 gap-4">
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
