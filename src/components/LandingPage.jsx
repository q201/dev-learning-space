import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Server,
  Layout,
  Cpu,
  ArrowRight,
  CreditCard,
  BarChart3,
  Sparkles,
  Zap,
  Star,
  CheckCircle2,
  BookOpen,
  MessageSquare,
  ShieldCheck,
  Award
} from 'lucide-react';

const iconMap = {
  Server: Server,
  Layout: Layout,
  Cpu: Cpu
};

const userReviews = [
  {
    id: 1,
    name: 'Sarah Jenkins',
    role: 'Senior Java Engineer @ TechCorp',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    review: 'The structured breakdowns for JVM memory management and ConcurrentHashMap internals are exceptional. Passed my L6 Backend interview seamlessly!'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Staff Systems Architect',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    review: 'The side-by-side comparison tables (ArrayList vs LinkedList, synchronized vs Lock) saved me hours of revision. Absolute gold standard.'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    role: 'Lead Backend Developer',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=120&h=120',
    rating: 5,
    review: 'Love the active recall Flashcard Mode! Swapping between quick revision cards and deep-dive HTML explanations made preparation super efficient.'
  }
];

export const LandingPage = () => {
  const { topicGuides, enterTopicGuide, allQuestions, questions, masteredIds } = useApp();

  const totalQuestionsList = allQuestions || questions;
  const totalQuestions = totalQuestionsList.length;
  const masteredCount = masteredIds.length;
  const progressPct = Math.round((masteredCount / (totalQuestions || 1)) * 100);

  return (
    <div className="landing-container">
      {/* Hero Banner */}
      <section className="landing-hero">
        <div className="hero-badge">
          <Sparkles size={14} /> Interactive Knowledge Base
        </div>
        <h1 className="hero-title">Developer Learning Space</h1>
        <p className="hero-subtitle">
          Master software engineering core concepts, system design, data structures, backend architecture, and technical interview preparation with interactive guides and active recall flashcards.
        </p>

        {/* Global Summary Stats */}
        <div className="hero-stats-row">
          <div className="hero-stat-item">
            <span className="stat-num">{topicGuides.length}</span>
            <span className="stat-txt">Topic Modules</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="stat-num">{totalQuestions}</span>
            <span className="stat-txt">Verified Questions</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="stat-num" style={{ color: 'var(--success)' }}>{masteredCount}</span>
            <span className="stat-txt">Mastered ({progressPct}%)</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span className="stat-num" style={{ color: 'var(--warning)' }}>4.9</span>
              <Star size={18} fill="var(--warning)" color="var(--warning)" />
            </div>
            <span className="stat-txt">User Rating</span>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="landing-guides-section">
        <div className="section-header">
          <h2>Interview & Study Modules</h2>
          <p>Pick a topic module to start your preparation journey</p>
        </div>

        <div className="guides-grid">
          {topicGuides.map((guide) => {
            const IconComp = iconMap[guide.icon] || Server;
            const isFeatured = guide.status === 'active';

            const guideQuestions = totalQuestionsList.filter((q) => q.topicId === guide.id);
            const guideTotal = guideQuestions.length || guide.questionCount || 0;
            const guideMasteredCount = masteredIds.filter((id) =>
              guideQuestions.some((q) => q.id === id)
            ).length;
            const guideProgressPct = Math.round((guideMasteredCount / (guideTotal || 1)) * 100);

            return (
              <div
                key={guide.id}
                className={`guide-card ${isFeatured ? 'featured' : 'disabled'}`}
              >
                <div className="guide-card-top">
                  <div
                    className="guide-icon-wrapper"
                    style={{ background: guide.accentColor + '20', color: guide.accentColor }}
                  >
                    <IconComp size={24} />
                  </div>
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span className="guide-badge-level">{guide.level}</span>
                    <span
                      className={`guide-badge-status ${isFeatured ? 'active' : 'upcoming'}`}
                    >
                      {guide.badge}
                    </span>
                  </div>
                </div>

                <h3 className="guide-card-title">{guide.title}</h3>
                <p className="guide-card-desc">{guide.description}</p>

                {/* Categories / Topics preview */}
                <div className="topics-chip-container">
                  {guide.topicsCovered.map((topic, idx) => (
                    <span key={idx} className="topic-chip">
                      #{topic}
                    </span>
                  ))}
                </div>

                {isFeatured ? (
                  <div className="guide-card-footer">
                    <div className="guide-progress-box">
                      <div className="guide-progress-info">
                        <span>Mastery Progress</span>
                        <span>{guideMasteredCount}/{guideTotal} ({guideProgressPct}%)</span>
                      </div>
                      <div className="progress-track" style={{ height: '6px' }}>
                        <div className="progress-fill" style={{ width: `${guideProgressPct}%` }} />
                      </div>
                    </div>

                    <div className="guide-action-buttons">
                      <button
                        className="btn-primary guide-start-btn"
                        onClick={() => enterTopicGuide(guide.id, 'list')}
                      >
                        Start Guide <ArrowRight size={16} />
                      </button>
                      <button
                        className="btn-secondary guide-icon-mode-btn"
                        onClick={() => enterTopicGuide(guide.id, 'flashcards')}
                        title="Flashcards Mode"
                      >
                        <CreditCard size={16} /> <span className="mobile-btn-text">Flashcards</span>
                      </button>
                      <button
                        className="btn-secondary guide-icon-mode-btn"
                        onClick={() => enterTopicGuide(guide.id, 'stats')}
                        title="Analytics"
                      >
                        <BarChart3 size={16} /> <span className="mobile-btn-text">Stats</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="guide-card-footer">
                    <button className="btn-secondary" disabled style={{ width: '100%', justifyContent: 'center', opacity: 0.6 }}>
                      Module Under Construction
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Platform Features Highlight */}
      <section className="features-highlight-section">
        <div className="section-header" style={{ textAlign: 'center' }}>
          <h2>Designed for Senior Engineering Interviews</h2>
          <p>Everything you need to crack complex technical rounds</p>
        </div>

        <div className="features-grid">
          <div className="feature-item-card">
            <div className="feature-icon" style={{ background: 'rgba(79, 70, 229, 0.1)', color: '#4f46e5' }}>
              <BookOpen size={22} />
            </div>
            <h4>Structured HTML Answers</h4>
            <p>Clear concept definitions, mechanism breakdowns, real-world examples, and syntax-highlighted code snippets.</p>
          </div>

          <div className="feature-item-card">
            <div className="feature-icon" style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981' }}>
              <Layout size={22} />
            </div>
            <h4>Side-by-Side Comparison Tables</h4>
            <p>Structured matrices comparing alternatives like `HashMap vs ConcurrentHashMap` or `ArrayList vs LinkedList`.</p>
          </div>

          <div className="feature-item-card">
            <div className="feature-icon" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' }}>
              <CreditCard size={22} />
            </div>
            <h4>Active Recall Flashcards</h4>
            <p>Flip cards with 3D animation to test memory retention before revealing structured solutions.</p>
          </div>

          <div className="feature-item-card">
            <div className="feature-icon" style={{ background: 'rgba(14, 165, 233, 0.1)', color: '#0ea5e9' }}>
              <BarChart3 size={22} />
            </div>
            <h4>Mastery Tracker & Personal Notes</h4>
            <p>Track your topic mastery progress percentage and save custom notes on any question.</p>
          </div>
        </div>
      </section>

      {/* Developer Reviews & Testimonials */}
      <section className="reviews-section" id="reviews">
        <div className="section-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MessageSquare size={20} color="var(--accent-primary)" />
            <h2>Developer Reviews & Success Stories</h2>
          </div>
          <p>Trusted by engineers preparing for top tech companies</p>
        </div>

        <div className="reviews-grid">
          {userReviews.map((rev) => (
            <div key={rev.id} className="review-card">
              <div className="review-rating">
                {[...Array(rev.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="var(--warning)" color="var(--warning)" />
                ))}
              </div>
              <p className="review-text">"{rev.review}"</p>
              <div className="review-user-info">
                <img src={rev.avatar} alt={rev.name} className="review-avatar" />
                <div>
                  <div className="review-user-name">{rev.name}</div>
                  <div className="review-user-role">{rev.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Study Tips / Best Practices Banner */}
      <section className="study-methodology-card">
        <div className="method-icon">
          <Zap size={24} color="var(--accent-primary)" />
        </div>
        <div>
          <h4>System Design & Troubleshooting Methodology</h4>
          <p>
            When answering scenario questions, follow the gold-standard sequence: <br />
            <strong>Reproduce → Measure → Identify Bottleneck → Change One Thing → Verify → Prevent Recurrence.</strong>
          </p>
        </div>
      </section>
    </div>
  );
};

