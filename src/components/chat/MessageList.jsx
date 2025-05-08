import React, { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../../context/AppContext';
import Message from './Message';

const MessageList = () => {
    const { conversations = [] } = useContext(AppContext);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [conversations]);

    if (!conversations || conversations.length === 0) {
        return (
            <div className="h-[calc(100vh-280px)] overflow-y-auto p-4 flex items-center justify-center">
                <p className="text-gray-500 dark:text-gray-400">No messages yet. Start a conversation!</p>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-280px)] overflow-y-auto p-4 space-y-4">
            {conversations.map((message) => (
                <Message key={message.id} message={message} />
            ))}
            <div ref={messagesEndRef} />
        </div>
    );
};

export default MessageList; 