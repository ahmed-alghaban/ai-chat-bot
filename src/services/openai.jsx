import axios from 'axios';

const OPENAI_API_URL = import.meta.env.VITE_BASE_URL;

export const postToOpenAiService = async ({ message, apiKey, messages = [] }) => {
    try {
        const { data } = await axios.post(`${OPENAI_API_URL}/chat/completions`, {
            model: 'gpt-3.5-turbo',
            messages: [
                ...messages,
                { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 1000
        }, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        return data;
    } catch (error) {
        console.error('API Error:', error.response?.data);
        throw new Error(error.response?.data?.error?.message || 'Failed to get response from OpenAI');
    }
};

export const transcribeAudioService = async ({ audioFile, apiKey }) => {
    try {
        const formData = new FormData();
        formData.append('file', audioFile);
        formData.append('model', 'whisper-1');

        const { data } = await axios.post(`${OPENAI_API_URL}/audio/transcriptions`, formData, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        // Return the transcription text
        return { text: data.text };
    } catch (error) {
        console.error('Transcription Error:', error.response?.data || error);
        throw new Error(error.response?.data?.error?.message || 'Failed to transcribe audio');
    }
};