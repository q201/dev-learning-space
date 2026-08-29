import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Globe,
  Building2,
  ExternalLink,
  Search,
  X,
  Filter,
  Plus,
  CheckCircle2,
  Clock,
  Code2,
  FileEdit,
  ChevronDown,
  ChevronUp,
  Trash2,
  Sparkles,
  BookmarkCheck,
  Send,
  Calendar
} from 'lucide-react';

export const JobsPage = () => {
  const {
    allCompanies,
    jobStatuses,
    updateJobStatus,
    updateJobNotes,
    addCustomCompany,
    deleteCustomCompany
  } = useApp();

  const [categoryFilter, setCategoryFilter] = useState('all'); // all, Remote, Hybrid
  const [statusFilter, setStatusFilter] = useState('all'); // all, Not Applied, Applied, Interviewing, Offer, Saved
  const [techFilter, setTechFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [activeNotesCompanyId, setActiveNotesCompanyId] = useState(null);

  // Form State for Add Custom Company
  const [newCompany, setNewCompany] = useState({
    name: '',
    category: 'Remote',
    careersUrl: '',
    location: '',
    domain: '',
    techStack: '',
    description: ''
  });

  // Extract all unique tech stack tags across all companies for filter options
  const allTechTags = Array.from(
    new Set(allCompanies.flatMap((c) => c.techStack || []))
  ).sort();

  // Summary counts
  const totalCount = allCompanies.length;
  const remoteCount = allCompanies.filter((c) => c.category === 'Remote').length;
  const hybridCount = allCompanies.filter((c) => c.category === 'Hybrid').length;
  
  const appliedCount = Object.values(jobStatuses).filter(
    (s) => s.status === 'Applied' || s.status === 'Interviewing' || s.status === 'Offer'
  ).length;

  const interviewingCount = Object.values(jobStatuses).filter(
    (s) => s.status === 'Interviewing'
  ).length;

  // Filter Logic
  const filteredCompanies = allCompanies.filter((company) => {
    // Category match
    if (categoryFilter !== 'all' && company.category !== categoryFilter) {
      return false;
    }

    // Status match
    const currentStatus = jobStatuses[company.id]?.status || 'Not Applied';
    if (statusFilter !== 'all' && currentStatus !== statusFilter) {
      return false;
    }

    // Tech Stack match
    if (techFilter !== 'all') {
      if (!company.techStack || !company.techStack.includes(techFilter)) {
        return false;
      }
    }

    // Search query match
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = company.name.toLowerCase().includes(q);
      const matchDomain = company.domain && company.domain.toLowerCase().includes(q);
      const matchLocation = company.location && company.location.toLowerCase().includes(q);
      const matchTech = company.techStack && company.techStack.some((t) => t.toLowerCase().includes(q));
      if (!matchName && !matchDomain && !matchLocation && !matchTech) return false;
    }

    return true;
  });

  const handleAddCompanySubmit = (e) => {
    e.preventDefault();
    if (!newCompany.name || !newCompany.careersUrl) return;

    const techArray = newCompany.techStack
      ? newCompany.techStack.split(',').map((t) => t.trim()).filter(Boolean)
      : ['General Software Engineering'];

    addCustomCompany({
      name: newCompany.name,
      category: newCompany.category,
      careersUrl: newCompany.careersUrl.startsWith('http') ? newCompany.careersUrl : `https://${newCompany.careersUrl}`,
      location: newCompany.location || (newCompany.category === 'Remote' ? '100% Remote' : 'Hybrid'),
      domain: newCompany.domain || 'Tech / Software',
      techStack: techArray,
      description: newCompany.description || 'Custom target company for career application.'
    });

    setNewCompany({
      name: '',
      category: 'Remote',
      careersUrl: '',
      location: '',
      domain: '',
      techStack: '',
      description: ''
    });
    setShowAddModal(false);
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'Applied':
        return { bg: 'var(--info-bg)', color: 'var(--info)', label: 'Applied' };
      case 'Interviewing':
        return { bg: 'var(--warning-bg)', color: 'var(--warning)', label: 'Interviewing' };
      case 'Offer':
        return { bg: 'var(--success-bg)', color: 'var(--success)', label: 'Offer Received 🎉' };
      case 'Rejected':
        return { bg: 'var(--danger-bg)', color: 'var(--danger)', label: 'Not Selected' };
      case 'Saved':
        return { bg: 'var(--accent-light)', color: 'var(--accent-primary)', label: 'Saved for Later' };
      default:
        return { bg: 'var(--bg-tertiary)', color: 'var(--text-muted)', label: 'Not Applied' };
    }
  };

  return (
    <div className="landing-container" style={{ paddingTop: '1.5rem' }}>
      {/* Hero Banner */}
      <section className="landing-hero" style={{ padding: '2.5rem 1.5rem' }}>
        <div className="hero-badge">
          <Briefcase size={14} /> Career & Jobs Application Hub
        </div>
        <h1 className="hero-title" style={{ fontSize: 'clamp(1.8rem, 5vw, 2.5rem)' }}>
          Tech Company Career Portals & Tracker
        </h1>
        <p className="hero-subtitle">
          Explore curated top engineering companies hiring developers. Filter by <strong>Strictly Remote</strong> vs <strong>Hybrid</strong> work models, check required tech stacks, visit direct career portals, and track your application milestones periodically.
        </p>

        {/* Global Summary Stats */}
        <div className="hero-stats-row" style={{ width: '100%', maxWidth: '1000px' }}>
          <div className="hero-stat-item">
            <span className="stat-num">{totalCount}</span>
            <span className="stat-txt">Target Companies</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="stat-num" style={{ color: '#10b981' }}>{remoteCount}</span>
            <span className="stat-txt">Strictly Remote</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="stat-num" style={{ color: '#3b82f6' }}>{hybridCount}</span>
            <span className="stat-txt">Mixed / Hybrid</span>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat-item">
            <span className="stat-num" style={{ color: 'var(--accent-primary)' }}>{appliedCount}</span>
            <span className="stat-txt">Applications Tracked</span>
          </div>
          {interviewingCount > 0 && (
            <>
              <div className="hero-stat-divider" />
              <div className="hero-stat-item">
                <span className="stat-num" style={{ color: 'var(--warning)' }}>{interviewingCount}</span>
                <span className="stat-txt">Active Interviews</span>
              </div>
            </>
          )}
        </div>
      </section>

      {/* Filter & Action Bar */}
      <div className="filter-bar-card">
        {/* Search Input & Add Custom Button */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-input-wrapper" style={{ flex: 1, minWidth: '260px' }}>
            <Search size={18} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search companies, tech stack (Java, Go, AWS...), domain..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                <X size={16} />
              </button>
            )}
          </div>

          <button
            className="btn-primary"
            onClick={() => setShowAddModal(true)}
            style={{ padding: '0.7rem 1.25rem', whiteSpace: 'nowrap' }}
          >
            <Plus size={18} /> Add Custom Company
          </button>
        </div>

        {/* Category Tabs & Status Filters */}
        <div className="filter-row" style={{ marginTop: '0.5rem' }}>
          {/* Category Tabs: All, Strictly Remote, Hybrid */}
          <div className="filter-group">
            <span className="filter-label">Category:</span>
            <div className="filter-pills">
              <button
                className={`filter-chip ${categoryFilter === 'all' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('all')}
              >
                All Companies ({totalCount})
              </button>
              <button
                className={`filter-chip ${categoryFilter === 'Remote' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('Remote')}
                style={{ background: categoryFilter === 'Remote' ? '#10b981' : undefined }}
              >
                <Globe size={13} /> Strictly Remote ({remoteCount})
              </button>
              <button
                className={`filter-chip ${categoryFilter === 'Hybrid' ? 'active' : ''}`}
                onClick={() => setCategoryFilter('Hybrid')}
                style={{ background: categoryFilter === 'Hybrid' ? '#3b82f6' : undefined }}
              >
                <Building2 size={13} /> Mixed / Hybrid ({hybridCount})
              </button>
            </div>
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <span className="filter-label">Status:</span>
            <div className="filter-pills">
              {['all', 'Not Applied', 'Applied', 'Interviewing', 'Offer', 'Saved'].map((status) => (
                <button
                  key={status}
                  className={`filter-chip ${statusFilter === status ? 'active' : ''}`}
                  onClick={() => setStatusFilter(status)}
                >
                  {status === 'all' ? 'All Statuses' : status}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Stack Filter Dropdown */}
          <div className="filter-group">
            <span className="filter-label"><Code2 size={13} /> Tech Stack:</span>
            <select
              value={techFilter}
              onChange={(e) => setTechFilter(e.target.value)}
              style={{
                padding: '0.4rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-primary)',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Tech Stacks</option>
              {allTechTags.map((tech) => (
                <option key={tech} value={tech}>
                  {tech}
                </option>
              ))}
            </select>
          </div>

          <div className="results-count">
            Showing {filteredCompanies.length} of {allCompanies.length} companies
          </div>
        </div>
      </div>

      {/* Companies Grid */}
      {filteredCompanies.length > 0 ? (
        <div className="guides-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {filteredCompanies.map((company) => {
            const currentJobInfo = jobStatuses[company.id] || {};
            const currentStatus = currentJobInfo.status || 'Not Applied';
            const lastChecked = currentJobInfo.lastChecked || null;
            const companyNotes = currentJobInfo.notes || '';
            const statusStyle = getStatusBadgeStyle(currentStatus);
            const isNotesOpen = activeNotesCompanyId === company.id;

            return (
              <div
                key={company.id}
                className="guide-card"
                style={{
                  borderColor: company.category === 'Remote' ? 'rgba(16, 185, 129, 0.4)' : 'var(--border-color)',
                  background: 'var(--bg-card)'
                }}
              >
                {/* Card Header: Category Badge & Domain */}
                <div className="guide-card-top">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: 'var(--radius-md)',
                        background: 'var(--bg-tertiary)',
                        border: '1px solid var(--border-color)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                      }}
                    >
                      {company.logo ? (
                        <img
                          src={company.logo}
                          alt={company.name}
                          style={{ width: '28px', height: '28px', objectFit: 'contain' }}
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      ) : (
                        <Building2 size={22} color="var(--accent-primary)" />
                      )}
                    </div>

                    <div>
                      <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.2 }}>
                        {company.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        {company.domain}
                      </span>
                    </div>
                  </div>

                  <span
                    className={`guide-badge-status ${company.category === 'Remote' ? 'active' : 'upcoming'}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      padding: '4px 10px',
                      fontSize: '0.78rem',
                      fontWeight: 700
                    }}
                  >
                    {company.category === 'Remote' ? <Globe size={12} /> : <Building2 size={12} />}
                    {company.category === 'Remote' ? 'Strictly Remote' : 'Mixed / Hybrid'}
                  </span>
                </div>

                {/* Company Description & Location */}
                <p className="guide-card-desc" style={{ fontSize: '0.88rem' }}>
                  {company.description}
                </p>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Globe size={14} color="var(--accent-primary)" />
                  <span>Location / Model: <strong>{company.location}</strong></span>
                </div>

                {/* Required Tech Stack */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginTop: '0.2rem' }}>
                  <span style={{ fontSize: '0.76rem', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'var(--text-muted)' }}>
                    Tech Stack Required:
                  </span>
                  <div className="topics-chip-container">
                    {company.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="topic-chip"
                        style={{
                          background: techFilter === tech ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                          color: techFilter === tech ? '#fff' : 'var(--text-secondary)',
                          fontSize: '0.75rem',
                          padding: '3px 8px'
                        }}
                      >
                        #{tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Application Tracking Bar */}
                <div
                  style={{
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    padding: '0.85rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.6rem',
                    marginTop: 'auto'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={13} color="var(--accent-primary)" /> My Application Status:
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: 800,
                        padding: '2px 8px',
                        borderRadius: '12px',
                        background: statusStyle.bg,
                        color: statusStyle.color
                      }}
                    >
                      {statusStyle.label}
                    </span>
                  </div>

                  <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                    <select
                      value={currentStatus}
                      onChange={(e) => updateJobStatus(company.id, e.target.value)}
                      style={{
                        flex: 1,
                        padding: '0.5rem 0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        border: '1px solid var(--border-color)',
                        background: 'var(--bg-card)',
                        color: 'var(--text-primary)',
                        fontSize: '0.84rem',
                        fontWeight: 600,
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Not Applied">Not Applied</option>
                      <option value="Saved">Saved for Later</option>
                      <option value="Applied">Applied</option>
                      <option value="Interviewing">Interviewing</option>
                      <option value="Offer">Offer Received 🎉</option>
                      <option value="Rejected">Not Selected</option>
                    </select>

                    {lastChecked && (
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }} title="Last Status Update">
                        📅 {lastChecked}
                      </span>
                    )}
                  </div>
                </div>

                {/* Personal Application Notes Toggle */}
                <div style={{ borderTop: '1px dashed var(--border-color)', paddingTop: '0.5rem' }}>
                  <button
                    className="notes-toggle-btn"
                    onClick={() => setActiveNotesCompanyId(isNotesOpen ? null : company.id)}
                  >
                    <FileEdit size={14} />
                    {companyNotes ? 'Edit Application Notes' : 'Add Notes / Job Link'}
                    {isNotesOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  </button>

                  {isNotesOpen && (
                    <textarea
                      className="notes-textarea"
                      placeholder="Add job posting links, referral contact, salary range, or interview round details..."
                      value={companyNotes}
                      onChange={(e) => updateJobNotes(company.id, e.target.value)}
                      style={{ marginTop: '0.5rem', minHeight: '75px' }}
                    />
                  )}
                </div>

                {/* Card Action Footer: Apply & Delete (if custom) */}
                <div className="guide-card-footer" style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem', width: '100%' }}>
                    <a
                      href={company.careersUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-primary"
                      style={{ flex: 1, textDecoration: 'none', justifyContent: 'center', fontSize: '0.88rem' }}
                    >
                      Apply / View Careers <ExternalLink size={15} />
                    </a>

                    {company.id.startsWith('custom_') && (
                      <button
                        className="btn-secondary"
                        onClick={() => {
                          if (window.confirm(`Delete ${company.name} from your list?`)) {
                            deleteCustomCompany(company.id);
                          }
                        }}
                        title="Delete Custom Company"
                        style={{ color: 'var(--danger)', borderColor: 'rgba(239, 68, 68, 0.3)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <Briefcase size={44} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
          <h3>No matching companies found</h3>
          <p>Try adjusting your category filter, tech stack tags, or search keywords.</p>
        </div>
      )}

      {/* Add Custom Company Modal */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(0, 0, 0, 0.65)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
        >
          <div
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-xl)',
              padding: '1.75rem',
              width: '100%',
              maxWidth: '540px',
              boxShadow: 'var(--shadow-lg)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <Plus size={20} color="var(--accent-primary)" />
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  Add Custom Company to Track
                </h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddCompanySubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Company Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Netflix, Databricks, OpenAI..."
                  value={newCompany.name}
                  onChange={(e) => setNewCompany({ ...newCompany, name: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.85rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    Category *
                  </label>
                  <select
                    value={newCompany.category}
                    onChange={(e) => setNewCompany({ ...newCompany, category: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.88rem',
                      outline: 'none'
                    }}
                  >
                    <option value="Remote">Strictly Remote</option>
                    <option value="Hybrid">Mixed / Hybrid</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                    Domain / Industry
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Fintech, AI, SaaS..."
                    value={newCompany.domain}
                    onChange={(e) => setNewCompany({ ...newCompany, domain: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '0.65rem 0.85rem',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-color)',
                      background: 'var(--bg-primary)',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Careers / Jobs URL *
                </label>
                <input
                  type="url"
                  required
                  placeholder="https://company.com/careers"
                  value={newCompany.careersUrl}
                  onChange={(e) => setNewCompany({ ...newCompany, careersUrl: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Tech Stack Required (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="Java, Spring Boot, Go, AWS, React..."
                  value={newCompany.techStack}
                  onChange={(e) => setNewCompany({ ...newCompany, techStack: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '0.35rem', color: 'var(--text-primary)' }}>
                  Short Description
                </label>
                <textarea
                  placeholder="Brief note about the company or targeted positions..."
                  value={newCompany.description}
                  onChange={(e) => setNewCompany({ ...newCompany, description: e.target.value })}
                  style={{
                    width: '100%',
                    minHeight: '60px',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    border: '1px solid var(--border-color)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '0.88rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'flex-end', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  <Plus size={16} /> Save Company
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
