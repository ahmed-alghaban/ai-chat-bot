import React, { useState, useRef } from 'react';
import { useApp } from '../hooks/useApp';

const Transcription = () => {
    const { apiKey, transcription, transcribeAudio, isTranscribing, transcriptionError, clearTranscription } = useApp();
    const [isRecording, setIsRecording] = useState(false);
    const [audioFile, setAudioFile] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('audio/')) {
            setAudioFile(file);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorderRef.current = new MediaRecorder(stream);
            audioChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const audioFile = new File([audioBlob], 'recording.wav', { type: 'audio/wav' });
                setAudioFile(audioFile);
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (error) {
            console.error('Error accessing microphone:', error);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
    };

    const handleTranscribe = () => {
        if (!audioFile || !apiKey) return;
        transcribeAudio(audioFile);
    };

    const handleClear = () => {
        clearTranscription();
        setAudioFile(null);
    };

    if (!apiKey) {
        return (
            <div className="h-[calc(100vh-72px)] flex items-center justify-center">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        API Key Required
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Please add your OpenAI API key to use the transcription feature.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-72px)] p-6">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                        Audio Transcription
                    </h2>

                    <div className="space-y-6">
                        {/* File Upload Section */}
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                            <input
                                type="file"
                                accept="audio/*"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="audio-upload"
                            />
                            <label
                                htmlFor="audio-upload"
                                className="cursor-pointer inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                            >
                                Upload Audio File
                            </label>
                            {audioFile && (
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                    Selected file: {audioFile.name}
                                </p>
                            )}
                        </div>

                        {/* Recording Section */}
                        <div className="flex justify-center">
                            <button
                                onClick={isRecording ? stopRecording : startRecording}
                                className={`inline-flex items-center px-6 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition duration-150 ease-in-out ${isRecording
                                        ? 'bg-red-600 hover:bg-red-700 text-white focus:ring-red-500'
                                        : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
                                    }`}
                            >
                                {isRecording ? 'Stop Recording' : 'Start Recording'}
                            </button>
                        </div>

                        {/* Transcribe Button */}
                        {audioFile && (
                            <div className="flex justify-center">
                                <button
                                    onClick={handleTranscribe}
                                    disabled={isTranscribing}
                                    className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isTranscribing ? 'Transcribing...' : 'Transcribe Audio'}
                                </button>
                            </div>
                        )}

                        {/* Error Message */}
                        {transcriptionError && (
                            <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/50 rounded-lg">
                                <p className="text-red-600 dark:text-red-400">
                                    Error: Failed to transcribe audio. Please try again.
                                </p>
                            </div>
                        )}

                        {/* Transcription Result */}
                        {transcription && (
                            <div className="mt-6">
                                <div className="flex justify-between items-center mb-2">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Transcription Result
                                    </h3>
                                    <button
                                        onClick={handleClear}
                                        className="inline-flex items-center px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition duration-150 ease-in-out"
                                    >
                                        Clear
                                    </button>
                                </div>
                                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                                    <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
                                        {transcription}
                                    </p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Transcription; 