'use client';

import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorFallbackProps {
  error: Error | null;
  onRetry: () => void;
  title?: string;
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({
  error,
  onRetry,
  title = 'Something went wrong',
}) => (
  <div className="text-center py-12">
    <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 mb-4">
      {error?.message ||
        'An unexpected error occurred while loading your data.'}
    </p>
    <button
      onClick={onRetry}
      className="inline-flex items-center cursor-pointer px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
    >
      <RefreshCw className="h-4 w-4 mr-2" />
      Try Again
    </button>
  </div>
);
