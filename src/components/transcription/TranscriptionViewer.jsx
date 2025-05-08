import React, { useState } from 'react';

const TranscriptionViewer = ({ transcription, onClear }) => {
    const [copyStatus, setCopyStatus] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(transcription);
            setCopyStatus(true);
            setTimeout(() => setCopyStatus(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    if (!transcription) return null;

    return (
        <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Transcription Result
                </h3>
                <div className="flex space-x-2">
                    <button
                        onClick={handleCopy}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                        {copyStatus ? (
                            <>
                                <svg className="w-4 h-4 mr-1 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                                Copied!
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                                Copy
                            </>
                        )}
                    </button>
                    <button
                        onClick={onClear}
                        className="inline-flex items-center px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                    >
                        Clear
                    </button>
                </div>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                    {transcription}
                </p>
            </div>
        </div>
    );
};

export default TranscriptionViewer; 