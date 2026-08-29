import React, { createContext, useContext, useState, useEffect } from 'react';
import questionsData from '../data/questions.json';
import { CATEGORIES } from '../data/categories';
import { TOPIC_GUIDES } from '../data/topics';
import { INITIAL_COMPANIES } from '../data/companies';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [questions] = useState(questionsData);
  const [categories] = useState(CATEGORIES);
  const [topicGuides] = useState(TOPIC_GUIDES);
  
  // Selected guide module (null = Landing Page, 'java-backend' = Java guide)
  const [selectedTopic, setSelectedTopic] = useState(() => {
    try {
      return localStorage.getItem('dev_learning_selected_topic') || null;
    } catch {
      return null;
    }
  });

  const [currentPage, setCurrentPage] = useState('home'); // home, about, privacy, terms, jobs
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // all, mastered, learning, bookmarked
  const [difficultyFilter, setDifficultyFilter] = useState('all'); // all, Easy, Medium, Hard

  const navigateTo = (page) => {
    setCurrentPage(page);
    if (page !== 'guide') {
      setSelectedTopic(null);
      localStorage.removeItem('dev_learning_selected_topic');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const returnToLanding = () => {
    navigateTo('home');
  };

  const enterTopicGuide = (topicId, mode = 'list') => {
    setSelectedTopic(topicId);
    setCurrentPage('guide');
    setViewMode(mode);
    try {
      localStorage.setItem('dev_learning_selected_topic', topicId);
    } catch {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const [viewMode, setViewMode] = useState('list'); // list, flashcards, stats
  const [activeFlashcardIndex, setActiveFlashcardIndex] = useState(0);

  // LocalStorage state initialization
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dev_learning_mastered');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [bookmarkIds, setBookmarkIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dev_learning_bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('dev_learning_notes');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // Company Application Tracking States
  const [customCompanies, setCustomCompanies] = useState(() => {
    try {
      const saved = localStorage.getItem('dev_learning_custom_companies');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [jobStatuses, setJobStatuses] = useState(() => {
    try {
      const saved = localStorage.getItem('dev_learning_job_statuses');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('dev_learning_theme') || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Combined list of companies
  const allCompanies = [...INITIAL_COMPANIES, ...customCompanies];

  // Sync theme with document element attribute
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('dev_learning_theme', theme);
  }, [theme]);

  // Persist selected topic
  useEffect(() => {
    if (selectedTopic) {
      localStorage.setItem('dev_learning_selected_topic', selectedTopic);
    } else {
      localStorage.removeItem('dev_learning_selected_topic');
    }
  }, [selectedTopic]);

  // Persist mastered, bookmarks, notes, job tracker
  useEffect(() => {
    localStorage.setItem('dev_learning_mastered', JSON.stringify(masteredIds));
  }, [masteredIds]);

  useEffect(() => {
    localStorage.setItem('dev_learning_bookmarks', JSON.stringify(bookmarkIds));
  }, [bookmarkIds]);

  useEffect(() => {
    localStorage.setItem('dev_learning_notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    localStorage.setItem('dev_learning_custom_companies', JSON.stringify(customCompanies));
  }, [customCompanies]);

  useEffect(() => {
    localStorage.setItem('dev_learning_job_statuses', JSON.stringify(jobStatuses));
  }, [jobStatuses]);

  // Toggle & Update methods
  const toggleMastered = (id) => {
    setMasteredIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const toggleBookmark = (id) => {
    setBookmarkIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const setNoteForQuestion = (id, noteText) => {
    setNotes((prev) => ({
      ...prev,
      [id]: noteText
    }));
  };

  // Job Application Tracker Handlers
  const updateJobStatus = (companyId, newStatus) => {
    const today = new Date().toISOString().split('T')[0];
    setJobStatuses((prev) => ({
      ...prev,
      [companyId]: {
        ...(prev[companyId] || {}),
        status: newStatus,
        lastChecked: today
      }
    }));
  };

  const updateJobNotes = (companyId, notesText) => {
    setJobStatuses((prev) => ({
      ...prev,
      [companyId]: {
        ...(prev[companyId] || {}),
        notes: notesText
      }
    }));
  };

  const addCustomCompany = (companyObj) => {
    const newComp = {
      ...companyObj,
      id: `custom_${Date.now()}`
    };
    setCustomCompanies((prev) => [newComp, ...prev]);
  };

  const deleteCustomCompany = (companyId) => {
    setCustomCompanies((prev) => prev.filter((c) => c.id !== companyId));
    setJobStatuses((prev) => {
      const copy = { ...prev };
      delete copy[companyId];
      return copy;
    });
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all mastered status and bookmarks?')) {
      setMasteredIds([]);
      setBookmarkIds([]);
    }
  };

  // Filter questions logic
  const filteredQuestions = questions.filter((q) => {
    // Category match
    if (activeCategory !== 'all' && q.categoryId !== activeCategory) {
      return false;
    }
    // Search query match
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      const matchQ = q.question.toLowerCase().includes(query);
      const matchA = q.answer.toLowerCase().includes(query);
      const matchTag = q.tags && q.tags.some(t => t.toLowerCase().includes(query));
      if (!matchQ && !matchA && !matchTag) return false;
    }
    // Status filter match
    if (statusFilter === 'mastered' && !masteredIds.includes(q.id)) return false;
    if (statusFilter === 'learning' && masteredIds.includes(q.id)) return false;
    if (statusFilter === 'bookmarked' && !bookmarkIds.includes(q.id)) return false;

    // Difficulty filter match
    if (difficultyFilter !== 'all' && q.difficulty !== difficultyFilter) return false;

    return true;
  });

  return (
    <AppContext.Provider
      value={{
        questions,
        categories,
        topicGuides,
        selectedTopic,
        setSelectedTopic,
        currentPage,
        setCurrentPage,
        navigateTo,
        enterTopicGuide,
        returnToLanding,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        statusFilter,
        setStatusFilter,
        difficultyFilter,
        setDifficultyFilter,
        masteredIds,
        bookmarkIds,
        notes,
        theme,
        toggleTheme,
        viewMode,
        setViewMode,
        activeFlashcardIndex,
        setActiveFlashcardIndex,
        toggleMastered,
        toggleBookmark,
        setNoteForQuestion,
        resetProgress,
        filteredQuestions,
        // Job Application Tracker
        allCompanies,
        jobStatuses,
        updateJobStatus,
        updateJobNotes,
        addCustomCompany,
        deleteCustomCompany
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

