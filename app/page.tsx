'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
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
  }, []);

  return (
    <div className="relative z-10 bg-white -mt-20">
      {/* Hero Section */}
      <section className="relative text-white py-32 pt-44 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(/image%2001.jpg)' }}></div>
          <div className="absolute inset-0 bg-primary/70"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl font-bold mb-6 drop-shadow-lg">Leo Club of <span className="text-gold">Pannipitiya Paradise</span></h1>
          <p className="text-2xl mb-4 font-semibold text-gold">Leadership • Experience • Opportunity</p>
          <p className="text-xl mb-10 max-w-2xl mx-auto opacity-90">
            We are young leaders committed to serving our community and making a positive impact.
          </p>
          <div className="flex gap-6 justify-center">
            <Link href="/join" className="bg-gold text-primary hover:bg-gold-dark hover:text-white font-bold py-4 px-8 rounded-full shadow-xl hover:shadow-2xl transition duration-300 transform hover:scale-105">
              Join Our Club
            </Link>
            <Link href="/projects" className="bg-transparent border-3 border-gold text-gold hover:bg-gold hover:text-primary font-bold py-4 px-8 rounded-full shadow-xl transition duration-300 transform hover:scale-105">
              View Projects
            </Link>
          </div>
        </div>
      </section>

      {/* Quick Info Section */}
      <section className="py-20 relative z-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
              <p className="text-gray-700 leading-relaxed">
                To provide youth with opportunities for development and contribution to their communities.
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-white to-blue-50 border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Community Service</h3>
              <p className="text-gray-700 leading-relaxed">
                Engaging in meaningful projects that make a real difference in people's lives.
              </p>
            </div>
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-2xl shadow-xl hover:shadow-2xl transition duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-gold rounded-full mx-auto mb-4 flex items-center justify-center">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-4">Youth Leadership</h3>
              <p className="text-gray-700 leading-relaxed">
                Developing future leaders through hands-on experience and mentorship.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Club Section */}
      <section className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="text-4xl font-bold text-primary mb-12 text-center">About Our Club</h2>
          
          <div className="space-y-12">
            {/* Parallax Hero Section */}
            <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-2xl">
              <div 
                ref={parallaxRef}
                className="absolute inset-0 w-full h-[800px] bg-cover bg-center"
                style={{
                  backgroundImage: 'url(/se.jpg)',
                  top: '-150px',
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/50 to-transparent flex items-end">
                <div className="p-8 text-white">
                  <h3 className="text-4xl font-bold mb-2">Empowering Youth, Serving Communities</h3>
                  <p className="text-xl">Making a difference since our establishment</p>
                </div>
              </div>
            </div>

            {/* Mission & Vision */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-primary text-lg leading-relaxed">
                  Leo Club of Pannipitiya Paradise is dedicated to empowering young leaders to serve their 
                  communities, build friendships, and develop essential life skills. We believe in creating 
                  positive change through meaningful service projects and leadership development.
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-primary text-lg leading-relaxed">
                  To be the leading youth service organization in our community, inspiring young people 
                  to make a lasting impact through service, leadership, and community engagement.
                </p>
              </div>
            </div>

            {/* Club Highlights */}
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6 text-center">Club Highlights</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl font-bold text-primary mb-2">150+</div>
                  <p className="text-primary text-lg font-semibold">Active Members</p>
                  <p className="text-sm text-gray-600 mt-2">Dedicated volunteers serving the community</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl font-bold text-primary mb-2">50+</div>
                  <p className="text-primary text-lg font-semibold">Projects Completed</p>
                  <p className="text-sm text-gray-600 mt-2">Impactful initiatives across multiple sectors</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 text-center transform hover:scale-105 transition-transform duration-300">
                  <div className="text-5xl font-bold text-primary mb-2">5000+</div>
                  <p className="text-primary text-lg font-semibold">Lives Touched</p>
                  <p className="text-sm text-gray-600 mt-2">Community members directly impacted</p>
                </div>
              </div>
            </div>

            {/* Focus Areas */}
            <div>
              <h3 className="text-3xl font-bold text-primary mb-6 text-center">Our Focus Areas</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-white border-2 border-primary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gold text-primary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
                      📚
                    </div>
                    <h4 className="text-xl font-bold text-primary">Education</h4>
                  </div>
                  <p className="text-primary">Supporting underprivileged students with school supplies, library donations, and educational programs.</p>
                </div>
                <div className="bg-white border-2 border-primary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gold text-primary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
                      🌱
                    </div>
                    <h4 className="text-xl font-bold text-primary">Environment</h4>
                  </div>
                  <p className="text-primary">Tree plantation drives, clean-up campaigns, and environmental awareness initiatives.</p>
                </div>
                <div className="bg-white border-2 border-primary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gold text-primary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
                      🤝
                    </div>
                    <h4 className="text-xl font-bold text-primary">Community Service</h4>
                  </div>
                  <p className="text-primary">Healthcare visits, elderly care, feeding programs, and disaster relief efforts.</p>
                </div>
                <div className="bg-white border-2 border-primary rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-gold text-primary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
                      💪
                    </div>
                    <h4 className="text-xl font-bold text-primary">Leadership Development</h4>
                  </div>
                  <p className="text-primary">Training workshops, personality development programs, and skill-building sessions for youth.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
