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
  ChevronRight,
  Compass,
  FileText,
  ShieldCheck,
  Sparkles
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
            <BookOpen size={20} />
          </div>
          <div className="brand-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h1 style={{ fontSize: '1.2rem', fontWeight: 800 }}>Dev Learning Space</h1>
              {activeGuideObj && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ChevronRight size={15} color="var(--text-muted)" />
                  <span className="brand-guide-tag">
                    {activeGuideObj.title}
                  </span>
                </div>
              )}
            </div>
            <p className="brand-subtitle">
              {activeGuideObj
                ? `${totalQuestions} Interview Questions & Active Recall Flashcards`
                : 'Software Engineering Interview & Technical Knowledge Portal'}
            </p>
          </div>
        </div>

        {/* Header Action Navigation */}
        <div className="header-actions">
          {/* Main Top Navigation Items */}
          <nav className="header-nav-links">
            <button
              className={`header-nav-item ${currentPage === 'home' && !selectedTopic ? 'active' : ''}`}
              onClick={() => navigateTo('home')}
            >
              <Compass size={15} />
              <span>Catalog</span>
            </button>

            <button
              className={`header-nav-item ${currentPage === 'about' ? 'active' : ''}`}
              onClick={() => navigateTo('about')}
            >
              <BookOpen size={15} />
              <span>About</span>
            </button>

            <button
              className={`header-nav-item ${currentPage === 'privacy' ? 'active' : ''}`}
              onClick={() => navigateTo('privacy')}
            >
              <ShieldCheck size={15} />
              <span className="hide-mobile">Privacy</span>
            </button>

            <button
              className={`header-nav-item ${currentPage === 'terms' ? 'active' : ''}`}
              onClick={() => navigateTo('terms')}
            >
              <FileText size={15} />
              <span className="hide-mobile">Terms</span>
            </button>
          </nav>

          {/* Dynamic Topic Mastery Pill */}
          {selectedTopic && (
            <div className="topic-progress-badge" title="Topic Mastery Progress">
              <CheckCircle2 size={15} color="var(--success)" />
              <span>{masteredCount}/{totalQuestions} ({percentage}%)</span>
              {bookmarkedCount > 0 && (
                <span className="bookmark-count-pill" title={`${bookmarkedCount} Bookmarked Questions`}>
                  <Star size={13} fill="var(--warning)" color="var(--warning)" />
                  {bookmarkedCount}
                </span>
              )}
            </div>
          )}

          {/* Study Mode Switchers (Browse, Flashcards, Analytics) */}
          {selectedTopic && (
            <div className="study-mode-group">
              <button
                className={`mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="Browse Questions List"
              >
                <Layers size={15} />
                <span className="hide-mobile">Browse</span>
              </button>
              <button
                className={`mode-btn ${viewMode === 'flashcards' ? 'active' : ''}`}
                onClick={() => setViewMode('flashcards')}
                title="Active Recall Flashcards Mode"
              >
                <CreditCard size={15} />
                <span className="hide-mobile">Flashcards</span>
              </button>
              <button
                className={`mode-btn ${viewMode === 'stats' ? 'active' : ''}`}
                onClick={() => setViewMode('stats')}
                title="Mastery Progress Analytics"
              >
                <BarChart3 size={15} />
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
