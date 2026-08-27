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
  Zap
} from 'lucide-react';

const iconMap = {
  Server: Server,
  Layout: Layout,
  Cpu: Cpu
};

export const LandingPage = () => {
  const { topicGuides, enterTopicGuide, questions, masteredIds } = useApp();

  const totalQuestions = questions.length;
  const masteredCount = masteredIds.length;
  const progressPct = Math.round((masteredCount / (totalQuestions || 1)) * 100);

  return (
    <div className="landing-container">
      {/* Hero Banner */}
      <section className="landing-hero">
        <div className="hero-badge">
          <Sparkles size={14} /> Interactive Knowledge Portal
        </div>
        <h1 className="hero-title">Developer Learning Space</h1>
        <p className="hero-subtitle">
          Select a topic guide below to practice questions, flip study flashcards, and track your interview readiness.
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
            <span className="stat-txt">Active Questions</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="stat-num" style={{ color: 'var(--success)' }}>{masteredCount}</span>
            <span className="stat-txt">Mastered ({progressPct}%)</span>
          </div>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="landing-guides-section">
        <div className="section-header">
          <h2>Interview & Study Modules</h2>
          <p>Pick a topic to start your preparation journey</p>
        </div>

        <div className="guides-grid">
          {topicGuides.map((guide) => {
            const IconComp = iconMap[guide.icon] || Server;
            const isFeatured = guide.status === 'active';

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
                  <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
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
                        <span>{masteredCount}/{totalQuestions} ({progressPct}%)</span>
                      </div>
                      <div className="progress-track" style={{ height: '6px' }}>
                        <div className="progress-fill" style={{ width: `${progressPct}%` }} />
                      </div>
                    </div>

                    <div className="guide-action-buttons">
                      <button
                        className="btn-primary"
                        style={{ flex: 1, justifyContent: 'center' }}
                        onClick={() => enterTopicGuide(guide.id, 'list')}
                      >
                        Start Study Guide <ArrowRight size={16} />
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => enterTopicGuide(guide.id, 'flashcards')}
                        title="Flashcards Mode"
                      >
                        <CreditCard size={16} /> Flashcards
                      </button>
                      <button
                        className="btn-secondary"
                        onClick={() => enterTopicGuide(guide.id, 'stats')}
                        title="Analytics"
                      >
                        <BarChart3 size={16} />
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
