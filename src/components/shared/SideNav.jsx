import { NavLink } from 'react-router-dom';
import { ChatBubbleLeftRightIcon, KeyIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const SideNav = () => {
    const navItems = [
        {
            name: 'Chat',
            path: '/chat',
            icon: ChatBubbleLeftRightIcon
        },
        {
            name: 'Key Management',
            path: '/keys',
            icon: KeyIcon
        },
        {
            name: 'Transcriptions',
            path: '/transcriptions',
            icon: DocumentTextIcon
        }
    ];

    return (
        <nav className="h-full w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg">
            <div className="p-6">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    AI Chat Bot
                </h1>
            </div>

            <div className="px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200
                            ${isActive
                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                            }`
                        }
                    >
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.name}</span>
                    </NavLink>
                ))}
            </div>
        </nav>
    );
};

export default SideNav; 