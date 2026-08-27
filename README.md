# Dev Learning Space

**Version:** 1.0.0

An interactive developer knowledge portal for Java Backend, Spring Boot, Microservices, and System Design interview preparation. Features flashcards, progress tracking, bookmarks, and a multi-topic study guide system.

## Features

- 📚 **Multi-Topic Study Guides** — Java, Spring Boot, Microservices, System Design
- 🃏 **Flashcard Mode** — Flip-card study sessions for quick revision
- ✅ **Progress Tracking** — Mark questions as mastered, track % completion
- ⭐ **Bookmarks** — Save important questions for later review
- 📊 **Analytics Dashboard** — Visual progress stats
- 🌙 **Dark / Light Mode** — Theme toggle
- 🔍 **Search & Filter** — Filter questions by difficulty, category, keyword

## Technology Stack

- **React 19** with JSX
- **Vite 8** for build tooling
- **Lucide React** for icons
- **Vanilla CSS** for styling (no framework)

## Project Structure

```
dev-learning-space/
├── src/
│   ├── App.jsx                # Root app component
│   ├── components/            # UI components
│   │   ├── Header.jsx
│   │   ├── LandingPage.jsx
│   │   ├── Sidebar.jsx
│   │   ├── QuestionCard.jsx
│   │   ├── FlashcardView.jsx
│   │   ├── ProgressStats.jsx
│   │   └── SearchFilterBar.jsx
│   ├── context/
│   │   └── AppContext.jsx     # Global state management
│   ├── data/                  # Question bank data
│   ├── styles/                # CSS styles
│   └── main.jsx               # App entry point
├── public/
├── index.html
├── package.json
└── vite.config.js
```

## Running the App

```bash
npm install
npm run dev
```

The app will run on `http://localhost:5173`

## License

MIT
