import React from 'react';
import { ShieldCheck, Lock, EyeOff, HardDrive, CheckCircle2 } from 'lucide-react';

export const PrivacyPage = () => {
  return (
    <div className="landing-container" style={{ paddingTop: '1.5rem', maxWidth: '900px' }}>
      <section className="landing-hero" style={{ padding: '2rem 1.5rem', textAlign: 'left', alignItems: 'flex-start' }}>
        <div className="hero-badge">
          <ShieldCheck size={14} /> Data Protection & Trust
        </div>
        <h1 className="hero-title" style={{ fontSize: '2.2rem' }}>Privacy Policy</h1>
        <p className="hero-subtitle" style={{ maxWidth: '100%' }}>
          Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
        </p>
      </section>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', padding: '1rem 0' }}>
        <div className="stat-card" style={{ gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <HardDrive size={22} color="var(--accent-primary)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              1. Browser-Local Data Storage
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.92rem' }}>
            Dev Learning Space is designed as a client-side offline-first application. All user state — including mastered question IDs, bookmarked questions, theme preferences, and personal study notes — is stored exclusively inside your web browser’s <code>localStorage</code>.
          </p>
        </div>

        <div className="stat-card" style={{ gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <EyeOff size={22} color="var(--success)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              2. Zero Telemetry & Third-Party Trackers
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.92rem' }}>
            We do not use tracking cookies, analytics pixels, or third-party fingerprinting scripts. Your activity on Dev Learning Space is strictly private to your own browser instance.
          </p>
        </div>

        <div className="stat-card" style={{ gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Lock size={22} color="var(--warning)" />
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              3. Data Ownership & Control
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.65', fontSize: '0.92rem' }}>
            You maintain 100% control over your data. Clearing your browser data or clicking the "Reset Progress" button instantly wipes all stored state permanently. No remote backups or server logs are maintained.
          </p>
        </div>
      </div>
    </div>
  );
};
