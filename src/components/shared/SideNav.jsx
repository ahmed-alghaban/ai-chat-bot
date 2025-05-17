import { NavLink } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, KeyIcon, DocumentTextIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../hooks/useAuth';

const SideNav = ({ isCollapsed, onCollapse }) => {
    const { logOut, currentUser } = useAuth();
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
                        <div className="mb-8 flex flex-col items-center pt-16 md:pt-0">
                            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center mb-3">
                                {currentUser?.photoURL ? (
                                    <img
                                        src={currentUser.photoURL}
                                        alt={currentUser.displayName}
                                        className="w-16 h-16 rounded-full object-cover"
                                    />
                                ) : (
                                    <span className="text-2xl font-bold text-white">
                                        {currentUser?.displayName?.[0]?.toUpperCase() || 'U'}
                                    </span>
                                )}
                            </div>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                {currentUser?.displayName || 'User'}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {currentUser?.email}
                            </p>
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
                    <button
                        onClick={logOut}
                        className="flex items-center justify-center space-x-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                    </button>

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