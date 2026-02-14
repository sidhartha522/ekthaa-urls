import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PRODUCTS_DATA } from '../data/mockData';

const ProductsNew = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-brand-cream">
            {/* Hero */}
            <div className="bg-gradient-to-r from-brand-teal to-teal-600 text-white py-16 px-4">
                <div className="container mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-4">Our Products</h1>
                    <p className="text-xl opacity-90 max-w-2xl mx-auto">
                        Empowering local businesses and customers with smart digital solutions
                    </p>
                </div>
            </div>

            {/* Products Grid */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {PRODUCTS_DATA.map((product) => (
                        <div key={product.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition border border-brand-beige group">
                            <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${product.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition`}>
                                <i className={`fas ${product.icon} text-white text-2xl`}></i>
                            </div>
                            <h3 className="text-xl font-bold text-brand-dark mb-3">{product.name}</h3>
                            <p className="text-gray-600 mb-6">{product.description}</p>
                            <div className="space-y-2 mb-6">
                                {product.features.map((feature, idx) => (
                                    <div key={idx} className="flex items-center text-sm text-brand-text">
                                        <i className="fas fa-check-circle text-brand-teal mr-2"></i>
                                        {feature}
                                    </div>
                                ))}
                            </div>
                            <button className="w-full bg-brand-teal text-white py-3 rounded-lg font-medium hover:bg-teal-700 transition">
                                Learn More
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Features Highlight */}
            <div className="bg-white py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-3xl font-serif font-bold text-brand-dark text-center mb-12">Why Businesses Choose Ekthaa</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-rupee-sign text-brand-teal text-3xl"></i>
                            </div>
                            <h4 className="font-bold text-brand-dark mb-2">Zero Commission</h4>
                            <p className="text-gray-600">Keep 100% of your sales. No hidden fees or charges.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-mobile-alt text-brand-teal text-3xl"></i>
                            </div>
                            <h4 className="font-bold text-brand-dark mb-2">Easy to Use</h4>
                            <p className="text-gray-600">Simple interface designed for everyone, even without tech experience.</p>
                        </div>
                        <div className="text-center p-6">
                            <div className="w-20 h-20 bg-brand-cream rounded-full flex items-center justify-center mx-auto mb-4">
                                <i className="fas fa-headset text-brand-teal text-3xl"></i>
                            </div>
                            <h4 className="font-bold text-brand-dark mb-2">24/7 Support</h4>
                            <p className="text-gray-600">Our team is always here to help you succeed.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* CTA */}
            <div className="container mx-auto px-4 py-12">
                <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-2xl p-8 md:p-12 text-white text-center">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Ready to Get Started?</h3>
                    <p className="text-lg opacity-90 mb-6">Join the Ekthaa community today</p>
                    <button
                        onClick={() => navigate('/register')}
                        className="bg-white text-purple-600 px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                    >
                        Sign Up Free
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductsNew;
