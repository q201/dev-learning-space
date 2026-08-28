import React, { useState } from 'react';
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
  RotateCcw,
  ChevronDown,
  ChevronUp
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

  const [mobileExpanded, setMobileExpanded] = useState(false);

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

  const activeCategoryObj = categories.find((c) => c.id === activeCategory);

  return (
    <aside className="sidebar">
      {/* Mobile-Only Horizontal Scroll & Category Selector Header */}
      <div className="mobile-sidebar-header">
        <button
          className="mobile-category-toggle-btn"
          onClick={() => setMobileExpanded(!mobileExpanded)}
        >
          <div className="mobile-toggle-left">
            <Layers size={16} color="var(--accent-primary)" />
            <span>Category: <strong>{activeCategoryObj ? activeCategoryObj.name : 'All Questions'}</strong></span>
          </div>
          {mobileExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {/* Horizontal Category Chips Bar for Quick Mobile Swipe */}
        <div className="mobile-cat-chips-bar">
          {categories.map((cat) => {
            const IconComp = iconMap[cat.icon] || Layers;
            const count = getCategoryCount(cat.id);
            const masteredCount = getCategoryMasteredCount(cat.id);
            const isActive = activeCategory === cat.id;

            return (
              <button
                key={cat.id}
                className={`mobile-cat-chip ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setViewMode('list');
                }}
              >
                <IconComp size={14} />
                <span>{cat.name}</span>
                <span className="chip-badge">{masteredCount}/{count}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Categories Navigation (Always visible on desktop, toggleable on mobile when expanded) */}
      <div className={`sidebar-collapsible-wrapper ${mobileExpanded ? 'mobile-show' : ''}`}>
        <div className="sidebar-title">Categories Navigation</div>
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
                  setMobileExpanded(false);
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
      </div>
    </aside>
  );
};

