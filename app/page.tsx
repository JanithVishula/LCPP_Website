'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import Timeline3D from '@/components/Timeline3D';

export default function Home() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const parallaxRef2 = useRef<HTMLDivElement>(null);
  const [expandedSection, setExpandedSection] = useState<'mission' | 'vision' | null>(null);

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
          <div className="absolute inset-0 bg-primary/70" />
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
            <div className="text-center p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
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
            <div className="text-center p-6 md:p-8 bg-gradient-to-br from-white to-blue-50 border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
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
            <div className="text-center p-6 md:p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
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
      <section className="py-12 md:py-20 bg-gradient-to-b from-white to-blue-50">
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
          <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent flex items-end">
            <div className="container mx-auto px-4">
              <div className="p-8 text-white max-w-5xl">
                <h3 className="text-4xl md:text-5xl font-bold mb-2">Empowering Youth, Serving Communities</h3>
                <p className="text-xl md:text-2xl">Making a difference since our establishment</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 md:mb-12 text-center">About Our Club</h2>
          
          <div className="space-y-8 md:space-y-12">
            {/* Mission & Vision */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div 
                onClick={() => setExpandedSection(expandedSection === 'mission' ? null : 'mission')}
                className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-5 md:p-6 cursor-pointer hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">Our Mission</h3>
                <p className={`text-primary text-sm md:text-base lg:text-lg leading-relaxed transition-all ${expandedSection === 'mission' ? 'block' : 'line-clamp-3'}`}>
                  Leo Club of Pannipitiya Paradise is dedicated to empowering young leaders to serve their 
                  communities, build friendships, and develop essential life skills. We believe in creating 
                  positive change through meaningful service projects and leadership development.
                </p>
                {expandedSection !== 'mission' && (
                  <p className="text-gold text-sm mt-2 font-semibold">Click to read more...</p>
                )}
              </div>

              <div 
                onClick={() => setExpandedSection(expandedSection === 'vision' ? null : 'vision')}
                className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-5 md:p-6 cursor-pointer hover:shadow-xl transition-all transform hover:scale-[1.02]"
              >
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-3 md:mb-4">Our Vision</h3>
                <p className={`text-primary text-sm md:text-base lg:text-lg leading-relaxed transition-all ${expandedSection === 'vision' ? 'block' : 'line-clamp-3'}`}>
                  To be the leading youth service organization in our community, inspiring young people 
                  to make a lasting impact through service, leadership, and community engagement.
                </p>
                {expandedSection !== 'vision' && (
                  <p className="text-gold text-sm mt-2 font-semibold">Click to read more...</p>
                )}
              </div>
            </div>

            {/* Club Highlights (Current Leoistic Year) */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">2025/26 Leoistic Year at a Glance</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-5 md:p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">3</div>
                  <p className="text-primary text-base md:text-lg font-semibold">Projects Completed</p>
                  <p className="text-xs md:text-sm text-gray-600 mt-2">Installation, flood relief, and an international tree plantation drive</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-5 md:p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">400+</div>
                  <p className="text-primary text-base md:text-lg font-semibold">Beneficiaries Reached</p>
                  <p className="text-xs md:text-sm text-gray-600 mt-2">Members, families, and communities across Sri Lanka</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-5 md:p-6 text-center transform hover:scale-105 transition-transform duration-300 sm:col-span-2 md:col-span-1">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">LKR 117,693</div>
                  <p className="text-primary text-base md:text-lg font-semibold">Project Value & Service</p>
                  <p className="text-xs md:text-sm text-gray-600 mt-2">117,693 LKR in value and 231 service hours contributed</p>
                </div>
              </div>
            </div>

            {/* 2025/26 Key Projects */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-4 md:mb-6 text-center">Key Projects This Leoistic Year</h3>
              <p className="text-sm md:text-base text-primary text-center max-w-3xl mx-auto mb-6 md:mb-8">
                So far in the 2025/26 Leoistic year, our focus has been on leadership, disaster relief, and environmental sustainability through three impactful projects.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                {/* ELITE 25 Installation Ceremony */}
                <div className="bg-white border-2 border-primary rounded-xl p-5 md:p-6 flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-lg md:text-xl font-bold text-primary mb-1">ELITE 25 Installation Ceremony</h4>
                  <p className="text-xs md:text-sm text-gray-600 mb-3">20 Sep 2025 • Vidma House, Boralesgamuwa • Club Project</p>
                  <p className="text-sm md:text-base text-primary flex-1 leading-relaxed">
                    Formally inducted the new office bearers of Leo Club ELITE 25, recognized outgoing members, and strengthened ties with guests and the local community, setting a strong leadership foundation for the year.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs md:text-sm text-gray-700">
                    <div>
                      <div className="font-semibold text-primary">Beneficiaries</div>
                      <div>50</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Service Hours</div>
                      <div>120 HRS</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Project Value</div>
                      <div>54,828 LKR</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Participation</div>
                      <div>28 Leos, 8+ guests</div>
                    </div>
                  </div>
                </div>

                {/* Flood Relief Donation Drive – Paradisayae Sahurda Yathra */}
                <div className="bg-white border-2 border-primary rounded-xl p-5 md:p-6 flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-lg md:text-xl font-bold text-primary mb-1">Flood Relief Donation Drive</h4>
                  <p className="text-xs md:text-sm text-gray-600 mb-3">21 Dec 2025 • Colombo • Club Project</p>
                  <p className="text-sm md:text-base text-primary flex-1 leading-relaxed">
                    Raised and handed over donations to Sirasa Sahana Yathra to support families affected by severe flooding, ensuring funds were directed through a trusted national relief initiative for maximum impact.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs md:text-sm text-gray-700">
                    <div>
                      <div className="font-semibold text-primary">Beneficiaries</div>
                      <div>150</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Service Hours</div>
                      <div>105 HRS</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Project Value</div>
                      <div>62,865 LKR</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Participation</div>
                      <div>8 Leos</div>
                    </div>
                  </div>
                </div>

                {/* International Tree Plantation Drive 5.0 */}
                <div className="bg-white border-2 border-primary rounded-xl p-5 md:p-6 flex flex-col shadow-sm hover:shadow-xl transition-shadow duration-300">
                  <h4 className="text-lg md:text-xl font-bold text-primary mb-1">International Tree Plantation Drive 5.0</h4>
                  <p className="text-xs md:text-sm text-gray-600 mb-3">22 Nov 2025 • Piliyandala • International Joint Project</p>
                  <p className="text-sm md:text-base text-primary flex-1 leading-relaxed">
                    Planted over 30 plants in home gardens and local plots as part of a global twinning initiative, promoting long-term environmental stewardship and strengthening international Leo connections.
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-2 text-xs md:text-sm text-gray-700">
                    <div>
                      <div className="font-semibold text-primary">Beneficiaries</div>
                      <div>200</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Service Hours</div>
                      <div>6 HRS</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Project Value</div>
                      <div>0 LKR (personal funds)</div>
                    </div>
                    <div>
                      <div className="font-semibold text-primary">Participation</div>
                      <div>6 Leos</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Gallery Section */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">Our Club in Action</h3>
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
                <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent"></div>
              </div>
            </div>

            {/* Focus Areas */}
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-primary mb-6 text-center">Our Focus Areas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="bg-white border-2 border-primary rounded-xl p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gold text-primary rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                      EDU
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-primary">Education</h4>
                  </div>
                  <p className="text-sm md:text-base text-primary">Supporting underprivileged students with school supplies, library donations, and educational programs.</p>
                </div>
                <div className="bg-white border-2 border-primary rounded-xl p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gold text-primary rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                      ENV
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-primary">Environment</h4>
                  </div>
                  <p className="text-sm md:text-base text-primary">Tree plantation drives, clean-up campaigns, and environmental awareness initiatives.</p>
                </div>
                <div className="bg-white border-2 border-primary rounded-xl p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gold text-primary rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                      COM
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-primary">Community Service</h4>
                  </div>
                  <p className="text-sm md:text-base text-primary">Healthcare visits, elderly care, feeding programs, and disaster relief efforts.</p>
                </div>
                <div className="bg-white border-2 border-primary rounded-xl p-5 md:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gold text-primary rounded-full w-10 h-10 md:w-12 md:h-12 flex items-center justify-center font-bold text-base md:text-lg flex-shrink-0">
                      LEAD
                    </div>
                    <h4 className="text-lg md:text-xl font-bold text-primary">Leadership Development</h4>
                  </div>
                  <p className="text-sm md:text-base text-primary">Training workshops, personality development programs, and skill-building sessions for youth.</p>
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
