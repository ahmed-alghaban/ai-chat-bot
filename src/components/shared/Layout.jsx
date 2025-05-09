import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';
import Navbar from './Navbar';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Reset collapse state when switching to mobile view
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 768) { // md breakpoint
                setIsCollapsed(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Check initial size

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            <div className="flex h-[calc(104vh-72px)] pt-16">
                {/* Sidebar */}
                <aside className={`
                    fixed md:static inset-y-0 left-0 z-30
                    transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                `}>
                    <SideNav
                        isCollapsed={isCollapsed}
                        onCollapse={(value) => {
                            // Only allow collapsing on desktop
                            if (window.innerWidth >= 768) {
                                setIsCollapsed(value);
                            }
                        }}
                    />
                </aside>

                {/* Overlay */}
                {isSidebarOpen && (
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
                        onClick={() => setIsSidebarOpen(false)}
                    />
                )}

                {/* Main Content */}
                <main className="w-full">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout; 