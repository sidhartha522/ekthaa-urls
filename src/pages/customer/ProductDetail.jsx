import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { businessApi } from '../../services/businessApi';
import { DetailPageSkeleton } from '../../components/Skeleton';
import { ArrowLeftIcon, CheckCircleIcon, XCircleIcon, StoreIcon, ChevronRightIcon, EmptyBoxIllustration } from '../../components/icons/Icons';

// Category-based placeholder images
const CATEGORY_PLACEHOLDERS = {
    'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800&q=80',
    'sugar': 'https://images.unsplash.com/photo-1563450392-1ebb936e4a57?w=800&q=80',
    'oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    'grocery': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80',
    'food': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=800&q=80',
    'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=800&q=80',
};

const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80';

const getProductImage = (product) => {
    if (product?.product_image_url) return product.product_image_url;

    const productName = (product?.name || '').toLowerCase();
    const productCategory = (product?.category || '').toLowerCase();

    for (const [key, url] of Object.entries(CATEGORY_PLACEHOLDERS)) {
        if (productName.includes(key) || productCategory.includes(key)) {
            return url;
        }
    }

    return DEFAULT_IMAGE;
};

const ProductDetail = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { productId } = useParams();
    const [product, setProduct] = useState(location.state?.product || null);
    const [loading, setLoading] = useState(!location.state?.product);

    useEffect(() => {
        const fetchProductData = async () => {
            // If we have state product and it matches URL, use it
            if (location.state?.product && location.state.product.id === productId) {
                setProduct(location.state.product);
                setLoading(false);
                return;
            }

            // Otherwise fetch from API
            setLoading(true);
            try {
                const data = await businessApi.getPublicProduct(productId);
                setProduct(data);
            } catch (error) {
                console.error("Error fetching product:", error);
                setProduct(null);
            } finally {
                setLoading(false);
            }
        };

        fetchProductData();
    }, [productId, location.state]);

    const formatCurrency = (amount) => {
        if (amount === 0) return 'Contact for price';
        return `₹${(amount || 0).toLocaleString('en-IN')}`;
    };

    if (loading) {
        return <DetailPageSkeleton />;
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-brand-cream flex items-center justify-center">
                <div className="text-center">
                    <EmptyBoxIllustration size={100} className="mx-auto mb-4" />
                    <h2 className="font-bold text-xl text-brand-dark mb-2">Product Not Found</h2>
                    <p className="text-gray-500 mb-4">The product you're looking for doesn't exist.</p>
                    <button
                        onClick={() => navigate('/explore')}
                        className="px-6 py-2 bg-brand-teal text-white rounded-lg hover:bg-teal-700 transition"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    const productImage = getProductImage(product);
    const productUrl = `https://ekthaa.com/product/${product.id}`;

    // JSON-LD structured data for SEO
    // JSON-LD structured data for SEO (Google Shopping compatible)
    const jsonLdData = {
        "@context": "https://schema.org",
        "@type": "Product",
        "@id": productUrl,
        "name": product.name,
        "description": product.description || `${product.name} available at ${product.business_name}`,
        "image": [productImage],
        "sku": product.id,
        "mpn": product.id,
        "brand": {
            "@type": "Brand",
            "name": product.business_name || "Ekthaa Local Business"
        },
        "category": product.category,
        "offers": {
            "@type": "Offer",
            "url": productUrl,
            "price": product.price,
            "priceCurrency": "INR",
            "priceValidUntil": new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0], // Valid for 1 year
            "itemCondition": "https://schema.org/NewCondition",
            "availability": (product.stock_quantity === undefined || product.stock_quantity > 0)
                ? "https://schema.org/InStock"
                : "https://schema.org/OutOfStock",
            "seller": {
                "@type": "LocalBusiness",
                "name": product.business_name,
                "image": product.business_profile_photo,
                "@id": `https://ekthaa.com/business/${product.business_id}`
            },
            "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                    "@type": "MonetaryAmount",
                    "value": 0,
                    "currency": "INR"
                },
                "shippingDestination": {
                    "@type": "DefinedRegion",
                    "addressCountry": "IN"
                }
            }
        }
    };

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>{product.name} | Ekthaa</title>
                <meta name="description" content={product.description || `Buy ${product.name} from ${product.business_name} on Ekthaa`} />
                <meta property="og:title" content={product.name} />
                <meta property="og:description" content={product.description || `${product.name} - ${formatCurrency(product.price)}`} />
                <meta property="og:image" content={productImage} />
                <meta property="og:url" content={productUrl} />
                <meta property="og:type" content="product" />
                <meta property="product:price:amount" content={product.price} />
                <meta property="product:price:currency" content="INR" />
                <link rel="canonical" href={productUrl} />
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

                <div className="container mx-auto px-4 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm flex items-center justify-center p-6 h-96 relative border border-gray-100">
                            <img
                                src={productImage}
                                alt={product.name}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            {product.category && (
                                <span className="inline-block px-3 py-1 bg-brand-teal/10 text-brand-teal text-sm rounded-full mb-4">
                                    {product.category}
                                </span>
                            )}

                            <h1 className="text-2xl md:text-3xl font-bold text-brand-dark mb-4">
                                {product.name}
                            </h1>

                            <div className="flex items-baseline gap-2 mb-6">
                                <span className={product.price === 0 ? "text-xl font-medium text-gray-400" : "text-3xl font-bold text-brand-teal"}>
                                    {formatCurrency(product.price)}
                                </span>
                                {product.price !== 0 && product.unit && (
                                    <span className="text-lg text-gray-500">/{product.unit}</span>
                                )}
                            </div>

                            {product.description && (
                                <div className="mb-6">
                                    <h3 className="font-medium text-brand-dark mb-2">Description</h3>
                                    <p className="text-gray-600">{product.description}</p>
                                </div>
                            )}

                            {product.stock_quantity !== undefined && (
                                <div className="mb-6">
                                    <h3 className="font-medium text-brand-dark mb-2">Availability</h3>
                                    <div className={`flex items-center gap-2 ${product.stock_quantity > 0 ? 'text-green-600' : 'text-red-500'}`}>
                                        {product.stock_quantity > 0
                                            ? <CheckCircleIcon size={18} />
                                            : <XCircleIcon size={18} />
                                        }
                                        <span>
                                            {product.stock_quantity > 0
                                                ? `In Stock (${product.stock_quantity} available)`
                                                : 'Out of Stock'}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Business Info */}
                            {product.business_name && (
                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="font-medium text-brand-dark mb-3">Sold By</h3>
                                    <div
                                        className="flex items-center gap-4 p-4 bg-brand-cream rounded-lg cursor-pointer hover:shadow-md transition"
                                        onClick={() => navigate(`/business/${product.business_id}`)}
                                    >
                                        {product.business_profile_photo ? (
                                            <img
                                                src={product.business_profile_photo}
                                                alt={product.business_name}
                                                className="w-12 h-12 rounded-lg object-cover border border-gray-200 bg-white"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 bg-gradient-to-br from-brand-teal to-teal-600 rounded-lg flex items-center justify-center text-white font-bold">
                                                {product.business_name.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                        <div className="flex-1">
                                            <h4 className="font-medium text-brand-dark">{product.business_name}</h4>
                                            <p className="text-sm text-gray-500">View all products</p>
                                        </div>
                                        <ChevronRightIcon size={20} className="text-gray-400" />
                                    </div>
                                </div>
                            )}

                            {/* Contact Button */}
                            <div className="mt-6">
                                <button
                                    onClick={() => navigate(`/business/${product.business_id}`)}
                                    className="w-full py-3 bg-brand-teal text-white rounded-lg font-medium hover:bg-teal-700 transition flex items-center justify-center gap-2"
                                >
                                    <StoreIcon size={20} />
                                    Visit Store
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductDetail;
