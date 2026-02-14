import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';

const ViewFreePlans = () => {
    const navigate = useNavigate();

    const plans = [
        {
            id: 1,
            colleges: '1',
            price: 'FREE',
            description: 'College Free',
            features: [
                'Promote in 1 college stall',
                'Basic product listing',
                'Standard visibility'
            ]
        },
        {
            id: 2,
            colleges: '1+1',
            price: '₹500',
            description: 'Add 1 More College',
            features: [
                'Promote in 2 college stalls',
                'Expanded reach',
                'Higher visibility'
            ]
        },
        {
            id: 3,
            colleges: '10',
            price: '₹2,500',
            description: '10 Colleges',
            features: [
                'Promote in 10 college stalls',
                'Premium placement',
                'Branded flex displays'
            ],
            popular: true
        },
        {
            id: 4,
            colleges: '20',
            price: '₹4,000',
            description: '20 Colleges',
            features: [
                'Promote in 20 college stalls',
                'Maximum reach',
                'Co-sponsorship opportunities'
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans text-brand-text">
            <Helmet>
                <title>View Free Plans - Ekthaa Business Promotion</title>
                <meta name="description" content="Explore our college stall promotion plans. Choose the perfect plan to promote your brand in college events." />
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
                <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-brand-dark leading-tight mb-6">
                        College <span className="text-brand-teal">Stall Plans</span>
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                        Choose the perfect plan to boost your brand visibility in college events and stalls
                    </p>
                </div>
            </section>

            {/* Plans Section */}
            <section className="py-20 md:py-28 bg-white">
                <div className="max-w-6xl mx-auto px-4 sm:px-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
                        {plans.map((plan) => (
                            <div 
                                key={plan.id}
                                className={`relative rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${
                                    plan.popular 
                                        ? 'lg:scale-105 bg-gradient-to-br from-brand-teal to-teal-500 text-white shadow-xl'
                                        : 'bg-white border border-gray-200 hover:border-brand-teal shadow-md'
                                }`}
                            >
                                {plan.popular && (
                                    <div className="absolute top-0 right-0 bg-brand-teal text-white px-4 py-1 text-xs font-bold rounded-bl-lg">
                                        POPULAR
                                    </div>
                                )}

                                <div className="p-8">
                                    {/* Plan Header */}
                                    <div className="mb-8">
                                        <h3 className={`text-3xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-brand-dark'}`}>
                                            {plan.colleges}
                                        </h3>
                                        <p className={`text-sm font-medium mb-4 ${plan.popular ? 'text-teal-100' : 'text-gray-600'}`}>
                                            {plan.description}
                                        </p>
                                        <div className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-brand-teal'}`}>
                                            {plan.price}
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="space-y-4 mb-8">
                                        {plan.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-3">
                                                <svg 
                                                    className={`w-5 h-5 mt-0.5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-brand-teal'}`}
                                                    fill="currentColor" 
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                                <span className={`text-sm ${plan.popular ? 'text-teal-50' : 'text-gray-700'}`}>
                                                    {feature}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* CTA Button */}
                                    <button 
                                        className={`w-full py-3 px-4 rounded-full font-semibold transition-all duration-300 ${
                                            plan.popular
                                                ? 'bg-white text-brand-teal hover:bg-gray-100 shadow-lg'
                                                : 'bg-brand-teal text-white hover:bg-teal-600 shadow-md hover:shadow-lg'
                                        }`}
                                    >
                                        {plan.price === 'FREE' ? 'Get Started' : 'Purchase Plan'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <div className="mt-16 pt-12 border-t border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="text-center">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-brand-teal" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 1 1 0 000 2H5a1 1 0 00-1 1v12a1 1 0 001 1h10a1 1 0 001-1V5a1 1 0 00-1-1h-1a1 1 0 000-2 2 2 0 00-2 2v1H4V5zm12 10H4v2h12v-2z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-brand-dark mb-2">Easy Setup</h4>
                                <p className="text-sm text-gray-600">Get started in minutes with our simple onboarding process</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-brand-teal" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M13 7H7v6h6V7z" />
                                        <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2V2a1 1 0 112 0v1h1a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v1a2 2 0 01-2 2h-1v1a1 1 0 11-2 0v-1h-2v1a1 1 0 11-2 0v-1H7a2 2 0 01-2-2v-1H4a1 1 0 110-2h1v-2H4a1 1 0 110-2h1V9H4a1 1 0 110-2h1V5a2 2 0 012-2h1V2a1 1 0 010-2zm9 4v12H5V6h11z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-brand-dark mb-2">Wide Reach</h4>
                                <p className="text-sm text-gray-600">Reach thousands of college students across multiple campuses</p>
                            </div>

                            <div className="text-center">
                                <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <svg className="w-6 h-6 text-brand-teal" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <h4 className="font-bold text-brand-dark mb-2">Guaranteed Results</h4>
                                <p className="text-sm text-gray-600">Measurable engagement and visibility for your brand</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-brand-teal to-teal-500 text-white py-16 md:py-20">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
                        Ready to Boost Your Brand?
                    </h2>
                    <p className="text-lg text-teal-100 mb-8">
                        Choose a plan and start promoting your brand in college events today
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button 
                            onClick={() => navigate('/freeplan')}
                            className="bg-white text-brand-teal px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg"
                        >
                            Learn How It Works
                        </button>
                        <a 
                            href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-teal-700 text-white px-8 py-3 rounded-full font-semibold hover:bg-teal-800 transition-all shadow-lg"
                        >
                            Download App
                        </a>
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

export default ViewFreePlans;
