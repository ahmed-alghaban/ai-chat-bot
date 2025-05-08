import React, { createContext, useState, useEffect } from 'react';
import { postToOpenAiService, transcribeAudioService } from '../services/openai';
import { useMutation } from '@tanstack/react-query';

// eslint-disable-next-line react-refresh/only-export-components
export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
    const [apiKey, setApiKey] = useState(() => localStorage.getItem('openai_api_key') || '');
    const [conversations, setConversations] = useState([]);
    const [transcriptionText, setTranscriptionText] = useState('');

    // Update localStorage when apiKey changes
    useEffect(() => {
        if (apiKey) {
            localStorage.setItem('openai_api_key', apiKey);
        } else {
            localStorage.removeItem('openai_api_key');
        }
    }, [apiKey]);

    // Mutation for sending messages
    const {
        mutate: sendMessage,
        isLoading: isSending,
        error: sendError
    } = useMutation({
        mutationFn: async ({ message }) => {
            if (!message || typeof message !== 'string') {
                throw new Error('Message must be a non-empty string');
            }

            // Convert conversations to OpenAI message format
            const messages = conversations.flatMap(conv => [
                { role: 'user', content: conv.message.content },
                { role: 'assistant', content: conv.response.content }
            ]);

            return postToOpenAiService({ message, apiKey, messages });
        },
        onMutate: async ({ message }) => {
            // Optimistically update conversations
            const optimisticConversation = {
                id: Date.now().toString(),
                message: {
                    role: 'user',
                    content: message,
                    timestamp: new Date().toISOString()
                },
                response: {
                    role: 'assistant',
                    content: '...',
                    timestamp: new Date().toISOString()
                }
            };
            setConversations(prev => [...prev, optimisticConversation]);
        },
        onSuccess: (data, variables) => {
            // Update the optimistic message with the actual response
            setConversations(prev => prev.map(conv => {
                if (conv.message.content === variables.message && conv.response.content === '...') {
                    return {
                        ...conv,
                        response: {
                            role: 'assistant',
                            content: data.choices[0].message.content,
                            timestamp: new Date().toISOString()
                        }
                    };
                }
                return conv;
            }));
        },
        onError: (err, variables) => {
            // Remove the optimistic message on error
            setConversations(prev => prev.filter(conv => conv.message.content !== variables.message));
        }
    });

    // Function to delete messages locally
    const deleteMessage = (id) => {
        setConversations(prev => prev.filter(conv => conv.id !== id));
    };

    // Mutation for transcribing audio
    const {
        mutate: transcribeAudio,
        isLoading: isTranscribing,
        error: transcriptionError
    } = useMutation({
        mutationFn: (audioFile) => transcribeAudioService({ audioFile, apiKey }),
        onSuccess: (data) => {
            console.log('Transcription successful:', data);
            setTranscriptionText(data.text);
        },
        onError: (error) => {
            console.error('Transcription failed:', error);
            setTranscriptionText('');
        }
    });

    const clearTranscription = () => {
        setTranscriptionText('');
    };

    return (
        <AppContext.Provider
            value={{
                apiKey,
                setApiKey,
                conversations,
                isLoadingConversations: false,
                conversationsError: null,
                sendMessage,
                isSending,
                sendError,
                deleteMessage,
                isDeleting: false,
                deleteError: null,
                transcription: transcriptionText,
                transcribeAudio,
                isTranscribing,
                transcriptionError,
                clearTranscription
            }}
        >
            {children}
        </AppContext.Provider>
    );
};



