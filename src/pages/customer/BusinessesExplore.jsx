import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { businessApi } from '../../services/businessApi';
import { BusinessesPageSkeleton } from '../../components/Skeleton';
import { SearchIcon, LocationIcon, BoxIcon, ChevronRightIcon, ChevronLeftIcon, XIcon, EmptyStoreIllustration } from '../../components/icons/Icons';

const ITEMS_PER_PAGE = 24;

const BusinessesExplore = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [businesses, setBusinesses] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [cities, setCities] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [selectedCity, setSelectedCity] = useState(searchParams.get('city') || '');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [seoMeta, setSeoMeta] = useState(null);

    useEffect(() => {
        loadBusinesses();
    }, [selectedCategory, selectedCity, currentPage]);

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            if (searchQuery !== searchParams.get('search')) {
                loadBusinesses();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const loadBusinesses = async () => {
        setLoading(true);
        try {
            // Get user location from storage for sorting
            let lat, lng;
            try {
                const loc = JSON.parse(localStorage.getItem('user_location'));
                if (loc && loc.lat && loc.lng) {
                    lat = loc.lat;
                    lng = loc.lng;
                }
            } catch (e) { }

            const data = await businessApi.getRealBusinesses({
                search: searchQuery,
                category: selectedCategory !== 'All' ? selectedCategory : undefined,
                city: selectedCity || undefined,
                limit: ITEMS_PER_PAGE,
                offset: (currentPage - 1) * ITEMS_PER_PAGE,
                includeSeo: true,
                lat,
                lng
            });

            setBusinesses(data.businesses || []);
            setTotalCount(data.count || 0);

            // Set categories and cities from API
            if (data.categories && data.categories.length > 0) {
                setCategories(['All', ...data.categories]);
            }
            if (data.cities && data.cities.length > 0) {
                setCities(data.cities);
            }

            // Store SEO metadata
            if (data.seo) {
                setSeoMeta(data.seo.meta);
            }

            // Update URL params
            const params = new URLSearchParams();
            if (searchQuery) params.set('search', searchQuery);
            if (selectedCategory !== 'All') params.set('category', selectedCategory);
            if (selectedCity) params.set('city', selectedCity);
            setSearchParams(params);

        } catch (error) {
            console.error('Failed to load businesses:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    if (loading) {
        return <BusinessesPageSkeleton />;
    }

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>{seoMeta?.title || 'Local Businesses | Ekthaa'}</title>
                <meta name="description" content={seoMeta?.description || 'Discover local businesses on Ekthaa'} />
                {seoMeta?.keywords && <meta name="keywords" content={seoMeta.keywords.join(', ')} />}
                <link rel="canonical" href={`https://ekthaa.com/businesses${selectedCity ? `?city=${selectedCity}` : ''}`} />
            </Helmet>

            <div className="min-h-screen bg-brand-cream pb-20">
                {/* Header - Teal Gradient */}
                <div className="bg-gradient-to-r from-brand-teal to-teal-600 text-white py-8 px-4">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-serif font-bold mb-2">Explore Businesses</h1>
                        <p className="text-lg opacity-90">
                            {totalCount} businesses {selectedCity ? `in ${selectedCity}` : 'on Ekthaa'}
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6">
                    {/* Search Bar */}
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 max-w-2xl mx-auto">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2">
                            <SearchIcon size={20} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search businesses by name, category, or location..."
                                className="flex-1 bg-transparent outline-none text-brand-text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            {searchQuery && (
                                <button onClick={() => setSearchQuery('')} className="text-gray-400 hover:text-gray-600">
                                    <XIcon size={18} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* City and Category Filters */}
                    <div className="flex flex-wrap gap-4 mb-6">
                        {/* City Filter */}
                        {cities.length > 0 && (
                            <select
                                value={selectedCity}
                                onChange={(e) => { setSelectedCity(e.target.value); setCurrentPage(1); }}
                                className="px-4 py-2 rounded-lg bg-white border border-gray-200 text-brand-text focus:border-brand-teal outline-none"
                            >
                                <option value="">All Cities</option>
                                {cities.map(city => (
                                    <option key={city} value={city}>{city}</option>
                                ))}
                            </select>
                        )}

                        {/* Category Filter */}
                        <div className="flex gap-2 flex-wrap">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    onClick={() => handleCategoryChange(category)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition ${selectedCategory === category
                                        ? 'bg-brand-teal text-white'
                                        : 'bg-white text-brand-text border border-gray-200 hover:border-brand-teal'
                                        }`}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Businesses Grid */}
                    {businesses.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <EmptyStoreIllustration size={100} className="mx-auto mb-4 text-brand-teal opacity-50" />
                            <h3 className="font-bold text-brand-dark mb-2">No Businesses Found</h3>
                            <p className="text-gray-500">
                                {searchQuery ? 'Try a different search term' : 'Businesses will appear here once they register'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {businesses.map(business => (
                                    <article
                                        key={business.id}
                                        className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition cursor-pointer group border border-transparent hover:border-brand-teal/20"
                                        onClick={() => navigate(`/business/${business.id}`)}
                                        itemScope
                                        itemType="https://schema.org/LocalBusiness"
                                    >
                                        <div className="flex items-start gap-4">
                                            {business.profile_photo_url ? (
                                                <img
                                                    src={business.profile_photo_url}
                                                    alt={business.name}
                                                    className="w-16 h-16 rounded-lg object-cover bg-gray-100 border border-gray-100 flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-16 h-16 bg-gradient-to-br from-brand-teal to-teal-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold flex-shrink-0">
                                                    {business.name?.charAt(0).toUpperCase() || 'B'}
                                                </div>
                                            )}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-brand-dark group-hover:text-brand-teal transition truncate" itemProp="name">
                                                    {business.name}
                                                </h3>
                                                {business.category && (
                                                    <span className="inline-block px-2 py-0.5 bg-brand-teal/10 text-brand-teal text-xs rounded-full mt-1">
                                                        {business.category}
                                                    </span>
                                                )}
                                                {business.description && (
                                                    <p className="text-sm text-gray-500 mt-2 line-clamp-2" itemProp="description">{business.description}</p>
                                                )}
                                                <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                                                    {business.distance !== undefined && business.distance !== null && (
                                                        <span className="flex items-center gap-1 text-brand-teal font-medium bg-brand-teal/10 px-2 py-0.5 rounded-full">
                                                            <LocationIcon size={12} />
                                                            {business.distance < 1
                                                                ? `${Math.round(business.distance * 1000)}m`
                                                                : `${business.distance.toFixed(1)}km`
                                                            }
                                                        </span>
                                                    )}
                                                    {business.city && (
                                                        <span className="flex items-center gap-1" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                                                            <LocationIcon size={12} />
                                                            <span itemProp="addressLocality">{business.city}</span>
                                                        </span>
                                                    )}
                                                    {business.product_count > 0 && (
                                                        <span className="flex items-center gap-1">
                                                            <BoxIcon size={12} />
                                                            {business.product_count} products
                                                        </span>
                                                    )}
                                                </div>
                                                {business.phone_number && (
                                                    <meta itemProp="telephone" content={business.phone_number} />
                                                )}
                                            </div>
                                            <ChevronRightIcon size={20} className="text-gray-300 group-hover:text-brand-teal transition flex-shrink-0" />
                                        </div>
                                    </article>
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className="flex justify-center items-center gap-2 mt-8">
                                    <button
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 hover:border-brand-teal transition flex items-center"
                                    >
                                        <ChevronLeftIcon size={18} />
                                    </button>

                                    <span className="px-4 py-2 text-brand-text">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 hover:border-brand-teal transition flex items-center"
                                    >
                                        <ChevronRightIcon size={18} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* View Products Link */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/explore')}
                            className="text-brand-teal font-medium hover:underline flex items-center gap-2 justify-center mx-auto"
                        >
                            <BoxIcon size={18} />
                            View Products Catalogue Instead
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BusinessesExplore;
