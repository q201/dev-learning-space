import React from 'react';
import { useApp } from '../context/AppContext';
import {
  BookOpen,
  Layers,
  CreditCard,
  BarChart3,
  Sun,
  Moon,
  Star,
  CheckCircle2,
  Home,
  ChevronRight,
  Compass
} from 'lucide-react';

export const Header = () => {
  const {
    questions,
    masteredIds,
    bookmarkIds,
    theme,
    toggleTheme,
    viewMode,
    setViewMode,
    selectedTopic,
    returnToLanding,
    navigateTo,
    currentPage,
    topicGuides
  } = useApp();

  const totalQuestions = questions.length;
  const masteredCount = masteredIds.length;
  const bookmarkedCount = bookmarkIds.length;
  const percentage = Math.round((masteredCount / (totalQuestions || 1)) * 100);

  const activeGuideObj = topicGuides.find((t) => t.id === selectedTopic);

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand Logo & Dynamic Breadcrumbs */}
        <div className="brand" onClick={returnToLanding} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <BookOpen size={22} />
          </div>
          <div className="brand-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              <h1 style={{ fontSize: '1.25rem', fontWeight: 800 }}>Dev Learning Space</h1>
              {activeGuideObj && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <ChevronRight size={16} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.9rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    {activeGuideObj.title}
                  </span>
                </div>
              )}
            </div>
            <p>
              {activeGuideObj
                ? `${totalQuestions} Interview Questions & Active Recall Flashcards`
                : 'Software Engineering Interview & Technical Knowledge Portal'}
            </p>
          </div>
        </div>

        {/* Header Action Controls */}
        <div className="header-actions">
          {/* Navigation Pill Group */}
          <div className="nav-pill-group">
            <button
              className={`nav-pill-btn ${currentPage === 'home' && !selectedTopic ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
              title="Explore All Interview Modules & Guides"
            >
              <Compass size={15} />
              <span>Catalog</span>
            </button>
            <button
              className={`nav-pill-btn ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => navigateTo('about')}
              title="About Dev Learning Space"
            >
              <BookOpen size={15} />
              <span className="hide-mobile">About</span>
            </button>
          </div>

          {/* Dynamic Topic Progress Pill */}
          {selectedTopic && (
            <div className="nav-pill-group" style={{ padding: '4px 10px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700 }}>
                <CheckCircle2 size={16} color="var(--success)" />
                <span>{masteredCount}/{totalQuestions} ({percentage}%)</span>
              </div>
              {bookmarkedCount > 0 && (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: '0.82rem',
                    fontWeight: 700,
                    color: 'var(--warning)',
                    marginLeft: '8px'
                  }}
                  title={`${bookmarkedCount} Bookmarked Questions`}
                >
                  <Star size={14} fill="var(--warning)" color="var(--warning)" />
                  <span>{bookmarkedCount}</span>
                </div>
              )}
            </div>
          )}

          {/* View Mode Switcher (Browse, Flashcards, Analytics) */}
          {selectedTopic && (
            <div className="nav-pill-group">
              <button
                className={`nav-pill-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="Browse Questions List"
              >
                <Layers size={16} />
                <span className="hide-mobile">Browse</span>
              </button>
              <button
                className={`nav-pill-btn ${viewMode === 'flashcards' ? 'active' : ''}`}
                onClick={() => setViewMode('flashcards')}
                title="Active Recall Flashcards Mode"
              >
                <CreditCard size={16} />
                <span className="hide-mobile">Flashcards</span>
              </button>
              <button
                className={`nav-pill-btn ${viewMode === 'stats' ? 'active' : ''}`}
                onClick={() => setViewMode('stats')}
                title="Mastery Progress Analytics"
              >
                <BarChart3 size={16} />
                <span className="hide-mobile">Analytics</span>
              </button>
            </div>
          )}

          {/* GitHub Repository Quick Link */}
          <a
            href="https://github.com/q201/dev-learning-space"
            target="_blank"
            rel="noreferrer"
            className="icon-btn"
            title="View Open Source Project on GitHub"
            style={{ textDecoration: 'none' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>

          {/* Theme Toggle Button */}
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
