import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackPageView } from '../services/analyticsService';

// Custom hook to track page views automatically on route changes
const usePageTracking = () => {
    const location = useLocation();

    useEffect(() => {
        // Track page view on route change
        trackPageView(location.pathname);
    }, [location.pathname]);
};

export default usePageTracking;
