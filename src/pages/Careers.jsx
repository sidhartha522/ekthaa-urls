import { motion } from 'framer-motion';
import { Briefcase, Users, TrendingUp, Heart } from 'lucide-react';
import './Careers.css';

function Careers() {
  const benefits = [
    {
      icon: Briefcase,
      title: 'Great Opportunities',
      description: 'Work on cutting-edge projects and grow your skills'
    },
    {
      icon: Users,
      title: 'Amazing Team',
      description: 'Collaborate with talented professionals'
    },
    {
      icon: TrendingUp,
      title: 'Career Growth',
      description: 'Clear paths for advancement and skill development'
    },
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible hours and remote work options'
    }
  ];

  const positions = [
    {
      title: 'Frontend Intern (React)',
      type: 'Internship',
      location: 'Remote',
      description: 'Work on modern React applications and learn from experienced developers.'
    },
    {
      title: 'Backend Intern (Python + Flask)',
      type: 'Internship',
      location: 'Remote',
      description: 'Build scalable backend services and APIs using Python and Flask.'
    },
    {
      title: 'Full Stack Intern',
      type: 'Internship',
      location: 'Remote',
      description: 'Get hands-on experience with both frontend and backend development.'
    },
    {
      title: 'UI/UX Design Intern',
      type: 'Internship',
      location: 'Remote',
      description: 'Create beautiful and intuitive user interfaces for our products.'
    }
  ];

  return (
    <main className="careers">
      <section className="careers-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="page-title">Join Our Team</h1>
            <p className="page-subtitle">
              Build your career with us and work on exciting projects that make a difference
            </p>
          </motion.div>
        </div>
      </section>

      <section className="benefits-section">
        <div className="container">
          <h2 className="section-title">Why Work With Us</h2>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="benefit-icon">
                  <benefit.icon size={28} />
                </div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="positions-section">
        <div className="container">
          <h2 className="section-title">Open Positions</h2>
          <div className="positions-grid">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                className="position-card"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="position-header">
                  <h3 className="position-title">{position.title}</h3>
                  <span className="position-type">{position.type}</span>
                </div>
                <div className="position-meta">
                  <span className="position-location">{position.location}</span>
                </div>
                <p className="position-description">{position.description}</p>
                <a
                  href="https://internships.ekthaa.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="apply-btn"
                >
                  Apply Now
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-box"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Don't see a position that fits?</h2>
            <p className="cta-text">
              We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future opportunities.
            </p>
            <a
              href="mailto:hr@ekthaa.app"
              className="btn btn-primary btn-large"
            >
              Contact Us
            </a>
          </motion.div>
        </div>
      </section>
    </main>
  );
}

export default Careers;
