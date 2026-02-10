'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const leoismGallery = [
  {
    src: '/Project%20Images/General%20Images/Home%20.jpg',
    alt: 'Leo Club of Pannipitiya Paradise group photo',
    label: 'Our club family – united in service and fellowship',
  },
  {
    src: '/Project%20Images/General%20Images/image%2001.jpg',
    alt: 'Leos engaging in a club activity',
    label: 'Hands-on projects that build leadership and teamwork',
  },
  {
    src: '/Project%20Images/General%20Images/image%2002.jpg',
    alt: 'Leos at a community service event',
    label: 'Serving our community while creating lifelong memories',
  },
];

const projectGallery = [
  {
    src: '/Project%20Images/ELITE%2025/202510061423151722794723.jpeg',
    alt: 'ELITE 25 project activity',
    label: 'ELITE 25 – Annual Club Installation Ceremony',
  },
  {
    src: '/Project%20Images/International%20Tree%20Plantation%20Drive/202601122006121190925964.jpeg',
    alt: 'International Tree Plantation Drive',
    label: 'International Tree Plantation Drive – Caring for our environment',
  },
  {
    src: '/Project%20Images/Sadaham%20Puja%202025/SadahamPuja01.jpeg',
    alt: 'Sadaham Puja spiritual service project',
    label: 'Sadaham Puja 2025 – Spiritual and cultural harmony',
  },
];

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState('lionism');
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.pageYOffset;
        const parallaxElement = parallaxRef.current;
        const rect = parallaxElement.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const scrollPosition = scrolled - elementTop;
        
        if (scrollPosition > -500 && scrollPosition < rect.height + 500) {
          parallaxElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-primary mb-8 text-center">About Us</h1>
        
        {/* Category Tabs */}
        <div className="flex justify-center flex-wrap mb-12 gap-4">
          <button
            onClick={() => setActiveSection('lionism')}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeSection === 'lionism'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
            }`}
          >
            Lionism
          </button>
          <button
            onClick={() => setActiveSection('leoism')}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeSection === 'leoism'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
            }`}
          >
            Leoism
          </button>
          <button
            onClick={() => setActiveSection('structure')}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeSection === 'structure'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
            }`}
          >
            Structure & Membership
          </button>
          <button
            onClick={() => setActiveSection('club')}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeSection === 'club'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
            }`}
          >
            Leo Club of Pannipitiya Paradise
          </button>
        </div>

        {/* Tab 1 – Lionism */}
        {activeSection === 'lionism' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">Lionism</h2>
            <div className="mb-8 rounded-2xl overflow-hidden shadow-soft border border-primary/10 bg-white">
              <Image
                src="/other%20images/Lionism/service%20image.webp"
                alt="Lions Clubs International serving the community"
                width={1200}
                height={700}
                className="w-full h-56 md:h-72 lg:h-80 object-cover"
                priority
              />
            </div>
            <div className="space-y-10 text-primary">
              {/* What is Lionism */}
              <section className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold">What is Lionism</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  Lions Clubs International is the world&apos;s largest service club organization, with more than 1.4 million
                  members in around 48,000 clubs across over 200 countries and geographic areas. Lions are people who come
                  together to serve, lead, and create positive change in their communities and beyond.
                </p>
              </section>

              {/* Our Motto */}
              <section className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold">Our Motto</h3>
                <div className="inline-flex items-center gap-3 rounded-full bg-primary text-white px-5 py-3 md:px-7 md:py-4 shadow-soft">
                  <span className="text-xs md:text-sm font-medium uppercase tracking-[0.22em] opacity-80">Lions Motto</span>
                  <span className="text-base md:text-lg lg:text-xl font-semibold italic">“We Serve”</span>
                </div>
              </section>

              {/* History of Lions Clubs */}
              <section className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold">History of Lions Clubs</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  Lionism began in 1917 when Chicago businessman Melvin Jones asked a simple question:
                  “What if people put their talents to work improving their communities?” From that idea, Lions Clubs
                  International grew into a global network of volunteers committed to service.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  Today, Lions are recognized worldwide for their dedication to humanitarian service and community
                  betterment, working together across borders, cultures, and languages.
                </p>
              </section>

              {/* What Lions Do */}
              <section className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold">What Lions Do</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  Lions serve where the need is greatest. Through hands-on service projects, fundraising, and
                  partnerships, Lions focus on five global causes:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  <div className="bg-white border border-primary/10 rounded-xl p-4 shadow-soft">
                    <h4 className="text-lg font-semibold mb-1">Vision</h4>
                    <p className="text-sm md:text-base">Preventing blindness, restoring sight, and supporting eye health.</p>
                  </div>
                  <div className="bg-white border border-primary/10 rounded-xl p-4 shadow-soft">
                    <h4 className="text-lg font-semibold mb-1">Hunger</h4>
                    <p className="text-sm md:text-base">Providing meals and support to individuals and families in need.</p>
                  </div>
                  <div className="bg-white border border-primary/10 rounded-xl p-4 shadow-soft">
                    <h4 className="text-lg font-semibold mb-1">Environment</h4>
                    <p className="text-sm md:text-base">Protecting and restoring the environment for future generations.</p>
                  </div>
                  <div className="bg-white border border-primary/10 rounded-xl p-4 shadow-soft">
                    <h4 className="text-lg font-semibold mb-1">Childhood Cancer</h4>
                    <p className="text-sm md:text-base">Supporting children and families affected by childhood cancer.</p>
                  </div>
                  <div className="bg-white border border-primary/10 rounded-xl p-4 shadow-soft sm:col-span-2">
                    <h4 className="text-lg font-semibold mb-1">Diabetes</h4>
                    <p className="text-sm md:text-base">Raising awareness and helping reduce the impact of diabetes.</p>
                  </div>
                </div>
              </section>

              {/* Lions in Sri Lanka */}
              <section className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold">Lions in Sri Lanka</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  In Sri Lanka, Lions serve under Multiple District 306, which includes several districts across the island.
                  Sri Lankan Lions are known for their contributions to healthcare, education, disaster relief, and long-term
                  community development.
                </p>
              </section>
            </div>
          </div>
        )}

        {/* Tab 2 – Leoism */}
        {activeSection === 'leoism' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">Leoism</h2>
            <div className="mb-8 flex justify-center">
              <div className="rounded-2xl overflow-hidden shadow-soft border border-primary/10 bg-white px-6 py-6 md:px-10 md:py-8 flex items-center justify-center">
                <Image
                  src="/other%20images/Leiosm/leo%20logo.jpg"
                  alt="Leo Club logo"
                  width={320}
                  height={320}
                  className="h-32 w-auto md:h-40 object-contain"
                />
              </div>
            </div>
            <div className="space-y-10 text-primary">
              {/* What is Leoism */}
              <section className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold">What is Leoism</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  Leo Clubs are the official youth program of Lions Clubs International. They bring together
                  young people who want to serve their communities, develop leadership skills, and build
                  lifelong friendships through service.
                </p>
                <div className="mt-3 inline-flex flex-wrap items-center gap-3 rounded-full bg-primary/5 border border-primary/10 px-4 py-2">
                  <span className="text-xs md:text-sm font-medium uppercase tracking-[0.22em] text-primary/70">
                    L.E.O
                  </span>
                  <span className="text-sm md:text-base font-semibold text-primary">Leadership</span>
                  <span className="text-sm md:text-base font-semibold text-primary">• Experience</span>
                  <span className="text-sm md:text-base font-semibold text-primary">• Opportunity</span>
                </div>
              </section>

              {/* Leo Motto & Purpose */}
              <section className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold">Leo Motto &amp; Purpose</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  The purpose of Leoism is to give young people opportunities for personal development and
                  contribution&mdash;locally, nationally, and globally. Leos promote service activities that help
                  them grow in Leadership, Experience, and Opportunity, while building strong friendships and
                  fellowship.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  Leos work alongside Lions, organising projects in areas such as health, education, children,
                  elders, and community development.
                </p>
              </section>

              {/* History of Leoism */}
              <section className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold">History of Leoism</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  The first Leo Club was founded in 1957 at Abington High School, Pennsylvania, by baseball
                  coach Jim Graver, with support from the Glenside Lions Club. The club adopted the school
                  colours maroon and gold, and the name LEO originally stood for Leadership, Equality,
                  Opportunity&mdash;later updated to Leadership, Experience, Opportunity.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  In 1967, Leo clubs became an official youth program of Lions Clubs International. Within
                  just a few years, the program expanded rapidly across countries, growing into one of the
                  largest voluntary youth movements in the world.
                </p>
              </section>

              {/* How Leo Clubs Function */}
              <section className="space-y-3">
                <h3 className="text-2xl md:text-3xl font-semibold">How Leo Clubs Function</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  Leo Clubs are sponsored by Lions Clubs and operate under their guidance. Each club has its
                  own executive committee, plans service projects, and organises fellowship events throughout
                  the year. Together, Leos learn to lead, manage projects, and work as a team.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  The structure of Leoism&mdash;from club level up to district and multiple district level&mdash;is
                  designed to give young people real leadership experience in an international organisation.
                </p>
              </section>

              {/* Youth Leadership, Service & Fellowship */}
              <section className="space-y-4">
                <h3 className="text-2xl md:text-3xl font-semibold">Youth Leadership, Service &amp; Fellowship</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  Leoism is about more than projects&mdash;it is about shaping character. Through planning,
                  leading, and serving together, Leos develop confidence, communication skills, and a strong
                  sense of responsibility to their communities.
                </p>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl">
                  The friendships and networks built in Leoism often last a lifetime, creating a global
                  community of young leaders connected by shared values and service.
                </p>
              </section>

              {/* Our Club in Pictures */}
              <section>
                <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6 text-center">Leo Life in Our Club</h3>
                <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto text-center text-primary/80 mb-5 md:mb-6">
                  A few moments from our own Leo Club of Pannipitiya Paradise&mdash;capturing friendship,
                  teamwork, and the joy of serving together.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                  {leoismGallery.map((item, index) => (
                    <div
                      key={index}
                      className="group rounded-2xl overflow-hidden border border-primary/10 bg-white/90 shadow-soft flex flex-col h-full"
                    >
                      <div className="relative h-40 md:h-44">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="px-4 py-3 flex-1 flex items-center">
                        <p className="text-sm md:text-base text-primary leading-relaxed">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Tab 4 – Leo Club of Pannipitiya Paradise */}
        {activeSection === 'club' && (
          <div>
            {/* Full Width Parallax Hero Section */}
            <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] h-[60vh] min-h-[420px] overflow-hidden">
              <div 
                ref={parallaxRef}
                className="absolute inset-0 w-full h-[120%] bg-contain bg-no-repeat bg-center"
                style={{
                  backgroundImage: 'url(/Project%20Images/General%20Images/se.jpg)',
                  backgroundSize: '100% auto',
                  top: '-10%',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent flex items-end">
                <div className="container mx-auto px-4">
                  <div className="p-8 text-white max-w-4xl">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-3 leading-tight">
                      Leo Club of Pannipitiya Paradise
                    </h3>
                    <p className="text-lg md:text-xl lg:text-2xl opacity-90">
                      Young leaders serving our community with passion, purpose, and unity.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 mt-10 md:mt-14 space-y-10 md:space-y-14">
              {/* Mission & Vision */}
              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft px-6 py-7 md:px-8 md:py-9 text-center flex flex-col items-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-3 md:mb-4 leading-tight">
                    Our Mission
                  </h3>
                  <p className="text-primary text-base md:text-lg leading-relaxed md:leading-loose max-w-md">
                    We empower young leaders to serve the community, build meaningful friendships, and
                    grow as confident individuals through impactful service and development.
                  </p>
                </div>
                <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft px-6 py-7 md:px-8 md:py-9 text-center flex flex-col items-center">
                  <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-3 md:mb-4 leading-tight">
                    Our Vision
                  </h3>
                  <p className="text-primary text-base md:text-lg leading-relaxed md:leading-loose max-w-md">
                    To be a leading youth service club in our community, inspiring Leos to create
                    lasting change through service, leadership, and teamwork.
                  </p>
                </div>
              </section>

              {/* Club Highlights */}
              <section>
                <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6 text-center">Club Highlights</h3>
                <div className="grid md:grid-cols-3 gap-5 md:gap-6">
                  <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft p-6 text-center">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">64</p>
                    <p className="text-primary text-base md:text-lg font-semibold">Active Members</p>
                    <p className="text-xs md:text-sm text-primary/70 mt-2">Committed Leos serving together</p>
                  </div>
                  <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft p-6 text-center">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">3+</p>
                    <p className="text-primary text-base md:text-lg font-semibold">Major Projects</p>
                    <p className="text-xs md:text-sm text-primary/70 mt-2">Flagship initiatives each Leoistic year</p>
                  </div>
                  <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft p-6 text-center">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">400+</p>
                    <p className="text-primary text-base md:text-lg font-semibold">Lives Impacted</p>
                    <p className="text-xs md:text-sm text-primary/70 mt-2">Beneficiaries reached through service</p>
                  </div>
                </div>
              </section>

              {/* Focus Areas */}
              <section>
                <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6 text-center">Our Focus Areas</h3>
                <div className="grid md:grid-cols-2 gap-5 md:gap-6">
                  <div className="bg-white border border-primary/10 rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        📚
                      </div>
                      <h4 className="text-lg md:text-xl font-semibold text-primary">Education</h4>
                    </div>
                    <p className="text-sm md:text-base text-primary leading-relaxed">
                      Supporting underprivileged students through school supplies, learning resources, and educational
                      initiatives.
                    </p>
                  </div>
                  <div className="bg-white border border-primary/10 rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        🌱
                      </div>
                      <h4 className="text-lg md:text-xl font-semibold text-primary">Environment</h4>
                    </div>
                    <p className="text-sm md:text-base text-primary leading-relaxed">
                      Tree plantation drives, clean-up campaigns, and awareness programs for a greener future.
                    </p>
                  </div>
                  <div className="bg-white border border-primary/10 rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        🤝
                      </div>
                      <h4 className="text-lg md:text-xl font-semibold text-primary">Community Service</h4>
                    </div>
                    <p className="text-sm md:text-base text-primary leading-relaxed">
                      Health camps, elder care, food distribution, and targeted relief efforts for those in need.
                    </p>
                  </div>
                  <div className="bg-white border border-primary/10 rounded-2xl p-6 shadow-soft">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        💪
                      </div>
                      <h4 className="text-lg md:text-xl font-semibold text-primary">Leadership Development</h4>
                    </div>
                    <p className="text-sm md:text-base text-primary leading-relaxed">
                      Training, workshops, and hands-on opportunities that build confident young leaders.
                    </p>
                  </div>
                </div>
              </section>

              {/* Project Gallery */}
              <section>
                <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-2 text-center">
                  <Link
                    href="/projects"
                    className="inline-block hover:text-primary/80 hover:underline underline-offset-4 cursor-pointer transition-colors"
                  >
                    Our Projects in Action
                  </Link>
                </h3>
                <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto text-center text-primary/80 mb-5 md:mb-6">
                  A glimpse of some of our signature projects, capturing the spirit of service, teamwork,
                  and youth leadership at the Leo Club of Pannipitiya Paradise.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-5">
                  {projectGallery.map((item, index) => (
                    <div
                      key={index}
                      className="group rounded-2xl overflow-hidden border border-primary/10 bg-white/90 shadow-soft flex flex-col h-full"
                    >
                      <div className="relative h-44 md:h-52">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="px-4 py-3 flex-1 flex items-center">
                        <p className="text-sm md:text-base text-primary leading-relaxed">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Club Officers */}
              <section>
                <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6 text-center">Club Officers 2025–2026</h3>
                <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                  <div className="bg-primary text-white p-5 md:p-6 rounded-2xl shadow-soft text-center">
                    <h4 className="text-base md:text-lg font-semibold mb-1">President</h4>
                    <p className="text-sm md:text-base">[President Name]</p>
                  </div>
                  <div className="bg-primary text-white p-5 md:p-6 rounded-2xl shadow-soft text-center">
                    <h4 className="text-base md:text-lg font-semibold mb-1">Vice President</h4>
                    <p className="text-sm md:text-base">[Vice President Name]</p>
                  </div>
                  <div className="bg-primary text-white p-5 md:p-6 rounded-2xl shadow-soft text-center">
                    <h4 className="text-base md:text-lg font-semibold mb-1">Secretary</h4>
                    <p className="text-sm md:text-base">[Secretary Name]</p>
                  </div>
                  <div className="bg-primary text-white p-5 md:p-6 rounded-2xl shadow-soft text-center">
                    <h4 className="text-base md:text-lg font-semibold mb-1">Treasurer</h4>
                    <p className="text-sm md:text-base">[Treasurer Name]</p>
                  </div>
                </div>
              </section>

              {/* Achievements & Awards */}
              <section>
                <h3 className="text-2xl md:text-3xl font-semibold text-primary mb-6 text-center">Achievements &amp; Awards</h3>
                <div className="space-y-5">
                  <div className="bg-white/90 border border-primary/10 rounded-2xl p-6 shadow-soft flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        🥈
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary/70 uppercase tracking-[0.18em]">
                          1st Runners Up
                        </p>
                        <h4 className="text-lg md:text-xl font-semibold text-primary">
                          Most Outstanding New Leo Club
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 border border-primary/10 rounded-2xl p-6 shadow-soft flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        🏆
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary/70 uppercase tracking-[0.18em]">
                          Winner
                        </p>
                        <h4 className="text-lg md:text-xl font-semibold text-primary">
                          Best Project for Youth Empowerment
                        </h4>
                        <p className="text-sm md:text-base text-primary/80 mt-1 italic">Skills Up 1.2</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 border border-primary/10 rounded-2xl p-6 shadow-soft flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        🥉
                      </div>
                      <div>
                        <p className="text-sm font-medium text-primary/70 uppercase tracking-[0.18em]">
                          2nd Runners Up
                        </p>
                        <h4 className="text-lg md:text-xl font-semibold text-primary">
                          Best Project for Peace, Religious &amp; Cultural Activities
                        </h4>
                        <p className="text-sm md:text-base text-primary/80 mt-1 italic">Pongal&apos;24</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white/90 border border-primary/10 rounded-2xl p-6 shadow-soft flex flex-col gap-3">
                    <h4 className="text-lg md:text-xl font-semibold text-primary mb-1">
                      Special Appreciation Certificates for Projects
                    </h4>
                    <ul className="space-y-1 text-sm md:text-base text-primary">
                      <li className="flex items-center gap-2">
                        <span className="text-primary text-lg">✓</span>
                        <span>පා රා දීසයේ අවුරු දු</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary text-lg">✓</span>
                        <span>මං ගල්ලේ එයා ලා ත් එක්ක දවසක්</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-primary text-lg">✓</span>
                        <span>Coast 3.0</span>
                      </li>
                    </ul>
                  </div>

                  <div className="bg-white/90 border border-primary/10 rounded-2xl p-6 shadow-soft flex flex-col gap-3">
                    <h4 className="text-lg md:text-xl font-semibold text-primary mb-1">
                      District President Appreciation Award
                    </h4>
                    <div className="space-y-1 text-sm md:text-base text-primary">
                      <p><strong>President:</strong> Leo Lion Thavisha Bandara</p>
                      <p><strong>Treasurer:</strong> Leo Lion Lithira Ramuditha</p>
                      <p><strong>Leo Club Advisor:</strong> Lion Chamath C. Jayalath</p>
                      <p><strong>District Council Officer:</strong> Leo Mevindu Basnayake</p>
                      <p className="mt-2 italic text-primary/80">RESILENCIA&apos;24</p>
                    </div>
                  </div>

                  <div className="bg-white/90 border border-primary/10 rounded-2xl p-6 shadow-soft flex flex-col gap-3">
                    <div className="flex items-center gap-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg flex-shrink-0">
                        ⭐
                      </div>
                      <div>
                        <h4 className="text-lg md:text-xl font-semibold text-primary">
                          Most Popular Community Based Leo Club of District 306 C2
                        </h4>
                        <p className="text-sm md:text-base text-primary/80 mt-1 italic">CONFAB&apos;20</p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        {/* Tab 3 – Structure & Membership */}
        {activeSection === 'structure' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 text-center">Structure &amp; Membership</h2>
            <div className="space-y-10 text-primary">
              {/* Organisational Levels */}
              <section className="space-y-5">
                <h3 className="text-2xl md:text-3xl font-semibold text-center">How Leoism is Organised</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
                  <div className="bg-white border border-primary/10 rounded-2xl p-5 md:p-6 shadow-soft flex flex-col gap-2">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary/60 text-center">
                      Multiple District
                    </p>
                    <p className="text-sm md:text-base leading-relaxed text-center">
                      Several Leo districts together form a Multiple District, which coordinates large-scale
                      programs and represents Leos at national or regional level.
                    </p>
                    <p className="text-xs md:text-sm italic text-primary/70 text-center mt-1">
                      e.g. Leo Multiple District 306 Sri Lanka
                    </p>
                  </div>

                  <div className="bg-white border border-primary/10 rounded-2xl p-5 md:p-6 shadow-soft flex flex-col gap-2">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary/60 text-center">
                      District
                    </p>
                    <p className="text-sm md:text-base leading-relaxed text-center">
                      A district is made up of several Leo Clubs in a geographic area and is led by a
                      District President and cabinet of officers.
                    </p>
                    <p className="text-xs md:text-sm italic text-primary/70 text-center mt-1">
                      e.g. Leo Club of Pannipitiya Paradise is in District 306 C2
                    </p>
                  </div>

                  <div className="bg-white border border-primary/10 rounded-2xl p-5 md:p-6 shadow-soft flex flex-col gap-2">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary/60 text-center">
                      Club Level
                    </p>
                    <p className="text-sm md:text-base leading-relaxed text-center">
                      The club is the core of Leoism&mdash;where members plan projects, elect leaders, and
                      serve their local community.
                    </p>
                    <p className="text-xs md:text-sm italic text-primary/70 text-center mt-1">
                      e.g. Leo Club of Pannipitiya Paradise
                    </p>
                  </div>
                </div>
              </section>

              {/* Membership Tracks */}
              <section className="space-y-5">
                <h3 className="text-2xl md:text-3xl font-semibold text-center">Membership Tracks</h3>
                <p className="text-base md:text-lg leading-relaxed max-w-3xl mx-auto text-center">
                  The Leo Club Program offers two age tracks so that young people can serve and grow
                  alongside peers at similar stages of life.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                  <div className="bg-primary text-white rounded-2xl p-5 md:p-6 shadow-soft flex flex-col gap-2">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] opacity-80">
                      Alpha Leo Clubs
                    </p>
                    <p className="text-lg md:text-xl font-semibold">Ages 12–18</p>
                    <p className="text-sm md:text-base leading-relaxed">
                      Focused on introducing younger members to service, teamwork, and early leadership
                      experiences in a supportive environment.
                    </p>
                  </div>
                  <div className="bg-white border border-primary/10 rounded-2xl p-5 md:p-6 shadow-soft flex flex-col gap-2">
                    <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary/70">
                      Omega Leo Clubs
                    </p>
                    <p className="text-lg md:text-xl font-semibold text-primary">Ages 18–30</p>
                    <p className="text-sm md:text-base leading-relaxed text-primary">
                      Designed for young adults who take on greater project, leadership, and mentoring
                      responsibilities while continuing active community service.
                    </p>
                  </div>
                </div>
                <p className="text-sm md:text-base leading-relaxed max-w-3xl mx-auto text-center text-primary/80">
                  The maximum age for Leo membership is 30. Clubs may also be designated as school-based or
                  community-based, depending on how they are formed and sponsored.
                </p>
              </section>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
