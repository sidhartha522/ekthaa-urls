/**
 * Tracker Dashboard - Public Analytics Page
 * Shows key metrics for the Ekthaa Business app
 */
import React, { useState, useEffect, useRef } from 'react';
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

// Minimalist Stat Card Component
const StatCard = ({ label, value, suffix = '', trend }) => {
    const animatedValue = useCountUp(value);

    return (
        <div className="group relative bg-white/80 backdrop-blur-sm rounded-lg p-8 border border-gray-200/50 hover:border-brand-teal/30 transition-all duration-500 hover:shadow-xl">
            {/* Value */}
            <div className="mb-3">
                <span className="text-5xl font-light text-gray-900 tracking-tight tabular-nums">
                    {animatedValue.toLocaleString('en-IN')}
                </span>
                {suffix && (
                    <span className="text-2xl font-light text-gray-400 ml-1">{suffix}</span>
                )}
            </div>

            {/* Label */}
            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">
                {label}
            </p>

            {/* Trend indicator */}
            {trend && (
                <div className="flex items-center gap-1 text-xs text-brand-teal">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                    <span className="font-medium">{trend}</span>
                </div>
            )}

            {/* Accent bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-brand-teal/0 via-brand-teal/40 to-brand-teal/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
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
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block w-12 h-12 border-2 border-gray-200 border-t-brand-teal rounded-full animate-spin mb-4"></div>
                    <p className="text-sm text-gray-400 font-medium tracking-wide">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Analytics | Ekthaa Business</title>
                <meta name="description" content="Real-time analytics for Ekthaa Business app" />
            </Helmet>

            <div className="min-h-screen bg-white">
                {/* Hero Section - Dark */}
                <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
                    {/* Subtle grid pattern */}
                    <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                                            linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
                            backgroundSize: '50px 50px'
                        }}></div>
                    </div>

                    <div className="relative container mx-auto px-4 py-16 md:py-20">
                        <div className="max-w-3xl">
                            {/* Small badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="text-xs font-medium text-white/90">Live Data</span>
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-tight">
                                Business Growth
                            </h1>
                            <p className="text-lg text-gray-400 font-light max-w-xl">
                                Track the growth of Ekthaa Business since launch on January 11, 2026
                            </p>

                            {/* Last updated + refresh */}
                            <div className="flex items-center gap-4 mt-8">
                                {analytics?.last_updated && (
                                    <span className="text-xs text-gray-500">
                                        Updated {formatLastUpdated(analytics.last_updated)}
                                    </span>
                                )}
                                <button
                                    onClick={() => fetchAnalytics(true)}
                                    disabled={refreshing}
                                    className="group flex items-center gap-2 px-4 py-2 rounded-md bg-white/5 hover:bg-white/10 border border-white/10 transition-all disabled:opacity-50"
                                >
                                    <svg
                                        className={`w-4 h-4 text-gray-400 group-hover:text-white transition-colors ${refreshing ? 'animate-spin' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors">
                                        Refresh
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="container mx-auto px-4 -mt-12 pb-20">
                    {error ? (
                        <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
                            <p className="text-red-600 font-medium mb-4">{error}</p>
                            <button
                                onClick={() => fetchAnalytics()}
                                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors text-sm"
                            >
                                Retry
                            </button>
                        </div>
                    ) : (
                        <>
                            {/* Stats Grid */}
                            <div className="grid md:grid-cols-3 gap-6 mb-16">
                                <StatCard
                                    label="Today"
                                    value={analytics?.registrations_today || 0}
                                    trend="New registrations"
                                />

                                <StatCard
                                    label="Total Users"
                                    value={analytics?.registrations_total || 0}
                                    trend="Since launch"
                                />

                                <StatCard
                                    label="Products"
                                    value={analytics?.products_total || 0}
                                    trend="Listed"
                                />
                            </div>

                            {/* CTA Section */}
                            <div className="max-w-2xl mx-auto text-center">
                                <h2 className="text-2xl font-light text-gray-900 mb-3">Start Using Ekthaa Business</h2>
                                <p className="text-gray-500 mb-6">
                                    Manage your business digitally with our mobile app
                                </p>
                                <a
                                    href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors group"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                                    </svg>
                                    <div className="text-left">
                                        <div className="text-xs opacity-70">Get it on</div>
                                        <div className="text-sm font-medium">Google Play</div>
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

// Animated counter hook
const useCountUp = (end, duration = 2000) => {
    const [count, setCount] = useState(0);
    const countRef = useRef(0);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if (end === 0) {
            setCount(0);
            return;
        }

        const animate = (timestamp) => {
            if (!startTimeRef.current) startTimeRef.current = timestamp;
            const progress = Math.min((timestamp - startTimeRef.current) / duration, 1);

            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(easeOutQuart * end);

            setCount(current);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                setCount(end);
            }
        };

        startTimeRef.current = null;
        requestAnimationFrame(animate);
    }, [end, duration]);

    return count;
};

// Stat Card Component
const StatCard = ({ icon, label, value, subtitle, gradient }) => {
    const animatedValue = useCountUp(value);

    return (
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300">
            <div className={`h-2 bg-gradient-to-r ${gradient}`}></div>
            <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center shadow-lg`}>
                        {icon}
                    </div>
                </div>
                <div className="mb-2">
                    <span className="text-4xl font-bold text-gray-900 tracking-tight">
                        {animatedValue.toLocaleString('en-IN')}
                    </span>
                </div>
                <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">{label}</p>
                {subtitle && (
                    <p className="text-xs text-gray-400 mt-1">{subtitle}</p>
                )}
            </div>
        </div>
    );
};

// Icons as SVG components
const UsersIcon = () => (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13-7.874v1.5a2 2 0 11-4 0v-1.5m2-4a2.5 2.5 0 100 5 2.5 2.5 0 000-5z" />
    </svg>
);

const TrendingUpIcon = () => (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
    </svg>
);

const BoxIcon = () => (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const CalendarIcon = () => (
    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
    </svg>
);

const RefreshIcon = ({ spinning }) => (
    <svg className={`w-5 h-5 ${spinning ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
);

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
            setError('Unable to load analytics. Please try again.');
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    };

    useEffect(() => {
        fetchAnalytics();

        // Auto-refresh every 5 minutes
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
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-brand-teal border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500 font-medium">Loading analytics...</p>
                </div>
            </div>
        );
    }

    return (
        <>
            <Helmet>
                <title>Tracker | Ekthaa Business Analytics</title>
                <meta name="description" content="Real-time analytics for Ekthaa Business app - track registrations and growth metrics." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
                {/* Header Section */}
                <div className="bg-white border-b border-gray-200">
                    <div className="container mx-auto px-4 py-8 md:py-12">
                        <div className="max-w-4xl">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-gradient-to-br from-brand-teal to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                    </svg>
                                </div>
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                                        Ekthaa Business Tracker
                                    </h1>
                                    <p className="text-gray-500 text-sm md:text-base mt-1">
                                        Real-time growth metrics since launch
                                    </p>
                                </div>
                            </div>

                            <div className="flex flex-wrap items-center gap-4 mt-6">
                                <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-full">
                                    <CalendarIcon />
                                    <span className="text-sm font-medium text-gray-700">
                                        Since January 11, 2026
                                    </span>
                                </div>

                                <button
                                    onClick={() => fetchAnalytics(true)}
                                    disabled={refreshing}
                                    className="flex items-center gap-2 bg-brand-teal text-white px-4 py-2 rounded-full hover:bg-teal-700 transition-colors disabled:opacity-50"
                                >
                                    <RefreshIcon spinning={refreshing} />
                                    <span className="text-sm font-medium">
                                        {refreshing ? 'Refreshing...' : 'Refresh'}
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="container mx-auto px-4 py-8 md:py-12">
                    {error ? (
                        <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center max-w-md mx-auto">
                            <p className="text-red-600 font-medium">{error}</p>
                            <button
                                onClick={() => fetchAnalytics()}
                                className="mt-4 bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors"
                            >
                                Try Again
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                <StatCard
                                    icon={<TrendingUpIcon />}
                                    label="Registrations Today"
                                    value={analytics?.registrations_today || 0}
                                    subtitle="New businesses joined today"
                                    gradient="from-emerald-400 to-teal-500"
                                />

                                <StatCard
                                    icon={<UsersIcon />}
                                    label="Total Registrations"
                                    value={analytics?.registrations_total || 0}
                                    subtitle="Since app launch"
                                    gradient="from-blue-400 to-indigo-500"
                                />

                                <StatCard
                                    icon={<BoxIcon />}
                                    label="Products Listed"
                                    value={analytics?.products_total || 0}
                                    subtitle="Across all businesses"
                                    gradient="from-purple-400 to-pink-500"
                                />
                            </div>

                            {/* Last Updated */}
                            {analytics?.last_updated && (
                                <div className="text-center mt-8">
                                    <p className="text-sm text-gray-400">
                                        Last updated at {formatLastUpdated(analytics.last_updated)}
                                    </p>
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* App Store CTA */}
                <div className="container mx-auto px-4 pb-12">
                    <div className="max-w-3xl mx-auto bg-gradient-to-r from-brand-teal to-teal-600 rounded-2xl p-8 text-center text-white shadow-xl">
                        <h2 className="text-2xl font-bold mb-3">Join the Growing Community</h2>
                        <p className="text-teal-100 mb-6">
                            Download Ekthaa Business and start managing your business digitally.
                        </p>
                        <a
                            href="https://play.google.com/store/apps/details?id=com.ekthaa.business"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-900 transition-colors shadow-lg"
                        >
                            <i className="fab fa-google-play text-xl"></i>
                            <div className="text-left">
                                <div className="text-xs opacity-70">Get it on</div>
                                <div className="font-semibold">Google Play</div>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tracker;
