import { NavLink } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, KeyIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const SideNav = ({ isCollapsed, onCollapse }) => {
    const navItems = [
        { path: '/chat', icon: ChatBubbleLeftRightIcon, label: 'Chat' },
        { path: '/keys', icon: KeyIcon, label: 'Key Management' },
        { path: '/transcriptions', icon: DocumentTextIcon, label: 'Transcriptions' },
    ];

    return (
        <div className="h-full bg-[var(--message-bg-light)] dark:bg-[var(--message-bg-dark)] shadow-lg mt-4">
            <nav className={`h-full transition-all duration-300 ${isCollapsed ? 'w-16' : 'w-64'}`}>
                <div className="p-4 flex flex-col h-full">
                    {/* Title Section */}
                    {!isCollapsed && (
                        <div className="mb-8">
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                AI Chat Bot
                            </h1>
                        </div>
                    )}

                    {/* Navigation Items */}
                    <div className="space-y-2 flex-1">
                        {navItems.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                className={({ isActive }) =>
                                    `flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${isActive
                                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-300'
                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    }`
                                }
                            >
                                <item.icon className="w-5 h-5" />
                                {!isCollapsed && <span>{item.label}</span>}
                            </NavLink>
                        ))}
                    </div>

                    {/* Collapse Button */}
                    <button
                        onClick={() => onCollapse(!isCollapsed)}
                        className="hidden md:flex items-center justify-center w-full py-3 mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                    >
                        <svg
                            className={`w-5 h-5 transform transition-transform ${isCollapsed ? 'rotate-180' : ''}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>
                </div>
            </nav>
        </div>
    );
};

export default SideNav; 