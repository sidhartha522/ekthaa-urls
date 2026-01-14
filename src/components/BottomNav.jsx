import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const BottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { isAuthenticated } = useAuth();

    const navItems = [
        {
            id: 'businesses',
            label: 'My Businesses',
            icon: 'fa-store',
            path: '/my-businesses',
            requiresAuth: true
        },
        {
            id: 'home',
            label: 'Home',
            icon: 'fa-home',
            path: '/',
            requiresAuth: false
        },
        {
            id: 'profile',
            label: 'Profile',
            icon: 'fa-user',
            path: '/dashboard',
            requiresAuth: true
        }
    ];

    const handleNavClick = (item) => {
        if (item.requiresAuth && !isAuthenticated) {
            navigate('/login');
            return;
        }
        navigate(item.path);
    };

    const isActive = (path) => {
        if (path === '/') {
            return location.pathname === '/';
        }
        return location.pathname.startsWith(path);
    };

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden">
            <div className="flex items-center justify-around h-16">
                {navItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleNavClick(item)}
                        className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${isActive(item.path)
                                ? 'text-brand-teal'
                                : 'text-gray-500 hover:text-brand-teal'
                            }`}
                    >
                        <i className={`fas ${item.icon} text-xl mb-1`}></i>
                        <span className="text-xs font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </nav>
    );
};

export default BottomNav;
