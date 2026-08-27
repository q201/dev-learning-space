import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Star, CheckCircle2, Copy, Check, FileEdit, ChevronDown, ChevronUp } from 'lucide-react';

export const QuestionCard = ({ item }) => {
  const {
    masteredIds,
    toggleMastered,
    bookmarkIds,
    toggleBookmark,
    notes,
    setNoteForQuestion
  } = useApp();

  const [copied, setCopied] = useState(false);
  const [showNotes, setShowNotes] = useState(false);

  const isMastered = masteredIds.includes(item.id);
  const isBookmarked = bookmarkIds.includes(item.id);
  const userNote = notes[item.id] || '';

  const handleCopy = () => {
    const textToCopy = `Q: ${item.question}\n\nAnswer: ${item.answer.replace(/<[^>]+>/g, '')}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`question-card ${isMastered ? 'is-mastered' : ''}`}>
      <div className="card-header">
        <div className="card-meta">
          <span className="q-id-pill">#{item.id}</span>
          <span className="cat-pill">{item.category}</span>
          <span className={`diff-pill ${item.difficulty}`}>{item.difficulty}</span>
          {item.tags && item.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                background: 'var(--bg-tertiary)',
                padding: '2px 6px',
                borderRadius: '4px',
                fontWeight: 500
              }}
            >
              #{tag}
            </span>
          ))}
        </div>

        <div className="card-actions-top">
          <button
            className={`icon-action-btn ${isBookmarked ? 'starred' : ''}`}
            onClick={() => toggleBookmark(item.id)}
            title={isBookmarked ? 'Remove Star' : 'Star Question'}
          >
            <Star size={18} fill={isBookmarked ? 'var(--warning)' : 'none'} />
          </button>

          <button
            className={`icon-action-btn ${isMastered ? 'mastered' : ''}`}
            onClick={() => toggleMastered(item.id)}
            title={isMastered ? 'Mark as Needs Review' : 'Mark as Mastered'}
          >
            <CheckCircle2 size={18} fill={isMastered ? 'var(--success-bg)' : 'none'} />
          </button>

          <button
            className="icon-action-btn"
            onClick={handleCopy}
            title="Copy Question & Answer"
          >
            {copied ? <Check size={18} color="var(--success)" /> : <Copy size={18} />}
          </button>
        </div>
      </div>

      <div className="q-title">{item.question}</div>

      <div
        className="q-answer-box"
        dangerouslySetInnerHTML={{ __html: item.answer }}
      />

      <div className="notes-section">
        <button
          className="notes-toggle-btn"
          onClick={() => setShowNotes(!showNotes)}
        >
          <FileEdit size={14} />
          {userNote ? 'Edit Personal Note' : 'Add Personal Note'}
          {showNotes ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>

        {showNotes && (
          <textarea
            className="notes-textarea"
            placeholder="Type your custom notes, hints, or key takeaways for this question..."
            value={userNote}
            onChange={(e) => setNoteForQuestion(item.id, e.target.value)}
          />
        )}
      </div>
    </div>
  );
};
