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
  Code2,
  CheckCircle2
} from 'lucide-react';

export const Footer = () => {
  const { returnToLanding, selectedTopic, enterTopicGuide, questions, masteredIds } = useApp();
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
              <span className="stat-label">Java, Spring & System Design</span>
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
              An open-source interactive learning platform crafted for software engineers to master Java core concepts, Spring Boot microservices, multithreading, and system design interviews.
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
              <li><button onClick={returnToLanding}>Catalog & Guides</button></li>
              <li><button onClick={() => enterTopicGuide('java-interview-guide')}>Java Interview Guide</button></li>
              <li><a href="https://github.com/q201/dev-learning-space" target="_blank" rel="noreferrer">GitHub Repository</a></li>
              <li><a href="#reviews">User Testimonials</a></li>
            </ul>
          </div>

          {/* Categories Quick Links */}
          <div className="footer-links-col">
            <h4>Popular Topics</h4>
            <ul>
              <li><button onClick={() => enterTopicGuide('java-interview-guide')}>Core Language & OOP</button></li>
              <li><button onClick={() => enterTopicGuide('java-interview-guide')}>Concurrency & JVM</button></li>
              <li><button onClick={() => enterTopicGuide('java-interview-guide')}>Spring Boot & REST APIs</button></li>
              <li><button onClick={() => enterTopicGuide('java-interview-guide')}>Security & JWT Auth</button></li>
              <li><button onClick={() => enterTopicGuide('java-interview-guide')}>SQL & Database Indexing</button></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="footer-newsletter-col">
            <h4>Stay Updated</h4>
            <p>Get weekly Java interview breakdowns, deep-dive cheatsheets, and new question updates.</p>
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
            <a
              href="https://github.com/q201/dev-learning-space"
              target="_blank"
              rel="noreferrer"
              className="footer-github-link"
              title="View on GitHub"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
              <span>github.com/q201/dev-learning-space</span>
            </a>

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
