import React, { useRef, useState } from 'react';
import { isValidAudioFile } from '../../utils/validation';

const AudioUpload = ({ onFileSelect, isRecording, onStartRecording, onStopRecording }) => {
    const [audioFile, setAudioFile] = useState(null);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileUpload = (file) => {
        if (file && isValidAudioFile(file)) {
            setAudioFile(file);
            onFileSelect(file);
        }
    };

    const handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        handleFileUpload(file);
    };

    const handleFileInputChange = (event) => {
        const file = event.target.files[0];
        handleFileUpload(file);
    };

    return (
        <div className="space-y-6">
            {/* File Upload Section */}
            <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${isDragging
                        ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20'
                        : 'border-gray-300 dark:border-gray-600'
                    }`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    accept="audio/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                    id="audio-upload"
                />
                <label
                    htmlFor="audio-upload"
                    className="cursor-pointer inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Upload Audio File
                </label>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                    {isDragging ? (
                        "Drop your audio file here"
                    ) : (
                        "or drag and drop your audio file here"
                    )}
                </p>
                {audioFile && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                        Selected file: {audioFile.name}
                    </p>
                )}
            </div>

            {/* Recording Section */}
            <div className="flex flex-col items-center space-y-4">
                {isRecording && (
                    <div className="flex items-center space-x-2 text-red-600 dark:text-red-400">
                        <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-pulse"></div>
                            <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                            <div className="w-2 h-2 bg-red-600 dark:bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                        </div>
                        <span className="text-sm font-medium">Recording...</span>
                    </div>
                )}
                <button
                    onClick={isRecording ? onStopRecording : onStartRecording}
                    className={`inline-flex items-center px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out ${isRecording
                            ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
                            : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
                        }`}
                >
                    {isRecording ? (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 10a1 1 0 011-1h4a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 01-1-1v-4z" />
                            </svg>
                            Stop Recording
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                            Start Recording
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AudioUpload; 