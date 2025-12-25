# BeyondChats AI Content Pipeline

An end-to-end system that scrapes blog content, enhances it using AI with external references, and presents both original and AI-updated versions through a clean dashboard.

This project demonstrates a production-minded approach to data ingestion, AI-driven content enrichment, and frontend presentation.

---

## 🏗 Architecture Overview

The system is implemented in three clearly separated phases:

Laravel Backend (Scraping + APIs) -> Node.js AI Pipeline (Search + LLM) -> React Frontend (Content Dashboard)

Each phase is independently runnable and focuses on a single responsibility.

---

## Phase 1 – Backend Scraper & APIs (Laravel)

### Responsibilities
- Scrape the oldest BeyondChats blog articles
- Store article content in SQLite
- Expose RESTful CRUD APIs for consumption by downstream services

### Key Design Decisions
- Defensive scraping to skip tag, category, and non-article pages
- Paragraph-level content extraction for robustness across layouts
- Clean text storage (no raw HTML) for easier AI processing
- Article versioning (`original`, `updated`)

### Key API Endpoints
- `GET /api/articles` – Fetch all articles
- `GET /api/articles/{id}` – Fetch single article
- `POST /api/articles` – Create article (used by AI pipeline)

---

## Phase 2 – AI Content Enhancement (Node.js)

### Responsibilities
- Fetch the latest article from Laravel APIs
- Search Google for relevant external articles
- Scrape reference content
- Rewrite and enhance the article using an LLM
- Append reference links
- Publish the updated article back to the backend

### Key Design Decisions
- Graceful handling of non-scrapable sources (e.g., Reddit)
- Backend-enforced slug generation and uniqueness
- Version-safe storage using derived slugs (e.g., `-updated`)
- Simple, explainable Node.js pipeline (no overengineering)

---

## Phase 3 – Frontend Dashboard (React)

### Responsibilities
- Display original and AI-enhanced articles
- Clearly distinguish article versions
- Render full readable content
- Show reference links for transparency

### UI Features
- Clean dashboard layout
- Version badges (Original vs AI Updated)
- Readable long-form article rendering
- Reference section for validation

---

## 🧰 Tech Stack

- **Backend**: Laravel, SQLite
- **Scraping**: Symfony DomCrawler, Cheerio
- **AI Pipeline**: Node.js, Google Search (SerpAPI), OpenAI
- **Frontend**: React (Vite), Axios

---

## 🚀 Running the Project Locally

### 1️⃣ Backend (Laravel)

```bash
cd backend-laravel
php artisan serve
```

The API will be available at:
`http://127.0.0.1:8000/api/articles`

# 2️⃣ AI Content Pipeline (Node.js)

``` bash
cd content-updater-node
node index.js
```
- This will:
    - Fetch the latest article
    - Search external references
    - Generate an AI-enhanced version
    - Publish it back to the backend

# 3️⃣ Frontend (React)

``` bash
cd frontend-react
npm run dev
```

Open:
`http://localhost:5173`
