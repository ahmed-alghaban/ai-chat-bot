import { useAuth } from '../hooks/useAuth';
import { useApp } from '../hooks/useApp';
import MessageInput from '../components/chat/MessageInput';
import MessageList from '../components/chat/MessageList';
import { Link } from 'react-router-dom';

const Chat = () => {
    const { currentUser } = useAuth();
    const { apiKey } = useApp();

    if (!currentUser) {
        return null;
    }

    if (!apiKey) {
        return (
            <div className="flex items-center justify-center p-2 sm:p-4 h-full">
                <div className="bg-[var(--message-bg-light)] dark:bg-[var(--message-bg-dark)] rounded-xl shadow-lg p-4 sm:p-8 max-w-md w-full text-center">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        API Key Required
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                        Please add your OpenAI API key to start chatting. You can manage your API key in the settings.
                    </p>
                    <Link
                        to="/keys"
                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-150 ease-in-out shadow-sm"
                    >
                        Add API Key
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="h-[calc(100vh-72px)] flex flex-col p-2 sm:p-4 space-y-2 sm:space-y-4">
            <div className="flex-1 bg-[var(--message-bg-light)] dark:bg-[var(--message-bg-dark)] rounded-xl shadow-lg overflow-hidden">
                <MessageList />
            </div>
            <div className="bg-[var(--message-bg-light)] dark:bg-[var(--message-bg-dark)] rounded-xl shadow-lg p-2 sm:p-4">
                <MessageInput />
            </div>
        </div>
    );
};

export default Chat; 