'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface ProjectSuggestion {
  _id: string;
  title: string;
  description: string;
  language: 'en' | 'si';
  targetAudience: string;
  category: string;
  estimatedBudget: string;
  proposedDates: string[];
  beneficiaries: string;
  location: string;
  expectedOutcome: string;
  resources: string[];
  suggestedBy: {
    id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'approved' | 'rejected' | 'under-review';
  submittedAt: string;
  reviewedBy?: {
    id: string;
    name: string;
  };
  reviewedAt?: string;
  reviewNotes?: string;
}

export default function ReviewSuggestionsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [suggestions, setSuggestions] = useState<ProjectSuggestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedSuggestion, setSelectedSuggestion] = useState<ProjectSuggestion | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }

    if (status === 'authenticated') {
      if (session?.user?.role !== 'officer' && session?.user?.role !== 'admin') {
        router.push('/dashboard');
        return;
      }
      fetchSuggestions();
    }
  }, [status, session, filter]);

  const fetchSuggestions = async () => {
    try {
      const url = filter === 'all' 
        ? '/api/suggestions' 
        : `/api/suggestions?status=${filter}`;
      
      const res = await fetch(url);
      const data = await res.json();
      
      if (res.ok) {
        setSuggestions(data.suggestions || []);
      }
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (suggestionId: string, newStatus: 'approved' | 'rejected' | 'under-review') => {
    setProcessing(true);
    try {
      const res = await fetch('/api/suggestions', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          suggestionId,
          status: newStatus,
          reviewNotes,
        }),
      });

      if (res.ok) {
        setSelectedSuggestion(null);
        setReviewNotes('');
        fetchSuggestions();
      }
    } catch (error) {
      console.error('Error reviewing suggestion:', error);
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl animate-pulse">Loading suggestions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8 animate-slide-down">
          <div>
            <h1 className="text-4xl font-bold text-primary mb-2">💡 Project Suggestions</h1>
            <p className="text-gray-600">Review member project ideas</p>
          </div>
          <Link
            href="/admin"
            className="bg-primary text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            ← Back to Admin
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="mb-8 flex gap-3 flex-wrap animate-fade-in">
          {(['pending', 'under-review', 'approved', 'rejected', 'all'] as const).map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                filter === filterOption
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-primary hover:bg-gray-100'
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace('-', ' ')}
              <span className="ml-2 bg-gold text-primary px-2 py-1 rounded-full text-sm">
                {suggestions.filter(s => filterOption === 'all' || s.status === filterOption).length}
              </span>
            </button>
          ))}
        </div>

        {/* Suggestions Grid */}
        {suggestions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <p className="text-xl text-gray-600">No suggestions found in this category</p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion._id}
                onClick={() => setSelectedSuggestion(suggestion)}
                className="bg-white rounded-2xl shadow-lg p-6 cursor-pointer hover-lift animate-scale-in"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-primary flex-1">{suggestion.title}</h3>
                  <span className="text-2xl">{suggestion.language === 'si' ? '🇱🇰' : '🇬🇧'}</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-3">{suggestion.description}</p>
                
                <div className="flex gap-2 flex-wrap mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                    {suggestion.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                    suggestion.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    suggestion.status === 'approved' ? 'bg-green-100 text-green-700' :
                    suggestion.status === 'under-review' ? 'bg-blue-100 text-blue-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {suggestion.status}
                  </span>
                </div>

                <div className="text-sm text-gray-500 border-t pt-3">
                  <p>👤 {suggestion.suggestedBy.name}</p>
                  <p>📅 {new Date(suggestion.submittedAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detail Modal */}
        {selectedSuggestion && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 animate-fade-in" onClick={() => setSelectedSuggestion(null)}>
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-8 animate-scale-in" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-primary mb-2">{selectedSuggestion.title}</h2>
                  <p className="text-gray-500">Suggested by {selectedSuggestion.suggestedBy.name}</p>
                </div>
                <button
                  onClick={() => setSelectedSuggestion(null)}
                  className="text-gray-500 hover:text-primary text-3xl"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-4 rounded-xl">
                  <h4 className="font-bold text-primary mb-2">📝 Description</h4>
                  <p className="text-gray-700">{selectedSuggestion.description}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-primary mb-2">🏷️ Category</h4>
                    <p>{selectedSuggestion.category}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-primary mb-2">👥 Target Audience</h4>
                    <p>{selectedSuggestion.targetAudience || 'Not specified'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-primary mb-2">📍 Location</h4>
                    <p>{selectedSuggestion.location || 'Not specified'}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-primary mb-2">🎯 Beneficiaries</h4>
                    <p>{selectedSuggestion.beneficiaries || 'Not specified'}</p>
                  </div>
                </div>

                {selectedSuggestion.proposedDates.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-primary mb-2">📅 Proposed Dates</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedSuggestion.proposedDates.map((date, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                          {new Date(date).toLocaleDateString()}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSuggestion.estimatedBudget && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-primary mb-2">💰 Estimated Budget</h4>
                    <p>{selectedSuggestion.estimatedBudget}</p>
                  </div>
                )}

                {selectedSuggestion.expectedOutcome && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-primary mb-2">🎯 Expected Outcome</h4>
                    <p>{selectedSuggestion.expectedOutcome}</p>
                  </div>
                )}

                {selectedSuggestion.resources.length > 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <h4 className="font-bold text-primary mb-2">📦 Required Resources</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {selectedSuggestion.resources.map((resource, idx) => (
                        <li key={idx}>{resource}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {selectedSuggestion.status === 'pending' && (
                <>
                  <textarea
                    value={reviewNotes}
                    onChange={(e) => setReviewNotes(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-primary/30 rounded-xl mb-4 focus:ring-4 focus:ring-gold/30"
                    placeholder="Add review notes (optional)..."
                    rows={3}
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleReview(selectedSuggestion._id, 'approved')}
                      disabled={processing}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      ✅ Approve
                    </button>
                    <button
                      onClick={() => handleReview(selectedSuggestion._id, 'under-review')}
                      disabled={processing}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      🔍 Under Review
                    </button>
                    <button
                      onClick={() => handleReview(selectedSuggestion._id, 'rejected')}
                      disabled={processing}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50"
                    >
                      ❌ Reject
                    </button>
                  </div>
                </>
              )}

              {selectedSuggestion.reviewedBy && (
                <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                  <p className="text-sm text-gray-600">
                    Reviewed by <strong>{selectedSuggestion.reviewedBy.name}</strong> on{' '}
                    {new Date(selectedSuggestion.reviewedAt!).toLocaleDateString()}
                  </p>
                  {selectedSuggestion.reviewNotes && (
                    <p className="mt-2 text-sm">
                      <strong>Notes:</strong> {selectedSuggestion.reviewNotes}
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
