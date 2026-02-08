import React from 'react';
import { Link } from 'react-router-dom';

const HomeNew = () => {
    const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.ekthaa.business';

    return (
        <div className="min-h-screen bg-brand-beige flex flex-col items-center justify-center px-4 py-12">
            {/* Logo/Brand */}
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">Ekthaa</h1>
                <p className="text-gray-600 text-lg">Discover Local Businesses</p>
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

            {/* Links Section */}
            <div className="flex flex-col items-center gap-4 text-center">
                <Link
                    to="/support"
                    className="text-brand-teal hover:underline font-medium text-lg"
                >
                    Support
                </Link>

                <Link
                    to="/careers"
                    className="text-brand-teal hover:underline font-medium text-lg"
                >
                    Internships & Careers
                </Link>

                <Link
                    to="/privacy"
                    className="text-brand-teal hover:underline font-medium text-lg"
                >
                    Privacy Policy (Business)
                </Link>

                <Link
                    to="/privacy-customer"
                    className="text-brand-teal hover:underline font-medium text-lg"
                >
                    Privacy Policy (Customer)
                </Link>

                <Link
                    to="/terms"
                    className="text-brand-teal hover:underline font-medium text-lg"
                >
                    Terms & Conditions
                </Link>

                <Link
                    to="/delete-account"
                    className="text-brand-teal hover:underline font-medium text-lg"
                >
                    Delete Account
                </Link>
            </div>
        </div>
    );
};

export default HomeNew;
