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
              Building innovative solutions for modern businesses
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/careers">Careers</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Our Products</h4>
            <ul className="footer-links">
              <li><a href="https://kathape.tech" target="_blank" rel="noopener noreferrer">KathaPe Customer</a></li>
              <li><a href="https://business.kathape.tech" target="_blank" rel="noopener noreferrer">KathaPe Business</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-heading">Connect</h4>
            <div className="footer-social">
              <a href="https://github.com/MadhavDGS" target="_blank" rel="noopener noreferrer" className="social-link">
                <Github size={20} />
              </a>
              <a href="https://www.linkedin.com/company/ekthaa/" target="_blank" rel="noopener noreferrer" className="social-link">
                <Linkedin size={20} />
              </a>
              <a href="mailto:contact@ekthaa.app" className="social-link">
                <Mail size={20} />
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
