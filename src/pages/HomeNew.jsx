import React from 'react';
import { Link } from 'react-router-dom';

const HomeNew = () => {
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-12">
            {/* Header Section */}
            <div className="text-center mb-8 max-w-2xl">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">Ekthaa</h1>
                <p className="text-lg md:text-xl text-gray-700 font-medium mb-2">
                    Connecting Local Businesses, Students & Builders
                </p>
                <p className="text-sm md:text-base text-gray-500">
                    Discover apps, communities & opportunities by Ekthaa
                </p>
            </div>

            {/* Main Apps Section */}
            <div className="w-full max-w-2xl space-y-4 mb-8">
                {/* Ekthaa Business */}
                <div className="bg-gradient-to-br from-teal-50 to-teal-100 border border-teal-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-brand-teal rounded-full flex items-center justify-center text-3xl">
                            💼
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Ekthaa Business</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                List your products, offers & services. Get discovered by nearby customers.
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-brand-teal text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-teal-600 transition-colors"
                                >
                                    Open Business App
                                </a>
                                <div className="flex gap-2">
                                    <a href="https://play.google.com/store/apps/details?id=com.ekthaa.business" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-brand-teal transition-colors" title="Play Store">
                                        <i className="fab fa-google-play text-2xl"></i>
                                    </a>
                                    <Link to="/coming-soon" className="text-gray-700 hover:text-brand-teal transition-colors" title="App Store">
                                        <i className="fab fa-apple text-2xl"></i>
                                    </Link>
                                    <Link to="/coming-soon" className="text-gray-700 hover:text-brand-teal transition-colors" title="Web">
                                        <i className="fas fa-globe text-2xl"></i>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Ekthaa Student */}
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-blue-400 rounded-full flex items-center justify-center text-3xl">
                            🎓
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Ekthaa Student</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Discover nearby businesses, offers & college opportunities.
                            </p>
                            <a
                                href="https://chat.whatsapp.com/IRKgSdE3KtsAiCddDNlHfc"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-blue-500 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-blue-600 transition-colors"
                            >
                                Explore as Student
                            </a>
                        </div>
                    </div>
                </div>

                {/* Ekthaa Builder Community */}
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-4">
                        <div className="flex-shrink-0 w-14 h-14 bg-purple-400 rounded-full flex items-center justify-center text-3xl">
                            🚀
                        </div>
                        <div className="flex-1">
                            <h2 className="text-xl font-bold text-gray-900 mb-2">Ekthaa Builder Community</h2>
                            <p className="text-sm text-gray-600 mb-4">
                                Learn, build & grow with founders and makers.
                            </p>
                            <a
                                href="https://chat.whatsapp.com/L82Bpsj3OD60M5MLxTFRH2"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-purple-500 text-white px-5 py-2.5 rounded-full font-medium text-sm hover:bg-purple-600 transition-colors"
                            >
                                Join Community
                            </a>
                        </div>
                    </div>
                </div>
            </div>

            {/* Opportunities Section */}
            <div className="w-full max-w-2xl mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    🚀 Opportunities with Ekthaa
                </h3>
                <div className="space-y-3">
                    {/* College Fest Student Stall */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-3xl">
                                🎪
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 mb-1">College Fest Student Stall</h4>
                                <p className="text-sm text-gray-600 mb-3">
                                    Run a stall, manage games, earn & learn real-world execution.
                                </p>
                                <a
                                    href="https://docs.google.com/forms/d/e/1FAIpQLSclln7rE1cpVKWDTAaPxx0wsc6UM83X_HWxzEg8Hl-XJkXkEg/viewform?usp=header"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                                >
                                    View Details →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Internships */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-3xl">
                                💼
                            </div>
                            <div className="flex-1">
                                <h4 className="text-lg font-bold text-gray-900 mb-1">Internships</h4>
                                <p className="text-sm text-gray-600 mb-3">
                                    Work with Ekthaa on tech, marketing & operations.
                                </p>
                                <a
                                    href="https://internships.ekthaa.app"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                                >
                                    Apply Now →
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Ekthaa AI */}
                    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                            <div className="flex-shrink-0 text-3xl">
                                🤖
                            </div>
                            <div className="flex-1">
                                <div className="flex items-start justify-between mb-1">
                                    <h4 className="text-lg font-bold text-gray-900">Ekthaa AI</h4>
                                    <span className="bg-brand-teal text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                                        Beta
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 mb-3">
                                    Smart tools to help businesses grow faster.
                                </p>
                                <a
                                    href="https://ekthaa.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-gray-100 text-gray-700 px-4 py-2 rounded-lg font-medium text-sm hover:bg-gray-200 transition-colors"
                                >
                                    Learn More →
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="text-center text-sm text-gray-600 flex items-center gap-2">
                <span>Made with ❤️ by Team Ekthaa</span>
                <a
                    href="https://www.instagram.com/ekthaa.ai?utm_source=qr&igsh=MW1iNGU2ZG1lYWR6dg=="
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-pink-600 hover:text-pink-700 transition-colors"
                    aria-label="Instagram"
                >
                    📷
                </a>
            </div>
        </div>
    );
};

export default HomeNew;
