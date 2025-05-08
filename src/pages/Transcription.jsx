import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../hooks/useApp';
import AudioUpload from '../components/transcription/AudioUpload';
import ProgressIndicator from '../components/transcription/ProgressIndicator';
import TranscriptionViewer from '../components/transcription/TranscriptionViewer';

const Transcription = () => {
    const { apiKey, transcription, transcribeAudio, isTranscribing, transcriptionError, clearTranscription } = useApp();
    const [isRecording, setIsRecording] = useState(false);
    const [audioFile, setAudioFile] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

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
                setIsProcessing(true);
                transcribeAudio(audioFile);
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

    const handleFileSelect = (file) => {
        if (!file || !apiKey) {
            return;
        }
        setAudioFile(file);
        setIsProcessing(true);
        transcribeAudio(file);
    };

    const handleClear = () => {
        clearTranscription();
        setAudioFile(null);
        setIsProcessing(false);
    };

    // Reset processing state when transcription is complete
    useEffect(() => {
        if (!isTranscribing && !transcriptionError) {
            setIsProcessing(false);
        }
    }, [isTranscribing, transcriptionError]);

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
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Audio Transcription
                </h2>

                <AudioUpload
                    onFileSelect={handleFileSelect}
                    isRecording={isRecording}
                    onStartRecording={startRecording}
                    onStopRecording={stopRecording}
                    isProcessing={isProcessing}
                    onClear={handleClear}
                />

                {(isProcessing || isTranscribing || transcription) && (
                    <ProgressIndicator
                        isTranscribing={isTranscribing}
                        error={transcriptionError}
                        transcription={transcription}
                    />
                )}

                <TranscriptionViewer
                    transcription={transcription}
                    onClear={handleClear}
                />
            </div>
        </div>
    );
};

export default Transcription; 