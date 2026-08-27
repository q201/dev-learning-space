import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Layers,
  Code2,
  Cpu,
  Box,
  Zap,
  ShieldCheck,
  Database,
  FileCode2,
  Network,
  Cloud,
  LayoutGrid,
  RotateCcw
} from 'lucide-react';

const iconMap = {
  Layers: Layers,
  Code2: Code2,
  Cpu: Cpu,
  Box: Box,
  Zap: Zap,
  ShieldCheck: ShieldCheck,
  Database: Database,
  FileCode2: FileCode2,
  Network: Network,
  Cloud: Cloud,
  LayoutGrid: LayoutGrid
};

export const Sidebar = () => {
  const {
    categories,
    activeCategory,
    setActiveCategory,
    questions,
    masteredIds,
    resetProgress,
    setViewMode
  } = useApp();

  const getCategoryCount = (catId) => {
    if (catId === 'all') return questions.length;
    return questions.filter((q) => q.categoryId === catId).length;
  };

  const getCategoryMasteredCount = (catId) => {
    if (catId === 'all') return masteredIds.length;
    const catQIds = questions.filter((q) => q.categoryId === catId).map((q) => q.id);
    return masteredIds.filter((id) => catQIds.includes(id)).length;
  };

  const totalMastered = masteredIds.length;
  const totalQuestions = questions.length;
  const progressPercent = Math.round((totalMastered / (totalQuestions || 1)) * 100);

  return (
    <aside className="sidebar">
      <div className="sidebar-title">Categories</div>
      <nav className="category-nav">
        {categories.map((cat) => {
          const IconComp = iconMap[cat.icon] || Layers;
          const count = getCategoryCount(cat.id);
          const masteredCount = getCategoryMasteredCount(cat.id);
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              className={`cat-item-btn ${isActive ? 'active' : ''}`}
              onClick={() => {
                setActiveCategory(cat.id);
                setViewMode('list');
              }}
            >
              <div className="cat-left">
                <IconComp size={18} />
                <span>{cat.name}</span>
              </div>
              <span className="cat-badge">
                {masteredCount}/{count}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="sidebar-progress-card">
        <div className="progress-header">
          <span>Overall Mastery</span>
          <span>{progressPercent}%</span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
        <div style={{ marginTop: '0.75rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            {totalMastered} of {totalQuestions} completed
          </span>
          <button
            onClick={resetProgress}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.75rem',
              fontWeight: 600
            }}
            title="Reset Progress"
          >
            <RotateCcw size={12} /> Reset
          </button>
        </div>
      </div>
    </aside>
  );
};
