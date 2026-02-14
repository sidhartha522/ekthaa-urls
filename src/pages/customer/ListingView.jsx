import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { businessApi } from '../../services/businessApi';

const ListingView = () => {
    const navigate = useNavigate();
    const [businesses, setBusinesses] = useState([]);
    const [filteredBusinesses, setFilteredBusinesses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [initialLoad, setInitialLoad] = useState(true);

    const isAllBusinesses = true;

    useEffect(() => {
        const scrollY = sessionStorage.getItem('detailScrollY');

        fetchBusinesses();

        if (scrollY) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(scrollY));
                sessionStorage.removeItem('detailScrollY');
            }, 100);
        }
    }, []);

    const fetchBusinesses = async () => {
        if (businesses.length === 0) {
            setLoading(true);
        }

        try {
            const products = await businessApi.getPublicProducts();
            const businessData = businessApi.transformProductsToBusinesses(products);

            setBusinesses(businessData);
            setFilteredBusinesses(businessData);
        } catch (error) {
            console.error('Failed to fetch businesses:', error);
            setBusinesses([]);
            setFilteredBusinesses([]);
        } finally {
            setLoading(false);
            setInitialLoad(false);
        }
    };

    const handleBusinessClick = (businessId) => {
        sessionStorage.setItem('listingScrollY', window.pageYOffset.toString());
        navigate(`/business/${businessId}`);
    };

    const handleBack = () => {
        sessionStorage.setItem('listingScrollY', window.pageYOffset.toString());
        navigate('/');
    };

    const categoryName = 'All Businesses';

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="p-4 flex items-center">
                    <button
                        onClick={handleBack}
                        className="mr-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
                    >
                        <i className="fas fa-arrow-left text-gray-600"></i>
                    </button>
                    <div className="flex-1">
                        <h1 className="text-lg font-semibold text-gray-900">{categoryName}</h1>
                        <p className="text-sm text-gray-500">
                            {filteredBusinesses.length} businesses found
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {(loading && initialLoad) ? (
                    <div className="space-y-4">
                        {Array(5).fill(0).map((_, index) => (
                            <div key={index} className="animate-pulse">
                                <div className="bg-white rounded-lg p-4 shadow-sm">
                                    <div className="flex">
                                        <div className="w-16 h-16 bg-gray-200 rounded-lg mr-4"></div>
                                        <div className="flex-1">
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2 mb-1"></div>
                                            <div className="h-3 bg-gray-200 rounded w-2/3"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : filteredBusinesses.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 text-4xl mb-4">
                            <i className="fas fa-store-slash"></i>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                            No businesses found
                        </h3>
                        <p className="text-gray-500 mb-4">
                            {isAllBusinesses
                                ? "Ekthaa - Connecting Businesses and Customers"
                                : `Find trusted ${categoryName} businesses in your area.`
                            }
                        </p>
                        <button
                            onClick={() => navigate('/')}
                            className="px-6 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-700 transition-colors"
                        >
                            Go Back
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredBusinesses.map((business) => (
                            <div
                                key={business.id || business.$id}
                                onClick={() => handleBusinessClick(business.id || business.$id)}
                                className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                            >
                                <div className="flex">
                                    <div className="w-16 h-16 bg-gradient-to-br from-brand-teal to-teal-600 rounded-lg mr-4 flex items-center justify-center text-white text-xl font-bold">
                                        {business.name?.charAt(0).toUpperCase() || 'B'}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900 mb-1">
                                            {business.name || 'Unnamed Business'}
                                        </h3>
                                        {business.description && (
                                            <p
                                                className="text-sm text-gray-600 mb-2 line-clamp-2 hover:text-brand-teal cursor-pointer transition-colors hover:underline"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    const serviceName = business.category || 'general';
                                                    navigate(`/service/${encodeURIComponent(serviceName.toLowerCase())}`);
                                                }}
                                                title="Click to view all businesses offering this service"
                                            >
                                                {business.description}
                                                {business.category && <i className="fas fa-external-link-alt ml-1 text-xs opacity-60"></i>}
                                            </p>
                                        )}
                                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                                            {business.phone_number && (
                                                <div className="flex items-center">
                                                    <i className="fas fa-phone mr-1"></i>
                                                    {business.phone_number}
                                                </div>
                                            )}
                                            {business.address && (
                                                <div className="flex items-center">
                                                    <i className="fas fa-map-marker-alt mr-1 text-brand-teal"></i>
                                                    <span className="text-brand-teal font-medium">Nearby</span>
                                                </div>
                                            )}
                                        </div>
                                        <div className="flex items-center mt-2 text-xs">
                                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full mr-2">
                                                <i className="fas fa-shield-check mr-1"></i>Trusted on Ekthaa
                                            </span>
                                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                                <i className="fas fa-store mr-1"></i>Local Business
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end justify-between">
                                        <div className="text-brand-teal">
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                        <div className="text-xs text-gray-400">
                                            ID: {(business.id || business.$id || '').toString().slice(-4)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ListingView;
