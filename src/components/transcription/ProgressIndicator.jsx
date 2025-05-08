import React from 'react';

const ProgressIndicator = ({ isTranscribing, error }) => {
    if (!isTranscribing && !error) return null;

    return (
        <div className="mt-4">
            {isTranscribing && (
                <div className="flex items-center justify-center space-x-2 text-indigo-600 dark:text-indigo-400">
                    <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Transcribing audio...</span>
                </div>
            )}
            {error && (
                <div className="p-4 bg-red-50 dark:bg-red-900/50 rounded-lg">
                    <p className="text-red-600 dark:text-red-400">
                        Error: {error.message || 'Failed to transcribe audio. Please try again.'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProgressIndicator; 