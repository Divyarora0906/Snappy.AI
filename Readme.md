<div align="center">

# Snappy.AI

### *Your AI-Powered News Intelligence Platform*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-Auth-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![NeonDB](https://img.shields.io/badge/NeonDB-Postgres-00E5C1?style=for-the-badge&logo=postgresql&logoColor=white)](https://neon.tech/)

**Snappy.AI** aggregates real-time news from 30+ global sources, processes it with AI (Groq / LLaMA 3.1), and delivers personalized insights, AI-generated video summaries, and interactive story tracking — all in one sleek dark-mode interface.

</div>

---

## 📑 Table of Contents

- [✨ Features](#-features)
- [🏗️ Architecture](#️-architecture)
- [🗂️ Project Structure](#️-project-structure)
- [🛠️ Tech Stack](#️-tech-stack)
- [⚙️ Prerequisites](#️-prerequisites)
- [🚀 Getting Started](#-getting-started)
  - [1. Clone the Repository](#1-clone-the-repository)
  - [2. Backend Setup](#2-backend-setup)
  - [3. Frontend Setup](#3-frontend-setup)
- [🔑 Environment Variables](#-environment-variables)
- [📡 API Reference](#-api-reference)
- [🗺️ Pages & Routes](#️-pages--routes)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

| Feature | Description |
|---|---|
| 🌍 **Real-Time News Feed** | Aggregates live RSS feeds from 30+ premium sources (TechCrunch, BBC, NY Times, ESPN, NDTV, etc.) |
| 🤖 **AI News Chat** | Ask any news question — powered by **Groq + LLaMA 3.1** — get summaries, key points & follow-ups |
| 🎬 **AI Video Generator** | Auto-generates short news video reels with AI narration (gTTS), dynamic subtitles & Pexels imagery via FFmpeg |
| 🗺️ **Region-Based News** | Browse news by country: 🇮🇳 India, 🇺🇸 USA, 🇬🇧 UK, 🇦🇺 Australia, 🇨🇦 Canada, 🇩🇪 Germany, 🇯🇵 Japan, 🇫🇷 France, 🇦🇪 UAE, 🇸🇬 Singapore |
| 📖 **Story Tracker** | Follow complex, multi-week stories with auto-generated chronological timelines |
| 📊 **Personalized Dashboard** | AI-driven reading habits & category preferences stored per user in NeonDB |
| 🔖 **Bookmarks** | Save articles and access them from your personal dashboard |
| 🔐 **Authentication** | Secure login via **Firebase Auth** (Email/Password + Google OAuth) |
| 📱 **Fully Responsive** | Mobile-first design with dark-mode glassmorphism UI |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────┐      ┌───────────────────────────────┐
│          React Frontend             │ HTTP │         Node.js Backend       │
│  (Vite + Tailwind + React Router)   │◄────►│  (Express.js on port 5000)    │
│                                     │      │                               │
│  Pages: Home, Explore, Chat,        │      │  REST API                     │
│  Dashboard, StoryTracker,           │      │  ├─ /api/news/*               │
│  Article, Auth, Account             │      │  ├─ /api/users/*              │
└─────────────────────────────────────┘      │  ├─ /api/bookmarks/*          │
          │                                  │  ├─ /api/recommendations/*    │
          │ Firebase SDK                     │  ├─ /api/videos/*             │
          ▼                                  │  └─ /api/ask-news             │
┌──────────────────┐                         └───────────────────────────────┘
│  Firebase Auth   │                                  │           │
│  (Google OAuth + │                         ┌────────┘           └───────────┐
│   Email/Password)│                         │                                │
└──────────────────┘                ┌────────▼────────┐  ┌──────────────────┐│
                                    │  NeonDB (Postgres)│  │  External APIs   ││
                                    │  ├─ users         │  │  ├─ RSS Feeds    ││
                                    │  ├─ categories    │  │  ├─ Groq AI      ││
                                    │  ├─ bookmarks     │  │  ├─ Pexels       ││
                                    │  ├─ reading_hist  │  │  └─ Cloudinary   ││
                                    │  └─ user_prefs    │  └──────────────────┘│
                                    └───────────────────┘                      │
                                                                               │
                                    ┌──────────────────────────────────────────┘
                                    │  FFmpeg Pipeline (Video Generation)
                                    │  gTTS → Audio → Pexels Images → SRT Subs
                                    └─► MP4 Video → Cloudinary CDN
```

---

## 🗂️ Project Structure

```
Snappy.AI/
├── 📄 .gitignore
├── 📄 package.json                  # Root workspace
│
├── 📁 Snappy Frontend/              # React + Vite App
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── src/
│       ├── App.jsx                  # Router & protected routes
│       ├── main.jsx
│       ├── firebase.js              # Firebase config
│       ├── index.css
│       │
│       ├── 📁 pages/
│       │   ├── Home.jsx             # Landing + trending news
│       │   ├── Explore.jsx          # Category-based news explorer
│       │   ├── Chat.jsx             # AI news chat interface
│       │   ├── Dashboard.jsx        # Personalized user dashboard
│       │   ├── StoryTracker.jsx     # Timeline-based story tracking
│       │   ├── Article.jsx          # Full article reader
│       │   ├── Auth.jsx             # Login / signup page
│       │   └── Account.jsx          # User account settings
│       │
│       ├── 📁 components/
│       │   ├── Header.jsx
│       │   ├── Footer.jsx
│       │   ├── Skeleton.jsx
│       │   └── UserBehaviour.jsx    # Reading preference graph
│       │
│       ├── 📁 home/
│       │   ├── AISearch.jsx         # AI search bar
│       │   ├── NewsGrid.jsx         # Trending news cards
│       │   └── YourAlgorithm.jsx
│       │
│       ├── 📁 explore/
│       │   ├── Card.jsx             # News article card
│       │   ├── Grid.jsx             # News grid layout
│       │   ├── Sidebar.jsx          # Category & region sidebar
│       │   └── TrendingTopics.jsx
│       │
│       ├── 📁 dashboard/
│       │   ├── UserCard.jsx
│       │   ├── WatchList.jsx
│       │   └── LiveAlerts.jsx
│       │
│       ├── 📁 auth/
│       │   └── LoginForm.jsx
│       │
│       └── 📁 context/
│           └── AuthContext.jsx      # Firebase auth context
│
└── 📁 Snappy_Backend/               # Node.js + Express API
    ├── server.js                    # Main server & all news routes
    ├── package.json
    ├── script.json
    │
    ├── 📁 controllers/
    │   ├── newsController.js        # AI ask-news controller
    │   ├── videoController.js       # FFmpeg video generation
    │   ├── imageController.js
    │   └── feedController.js
    │
    ├── 📁 routes/
    │   ├── videoRoutes.js
    │   ├── newsRoutes.js
    │   ├── feedRoutes.js
    │   └── imgRoutes.js
    │
    ├── 📁 service/
    │   ├── generateNews.js          # Groq AI (LLaMA 3.1) integration
    │   ├── fetchQuery.js            # Smart news query resolver
    │   ├── fetchNews.js
    │   ├── FetchTrending.js
    │   ├── generalNewsFetch.js
    │   └── imageService.js          # Pexels image fetcher
    │
    └── 📁 img/
        └── gradient.png             # Overlay for video generation
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| **React 19** | UI framework |
| **Vite 8** | Build tool & dev server |
| **Tailwind CSS 3** | Utility-first styling |
| **React Router DOM 7** | Client-side routing |
| **Firebase SDK 12** | Authentication |
| **Axios** | HTTP client |
| **Lucide React** | Icon library |
| **ElevenLabs JS SDK** | (Audio integration) |
| **Remotion** | (Video composition) |

### Backend
| Technology | Purpose |
|---|---|
| **Node.js + Express 5** | REST API server |
| **NeonDB (Serverless Postgres)** | Users, bookmarks, preferences |
| **Firebase Admin** | Auth token verification |
| **Groq API (LLaMA 3.1 8B)** | AI news summarization & insights |
| **RSS Parser** | Multi-source RSS feed aggregation |
| **FFmpeg + fluent-ffmpeg** | Video processing pipeline |
| **gTTS** | Text-to-speech narration |
| **Cloudinary** | Video CDN & storage |
| **Pexels API** | Stock imagery for videos |
| **node-fetch** | HTTP requests |

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** `v18+` — [Download](https://nodejs.org/)
- **npm** `v9+` (bundled with Node.js)
- **Git** — [Download](https://git-scm.com/)

You will also need accounts and API keys for:
- [Firebase](https://console.firebase.google.com/) — Authentication
- [Neon Database](https://neon.tech/) — Serverless PostgreSQL
- [Groq Cloud](https://console.groq.com/) — AI inference (free tier available)
- [Pexels](https://www.pexels.com/api/) — Stock photos for video generation
- [Cloudinary](https://cloudinary.com/) — Video storage & CDN

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/snappy-ai.git
cd snappy-ai
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd Snappy_Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Then edit .env with your API keys (see Environment Variables section)

# Start the backend server
node server.js
# Server will run at http://localhost:5000
```

### 3. Frontend Setup

```bash
# Open a new terminal and navigate to the frontend directory
cd "Snappy Frontend"

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Then add your Firebase config (see Environment Variables section)

# Start the development server
npm run dev
# App will run at http://localhost:5173
```

> **Note:** Both the backend (`port 5000`) and frontend (`port 5173`) must be running simultaneously for the app to function correctly.

---

## 🔑 Environment Variables

### Backend — `Snappy_Backend/.env`

```env
# Groq AI — https://console.groq.com/
GROQ_API_KEY=your_groq_api_key_here

# Pexels API — https://www.pexels.com/api/
PEXELS_API_KEY=your_pexels_api_key_here

# Cloudinary — https://cloudinary.com/
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# NeonDB — https://neon.tech/
DATABASE_URL=postgresql://user:password@host/dbname?sslmode=require

# Server Port (optional, defaults to 5000)
PORT=5000
```

### Frontend — `Snappy Frontend/.env`

```env
# Firebase — https://console.firebase.google.com/
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

> ⚠️ **Security:** Never commit `.env` files to version control. They are already listed in `.gitignore`.

---

## 📡 API Reference

All backend endpoints are prefixed with `http://localhost:5000`.

### 📰 News Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/news/all` | All news. Query params: `?limit=40&category=tech` |
| `GET` | `/api/news/trending` | Trending stories. Query: `?limit=12` |
| `GET` | `/api/news/tech` | Technology news |
| `GET` | `/api/news/geopolitics` | Geopolitics news |
| `GET` | `/api/news/sports` | Sports news |
| `GET` | `/api/news/business` | Business news |
| `GET` | `/api/news/science` | Science news |
| `GET` | `/api/news/india` | India news |
| `GET` | `/api/news/region/:country` | Region-specific news (e.g., `/region/usa`) |
| `GET` | `/api/news/regions` | List all available regions |

**Valid categories:** `tech`, `geopolitics`, `sports`, `business`, `india`, `science`

**Valid regions:** `india`, `usa`, `uk`, `australia`, `canada`, `germany`, `japan`, `uae`, `france`, `singapore`

### 👤 User Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/users/check-email?email=` | Check if an email exists |
| `POST` | `/api/users/sync` | Create or update user profile |
| `GET` | `/api/preferences/:firebase_uid` | Get user category preferences |
| `GET` | `/api/recommendations/:firebase_uid` | Get personalized article recommendations |

### 📑 Reading & Bookmarks

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/reading` | Record a read article (updates preferences) |
| `POST` | `/api/bookmarks` | Add a bookmark |
| `DELETE` | `/api/bookmarks` | Remove a bookmark |
| `GET` | `/api/bookmarks/:firebase_uid` | Get all bookmarks for a user |

### 🤖 AI Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/ask-news` | AI news chat. Body: `{ query, userType }` |
| `POST` | `/api/videos/generate` | Generate AI news video. Body: `{ keywords, script }` |

### ❤️ Health Check

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Server health check |

---

## 🗺️ Pages & Routes

| Route | Page | Auth Required |
|---|---|---|
| `/` | **Home** — Trending news, AI search bar | ❌ |
| `/explore` | **Explore** — Category & region news browser | ❌ |
| `/auth` | **Auth** — Login / Sign up | ❌ |
| `/chat` | **Chat** — AI news assistant | ✅ |
| `/dashboard` | **Dashboard** — User profile & reading habits | ✅ |
| `/tracker` | **Story Tracker** — Timeline-based news tracking | ✅ |
| `/account` | **Account** — Settings & profile management | ✅ |
| `/article` | **Article** — Full article reader | ✅ |

---

## 🗄️ Database Schema

The project uses **NeonDB (Serverless PostgreSQL)**. The core tables are:

```sql
-- Users table
CREATE TABLE users (
  firebase_uid   TEXT PRIMARY KEY,
  email          TEXT UNIQUE NOT NULL,
  display_name   TEXT,
  photo_url      TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Categories reference table
CREATE TABLE categories (
  id    SERIAL PRIMARY KEY,
  name  TEXT UNIQUE NOT NULL
);

-- User reading history
CREATE TABLE reading_history (
  id           SERIAL PRIMARY KEY,
  firebase_uid TEXT REFERENCES users(firebase_uid),
  article_id   TEXT,
  category     TEXT,
  title        TEXT,
  read_at      TIMESTAMPTZ DEFAULT NOW()
);

-- User category preferences (ML weights)
CREATE TABLE user_preferences (
  firebase_uid  TEXT REFERENCES users(firebase_uid),
  category_id   INT  REFERENCES categories(id),
  weight        FLOAT DEFAULT 1.0,
  PRIMARY KEY (firebase_uid, category_id)
);

-- Bookmarks
CREATE TABLE bookmarks (
  firebase_uid   TEXT REFERENCES users(firebase_uid),
  article_id     TEXT,
  bookmarked_at  TIMESTAMPTZ DEFAULT NOW(),
  PRIMARY KEY (firebase_uid, article_id)
);
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'feat: add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

Please make sure your code follows the existing code style and that any new features include tests where applicable.

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">

Built with ❤️ using React, Node.js, Groq AI & FFmpeg

**[⬆ Back to Top](#-snappyai)**

</div>
