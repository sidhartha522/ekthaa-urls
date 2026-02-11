import React from 'react';
import { Link } from 'react-router-dom';

const HomeNew = () => {
    return (
        <div className="min-h-screen h-screen overflow-hidden bg-gray-50 flex flex-col items-center px-4 py-4">
            {/* Compact Header Section */}
            <div className="text-center mb-4 max-w-2xl">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">Ekthaa</h1>
                <p className="text-base md:text-lg text-gray-700 font-medium">
                    Connecting Local Businesses, Students & Builders
                </p>
            </div>

            {/* Main Apps Section - 2 Column Grid */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                {/* Ekthaa Business */}
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-brand-teal rounded-full flex items-center justify-center text-2xl">
                            💼
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Ekthaa Business</h2>
                            <p className="text-xs text-gray-600 mb-2">
                                List your products, offers & services. Get discovered by nearby customers.
                            </p>
                            <div className="flex flex-wrap items-center gap-2">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-brand-teal text-white px-3 py-1.5 rounded-full font-medium text-xs hover:bg-teal-600 transition-colors"
                                >
                                    Open App
                                </a>
                                <div className="flex gap-1.5">
                                    <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-brand-teal transition-colors" title="Play Store">
                                        <i className="fab fa-google-play text-lg"></i>
                                    </a>
                                    <Link to="/coming-soon" className="text-gray-700 hover:text-brand-teal transition-colors" title="App Store">
                                        <i className="fab fa-apple text-lg"></i>
                                    </Link>
                                    <Link to="/coming-soon" className="text-gray-700 hover:text-brand-teal transition-colors" title="Web">
                                        <i className="fas fa-globe text-lg"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ekthaa Builder Community */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center text-2xl">
                            🚀
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Ekthaa Builder Community</h2>
                            <p className="text-xs text-gray-600 mb-2">
                                Learn, build & grow with founders and makers.
                            </p>
                            <a
                                href="https://chat.whatsapp.com/L82Bpsj3OD60M5MLxTFRH2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-purple-500 text-white px-3 py-1.5 rounded-full font-medium text-xs hover:bg-purple-600 transition-colors"
                            >
                                Join Community
                            </a>
                        </div>
                    </div>
                </div>

                {/* College Fest Student Stall */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                        <div className="text-2xl">🎪</div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">College Fest Student Stall</h2>
                            <p className="text-xs text-gray-600 mb-2">
                                Run a stall, manage games, earn & learn real-world execution.
                            </p>
                            <a
                                href="https://docs.google.com/forms/d/e/1FAIpQLSclln7rE1cpVKWDTAaPxx0wsc6UM83X_HWxzEg8Hl-XJkXkEg/viewform?usp=header"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gray-800 text-white px-3 py-1.5 rounded-full font-medium text-xs hover:bg-gray-700 transition-colors"
                            >
                                View Details →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Student Community */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-2xl">
                            🎓
                        </div>
                        <div className="flex-1">
                            <h2 className="text-lg font-bold text-gray-900 mb-1">Ekthaa Student Community</h2>
                            <p className="text-xs text-gray-600 mb-2">
                                Discover nearby businesses, offers & college opportunities.
                            </p>
                            <a
                                href="https://chat.whatsapp.com/IRKgSdE3KtsAiCddDNlHfc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-500 text-white px-3 py-1.5 rounded-full font-medium text-xs hover:bg-blue-600 transition-colors"
                            >
                                Join Community
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Opportunities Section - 3 Column Grid */}
            <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                {/* Internships */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-start">
                        <div className="text-2xl mb-2">💼</div>
                        <h2 className="text-base font-bold text-gray-900 mb-1">Internships</h2>
                        <p className="text-xs text-gray-600 mb-2">
                            Work with Ekthaa on tech, marketing & operations.
                        </p>
                        <a
                            href="https://internships.ekthaa.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-gray-800 text-white px-3 py-1.5 rounded-full font-medium text-xs hover:bg-gray-700 transition-colors"
                        >
                            Apply Now →
                        </a>
                    </div>
                </div>

                {/* Ekthaa AI */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow relative">
                    <span className="absolute top-2 right-2 bg-brand-teal text-white text-xs px-2 py-0.5 rounded-full font-medium">Beta</span>
                    <div className="flex flex-col items-start">
                        <div className="text-2xl mb-2">🤖</div>
                        <h2 className="text-base font-bold text-gray-900 mb-1">Ekthaa AI</h2>
                        <p className="text-xs text-gray-600 mb-2">
                            Smart tools to help businesses grow faster.
                        </p>
                        <div className="flex gap-1.5">
                            <a
                                href="https://ekthaa.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-gray-800 text-white px-3 py-1.5 rounded-full font-medium text-xs hover:bg-gray-700 transition-colors"
                            >
                                Learn More →
                            </a>
                        </div>
                    </div>
                </div>

                {/* Instagram/Social */}
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 border border-pink-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex flex-col items-start">
                        <div className="text-2xl mb-2">📷</div>
                        <h2 className="text-base font-bold text-gray-900 mb-1">Follow Us</h2>
                        <p className="text-xs text-gray-600 mb-2">
                            Stay updated with our latest news and updates.
                        </p>
                        <a
                            href="https://instagram.com/ekthaa.app"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-block bg-pink-500 text-white px-3 py-1.5 rounded-full font-medium text-xs hover:bg-pink-600 transition-colors"
                        >
                            Instagram →
                        </a>
                    </div>
                </div>
            </div>

            {/* Minimal Footer */}
            <div className="text-center text-xs text-gray-500 mt-auto">
                Made with ❤️ by Team Ekthaa
            </div>
        </div>
    );
};

export default HomeNew;
