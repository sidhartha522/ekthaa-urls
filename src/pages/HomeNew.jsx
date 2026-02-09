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
                        <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="text-brand-dark text-lg font-semibold hover:text-brand-teal" onClick={() => setMenuOpen(false)}>Play Store</a>
                        <a href="https://ekthaa.com" target="_blank" rel="noopener noreferrer" className="text-brand-dark text-lg font-semibold hover:text-brand-teal" onClick={() => setMenuOpen(false)}>Ekthaa AI</a>
                    </div>
                </nav>
            </div>
            {/* Logo/Brand */}
            <div className="text-center mb-12 mt-10 flex flex-col items-center">
                <img src="/logo.png" alt="Ekthaa Logo" className="h-32 w-32 mb-4" />
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Ekthaa</h1>
                <p className="text-gray-600 text-lg">Connecting Businesses and Customers</p>
            </div>

            {/* Linktree Style Links Section */}
            <div className="w-full max-w-2xl space-y-4 mb-8 px-4">
                
                {/* Ekthaa Business - Big Button with Know More */}
                <div className="relative w-full">
                  <Link to="/link-info/ekthaa-business" className="absolute right-2 top-2 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-teal-600 transition z-10">Know More</Link>
                  <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-dark text-white px-6 py-4 rounded-xl font-bold text-lg text-center hover:bg-gray-800 transition shadow-md">
                      📱 Ekthaa Business
                  </a>
                </div>
                <div className="flex gap-2 justify-center">
                    <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                        <i className="fab fa-google-play mr-1"></i>Play Store
                    </a>
                    <Link to="/coming-soon" className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition text-sm font-medium">
                        <i className="fab fa-apple mr-1"></i>App Store
                    </Link>
                    <Link to="/coming-soon" className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition text-sm font-medium">
                        🌐 Web
                    </Link>
                </div>

                {/* Student Stall Application */}
                <div className="relative w-full">
                  <Link to="/link-info/student-stall" className="absolute right-2 top-2 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-teal-600 transition z-10">Know More</Link>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSclln7rE1cpVKWDTAaPxx0wsc6UM83X_HWxzEg8Hl-XJkXkEg/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-dark text-white px-6 py-4 rounded-xl font-bold text-lg text-center hover:bg-gray-800 transition shadow-md">
                      🎯 Student Stall Application (Play & Win)
                  </a>
                </div>

                {/* Internships at Ekthaa */}
                <div className="relative w-full">
                  <Link to="/link-info/internships" className="absolute right-2 top-2 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-teal-600 transition z-10">Know More</Link>
                  <a href="https://internships.ekthaa.app" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-dark text-white px-6 py-4 rounded-xl font-bold text-lg text-center hover:bg-gray-800 transition shadow-md">
                      🚀 Internships at Ekthaa
                  </a>
                </div>

                {/* Ekthaa AI */}
                <div className="relative w-full">
                  <Link to="/link-info/ekthaa-ai" className="absolute right-2 top-2 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-teal-600 transition z-10">Know More</Link>
                  <a href="https://ekthaa.com" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-dark text-white px-6 py-4 rounded-xl font-bold text-lg text-center hover:bg-gray-800 transition shadow-md">
                      🤖 Ekthaa AI
                  </a>
                </div>
                <div className="flex gap-2 justify-center">
                    <a href="https://ekthaa.com" target="_blank" rel="noopener noreferrer" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                        🌐 Web
                    </a>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLScho-lGwicrkOHLa6FbmGyH0jd9HuNxpO02LcZCuaS9QbjRmw/viewform" target="_blank" rel="noopener noreferrer" className="bg-brand-dark text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium">
                        Early Access
                    </a>
                    <Link to="/coming-soon" className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition text-sm font-medium">
                        <i className="fab fa-apple mr-1"></i>App Store
                    </Link>
                </div>

                {/* Business & Builder Community */}
                <div className="relative w-full">
                  <Link to="/link-info/builder-community" className="absolute right-2 top-2 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-teal-600 transition z-10">Know More</Link>
                  <a href="https://chat.whatsapp.com/L82Bpsj3OD60M5MLxTFRH2" target="_blank" rel="noopener noreferrer" className="block w-full bg-green-500 text-white px-6 py-4 rounded-xl font-bold text-lg text-center hover:bg-green-600 transition shadow-md">
                      🏗️ Business & Builder Community
                  </a>
                </div>

                {/* Student Community */}
                <div className="relative w-full">
                  <Link to="/link-info/student-community" className="absolute right-2 top-2 bg-brand-teal text-white px-3 py-1 rounded-full text-xs font-medium hover:bg-teal-600 transition z-10">Know More</Link>
                  <a href="https://chat.whatsapp.com/IRKgSdE3KtsAiCddDNlHfc" target="_blank" rel="noopener noreferrer" className="block w-full bg-green-500 text-white px-6 py-4 rounded-xl font-bold text-lg text-center hover:bg-green-600 transition shadow-md">
                      🎓 Ekthaa Student Community
                  </a>
                </div>

            </div>
        </div>
    );
};

export default HomeNew;
