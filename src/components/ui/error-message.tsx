import React from 'react';

interface ErrorMessageProps {
  title?: string;
  message?: string;
  showRetry?: boolean;
  onRetry?: () => void;
  className?: string;
}

export function ErrorMessage({ 
  title = "Service Temporarily Unavailable",
  message = "We're experiencing some technical difficulties. Please try again later or contact support if the problem persists.",
  showRetry = false,
  onRetry,
  className = ""
}: ErrorMessageProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 text-center bg-red-50 border border-red-200 rounded-lg ${className}`}>
      <div className="w-16 h-16 mb-4 text-red-500">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h3 className="text-lg font-semibold text-red-800 mb-2">
        {title}
      </h3>
      
      <p className="text-red-600 mb-4 max-w-md">
        {message}
      </p>
      
      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Try Again
        </button>
      )}
    </div>
  );
}

// Component for displaying API error status in development
export function ApiErrorNotice({ errors }: { errors: string[] }) {
  if (errors.length === 0) return null;
  
  return (
    <div className="fixed bottom-4 right-4 bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 rounded-md shadow-lg max-w-sm z-50">
      <h4 className="font-semibold mb-2">API Issues Detected:</h4>
      <ul className="text-sm space-y-1">
        {errors.map((error, index) => (
          <li key={index} className="flex items-start">
            <span className="mr-2">•</span>
            <span>{error}</span>
          </li>
        ))}
      </ul>
    </div>
  );
} 