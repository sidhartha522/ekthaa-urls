import { createContext, useContext, useEffect } from 'react';
import { initializeAnalytics, trackPageView, isAnalyticsEnabled } from '../services/analyticsService';

const AnalyticsContext = createContext(null);

export const AnalyticsProvider = ({ children }) => {
    useEffect(() => {
        // Initialize analytics on app mount
        if (isAnalyticsEnabled()) {
            initializeAnalytics();
        }
    }, []);

    const value = {
        trackPageView,
        isEnabled: isAnalyticsEnabled()
    };

    return (
        <AnalyticsContext.Provider value={value}>
            {children}
        </AnalyticsContext.Provider>
    );
};

export const useAnalytics = () => {
    const context = useContext(AnalyticsContext);
    if (!context) {
        throw new Error('useAnalytics must be used within AnalyticsProvider');
    }
    return context;
};
