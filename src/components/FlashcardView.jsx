import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, Shuffle, CheckCircle2, RotateCcw, HelpCircle, Eye } from 'lucide-react';

export const FlashcardView = () => {
  const {
    filteredQuestions,
    masteredIds,
    toggleMastered,
    activeFlashcardIndex,
    setActiveFlashcardIndex
  } = useApp();

  const [isFlipped, setIsFlipped] = useState(false);

  if (!filteredQuestions || filteredQuestions.length === 0) {
    return (
      <div className="empty-state">
        <HelpCircle size={40} style={{ margin: '0 auto 1rem', color: 'var(--text-muted)' }} />
        <h3>No Flashcards Found</h3>
        <p>Try adjusting your search query or category filters to view flashcards.</p>
      </div>
    );
  }

  const currentIndex = Math.min(
    activeFlashcardIndex,
    filteredQuestions.length - 1
  );
  const currentItem = filteredQuestions[currentIndex] || filteredQuestions[0];
  const isMastered = masteredIds.includes(currentItem.id);

  const handleNext = () => {
    setIsFlipped(false);
    setActiveFlashcardIndex((prev) => (prev + 1) % filteredQuestions.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setActiveFlashcardIndex(
      (prev) => (prev - 1 + filteredQuestions.length) % filteredQuestions.length
    );
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
    setActiveFlashcardIndex(randomIndex);
  };

  const handleMarkAndNext = () => {
    if (!isMastered) {
      toggleMastered(currentItem.id);
    }
    handleNext();
  };

  return (
    <div className="flashcard-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-muted)' }}>
          Flashcard {currentIndex + 1} of {filteredQuestions.length}
        </span>
        <button className="btn-secondary" onClick={handleShuffle} style={{ padding: '0.4rem 0.8rem', fontSize: '0.8rem' }}>
          <Shuffle size={14} /> Shuffle Deck
        </button>
      </div>

      <div className="flashcard-wrapper" onClick={() => setIsFlipped(!isFlipped)}>
        <div className={`flashcard ${isFlipped ? 'flipped' : ''}`}>
          {/* Front Face: Question */}
          <div className="card-face front">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="fc-hint">Question #{currentItem.id}</span>
              <span className="cat-pill">{currentItem.category}</span>
            </div>

            <div className="fc-question-text">{currentItem.question}</div>

            <div className="fc-tap-prompt">
              <Eye size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} />
              Click or tap card to flip and view answer
            </div>
          </div>

          {/* Back Face: Answer */}
          <div className="card-face back">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="fc-hint" style={{ color: 'var(--success)' }}>Answer</span>
              <span className={`diff-pill ${currentItem.difficulty}`}>{currentItem.difficulty}</span>
            </div>

            <div
              className="fc-answer-text"
              dangerouslySetInnerHTML={{ __html: currentItem.answer }}
            />

            <div className="fc-tap-prompt">
              Click card to flip back to question
            </div>
          </div>
        </div>
      </div>

      <div className="fc-controls">
        <button className="btn-secondary" onClick={handlePrev}>
          <ChevronLeft size={18} /> Previous
        </button>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button className="btn-secondary" onClick={handleNext}>
            <RotateCcw size={16} /> Skip
          </button>
          <button className="btn-primary" onClick={handleMarkAndNext}>
            <CheckCircle2 size={16} /> Got It!
          </button>
        </div>

        <button className="btn-secondary" onClick={handleNext}>
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
};
