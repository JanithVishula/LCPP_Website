'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';
import Link from 'next/link';

export default function CreateAccountPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    membershipNumber: '',
    role: 'member',
  });

  if (status === 'loading') {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  // Only admin and officers can access
  if (session?.user?.role !== 'admin' && session?.user?.role !== 'officer') {
    router.push('/dashboard');
    return null;
  }

  const isAdmin = session?.user?.role === 'admin';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          phone: formData.phone,
          membershipNumber: formData.membershipNumber,
          role: formData.role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/members');
      }, 2000);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md animate-scale-in">
          <h2 className="text-2xl font-bold text-primary mb-2">Account Created!</h2>
          <p className="text-gray-600 mb-4">
            New {formData.role} account has been created successfully.
          </p>
          <Link href="/members" className="text-gold hover:underline font-bold">
            View Members
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <BackButton />
        <div className="bg-white rounded-3xl shadow-2xl p-8 animate-slide-up">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-primary mb-2">➕ Create New Account</h1>
            <p className="text-gray-600">
              {isAdmin 
                ? 'Admin can create admin, officer, or member accounts' 
                : 'Officers can create member accounts only'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl animate-shake">
                {error}
              </div>
            )}

            {/* Full Name */}
            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                Full Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all"
                placeholder="John Doe"
                required
                disabled={loading}
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                Email Address *
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all"
                placeholder="john@example.com"
                required
                disabled={loading}
              />
            </div>

            {/* Phone & Membership Number */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all"
                  placeholder="+94 71 234 5678"
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  Membership Number
                </label>
                <input
                  type="text"
                  value={formData.membershipNumber}
                  onChange={(e) => setFormData({ ...formData, membershipNumber: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all"
                  placeholder="LEO-2026-001"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  Password *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all"
                  placeholder="Min. 6 characters"
                  required
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all"
                  placeholder="Re-type password"
                  required
                  disabled={loading}
                />
              </div>
            </div>

            {/* Role Selection */}
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-5 rounded-2xl border-2 border-primary/20">
              <label className="block text-sm font-bold text-primary mb-3">
                Account Role *
              </label>
              <div className="grid grid-cols-3 gap-3">
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'admin' })}
                    className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                      formData.role === 'admin'
                        ? 'bg-red-600 text-white shadow-lg'
                        : 'bg-white text-primary border-2 border-primary/30'
                    }`}
                    disabled={loading}
                  >
                    Admin
                  </button>
                )}
                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, role: 'officer' })}
                    className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                      formData.role === 'officer'
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'bg-white text-primary border-2 border-primary/30'
                    }`}
                    disabled={loading}
                  >
                    Officer
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, role: 'member' })}
                  className={`py-3 px-4 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    formData.role === 'member'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-primary border-2 border-primary/30'
                  } ${!isAdmin ? 'col-span-3' : ''}`}
                  disabled={loading}
                >
                  👤 Member
                </button>
              </div>
              {!isAdmin && (
                <p className="text-xs text-gray-600 mt-2">
                  ℹ️ Officers can only create member accounts
                </p>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
              >
                {loading ? '⏳ Creating...' : '✨ Create Account'}
              </button>
              <Link
                href="/members"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-primary font-bold py-4 px-8 rounded-xl transition-all duration-300 text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
