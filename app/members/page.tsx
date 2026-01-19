'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface User {
  _id: string;
  name: string;
  email: string;
  membershipNumber?: string;
  phone?: string;
  role: string;
  joinedDate: string;
  active: boolean;
}

export default function MembersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [members, setMembers] = useState<User[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState<'all' | 'admin' | 'officer' | 'member'>('all');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      fetchMembers();
    }
  }, [status]);

  useEffect(() => {
    let filtered = members;

    // Filter by role
    if (filterRole !== 'all') {
      filtered = filtered.filter(m => m.role === filterRole);
    }

    // Filter by search
    if (searchTerm) {
      filtered = filtered.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.membershipNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredMembers(filtered);
  }, [searchTerm, filterRole, members]);

  const fetchMembers = async () => {
    try {
      const res = await fetch('/api/members');
      const data = await res.json();
      
      if (data.members) {
        setMembers(data.members);
        setFilteredMembers(data.members);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch(role) {
      case 'admin': return 'bg-red-600 text-white';
      case 'officer': return 'bg-blue-600 text-white';
      default: return 'bg-gray-200 text-primary';
    }
  };

  const getRoleIcon = (role: string) => {
    switch(role) {
      case 'admin': return '👑';
      case 'officer': return '👮';
      default: return '👤';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl animate-pulse">Loading members...</div>
      </div>
    );
  }

  const isAdminOrOfficer = session?.user?.role === 'admin' || session?.user?.role === 'officer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 animate-slide-down">
          <div>
            <h1 className="text-5xl font-bold text-primary mb-2">👥 Member Directory</h1>
            <p className="text-gray-600">Leo Club of Pannipitiya Paradise</p>
          </div>
          {isAdminOrOfficer && (
            <Link
              href="/members/create"
              className="bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              ➕ Create Account
            </Link>
          )}
        </div>

        {/* Search & Filter */}
        <div className="mb-8 space-y-4 animate-fade-in">
          <input
            type="text"
            placeholder="🔍 Search by name, email, or membership number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-lg border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold shadow-soft"
          />

          {/* Role Filter */}
          <div className="flex gap-3 flex-wrap">
            {(['all', 'admin', 'officer', 'member'] as const).map((role) => (
              <button
                key={role}
                onClick={() => setFilterRole(role)}
                className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                  filterRole === role
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-white text-primary hover:bg-gray-100 shadow-soft'
                }`}
              >
                {role === 'all' ? '🌐 All' : role === 'admin' ? '👑 Admins' : role === 'officer' ? '👮 Officers' : '👤 Members'}
                <span className="ml-2 bg-gold text-primary px-2 py-1 rounded-full text-sm">
                  {role === 'all' ? members.length : members.filter(m => m.role === role).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 animate-fade-in-delay">
          <div className="bg-white rounded-xl p-4 shadow-soft text-center">
            <div className="text-3xl font-bold text-primary">{members.length}</div>
            <div className="text-sm text-gray-600">Total Members</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-soft text-center">
            <div className="text-3xl font-bold text-red-600">{members.filter(m => m.role === 'admin').length}</div>
            <div className="text-sm text-gray-600">Admins</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-soft text-center">
            <div className="text-3xl font-bold text-blue-600">{members.filter(m => m.role === 'officer').length}</div>
            <div className="text-sm text-gray-600">Officers</div>
          </div>
          <div className="bg-white rounded-xl p-4 shadow-soft text-center">
            <div className="text-3xl font-bold text-green-600">{members.filter(m => m.active).length}</div>
            <div className="text-sm text-gray-600">Active</div>
          </div>
        </div>

        <div className="mb-6 text-gray-600">
          Showing {filteredMembers.length} of {members.length} members
        </div>

        {/* Members Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <div key={member._id} className="bg-white rounded-2xl shadow-lg p-6 hover-lift animate-scale-in">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary to-blue-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mr-4 shadow-lg">
                    {member.name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-primary">{member.name}</h2>
                    <span className={`inline-block px-3 py-1 text-xs font-bold rounded-full mt-1 ${getRoleBadgeColor(member.role)}`}>
                      {getRoleIcon(member.role)} {member.role.toUpperCase()}
                    </span>
                  </div>
                </div>
                {member.active ? (
                  <span className="w-3 h-3 bg-green-500 rounded-full" title="Active"></span>
                ) : (
                  <span className="w-3 h-3 bg-gray-400 rounded-full" title="Inactive"></span>
                )}
              </div>

              <div className="space-y-3 text-sm">
                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">📧 Email</p>
                  <a href={`mailto:${member.email}`} className="text-primary hover:text-blue-600 font-semibold break-all">
                    {member.email}
                  </a>
                </div>

                {member.phone && (
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">📱 Phone</p>
                    <a href={`tel:${member.phone}`} className="text-primary hover:text-blue-600 font-semibold">
                      {member.phone}
                    </a>
                  </div>
                )}

                {member.membershipNumber && (
                  <div className="bg-gray-50 p-3 rounded-xl">
                    <p className="text-xs text-gray-500 mb-1">🎫 Membership</p>
                    <p className="text-primary font-bold">{member.membershipNumber}</p>
                  </div>
                )}

                <div className="bg-gray-50 p-3 rounded-xl">
                  <p className="text-xs text-gray-500 mb-1">📅 Joined</p>
                  <p className="text-primary font-semibold">
                    {new Date(member.joinedDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {Math.floor((new Date().getTime() - new Date(member.joinedDate).getTime()) / (1000 * 60 * 60 * 24 * 30))} months ago
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600">No members found</p>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
}
