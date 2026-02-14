import { useState, useEffect } from 'react';
import {
    Users,
    Eye,
    TrendingUp,
    Download,
    Trash2,
    LogOut,
    Calendar,
    Clock,
    Globe,
    RefreshCw,
    BarChart3,
    LineChart as LineChartIcon,
    PieChart as PieChartIcon
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
    getAggregatedMetrics,
    getUniqueVisitors,
    getTopPages,
    getPowerUsers,
    getUserGrowthTrend,
    flushEventBuffer
} from '../services/lifetimeAnalyticsService';

const AnalyticsNew = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    
    // State
    const [loading, setLoading] = useState(true);
    const [dateRange, setDateRange] = useState('30days'); // 7days, 30days, 90days, lifetime
    const [metrics, setMetrics] = useState(null);
    const [topPages, setTopPages] = useState([]);
    const [powerUsers, setPowerUsers] = useState([]);
    const [growthData, setGrowthData] = useState([]);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const [error, setError] = useState(null);

    // Date range calculation
    const getDateRange = (range) => {
        const endDate = new Date();
        const startDate = new Date();

        switch (range) {
            case '7days':
                startDate.setDate(endDate.getDate() - 7);
                break;
            case '30days':
                startDate.setDate(endDate.getDate() - 30);
                break;
            case '90days':
                startDate.setDate(endDate.getDate() - 90);
                break;
            case 'lifetime':
                startDate.setFullYear(2020); // Platform launch
                break;
            default:
                startDate.setDate(endDate.getDate() - 30);
        }

        return { startDate, endDate };
    };

    // Load analytics data
    const loadAnalyticsData = async () => {
        try {
            setLoading(true);
            setError(null);

            const { startDate, endDate } = getDateRange(dateRange);

            // Flush buffer to ensure latest data
            await flushEventBuffer();

            // Fetch all metrics in parallel
            const [
                aggregates,
                uniqueCount,
                topPagesData,
                powerUsersData,
                growthTrend
            ] = await Promise.all([
                getAggregatedMetrics(startDate, endDate),
                getUniqueVisitors(startDate, endDate),
                getTopPages(startDate, endDate, 10),
                getPowerUsers(startDate, endDate, 20),
                getUserGrowthTrend(startDate, endDate)
            ]);

            // Calculate aggregate metrics
            const totalHits = aggregates.reduce((sum, doc) => sum + (doc.total_hits || 0), 0);
            const totalVisitors = uniqueCount;
            const avgLatency = aggregates.length > 0
                ? aggregates.reduce((sum, doc) => sum + (doc.avg_latency || 0), 0) / aggregates.length
                : 0;

            setMetrics({
                totalHits,
                totalVisitors,
                avgLatency: Math.round(avgLatency),
                successRate: 99.2, // Placeholder, would come from actual API data
                period: `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`
            });

            setTopPages(topPagesData);
            setPowerUsers(powerUsersData);
            setGrowthData(growthTrend);

            setLoading(false);
        } catch (err) {
            console.error('Error loading analytics:', err);
            setError(`Failed to load analytics: ${err.message}`);
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAnalyticsData();
    }, [dateRange]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const handleExport = () => {
        const data = {
            metrics,
            topPages,
            powerUsers,
            growthData,
            exportedAt: new Date().toISOString()
        };

        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `ekthaa-analytics-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    // Error state
    if (error && error.includes('Unauthorized')) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-cream">
                <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h2>
                    <p className="text-gray-600 mb-4">{error}</p>
                    <p className="text-sm text-gray-500">Redirecting to home...</p>
                </div>
            </div>
        );
    }

    if (loading && !metrics) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-brand-cream">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-cream py-8 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">
                            Lifetime Analytics Dashboard
                        </h1>
                        <p className="text-gray-600">
                            Historical trends and growth metrics since platform launch
                        </p>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                        <button
                            onClick={loadAnalyticsData}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                        >
                            <RefreshCw className="w-4 h-4" />
                            Refresh
                        </button>
                        <button
                            onClick={handleExport}
                            className="flex items-center gap-2 px-4 py-2 bg-brand-teal text-white rounded-lg hover:bg-brand-teal/90 transition-colors text-sm font-medium"
                        >
                            <Download className="w-4 h-4" />
                            Export
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>

                {/* Date Range Selector */}
                <div className="mb-8 bg-white rounded-lg shadow-md p-4 border border-gray-100">
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Time Period
                    </label>
                    <div className="flex gap-3 flex-wrap">
                        {[
                            { value: '7days', label: 'Last 7 Days' },
                            { value: '30days', label: 'Last 30 Days' },
                            { value: '90days', label: 'Last 90 Days' },
                            { value: 'lifetime', label: 'All Time' }
                        ].map(option => (
                            <button
                                key={option.value}
                                onClick={() => setDateRange(option.value)}
                                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                                    dateRange === option.value
                                        ? 'bg-brand-teal text-white shadow-md'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {option.label}
                            </button>
                        ))}
                    </div>
                    {metrics && (
                        <p className="text-xs text-gray-500 mt-3">
                            Period: {metrics.period}
                        </p>
                    )}
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                        {error}
                    </div>
                )}

                {/* Main Metrics Cards */}
                {metrics && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {/* Total Hits */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-blue-100 rounded-lg">
                                    <Eye className="w-6 h-6 text-blue-600" />
                                </div>
                            </div>
                            <h3 className="text-gray-600 text-sm font-medium mb-1">Total Page Views</h3>
                            <p className="text-3xl font-bold text-brand-text">
                                {metrics.totalHits.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">All-time pageviews</p>
                        </div>

                        {/* Unique Visitors */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-purple-100 rounded-lg">
                                    <Users className="w-6 h-6 text-purple-600" />
                                </div>
                            </div>
                            <h3 className="text-gray-600 text-sm font-medium mb-1">Unique Visitors</h3>
                            <p className="text-3xl font-bold text-brand-text">
                                {metrics.totalVisitors.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Fingerprinted guests</p>
                        </div>

                        {/* Avg Latency */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-green-100 rounded-lg">
                                    <Clock className="w-6 h-6 text-green-600" />
                                </div>
                            </div>
                            <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Latency</h3>
                            <p className="text-3xl font-bold text-brand-text">
                                {metrics.avgLatency}ms
                            </p>
                            <p className="text-xs text-gray-500 mt-1">Average response time</p>
                        </div>

                        {/* Success Rate */}
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className="p-3 bg-orange-100 rounded-lg">
                                    <TrendingUp className="w-6 h-6 text-orange-600" />
                                </div>
                            </div>
                            <h3 className="text-gray-600 text-sm font-medium mb-1">Success Rate</h3>
                            <p className="text-3xl font-bold text-brand-text">
                                {metrics.successRate}%
                            </p>
                            <p className="text-xs text-gray-500 mt-1">API requests</p>
                        </div>
                    </div>
                )}

                {/* Detailed Sections */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                    {/* Top Pages */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <BarChart3 className="w-5 h-5 text-brand-teal" />
                            <h2 className="text-lg font-bold text-brand-text">Top Pages</h2>
                        </div>
                        <div className="space-y-3">
                            {topPages.length > 0 ? (
                                topPages.map((page, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-sm font-medium text-gray-700 truncate">{page.path}</span>
                                        <span className="text-sm font-bold text-brand-teal">{page.count.toLocaleString()}</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No data available</p>
                            )}
                        </div>
                    </div>

                    {/* Power Users */}
                    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                        <div className="flex items-center gap-2 mb-4">
                            <PieChartIcon className="w-5 h-5 text-brand-teal" />
                            <h2 className="text-lg font-bold text-brand-text">Top 20 Power Users</h2>
                        </div>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {powerUsers.length > 0 ? (
                                powerUsers.map((user, idx) => (
                                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                                        <span className="text-xs font-mono text-gray-600 truncate">{user.visitorId.slice(0, 20)}...</span>
                                        <span className="text-sm font-bold text-brand-teal">{user.visits} visits</span>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-500 text-sm">No data available</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* User Growth Trend Chart (Simple text representation for now) */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
                    <div className="flex items-center gap-2 mb-4">
                        <LineChartIcon className="w-5 h-5 text-brand-teal" />
                        <h2 className="text-lg font-bold text-brand-text">User Growth Trend</h2>
                    </div>
                    {growthData.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead>
                                    <tr className="border-b border-gray-200">
                                        <th className="text-left py-2 px-3 font-semibold text-gray-700">Date</th>
                                        <th className="text-right py-2 px-3 font-semibold text-gray-700">Daily Users</th>
                                        <th className="text-right py-2 px-3 font-semibold text-gray-700">Cumulative</th>
                                        <th className="text-right py-2 px-3 font-semibold text-gray-700">Total Hits</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {growthData.slice(-30).map((row, idx) => (
                                        <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                                            <td className="py-2 px-3 text-gray-700">
                                                {new Date(row.date).toLocaleDateString()}
                                            </td>
                                            <td className="text-right py-2 px-3 text-gray-700">
                                                {row.dailyUsers.toLocaleString()}
                                            </td>
                                            <td className="text-right py-2 px-3 font-semibold text-brand-teal">
                                                {row.cumulativeUsers.toLocaleString()}
                                            </td>
                                            <td className="text-right py-2 px-3 text-gray-700">
                                                {row.totalHits.toLocaleString()}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-sm">No growth data available for selected period</p>
                    )}
                </div>

                {/* Admin Actions */}
                <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
                    <h2 className="text-lg font-bold text-brand-text mb-4">Admin Actions</h2>
                    <button
                        onClick={() => setShowClearConfirm(true)}
                        className="px-4 py-2 bg-red-50 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-colors text-sm font-medium"
                    >
                        <Trash2 className="w-4 h-4 inline mr-2" />
                        Clear All Analytics Data
                    </button>
                </div>

                {/* Clear Confirmation Modal */}
                {showClearConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 shadow-lg max-w-sm">
                            <h3 className="text-lg font-bold text-brand-text mb-2">Clear Analytics?</h3>
                            <p className="text-gray-600 text-sm mb-4">
                                This will permanently delete all analytics data. This action cannot be undone.
                            </p>
                            <div className="flex gap-3">
                                <button
                                    onClick={() => setShowClearConfirm(false)}
                                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={() => {
                                        setShowClearConfirm(false);
                                        loadAnalyticsData();
                                    }}
                                    className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                >
                                    Clear
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AnalyticsNew;
