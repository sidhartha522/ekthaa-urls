import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

const FreePlan = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-white font-sans text-brand-text">
            <Helmet>
                <title>Free Plan - Promote Your Brand for Free | Ekthaa</title>
                <meta name="description" content="Learn how to promote your brand for free through Ekthaa's college stalls. Simple steps to get started." />
            </Helmet>

            {/* Header */}
            <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <Link to="/" className="text-2xl font-serif font-bold tracking-tight text-brand-dark">
                        EKTHAA
                    </Link>
                    <button 
                        onClick={() => navigate(-1)}
                        className="text-sm font-medium text-gray-600 hover:text-brand-teal transition-colors"
                    >
                        ← Back
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="bg-gradient-to-br from-teal-50 via-white to-orange-50 py-16 md:py-24">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-dark leading-tight mb-6">
                        Promote Your Brand <span className="text-brand-teal">100% FREE</span>
                    </h1>
                </div>
            </section>

            {/* Steps Section */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6">
                    <div className="space-y-12">
                        {/* Step 1 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-xl">
                                1
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-brand-dark mb-3">Download Ekthaa Business</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Get the Ekthaa Business app from Google Play Store to manage your brand promotions.
                                </p>
                                <a 
                                    href="https://play.google.com/store/apps/details?id=com.ekthaa.business" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 bg-brand-teal text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition-all shadow-md hover:shadow-lg"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z"/>
                                    </svg>
                                    Download from Play Store
                                </a>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-xl">
                                2
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-brand-dark mb-3">Register Your Business</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Create your business profile by providing basic details like business name, category, location, and contact information. This takes less than 2 minutes!
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-xl">
                                3
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-brand-dark mb-3">Click on "Promote in College Stalls" Button</h3>
                                <p className="text-gray-600 leading-relaxed">
                                    Navigate to your product catalog and click on the "Promote in College Stalls" button to opt-in for free promotion. Your products will be featured in our Play & Win stalls!
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="flex gap-6 items-start">
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-teal text-white flex items-center justify-center font-bold text-xl">
                                4
                            </div>
                            <div className="flex-1">
                                <h3 className="text-2xl font-bold text-brand-dark mb-3">Click on "Boost in College Stall" for More Visibility</h3>
                                <p className="text-gray-600 mb-4 leading-relaxed">
                                    Want even more visibility and engagement? Upgrade to our paid plans for premium placement, branded flex displays, and co-sponsorship opportunities.
                                </p>
                                <Link 
                                    to="/events#plans"
                                    className="inline-flex items-center gap-2 bg-brand-teal text-white px-6 py-3 rounded-full font-semibold hover:bg-teal-600 transition-all shadow-md hover:shadow-lg"
                                >
                                    View Plans
                                </Link>
                            </div>
                        </div>

                        {/* Image */}
                        <div className="bg-brand-cream rounded-2xl p-6 my-8">
                            <img 
                                src="/Screenshot_20260211_124704_Ekthaa Business.jpg" 
                                alt="Ekthaa Business App - My Products Screen"
                                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-brand-dark text-gray-400 py-10">
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <p className="text-white font-serif font-bold text-lg mb-1">EKTHAA</p>
                    <p className="text-sm">Building better discovery for local businesses.</p>
                    <p className="text-sm text-gray-500 mt-4">© {new Date().getFullYear()} Ekthaa. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default FreePlan;
