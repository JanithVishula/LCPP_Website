'use client';

import { useRouter } from 'next/navigation';

export default function DonateSuccessPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="text-6xl mb-6">🎉</div>
        <h1 className="text-4xl font-bold text-primary mb-4">Thank You!</h1>
        <p className="text-xl text-gray-700 mb-6">
          Your generous donation has been received.
        </p>
        <p className="text-gray-600 mb-8">
          Your support helps us continue our mission to serve our community and make a positive impact.
          We'll send you a confirmation email shortly.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => router.push('/')}
            className="w-full bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary-dark"
          >
            Back to Home
          </button>
          <button
            onClick={() => router.push('/projects')}
            className="w-full bg-white text-primary border-2 border-primary px-6 py-3 rounded-lg hover:bg-gray-50"
          >
            View Our Projects
          </button>
        </div>
      </div>
    </div>
  );
}
