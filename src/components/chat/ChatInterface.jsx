import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useApp } from '../../hooks/useApp';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

const ChatInterface = () => {
    const { currentUser } = useAuth();
    const { conversations } = useApp();

    if (!currentUser) {
        return null;
    }

    return (
        <div className="flex flex-col h-full w-full flex-1">
            {/* Main Chat Area */}
            <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-4 overflow-hidden">
                <MessageList messages={conversations} />
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4">
                <MessageInput />
            </div>
        </div>
    );
};

export default ChatInterface; 