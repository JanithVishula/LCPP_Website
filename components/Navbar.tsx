'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <nav className="bg-gradient-to-r from-primary via-primary-dark to-primary text-white shadow-2xl fixed top-0 left-0 right-0 z-[100] backdrop-blur-sm border-b-4 border-gold">
      <div className="w-full px-6 lg:px-12">
        <div className="flex justify-between items-center py-3">
          {/* Logo/Brand - Far Left Corner */}
          <div className="flex-shrink-0 flex items-center gap-3">
            <img src="/Screenshot 2026-01-08 015922.png" alt="Leo Club Logo" className="h-12 w-12 object-contain" />
            <Link href="/" className="text-2xl font-bold hover:scale-105 transition-transform">
              <span className="text-gold">Leo Club</span> of Pannipitiya Paradise
            </Link>
          </div>

          {/* Desktop Menu - Far Right Corner */}
          <div className="hidden md:flex space-x-2 items-center">
            <Link href="/" className="px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
              Home
            </Link>
            
            {/* About Dropdown */}
            <div 
              className="relative group"
            >
              <Link href="/about" className="px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold flex items-center gap-1">
                About
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full left-0 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="bg-white text-primary rounded-lg shadow-xl py-2 min-w-[200px]">
                  <Link href="/about?section=lionism" className="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300">
                    Lionism
                  </Link>
                  <Link href="/about?section=leoism" className="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300">
                    Leoism
                  </Link>
                  <Link href="/about?section=ourclub" className="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300">
                    Our Club
                  </Link>
                  <Link href="/about?section=achievements" className="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300">
                    Achievements & Awards
                  </Link>
                </div>
              </div>
            </div>

            {/* Projects Dropdown */}
            <div 
              className="relative group"
            >
              <Link href="/projects" className="px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold flex items-center gap-1">
                Projects
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </Link>
              <div className="absolute top-full left-0 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                <div className="bg-white text-primary rounded-lg shadow-xl py-2 min-w-[150px]">
                  <Link href="/projects?year=2023-24" className="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300">
                    2023-24
                  </Link>
                  <Link href="/projects?year=2024-25" className="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300">
                    2024-25
                  </Link>
                  <Link href="/projects?year=2025-26" className="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300">
                    2025-26
                  </Link>
                </div>
              </div>
            </div>

            {status === 'authenticated' && (
              <>
                <Link href="/events" className="px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
                  Events
                </Link>
                <Link href="/blog" className="px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
                  Blog
                </Link>
                <Link href="/members" className="px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
                  Members
                </Link>
              </>
            )}

            <Link href="/contact" className="px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
              Contact
            </Link>
            <Link href="/donate" className="px-4 py-2 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
              Donate
            </Link>
            
            {/* User Menu - Shows name if logged in */}
            {status === 'authenticated' && session?.user ? (
              <div className="relative group">
                <Link href="/dashboard" className="bg-gold text-primary hover:bg-gold-dark hover:text-white px-6 py-2 rounded-lg transition-all duration-300 font-bold shadow-lg ml-2 flex items-center gap-2">
                  {session.user.name}
                </Link>
                <div className="absolute top-full right-0 pt-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200">
                  <div className="bg-white text-primary rounded-lg shadow-xl py-2 min-w-[200px]">
                    <Link href="/dashboard" className="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300">
                      Dashboard
                    </Link>
                    {(session.user.role === 'admin' || session.user.role === 'officer') && (
                      <Link href="/admin" className="block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300">
                        Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={() => signOut({ callbackUrl: '/' })}
                      className="w-full text-left block px-4 py-2 hover:bg-primary hover:text-white transition-all duration-300"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/login" className="bg-gold text-primary hover:bg-gold-dark hover:text-white px-6 py-2 rounded-lg transition-all duration-300 font-bold shadow-lg ml-2">
                Member Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
              Home
            </Link>
            <Link href="/about" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
              About
            </Link>
            <Link href="/projects" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
              Projects
            </Link>
            <Link href="/parent-club" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
              Parent Club
            </Link>
            <Link href="/join" className="block py-2 px-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold">
              Join/Donate
            </Link>
            
            {/* Mobile User Menu */}
            {status === 'authenticated' && session?.user ? (
              <>
                <Link href="/dashboard" className="block py-2 mt-2 bg-gold text-primary hover:bg-gold-dark hover:text-white px-4 rounded-lg transition-all duration-300 font-bold shadow-lg">
                  {session.user.name}
                </Link>
                <button 
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="w-full text-left block py-2 px-4 rounded-lg hover:bg-white hover:text-primary transition-all duration-300 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/login" className="block py-2 mt-2 bg-white text-primary hover:bg-primary-light hover:text-white px-4 rounded-lg transition-all duration-300 font-bold shadow-lg">
                Member Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
