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
          placeholder="Search questions, keywords, syntax..."
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
        <div className="filter-group">
          <span className="filter-label">
            <Filter size={13} /> Status:
          </span>
          <div className="filter-pills">
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
        </div>

        <div className="filter-group">
          <span className="filter-label">
            Level:
          </span>
          <div className="filter-pills">
            {['all', 'Easy', 'Medium', 'Hard'].map((diff) => (
              <button
                key={diff}
                className={`filter-chip ${difficultyFilter === diff ? 'active' : ''}`}
                onClick={() => setDifficultyFilter(diff)}
              >
                {diff === 'all' ? 'All' : diff}
              </button>
            ))}
          </div>
        </div>

        <div className="results-count">
          {filteredQuestions.length} / {questions.length} items
        </div>
      </div>
    </div>
  );
};

