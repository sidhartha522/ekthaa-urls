import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { businessApi } from '../../services/businessApi';
import { DetailPageSkeleton } from '../../components/Skeleton';
import { ArrowLeftIcon, LocationIcon, PhoneIcon, MailIcon, GlobeIcon, EmptyStoreIllustration } from '../../components/icons/Icons';

const DetailView = () => {
    const { businessId } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (businessId) {
            fetchBusiness();
        }
    }, [businessId]);

    const fetchBusiness = async () => {
        setLoading(true);
        try {
            const data = await businessApi.getPublicBusiness(businessId);
            setBusiness(data);
        } catch (error) {
            console.error('Failed to fetch business:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatCurrency = (amount) => `₹${(amount || 0).toLocaleString('en-IN')}`;

    if (loading) {
        return <DetailPageSkeleton />;
    }

    if (!business) {
        return (
            <div className="min-h-screen bg-brand-cream flex items-center justify-center">
                <div className="text-center">
                    <EmptyStoreIllustration size={100} className="mx-auto mb-4" />
                    <h2 className="font-bold text-xl text-brand-dark mb-2">Business Not Found</h2>
                    <p className="text-gray-500 mb-4">The business you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/businesses')}
                        className="px-6 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-700 transition"
                    >
                        Back to Businesses
                    </button>
                </div>
            </div>
        );
    }

    const businessUrl = `https://ekthaa.com/business/${business.id}`;
    const businessImage = business.profile_photo_url || 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=800&q=80';

    // JSON-LD structured data for SEO
    const jsonLdData = {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "@id": businessUrl,
        "name": business.name,
        "description": business.description || `${business.name} - Local business on Ekthaa`,
        "image": businessImage,
        "telephone": business.phone_number,
        "email": business.email,
        "address": {
            "@type": "PostalAddress",
            "streetAddress": business.address,
            "addressLocality": business.city,
            "addressRegion": business.state,
            "postalCode": business.pincode,
            "addressCountry": "IN"
        },
        "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Products",
            "numberOfItems": business.products_count || 0
        }
    };

    if (business.latitude && business.longitude) {
        jsonLdData.geo = {
            "@type": "GeoCoordinates",
            "latitude": business.latitude,
            "longitude": business.longitude
        };
    }

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>{business.name} | Ekthaa</title>
                <meta name="description" content={business.description || `Visit ${business.name} on Ekthaa - ${business.category || 'Local Business'}`} />
                <meta property="og:title" content={business.name} />
                <meta property="og:description" content={business.description || `${business.name} - ${business.products_count || 0} products`} />
                <meta property="og:image" content={businessImage} />
                <meta property="og:url" content={businessUrl} />
                <meta property="og:type" content="business.business" />
                <link rel="canonical" href={businessUrl} />
                <script type="application/ld+json">{JSON.stringify(jsonLdData)}</script>
            </Helmet>

            <div className="min-h-screen bg-brand-cream pb-20">
                {/* Back Button */}
                <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
                    <div className="container mx-auto px-4 py-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 text-brand-text hover:text-brand-teal transition"
                        >
                            <ArrowLeftIcon size={20} />
                            Back
                        </button>
                    </div>
                </div>

                {/* Business Header */}
                <div className="bg-gradient-to-r from-brand-teal to-teal-600 text-white py-8 px-4">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-6">
                            {business.profile_photo_url ? (
                                <img
                                    src={business.profile_photo_url}
                                    alt={business.name}
                                    className="w-20 h-20 rounded-xl object-cover bg-white shadow-md border-2 border-white/30 flex-shrink-0"
                                />
                            ) : (
                                <div className="w-20 h-20 bg-white/20 rounded-xl flex items-center justify-center text-3xl font-bold flex-shrink-0">
                                    {business.name?.charAt(0).toUpperCase() || 'B'}
                                </div>
                            )}
                            <div>
                                <h1 className="text-2xl md:text-3xl font-bold mb-1">{business.name}</h1>
                                {business.category && (
                                    <span className="inline-block px-3 py-1 bg-white/20 text-white text-sm rounded-full">
                                        {business.category}
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Business Info */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h2 className="font-bold text-brand-dark mb-4">Business Details</h2>

                                {business.description && (
                                    <p className="text-gray-600 mb-4">{business.description}</p>
                                )}

                                <div className="space-y-3">
                                    {business.address && (
                                        <div className="flex items-start gap-3">
                                            <LocationIcon size={18} className="text-brand-teal mt-1 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-600">{business.address}</p>
                                                <p className="text-sm text-gray-500">{business.city}, {business.state} {business.pincode}</p>
                                            </div>
                                        </div>
                                    )}

                                    {business.phone_number && (
                                        <div className="flex items-center gap-3">
                                            <PhoneIcon size={18} className="text-brand-teal flex-shrink-0" />
                                            <a href={`tel:${business.phone_number}`} className="text-brand-text hover:text-brand-teal">
                                                {business.phone_number}
                                            </a>
                                        </div>
                                    )}

                                    {business.email && (
                                        <div className="flex items-center gap-3">
                                            <MailIcon size={18} className="text-brand-teal flex-shrink-0" />
                                            <a href={`mailto:${business.email}`} className="text-brand-text hover:text-brand-teal text-sm break-all">
                                                {business.email}
                                            </a>
                                        </div>
                                    )}

                                    {business.website && (
                                        <div className="flex items-center gap-3">
                                            <GlobeIcon size={18} className="text-brand-teal flex-shrink-0" />
                                            <a href={business.website} target="_blank" rel="noopener noreferrer" className="text-brand-teal hover:underline text-sm">
                                                Visit Website
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Products */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-xl p-6 shadow-sm">
                                <h2 className="font-bold text-brand-dark mb-4">
                                    Products ({business.products?.length || 0})
                                </h2>

                                {(!business.products || business.products.length === 0) ? (
                                    <div className="text-center py-8">
                                        <EmptyStoreIllustration size={80} className="mx-auto mb-2 text-gray-300" />
                                        <p className="text-gray-500">No products available yet</p>
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                        {business.products.map(product => (
                                            <div
                                                key={product.id}
                                                className="bg-brand-cream rounded-lg overflow-hidden hover:shadow-md transition cursor-pointer"
                                                onClick={() => navigate(`/product/${product.id}`, { state: { product: { ...product, business_id: business.id, business_name: business.name } } })}
                                            >
                                                <img
                                                    src={product.product_image_url || 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80'}
                                                    alt={product.name}
                                                    className="w-full h-32 object-cover"
                                                />
                                                <div className="p-3">
                                                    <h3 className="font-medium text-brand-dark text-sm line-clamp-2">{product.name}</h3>
                                                    <p className="text-brand-teal font-bold mt-1">
                                                        {product.price === 0 ? 'Contact for Price' : formatCurrency(product.price)}
                                                        {product.price !== 0 && product.unit && <span className="text-xs font-normal text-gray-500">/{product.unit}</span>}
                                                    </p>
                                                    <div className={`text-xs mt-1 ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                                        {product.stock_quantity > 0 ? 'In Stock' : 'Out of Stock'}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailView;
