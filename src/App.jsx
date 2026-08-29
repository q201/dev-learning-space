import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { AboutPage } from './components/AboutPage';
import { PrivacyPage } from './components/PrivacyPage';
import { TermsPage } from './components/TermsPage';
import { Sidebar } from './components/Sidebar';
import { SearchFilterBar } from './components/SearchFilterBar';
import { QuestionCard } from './components/QuestionCard';
import { FlashcardView } from './components/FlashcardView';
import { ProgressStats } from './components/ProgressStats';
import { JobsPage } from './components/JobsPage';
import { SearchX } from 'lucide-react';

const MainContent = () => {
  const { viewMode, filteredQuestions, activeCategory, categories } = useApp();

  const currentCategoryObj = categories.find((c) => c.id === activeCategory);

  return (
    <main className="content-area">
      {/* Category Header Banner */}
      <div style={{ marginBottom: '1.25rem' }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
          {currentCategoryObj ? currentCategoryObj.name : 'All Questions'}
        </h2>
        {currentCategoryObj && (
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            {currentCategoryObj.description}
          </p>
        )}
      </div>

      {viewMode === 'list' && (
        <>
          <SearchFilterBar />
          {filteredQuestions.length > 0 ? (
            <div className="questions-grid">
              {filteredQuestions.map((item) => (
                <QuestionCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <SearchX size={44} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
              <h3>No matching questions found</h3>
              <p>Try broadening your search criteria or clearing your active filters.</p>
            </div>
          )}
        </>
      )}

      {viewMode === 'flashcards' && <FlashcardView />}

      {viewMode === 'stats' && <ProgressStats />}
    </main>
  );
};

const AppBody = () => {
  const { selectedTopic, currentPage } = useApp();

  if (currentPage === 'jobs') {
    return <JobsPage />;
  }

  if (currentPage === 'about') {
    return <AboutPage />;
  }

  if (currentPage === 'privacy') {
    return <PrivacyPage />;
  }

  if (currentPage === 'terms') {
    return <TermsPage />;
  }

  if (!selectedTopic || currentPage === 'home') {
    return <LandingPage />;
  }

  return (
    <div className="main-layout">
      <Sidebar />
      <MainContent />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <div className="app-container">
        <Header />
        <AppBody />
        <Footer />
      </div>
    </AppProvider>
  );
}

export default App;
