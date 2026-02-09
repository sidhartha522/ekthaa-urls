import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeNew = () => {
    const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ekthaa.business';

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-brand-beige flex flex-col items-center justify-center px-4 py-12 relative">
            {/* Top Bar with Hamburger */}
            <div className="absolute top-0 left-0 w-full flex justify-start items-center px-4 py-3 z-20">
                <button
                    className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open menu"
                >
                    <span className={`block h-0.5 w-7 bg-brand-dark mb-1 transition-all duration-200 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block h-0.5 w-7 bg-brand-dark mb-1 transition-all duration-200 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-0.5 w-7 bg-brand-dark transition-all duration-200 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
                {/* Overlay menu */}
                {menuOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-40 z-30" onClick={() => setMenuOpen(false)}></div>
                )}
                <nav className={`fixed top-0 left-0 h-full w-56 bg-white shadow-lg z-40 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
                    <div className="flex flex-col pt-16 px-6 gap-6">
                        <Link to="/" className="text-brand-dark text-lg font-semibold hover:text-brand-teal" onClick={() => setMenuOpen(false)}>Home</Link>
                        <Link to="/businesses" className="text-brand-dark text-lg font-semibold hover:text-brand-teal" onClick={() => setMenuOpen(false)}>Businesses</Link>
                        <Link to="/products" className="text-brand-dark text-lg font-semibold hover:text-brand-teal" onClick={() => setMenuOpen(false)}>Products</Link>
                        <Link to="/careers" className="text-brand-dark text-lg font-semibold hover:text-brand-teal" onClick={() => setMenuOpen(false)}>Careers</Link>
                    </div>
                </nav>
            </div>
            {/* Logo/Brand */}
            <div className="text-center mb-12 mt-10 flex flex-col items-center">
                <img src="/logo.png" alt="Ekthaa Logo" className="h-32 w-32 mb-4" />
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Ekthaa</h1>
                <p className="text-gray-600 text-lg">Connecting Businesses and Customers</p>
            </div>

            {/* Play Store Link */}
            <a
                href={PLAY_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center gap-3 hover:bg-gray-800 transition shadow-lg mb-12"
            >
                <i className="fab fa-google-play text-2xl"></i>
                <span>Get it on Play Store</span>
            </a>

            {/* No quick links on home page, see footer for links */}
        </div>
    );
};

export default HomeNew;
