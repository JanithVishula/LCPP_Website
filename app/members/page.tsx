'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface User {
  _id: string;
  name: string;
  email: string;
  membershipNumber?: string;
  phone?: string;
  role: string;
  joinedDate: string;
}

export default function MembersPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [members, setMembers] = useState<User[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

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
    if (searchTerm) {
      const filtered = members.filter(
        (member) =>
          member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.membershipNumber?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredMembers(filtered);
    } else {
      setFilteredMembers(members);
    }
  }, [searchTerm, members]);

  const fetchMembers = async () => {
    try {
      // Using the user stats API to get member list
      const res = await fetch('/api/user/stats');
      const data = await res.json();
      
      if (data.users) {
        setMembers(data.users);
        setFilteredMembers(data.users);
      }
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading members...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold text-primary mb-8 text-center">
          Member Directory
        </h1>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by name, email, or membership number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-6 py-4 text-lg border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6 text-gray-600">
          Showing {filteredMembers.length} of {members.length} members
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredMembers.map((member) => (
            <div key={member._id} className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl font-bold mr-4">
                  {member.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="text-xl font-bold text-primary">{member.name}</h2>
                  <span className="inline-block px-3 py-1 text-xs bg-secondary text-primary rounded-full">
                    {member.role}
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  <span className="font-semibold">Email:</span>{' '}
                  <a href={`mailto:${member.email}`} className="text-primary hover:underline">
                    {member.email}
                  </a>
                </p>
                {member.membershipNumber && (
                  <p>
                    <span className="font-semibold">Member #:</span> {member.membershipNumber}
                  </p>
                )}
                {member.phone && (
                  <p>
                    <span className="font-semibold">Phone:</span>{' '}
                    <a href={`tel:${member.phone}`} className="text-primary hover:underline">
                      {member.phone}
                    </a>
                  </p>
                )}
                <p>
                  <span className="font-semibold">Joined:</span>{' '}
                  {new Date(member.joinedDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>

        {filteredMembers.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-500 text-lg">No members found</p>
          </div>
        )}
      </div>
    </div>
  );
}
