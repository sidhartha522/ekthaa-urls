import { useState, useEffect } from 'react';
import { Lock, Eye, EyeOff } from 'lucide-react';

const AUTH_SESSION_KEY = 'ekthaa_analytics_auth';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

// Simple hash function for password comparison
// Note: For production with server-side auth, use proper bcrypt/argon2
const simpleHash = (str) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
};

const AnalyticsAuth = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing valid session on mount
    useEffect(() => {
        checkExistingSession();
    }, []);

    const checkExistingSession = () => {
        try {
            const sessionData = sessionStorage.getItem(AUTH_SESSION_KEY);
            if (sessionData) {
                const { timestamp, authenticated } = JSON.parse(sessionData);
                const now = Date.now();

                // Check if session is still valid (within 24 hours)
                if (authenticated && (now - timestamp) < SESSION_DURATION) {
                    setIsAuthenticated(true);
                } else {
                    // Session expired, clear it
                    sessionStorage.removeItem(AUTH_SESSION_KEY);
                }
            }
        } catch (error) {
            console.error('Error checking session:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleLogin = (e) => {
        e.preventDefault();
        setError('');

        // Get password from environment variable
        const correctPassword = import.meta.env.VITE_ANALYTICS_PASSWORD;

        if (!correctPassword) {
            setError('Analytics password not configured. Please set VITE_ANALYTICS_PASSWORD in .env file.');
            return;
        }

        // Compare hashed passwords
        const inputHash = simpleHash(password);
        const correctHash = simpleHash(correctPassword);

        if (inputHash === correctHash) {
            // Store authentication session
            const sessionData = {
                authenticated: true,
                timestamp: Date.now()
            };
            sessionStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(sessionData));
            setIsAuthenticated(true);
            setPassword('');
        } else {
            setError('Incorrect password. Please try again.');
            setPassword('');
        }
    };

    const handleLogout = () => {
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        setIsAuthenticated(false);
        setPassword('');
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-cream flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-teal"></div>
            </div>
        );
    }

    // If authenticated, show the protected content
    if (isAuthenticated) {
        return (
            <div>
                {children}
                {/* Logout button will be in the Analytics component */}
            </div>
        );
    }

    // Show login form
    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-cream via-white to-brand-cream flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-teal/10 rounded-full mb-4">
                            <Lock className="w-8 h-8 text-brand-teal" />
                        </div>
                        <h1 className="text-2xl font-bold text-brand-text mb-2">
                            Analytics Dashboard
                        </h1>
                        <p className="text-gray-600 text-sm">
                            Enter password to access analytics
                        </p>
                    </div>

                    {/* Login Form */}
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-brand-text mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-teal focus:border-transparent outline-none transition-all"
                                    placeholder="Enter password"
                                    required
                                    autoFocus
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-brand-teal transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff className="w-5 h-5" />
                                    ) : (
                                        <Eye className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="w-full bg-brand-teal hover:bg-brand-teal/90 text-white font-semibold py-3 px-4 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg"
                        >
                            Access Dashboard
                        </button>
                    </form>

                    {/* Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-500">
                            Protected analytics for Ekthaa website
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Export logout function for use in Analytics component
export const useAnalyticsAuth = () => {
    const logout = () => {
        sessionStorage.removeItem(AUTH_SESSION_KEY);
        window.location.reload();
    };

    return { logout };
};

export default AnalyticsAuth;
