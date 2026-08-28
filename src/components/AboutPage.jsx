import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Code2,
  ShieldCheck,
  Zap,
  Award,
  Users,
  Target,
  Terminal,
  Cpu,
  ArrowRight,
  GitBranch
} from 'lucide-react';

export const AboutPage = () => {
  const { enterTopicGuide, navigateTo } = useApp();

  return (
    <div className="landing-container" style={{ paddingTop: '1.5rem' }}>
      {/* About Hero Section */}
      <section className="landing-hero" style={{ padding: '2.5rem 1.5rem' }}>
        <div className="hero-badge">
          <BookOpen size={14} /> Our Mission & Vision
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.4rem' }}>
          Empowering Software Engineers to Crack Technical Interviews
        </h1>
        <p className="hero-subtitle">
          Dev Learning Space is a community-driven, open-source technical knowledge portal created to bridge the gap between theoretical computer science and high-stakes engineering interviews.
        </p>
      </section>

      {/* Core Principles Grid */}
      <section className="features-highlight-section">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2>Engineering Principles</h2>
          <p>Why thousands of developers trust our study guides</p>
        </div>

        <div className="features-grid">
          <div className="feature-item-card">
            <div className="feature-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5' }}>
              <Target size={22} />
            </div>
            <h4>Depth Over Superficiality</h4>
            <p>
              We reject one-liner answers. Every question is answered with concept definitions, exact execution mechanisms, performance trade-offs, and production code snippets.
            </p>
          </div>

          <div className="feature-item-card">
            <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Zap size={22} />
            </div>
            <h4>Active Recall & Spaced Repetition</h4>
            <p>
              Passive reading creates an illusion of competence. Our 3D active-recall flashcard system forces memory retrieval to solidify long-term comprehension.
            </p>
          </div>

          <div className="feature-item-card">
            <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <ShieldCheck size={22} />
            </div>
            <h4>100% Privacy & Offline-First</h4>
            <p>
              Your study notes and mastery progress remain strictly in your browser's local storage. Zero third-party trackers, zero login walls.
            </p>
          </div>

          <div className="feature-item-card">
            <div className="feature-icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9' }}>
              <Terminal size={22} />
            </div>
            <h4>Production-Proven Patterns</h4>
            <p>
              Curated by senior engineers and tech leads who have conducted hundreds of interviews at top tech companies.
            </p>
          </div>
        </div>
      </section>

      {/* Architecture & Tech Stack */}
      <section className="study-methodology-card" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '1.25rem', padding: '2rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Cpu size={24} color="var(--accent-primary)" />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            Technology & Open-Source Stack
          </h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.95rem' }}>
          Dev Learning Space is built using modern web standards for lightning-fast responsiveness and zero runtime overhead:
        </p>

        <div className="topics-chip-container" style={{ gap: '0.75rem' }}>
          <span className="topic-chip" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>React 19</span>
          <span className="topic-chip" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>Vite 8</span>
          <span className="topic-chip" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>Vanilla CSS Tokens</span>
          <span className="topic-chip" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>Lucide Icons</span>
          <span className="topic-chip" style={{ fontSize: '0.82rem', padding: '6px 12px' }}>GitHub Actions CI/CD</span>
        </div>
      </section>

      {/* Call to Action */}
      <section style={{ textAlign: 'center', padding: '2rem 1rem' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
          Ready to Start Preparing?
        </h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
          Dive into our comprehensive interview preparation modules today.
        </p>
        <button
          className="btn-primary"
          onClick={() => navigateTo('home')}
          style={{ padding: '0.75rem 1.75rem', fontSize: '0.95rem', margin: '0 auto' }}
        >
          Explore All Modules <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
};
