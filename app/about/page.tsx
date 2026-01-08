'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';

export default function AboutPage() {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');
  const [activeSection, setActiveSection] = useState('lionism');
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sectionParam) {
      setActiveSection(sectionParam);
    }
  }, [sectionParam]);

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
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
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
            onClick={() => setActiveSection('ourclub')}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeSection === 'ourclub'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
            }`}
          >
            Our Club
          </button>
          <button
            onClick={() => setActiveSection('achievements')}
            className={`px-6 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeSection === 'achievements'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
            }`}
          >
            Achievements & Awards
          </button>
        </div>

        {/* Lionism Section */}
        {activeSection === 'lionism' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">What is Lionism?</h2>
            <div className="space-y-6 text-primary text-lg leading-relaxed">
              <p>
                Lions Clubs International is the world's largest service club organization, with more than 1.4 million members 
                in approximately 48,000 clubs across more than 200 countries and geographic areas around the world.
              </p>
              
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Motto</h3>
                <p className="text-xl italic">"We Serve"</p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">History of Lions Clubs</h3>
                <p>
                  Founded in 1917 by Melvin Jones in Chicago, Illinois, Lions Clubs International has grown to become one of the 
                  most effective and respected service organizations in the world. Melvin Jones, a 38-year-old Chicago business leader, 
                  asked a simple but far-reaching question – "What if people put their talents to work improving their communities?"
                </p>
                <p className="mt-4">
                  Nearly 100 years later, Lions Clubs International is the largest service club organization in the world. The association 
                  of men and women is united in the spirit of unselfish service to others and community betterment.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">What Lions Do</h3>
                <p>
                  Lions serve. Through the commitment and passion of our 1.4 million members, we make a difference in communities around 
                  the world every day. Lions focus on five key service areas:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                  <li><strong>Vision:</strong> Fighting blindness and preserving sight</li>
                  <li><strong>Hunger:</strong> Feeding the hungry</li>
                  <li><strong>Environment:</strong> Protecting the environment</li>
                  <li><strong>Childhood Cancer:</strong> Supporting children with cancer</li>
                  <li><strong>Diabetes:</strong> Reducing the prevalence of diabetes</li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Lions in Sri Lanka</h3>
                <p>
                  Lions Clubs in Sri Lanka are part of Multiple District 306, which comprises four districts serving communities 
                  across the island. Sri Lankan Lions have made significant contributions to healthcare, education, disaster relief, 
                  and community development projects throughout the nation.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Leoism Section */}
        {activeSection === 'leoism' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">What is Leoism?</h2>
            <div className="space-y-6 text-primary text-lg leading-relaxed">
              <p>
                Leo Club is a youth organisation of Lions Club International. The acronym <strong>L.E.O</strong> stands for 
                <strong> Leadership, Experience, Opportunity</strong>.
              </p>
              
              <p>
                The Leo Club objective is to provide the youth of the world with an opportunity for development and contribution, 
                individually and collectively, as responsible members of the local, national and international community.
              </p>

              <p>
                Leo Club encourages the youth to develop leadership qualities by participating in social service activities. 
                They are dependent on a Lions club to sponsor and initiate a Leo club. Leo Club members are addressed as Leos. 
                They conduct various projects in the fields of health care, elders, children, differently abled, literacy and 
                education, and self-development.
              </p>

              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6">
                <p className="text-xl font-bold">
                  LEO Club is the largest youth club of voluntary character in the world, present in 140 countries with over 160,000 members.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">What is the Motto of Leoism?</h3>
                <p>
                  To promote service activities among the youth of the community which will develop the individual qualities of 
                  Leadership, Experience and Opportunity. To unite its members in friendship, fellowship and mutual understanding.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">How Did It All Start?</h3>
                <p>
                  The first Leo Club was founded in 1957 by Jim Graver, the coach of the Abington High School, Pennsylvania baseball team. 
                  He was an active member of the Glenside Lions Club. The club was founded with the help of William Ernst, another local Lion. 
                  It adopted the high school's colours of maroon and gold. The club also created the acronym Leadership, Equality, Opportunity 
                  for the word Leo. The word equality was later changed to Experience.
                </p>
                <p className="mt-4">
                  In 1964 the Leo Club Program became a sponsored program of the Lions District. It grew beyond Pennsylvania and the United States 
                  of America. By 1967 the program had grown to over 200 clubs in 18 countries and had become an official youth program of Lions 
                  Clubs International. In the following year, the Leo Club Program spread rapidly, more than quadrupling in size, to 918 clubs 
                  in 48 countries by the end of 1968.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">How Does It Function?</h3>
                <p>
                  Leo clubs make local communities better places to live through a diverse array of community service projects and fellowship 
                  events which are conducted on a regular basis. It believes in getting people under one banner to help the society as a whole.
                </p>
                
                <div className="mt-4 space-y-4">
                  <div className="bg-white border-2 border-primary rounded-lg p-5">
                    <h4 className="text-xl font-bold mb-2">The Multiple District</h4>
                    <p>
                      Several Districts comprising of their own Leo Clubs form a Multiple District. The highest position a Leo can get is 
                      the position of International Panelist and that is higher than Multiple District presidency.
                    </p>
                    <p className="mt-2 italic">e.g. Leo Multiple District 306 Sri Lanka.</p>
                  </div>

                  <div className="bg-white border-2 border-primary rounded-lg p-5">
                    <h4 className="text-xl font-bold mb-2">The District</h4>
                    <p>
                      Several Leo Clubs in an area make up a District, headed by the District President.
                    </p>
                    <p className="mt-2 italic">
                      e.g. Leo Club of Pannipitiya Paradise is part of District 306-C2 within Multiple District 306.
                    </p>
                  </div>

                  <div className="bg-white border-2 border-primary rounded-lg p-5">
                    <h4 className="text-xl font-bold mb-2">The Club</h4>
                    <p>
                      This is the fundamental level of Leoism. A club, headed by its own President reports to the District which further 
                      reports to the Multiple District.
                    </p>
                    <p className="mt-2 italic">e.g. Leo Club of Pannipitiya Paradise.</p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">Lions Serve. What Do Leos Do?</h3>
                <p>
                  Leos is essentially a service project of the Lions to build responsible future leaders, but that in no way means that 
                  we don't serve. Leoism is focused on fellowship. Fellowship refers to socialisation or precisely secondary socialisation. 
                  We believe that the process of learning what is the appropriate behaviour as a member of a smaller group within the larger 
                  society is an essential part of shaping one's personality.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-primary mb-4">What Age Group Can Join a Leo Club?</h3>
                <p>
                  There are two tracks of the Leo Club Program:
                </p>
                <ul className="list-disc list-inside mt-4 space-y-2 ml-4">
                  <li><strong>Alpha Leo clubs:</strong> Members between 12 and 18 years of age</li>
                  <li><strong>Omega Leo clubs:</strong> Members between 18 and 30 years of age</li>
                </ul>
                <p className="mt-4">
                  The Leo Club Program's maximum age of membership is 30 years of age, though it is at the discretion of the Lions district 
                  to enforce younger upper-age limits for Omega clubs. There are no major differences in the operations or logistics of Alpha 
                  and Omega Leo Clubs.
                </p>
                <p className="mt-4">
                  In addition to the Alpha and Omega tracks, Leo clubs should also designate whether they are school based or community based.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Our Club Section */}
        {activeSection === 'ourclub' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">Leo Club of Pannipitiya Paradise</h2>
            
            <div className="space-y-8">
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

              {/* Mission Section */}
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <p className="text-primary text-lg leading-relaxed">
                  Leo Club of Pannipitiya Paradise is dedicated to empowering young leaders to serve their 
                  communities, build friendships, and develop essential life skills. We believe in creating 
                  positive change through meaningful service projects and leadership development.
                </p>
              </div>

              {/* Vision Section */}
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6">
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-primary text-lg leading-relaxed">
                  To be the leading youth service organization in our community, inspiring young people 
                  to make a lasting impact through service, leadership, and community engagement.
                </p>
              </div>

              {/* Club Highlights */}
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Club Highlights</h3>
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
                <h3 className="text-2xl font-bold text-primary mb-6">Our Focus Areas</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white border-2 border-primary rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        📚
                      </div>
                      <h4 className="text-xl font-bold text-primary">Education</h4>
                    </div>
                    <p className="text-primary">Supporting underprivileged students with school supplies, library donations, and educational programs.</p>
                  </div>
                  <div className="bg-white border-2 border-primary rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        🌱
                      </div>
                      <h4 className="text-xl font-bold text-primary">Environment</h4>
                    </div>
                    <p className="text-primary">Tree plantation drives, clean-up campaigns, and environmental awareness initiatives.</p>
                  </div>
                  <div className="bg-white border-2 border-primary rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        🤝
                      </div>
                      <h4 className="text-xl font-bold text-primary">Community Service</h4>
                    </div>
                    <p className="text-primary">Healthcare visits, elderly care, feeding programs, and disaster relief efforts.</p>
                  </div>
                  <div className="bg-white border-2 border-primary rounded-xl p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-primary text-white rounded-full w-10 h-10 flex items-center justify-center font-bold">
                        💪
                      </div>
                      <h4 className="text-xl font-bold text-primary">Leadership Development</h4>
                    </div>
                    <p className="text-primary">Training workshops, personality development programs, and skill-building sessions for youth.</p>
                  </div>
                </div>
              </div>

              {/* Club Officers */}
              <div>
                <h3 className="text-2xl font-bold text-primary mb-6">Club Officers 2025-2026</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-primary text-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold mb-2">President</h4>
                    <p className="text-lg">[President Name]</p>
                  </div>
                  <div className="bg-primary-light text-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold mb-2">Vice President</h4>
                    <p className="text-lg">[Vice President Name]</p>
                  </div>
                  <div className="bg-primary-light text-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold mb-2">Secretary</h4>
                    <p className="text-lg">[Secretary Name]</p>
                  </div>
                  <div className="bg-primary text-white p-6 rounded-lg shadow-lg">
                    <h4 className="text-xl font-bold mb-2">Treasurer</h4>
                    <p className="text-lg">[Treasurer Name]</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Achievements & Awards Section */}
        {activeSection === 'achievements' && (
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-primary mb-6">Achievements & Awards</h2>
            <div className="space-y-6">
              
              {/* Most Outstanding New Leo Club */}
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary p-6 rounded-xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    🥈
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Most Outstanding New Leo Club</h3>
                    <p className="text-lg text-primary font-semibold">1st Runners Up</p>
                  </div>
                </div>
              </div>

              {/* Best Project for Youth Empowerment */}
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary p-6 rounded-xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    🏆
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Best Project for Youth Empowerment</h3>
                    <p className="text-lg text-primary font-semibold mb-1">Winner</p>
                    <p className="text-primary italic">Skills Up 1.2</p>
                  </div>
                </div>
              </div>

              {/* Best Project for Peace, Religious & Cultural Activities */}
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary p-6 rounded-xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    🥉
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Best Project for Peace, Religious & Cultural Activities</h3>
                    <p className="text-lg text-primary font-semibold mb-1">2nd Runners Up</p>
                    <p className="text-primary italic">Pongal'24</p>
                  </div>
                </div>
              </div>

              {/* Special Appreciation Certificates */}
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">Special Appreciation Certificates for Projects</h3>
                <ul className="space-y-2 text-lg text-primary ml-4">
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>පා රා දීසයේ අවුරු දු</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>මං ගල්ලේ එයා ලා ත් එක්ක දවසක්</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="text-primary text-xl">✓</span>
                    <span>Coast 3.0</span>
                  </li>
                </ul>
              </div>

              {/* District President Appreciation Award */}
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary p-6 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-primary mb-4">District President Appreciation Award</h3>
                <div className="space-y-2 text-lg text-primary">
                  <p><strong>President:</strong> Leo Lion Thavisha Bandara</p>
                  <p><strong>Treasurer:</strong> Leo Lion Lithira Ramuditha</p>
                  <p><strong>Leo Club Advisor:</strong> Lion Chamath C. Jayalath</p>
                  <p><strong>District Council Officer:</strong> Leo Mevindu Basnayake</p>
                  <p className="mt-4 italic">RESILENCIA'24</p>
                </div>
              </div>

              {/* Most Popular Community Based Leo Club */}
              <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary p-6 rounded-xl shadow-lg">
                <div className="flex items-start gap-4">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-bold text-xl flex-shrink-0">
                    ⭐
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-primary mb-2">Most Popular Community Based Leo Club of District 306C2</h3>
                    <p className="text-primary italic">CONFAB'20</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </div>
  );
}
