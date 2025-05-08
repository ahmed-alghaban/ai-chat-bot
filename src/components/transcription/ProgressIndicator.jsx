import React from 'react';

const ProgressIndicator = ({ isTranscribing, error, transcription }) => {
    if (error) {
        return (
            <div className="p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-900/20 dark:border-red-800 mt-4">
                <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-red-600 dark:text-red-400 text-lg font-medium">
                        {error.message || 'An error occurred during transcription'}
                    </p>
                </div>
            </div>
        );
    }

    if (isTranscribing) {
        return (
            <div className="p-4 rounded-lg border border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-800 mt-4">
                <div className="flex items-center space-x-3">
                    <svg className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <p className="text-indigo-600 dark:text-indigo-400 text-xl font-semibold">Transcribing audio...</p>
                </div>
                <div className="mt-4 w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                    <div className="bg-indigo-600 h-3 rounded-full animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (transcription) {
        return (
            <div className="p-4 rounded-lg border border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800 mt-4">
                <div className="flex items-center space-x-3">
                    <svg className="w-8 h-8 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <p className="text-green-600 dark:text-green-400 text-xl font-semibold">Done</p>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 rounded-lg border border-indigo-200 bg-indigo-50 dark:bg-indigo-900/20 dark:border-indigo-800 mt-4">
            <div className="flex items-center space-x-3">
                <svg className="animate-spin h-8 w-8 text-indigo-600 dark:text-indigo-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-indigo-600 dark:text-indigo-400 text-xl font-semibold">Processing...</p>
            </div>
            <div className="mt-4 w-full bg-gray-200 rounded-full h-3 dark:bg-gray-700">
                <div className="bg-indigo-600 h-3 rounded-full animate-pulse"></div>
            </div>
        </div>
    );
};

export default ProgressIndicator; 