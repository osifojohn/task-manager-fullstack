'use client';

import React from 'react';
import Link from 'next/link';
import { ROUTES } from '@/lib/constants';
import { ArrowLeft, AlertTriangle } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-cyan-900 to-emerald-950 px-6 text-center">
      <div className="bg-black/30 backdrop-blur-md p-10 rounded-2xl border border-gray-700 shadow-lg max-w-md w-full">
        <AlertTriangle className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
        <h1 className="text-5xl font-extrabold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-200 mb-2">
          Page Not Found
        </h2>
        <p className="text-gray-400 mb-8">
          Sorry, we couldn’t find the page you’re looking for. It may have been
          moved or deleted.
        </p>

        <Link
          href={ROUTES.HOME}
          className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-3 rounded-lg font-semibold transition-all flex items-center justify-center space-x-2"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Homepage</span>
        </Link>
      </div>
    </div>
  );
}
