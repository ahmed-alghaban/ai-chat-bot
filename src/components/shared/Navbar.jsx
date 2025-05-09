import ThemeToggle from '../ThemeToggle';
import { Bars3Icon } from '@heroicons/react/24/outline';

const Navbar = ({ onMenuClick }) => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-40 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
            <div className="container mx-auto px-4 py-3 w-full">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={onMenuClick}
                            className="md:hidden p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-colors duration-200"
                        >
                            <Bars3Icon className="h-6 w-6" />
                        </button>
                        <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            AI Chat Bot
                        </span>
                    </div>
                    <div>
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 