'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SuggestProjectPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    language: 'en',
    targetAudience: '',
    category: 'community-service',
    estimatedBudget: '',
    proposedDate1: '',
    proposedDate2: '',
    proposedDate3: '',
    beneficiaries: '',
    location: '',
    expectedOutcome: '',
    requiredResources: '',
  });

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center">
          <p className="text-xl text-primary mb-4">Please log in to suggest a project</p>
          <Link href="/login" className="text-gold hover:underline font-bold">Go to Login</Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const proposedDates = [
        formData.proposedDate1,
        formData.proposedDate2,
        formData.proposedDate3,
      ].filter(date => date); // Remove empty dates

      const resources = formData.requiredResources
        .split('\n')
        .filter(r => r.trim())
        .map(r => r.trim());

      const res = await fetch('/api/suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          language: formData.language,
          targetAudience: formData.targetAudience,
          category: formData.category,
          estimatedBudget: formData.estimatedBudget,
          proposedDates,
          beneficiaries: formData.beneficiaries,
          location: formData.location,
          expectedOutcome: formData.expectedOutcome,
          resources,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit suggestion');
      }

      setSuccess(true);
      setTimeout(() => {
        router.push('/dashboard');
      }, 2500);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary to-primary-dark">
        <div className="bg-white p-8 rounded-2xl shadow-2xl text-center max-w-md animate-fade-in">
          <div className="text-6xl mb-4">✅</div>
          <h2 className="text-2xl font-bold text-primary mb-2">Suggestion Submitted!</h2>
          <p className="text-gray-600 mb-4">
            Your project idea has been sent to officers for review. You'll be notified of the decision soon.
          </p>
          <Link href="/dashboard" className="text-gold hover:underline font-bold">
            Back to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-blue-50 to-orange-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 animate-slide-up">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-3 animate-fade-in">
              💡 Suggest a Project
            </h1>
            <p className="text-lg text-gray-600 animate-fade-in-delay">
              Have an idea for a community service project? Share it with us! Officers will review your suggestion and help bring it to life.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-100 border-2 border-red-400 text-red-700 px-4 py-3 rounded-xl animate-shake">
                {error}
              </div>
            )}

            {/* Language Selection */}
            <div className="bg-gradient-to-r from-blue-50 to-orange-50 p-6 rounded-2xl border-2 border-primary/20">
              <label className="block text-sm font-bold text-primary mb-3">
                🌐 Language / භාෂාව
              </label>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, language: 'en' })}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    formData.language === 'en'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-primary border-2 border-primary'
                  }`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, language: 'si' })}
                  className={`flex-1 py-3 px-6 rounded-xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    formData.language === 'si'
                      ? 'bg-primary text-white shadow-lg'
                      : 'bg-white text-primary border-2 border-primary'
                  }`}
                >
                  සිංහල
                </button>
              </div>
            </div>

            {/* Project Title */}
            <div className="form-group">
              <label className="block text-sm font-bold text-primary mb-2">
                {formData.language === 'si' ? '📋 ව්‍යාපෘති මාතෘකාව *' : '📋 Project Title *'}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-5 py-4 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-lg"
                placeholder={formData.language === 'si' ? 'උදාහරණ: වයස්ගත නිවාසවල සේවා කිරීම' : 'e.g., Elderly Care Program'}
                required
                disabled={loading}
              />
            </div>

            {/* Description */}
            <div className="form-group">
              <label className="block text-sm font-bold text-primary mb-2">
                {formData.language === 'si' ? '📝 විස්තරය *' : '📝 Description *'}
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full px-5 py-4 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-lg h-40"
                placeholder={
                  formData.language === 'si'
                    ? 'ව්‍යාපෘතිය ගැන විස්තර කරන්න, එහි අරමුණ සහ බලපෑම...'
                    : 'Describe the project, its purpose, and expected impact...'
                }
                required
                disabled={loading}
              />
            </div>

            {/* Category & Target Audience */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  {formData.language === 'si' ? '🏷️ වර්ගය' : '🏷️ Category'}
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-lg"
                  disabled={loading}
                >
                  <option value="community-service">Community Service</option>
                  <option value="environmental">Environmental</option>
                  <option value="education">Education</option>
                  <option value="health">Health & Wellness</option>
                  <option value="fundraising">Fundraising</option>
                  <option value="awareness">Awareness Campaign</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  {formData.language === 'si' ? '👥 ඉලක්ක ප්‍රේක්ෂකයින්' : '👥 Target Audience'}
                </label>
                <input
                  type="text"
                  value={formData.targetAudience}
                  onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-lg"
                  placeholder={formData.language === 'si' ? 'උදාහරණ: වයස්ගතයින්, ළමුන්' : 'e.g., Elderly, Children'}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Location & Beneficiaries */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  {formData.language === 'si' ? '📍 ස්ථානය' : '📍 Location'}
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-lg"
                  placeholder={formData.language === 'si' ? 'කොහේද?' : 'Where?'}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  {formData.language === 'si' ? '🎯 ප්‍රතිලාභීන් සංඛ්‍යාව' : '🎯 Number of Beneficiaries'}
                </label>
                <input
                  type="text"
                  value={formData.beneficiaries}
                  onChange={(e) => setFormData({ ...formData, beneficiaries: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-lg"
                  placeholder={formData.language === 'si' ? 'උදාහරණ: 50-100' : 'e.g., 50-100 people'}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Proposed Dates */}
            <div className="bg-gradient-to-r from-orange-50 to-blue-50 p-6 rounded-2xl border-2 border-gold/30">
              <label className="block text-sm font-bold text-primary mb-3">
                {formData.language === 'si' ? '📅 යෝජිත දින (3ක් දක්වා)' : '📅 Proposed Dates (up to 3)'}
              </label>
              <div className="grid md:grid-cols-3 gap-4">
                <input
                  type="date"
                  value={formData.proposedDate1}
                  onChange={(e) => setFormData({ ...formData, proposedDate1: e.target.value })}
                  className="px-4 py-3 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30"
                  disabled={loading}
                />
                <input
                  type="date"
                  value={formData.proposedDate2}
                  onChange={(e) => setFormData({ ...formData, proposedDate2: e.target.value })}
                  className="px-4 py-3 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30"
                  disabled={loading}
                />
                <input
                  type="date"
                  value={formData.proposedDate3}
                  onChange={(e) => setFormData({ ...formData, proposedDate3: e.target.value })}
                  className="px-4 py-3 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Budget & Outcome */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  {formData.language === 'si' ? '💰 ඇස්තමේන්තු වියදම' : '💰 Estimated Budget'}
                </label>
                <input
                  type="text"
                  value={formData.estimatedBudget}
                  onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-lg"
                  placeholder={formData.language === 'si' ? 'රු. 10,000 - 20,000' : 'Rs. 10,000 - 20,000'}
                  disabled={loading}
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-primary mb-2">
                  {formData.language === 'si' ? '🎯 බලාපොරොත්තු වන ප්‍රතිඵලය' : '🎯 Expected Outcome'}
                </label>
                <input
                  type="text"
                  value={formData.expectedOutcome}
                  onChange={(e) => setFormData({ ...formData, expectedOutcome: e.target.value })}
                  className="w-full px-5 py-4 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-lg"
                  placeholder={formData.language === 'si' ? 'කුමක් සාක්ෂාත් කරගැනීමට බලාපොරොත්තු වේද?' : 'What do you hope to achieve?'}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Required Resources */}
            <div>
              <label className="block text-sm font-bold text-primary mb-2">
                {formData.language === 'si' ? '📦 අවශ්‍ය සම්පත් (එක් එක පේළියක)' : '📦 Required Resources (one per line)'}
              </label>
              <textarea
                value={formData.requiredResources}
                onChange={(e) => setFormData({ ...formData, requiredResources: e.target.value })}
                className="w-full px-5 py-4 border-2 border-primary/30 rounded-xl focus:ring-4 focus:ring-gold/30 focus:border-gold transition-all duration-300 text-lg h-32"
                placeholder={
                  formData.language === 'si'
                    ? 'උදාහරණ:\nස්වේච්ඡාසේවකයින් 20\nආහාර ද්‍රව්‍ය\nප්‍රවාහන පහසුකම්'
                    : 'e.g.:\n20 volunteers\nFood supplies\nTransportation'
                }
                disabled={loading}
              />
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-primary to-blue-600 hover:from-blue-600 hover:to-primary text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:transform-none text-lg"
              >
                {loading ? '⏳ Submitting...' : formData.language === 'si' ? '✨ යෝජනාව ඉදිරිපත් කරන්න' : '✨ Submit Suggestion'}
              </button>
              <Link
                href="/dashboard"
                className="flex-1 bg-gray-200 hover:bg-gray-300 text-primary font-bold py-4 px-8 rounded-xl transition-all duration-300 text-center text-lg"
              >
                {formData.language === 'si' ? 'අවලංගු කරන්න' : 'Cancel'}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
