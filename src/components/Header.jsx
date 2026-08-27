import React from 'react';
import { useApp } from '../context/AppContext';
import { BookOpen, Layers, CreditCard, BarChart3, Sun, Moon, Star, CheckCircle2, Home, ChevronRight } from 'lucide-react';

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
        <div className="brand" onClick={returnToLanding} style={{ cursor: 'pointer' }}>
          <div className="brand-icon">
            <BookOpen size={22} />
          </div>
          <div className="brand-text">
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <h1>Dev Learning Space</h1>
              {activeGuideObj && (
                <>
                  <ChevronRight size={16} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--accent-primary)' }}>
                    Java Guide
                  </span>
                </>
              )}
            </div>
            <p>{activeGuideObj ? '110 Interview Questions & Flashcards' : 'Tech Interview & Knowledge Base Portal'}</p>
          </div>
        </div>

        <div className="header-actions">
          {/* Back to Home Catalog Button */}
          {selectedTopic && (
            <button
              className="btn-secondary"
              onClick={returnToLanding}
              style={{ padding: '0.45rem 0.85rem', fontSize: '0.85rem' }}
              title="Return to Landing Catalog"
            >
              <Home size={15} /> Catalog
            </button>
          )}

          {/* Progress Pill when inside a topic */}
          {selectedTopic && (
            <div className="nav-pill-group" style={{ padding: '4px 10px', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', fontWeight: 700 }}>
                <CheckCircle2 size={16} color="var(--success)" />
                <span>{masteredCount}/{totalQuestions} ({percentage}%)</span>
              </div>
              {bookmarkedCount > 0 && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.82rem', fontWeight: 700, color: 'var(--warning)', marginLeft: '8px' }}>
                  <Star size={14} fill="var(--warning)" color="var(--warning)" />
                  <span>{bookmarkedCount}</span>
                </div>
              )}
            </div>
          )}

          {/* View Modes when inside a topic */}
          {selectedTopic && (
            <div className="nav-pill-group">
              <button
                className={`nav-pill-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="List View"
              >
                <Layers size={16} />
                <span className="hide-mobile">Browse</span>
              </button>
              <button
                className={`nav-pill-btn ${viewMode === 'flashcards' ? 'active' : ''}`}
                onClick={() => setViewMode('flashcards')}
                title="Flashcards Mode"
              >
                <CreditCard size={16} />
                <span className="hide-mobile">Flashcards</span>
              </button>
              <button
                className={`nav-pill-btn ${viewMode === 'stats' ? 'active' : ''}`}
                onClick={() => setViewMode('stats')}
                title="Progress Analytics"
              >
                <BarChart3 size={16} />
                <span className="hide-mobile">Analytics</span>
              </button>
            </div>
          )}

          {/* Theme Toggle */}
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
