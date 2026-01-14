import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { CITIES } from '../data/mockData';

const Header = ({ currentCity, setCurrentCity }) => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [cityModalOpen, setCityModalOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { user, isAuthenticated, logout } = useAuth();

    // Auto-detect location on mount
    useEffect(() => {
        detectLocation();
    }, []);

    const detectLocation = () => {
        if (!('geolocation' in navigator)) return;

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                try {
                    const { latitude, longitude } = position.coords;
                    // Store location for sorting
                    localStorage.setItem('user_location', JSON.stringify({ lat: latitude, lng: longitude }));

                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
                    );
                    const data = await response.json();
                    const city = data.address.city || data.address.town || data.address.village || 'Hyderabad';
                    setCurrentCity(city);
                } catch (error) {
                    console.error("Error fetching city:", error);
                }
            },
            (error) => console.error("Geolocation error:", error),
            { timeout: 10000, enableHighAccuracy: true, maximumAge: 300000 }
        );
    };

    const handleSearch = () => {
        if (searchQuery.trim()) {
            navigate(`/service/${encodeURIComponent(searchQuery.trim().toLowerCase())}`);
        }
    };

    const handleLogout = () => {
        logout();
        setIsMobileMenuOpen(false);
    };

    const navLinks = [
        { path: '/explore', label: 'Products', icon: 'fa-box' },
        { path: '/businesses', label: 'Businesses', icon: 'fa-store' },
        { path: '/tracker', label: 'Tracker', icon: 'fa-chart-line' },
        { path: '/about', label: 'About', icon: 'fa-info-circle' },
        { path: '/careers', label: 'Careers', icon: 'fa-briefcase' }
    ];

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-brand-beige">
            <div className="container mx-auto px-4 py-3 flex flex-col md:flex-row items-center gap-4">
                <div className="flex items-center w-full md:w-auto justify-between">
                    <Link to="/" className="text-3xl font-serif font-bold tracking-tight text-brand-dark hover:text-brand-teal transition-colors">
                        ekthaa
                    </Link>

                    {/* Mobile Actions */}
                    <div className="md:hidden flex items-center gap-5 text-brand-text">
                        <Link to="/explore" className="text-brand-text hover:text-brand-teal transition-colors" aria-label="Products">
                            <i className="fa-solid fa-box text-xl"></i>
                        </Link>
                        <i
                            className="fa-solid fa-bars text-xl cursor-pointer hover:text-brand-teal"
                            onClick={() => setIsMobileMenuOpen(true)}
                        ></i>
                    </div>
                </div>

                {/* Search Block */}
                <div className="flex-grow w-full max-w-3xl flex shadow-sm border border-gray-300 rounded h-11">
                    {/* City Selector */}
                    <div
                        className="w-[140px] md:w-[180px] border-r border-gray-200 bg-white flex items-center px-3 cursor-pointer rounded-l relative"
                        onClick={() => setCityModalOpen(!cityModalOpen)}
                    >
                        <i className="fa-solid fa-location-dot text-gray-400 mr-2"></i>
                        <span className="text-sm text-brand-text truncate flex-grow">{currentCity}</span>
                        <i className="fa-solid fa-chevron-down text-xs text-gray-400 ml-1"></i>

                        {cityModalOpen && (
                            <div className="absolute top-11 left-0 w-64 bg-white border border-gray-200 shadow-xl rounded-lg z-50 p-2">
                                <button
                                    onClick={(e) => { e.stopPropagation(); detectLocation(); setCityModalOpen(false); }}
                                    className="w-full text-left text-sm p-2 text-brand-teal hover:bg-teal-50 font-medium border-b border-gray-100 mb-2 rounded"
                                >
                                    <i className="fas fa-crosshairs mr-2"></i>Use Current Location
                                </button>
                                <p className="text-xs font-bold text-brand-text mb-2 uppercase">Popular Cities</p>
                                <div className="grid grid-cols-2 gap-2">
                                    {CITIES.map(city => (
                                        <button
                                            key={city}
                                            className="text-left text-sm p-1.5 hover:bg-brand-cream text-brand-text rounded"
                                            onClick={(e) => { e.stopPropagation(); setCurrentCity(city); setCityModalOpen(false); }}
                                        >
                                            {city}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Search Input */}
                    <div className="flex-grow flex items-center bg-white">
                        <input
                            type="text"
                            placeholder="Search businesses, products, services..."
                            className="w-full h-full px-4 text-sm text-brand-text outline-none"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                        />
                    </div>

                    {/* Search Button */}
                    <button
                        className="bg-brand-teal text-white w-14 hover:bg-opacity-90 transition flex items-center justify-center rounded-r"
                        onClick={handleSearch}
                    >
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-brand-text">
                    {navLinks.map(link => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className="hover:text-brand-teal transition-colors"
                        >
                            {link.label}
                        </Link>
                    ))}

                    <div className="flex items-center gap-3 ml-2">
                        <a
                            href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-brand-teal text-white px-5 py-2 rounded shadow-sm hover:bg-opacity-90 transition flex items-center gap-2 whitespace-nowrap"
                        >
                            <i className="fab fa-google-play"></i> Get the App
                        </a>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] flex justify-end">
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)}></div>

                    <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col">
                        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-brand-cream">
                            <span className="text-xl font-serif font-bold text-brand-dark">Menu</span>
                            <button onClick={() => setIsMobileMenuOpen(false)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-500 hover:text-red-500 shadow-sm">
                                <i className="fa-solid fa-times"></i>
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-2">
                            {isAuthenticated && user && (
                                <div className="mb-6 p-4 bg-brand-teal/5 rounded-xl border border-brand-teal/10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-brand-teal text-white flex items-center justify-center text-lg font-bold">
                                            {user.name?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <p className="font-bold text-brand-dark">{user.name || 'User'}</p>
                                            <p className="text-xs text-gray-500">{user.phone}</p>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {navLinks.map(link => (
                                <Link
                                    key={link.path}
                                    to={link.path}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-brand-text font-medium flex items-center gap-3 transition-colors"
                                >
                                    <i className={`fa-solid ${link.icon} text-brand-teal w-5`}></i> {link.label}
                                </Link>
                            ))}

                            <div className="border-t border-gray-100 my-2"></div>

                            <div className="border-t border-gray-100 my-2"></div>

                            <a
                                href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                                target="_blank"
                                rel="noopener noreferrer"
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="w-full bg-brand-teal text-white px-4 py-3 rounded-lg font-medium shadow-md hover:bg-teal-700 text-center mt-2 flex items-center justify-center gap-2"
                            >
                                <i className="fab fa-google-play"></i> Get the App
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
