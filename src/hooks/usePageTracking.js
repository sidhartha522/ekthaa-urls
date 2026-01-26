import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageViewBuffered } from '../services/lifetimeAnalyticsService';

// Custom hook to track page views automatically on route changes
// Uses buffered/batched tracking for optimal performance
const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        // Track page view on route change using buffered system
        trackPageViewBuffered(location.pathname);
    }, [location.pathname]);
};

export default usePageTracking;
