/**
 * Tracker Dashboard - Public Analytics Page
 * Shows key metrics for the Ekthaa Business app
 */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

// Animated counter hook
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        if (end === 0) {
            setCount(0);
            return;
        }

        let startTime = null;
        const animate = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);

            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * end);

            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        requestAnimationFrame(animate);
    }, [end, duration]);

    return count;
};

// Clean stat card with brand colors
const StatCard = ({ label, value, trend, gradient }) => {
    const animatedValue = useCountUp(value);

    return (
        <div className={`relative rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${gradient}`}>
            <div className="p-8 md:p-10">
                {/* Value - Using serif font like the heading */}
                <div className="mb-4">
                    <span className="text-7xl md:text-8xl font-serif font-bold text-white tracking-tight tabular-nums block">
                        {animatedValue.toLocaleString('en-IN')}
                    </span>
                </div>

                {/* Label */}
                <p className="text-base md:text-lg font-bold text-white uppercase tracking-wide mb-2">
                    {label}
                </p>

                {/* Trend */}
                {trend && (
                    <p className="text-sm md:text-base text-white/80 font-medium">
                        {trend}
                    </p>
                )}
            </div>

            {/* Accent line with glow */}
            <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-white/30"></div>
        </div>
    );
};

const Tracker = () => {
    const [analytics, setAnalytics] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const BUSINESS_API_URL = 'https://ekthaabusiness-955272392528.europe-west1.run.app/api';

    const fetchAnalytics = async (isRefresh = false) => {
        try {
            if (isRefresh) setRefreshing(true);

            const response = await fetch(`${BUSINESS_API_URL}/public/analytics`);

            if (!response.ok) {
                throw new Error('Failed to fetch analytics');
            }

            const data = await response.json();
            setAnalytics(data);
            setError(null);
        } catch (err) {
            console.error('Analytics fetch error:', err);
            setError('Unable to load analytics');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();
        const interval = setInterval(() => fetchAnalytics(true), 5 * 60 * 1000);
        return () => clearInterval(interval);
    }, []);

    const formatLastUpdated = (isoString) => {
        if (!isoString) return '';
        try {
            const date = new Date(isoString);
            return date.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });
        } catch {
            return '';
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-brand-cream flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-16 h-16 border-4 border-brand-teal/20 border-t-brand-teal rounded-full animate-spin mb-4"></div>
                    <p className="text-sm text-brand-text/60 font-medium">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Analytics Tracker | Ekthaa Business</title>
                <meta name="description" content="Real-time analytics for Ekthaa Business app - track growth and engagement" />
            </Helmet>

            <div className="min-h-screen bg-brand-beige">
                {/* Hero Section with Brand Gradient */}
                <div className="bg-brand-cream pt-6 pb-12 md:pb-16">
                    <div className="container mx-auto px-4">
                        <div className="rounded-xl overflow-hidden shadow-lg relative bg-gradient-to-r from-brand-teal to-teal-700 p-6 md:p-12">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-sm mb-4">
                                <div className="w-2 h-2 rounded-full bg-green-300 animate-pulse"></div>
                                <span className="text-xs font-semibold text-white">Live Analytics</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">
                                Business Growth Tracker
                            </h1>
                            <p className="text-base md:text-lg text-white/90 max-w-2xl mb-6">
                                Track Ekthaa Business growth since launch on January 11, 2026
                            </p>

                            {/* Actions */}
                            <div className="flex flex-wrap items-center gap-3">
                                {analytics?.last_updated && (
                                    <span className="text-xs md:text-sm text-white/70">
                                        Updated {formatLastUpdated(analytics.last_updated)}
                                    </span>
                                )}
                                <button
                                    onClick={() => fetchAnalytics(true)}
                                    disabled={refreshing}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 transition-all disabled:opacity-50"
                                >
                                    <svg
                                        className={`w-4 h-4 text-white ${refreshing ? 'animate-spin' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span className="text-sm font-medium text-white">
                                        Refresh
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="container mx-auto px-4 -mt-8 pb-12 md:pb-20">
                    {error ? (
                        <div className="max-w-md mx-auto bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                            <p className="text-red-600 font-semibold mb-4">{error}</p>
                            <button
                                onClick={() => fetchAnalytics()}
                                className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Stats Grid - Mobile optimized with distinct gradients */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
                                <StatCard
                                    label="Today"
                                    value={analytics?.registrations_today || 0}
                                    trend="New registrations"
                                    gradient="from-emerald-500 via-teal-500 to-cyan-600"
                                />

                                <StatCard
                                    label="Total Users"
                                    value={analytics?.registrations_total || 0}
                                    trend="Since launch"
                                    gradient="from-brand-teal via-teal-600 to-emerald-700"
                                />

                                <StatCard
                                    label="Products"
                                    value={analytics?.products_total || 0}
                                    trend="Total listed"
                                    gradient="from-cyan-600 via-teal-700 to-teal-800"
                                />
                            </div>

                            {/* CTA Section */}
                            <div className="max-w-2xl mx-auto text-center bg-white rounded-xl shadow-md p-8">
                                <h2 className="text-2xl md:text-3xl font-serif font-bold text-brand-dark mb-3">
                                    Join Ekthaa Business
                                </h2>
                                <p className="text-brand-text/70 mb-6 text-sm md:text-base">
                                    Manage your business digitally with our mobile app
                                </p>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-brand-teal text-white rounded-lg hover:bg-teal-700 transition-colors font-bold shadow-lg hover:scale-105 transform"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs opacity-90">Get it on</div>
                                        <div className="text-sm">Google Play</div>
                                    </div>
                                </a>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};

export default Tracker;
