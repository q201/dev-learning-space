import React from 'react';
import { Award, FileText, CheckCircle2 } from 'lucide-react';

export const TermsPage = () => {
  return (
    <div className="landing-container" style={{ paddingTop: '1.5rem', maxWidth: '900px' }}>
      <section className="landing-hero" style={{ padding: '2rem 1.5rem', textAlign: 'left', alignItems: 'flex-start' }}>
        <div className="hero-badge">
          <FileText size={14} /> Open Source Terms
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.2rem' }}>Terms of Service</h1>
        <p className="hero-subtitle" style={{ maxWidth: '100%' }}>
          MIT License & Community Usage Guidelines
        </p>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0' }}>
        <div className="stat-card" style={{ gap: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            1. Open Source License (MIT)
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.92rem' }}>
            Dev Learning Space is open-source software licensed under the <strong>MIT License</strong>. You are free to use, modify, distribute, and study the codebase for personal or educational purposes.
          </p>
        </div>

        <div className="stat-card" style={{ gap: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            2. Educational Content Disclaimer
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.92rem' }}>
            All interview questions, architectural explanations, code snippets, and comparison tables provided on this platform are for educational preparation only. Trademarks and brand names belong to their respective owners.
          </p>
        </div>

        <div className="stat-card" style={{ gap: '1rem' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            3. Open Source Contributions
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.92rem' }}>
            We welcome community contributions, bug fixes, and new interview question pull requests on GitHub at <code>github.com/q201/dev-learning-space</code>.
          </p>
        </div>
      </div>
    </div>
  );
};
