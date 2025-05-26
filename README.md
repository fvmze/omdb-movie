     # Movie Catalog — Technical Assignment: Middle Frontend (Next.js)

A single-page movie catalog application built with **Next.js** and **React**, leveraging
the [OMDb API](https://www.omdbapi.com/) to search and display movie data. This project demonstrates proficiency in
modern frontend technologies, clean architecture, API integration, and responsive UI/UX principles.

## ✅ Implemented Enhancements (Optional Features)

- ♾️ **Infinite Scroll**
    - Paginated API fetching using IntersectionObserver and useInfiniteQuery

- 🧠 **Data Caching**
    - Powered by **React Query** for request deduplication and cache optimization

- 💾 **Favorites Management**
    - Local state persisted via **Zustand** and localStorage, synced across browser tabs

- 🌙 **Theme Awareness**
    - Adaptive styling for light/dark modes based on system preferences

- 🧩 **Feature-Based Architecture**
    - Modular structure with separation of concerns:
        - features/, entities/, infra/, shared/

- 🛡️ **Security Middleware**
    - CSP headers with per-request nonce generation (middleware-level)

- 🧪 **Testing**
    - E2E tests for security headers (Cypress)
    - Unit tests for middleware logic (Vitest)

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/movie-catalog.git
cd movie-catalog
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Setup Environment Variables

Create a .env.local file and configure your OMDb API credentials:

```env
OMDB_API_URL=https://www.omdbapi.com/
OMDB_API_KEY=your_api_key_here
```

### 4. Run the Development Server

```bash
pnpm dev
```

The app will be available at http://localhost:3000.

---

## 📦 Technologies Used

- **Next.js (App Router)**
- **React 18**
- **React Query** for data fetching and caching
- **Zustand** for local state management
- **TypeScript** with strict typing
- **CSS Modules** for component-scoped styles
- **Cypress** for end-to-end testing
- **Vitest** for unit testing

---

## 📌 Evaluation Criteria (Addressed)

- **Code Quality** — Modular, type-safe, readable components with minimal duplication
- **Architecture** — Clear separation between data, UI, services, and state
- **API Handling** — Error-resilient, optimized fetching patterns
- **User Experience** — Fast, intuitive interface with proper loading/empty/error states
- **Scalability** — Component and data logic designed with reusability in mind
- **Documentation** — Thorough README with architecture overview and setup instructions

---

## 🚀 Getting Started

> If you don't have `pnpm` installed:

```bash
npm install -g pnpm@latest-10
