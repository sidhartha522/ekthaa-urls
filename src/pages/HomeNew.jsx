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

            {/* Links Section */}
            <div className="w-full max-w-4xl space-y-6 mb-8">
                
                {/* Ekthaa Business */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-3">📱 Ekthaa Business</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Ekthaa Business helps customers near you discover your store. When customers search for a product on Ekthaa AI or Google, your business can show up. You get a shareable business page with your location, products, offers, and social links. It also works as an all-in-one business app to manage credits, invoices, offers, products, and stock.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                            <i className="fab fa-google-play mr-2"></i>Play Store
                        </a>
                        <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium" disabled>
                            <i className="fab fa-apple mr-2"></i>App Store (Coming Soon)
                        </button>
                        <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium" disabled>
                            🌐 Web (Coming Soon)
                        </button>
                    </div>
                </div>

                {/* Student Stall Application */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-3">🎯 Student Stall Application (Play & Win)</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Run a Play & Win stall at your college fest and engage students through fun games. All gifts and rewards will be provided by our brand sponsors—you just manage the stall.
                    </p>
                    <a href="https://docs.google.com/forms/d/e/1FAIpQLSclln7rE1cpVKWDTAaPxx0wsc6UM83X_HWxzEg8Hl-XJkXkEg/viewform?usp=header" target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                        Apply for the Stall →
                    </a>
                </div>

                {/* Internships at Ekthaa */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-3">🚀 Internships at Ekthaa (Unpaid)</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Ekthaa offers unpaid internships where you'll work directly with the founding team on real, production-level tasks. Apply only if you have extraordinary skills or deep passion for startups and want real startup exposure.
                    </p>
                    <a href="https://internships.ekthaa.app" target="_blank" rel="noopener noreferrer" className="inline-block bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                        Apply Here →
                    </a>
                </div>

                {/* Ekthaa AI */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-3">🤖 Ekthaa AI</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        Find the best deals, products, and businesses around you in seconds—by talking to AI. Personalized, local, and intelligent discovery built for students and local businesses.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <a href="https://ekthaa.com" target="_blank" rel="noopener noreferrer" className="bg-brand-teal text-white px-4 py-2 rounded-lg hover:bg-teal-600 transition text-sm font-medium">
                            🌐 Web
                        </a>
                        <a href="https://docs.google.com/forms/d/e/1FAIpQLScho-lGwicrkOHLa6FbmGyH0jd9HuNxpO02LcZCuaS9QbjRmw/viewform" target="_blank" rel="noopener noreferrer" className="bg-brand-dark text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition text-sm font-medium">
                            Apply for Early Access
                        </a>
                        <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded-lg cursor-not-allowed text-sm font-medium" disabled>
                            <i className="fab fa-apple mr-2"></i>App Store (Coming Soon)
                        </button>
                    </div>
                </div>

                {/* Business & Builder Community */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-3">🏗️ Ekthaa Business & Builder Community</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        A community for business owners, founders, and builders to connect, learn, and grow together. Share insights, explore collaborations, and build real things - not just talk. We also conduct a Business & Builder Walk at LB Nagar Circle every weekend 🚶‍♂️🤝
                    </p>
                    <a href="https://chat.whatsapp.com/L82Bpsj3OD60M5MLxTFRH2" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm font-medium">
                        <i className="fab fa-whatsapp mr-2"></i>Join Here
                    </a>
                </div>

                {/* Student Community */}
                <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                    <h2 className="text-2xl font-serif font-bold text-brand-dark mb-3">🎓 Ekthaa Student Community</h2>
                    <p className="text-gray-600 mb-4 leading-relaxed">
                        A community for students to learn, explore opportunities, and build together. Internships, events, startup exposure, freelance gigs, paid opportunities, and real-world learning beyond college.
                    </p>
                    <a href="https://chat.whatsapp.com/IRKgSdE3KtsAiCddDNlHfc" target="_blank" rel="noopener noreferrer" className="inline-block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition text-sm font-medium">
                        <i className="fab fa-whatsapp mr-2"></i>Join Here
                    </a>
                </div>

            </div>
        </div>
    );
};

export default HomeNew;
