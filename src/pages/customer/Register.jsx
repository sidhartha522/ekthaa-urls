/**
 * Register Page - Customer registration
 */
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import FlashMessage from '../../components/FlashMessage';
import '../../styles/AuthModern.css';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://kathape-react-business.onrender.com/api';

const Register = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [referralCode, setReferralCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [messages, setMessages] = useState([]);

    const { register } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!phone || !password) {
            setMessages([{ type: 'error', text: 'Phone number and password are required' }]);
            return;
        }

        if (!phone.match(/^\d{10}$/)) {
            setMessages([{ type: 'error', text: 'Phone number must be exactly 10 digits' }]);
            return;
        }

        setLoading(true);
        setMessages([]);

        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name || `Customer ${phone.slice(-4)}`,
                    phone,
                    password,
                    referral_code: referralCode
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Registration failed');
            }

            await register(data.user, data.token);

            setMessages([{ type: 'success', text: 'Registration successful! Welcome to Ekthaa!' }]);
            setTimeout(() => {
                navigate('/');
            }, 500);
        } catch (error) {
            setMessages([{ type: 'error', text: error.message || 'Registration failed' }]);
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

                {/* Register Card */}
                <div className="login-card-clean">
                    <div className="card-header-clean">
                        <h1>Create Your</h1>
                        <h2>Credit Book Account</h2>
                    </div>

                    <FlashMessage messages={messages} onClose={() => setMessages([])} />

                    <form onSubmit={handleSubmit}>
                        <div className="input-clean">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter your name (optional)"
                            />
                        </div>

                        <div className="input-clean">
                            <i className="fas fa-phone"></i>
                            <input
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="Enter your 10-digit mobile number"
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
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <div className="input-clean">
                            <i className="fas fa-ticket-alt"></i>
                            <input
                                type="text"
                                id="referralCode"
                                value={referralCode}
                                onChange={(e) => setReferralCode(e.target.value.toUpperCase())}
                                placeholder="Referral Code (Optional)"
                            />
                        </div>

                        <button type="submit" className="btn-submit-clean" disabled={loading}>
                            {loading ? (
                                <>
                                    <i className="fas fa-spinner fa-spin"></i> Creating Account...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-user-plus"></i> Register
                                </>
                            )}
                        </button>
                    </form>

                    <div className="signup-link">
                        <span>Already have an account?</span>
                        <button
                            onClick={() => navigate('/login')}
                            className="text-brand-teal hover:text-teal-700 font-medium underline bg-transparent border-none cursor-pointer ml-1"
                        >
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
