import { Github, Linkedin, Mail } from 'lucide-react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-title">Ekthaa</h3>
            <p className="footer-description">
              Empowering neighborhood businesses with digital credit, inventory management, and customer discovery.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Our Products</h4>
            <ul className="footer-links">
              <li><a href="https://khatape.tech" target="_blank" rel="noopener noreferrer">KathaPe Customer</a></li>
              <li><a href="https://business.khatape.tech" target="_blank" rel="noopener noreferrer">KathaPe Business</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Legal</h4>
            <ul className="footer-links">
              <li><a href="/terms">Terms & Conditions</a></li>
              <li><a href="/privacy">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <ul className="footer-links">
              <li><a href="mailto:founder@ekthaa.app">founder@ekthaa.app</a></li>
              <li><a href="mailto:support@ekthaa.app">support@ekthaa.app</a></li>
              <li><a href="mailto:hr@ekthaa.app">hr@ekthaa.app</a></li>
            </ul>
            <div className="footer-social">
              <a href="https://github.com/MadhavDGS" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/company/ekthaa/" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} Ekthaa. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
