import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import SideNav from './SideNav';
import Navbar from './Navbar';

const Layout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) {
                setIsSidebarOpen(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <>
            {/* Background Layer */}
            <div className="fixed inset-0 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800" />

            {/* Content Layer */}
            <div className="relative min-h-screen">
                {/* Navbar */}
                <div className="fixed top-0 left-0 right-0 z-40">
                    <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
                </div>

                {/* Main Content Area */}
                <div className="flex min-h-screen pt-16">
                    {/* Sidebar Overlay */}
                    {isMobile && isSidebarOpen && (
                        <div
                            className="fixed inset-0 bg-black bg-opacity-50 z-20"
                            onClick={() => setIsSidebarOpen(false)}
                        />
                    )}

                    {/* Sidebar */}
                    <aside className={`
                        fixed md:static inset-y-0 left-0 z-30
                        transform transition-transform duration-300 ease-in-out
                        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
                    `}>
                        <SideNav />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out">
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
};

export default Layout; 