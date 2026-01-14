import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/explore', label: 'Explore' },
    { path: '/products', label: 'Products' },
    { path: '/about', label: 'About' },
    { path: '/careers', label: 'Careers' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <span className="logo-text">Ekthaa</span>
        </Link>

        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </Link>
          ))}

          {/* Auth buttons */}
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="nav-link"
                onClick={() => setIsOpen(false)}
              >
                <i className="fas fa-user mr-1"></i>
                {user?.name || 'Profile'}
              </Link>
              <button
                onClick={handleLogout}
                className="nav-link nav-button logout-btn"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="nav-link nav-button login-btn"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}
        </div>

        <button className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
