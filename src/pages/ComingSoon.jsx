import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const ComingSoon = () => {
    return (
        <div className="min-h-screen bg-brand-beige flex flex-col items-center justify-center px-4 py-12">
            <Helmet>
                <title>Coming Soon - Ekthaa</title>
                <meta name="description" content="This feature is coming soon. Please use the Play Store version for now." />
            </Helmet>

            {/* Logo */}
            <img src="/logo.png" alt="Ekthaa Logo" className="h-32 w-32 mb-6" />
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4 text-center">Coming Soon</h1>
            <p className="text-gray-600 text-lg text-center mb-8 max-w-md">
                This version is not available yet. Please use the Play Store version for now.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col gap-4 w-full max-w-sm">
                <a
                    href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:bg-gray-800 transition shadow-lg"
                >
                    <i className="fab fa-google-play text-2xl"></i>
                    <span>Get it on Play Store</span>
                </a>

                <Link
                    to="/"
                    className="bg-brand-teal text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-teal-600 transition shadow-lg"
                >
                    Back to Home
                </Link>
            </div>
        </div>
    );
};

export default ComingSoon;
