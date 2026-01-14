/**
 * Tracker Dashboard - Public Analytics Page
 * Shows key metrics for the Ekthaa Business app
 */
import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';

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
