import { AppContext } from '../../context/AppContext';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

const Message = ({ message }) => {
    const [copyStatus, setCopyStatus] = useState({ user: false, ai: false });

    if (!message || !message.message || !message.response) {
        return null;
    }

    const { message: userMessage, response: aiResponse } = message;

    const handleCopy = async (text, type) => {
        try {
            await navigator.clipboard.writeText(text);
            setCopyStatus(prev => ({ ...prev, [type]: true }));
            setTimeout(() => {
                setCopyStatus(prev => ({ ...prev, [type]: false }));
            }, 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <div className="w-full space-y-4 message-animate">
            {/* User Message */}
            <div className="flex w-full py-4 px-4 bg-[var(--message-bg-light)] dark:bg-[var(--message-bg-dark)] rounded-lg shadow-sm">
                <div className="flex w-full max-w-3xl mx-auto">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold shadow-md">
                        U
                    </div>
                    <div className="ml-4 flex-1 relative group">
                        <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200">
                            {userMessage.content || ''}
                        </div>
                        <button
                            onClick={() => handleCopy(userMessage.content, 'user')}
                            className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            title="Copy message"
                        >
                            {copyStatus.user ? (
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {/* AI Response */}
            <div className="flex w-full py-4 px-4 bg-[var(--ai-message-bg-light)] dark:bg-[var(--ai-message-bg-dark)] rounded-lg shadow-sm">
                <div className="flex w-full max-w-3xl mx-auto">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white font-bold shadow-md">
                        AI
                    </div>
                    <div className="ml-4 flex-1 relative group">
                        <div className="prose prose-sm max-w-none text-gray-800 dark:text-gray-200">
                            <ReactMarkdown
                                components={{
                                    code({ inline, className, children, ...props }) {
                                        const match = /language-(\w+)/.exec(className || '');
                                        return !inline && match ? (
                                            <div className="relative">
                                                <div className="absolute right-2 top-2 text-xs text-gray-400">
                                                    {match[1]}
                                                </div>
                                                <SyntaxHighlighter
                                                    style={vscDarkPlus}
                                                    language={match[1]}
                                                    PreTag="div"
                                                    className="rounded-lg !mt-0 !mb-4"
                                                    {...props}
                                                >
                                                    {String(children).replace(/\n$/, '')}
                                                </SyntaxHighlighter>
                                            </div>
                                        ) : (
                                            <code className="bg-gray-100 dark:bg-gray-700 rounded px-1.5 py-0.5 text-sm text-gray-800 dark:text-gray-200" {...props}>
                                                {children}
                                            </code>
                                        );
                                    }
                                }}
                            >
                                {aiResponse.content || ''}
                            </ReactMarkdown>
                        </div>
                        <button
                            onClick={() => handleCopy(aiResponse.content, 'ai')}
                            className="absolute top-0 right-0 p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            title="Copy message"
                        >
                            {copyStatus.ai ? (
                                <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            ) : (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Message; 