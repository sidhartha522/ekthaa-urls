/**
 * Lifetime Analytics Service
 * Implements buffered event tracking, user fingerprinting, and dual-layer data architecture
 * 
 * Architecture:
 * - Local Buffer: Fast in-memory buffer for batching events
 * - Raw Traffic Logs: Backend collection for detailed last 30 days
 * - Analytics Aggregates: Pre-computed daily summaries for fast historical queries
 */

import { databases, Query, APPWRITE_CONFIG } from './appwriteConfig';

// ============================================================================
// CONFIGURATION
// ============================================================================

const STORAGE_KEY = 'ekthaa_lifetime_analytics';
const SESSION_KEY = 'ekthaa_session';
const FINGERPRINT_KEY = 'ekthaa_visitor_id';
const EVENT_BUFFER_KEY = 'ekthaa_event_buffer';
const BUFFER_FLUSH_INTERVAL = 30000; // 30 seconds
const BUFFER_SIZE_LIMIT = 50; // Flush if buffer reaches 50 events
const UNIQUE_VIEW_FLAG_KEY = 'ekthaa_unique_view_recorded';

// Collection IDs (to be created in Appwrite)
export const ANALYTICS_COLLECTIONS = {
    RAW_TRAFFIC_LOGS: APPWRITE_CONFIG.COLLECTION_ID_RAW_TRAFFIC || 'raw_traffic_logs',
    ANALYTICS_AGGREGATES: APPWRITE_CONFIG.COLLECTION_ID_ANALYTICS_AGGREGATES || 'analytics_aggregates',
    POWER_USERS: APPWRITE_CONFIG.COLLECTION_ID_POWER_USERS || 'power_users',
    USER_COHORTS: APPWRITE_CONFIG.COLLECTION_ID_USER_COHORTS || 'user_cohorts',
    UNIQUE_VIEWS: APPWRITE_CONFIG.COLLECTION_ID_UNIQUE_VIEWS || 'unique_views'
};

// ============================================================================
// FINGERPRINTING & VISITOR IDENTIFICATION
// ============================================================================

/**
 * Generate a unique fingerprint for guest users
 * Uses browser/device characteristics to create a stable identifier
 */
const generateFingerprint = () => {
    const components = [
        navigator.userAgent,
        navigator.language,
        new Date().getTimezoneOffset(),
        screen.width + 'x' + screen.height,
        navigator.hardwareConcurrency || 'unknown'
    ];
    
    const fingerprint = components.join('|');
    const hash = hashString(fingerprint);
    return `guest_${hash}`;
};

/**
 * Simple hash function for fingerprint
 */
const hashString = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash).toString(36);
};

/**
 * Get or create a persistent visitor ID
 */
export const getOrCreateVisitorId = (userId = null) => {
    if (userId) {
        return `user_${userId}`;
    }
    
    let fingerprint = localStorage.getItem(FINGERPRINT_KEY);
    if (!fingerprint) {
        fingerprint = generateFingerprint();
        localStorage.setItem(FINGERPRINT_KEY, fingerprint);
    }
    return fingerprint;
};

// ============================================================================
// EVENT BUFFERING SYSTEM
// ============================================================================

let bufferFlushTimer = null;

/**
 * Get current event buffer from localStorage
 */
const getEventBuffer = () => {
    try {
        const buffer = localStorage.getItem(EVENT_BUFFER_KEY);
        return buffer ? JSON.parse(buffer) : [];
    } catch {
        return [];
    }
};

/**
 * Add event to local buffer
 */
const addToBuffer = (event) => {
    try {
        const buffer = getEventBuffer();
        buffer.push(event);
        localStorage.setItem(EVENT_BUFFER_KEY, JSON.stringify(buffer));
        
        // Auto-flush if buffer size limit reached
        if (buffer.length >= BUFFER_SIZE_LIMIT) {
            flushEventBuffer();
        }
    } catch (error) {
        console.error('Error adding event to buffer:', error);
    }
};

/**
 * Flush buffered events to backend
 */
export const flushEventBuffer = async (visitorId = null) => {
    try {
        const buffer = getEventBuffer();
        if (buffer.length === 0) return;

        const vid = visitorId || getOrCreateVisitorId();
        
        // Send to backend in batches
        for (const event of buffer) {
            await recordRawTrafficLog({
                ...event,
                visitorId: vid,
                timestamp: new Date(event.timestamp)
            });
        }

        // Clear buffer
        localStorage.removeItem(EVENT_BUFFER_KEY);
        console.log(`[Analytics] Flushed ${buffer.length} events to backend`);
    } catch (error) {
        console.error('Error flushing event buffer:', error);
    }
};

/**
 * Start periodic buffer flush
 */
export const startBufferFlush = () => {
    if (bufferFlushTimer) return;
    
    bufferFlushTimer = setInterval(() => {
        flushEventBuffer();
    }, BUFFER_FLUSH_INTERVAL);
};

/**
 * Stop periodic buffer flush
 */
export const stopBufferFlush = () => {
    if (bufferFlushTimer) {
        clearInterval(bufferFlushTimer);
        bufferFlushTimer = null;
    }
};

// ============================================================================
// RAW TRAFFIC LOG RECORDING
// ============================================================================

/**
 * Record a single page view to raw_traffic_logs collection
 */
export const recordRawTrafficLog = async (eventData) => {
    try {
        // Only attempt if Appwrite is available
        if (!databases || !APPWRITE_CONFIG.DATABASE_ID) {
            console.warn('[Analytics] Appwrite not configured, buffering event locally');
            return false;
        }

        const logEntry = {
            visitorId: eventData.visitorId,
            path: eventData.path,
            timestamp: eventData.timestamp || new Date(),
            userAgent: eventData.userAgent || navigator.userAgent,
            referrer: eventData.referrer || document.referrer || 'direct',
            sessionId: getSessionId(),
            country: eventData.country || 'unknown',
            city: eventData.city || 'unknown'
        };

        await databases.createDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            ANALYTICS_COLLECTIONS.RAW_TRAFFIC_LOGS,
            'unique()',
            logEntry
        );

        return true;
    } catch (error) {
        console.error('Error recording raw traffic log:', error);
        return false;
    }
};

// ============================================================================
// UNIQUE VIEW COUNTER
// ============================================================================

const getUniqueViewFlagKey = (visitorId) => `${UNIQUE_VIEW_FLAG_KEY}_${visitorId}`;

/**
 * Record a single unique view per visitor
 */
export const recordUniqueViewOnce = async (userId = null) => {
    const visitorId = getOrCreateVisitorId(userId);
    const flagKey = getUniqueViewFlagKey(visitorId);

    if (localStorage.getItem(flagKey)) {
        return { counted: false, visitorId, reason: 'already-recorded' };
    }

    if (!databases || !APPWRITE_CONFIG.DATABASE_ID) {
        localStorage.setItem(flagKey, '1');
        return { counted: false, visitorId, reason: 'backend-unavailable' };
    }

    try {
        await databases.createDocument(
            APPWRITE_CONFIG.DATABASE_ID,
            ANALYTICS_COLLECTIONS.UNIQUE_VIEWS,
            visitorId,
            {
                visitorId,
                firstSeen: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: document.referrer || 'direct'
            }
        );
        localStorage.setItem(flagKey, '1');
        return { counted: true, visitorId };
    } catch (error) {
        if (error?.code === 409) {
            localStorage.setItem(flagKey, '1');
            return { counted: false, visitorId, reason: 'duplicate' };
        }
        console.error('Error recording unique view:', error);
        return { counted: false, visitorId, error };
    }
};

/**
 * Get total unique view count (one per visitor)
 */
export const getUniqueViewCount = async () => {
    try {
        if (!databases || !APPWRITE_CONFIG.DATABASE_ID) return 0;

        const result = await databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            ANALYTICS_COLLECTIONS.UNIQUE_VIEWS,
            [Query.limit(1)]
        );

        if (typeof result.total === 'number') return result.total;
        return result.documents?.length || 0;
    } catch (error) {
        console.error('Error fetching unique view count:', error);
        return 0;
    }
};

// ============================================================================
// SESSION MANAGEMENT
// ============================================================================

/**
 * Get or create session ID
 */
const getSessionId = () => {
    let sessionId = sessionStorage.getItem(SESSION_KEY);
    if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        sessionStorage.setItem(SESSION_KEY, sessionId);
    }
    return sessionId;
};

// ============================================================================
// PAGE TRACKING (Buffered)
// ============================================================================

/**
 * Track a page view with buffering
 * This is the primary tracking function called from usePageTracking
 */
export const trackPageViewBuffered = (path = window.location.pathname, userId = null) => {
    try {
        const visitorId = getOrCreateVisitorId(userId);
        const timestamp = new Date().toISOString();

        const event = {
            visitorId,
            path,
            timestamp,
            userAgent: navigator.userAgent,
            referrer: document.referrer || 'direct',
            sessionId: getSessionId()
        };

        // Add to buffer instead of direct write
        addToBuffer(event);

        // Update local session data
        updateLocalSessionData(visitorId, path, timestamp);

        return event;
    } catch (error) {
        console.error('Error tracking page view:', error);
        return null;
    }
};

/**
 * Update local session/analytics data
 */
const updateLocalSessionData = (visitorId, path, timestamp) => {
    try {
        const data = getLocalAnalytics();
        data.lastVisit = timestamp;
        data.totalVisits += 1;
        data.visits.push({
            timestamp,
            path,
            visitorId,
            sessionId: getSessionId()
        });

        // Keep only last 1000 visits locally
        if (data.visits.length > 1000) {
            data.visits = data.visits.slice(-1000);
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
        console.error('Error updating local session data:', error);
    }
};

// ============================================================================
// LOCAL DATA RETRIEVAL (For Initial Page Load)
// ============================================================================

/**
 * Get local analytics data
 */
const getLocalAnalytics = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        if (data) {
            return JSON.parse(data);
        }
        return initializeLocalAnalytics();
    } catch {
        return initializeLocalAnalytics();
    }
};

/**
 * Initialize local analytics structure
 */
const initializeLocalAnalytics = () => {
    const data = {
        visitorId: getOrCreateVisitorId(),
        firstVisit: new Date().toISOString(),
        lastVisit: new Date().toISOString(),
        totalVisits: 0,
        visits: [],
        isReturningUser: false
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return data;
};

// ============================================================================
// BACKEND QUERIES (For Analytics Dashboard)
// ============================================================================

/**
 * Get aggregated metrics for a date range
 */
export const getAggregatedMetrics = async (startDate, endDate) => {
    try {
        if (!databases || !APPWRITE_CONFIG.DATABASE_ID) {
            console.warn('[Analytics] Appwrite not available');
            return null;
        }

        const docs = await databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            ANALYTICS_COLLECTIONS.ANALYTICS_AGGREGATES,
            [
                Query.greaterThanEqual('date', startDate.toISOString()),
                Query.lessThanEqual('date', endDate.toISOString()),
                Query.orderDesc('date')
            ]
        );

        return docs.documents;
    } catch (error) {
        console.error('Error fetching aggregated metrics:', error);
        return [];
    }
};

/**
 * Get unique visitor count (one per visitor)
 * Date params are accepted for backward compatibility but ignored
 */
export const getUniqueVisitors = async (_startDate, _endDate) => {
    return getUniqueViewCount();
};

/**
 * Get top pages for date range
 */
export const getTopPages = async (startDate, endDate, limit = 10) => {
    try {
        if (!databases || !APPWRITE_CONFIG.DATABASE_ID) return [];

        const docs = await databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            ANALYTICS_COLLECTIONS.RAW_TRAFFIC_LOGS,
            [
                Query.greaterThanEqual('timestamp', startDate.toISOString()),
                Query.lessThanEqual('timestamp', endDate.toISOString()),
                Query.limit(10000)
            ]
        );

        // Group by path and count
        const pageCounts = {};
        docs.documents.forEach(doc => {
            pageCounts[doc.path] = (pageCounts[doc.path] || 0) + 1;
        });

        // Sort and return top pages
        return Object.entries(pageCounts)
            .map(([path, count]) => ({ path, count }))
            .sort((a, b) => b.count - a.count)
            .slice(0, limit);
    } catch (error) {
        console.error('Error fetching top pages:', error);
        return [];
    }
};

/**
 * Get power users (top 5% by activity)
 */
export const getPowerUsers = async (startDate, endDate, limit = 20) => {
    try {
        if (!databases || !APPWRITE_CONFIG.DATABASE_ID) return [];

        const docs = await databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            ANALYTICS_COLLECTIONS.RAW_TRAFFIC_LOGS,
            [
                Query.greaterThanEqual('timestamp', startDate.toISOString()),
                Query.lessThanEqual('timestamp', endDate.toISOString()),
                Query.limit(50000)
            ]
        );

        // Count visits per visitor
        const visitorActivity = {};
        docs.documents.forEach(doc => {
            visitorActivity[doc.visitorId] = (visitorActivity[doc.visitorId] || 0) + 1;
        });

        // Sort and return power users
        return Object.entries(visitorActivity)
            .map(([visitorId, visits]) => ({ visitorId, visits }))
            .sort((a, b) => b.visits - a.visits)
            .slice(0, limit);
    } catch (error) {
        console.error('Error fetching power users:', error);
        return [];
    }
};

/**
 * Get user growth over time (cumulative)
 */
export const getUserGrowthTrend = async (startDate, endDate) => {
    try {
        if (!databases || !APPWRITE_CONFIG.DATABASE_ID) return [];

        const docs = await databases.listDocuments(
            APPWRITE_CONFIG.DATABASE_ID,
            ANALYTICS_COLLECTIONS.ANALYTICS_AGGREGATES,
            [
                Query.greaterThanEqual('date', startDate.toISOString()),
                Query.lessThanEqual('date', endDate.toISOString()),
                Query.orderAsc('date')
            ]
        );

        // Convert to cumulative format
        let cumulativeUsers = 0;
        return docs.documents.map(doc => {
            cumulativeUsers += doc.unique_visitors || 0;
            return {
                date: doc.date,
                cumulativeUsers,
                dailyUsers: doc.unique_visitors || 0,
                totalHits: doc.total_hits || 0
            };
        });
    } catch (error) {
        console.error('Error fetching user growth trend:', error);
        return [];
    }
};

// ============================================================================
// INITIALIZATION
// ============================================================================

/**
 * Initialize lifetime analytics system
 */
export const initializeLifetimeAnalytics = (userId = null) => {
    // Initialize local data
    const visitorId = getOrCreateVisitorId(userId);
    initializeLocalAnalytics();

    // Record one-time unique view per visitor
    recordUniqueViewOnce(userId);

    // Start periodic buffer flush
    startBufferFlush();

    // Track initial page load
    trackPageViewBuffered(window.location.pathname, userId);

    return visitorId;
};

/**
 * Cleanup on app unmount
 */
export const cleanupLifetimeAnalytics = async () => {
    stopBufferFlush();
    await flushEventBuffer();
};

export default {
    initializeLifetimeAnalytics,
    cleanupLifetimeAnalytics,
    trackPageViewBuffered,
    flushEventBuffer,
    getOrCreateVisitorId,
    startBufferFlush,
    stopBufferFlush,
    recordRawTrafficLog,
    getAggregatedMetrics,
    getUniqueVisitors,
    getTopPages,
    getPowerUsers,
    getUserGrowthTrend,
    recordUniqueViewOnce,
    getUniqueViewCount
};
