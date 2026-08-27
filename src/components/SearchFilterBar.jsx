import React from 'react';
import { useApp } from '../context/AppContext';
import { Search, X, CheckCircle2, Star, Filter, Sparkles } from 'lucide-react';

export const SearchFilterBar = () => {
  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    difficultyFilter,
    setDifficultyFilter,
    filteredQuestions,
    questions
  } = useApp();

  return (
    <div className="filter-bar-card">
      <div className="search-input-wrapper">
        <Search size={18} className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder="Search questions, keywords, syntax, concepts..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button
            className="clear-search-btn"
            onClick={() => setSearchQuery('')}
            title="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      <div className="filter-row">
        <div className="filter-pills">
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px', marginRight: '4px' }}>
            <Filter size={14} /> Status:
          </span>
          <button
            className={`filter-chip ${statusFilter === 'all' ? 'active' : ''}`}
            onClick={() => setStatusFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-chip ${statusFilter === 'mastered' ? 'active' : ''}`}
            onClick={() => setStatusFilter('mastered')}
          >
            <CheckCircle2 size={13} /> Mastered
          </button>
          <button
            className={`filter-chip ${statusFilter === 'learning' ? 'active' : ''}`}
            onClick={() => setStatusFilter('learning')}
          >
            <Sparkles size={13} /> Learning
          </button>
          <button
            className={`filter-chip ${statusFilter === 'bookmarked' ? 'active' : ''}`}
            onClick={() => setStatusFilter('bookmarked')}
          >
            <Star size={13} /> Starred
          </button>
        </div>

        <div className="filter-pills">
          <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', marginRight: '4px' }}>
            Level:
          </span>
          {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
            <button
              key={diff}
              className={`filter-chip ${difficultyFilter === diff ? 'active' : ''}`}
              onClick={() => setDifficultyFilter(diff)}
            >
              {diff === 'all' ? 'All Levels' : diff}
            </button>
          ))}
        </div>

        <div className="results-count">
          Showing {filteredQuestions.length} of {questions.length} items
        </div>
      </div>
    </div>
  );
};
