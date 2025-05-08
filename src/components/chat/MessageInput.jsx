import { useState } from 'react';
import { useApp } from '../../hooks/useApp';


const MessageInput = () => {
    const [message, setMessage] = useState('');
    const { sendMessage } = useApp();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const trimmedMessage = message.trim();
        if (trimmedMessage) {
            try {
                await sendMessage({ message: trimmedMessage });
                setMessage('');
            } catch (error) {
                console.error('Failed to send message:', error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex space-x-4">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 px-4 py-3 bg-[var(--message-bg-light)] dark:bg-[var(--message-bg-dark)] text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition duration-150 ease-in-out shadow-sm"
            />
            <button
                type="submit"
                disabled={!message.trim()}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
            >
                Send
            </button>
        </form>
    );
};

export default MessageInput; 