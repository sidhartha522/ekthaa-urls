import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessApi, getAvailableCategories } from '../services/businessApi';
import { TRENDING_SEARCHES, SEASONAL_ESSENTIALS, APP_FEATURES } from '../data/mockData';

const HomeNew = ({ currentCity }) => {
    const navigate = useNavigate();
    const [activeBanner, setActiveBanner] = useState(0);
    const [businesses, setBusinesses] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    const banners = [
        { title: "Discover Local Businesses", subtitle: "Find nearby shops, services & products easily", color: "from-brand-teal to-teal-700", cta: "Explore Nearby", action: 'explore' },
        { title: "Smart Local Search", subtitle: "Ask in natural language - we understand what you need", color: "from-teal-600 to-brand-teal", cta: "Try Search", action: 'search' },
        { title: "Support Local Commerce", subtitle: "Connect with trusted businesses in your area", color: "from-brand-teal to-teal-600", cta: "Find Businesses", action: 'explore' },
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setActiveBanner((prev) => (prev + 1) % banners.length);
        }, 4000);
        return () => clearInterval(timer);
    }, [banners.length]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const isMobile = window.innerWidth < 768;
                // Use Appwrite directly (no backend needed) - same as Explore page
                const businessResponse = await businessApi.getRealBusinesses({
                    limit: isMobile ? 4 : 12, // Limit 4 for mobile, 12 for desktop (3 rows x 4 cols)
                    city: currentCity
                });

                // getRealBusinesses returns { businesses: [], count: N }
                const businessList = businessResponse.businesses || [];

                // Get categories from Appwrite
                const availableCategories = await getAvailableCategories();

                setBusinesses(businessList);
                setCategories(availableCategories || []);
            } catch (err) {
                console.error('Failed to fetch data:', err);
                setBusinesses([]);
                setCategories([]);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [currentCity]);

    const handleBannerAction = (action) => {
        if (action === 'explore') navigate('/businesses');
        else window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className="space-y-10 animate-fade-in pb-8">
            {/* Hero Banner Carousel */}
            <div className="bg-brand-beige p-4 md:pt-6">
                <div className={`container mx-auto rounded-xl overflow-hidden shadow-lg relative h-64 md:h-72 bg-gradient-to-r ${banners[activeBanner].color} transition-colors duration-500`}>
                    <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 text-white z-10 max-w-2xl">
                        <h2 className="text-2xl md:text-5xl font-serif font-bold mb-2 md:mb-3 leading-tight">{banners[activeBanner].title}</h2>
                        <p className="text-base md:text-xl opacity-90 mb-4 md:mb-6 line-clamp-2 md:line-clamp-none">{banners[activeBanner].subtitle}</p>

                        <button
                            onClick={() => handleBannerAction(banners[activeBanner].action)}
                            className="bg-white text-brand-dark px-6 py-2 md:px-8 md:py-3 text-sm md:text-base rounded font-bold shadow-lg hover:bg-opacity-90 hover:scale-105 transition transform"
                        >
                            {banners[activeBanner].cta}
                        </button>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {banners.map((_, idx) => (
                            <div
                                key={idx}
                                onClick={() => setActiveBanner(idx)}
                                className={`w-2 h-2 rounded-full cursor-pointer transition-all ${idx === activeBanner ? 'bg-white w-6' : 'bg-white/40'}`}
                            ></div>
                        ))}
                    </div>
                </div>
            </div>



            {/* Local Businesses Grid (Replaced Category Hub) */}
            <div className="container mx-auto px-4">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-serif font-bold text-brand-dark flex items-center">
                        Discover Local Businesses{currentCity && ` in ${currentCity}`}
                    </h3>
                    <span
                        className="text-sm font-medium text-brand-teal cursor-pointer hover:underline"
                        onClick={() => navigate('/businesses')}
                    >
                        View All Nearby
                    </span>
                </div>

                {loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {Array(8).fill(0).map((_, idx) => (
                            <div key={idx} className="bg-white rounded-lg p-4 border border-brand-beige animate-pulse">
                                <div className="h-32 bg-gray-200 rounded-md mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded mb-2 w-3/4"></div>
                                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                            </div>
                        ))}
                    </div>
                ) : businesses.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {businesses.map((business) => (
                            <div
                                key={business.id || business.$id}
                                className="bg-white rounded-xl border border-brand-beige overflow-hidden hover:shadow-lg transition-all cursor-pointer group flex flex-col"
                                onClick={() => navigate(`/business/${business.id || business.$id}`)}
                            >
                                <div className="h-32 bg-gray-100 relative">
                                    {business.profile_photo_url ? (
                                        <img src={business.profile_photo_url} alt={business.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-brand-teal/10 text-brand-teal">
                                            <i className="fas fa-store text-3xl opacity-50"></i>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-bold shadow-sm">
                                        ⭐ {business.rating || '4.5'}
                                    </div>
                                </div>
                                <div className="p-4 flex-1 flex flex-col">
                                    <h4 className="font-bold text-brand-dark mb-1 group-hover:text-brand-teal transition-colors line-clamp-1">{business.name}</h4>
                                    <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex-1">{business.description || 'Serving the community'}</p>

                                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <i className="fas fa-map-marker-alt"></i> {business.distance || '0.8 km'}
                                        </span>
                                        <span className="text-xs font-medium text-brand-teal bg-brand-teal/5 px-2 py-1 rounded">
                                            {business.category || 'Local'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                        <div className="text-4xl text-brand-teal mb-3 opacity-50">🏪</div>
                        <h4 className="font-medium text-gray-600">No businesses found nearby</h4>
                        <p className="text-sm text-gray-400 mt-1">Try changing your location or check back later!</p>
                    </div>
                )}
            </div>

            {/* How It Works Section */}
            <div className="bg-brand-beige/30 py-12">
                <div className="container mx-auto px-4">
                    <h3 className="text-2xl font-serif font-bold text-brand-dark mb-10 text-center">How Ekthaa Works</h3>
                    <div className="flex flex-col md:flex-row justify-center gap-8 md:gap-16">
                        {[
                            { icon: 'fa-search', title: '1. Search', desc: 'Find local services & shops near you' },
                            { icon: 'fa-comments', title: '2. Connect', desc: 'Chat directly with business owners' },
                            { icon: 'fa-hand-holding-heart', title: '3. Support Local', desc: 'Get great deals & support community' }
                        ].map((step, idx) => (
                            <div key={idx} className="flex flex-col items-center text-center max-w-xs">
                                <div className="w-16 h-16 bg-white rounded-full shadow-md flex items-center justify-center mb-4 text-brand-teal text-2xl">
                                    <i className={`fas ${step.icon}`}></i>
                                </div>
                                <h4 className="font-bold text-brand-dark text-lg mb-2">{step.title}</h4>
                                <p className="text-gray-600 text-sm">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Top Rated Businesses Section */}
            {businesses.some(b => (b.rating || 4.5) >= 4.5) && (
                <div className="container mx-auto px-4">
                    <h3 className="text-xl font-serif font-bold text-brand-dark mb-6 flex items-center gap-2">
                        <i className="fas fa-award text-yellow-500"></i> Top Rated in {currentCity || 'Your Area'}
                    </h3>
                    <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                        {businesses
                            .filter(b => (b.rating || 4.5) >= 4.5)
                            .slice(0, 5)
                            .map((business) => (
                                <div
                                    key={`top-${business.id || business.$id}`}
                                    className="min-w-[280px] bg-white rounded-xl border border-brand-beige overflow-hidden hover:shadow-lg transition-all cursor-pointer flex flex-col"
                                    onClick={() => navigate(`/business/${business.id || business.$id}`)}
                                >
                                    <div className="h-40 bg-gray-100 relative">
                                        {business.profile_photo_url ? (
                                            <img src={business.profile_photo_url} alt={business.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-brand-teal/10 text-brand-teal">
                                                <i className="fas fa-store text-4xl opacity-50"></i>
                                            </div>
                                        )}
                                        <div className="absolute top-2 right-2 bg-yellow-400 text-brand-dark px-2 py-1 rounded text-xs font-bold shadow-sm">
                                            ⭐ {business.rating || '4.5'}
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <h4 className="font-bold text-brand-dark mb-1 line-clamp-1">{business.name}</h4>
                                        <p className="text-xs text-gray-500 mb-2 line-clamp-2">{business.description}</p>
                                        <span className="text-xs font-medium text-brand-teal bg-brand-teal/5 px-2 py-1 rounded inline-block">
                                            {business.category || 'Top Choice'}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            )}

            {/* Trending Searches */}
            <div className="container mx-auto px-4">
                <h3 className="text-lg font-serif font-bold text-brand-dark mb-4">Trending Near You</h3>
                <div className="flex flex-wrap gap-3">
                    {TRENDING_SEARCHES.map((term, idx) => (
                        <span
                            key={idx}
                            onClick={() => navigate(`/service/${encodeURIComponent(term.toLowerCase())}`)}
                            className="px-4 py-2 bg-white border border-brand-beige rounded-full text-sm text-brand-text cursor-pointer hover:border-brand-teal hover:text-brand-teal hover:shadow-sm transition"
                        >
                            {term}
                        </span>
                    ))}
                </div>
            </div>



            {/* Features Section */}
            <div className="container mx-auto px-4">
                <h3 className="text-2xl font-serif font-bold text-brand-dark mb-6 text-center">Why Choose Ekthaa?</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {APP_FEATURES.map((feature, idx) => (
                        <div key={idx} className="bg-white p-6 rounded-xl border border-brand-beige hover:shadow-lg transition group">
                            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition`}>
                                <i className={`fas ${feature.icon} text-white text-xl`}></i>
                            </div>
                            <h4 className="font-bold text-brand-dark mb-2">{feature.title}</h4>
                            <p className="text-sm text-gray-600">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="container mx-auto px-4">
                <div className="bg-gradient-to-r from-brand-teal to-teal-600 rounded-2xl p-8 md:p-12 text-white text-center">
                    <h3 className="text-2xl md:text-3xl font-serif font-bold mb-4">Ready to Discover Local Businesses?</h3>
                    <p className="text-lg opacity-90 mb-6 max-w-2xl mx-auto">
                        Join thousands of users finding trusted local businesses every day
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <button
                            onClick={() => navigate('/businesses')}
                            className="bg-white text-brand-teal px-8 py-3 rounded-lg font-bold hover:bg-opacity-90 transition"
                        >
                            Explore Now
                        </button>
                        <button
                            onClick={() => navigate('/register')}
                            className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white/10 transition"
                        >
                            Sign Up Free
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomeNew;
