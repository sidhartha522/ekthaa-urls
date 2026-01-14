import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { businessApi } from '../../services/businessApi';
import { ProductsPageSkeleton } from '../../components/Skeleton';
import { BoxIcon, SearchIcon, StoreIcon, XIcon, ChevronLeftIcon, ChevronRightIcon, EmptyBoxIllustration } from '../../components/icons/Icons';

// Category-based placeholder images
const CATEGORY_PLACEHOLDERS = {
    'rice': 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400&q=80',
    'sugar': 'https://images.unsplash.com/photo-1563450392-1ebb936e4a57?w=400&q=80',
    'oil': 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&q=80',
    'flour': 'https://images.unsplash.com/photo-1628548985793-27d8e2d22c48?w=400&q=80',
    'spices': 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=400&q=80',
    'dal': 'https://images.unsplash.com/photo-1612257416648-ee7a6c533b4f?w=400&q=80',
    'grocery': 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80',
    'food': 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=400&q=80',
    'electronics': 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&q=80',
    'clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&q=80',
};

const DEFAULT_PRODUCT_IMAGE = 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&q=80';

const getProductImage = (product) => {
    if (product.product_image_url) return product.product_image_url;

    const productName = (product.name || '').toLowerCase();
    const productCategory = (product.category || '').toLowerCase();

    for (const [key, url] of Object.entries(CATEGORY_PLACEHOLDERS)) {
        if (productName.includes(key) || productCategory.includes(key)) {
            return url;
        }
    }

    return DEFAULT_PRODUCT_IMAGE;
};

const ITEMS_PER_PAGE = 24;

const ProductsExplore = () => {
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState(['All']);
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
    const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [seoMeta, setSeoMeta] = useState(null);

    useEffect(() => {
        loadProducts();
    }, [selectedCategory, currentPage]);

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => {
            if (searchQuery !== searchParams.get('search')) {
                loadProducts();
            }
        }, 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    const loadProducts = async () => {
        setLoading(true);
        try {
            const data = await businessApi.getPublicProducts({
                search: searchQuery,
                category: selectedCategory !== 'All' ? selectedCategory : undefined,
                limit: ITEMS_PER_PAGE,
                offset: (currentPage - 1) * ITEMS_PER_PAGE,
                includeSeo: true
            });

            setProducts(data.products || []);
            setTotalCount(data.count || 0);

            // Set categories from API
            if (data.categories && data.categories.length > 0) {
                setCategories(['All', ...data.categories]);
            }

            // Store SEO metadata
            if (data.seo) {
                setSeoMeta(data.seo.meta);
            }

            // Update URL params
            const params = new URLSearchParams();
            if (searchQuery) params.set('search', searchQuery);
            if (selectedCategory !== 'All') params.set('category', selectedCategory);
            setSearchParams(params);

        } catch (error) {
            console.error('Failed to load products:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
    const formatCurrency = (amount) => {
        if (amount === 0) return 'Contact for price';
        return `₹${(amount || 0).toLocaleString('en-IN')}`;
    };

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
        setCurrentPage(1);
    };

    if (loading) {
        return <ProductsPageSkeleton />;
    }

    return (
        <>
            {/* SEO Meta Tags */}
            <Helmet>
                <title>{seoMeta?.title || 'Products Catalogue | Ekthaa'}</title>
                <meta name="description" content={seoMeta?.description || 'Browse products from local businesses on Ekthaa'} />
                {seoMeta?.keywords && <meta name="keywords" content={seoMeta.keywords.join(', ')} />}
                <link rel="canonical" href={`https://ekthaa.com/explore${selectedCategory !== 'All' ? `?category=${selectedCategory}` : ''}`} />
            </Helmet>

            <div className="min-h-screen bg-brand-cream pb-20">
                {/* Header */}
                <div className="bg-gradient-to-r from-brand-teal to-teal-600 text-white py-8 px-4">
                    <div className="container mx-auto">
                        <h1 className="text-3xl font-serif font-bold mb-2">Products Catalogue</h1>
                        <p className="text-lg opacity-90">
                            {totalCount} products available
                        </p>
                    </div>
                </div>

                <div className="container mx-auto px-4 py-6">
                    {/* Search Bar */}
                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto mb-8">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-gradient-to-r from-brand-teal to-blue-500 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative flex items-center bg-white rounded-xl shadow-lg border border-gray-100 p-1.5">
                                <SearchIcon size={20} className="text-brand-teal ml-3" />
                                <input
                                    type="text"
                                    placeholder="Search products..."
                                    className="flex-1 bg-transparent border-none outline-none text-brand-text px-3 py-2 text-base placeholder-gray-400"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="p-2 text-gray-400 hover:text-red-500 transition max-md:hidden"
                                    >
                                        <XIcon size={20} />
                                    </button>
                                )}
                                <button className="bg-brand-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-teal-700 transition shadow-md hidden sm:block">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Category Filter */}
                    {categories.length > 1 && (
                        <div className="mb-6 overflow-x-auto">
                            <div className="flex gap-2 pb-2">
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
                    )}

                    {/* Products Grid */}
                    {products.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <EmptyBoxIllustration size={100} className="mx-auto mb-4 text-gray-400" />
                            <h3 className="font-bold text-brand-dark mb-2">No Products Found</h3>
                            <p className="text-gray-500">
                                {searchQuery ? 'Try a different search term' : 'Products will appear here once businesses add them'}
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {products.map(product => (
                                    <article
                                        key={product.id}
                                        className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition cursor-pointer group"
                                        onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
                                        itemScope
                                        itemType="https://schema.org/Product"
                                    >
                                        <img
                                            src={getProductImage(product)}
                                            alt={product.name}
                                            className="w-full h-40 object-cover"
                                            itemProp="image"
                                        />
                                        <div className="p-4">
                                            <h3 className="font-medium text-brand-dark group-hover:text-brand-teal transition line-clamp-2" itemProp="name">
                                                {product.name}
                                            </h3>
                                            <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
                                                <p className={`mt-1 ${product.price === 0 ? 'text-sm font-medium text-gray-400' : 'text-lg font-bold text-brand-teal'}`}>
                                                    <span itemProp="price">{formatCurrency(product.price)}</span>
                                                    <meta itemProp="priceCurrency" content="INR" />
                                                    {product.price !== 0 && product.unit && <span className="text-sm font-normal text-gray-500">/{product.unit}</span>}
                                                </p>
                                                <link itemProp="availability" href={product.in_stock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"} />
                                            </div>
                                            {product.description && (
                                                <p className="text-sm text-gray-500 mt-1 line-clamp-2" itemProp="description">{product.description}</p>
                                            )}
                                            {product.business_name && (
                                                <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                                                    <StoreIcon size={12} />
                                                    <span className="truncate">{product.business_name}</span>
                                                </div>
                                            )}
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
                                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 hover:border-brand-teal transition flex items-center gap-1"
                                    >
                                        <ChevronLeftIcon size={18} />
                                    </button>

                                    <span className="px-4 py-2 text-brand-text">
                                        Page {currentPage} of {totalPages}
                                    </span>

                                    <button
                                        onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                        disabled={currentPage === totalPages}
                                        className="px-4 py-2 rounded-lg bg-white border border-gray-200 disabled:opacity-50 hover:border-brand-teal transition flex items-center gap-1"
                                    >
                                        <ChevronRightIcon size={18} />
                                    </button>
                                </div>
                            )}
                        </>
                    )}

                    {/* View Businesses Link */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={() => navigate('/businesses')}
                            className="text-brand-teal font-medium hover:underline flex items-center gap-2 justify-center mx-auto"
                        >
                            <StoreIcon size={18} />
                            View All Businesses Instead
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsExplore;
