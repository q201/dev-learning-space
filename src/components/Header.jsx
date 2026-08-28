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
              <span>About</span>
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
