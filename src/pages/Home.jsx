import { motion } from 'framer-motion';
import { ArrowRight, Zap, Shield, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const features = [
    {
      icon: Zap,
      title: 'Digital Credit & Payments',
      description: 'Replace paper notebooks with cloud-synced digital ledgers. Track credit, payments, and receivables in real-time with zero errors.'
    },
    {
      icon: Shield,
      title: 'Business Discovery',
      description: 'Help customers discover local shops through digital catalogues, product listings, and location-based search.'
    },
    {
      icon: Users,
      title: 'Smart Discounts & Loyalty',
      description: 'Boost customer retention with targeted offers, cashback rewards, and AI-powered promotional campaigns.'
    }
  ];

  return (
    <main className="home">
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="hero-title">
            <span className="gradient-text">Ekthaa</span> — Empowering Local Businesses
          </h1>
          <p className="hero-subtitle">
            Complete digital platform for credit management, inventory control, and customer discovery. Connecting neighborhood shops with their customers through smart technology.
          </p>
          <div className="hero-buttons">
            <Link to="/products" className="btn btn-primary">
              Explore Products
              <ArrowRight size={20} />
            </Link>
            <Link to="/careers" className="btn btn-secondary">
              Join Our Team
            </Link>
          </div>
        </motion.div>
      </section>

      <section className="features">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Why Choose Us
          </motion.h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="feature-icon">
                  <feature.icon size={32} />
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="container">
          <div className="stats-grid">
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="stat-number">100%</h3>
              <p className="stat-label">Digital Accuracy</p>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="stat-number">Real-time</h3>
              <p className="stat-label">Cloud Sync</p>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="stat-number">Zero</h3>
              <p className="stat-label">Paper Waste</p>
            </motion.div>
            <motion.div
              className="stat-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="stat-number">24/7</h3>
              <p className="stat-label">Access Anywhere</p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="how-it-works">
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h2>
          <div className="steps-grid">
            <motion.div
              className="step-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="step-number">01</div>
              <h3 className="step-title">Shop Owner Creates Account</h3>
              <p className="step-description">
                Business owners sign up for KathaPe Business and set up their digital ledger, inventory, and product catalogue.
              </p>
            </motion.div>
            <motion.div
              className="step-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="step-number">02</div>
              <h3 className="step-title">Customer Discovers & Connects</h3>
              <p className="step-description">
                Customers find local shops through KathaPe Customer app, browse products, and scan QR codes to connect.
              </p>
            </motion.div>
            <motion.div
              className="step-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="step-number">03</div>
              <h3 className="step-title">Seamless Transactions</h3>
              <p className="step-description">
                Take credit or pay back instantly via QR codes. All transactions sync in real-time with complete transparency.
              </p>
            </motion.div>
            <motion.div
              className="step-card"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <div className="step-number">04</div>
              <h3 className="step-title">Build Trust & Grow</h3>
              <p className="step-description">
                Track credit history, earn rewards, get insights, and build lasting relationships through digital transparency.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Transform Your Local Business</h2>
            <p className="cta-description">
              Join neighborhood shops and customers building trust through digital transparency
            </p>
            <Link to="/products" className="btn btn-primary btn-large">
              View Our Products
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default Home;
