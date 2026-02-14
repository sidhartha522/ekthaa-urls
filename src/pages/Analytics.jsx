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
    RefreshCw
} from 'lucide-react';
import AnalyticsAuth, { useAnalyticsAuth } from '../components/AnalyticsAuth';
import {
    getMetrics,
    getVisitHistory,
    exportData,
    clearAnalytics
} from '../services/analyticsService';

const Analytics = () => {
    const [metrics, setMetrics] = useState(null);
    const [visitHistory, setVisitHistory] = useState([]);
    const [showClearConfirm, setShowClearConfirm] = useState(false);
    const { logout } = useAnalyticsAuth();

    useEffect(() => {
        loadAnalyticsData();
    }, []);

    const loadAnalyticsData = () => {
        const metricsData = getMetrics();
        const history = getVisitHistory(100);
        setMetrics(metricsData);
        setVisitHistory(history);
    };

    const handleExport = () => {
        exportData();
    };

    const handleClear = () => {
        if (clearAnalytics()) {
            setShowClearConfirm(false);
            loadAnalyticsData();
        }
    };

    const formatDate = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const formatRelativeTime = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        const now = new Date();
        const diffMs = now - date;
        const diffMins = Math.floor(diffMs / 60000);
        const diffHours = Math.floor(diffMins / 60);
        const diffDays = Math.floor(diffHours / 24);

        if (diffMins < 1) return 'Just now';
        if (diffMins < 60) return `${diffMins}m ago`;
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return formatDate(isoString);
    };

    return (
        <AnalyticsAuth>
            <div className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-cream py-8 px-4">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold text-brand-text mb-2">
                                Analytics Dashboard
                            </h1>
                            <p className="text-gray-600">
                                Track your website traffic and user engagement
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
                                Export Data
                            </button>
                            <button
                                onClick={logout}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
                            >
                                <LogOut className="w-4 h-4" />
                                Logout
                            </button>
                        </div>
                    </div>

                    {/* Metrics Cards */}
                    {metrics && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {/* Total Visits */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <Eye className="w-6 h-6 text-blue-600" />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">Total Visits</h3>
                                <p className="text-3xl font-bold text-brand-text">{metrics.totalVisits}</p>
                            </div>

                            {/* Unique Users */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-purple-100 rounded-lg">
                                        <Users className="w-6 h-6 text-purple-600" />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">Unique Users</h3>
                                <p className="text-3xl font-bold text-brand-text">{metrics.uniqueUsers}</p>
                                <p className="text-xs text-gray-500 mt-1">This browser session</p>
                            </div>

                            {/* Returning Users */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-green-100 rounded-lg">
                                        <TrendingUp className="w-6 h-6 text-green-600" />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">Returning User</h3>
                                <p className="text-3xl font-bold text-brand-text">
                                    {metrics.returningUsers > 0 ? 'Yes' : 'No'}
                                </p>
                            </div>

                            {/* Average Visits */}
                            <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="p-3 bg-orange-100 rounded-lg">
                                        <TrendingUp className="w-6 h-6 text-orange-600" />
                                    </div>
                                </div>
                                <h3 className="text-gray-600 text-sm font-medium mb-1">Avg Visits/User</h3>
                                <p className="text-3xl font-bold text-brand-text">
                                    {metrics.averageVisitsPerUser.toFixed(1)}
                                </p>
                            </div>
                        </div>
                    )}

                    {/* Visit Timeline */}
                    {metrics && (
                        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100 mb-8">
                            <h2 className="text-xl font-bold text-brand-text mb-4">Visit Timeline</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <Calendar className="w-5 h-5 text-brand-teal" />
                                    <div>
                                        <p className="text-sm text-gray-600">First Visit</p>
                                        <p className="font-semibold text-brand-text">{formatDate(metrics.firstVisit)}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                                    <Clock className="w-5 h-5 text-brand-teal" />
                                    <div>
                                        <p className="text-sm text-gray-600">Last Visit</p>
                                        <p className="font-semibold text-brand-text">{formatDate(metrics.lastVisit)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Visit History */}
                    <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden">
                        <div className="p-6 border-b border-gray-200">
                            <h2 className="text-xl font-bold text-brand-text">Visit History</h2>
                            <p className="text-sm text-gray-600 mt-1">
                                Recent {visitHistory.length} visits
                            </p>
                        </div>

                        <div className="overflow-x-auto">
                            {visitHistory.length > 0 ? (
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Time
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                Page
                                            </th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                                                Referrer
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {visitHistory.map((visit, index) => (
                                            <tr key={index} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    <div className="flex items-center gap-2">
                                                        <Clock className="w-4 h-4 text-gray-400" />
                                                        <span>{formatRelativeTime(visit.timestamp)}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-brand-text">
                                                    <div className="flex items-center gap-2">
                                                        <Globe className="w-4 h-4 text-brand-teal" />
                                                        <span className="font-medium">{visit.path}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden md:table-cell">
                                                    {visit.referrer === 'direct' ? (
                                                        <span className="text-gray-400 italic">Direct</span>
                                                    ) : (
                                                        <span className="truncate max-w-xs block">{visit.referrer}</span>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="p-12 text-center">
                                    <Eye className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                                    <p className="text-gray-500">No visits recorded yet</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Danger Zone */}
                    <div className="mt-8 bg-red-50 rounded-xl border border-red-200 p-6">
                        <h3 className="text-lg font-bold text-red-900 mb-2">Danger Zone</h3>
                        <p className="text-sm text-red-700 mb-4">
                            Clear all analytics data. This action cannot be undone.
                        </p>
                        {!showClearConfirm ? (
                            <button
                                onClick={() => setShowClearConfirm(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                            >
                                <Trash2 className="w-4 h-4" />
                                Clear All Data
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleClear}
                                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                                >
                                    Confirm Clear
                                </button>
                                <button
                                    onClick={() => setShowClearConfirm(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm font-medium"
                                >
                                    Cancel
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </AnalyticsAuth>
    );
};

export default Analytics;
