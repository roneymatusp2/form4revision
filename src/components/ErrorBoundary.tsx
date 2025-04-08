import React from 'react';
import { useRouteError } from 'react-router-dom';

export const ErrorBoundary: React.FC = () => {
    const error = useRouteError() as Error;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Oops!</h2>
                    <p className="text-lg text-gray-600 mb-4">Something went wrong</p>
                    <p className="text-sm text-gray-500">{error?.message || 'An unexpected error occurred'}</p>
                    <button
                        onClick={() => window.location.href = '/'}
                        className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Return to Home
                    </button>
                </div>
            </div>
        </div>
    );
}; 