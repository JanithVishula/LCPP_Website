'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import Timeline3D from '@/components/Timeline3D';

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const parallaxRef2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.pageYOffset;

      const applyParallax = (parallaxElement: HTMLDivElement) => {
        const rect = parallaxElement.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const scrollPosition = scrolled - elementTop;

        if (scrollPosition > -500 && scrollPosition < rect.height + 500) {
          parallaxElement.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
      };

      if (parallaxRef.current) applyParallax(parallaxRef.current);
      if (parallaxRef2.current) applyParallax(parallaxRef2.current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative z-10 bg-white -mt-20">
      {/* Hero Section */}
      <section className="relative text-white py-20 md:py-32 pt-32 md:pt-44 overflow-hidden">
        <div className="absolute inset-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/Project%20Images/General%20Images/120.jpg)' }}
          />
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 drop-shadow-lg leading-tight">
            Leo Club of <span className="text-gold">Pannipitiya Paradise</span>
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl mb-3 md:mb-4 font-semibold text-gold">
            Leadership • Experience • Opportunity
          </p>
          <p className="text-base sm:text-lg md:text-xl mb-8 md:mb-10 max-w-2xl mx-auto opacity-90 px-4">
            We are young leaders committed to serving our community and making a positive impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4">
            <Link
              href="/join"
              className="w-full sm:w-auto bg-gold text-primary hover:bg-primary hover:text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105 text-center"
            >
              Join Our Club
            </Link>
            <Link
              href="/projects"
              className="w-full sm:w-auto bg-gold text-primary hover:bg-primary hover:text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full shadow-xl transition duration-300 transform hover:scale-105 text-center"
            >
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-12 md:py-20 relative z-10 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="text-center p-6 md:p-8 bg-white border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gold rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">Our Mission</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                To provide youth with opportunities for development and contribution to their communities.
              </p>
            </div>
            <div className="text-center p-6 md:p-8 bg-white border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gold rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">Community Service</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Engaging in meaningful projects that make a real difference in people's lives.
              </p>
            </div>
            <div className="text-center p-6 md:p-8 bg-white border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-14 h-14 md:w-16 md:h-16 bg-gold rounded-full mx-auto mb-3 md:mb-4 flex items-center justify-center">
                <svg className="w-7 h-7 md:w-8 md:h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">Youth Leadership</h3>
              <p className="text-sm md:text-base text-gray-700 leading-relaxed">
                Developing future leaders through hands-on experience and mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Club Section */}
      <section className="py-12 md:py-20 bg-white">
        {/* Full Width Parallax Hero Section */}
        <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] h-[70vh] min-h-[600px] overflow-hidden mb-12">
          <div 
            ref={parallaxRef}
            className="absolute inset-0 w-full h-[120%] bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage: 'url(/Project%20Images/General%20Images/Home%20.jpg)',
              backgroundSize: '100% auto',
              top: '-10%',
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex items-end">
            <div className="container mx-auto px-4">
              <div className="p-8 text-white max-w-5xl">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">Empowering Youth, Serving Communities</h3>
                <p className="text-xl md:text-2xl">Making a difference since our establishment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 md:mb-8 text-center">About Our Club</h2>

          {/* Club Facts as soft cards */}
          <div className="mb-10 md:mb-14">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 lg:gap-8 text-primary">
              {/* Founding */}
              <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft p-5 md:p-6 lg:p-7 flex flex-col gap-4">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary/60">
                  Founding
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-primary/60">Established</p>
                    <p className="text-lg md:text-xl font-semibold mt-0.5">April 2023</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-primary/60">Chartered President</p>
                    <p className="text-lg md:text-xl font-semibold mt-0.5">Leo Lion Thavisha Bandara</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-primary/60">Parent Club</p>
                    <p className="text-lg md:text-xl font-semibold mt-0.5">Lions Club of Pannipitiya Paradise</p>
                  </div>
                </div>
              </div>

              {/* Leadership */}
              <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft p-5 md:p-6 lg:p-7 flex flex-col gap-4">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary/60">
                  Leadership
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-primary/60">Current President</p>
                    <p className="text-lg md:text-xl font-semibold mt-0.5">Leo Lion Onel Herath</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-primary/60">Membership</p>
                    <p className="text-lg md:text-xl font-semibold mt-0.5">64 active and dedicated members</p>
                  </div>
                </div>
              </div>

              {/* Identity */}
              <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft p-5 md:p-6 lg:p-7 flex flex-col gap-4">
                <p className="text-xs md:text-sm font-semibold uppercase tracking-[0.18em] text-primary/60">
                  Identity
                </p>
                <div className="space-y-3">
                  <div>
                    <p className="text-xs md:text-sm font-medium text-primary/60">Region &amp; Zone</p>
                    <p className="text-lg md:text-xl font-semibold mt-0.5">Region 1, Zone 2</p>
                  </div>
                  <div>
                    <p className="text-xs md:text-sm font-medium text-primary/60">Parent Club Family</p>
                    <p className="text-lg md:text-xl font-semibold mt-0.5">Lions Club of Pannipitiya Paradise</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Motto highlight */}
            <div className="mt-6 md:mt-8 flex justify-center">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary text-white px-5 py-3 md:px-7 md:py-4 shadow-soft">
                <span className="text-xs md:text-sm font-medium uppercase tracking-[0.22em] opacity-80">
                  Motto
                </span>
                <span className="text-base md:text-lg lg:text-xl font-semibold">
                  Grow | Together | Strong
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-8 md:space-y-12">
            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 lg:gap-20 items-stretch">
              <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft px-5 py-6 md:px-7 md:py-8 text-center transition-all flex flex-col items-center md:-translate-x-4 lg:-translate-x-8">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-3 md:mb-4 leading-tight">
                  Our Mission
                </h3>
                <div className="max-w-xl md:max-w-lg lg:max-w-xl mx-auto">
                  <p className="text-primary text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose">
                    We empower young people to serve their communities, build meaningful friendships, and
                    grow as confident leaders through impactful service and development opportunities.
                  </p>
                </div>
              </div>

              <div className="bg-white/90 rounded-2xl border border-primary/10 shadow-soft px-5 py-6 md:px-7 md:py-8 text-center transition-all flex flex-col items-center md:translate-x-4 lg:translate-x-8">
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-primary mb-3 md:mb-4 leading-tight">
                  Our Vision
                </h3>
                <div className="max-w-xl md:max-w-lg lg:max-w-xl mx-auto">
                  <p className="text-primary text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose">
                    To be a leading youth service movement in our community, inspiring Leos to create
                    lasting change through service, leadership, and teamwork.
                  </p>
                </div>
              </div>
            </div>

            {/* Photo Gallery Section */}
            <div>
              <div className="relative w-screen left-1/2 right-1/2 -mx-[50vw] h-[70vh] min-h-[600px] overflow-hidden">
                <div
                  ref={parallaxRef2}
                  className="absolute inset-0 w-full h-[120%] bg-contain bg-no-repeat bg-center"
                  style={{
                    backgroundImage: 'url(/Project%20Images/General%20Images/image%2002.jpg)',
                    backgroundSize: '100% auto',
                    top: '-10%',
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/30 to-transparent flex items-end">
                  <div className="container mx-auto px-4 pb-10">
                    <div className="max-w-5xl text-white p-6 md:p-8">
                      <h3 className="text-3xl md:text-4xl font-bold mb-2">Our Club in Action</h3>
                      <p className="text-lg md:text-xl">
                        Moments from our installation, disaster relief, and environmental projects that define the 2025/26 Leoistic year.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-3 text-center">Our Focus Areas</h3>
              <p className="text-sm md:text-base text-primary/80 text-center max-w-3xl mx-auto mb-6 md:mb-8">
                Four pillars guide everything we do as a club – from planning projects to developing our members.
              </p>
              <div className="bg-white/90 rounded-3xl border border-primary/10 shadow-soft p-5 md:p-7 lg:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="relative bg-white rounded-2xl border border-primary/20 shadow-lg shadow-primary/5 p-5 md:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-gold/70">
                    <div className="absolute inset-x-4 top-0 h-1.5 bg-gradient-to-r from-gold via-gold-light to-primary rounded-b-full" />
                    <div className="relative flex items-center gap-3 mb-3 mt-3">
                      <div className="bg-gold text-primary rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                        EDU
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-primary">Education</h4>
                    </div>
                    <p className="relative text-sm md:text-base text-primary/90">
                      Supporting underprivileged students with school supplies, library donations, and educational programs.
                    </p>
                  </div>

                  <div className="relative bg-white rounded-2xl border border-primary/20 shadow-lg shadow-primary/5 p-5 md:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-gold/70">
                    <div className="absolute inset-x-4 top-0 h-1.5 bg-gradient-to-r from-gold via-gold-light to-primary rounded-b-full" />
                    <div className="relative flex items-center gap-3 mb-3 mt-3">
                      <div className="bg-gold text-primary rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                        ENV
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-primary">Environment</h4>
                    </div>
                    <p className="relative text-sm md:text-base text-primary/90">
                      Tree plantation drives, clean-up campaigns, and environmental awareness initiatives.
                    </p>
                  </div>

                  <div className="relative bg-white rounded-2xl border border-primary/20 shadow-lg shadow-primary/5 p-5 md:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-gold/70">
                    <div className="absolute inset-x-4 top-0 h-1.5 bg-gradient-to-r from-gold via-gold-light to-primary rounded-b-full" />
                    <div className="relative flex items-center gap-3 mb-3 mt-3">
                      <div className="bg-gold text-primary rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                        COM
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-primary">Community Service</h4>
                    </div>
                    <p className="relative text-sm md:text-base text-primary/90">
                      Healthcare visits, elderly care, feeding programs, and disaster relief efforts.
                    </p>
                  </div>

                  <div className="relative bg-white rounded-2xl border border-primary/20 shadow-lg shadow-primary/5 p-5 md:p-6 overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:border-gold/70">
                    <div className="absolute inset-x-4 top-0 h-1.5 bg-gradient-to-r from-gold via-gold-light to-primary rounded-b-full" />
                    <div className="relative flex items-center gap-3 mb-3 mt-3">
                      <div className="bg-gold text-primary rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                        LEAD
                      </div>
                      <h4 className="text-lg md:text-xl font-bold text-primary">Leadership Development</h4>
                    </div>
                    <p className="relative text-sm md:text-base text-primary/90">
                      Training workshops, personality development programs, and skill-building sessions for youth.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3D Timeline Section */}
      <Timeline3D />
    </div>
  );
}
