import { motion } from 'framer-motion';
import { ExternalLink, Store, Users } from 'lucide-react';
import './Products.css';

function Products() {
  const products = [
    {
      name: 'KathaPe Customer',
      description: 'Digital ledger and transaction tracking app for customers. Manage your personal finances, track expenses, and maintain digital records with ease.',
      url: 'https://kathape.tech',
      icon: Users,
      features: [
        'Personal expense tracking',
        'Digital transaction records',
        'Easy-to-use interface',
        'Secure data storage'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'KathaPe Business',
      description: 'Comprehensive business management solution for merchants and retailers. Track inventory, manage customer ledgers, and grow your business.',
      url: 'https://business.kathape.tech',
      icon: Store,
      features: [
        'Customer ledger management',
        'Inventory tracking',
        'Transaction history',
        'Business analytics'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  return (
    <main className="products">
      <section className="products-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="page-title">Our Products</h1>
            <p className="page-subtitle">
              Innovative solutions designed to simplify your digital experience
            </p>
          </motion.div>
        </div>
      </section>

      <section className="products-grid-section">
        <div className="container">
          <div className="products-grid">
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="product-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <div className={`product-header bg-gradient-to-br ${product.color}`}>
                  <div className="product-icon">
                    <product.icon size={40} />
                  </div>
                </div>

                <div className="product-content">
                  <h2 className="product-name">{product.name}</h2>
                  <p className="product-description">{product.description}</p>

                  <div className="product-features">
                    <h3 className="features-title">Key Features</h3>
                    <ul className="features-list">
                      {product.features.map((feature, idx) => (
                        <li key={idx} className="feature-item">
                          <span className="feature-bullet"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-link"
                  >
                    Visit Website
                    <ExternalLink size={18} />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Products;
