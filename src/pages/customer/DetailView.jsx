import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { businessApi } from '../../services/businessApi';
import { DetailPageSkeleton } from '../../components/Skeleton';
import { ArrowLeftIcon, LocationIcon, PhoneIcon, MailIcon, GlobeIcon, EmptyStoreIllustration } from '../../components/icons/Icons';

// Fix default marker icon issue with Webpack
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Default product placeholder
const DEFAULT_PRODUCT_PLACEHOLDER = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80';

const DetailView = () => {
    const { businessId } = useParams();
    const navigate = useNavigate();
    const [business, setBusiness] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('products');
    const [selectedPhoto, setSelectedPhoto] = useState(null);

    useEffect(() => {
        if (businessId) {
            fetchBusiness();
        }
    }, [businessId]);

    const fetchBusiness = async () => {
        setLoading(true);
        try {
            const data = await businessApi.getRealBusiness(businessId);
            setBusiness(data);
        } catch (error) {
            console.error('Failed to fetch business:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleShare = async () => {
        if (!business) return;
        const businessName = business.name || 'Business';
        const category = business.category ? ` - ${business.category}` : '';
        const description = business.description ? `\n${business.description}` : '';
        const phone = business.phone_number ? `\n📞 ${business.phone_number}` : '';
        const address = business.address || [business.city, business.state].filter(Boolean).join(', ');
        const location = address ? `\n📍 ${address}` : '';
        
        const shareMessage = `Check out ${businessName}${category}!${description}${phone}${location}\n\nDiscover more on Ekthaa: https://ekthaa.app/business/${business.id}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: business.name,
                    text: shareMessage,
                    url: `https://ekthaa.app/business/${business.id}`
                });
            } catch (err) {
                if (err.name !== 'AbortError') {
                    copyToClipboard(`https://ekthaa.app/business/${business.id}`);
                }
            }
        } else {
            copyToClipboard(`https://ekthaa.app/business/${business.id}`);
        }
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {
            alert('✅ Link copied to clipboard!');
        }).catch(err => {
            prompt('Copy this link:', text);
        });
    };

    const formatCurrency = (amount) => `₹${(amount || 0).toLocaleString('en-IN')}`;

    const openSocialLink = (platform, handle) => {
        if (!handle) return;
        let url = handle;
        if (!handle.startsWith('http')) {
            const baseUrls = {
                instagram: 'https://instagram.com/',
                facebook: 'https://facebook.com/',
                twitter: 'https://twitter.com/',
                linkedin: 'https://linkedin.com/company/',
                youtube: 'https://youtube.com/@'
            };
            url = baseUrls[platform] + handle.replace('@', '');
        }
        window.open(url, '_blank');
    };

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

    const businessUrl = `https://ekthaa.app/business/${business.id}`;
    const businessImage = business.profile_photo_url || 'https://images.unsplash.com/photo-1556745753-b2904692b3cd?w=800&q=80';
    
    // Filter offers and vouchers
    const offers = (business.offers || []).filter(o => o.offer_type === 'offer');
    const vouchers = (business.offers || []).filter(o => o.offer_type === 'voucher');
    const hasSocialMedia = business.instagram || business.facebook || business.twitter || business.linkedin || business.youtube;

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
                {/* Sticky Back Button Header */}
                <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-gray-100 px-4 py-3">
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-brand-dark hover:text-brand-teal transition"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                        <span className="font-medium">Back</span>
                    </button>
                </div>

                {/* Business Header with Quick Actions */}
                <div className="bg-gradient-to-r from-brand-teal to-teal-600 text-white py-6 px-4">
                    <div className="container mx-auto">
                        <div className="flex items-center gap-4">
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
                            <div className="flex-1 min-w-0">
                                <h1 className="text-xl md:text-2xl font-bold mb-1 truncate">{business.name}</h1>
                                <div className="flex flex-wrap gap-2">
                                    {business.category && (
                                        <span className="inline-block px-2 py-0.5 bg-white/20 text-white text-xs rounded-full">
                                            {business.category}
                                        </span>
                                    )}
                                    {business.subcategory && (
                                        <span className="inline-block px-2 py-0.5 bg-white/10 text-white/80 text-xs rounded-full">
                                            {business.subcategory}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        
                        {/* Quick Action Buttons */}
                        <div className="flex gap-3 mt-4">
                            {business.phone_number && (
                                <a
                                    href={`tel:${business.phone_number}`}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition text-sm font-medium"
                                >
                                    <PhoneIcon size={18} />
                                    <span>Call</span>
                                </a>
                            )}
                            {business.latitude && business.longitude && (
                                <a
                                    href={`https://www.google.com/maps/dir/?api=1&destination=${business.latitude},${business.longitude}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition text-sm font-medium"
                                >
                                    <LocationIcon size={18} />
                                    <span>Directions</span>
                                </a>
                            )}
                            <button
                                onClick={handleShare}
                                className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-lg transition text-sm font-medium"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                                </svg>
                                <span>Share</span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Shop Photos Gallery */}
                {business.shop_photos && business.shop_photos.length > 0 && (
                    <div className="bg-white border-b border-gray-100">
                        <div className="container mx-auto px-4 py-4">
                            <h3 className="text-sm font-semibold text-brand-dark mb-3">Shop Photos</h3>
                            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                {business.shop_photos.map((photo, index) => (
                                    <img
                                        key={index}
                                        src={photo}
                                        alt={`Shop photo ${index + 1}`}
                                        className="w-24 h-24 md:w-32 md:h-32 rounded-lg object-cover flex-shrink-0 cursor-pointer hover:opacity-90 transition shadow-sm"
                                        onClick={() => setSelectedPhoto(photo)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabs Navigation */}
                <div className="sticky top-[57px] z-10 bg-white border-b border-gray-200 shadow-sm">
                    <div className="container mx-auto">
                        <div className="flex">
                            {[
                                { key: 'products', label: 'Products', count: business.products?.length || 0 },
                                { key: 'offers', label: 'Offers', count: regularOffers.length },
                                { key: 'details', label: 'Details', count: null },
                                { key: 'vouchers', label: 'Vouchers', count: ekthaaVouchers.length },
                            ].map((tab) => (
                                <button
                                    key={tab.key}
                                    onClick={() => setActiveTab(tab.key)}
                                    className={`flex-1 py-3 px-2 text-sm font-medium transition border-b-2 ${
                                        activeTab === tab.key
                                            ? 'text-brand-teal border-brand-teal'
                                            : 'text-gray-500 border-transparent hover:text-gray-700'
                                    }`}
                                >
                                    {tab.label}
                                    {tab.count !== null && tab.count > 0 && (
                                        <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-full ${
                                            activeTab === tab.key ? 'bg-brand-teal/10 text-brand-teal' : 'bg-gray-100 text-gray-500'
                                        }`}>
                                            {tab.count}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Tab Content */}
                <div className="container mx-auto px-4 py-6">
                    
                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div>
                            {(!business.products || business.products.length === 0) ? (
                                <div className="text-center py-12 bg-white rounded-xl">
                                    <EmptyStoreIllustration size={80} className="mx-auto mb-4 text-gray-300" />
                                    <p className="text-gray-500">No products available yet</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                    {business.products.map(product => (
                                        <div
                                            key={product.id}
                                            className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition cursor-pointer border border-gray-100"
                                            onClick={() => navigate(`/product/${product.id}`, { state: { product: { ...product, business_id: business.id, business_name: business.name } } })}
                                        >
                                            <div className="relative">
                                                <img
                                                    src={product.product_image_url || DEFAULT_PRODUCT_PLACEHOLDER}
                                                    alt={product.name}
                                                    className="w-full h-36 object-cover"
                                                />
                                                {product.in_stock === false && (
                                                    <div className="absolute top-2 right-2 px-2 py-0.5 bg-red-500 text-white text-xs rounded-full">
                                                        Out of Stock
                                                    </div>
                                                )}
                                            </div>
                                            <div className="p-3">
                                                <h3 className="font-medium text-brand-dark text-sm line-clamp-2">{product.name}</h3>
                                                <p className="text-brand-teal font-bold mt-1">
                                                    {product.price === 0 ? 'Contact for Price' : formatCurrency(product.price)}
                                                    {product.price !== 0 && product.unit && (
                                                        <span className="text-xs font-normal text-gray-500">/{product.unit_quantity || 1}{product.unit}</span>
                                                    )}
                                                </p>
                                                {product.moq && product.moq > 1 && (
                                                    <p className="text-xs text-gray-500 mt-1">Min Order: {product.moq}</p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Offers Tab */}
                    {activeTab === 'offers' && (
                        <div>
                            {regularOffers.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-xl">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <p className="text-gray-500">No offers available</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {regularOffers.map((offer, index) => (
                                        <div key={index} className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h3 className="font-semibold text-brand-dark">{offer.offer_name}</h3>
                                                    {offer.description && (
                                                        <p className="text-sm text-gray-600 mt-1">{offer.description}</p>
                                                    )}
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        {offer.discount_percentage > 0 && (
                                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                                {offer.discount_percentage}% OFF
                                                            </span>
                                                        )}
                                                        {offer.discount_amount > 0 && (
                                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                                ₹{offer.discount_amount} OFF
                                                            </span>
                                                        )}
                                                        {offer.min_purchase_amount > 0 && (
                                                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                                                Min: ₹{offer.min_purchase_amount}
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {offer.validity && (
                                                    <span className="text-xs text-gray-400 ml-2">
                                                        Valid till {new Date(offer.validity).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Details Tab */}
                    {activeTab === 'details' && (
                        <div className="space-y-4">
                            {/* Description */}
                            {business.description && (
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                    <h3 className="font-semibold text-brand-dark mb-2">About</h3>
                                    <p className="text-gray-600 text-sm leading-relaxed">{business.description}</p>
                                </div>
                            )}

                            {/* Contact & Location */}
                            <div className="bg-white rounded-xl p-4 border border-gray-100">
                                <h3 className="font-semibold text-brand-dark mb-3">Contact & Location</h3>
                                <div className="space-y-3">
                                    {business.address && (
                                        <div className="flex items-start gap-3">
                                            <LocationIcon size={18} className="text-brand-teal mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-sm text-gray-700">{business.address}</p>
                                                <p className="text-sm text-gray-500">
                                                    {[business.city, business.state, business.pincode].filter(Boolean).join(', ')}
                                                </p>
                                            </div>
                                        </div>
                                    )}
                                    {business.phone_number && (
                                        <div className="flex items-center gap-3">
                                            <PhoneIcon size={18} className="text-brand-teal flex-shrink-0" />
                                            <a href={`tel:${business.phone_number}`} className="text-sm text-gray-700 hover:text-brand-teal">
                                                {business.phone_number}
                                            </a>
                                        </div>
                                    )}
                                    {business.email && (
                                        <div className="flex items-center gap-3">
                                            <MailIcon size={18} className="text-brand-teal flex-shrink-0" />
                                            <a href={`mailto:${business.email}`} className="text-sm text-gray-700 hover:text-brand-teal break-all">
                                                {business.email}
                                            </a>
                                        </div>
                                    )}
                                    {business.website && (
                                        <div className="flex items-center gap-3">
                                            <GlobeIcon size={18} className="text-brand-teal flex-shrink-0" />
                                            <a href={business.website.startsWith('http') ? business.website : `https://${business.website}`} target="_blank" rel="noopener noreferrer" className="text-sm text-brand-teal hover:underline">
                                                {business.website}
                                            </a>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Operating Hours */}
                            {business.operating_hours && (
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                    <h3 className="font-semibold text-brand-dark mb-3 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Operating Hours
                                    </h3>
                                    <p className="text-sm text-gray-600">{business.operating_hours}</p>
                                </div>
                            )}

                            {/* GST Number */}
                            {business.gst_number && (
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                    <h3 className="font-semibold text-brand-dark mb-2 flex items-center gap-2">
                                        <svg className="w-5 h-5 text-brand-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                        GST Number
                                    </h3>
                                    <p className="text-sm text-gray-600 font-mono">{business.gst_number}</p>
                                </div>
                            )}

                            {/* Social Media Links */}
                            {hasSocialMedia && (
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                    <h3 className="font-semibold text-brand-dark mb-3">Follow Us</h3>
                                    <div className="flex flex-wrap gap-3">
                                        {business.instagram && (
                                            <button
                                                onClick={() => openSocialLink(business.instagram, 'instagram')}
                                                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition text-sm"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                                                </svg>
                                                Instagram
                                            </button>
                                        )}
                                        {business.facebook && (
                                            <button
                                                onClick={() => openSocialLink(business.facebook, 'facebook')}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                                </svg>
                                                Facebook
                                            </button>
                                        )}
                                        {business.twitter && (
                                            <button
                                                onClick={() => openSocialLink(business.twitter, 'twitter')}
                                                className="flex items-center gap-2 px-4 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition text-sm"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                                </svg>
                                                X (Twitter)
                                            </button>
                                        )}
                                        {business.linkedin && (
                                            <button
                                                onClick={() => openSocialLink(business.linkedin, 'linkedin')}
                                                className="flex items-center gap-2 px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition text-sm"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                                </svg>
                                                LinkedIn
                                            </button>
                                        )}
                                        {business.youtube && (
                                            <button
                                                onClick={() => openSocialLink(business.youtube, 'youtube')}
                                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition text-sm"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                                </svg>
                                                YouTube
                                            </button>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Map Section */}
                            {business.latitude && business.longitude && (
                                <div className="bg-white rounded-xl p-4 border border-gray-100">
                                    <h3 className="font-semibold text-brand-dark mb-3 flex items-center gap-2">
                                        <LocationIcon size={18} className="text-brand-teal" />
                                        Location
                                    </h3>
                                    <div className="rounded-lg overflow-hidden shadow-sm border border-gray-200" style={{ height: '250px' }}>
                                        <MapContainer
                                            center={[business.latitude, business.longitude]}
                                            zoom={15}
                                            style={{ height: '100%', width: '100%' }}
                                            scrollWheelZoom={false}
                                        >
                                            <TileLayer
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                            />
                                            <Marker position={[business.latitude, business.longitude]}>
                                                <Popup>
                                                    <div className="text-center">
                                                        <strong>{business.name}</strong><br/>
                                                        {business.address}
                                                    </div>
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Vouchers Tab (Ekthaa Cash Vouchers) */}
                    {activeTab === 'vouchers' && (
                        <div>
                            {ekthaaVouchers.length === 0 ? (
                                <div className="text-center py-12 bg-white rounded-xl">
                                    <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <p className="text-gray-500">No Ekthaa Cash vouchers available</p>
                                    <p className="text-xs text-gray-400 mt-1">Vouchers that can be redeemed with Ekthaa Cash will appear here</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {ekthaaVouchers.map((voucher, index) => (
                                        <div key={index} className="bg-gradient-to-r from-amber-50 to-yellow-50 rounded-xl p-4 border border-amber-200 shadow-sm">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <svg className="w-5 h-5 text-amber-600" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <h3 className="font-semibold text-amber-800">{voucher.offer_name}</h3>
                                                    </div>
                                                    {voucher.description && (
                                                        <p className="text-sm text-amber-700 mt-1">{voucher.description}</p>
                                                    )}
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        <span className="px-2 py-1 bg-amber-200 text-amber-800 text-xs font-medium rounded-full">
                                                            {voucher.ekthaa_cash_required} Ekthaa Cash Required
                                                        </span>
                                                        {voucher.discount_percentage > 0 && (
                                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                                {voucher.discount_percentage}% OFF
                                                            </span>
                                                        )}
                                                        {voucher.discount_amount > 0 && (
                                                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                                                                ₹{voucher.discount_amount} OFF
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                                {voucher.validity && (
                                                    <span className="text-xs text-amber-600 ml-2">
                                                        Valid till {new Date(voucher.validity).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Photo Lightbox Modal */}
                {selectedPhoto && (
                    <div 
                        className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                        onClick={() => setSelectedPhoto(null)}
                    >
                        <button 
                            className="absolute top-4 right-4 text-white hover:text-gray-300 transition"
                            onClick={() => setSelectedPhoto(null)}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <img 
                            src={selectedPhoto} 
                            alt="Shop photo full view"
                            className="max-w-full max-h-[90vh] object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
        </>
    );
};

export default DetailView;
