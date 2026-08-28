import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Star,
  ArrowUp,
  Mail,
  Check,
  ShieldCheck,
  Zap,
  Award,
  Users,
  Code2
} from 'lucide-react';

export const Footer = () => {
  const { returnToLanding, enterTopicGuide, navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="app-footer">
      {/* Top Banner Stats Counter */}
      <div className="footer-stats-banner">
        <div className="footer-stats-inner">
          <div className="footer-stat-box">
            <div className="stat-icon-wrapper">
              <Code2 size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">110+</span>
              <span className="stat-label">Interview Questions</span>
            </div>
          </div>

          <div className="footer-stat-box">
            <div className="stat-icon-wrapper">
              <Award size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">12 Domains</span>
              <span className="stat-label">Engineering & System Design</span>
            </div>
          </div>

          <div className="footer-stat-box">
            <div className="stat-icon-wrapper">
              <Users size={24} />
            </div>
            <div className="stat-info">
              <span className="stat-number">10,000+</span>
              <span className="stat-label">Active Developers</span>
            </div>
          </div>

          <div className="footer-stat-box">
            <div className="stat-icon-wrapper star-color">
              <Star size={24} fill="var(--warning)" />
            </div>
            <div className="stat-info">
              <span className="stat-number">4.9 / 5.0</span>
              <span className="stat-label">User Satisfaction Rating</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Newsletter */}
      <div className="footer-main">
        <div className="footer-grid">
          {/* Brand Info */}
          <div className="footer-brand-col">
            <div className="brand" onClick={returnToLanding} style={{ cursor: 'pointer', marginBottom: '1rem' }}>
              <div className="brand-icon">
                <BookOpen size={22} />
              </div>
              <div className="brand-text">
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Dev Learning Space
                </h3>
              </div>
            </div>
            <p className="footer-brand-desc">
              An open-source interactive technical knowledge portal for software engineers to master core computer science concepts, system design, multithreaded concurrency, backend architecture, and technical interview preparation.
            </p>
            <div className="footer-trust-badges">
              <span className="trust-badge"><ShieldCheck size={14} /> 100% Free & Open Source</span>
              <span className="trust-badge"><Zap size={14} /> Active Recall Flashcards</span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="footer-links-col">
            <h4>Quick Links</h4>
            <ul>
              <li><button onClick={() => navigateTo('home')}>Catalog & Guides</button></li>
              <li><button onClick={() => navigateTo('about')}>About Platform</button></li>
              <li><button onClick={() => navigateTo('privacy')}>Privacy Policy</button></li>
              <li><button onClick={() => navigateTo('terms')}>Terms of Service</button></li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div className="footer-links-col">
            <h4>Popular Domains</h4>
            <ul>
              <li><button onClick={() => enterTopicGuide('java-backend')}>Core Language & OOP</button></li>
              <li><button onClick={() => enterTopicGuide('java-backend')}>Concurrency & Parallelism</button></li>
              <li><button onClick={() => enterTopicGuide('java-backend')}>Spring Boot & REST APIs</button></li>
              <li><button onClick={() => enterTopicGuide('java-backend')}>Security & Auth Protocols</button></li>
              <li><button onClick={() => enterTopicGuide('java-backend')}>SQL & Database Indexing</button></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="footer-newsletter-col">
            <h4>Stay Updated</h4>
            <p>Get weekly software engineering interview breakdowns, deep-dive system design cheatsheets, and new question updates.</p>
            <form onSubmit={handleSubscribe} className="newsletter-form">
              <div className="input-group">
                <Mail size={16} className="mail-icon" />
                <input
                  type="email"
                  placeholder="Enter your developer email..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="newsletter-btn">
                {subscribed ? <><Check size={16} /> Subscribed!</> : 'Subscribe'}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p>© {new Date().getFullYear()} Dev Learning Space. Open source project under MIT License.</p>
          
          <div className="footer-bottom-actions">
            <button onClick={scrollToTop} className="scroll-top-btn" title="Back to Top">
              <ArrowUp size={16} />
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
