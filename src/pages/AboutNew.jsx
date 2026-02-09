import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TEAM_VALUES } from '../data/mockData';

const AboutNew = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-brand-cream">
            {/* Hero */}
            <div className="bg-gradient-to-r from-brand-teal to-teal-600 text-white py-20 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">About Ekthaa</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Empowering local businesses with smart digital solutions since 2024
                    </p>
                </div>
            </div>

            {/* Mission */}
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-serif font-bold text-brand-dark mb-6">Our Mission</h2>
                        <p className="text-gray-600 mb-4 text-lg">
                            Ekthaa means "unity" - and that's exactly what we're building. A unified platform that connects
                            local businesses with their customers, making local commerce simpler and more accessible.
                        </p>
                        <p className="text-gray-600 mb-4">
                            We believe every local business deserves the same digital tools as big corporations,
                            without the complexity or high costs. Our platform helps small businesses manage their
                            inventory, track customers, and grow their presence - all from their smartphone.
                        </p>
                        <p className="text-gray-600">
                            For customers, we provide an easy way to connect with businesses and manage credit transactions,
                            and support their neighborhood shops.
                        </p>
                    </div>
                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-brand-beige">
                        <div className="grid grid-cols-2 gap-6 text-center">
                            <div>
                                <div className="text-4xl font-bold text-brand-teal mb-2">500+</div>
                                <div className="text-sm text-gray-600">Businesses</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-brand-teal mb-2">10K+</div>
                                <div className="text-sm text-gray-600">Users</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-brand-teal mb-2">50+</div>
                                <div className="text-sm text-gray-600">Cities</div>
                            </div>
                            <div>
                                <div className="text-4xl font-bold text-brand-teal mb-2">₹1Cr+</div>
                                <div className="text-sm text-gray-600">Transactions</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Values */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold text-brand-dark text-center mb-12">Our Values</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {TEAM_VALUES.map((value, idx) => (
                            <div key={idx} className="bg-brand-cream p-6 rounded-xl text-center group hover:shadow-lg transition">
                                <div className="w-16 h-16 bg-brand-teal/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand-teal transition">
                                    <i className={`fas ${value.icon} text-brand-teal text-2xl group-hover:text-white transition`}></i>
                                </div>
                                <h4 className="font-bold text-brand-dark mb-2">{value.title}</h4>
                                <p className="text-sm text-gray-600">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Story */}
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl font-serif font-bold text-brand-dark mb-8">Our Story</h2>
                    <p className="text-gray-600 mb-4 text-lg">
                        Ekthaa started with a simple observation: local businesses struggle with digital tools
                        that are either too complicated or too expensive. We set out to change that.
                    </p>
                    <p className="text-gray-600 mb-4">
                        Our team of engineers and designers worked closely with local shop owners to understand
                        their needs. The result is a platform that's intuitive, affordable, and powerful.
                    </p>
                    <p className="text-gray-600">
                        Today, Ekthaa helps hundreds of businesses across India manage their daily operations
                        and connect with customers who value local commerce.
                    </p>
                </div>
            </div>

            {/* CTA */}
            <div className="container mx-auto px-4 pb-12">
                <div className="bg-gradient-to-r from-brand-teal to-teal-600 rounded-2xl p-8 md:p-12 text-white text-center">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Join the Ekthaa Family</h3>
                    <p className="text-lg opacity-90 mb-6">Whether you're a business or customer, we'd love to have you</p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/explore')}
                            className="bg-white text-brand-teal px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                        >
                            Explore Businesses
                        </button>
                        <button
                            onClick={() => navigate('/careers')}
                            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition"
                        >
                            Join Our Team
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutNew;
