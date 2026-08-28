import React, { useState } from 'react';
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
  ArrowLeft,
  Menu,
  X
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

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const totalQuestions = questions.length;
  const masteredCount = masteredIds.length;
  const bookmarkedCount = bookmarkIds.length;
  const percentage = Math.round((masteredCount / (totalQuestions || 1)) * 100);

  const activeGuideObj = topicGuides.find((t) => t.id === selectedTopic);

  // Shorten title for header badge inside guides
  const guideBadgeTitle = activeGuideObj
    ? activeGuideObj.title.replace('Preparation Guide', 'Guide').replace('Interview Hub', 'Hub')
    : '';

  const handleNavClick = (action) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="app-header">
      <div className="header-inner">
        {/* Brand Logo & Dynamic Breadcrumbs */}
        <div className="brand" onClick={() => handleNavClick(returnToLanding)} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <BookOpen size={20} />
          </div>
          <div className="brand-text">
            <div className="brand-title-row">
              <h1 className="brand-h1">Dev Learning Space</h1>
              {selectedTopic && activeGuideObj && (
                <div className="brand-guide-badge-wrapper">
                  <ChevronRight size={14} color="var(--text-muted)" className="brand-chevron" />
                  <span className="brand-guide-tag">
                    {guideBadgeTitle}
                  </span>
                </div>
              )}
            </div>
            <p className="brand-subtitle">
              {selectedTopic
                ? `${totalQuestions} Questions & Active Recall`
                : 'Software Engineering Interview & Technical Portal'}
            </p>
          </div>
        </div>

        {/* Desktop Header Actions */}
        <div className="header-actions">
          {/* Main Top Navigation (Only on non-topic pages) */}
          {!selectedTopic && (
            <nav className="header-nav-links desktop-only-nav">
              <button
                className={`header-nav-item ${currentPage === 'home' ? 'active' : ''}`}
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
                <span>Privacy</span>
              </button>

              <button
                className={`header-nav-item ${currentPage === 'terms' ? 'active' : ''}`}
                onClick={() => navigateTo('terms')}
              >
                <FileText size={15} />
                <span>Terms</span>
              </button>
            </nav>
          )}

          {/* Guide Mode Actions (When inside a topic guide) */}
          {selectedTopic && (
            <>
              {/* Return to Catalog Button */}
              <button
                className="header-nav-item desktop-only-nav"
                onClick={returnToLanding}
                style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--border-color)' }}
                title="Return to Catalog"
              >
                <ArrowLeft size={15} />
                <span>Catalog</span>
              </button>

              {/* Study Mode Switchers (Browse, Flashcards, Analytics) */}
              <div className="study-mode-group desktop-only-nav">
                <button
                  className={`mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => setViewMode('list')}
                  title="Browse Questions List"
                >
                  <Layers size={15} />
                  <span>Browse</span>
                </button>
                <button
                  className={`mode-btn ${viewMode === 'flashcards' ? 'active' : ''}`}
                  onClick={() => setViewMode('flashcards')}
                  title="Active Recall Flashcards Mode"
                >
                  <CreditCard size={15} />
                  <span>Flashcards</span>
                </button>
                <button
                  className={`mode-btn ${viewMode === 'stats' ? 'active' : ''}`}
                  onClick={() => setViewMode('stats')}
                  title="Mastery Progress Analytics"
                >
                  <BarChart3 size={15} />
                  <span>Analytics</span>
                </button>
              </div>

              {/* Dynamic Topic Mastery Pill */}
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
            </>
          )}

          {/* Theme Toggle Button */}
          <button
            className="icon-btn"
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Toggle Navigation Menu"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-down Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          {selectedTopic && (
            <div className="mobile-drawer-section">
              <div className="mobile-drawer-label">Study View Mode</div>
              <div className="mobile-mode-switcher">
                <button
                  className={`mobile-mode-btn ${viewMode === 'list' ? 'active' : ''}`}
                  onClick={() => handleNavClick(() => setViewMode('list'))}
                >
                  <Layers size={16} />
                  <span>Browse Questions</span>
                </button>
                <button
                  className={`mobile-mode-btn ${viewMode === 'flashcards' ? 'active' : ''}`}
                  onClick={() => handleNavClick(() => setViewMode('flashcards'))}
                >
                  <CreditCard size={16} />
                  <span>Flashcards</span>
                </button>
                <button
                  className={`mobile-mode-btn ${viewMode === 'stats' ? 'active' : ''}`}
                  onClick={() => handleNavClick(() => setViewMode('stats'))}
                >
                  <BarChart3 size={16} />
                  <span>Analytics</span>
                </button>
              </div>

              <button
                className="mobile-drawer-action-btn"
                onClick={() => handleNavClick(returnToLanding)}
              >
                <ArrowLeft size={16} />
                <span>Return to Modules Catalog</span>
              </button>
            </div>
          )}

          <div className="mobile-drawer-section">
            <div className="mobile-drawer-label">Pages Navigation</div>
            <div className="mobile-nav-grid">
              <button
                className={`mobile-nav-link ${currentPage === 'home' ? 'active' : ''}`}
                onClick={() => handleNavClick(() => navigateTo('home'))}
              >
                <Compass size={16} />
                <span>Catalog & Guides</span>
              </button>
              <button
                className={`mobile-nav-link ${currentPage === 'about' ? 'active' : ''}`}
                onClick={() => handleNavClick(() => navigateTo('about'))}
              >
                <BookOpen size={16} />
                <span>About Platform</span>
              </button>
              <button
                className={`mobile-nav-link ${currentPage === 'privacy' ? 'active' : ''}`}
                onClick={() => handleNavClick(() => navigateTo('privacy'))}
              >
                <ShieldCheck size={16} />
                <span>Privacy Policy</span>
              </button>
              <button
                className={`mobile-nav-link ${currentPage === 'terms' ? 'active' : ''}`}
                onClick={() => handleNavClick(() => navigateTo('terms'))}
              >
                <FileText size={16} />
                <span>Terms of Service</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

