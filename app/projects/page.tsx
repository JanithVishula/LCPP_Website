'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ProjectsPage() {
  const [activeYear, setActiveYear] = useState('2024-25');
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = 'unset';
    setTimeout(() => setSelectedProject(null), 300);
  };

  const projects2024_25 = [
    {
      id: 1,
      title: "Sadaham Puja'24",
      date: "01/06/2024 - Ongoing",
      description: "The Bodhi Puja organized at Hunupitiya Gangarama Temple, aimed at seeking blessings for the Leoistic year 2024/2025. It brought together Leos, their families, and members from the Leo Club of Negombo Catamaran, fostering spiritual growth and community engagement.",
    },
    {
      id: 2,
      title: "Sadaham Puja'24 : Phase 02",
      date: "26/11/2024",
      description: "The Seth Pirith Pooja, held at the Temple of the Tooth Relic in Kandy, was organized to bless A/L students and the wider community. The spiritually enriching event fostered unity and provided participants with peace, motivation, and renewed strength.",
    },
    {
      id: 3,
      title: "Orientation Programme",
      date: "14/07/2024",
      description: "The two orientation programmes held in July equipped both executive and general members with leadership skills and unity for the year ahead.",
    },
    {
      id: 4,
      title: "ELITE'24 : Annual Club Installation Ceremony",
      date: "15/09/2024",
      description: "ELITE'24, held at Vidma Hall, Boralesgamuwa, was a milestone installation ceremony where the club's charter certificate was officially presented, marking a proud moment for Leo Club of Pannipitiya Paradise.",
    },
    {
      id: 5,
      title: "Pasalata Saviyak",
      date: "31/01/2025",
      description: "The Leo Club of Pannipitiya Paradise donated emulsion paint to enhance a classroom at Henry Steel Olcott Vidyalaya, improving the learning environment for students.",
    },
    {
      id: 6,
      title: "Pasalata Saviyak : Phase 02",
      date: "04/02/2025",
      description: "At Ananda Samarakoon Vidyalaya, Wewala, Leos painted school benches and initiated volleyball court restoration, contributing to better facilities for students.",
    },
    {
      id: 7,
      title: "PATH TO LEAD : PHASE 01",
      date: "08-09/11/2024",
      description: "A successful service project at Sri Subhuthi National School, aimed at enhancing leadership skills and personal development among school's prefects through workshops and training sessions.",
    },
    {
      id: 8,
      title: "PATH TO LEAD : PHASE 02",
      date: "13-14/12/2024",
      description: "Held at Bonavista National College, Unawatuna, this two-day leadership and personality development program empowered prefects through workshops, training sessions, etiquette lessons, and drug prevention awareness.",
    },
    {
      id: 9,
      title: "Senehase Avurudu",
      date: "18/04/2025",
      description: "Held at Camilla School, Mattegoda, and hosted with five other Leo Clubs, this was a compassionate and festive Inter District New Year celebration.",
    },
    {
      id: 10,
      title: "HEALING HEARTS",
      date: "25/12/2024",
      description: "A compassionate Christmas visit to Apeksha Cancer Hospital in Maharagama, where donations for 100 children were distributed with the support of members, Lions, and Governor Lion Gaya Upasena.",
    },
    {
      id: 11,
      title: "Walk For Peace",
      date: "31/08/2024",
      description: "A symbolic march bringing together Lions and Leos to raise awareness against child harassment, led by District Governor Lion Ranjith Fernando.",
    },
    {
      id: 12,
      title: "Feed the Paws",
      date: "29/12/2024 & 30/04/2025",
      description: "A compassionate initiative carried out in two phases, focusing on alleviating hunger among stray dogs through the preparation and distribution of specially made meal parcels.",
    },
    {
      id: 13,
      title: "SOBA 2024",
      date: "02/01/2025",
      description: "Tree plantation project contributing to environmental conservation and sustainability in the local community.",
    },
    {
      id: 14,
      title: "International Twinning Tree Plantation Drive 4.0",
      date: "20/04/2025",
      description: "In collaboration with Leo Club of Diphu Aspire (Leo District 322 D), planted over 30 trees in members' neighborhoods, contributing to global sustainability while strengthening international Leo bonds.",
    },
    {
      id: 15,
      title: "Book Donation Project",
      date: "30/04/2025",
      description: "Donated over 400 quality books to underserved army and pirivena libraries through Mr. Kalana Chandimal Wakista.",
    },
    {
      id: 16,
      title: "Igenumata Athwalak",
      date: "31/01/2025",
      description: "Book donation project at Henry Olcott Maha Vidyalaya to support underprivileged students with essential educational materials, led by Co-Chairpersons Leo Hasindu Induwara and Leo Matheesha De Silva.",
    },
  ];

  const projects2023_24 = [
    {
      id: 1,
      title: "Coming Soon",
      date: "2023-24",
      description: "Project details for the 2023-24 Leoistic year will be added soon.",
    },
  ];

  const projects2025_26 = [
    {
      id: 1,
      title: "Upcoming Projects",
      date: "2025-26",
      description: "Stay tuned for exciting new projects in the 2025-26 Leoistic year!",
    },
  ];

  const getCurrentProjects = () => {
    switch (activeYear) {
      case '2023-24':
        return projects2023_24;
      case '2024-25':
        return projects2024_25;
      case '2025-26':
        return projects2025_26;
      default:
        return projects2024_25;
    }
  };

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-primary mb-4 text-center">Our Projects</h1>
        <p className="text-center text-primary mb-12 max-w-2xl mx-auto">
          Discover the impactful projects we've undertaken to serve our community and make a difference.
        </p>

        {/* Year Tabs */}
        <div className="flex justify-center mb-12 gap-4">
          <button
            onClick={() => setActiveYear('2023-24')}
            className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeYear === '2023-24'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
            }`}
          >
            2023-24
          </button>
          <button
            onClick={() => setActiveYear('2024-25')}
            className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeYear === '2024-25'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
            }`}
          >
            2024-25
          </button>
          <button
            onClick={() => setActiveYear('2025-26')}
            className={`px-8 py-3 rounded-lg font-bold transition-all duration-300 ${
              activeYear === '2025-26'
                ? 'bg-primary text-white shadow-lg'
                : 'bg-white text-primary border-2 border-primary hover:bg-primary hover:text-white'
            }`}
          >
            2025-26
          </button>
        </div>

        {/* Projects Tree Layout */}
        <div className="max-w-7xl mx-auto px-4">
          <div className="relative">
            {/* Tree Trunk Visual */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-2 bg-primary opacity-20 h-full hidden lg:block"></div>
            
            {/* Projects as Tree Branches */}
            <div className="space-y-8">
              {getCurrentProjects().map((project, index) => {
                // Varying sizes for tree branch effect
                const sizes = ['col-span-3', 'col-span-2', 'col-span-4', 'col-span-2', 'col-span-3'];
                const size = sizes[index % sizes.length];
                const alignments = ['justify-start', 'justify-end', 'justify-start', 'justify-end'];
                const alignment = alignments[index % alignments.length];
                
                return (
                  <div key={project.id} className={`flex ${alignment}`}>
                    <div
                      onClick={() => openModal(project)}
                      className={`cursor-pointer bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:border-gold p-6 ${
                        index % 3 === 0 ? 'lg:w-[600px]' : index % 3 === 1 ? 'lg:w-[450px]' : 'lg:w-[500px]'
                      } w-full max-w-[600px]`}
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-gold rounded-full"></div>
                          <h2 className="text-xl font-bold text-primary">{project.title}</h2>
                        </div>
                        <svg className="w-6 h-6 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                      <p className="text-sm text-primary font-semibold opacity-75 mb-3">{project.date}</p>
                      <p className="text-gray-700 leading-relaxed line-clamp-3">{project.description}</p>
                      <div className="mt-4 text-gold font-semibold flex items-center gap-2">
                        <span>Read More</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Popup */}
        {isModalOpen && selectedProject && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={closeModal}
          >
            <div 
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-gradient-to-r from-primary to-primary-light text-white p-6 rounded-t-2xl border-b-4 border-gold">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-3xl font-bold mb-2">{selectedProject.title}</h2>
                    <p className="text-gold font-semibold text-lg">{selectedProject.date}</p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="text-white hover:text-gold transition-colors ml-4"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-8">
                <div className="prose max-w-none">
                  <div className="bg-gradient-to-br from-blue-50 to-white border-2 border-primary rounded-xl p-6 mb-6">
                    <h3 className="text-2xl font-bold text-primary mb-4">Project Description</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{selectedProject.description}</p>
                  </div>

                  {/* Additional Project Details */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-white border-2 border-primary rounded-xl p-6">
                      <h4 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                          <span className="text-primary text-sm">DT</span>
                        </div>
                        Date
                      </h4>
                      <p className="text-gray-700">{selectedProject.date}</p>
                    </div>
                    
                    <div className="bg-white border-2 border-primary rounded-xl p-6">
                      <h4 className="text-xl font-bold text-primary mb-3 flex items-center gap-2">
                        <div className="w-8 h-8 bg-gold rounded-full flex items-center justify-center">
                          <span className="text-primary text-sm">CT</span>
                        </div>
                        Category
                      </h4>
                      <p className="text-gray-700">Community Service</p>
                    </div>
                  </div>

                  {/* Call to Action */}
                  <div className="mt-8 bg-gradient-to-r from-primary to-primary-light text-white p-6 rounded-xl text-center">
                    <h3 className="text-2xl font-bold mb-3">Get Involved!</h3>
                    <p className="mb-4">Want to be part of impactful projects like this?</p>
                    <Link 
                      href="/join" 
                      className="inline-block bg-gold text-primary hover:bg-gold-dark font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
                      onClick={closeModal}
                    >
                      Join Our Club
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-primary to-primary-light text-white py-12 rounded-2xl shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Want to Get Involved?</h2>
          <p className="mb-6 text-lg">Join us in our upcoming projects and make a real difference!</p>
          <Link href="/join" className="bg-white text-primary hover:bg-opacity-90 font-bold py-3 px-8 rounded-full shadow-xl hover:shadow-2xl transition duration-300 inline-block transform hover:scale-105">
            Join Our Club
          </Link>
        </div>
      </div>
    </div>
  );
}
