import React from 'react';
import { useApp } from '../context/AppContext';
import { Award, CheckCircle2, Star, BookOpen, Layers } from 'lucide-react';

export const ProgressStats = () => {
  const { questions, categories, masteredIds, bookmarkIds } = useApp();

  const totalQuestions = questions.length;
  const masteredCount = masteredIds.length;
  const bookmarkedCount = bookmarkIds.length;
  const overallPercentage = Math.round((masteredCount / (totalQuestions || 1)) * 100);

  const getCategoryStats = (catId) => {
    const catQuestions = questions.filter((q) => q.categoryId === catId);
    const catTotal = catQuestions.length;
    const catMastered = masteredIds.filter((id) =>
      catQuestions.some((q) => q.id === id)
    ).length;
    const pct = Math.round((catMastered / (catTotal || 1)) * 100);
    return { catTotal, catMastered, pct };
  };

  const getDifficultyStats = (diffLevel) => {
    const diffQuestions = questions.filter((q) => q.difficulty === diffLevel);
    const total = diffQuestions.length;
    const mastered = masteredIds.filter((id) =>
      diffQuestions.some((q) => q.id === id)
    ).length;
    const pct = Math.round((mastered / (total || 1)) * 100);
    return { total, mastered, pct };
  };

  return (
    <div className="stats-view-wrapper">
      {/* Top Stat Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Total Progress</span>
            <Award size={24} color="var(--accent-primary)" />
          </div>
          <div className="stat-val">{overallPercentage}%</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${overallPercentage}%` }} />
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Mastered Questions</span>
            <CheckCircle2 size={24} color="var(--success)" />
          </div>
          <div className="stat-val" style={{ color: 'var(--success)' }}>
            {masteredCount} <span className="stat-subval">/ {totalQuestions}</span>
          </div>
          <span className="stat-hint">
            {totalQuestions - masteredCount} questions remaining to review
          </span>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Bookmarked Stars</span>
            <Star size={24} color="var(--warning)" />
          </div>
          <div className="stat-val" style={{ color: 'var(--warning)' }}>
            {bookmarkedCount}
          </div>
          <span className="stat-hint">
            Important questions saved for quick review
          </span>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="stat-card">
        <h3 className="stat-section-title">
          <Layers size={18} /> Mastery by Difficulty Level
        </h3>
        <div className="difficulty-stats-grid">
          {['Easy', 'Medium', 'Hard'].map((diff) => {
            const { total, mastered, pct } = getDifficultyStats(diff);
            return (
              <div key={diff} className="diff-stat-box">
                <div className="diff-stat-header">
                  <span className={`diff-pill ${diff}`}>{diff}</span>
                  <span className="diff-stat-pct">{mastered}/{total} ({pct}%)</span>
                </div>
                <div className="progress-track" style={{ height: '6px' }}>
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="stat-card">
        <h3 className="stat-section-title">
          <BookOpen size={18} /> Mastery by Category
        </h3>
        <div className="category-stats-list">
          {categories.filter(c => c.id !== 'all').map((cat) => {
            const { catTotal, catMastered, pct } = getCategoryStats(cat.id);
            return (
              <div key={cat.id} className="cat-stat-row">
                <div className="cat-stat-meta">
                  <span className="cat-stat-name">{cat.name}</span>
                  <span className="cat-stat-count">
                    {catMastered} / {catTotal} ({pct}%)
                  </span>
                </div>
                <div className="progress-track" style={{ height: '6px' }}>
                  <div className="progress-fill" style={{ width: `${pct}%` }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

