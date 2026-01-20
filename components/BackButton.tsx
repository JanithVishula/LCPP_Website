'use client';

import { useRouter } from 'next/navigation';

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="inline-flex items-center gap-2 text-primary hover:text-secondary font-semibold mb-4 transition-colors group"
    >
      <span className="text-2xl group-hover:-translate-x-1 transition-transform">←</span>
      <span>Back</span>
    </button>
  );
}
