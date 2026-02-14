import React from 'react';
import { Link } from 'react-router-dom';

const StudentStallInfo = () => {
    return (
        <div className="min-h-screen bg-brand-beige px-4 py-12">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-6">🎯 Ekthaa Play & Win Stalls</h1>
                    <p className="text-xl text-gray-700 leading-relaxed mb-8">
                        Run a Play & Win stall at your college fest and engage students through fun games. All gifts and rewards will be provided by our brand sponsors—you just manage the stall.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Ekthaa is an app built to connect businesses and customers and give local brands a transparent, affordable digital presence. To make Ekthaa visible on-ground, we run Play & Win stalls at college fests and events.
                    </p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">👥 What students will do</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">✓</span>
                            <span>Students will manage the Play & Win stall</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">✓</span>
                            <span>Handle the game, crowd interaction, and gift distribution</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">✓</span>
                            <span>No need to arrange infrastructure or prizes on your own</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">🏗️ What Ekthaa provides (Founder investment)</h2>
                    <p className="text-gray-700 mb-4">Ekthaa will take care of:</p>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>Stall rent</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>Banners & branding</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>Dart game / Play setup</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>Stand, materials, and other required items</span>
                        </li>
                    </ul>
                    <p className="text-gray-700 mt-4 font-medium">Students only focus on running the stall smoothly.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">🎁 Gifts & Rewards (How Play & Win works)</h2>
                    <ul className="space-y-3 text-gray-700 mb-4">
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>Some gifts will be purchased by Ekthaa</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>Some rewards will come from brand sponsors (vouchers, coupons, offers)</span>
                        </li>
                    </ul>
                    <p className="text-gray-700 font-medium mb-3">Example scoring system:</p>
                    <ul className="space-y-2 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">→</span>
                            <span><strong>100+ points</strong> → Brand vouchers / coupons</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">→</span>
                            <span><strong>150+ points</strong> → Small gifts (jhumkas, bracelets, etc.)</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">→</span>
                            <span><strong>200+ points and above</strong> → Better rewards (to be finalized)</span>
                        </li>
                    </ul>
                    <p className="text-gray-700 mt-4">This keeps the game fun, fair, and exciting.</p>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">🤝 Brand Collaboration</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>Brands collaborating with Ekthaa will have their logos displayed below the Play & Win section</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>They get offline visibility + digital presence on Ekthaa</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>We charge brands a very minimal amount, because Ekthaa's goal is affordability for local businesses</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">🎯 Our real goal</h2>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>This initiative is not about profit</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>I may lose money or make a little money</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>The main goal is to make Ekthaa visible, trusted, and useful</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-brand-teal mr-2">•</span>
                            <span>To help businesses reach customers without high marketing costs</span>
                        </li>
                    </ul>
                </div>

                <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
                    <h2 className="text-2xl font-bold text-brand-dark mb-4">🤖 About Ekthaa AI</h2>
                    <p className="text-gray-700 mb-4">Ekthaa AI helps users discover products, offers, and the best deals near them.</p>
                    <div className="space-y-2 text-gray-700">
                        <p><strong>🔗 Web:</strong> <a href="https://ekthaa.com" target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline">ekthaa.com</a></p>
                        <p><strong>📱 Play Store:</strong> Coming soon</p>
                        <p><strong>🍎 App Store:</strong> Coming soon</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-12">
                    <a 
                        href="https://docs.google.com/forms/d/e/1FAIpQLSclln7rE1cpVKWDTAaPxx0wsc6UM83X_HWxzEg8Hl-XJkXkEg/viewform?usp=header" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-gray-800 transition shadow-lg w-full sm:w-auto"
                    >
                        Apply for the Stall →
                    </a>
                    <Link 
                        to="/" 
                        className="bg-brand-teal text-white px-8 py-4 rounded-xl font-bold text-lg text-center hover:bg-teal-600 transition shadow-lg w-full sm:w-auto"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default StudentStallInfo;
