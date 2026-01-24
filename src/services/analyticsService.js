// Analytics Service for tracking website visits and user metrics
// Uses localStorage for client-side tracking

const STORAGE_KEY = 'ekthaa_analytics';
const SESSION_KEY = 'ekthaa_session';

// Generate a unique user ID using UUID v4
const generateUserId = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0;
        const v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
};

// Get current timestamp
const getTimestamp = () => new Date().toISOString();

// Initialize analytics data structure
const initializeAnalytics = () => {
    try {
        const existingData = localStorage.getItem(STORAGE_KEY);

        if (existingData) {
            return JSON.parse(existingData);
        }

        // Create new analytics data
        const userId = generateUserId();
        const now = getTimestamp();

        const analyticsData = {
            userId,
            firstVisit: now,
            lastVisit: now,
            totalVisits: 0,
            visits: [],
            isReturningUser: false
        };

        localStorage.setItem(STORAGE_KEY, JSON.stringify(analyticsData));
        return analyticsData;
    } catch (error) {
        console.error('Error initializing analytics:', error);
        return null;
    }
};

// Track a page view
const trackPageView = (path = window.location.pathname) => {
    try {
        let data = initializeAnalytics();
        if (!data) return;

        const now = getTimestamp();
        const sessionData = sessionStorage.getItem(SESSION_KEY);

        // Check if this is a new session (returning user)
        if (!sessionData && data.totalVisits > 0) {
            data.isReturningUser = true;
        }

        // Update visit data
        data.lastVisit = now;
        data.totalVisits += 1;

        // Add visit record
        data.visits.push({
            timestamp: now,
            path,
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct'
        });

        // Keep only last 1000 visits to prevent storage overflow
        if (data.visits.length > 1000) {
            data.visits = data.visits.slice(-1000);
        }

        // Save to localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));

        // Mark session as active
        sessionStorage.setItem(SESSION_KEY, 'active');

        return data;
    } catch (error) {
        console.error('Error tracking page view:', error);
        return null;
    }
};

// Get all analytics data
const getAnalytics = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error getting analytics:', error);
        return null;
    }
};

// Get aggregated metrics
const getMetrics = () => {
    try {
        const data = getAnalytics();
        if (!data) {
            return {
                uniqueUsers: 0,
                totalVisits: 0,
                returningUsers: 0,
                averageVisitsPerUser: 0,
                firstVisit: null,
                lastVisit: null
            };
        }

        // For client-side tracking, we can only track this browser
        const uniqueUsers = 1; // Current user
        const returningUsers = data.isReturningUser ? 1 : 0;

        return {
            uniqueUsers,
            totalVisits: data.totalVisits,
            returningUsers,
            averageVisitsPerUser: data.totalVisits,
            firstVisit: data.firstVisit,
            lastVisit: data.lastVisit,
            userId: data.userId
        };
    } catch (error) {
        console.error('Error getting metrics:', error);
        return null;
    }
};

// Get visit history
const getVisitHistory = (limit = 100) => {
    try {
        const data = getAnalytics();
        if (!data || !data.visits) return [];

        // Return most recent visits first
        return data.visits.slice(-limit).reverse();
    } catch (error) {
        console.error('Error getting visit history:', error);
        return [];
    }
};

// Export analytics data as JSON
const exportData = () => {
    try {
        const data = getAnalytics();
        if (!data) return null;

        const exportObj = {
            ...data,
            exportedAt: getTimestamp(),
            metrics: getMetrics()
        };

        const dataStr = JSON.stringify(exportObj, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);

        const link = document.createElement('a');
        link.href = url;
        link.download = `ekthaa-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        return exportObj;
    } catch (error) {
        console.error('Error exporting data:', error);
        return null;
    }
};

// Clear all analytics data (admin function)
const clearAnalytics = () => {
    try {
        localStorage.removeItem(STORAGE_KEY);
        sessionStorage.removeItem(SESSION_KEY);
        return true;
    } catch (error) {
        console.error('Error clearing analytics:', error);
        return false;
    }
};

// Check if analytics is enabled (localStorage available)
const isAnalyticsEnabled = () => {
    try {
        const test = '__analytics_test__';
        localStorage.setItem(test, test);
        localStorage.removeItem(test);
        return true;
    } catch (error) {
        return false;
    }
};

export {
    initializeAnalytics,
    trackPageView,
    getAnalytics,
    getMetrics,
    getVisitHistory,
    exportData,
    clearAnalytics,
    isAnalyticsEnabled
};
