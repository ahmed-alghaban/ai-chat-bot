import { useAuth } from '../../hooks/useAuth';
import ThemeToggle from '../ThemeToggle';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Navbar = ({ onMenuClick }) => {
    const { currentUser, logOut } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                        <button
                            onClick={onMenuClick}
                            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        <span className="text-gray-700 dark:text-gray-200 font-medium">
                            {currentUser?.displayName || 'User'}
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <ThemeToggle />
                        <button
                            onClick={logOut}
                            className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-200 shadow-sm"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 