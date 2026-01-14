/**
 * Login Page - Customer login
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FlashMessage from '../../components/FlashMessage';
import '../../styles/AuthModern.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Login = () => {
    const navigate = useNavigate();
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const { login } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phone || !password) {
            setMessages([{ type: 'error', text: 'Please enter both phone number and password' }]);
            return;
        }

        setLoading(true);
        setMessages([]);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phone, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Login failed');
            }

            await login(data.user, data.token);

            setMessages([{ type: 'success', text: 'Successfully logged in!' }]);
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (error) {
            setMessages([{ type: 'error', text: error.message || 'Login failed' }]);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-ios">
            <div className="login-wrapper">
                {/* Logo */}
                <div className="illustration-borderless">
                    <div className="logo-fallback">
                        <i className="fas fa-handshake"></i>
                    </div>
                </div>

                {/* Login Card */}
                <div className="login-card-clean">
                    <div className="card-header-clean">
                        <h1>Login to Access Your</h1>
                        <h2>Credit Book</h2>
                    </div>

                    <FlashMessage messages={messages} onClose={() => setMessages([])} />

                    <form onSubmit={handleSubmit}>
                        <div className="input-clean">
                            <i className="fas fa-phone"></i>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your mobile number"
                                required
                            />
                        </div>

                        <div className="input-clean">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button type="submit" className="btn-login-clean" disabled={loading}>
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Logging in...
                                </>
                            ) : (
                                <>Login</>
                            )}
                        </button>

                        <div className="divider-clean">
                            <span>Or login as</span>
                        </div>

                        <a href="https://business.khatape.tech" className="btn-customer-clean">
                            <i className="fas fa-store"></i> Business Owner
                        </a>
                    </form>

                    <div className="signup-link">
                        <span>Don't have an account?</span>
                        <button
                            onClick={() => navigate('/register')}
                            className="text-brand-teal hover:text-teal-700 font-medium underline bg-transparent border-none cursor-pointer ml-1"
                        >
                            Create an account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
