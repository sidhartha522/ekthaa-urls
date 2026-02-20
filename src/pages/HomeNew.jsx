import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const HomeNew = () => {
    const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ekthaa.business';

    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-8 relative">
            {/* Top Bar with Hamburger */}
            <div className="absolute top-0 left-0 w-full flex justify-start items-center px-6 py-5 z-20">
                <button
                    className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none group"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Open menu"
                >
                    <span className={`block h-0.5 w-6 bg-gray-800 mb-1.5 transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                    <span className={`block h-0.5 w-6 bg-gray-800 mb-1.5 transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}></span>
                    <span className={`block h-0.5 w-6 bg-gray-800 transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </button>
                {/* Overlay menu */}
                {menuOpen && (
                    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-20 z-30" onClick={() => setMenuOpen(false)}></div>
                )}
                <nav className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-40 transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300`}>
                    <div className="flex flex-col pt-20 px-8 gap-8">
                        <Link to="/" className="text-gray-800 text-base font-medium hover:text-brand-teal transition-colors" onClick={() => setMenuOpen(false)}>Home</Link>
                        <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="text-gray-800 text-base font-medium hover:text-brand-teal transition-colors" onClick={() => setMenuOpen(false)}>Play Store</a>
                        <a href="https://ekthaa.com" target="_blank" rel="noopener noreferrer" className="text-gray-800 text-base font-medium hover:text-brand-teal transition-colors" onClick={() => setMenuOpen(false)}>Ekthaa AI</a>
                    </div>
                </nav>
            </div>
            
            {/* Logo/Brand */}
            <div className="mb-16 mt-16 flex flex-row items-center justify-start w-full max-w-md">
                <img src="/logo.png" alt="Ekthaa Logo" className="h-20 w-20 mr-4" />
                <div className="flex flex-col justify-center">
                    <h1 className="text-3xl md:text-4xl font-serif font-semibold tracking-tight text-gray-900 mb-1">Ekthaa</h1>
                    <p className="text-gray-500 text-sm tracking-wide whitespace-nowrap">Connecting Businesses and Customers</p>
                </div>
            </div>

            {/* Linktree Style Links Section */}
            <div className="w-full max-w-md space-y-3 mb-12 px-4">
                
                {/* Ekthaa Business */}
                <div className="group">
                  <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-teal px-5 py-4 rounded-2xl text-center hover:bg-teal-600 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                          <span className="text-white font-medium text-base">Ekthaa Business</span>
                          <Link to="/link-info/ekthaa-business" className="bg-white text-black text-xs border border-white rounded-full px-3 py-1 hover:underline" onClick={(e) => e.stopPropagation()}>Know More →</Link>
                      </div>
                  </a>
                </div>
                <div className="flex gap-2 justify-center mb-2">
                    <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-xs font-medium">
                        Play Store
                    </a>
                    <Link to="/coming-soon" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-xs font-medium">
                        App Store
                    </Link>
                    <Link to="/coming-soon" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-xs font-medium">
                        Web
                    </Link>
                </div>

                {/* Business & Builder Community */}
                <div className="group">
                  <a href="https://chat.whatsapp.com/L82Bpsj3OD60M5MLxTFRH2" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-teal px-5 py-4 rounded-2xl text-center hover:bg-teal-600 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                          <span className="text-white font-medium text-base">Ekthaa Business & Builder Community</span>
                          <Link to="/link-info/builder-community" className="bg-white text-black text-xs border border-white rounded-full px-3 py-1 hover:underline" onClick={(e) => e.stopPropagation()}>Know More →</Link>
                      </div>
                  </a>
                </div>

                {/* Student Stall Application */}
                <div className="group">
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLSclln7rE1cpVKWDTAaPxx0wsc6UM83X_HWxzEg8Hl-XJkXkEg/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-teal px-5 py-4 rounded-2xl text-center hover:bg-teal-600 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                          <span className="text-white font-medium text-base">College Fest Student Stall</span>
                          <Link to="/link-info/student-stall" className="bg-white text-black text-xs border border-white rounded-full px-3 py-1 hover:underline" onClick={(e) => e.stopPropagation()}>Know More →</Link>
                      </div>
                  </a>
                </div>

                {/* Internships at Ekthaa */}
                <div className="group">
                  <a href="https://internships.ekthaa.app" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-teal px-5 py-4 rounded-2xl text-center hover:bg-teal-600 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                          <span className="text-white font-medium text-base">Internships</span>
                          <Link to="/link-info/internships" className="bg-white text-black text-xs border border-white rounded-full px-3 py-1 hover:underline" onClick={(e) => e.stopPropagation()}>Know More →</Link>
                      </div>
                  </a>
                </div>

                {/* Ekthaa AI */}
                <div className="group">
                  <a href="https://ekthaa.com" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-teal px-5 py-4 rounded-2xl text-center hover:bg-teal-600 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                          <span className="text-white font-medium text-base">Ekthaa AI</span>
                          <Link to="/link-info/ekthaa-ai" className="bg-white text-black text-xs border border-white rounded-full px-3 py-1 hover:underline" onClick={(e) => e.stopPropagation()}>Know More →</Link>
                      </div>
                  </a>
                </div>
                <div className="flex gap-2 justify-center mb-2">
                    <a href="https://ekthaa.com" target="_blank" rel="noopener noreferrer" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-xs font-medium">
                        Web
                    </a>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScho-lGwicrkOHLa6FbmGyH0jd9HuNxpO02LcZCuaS9QbjRmw/viewform" target="_blank" rel="noopener noreferrer" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-xs font-medium">
                            Play Store
                        </a>
                    <Link to="https://apps.apple.com/in/app/ekthaa-ai/id6759034113" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-xs font-medium">
                        App Store
                    </Link>
                </div>

                {/* Student Community */}
                <div className="group">
                  <a href="https://chat.whatsapp.com/IRKgSdE3KtsAiCddDNlHfc" target="_blank" rel="noopener noreferrer" className="block w-full bg-brand-teal px-5 py-4 rounded-2xl text-center hover:bg-teal-600 hover:shadow-lg transition-all duration-300">
                      <div className="flex items-center justify-between">
                          <span className="text-white font-medium text-base">Ekthaa Student Community</span>
                          <Link to="/link-info/student-community" className="bg-white text-black text-xs border border-white rounded-full px-3 py-1 hover:underline" onClick={(e) => e.stopPropagation()}>Know More →</Link>
                      </div>
                  </a>
                </div>

            </div>
        </div>
    );
};

export default HomeNew;
