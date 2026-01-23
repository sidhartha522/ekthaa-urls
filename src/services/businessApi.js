import { databases, APPWRITE_CONFIG, Query } from './appwriteConfig';

/**
 * Business API Service - Real-time data from backend
 */

// Use environment variable for production, use Vite proxy for local development
const isProduction = import.meta.env.PROD;
const API_BASE_URL = import.meta.env.DEV ? '/api' : import.meta.env.VITE_API_BASE_URL;

// Get auth token from localStorage
const getAuthToken = () => {
    // Try to get token from separate token storage first
    const token = localStorage.getItem('token');
    if (token) return token;

    // Fallback to user object storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.token || null;
};

// Helper function for API requests
const apiRequest = async (endpoint, options = {}) => {
    const url = `${API_BASE_URL}${endpoint}`;
    const token = getAuthToken();

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...options.headers
        },
        ...options
    };

    try {
        const response = await fetch(url, config);
        const data = await response.json();

        if (!response.ok) {
            // Handle authentication errors
            if (response.status === 401) {
                throw new Error('Authentication required. Please login first. (401)');
            }
            throw new Error(data.error || `HTTP error! status: ${response.status}`);
        }

        return data;
    } catch (error) {
        console.error(`API request failed for ${endpoint}:`, error);
        throw error;
    }
};

// Business API methods
export const businessApi = {
    /**
     * Get all public products with optional SEO data
     * @param {Object} options - { search, category, limit, offset, includeSeo }
     */
    getPublicProducts: async (options = {}) => {
        try {
            const { search, category, limit = 100, offset = 0, includeSeo = false } = options;
            let endpoint = `/products/public?limit=${limit}&offset=${offset}`;

            if (search) endpoint += `&search=${encodeURIComponent(search)}`;
            if (category) endpoint += `&category=${encodeURIComponent(category)}`;
            if (includeSeo) endpoint += `&include_seo=true`;

            const data = await apiRequest(endpoint);

            // Fix image mapping for products
            if (data.products && Array.isArray(data.products)) {
                data.products = data.products.map(p => ({
                    ...p,
                    product_image_url: p.product_image_url || p.image_url
                }));
            }

            return data;
        } catch (error) {
            console.error('Failed to fetch public products:', error);
            return { products: [], count: 0, categories: [] };
        }
    },

    /**
     * Get real catalog items directly from Appwrite DB
     * replaces getPublicOffers logic
     */
    getPublicOffers: async (options = {}) => {
        try {
            console.log('Fetching real catalog from Appwrite...');

            // Fetch products
            const response = await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID_CATALOG
            );

            console.log(`Appwrite Catalog: Found ${response.total} items`);

            // Fetch businesses to map names
            let businesses = [];
            try {
                const businessResponse = await databases.listDocuments(
                    APPWRITE_CONFIG.DATABASE_ID,
                    APPWRITE_CONFIG.COLLECTION_ID_BUSINESSES,
                    [
                        Query.limit(100),
                        Query.select(['$id', 'name']) // Optimize fetch
                    ]
                );
                businesses = businessResponse.documents;
            } catch (bError) {
                console.error('Failed to fetch businesses for mapping:', bError);
            }

            // Create a map for quick lookup
            const businessMap = {};
            businesses.forEach(b => {
                businessMap[b.$id] = b.name;
            });

            // Transform Appwrite documents to UI Product format
            const products = response.documents.map(offer => {
                const businessName = businessMap[offer.business_id] || 'Local Seller';
                return {
                    id: offer.$id,
                    name: offer.name || 'Untitled Product',
                    description: offer.description || '',
                    price: offer.price || 'Ask for Price',
                    unit: offer.unit || '',
                    discount_percentage: 0,
                    business_name: businessName, // Dynamic business name
                    business_id: offer.business_id,
                    category: offer.category || 'General',
                    product_image_url: offer.image_url || null,
                    image_url: offer.image_url || null,
                    in_stock: offer.is_visible !== false
                };
            });

            return {
                products: products,
                count: products.length,
                categories: [...new Set(products.map(p => p.category))]
            };
        } catch (error) {
            console.error('Failed to fetch Appwrite catalog:', error);
            // Fallback to empty if fails
            return { products: [], count: 0, categories: [] };
        }
    },

    /**
     * Get all public businesses with optional SEO data
     * @param {Object} options - { city, category, search, limit, offset, includeSeo }
     */
    getPublicBusinesses: async (options = {}) => {
        try {
            const { city, category, search, limit = 100, offset = 0, includeSeo = false, lat, lng } = options;
            let endpoint = `/businesses/public?limit=${limit}&offset=${offset}`;

            if (city) endpoint += `&city=${encodeURIComponent(city)}`;
            if (category) endpoint += `&category=${encodeURIComponent(category)}`;
            if (search) endpoint += `&search=${encodeURIComponent(search)}`;
            if (includeSeo) endpoint += `&include_seo=true`;
            if (lat && lng) endpoint += `&lat=${lat}&lng=${lng}`;

            const data = await apiRequest(endpoint);
            return data;
        } catch (error) {
            console.error('Failed to fetch public businesses:', error);
            return { businesses: [], count: 0, cities: [], categories: [] };
        }
    },

    /**
     * Get real businesses directly from Appwrite DB
     * Replaces getPublicBusinesses logic for raw data access
     */
    getRealBusinesses: async (options = {}) => {
        try {
            console.log('Fetching real businesses from Appwrite...');
            const { limit = 100, offset = 0, search, category, city } = options;

            // FETCH ALL (Limit 1000 to get everything for client-side filtering)
            // Note: Efficient pagination should happen on server, but for 46 items, client-side is better for UX filtering
            const fetchLimit = 1000;

            const response = await databases.listDocuments(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID_BUSINESSES,
                [
                    Query.limit(fetchLimit),
                    Query.orderDesc('$createdAt') // Show newest first
                    // No offset here, we fetch all and slice later
                ]
            );

            console.log(`[getRealBusinesses] Appwrite Raw Count: ${response.total}, Fetched: ${response.documents.length}`);

            // Transform Appwrite documents to UI Business format
            let businesses = response.documents.map(doc => ({
                id: doc.$id,
                name: doc.name || 'Untitled Business',
                description: doc.description || '',
                profile_photo_url: doc.profile_photo_url || null,
                category: doc.category || 'General',
                city: doc.city || '',
                distance: doc.distance ? Number(doc.distance) : Number((Math.random() * 5).toFixed(1)),
                rating: doc.rating || '4.5',
                product_count: 0,
                phone_number: doc.phone_number || '',
                address: doc.address || ''
            }));

            // In-memory filtering
            if (city && city !== 'All Cities') {
                businesses = businesses.filter(b => b.city && b.city.toLowerCase() === city.toLowerCase());
            }

            if (category && category !== 'All') {
                businesses = businesses.filter(b => b.category && b.category.toLowerCase() === category.toLowerCase());
            }

            if (search) {
                const query = search.toLowerCase();
                businesses = businesses.filter(b =>
                    (b.name && b.name.toLowerCase().includes(query)) ||
                    (b.description && b.description.toLowerCase().includes(query)) ||
                    (b.category && b.category.toLowerCase().includes(query))
                );
            }

            // Extract unique cities and categories from FULL list (before filtering if possible, but here after fetch)
            // Ideally we want filters based on all data. For now, based on fetched data.
            const cities = [...new Set(response.documents.map(d => d.city).filter(Boolean))];
            const categories = [...new Set(response.documents.map(d => d.category).filter(Boolean))];

            // Apply Pagination Slice AFTER Filtering
            const startIndex = offset;
            const endIndex = startIndex + limit;
            const paginatedBusinesses = businesses.slice(startIndex, endIndex);

            return {
                businesses: paginatedBusinesses,
                count: businesses.length, // Total filtered count
                cities: cities,
                categories: categories
            };
        } catch (error) {
            console.error('Failed to fetch Appwrite businesses:', error);
            return { businesses: [], count: 0, cities: [], categories: [] };
        }
    },

    /**
     * Get public product details (no auth required)
     * Falls back to Appwrite if API fails
     */
    getPublicProduct: async (productId) => {
        try {
            // Try API first
            const data = await apiRequest(`/product/public/${productId}`);
            if (data) {
                // Fix image mapping
                data.product_image_url = data.product_image_url || data.image_url;
                return data;
            }
        } catch (apiError) {
            console.warn(`API fetch failed for product ${productId}, trying Appwrite...`, apiError);
        }

        // Fallback to Appwrite
        try {
            console.log(`[getPublicProduct] Fetching product ${productId} from Appwrite...`);
            const productDoc = await databases.getDocument(
                APPWRITE_CONFIG.DATABASE_ID,
                APPWRITE_CONFIG.COLLECTION_ID_CATALOG,
                productId
            );

            if (productDoc) {
                // Fetch business info to get business name
                let businessName = 'Local Seller';
                let businessProfilePhoto = null;
                try {
                    const businessDoc = await databases.getDocument(
                        APPWRITE_CONFIG.DATABASE_ID,
                        APPWRITE_CONFIG.COLLECTION_ID_BUSINESSES,
                        productDoc.business_id
                    );
                    businessName = businessDoc.name || businessName;
                    businessProfilePhoto = businessDoc.profile_photo_url || null;
                } catch (bError) {
                    console.warn('Could not fetch business details:', bError);
                }

                // Transform to expected format
                return {
                    id: productDoc.$id,
                    name: productDoc.name || 'Untitled Product',
                    description: productDoc.description || '',
                    price: productDoc.price || 0,
                    unit: productDoc.unit || '',
                    category: productDoc.category || 'General',
                    product_image_url: productDoc.image_url || null,
                    image_url: productDoc.image_url || null,
                    stock_quantity: productDoc.is_visible !== false ? 1 : 0,
                    business_id: productDoc.business_id,
                    business_name: businessName,
                    business_profile_photo: businessProfilePhoto
                };
            }
        } catch (appwriteError) {
            console.error(`Failed to fetch product ${productId} from Appwrite:`, appwriteError);
        }

        return null;
    },

    /**
     * Get public business details (no auth required)
     */
    getPublicBusiness: async (businessId) => {
        try {
            // Fetch business details from API
            const data = await apiRequest(`/business/public/${businessId}`);
            let business = data.business || null;

            if (business) {
                // ALWAYS fetch real products from Appwrite to ensure completeness
                // The API might return only a subset or be incomplete
                try {
                    console.log(`[getPublicBusiness] Fetching products for ${businessId} from Appwrite...`);
                    const productResponse = await databases.listDocuments(
                        APPWRITE_CONFIG.DATABASE_ID,
                        APPWRITE_CONFIG.COLLECTION_ID_CATALOG,
                        [
                            Query.equal('business_id', businessId),
                            Query.limit(100) // Reasonable limit for a single store
                        ]
                    );

                    if (productResponse.documents.length > 0) {
                        console.log(`[getPublicBusiness] Found ${productResponse.documents.length} products in Appwrite`);
                        business.products = productResponse.documents.map(offer => ({
                            id: offer.$id,
                            name: offer.name || 'Untitled Product',
                            description: offer.description || '',
                            price: offer.price || 0,
                            unit: offer.unit || '',
                            business_id: offer.business_id,
                            category: offer.category || 'General',
                            product_image_url: offer.image_url || null, // Map correctly
                            image_url: offer.image_url || null,
                            stock_quantity: offer.is_visible !== false ? 1 : 0
                        }));
                        business.products_count = business.products.length;
                    } else if (!business.products) {
                        business.products = [];
                    }
                } catch (dbError) {
                    console.error('[getPublicBusiness] Failed to fetch products from Appwrite:', dbError);
                    // Fallback to API products if Appwrite fails, ensuring image mapping
                    if (business.products && Array.isArray(business.products)) {
                        business.products = business.products.map(p => ({
                            ...p,
                            product_image_url: p.product_image_url || p.image_url
                        }));
                    } else {
                        business.products = [];
                    }
                }
            }
            return business;
        } catch (error) {
            console.error(`Failed to fetch business ${businessId}:`, error);
            return null;
        }
    },

    /**
     * Get sitemap data for SEO
     */
    getSitemapData: async () => {
        try {
            const data = await apiRequest('/sitemap');
            return data;
        } catch (error) {
            console.error('Failed to fetch sitemap:', error);
            return { urls: [], count: 0 };
        }
    },


    // Get all businesses (including those without products)
    getAllBusinesses: async (limit = 100, offset = 0) => {
        try {
            const data = await apiRequest(`/businesses/all?limit=${limit}&offset=${offset}`);
            return data.businesses || [];
        } catch (error) {
            console.error('Failed to fetch all businesses:', error);
            return [];
        }
    },

    // Get user's connected businesses (requires auth)
    getMyBusinesses: async () => {
        try {
            const data = await apiRequest('/businesses');
            if (data && data.businesses) {
                return data.businesses;
            }
            return [];
        } catch (error) {
            console.error('Failed to fetch businesses:', error);
            return [];
        }
    },

    // Get specific business details
    getBusinessDetails: async (businessId) => {
        try {
            const data = await apiRequest(`/business/public/${businessId}`);
            return data.business || null;
        } catch (error) {
            console.error(`Failed to fetch business ${businessId}:`, error);
            return null;
        }
    },

    // Search businesses/products by query
    searchProducts: async (query) => {
        try {
            const products = await businessApi.getPublicProducts();

            if (!query) return products;

            const searchTerm = query.toLowerCase();
            return products.filter(product =>
                product.name.toLowerCase().includes(searchTerm) ||
                product.category.toLowerCase().includes(searchTerm) ||
                product.business_name.toLowerCase().includes(searchTerm) ||
                product.description.toLowerCase().includes(searchTerm)
            );
        } catch (error) {
            console.error('Failed to search products:', error);
            return [];
        }
    },

    // Get businesses by service/category
    getBusinessesByService: async (serviceName) => {
        try {
            const businesses = await businessApi.getPublicBusinesses();

            if (!businesses) return [];

            const lowerService = serviceName.toLowerCase();

            const filtered = businesses.filter(business => {
                const category = (business.category || '').toLowerCase();
                const description = (business.description || '').toLowerCase();
                const name = (business.name || '').toLowerCase();

                return category.includes(lowerService) ||
                    description.includes(lowerService) ||
                    name.includes(lowerService);
            });

            return filtered.map(b => ({
                ...b,
                rating: b.rating || '4.2',
                distance: b.distance || (Math.floor(Math.random() * 50) / 10 + ' km'),
                products: []
            }));
        } catch (error) {
            console.error(`Failed to fetch businesses for service ${serviceName}:`, error);
            return [];
        }
    },

    // Transform products to business format for UI compatibility
    transformProductsToBusinesses: (products) => {
        const businessMap = new Map();

        if (!Array.isArray(products)) {
            console.warn('transformProductsToBusinesses received non-array products:', products);
            return [];
        }

        products.forEach(product => {
            const businessId = product.business_id;

            if (!businessMap.has(businessId)) {
                businessMap.set(businessId, {
                    id: businessId,
                    name: product.business_name,
                    category: product.category || 'General',
                    rating: '4.2',
                    distance: Math.floor(Math.random() * 5 + 0.5) + ' km',
                    products: [],
                    description: `${product.business_name} offers quality ${product.category} products`,
                    phone: '+91 98765 43210',
                    address: 'Local Business Address',
                    hours: 'Mon-Sat: 9:00 AM - 8:00 PM'
                });
            }

            businessMap.get(businessId).products.push(product);
        });

        return Array.from(businessMap.values());
    },

    // Transform raw business data to UI format
    transformBusinessData: (business) => {
        return {
            id: business.id || business.$id,
            name: business.name,
            category: business.category || 'General',
            rating: business.rating || '4.2',
            distance: business.distance || (Math.floor(Math.random() * 5 + 0.5) + ' km'),
            description: business.description || `${business.name} serving the community`,
            phone_number: business.phone_number,
            address: business.address,
            product_count: business.product_count || 0,
            has_products: (business.product_count > 0)
        };
    },

    // Connect to a business using PIN
    connectBusiness: async (accessPin) => {
        try {
            const data = await apiRequest('/business/connect', {
                method: 'POST',
                body: JSON.stringify({ access_pin: accessPin })
            });
            return data;
        } catch (error) {
            console.error('Failed to connect business:', error);
            throw error;
        }
    },

    // Create a transaction (credit or payment)
    createTransaction: async (businessId, transactionType, amount, notes = '', billPhoto = null) => {
        try {
            if (billPhoto) {
                const formData = new FormData();
                formData.append('business_id', businessId);
                formData.append('transaction_type', transactionType);
                formData.append('amount', amount);
                formData.append('notes', notes);
                if (billPhoto) {
                    formData.append('bill_photo', billPhoto);
                }

                const url = `${API_BASE_URL}/transaction/create`;
                const token = getAuthToken();

                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        ...(token && { 'Authorization': `Bearer ${token}` })
                    },
                    body: formData
                });

                const data = await response.json();
                if (!response.ok) {
                    throw new Error(data.error || 'Failed to create transaction');
                }
                return data;
            } else {
                const data = await apiRequest('/transaction/create', {
                    method: 'POST',
                    body: JSON.stringify({
                        business_id: businessId,
                        transaction_type: transactionType,
                        amount: amount,
                        notes: notes
                    })
                });
                return data;
            }
        } catch (error) {
            console.error('Failed to create transaction:', error);
            throw error;
        }
    },

    // Get all transactions for the customer
    getTransactions: async (businessId = null) => {
        try {
            let endpoint = '/transactions';
            if (businessId) {
                endpoint += `?business_id=${businessId}`;
            }
            const data = await apiRequest(endpoint);
            return data.transactions || [];
        } catch (error) {
            console.error('Failed to fetch transactions:', error);
            return [];
        }
    },

    // Get transaction details
    getTransactionDetails: async (transactionId) => {
        try {
            const data = await apiRequest(`/transaction/${transactionId}`);
            return data;
        } catch (error) {
            console.error('Failed to fetch transaction details:', error);
            return null;
        }
    },

    // Update referral code
    updateReferralCode: async (newCode) => {
        try {
            const data = await apiRequest('/referral/update', {
                method: 'POST',
                body: JSON.stringify({ new_code: newCode })
            });
            return data;
        } catch (error) {
            console.error('Failed to update referral code:', error);
            throw error;
        }
    },

    // Validate referral code availability
    validateReferralCode: async (code) => {
        try {
            const data = await apiRequest(`/validate-referral-code/${encodeURIComponent(code)}`);
            return data;
        } catch (error) {
            console.error('Failed to validate referral code:', error);
            throw error;
        }
    },

    // Expose apiRequest method for direct use
    apiRequest: apiRequest
};

// Categories based on available BUSINESSES
export const getAvailableCategories = async () => {
    try {
        // Use Appwrite directly (no backend needed)
        const response = await businessApi.getRealBusinesses({ limit: 1000 });
        const businesses = response.businesses || [];

        const categories = [...new Set(businesses.map(b => b.category).filter(Boolean))];

        return categories.map(category => ({
            name: category,
            icon: getCategoryIcon(category),
            gradient: getCategoryGradient(category)
        }));
    } catch (error) {
        console.error('Failed to get categories:', error);
        return [];
    }
};

// Helper functions for UI
const getCategoryIcon = (category) => {
    const icons = {
        'Electronics': 'fa-laptop',
        'electronics': 'fa-laptop',
        'Food': 'fa-utensils',
        'food': 'fa-utensils',
        'food-groceries': 'fa-shopping-basket',
        'Food-Groceries': 'fa-shopping-basket',
        'Groceries': 'fa-shopping-basket',
        'groceries': 'fa-shopping-basket',
        'Beverages': 'fa-wine-bottle',
        'beverages': 'fa-wine-bottle',
        'personal-care': 'fa-pump-soap',
        'Personal-Care': 'fa-pump-soap',
        'Personal Care': 'fa-pump-soap',
        'Clothing': 'fa-tshirt',
        'clothing': 'fa-tshirt',
        'Health': 'fa-heart-pulse',
        'health': 'fa-heart-pulse',
        'Healthcare': 'fa-heart-pulse',
        'healthcare': 'fa-heart-pulse',
        'Home': 'fa-home',
        'home': 'fa-home',
        'Books': 'fa-book',
        'books': 'fa-book',
        'Sports': 'fa-dumbbell',
        'sports': 'fa-dumbbell',
        'Beauty': 'fa-sparkles',
        'beauty': 'fa-sparkles',
        'Automotive': 'fa-car',
        'automotive': 'fa-car',
        'Hardware': 'fa-tools',
        'hardware': 'fa-tools',
        'Pharmacy': 'fa-pills',
        'pharmacy': 'fa-pills',
        'Restaurant': 'fa-utensils',
        'restaurant': 'fa-utensils'
    };
    return icons[category] || 'fa-store';
};

const getCategoryGradient = (category) => {
    const gradients = {
        'Electronics': 'from-blue-500 to-purple-600',
        'electronics': 'from-blue-500 to-purple-600',
        'Food': 'from-orange-500 to-red-500',
        'food': 'from-orange-500 to-red-500',
        'food-groceries': 'from-green-500 to-emerald-600',
        'Food-Groceries': 'from-green-500 to-emerald-600',
        'Groceries': 'from-green-500 to-emerald-600',
        'groceries': 'from-green-500 to-emerald-600',
        'Beverages': 'from-blue-400 to-cyan-500',
        'beverages': 'from-blue-400 to-cyan-500',
        'personal-care': 'from-pink-400 to-rose-500',
        'Personal-Care': 'from-pink-400 to-rose-500',
        'Personal Care': 'from-pink-400 to-rose-500',
        'Clothing': 'from-pink-500 to-purple-500',
        'clothing': 'from-pink-500 to-purple-500',
        'Health': 'from-green-500 to-teal-500',
        'health': 'from-green-500 to-teal-500',
        'Healthcare': 'from-green-500 to-teal-500',
        'healthcare': 'from-green-500 to-teal-500',
        'Home': 'from-yellow-500 to-orange-500',
        'home': 'from-yellow-500 to-orange-500',
        'Books': 'from-indigo-500 to-blue-500',
        'books': 'from-indigo-500 to-blue-500',
        'Sports': 'from-red-500 to-pink-500',
        'sports': 'from-red-500 to-pink-500',
        'Beauty': 'from-purple-500 to-pink-500',
        'beauty': 'from-purple-500 to-pink-500',
        'Automotive': 'from-gray-600 to-gray-800',
        'automotive': 'from-gray-600 to-gray-800',
        'Hardware': 'from-green-600 to-teal-600',
        'hardware': 'from-green-600 to-teal-600',
        'Pharmacy': 'from-red-400 to-pink-500',
        'pharmacy': 'from-red-400 to-pink-500',
        'Restaurant': 'from-orange-500 to-red-500',
        'restaurant': 'from-orange-500 to-red-500'
    };
    return gradients[category] || 'from-brand-teal to-teal-600';
};

export default businessApi;
