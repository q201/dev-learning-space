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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Top Stat Cards */}
      <div className="stats-container">
        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Total Progress</span>
            <Award size={24} color="var(--accent-primary)" />
          </div>
          <div className="stat-val">{overallPercentage}%</div>
          <div className="progress-track">
            <div className="progress-fill" style={{ width: `${overallPercentage}%` }} />
          </div>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Mastered Questions</span>
            <CheckCircle2 size={24} color="var(--success)" />
          </div>
          <div className="stat-val" style={{ color: 'var(--success)' }}>
            {masteredCount} <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>/ {totalQuestions}</span>
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            {totalQuestions - masteredCount} questions remaining to review
          </span>
        </div>

        <div className="stat-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="stat-label">Bookmarked Stars</span>
            <Star size={24} color="var(--warning)" />
          </div>
          <div className="stat-val" style={{ color: 'var(--warning)' }}>
            {bookmarkedCount}
          </div>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Important questions saved for quick review
          </span>
        </div>
      </div>

      {/* Difficulty Breakdown */}
      <div className="stat-card">
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={18} /> Mastery by Difficulty Level
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {['Easy', 'Medium', 'Hard'].map((diff) => {
            const { total, mastered, pct } = getDifficultyStats(diff);
            return (
              <div key={diff} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '0.4rem' }}>
                  <span className={`diff-pill ${diff}`}>{diff}</span>
                  <span style={{ fontSize: '0.85rem' }}>{mastered}/{total} ({pct}%)</span>
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
        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <BookOpen size={18} /> Mastery by Category
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {categories.filter(c => c.id !== 'all').map((cat) => {
            const { catTotal, catMastered, pct } = getCategoryStats(cat.id);
            return (
              <div key={cat.id} style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', fontWeight: 600 }}>
                  <span>{cat.name}</span>
                  <span style={{ color: 'var(--text-muted)' }}>
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
