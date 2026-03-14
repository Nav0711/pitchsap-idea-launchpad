# 🚀 Pitchsap – AI-Powered Startup Idea Launchpad

> **Live Demo**: [https://pitchsap-idea-launchpad.vercel.app/](https://pitchsap-idea-launchpad.vercel.app/)

Pitchsap is an AI-powered platform built for founders and entrepreneurs to **validate, refine, and pitch their startup ideas** with the help of AI-driven analysis, expert mentor matching, investor connect, and a vibrant community — all in one place.

---

## ✨ Feature Overview

### 🌐 Frontend (React + Vite)
| Feature | Description |
|---|---|
| **Hero Section** | Animated landing section with Vanta.js fog background, responsive two-column layout, and routed CTAs |
| **How It Works** | Step-by-step walkthrough of the platform process with animations |
| **Why Pitchsap** | Highlights the platform's key differentiators with animated cards |
| **Pricing** | Monthly/yearly toggle with 4 plans (Starter · Founder · Growth · Enterprise); mobile accordion on phones |
| **Community** | Highlights the startup community and peer feedback ecosystem |
| **Early Access** | Email capture section for beta / waitlist users |
| **Blog Preview** | Grid (desktop) / compact thumbnail cards (mobile) linking to the full blog |
| **Blog Page** | Dedicated `/blog` page with full article listings |
| **AI Chat** | Real-time chat widget integrated with the backend AI endpoint |
| **Auth** | Email/password Login & Signup, JWT-based sessions |
| **Dark / Light Mode** | System-aware theme toggle, persisted via localStorage |
| **Cursor Glow** | Subtle mouse-following glow animation for a premium feel |
| **Liquid Glass Navbar** | Three-island floating glass navbar with glow effects and smooth scroll |
| **Responsive Design** | Fully mobile-friendly with adaptive layouts and overflow protection |
| **Footer with Social Icons** | Links to Twitter, Instagram, LinkedIn, GitHub, YouTube |

### 🔧 Backend (FastAPI + PostgreSQL / NeonDB)
| Feature | Description |
|---|---|
| **User Registration** | Secure signup with bcrypt hashed passwords |
| **JWT Auth** | Login returns a Bearer token, used to protect private routes |
| **AI Chat** | `/api/chat` endpoint for AI-powered idea feedback |
| **Database** | Async SQLAlchemy with NeonDB (PostgreSQL) or local SQLite fallback |
| **CORS** | Configured for local dev and production deployments |
| **Health Check** | `GET /api/health` for uptime monitoring |

---

## 🗂️ Repo Structure

```
pitchsap-idea-launchpad/
├── backend/              # FastAPI Python backend
│   ├── app/
│   │   ├── core/         # Security, JWT helpers
│   │   ├── models/       # SQLAlchemy ORM models
│   │   ├── routers/      # API route handlers
│   │   ├── database.py   # DB engine & session setup
│   │   ├── main.py       # FastAPI app entry point
│   │   └── schemas.py    # Pydantic request/response schemas
│   ├── requirements.txt
│   └── README.md
│
├── frontend/             # React + Vite frontend
│   ├── public/           # Static assets (favicon, etc.)
│   ├── src/
│   │   ├── assets/       # Images, logo
│   │   ├── components/   # All UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── lib/          # Utility functions
│   │   ├── pages/        # Page-level components
│   │   └── App.tsx       # Root component + router
│   ├── package.json
│   └── README.md
│
└── README.md             # ← You are here
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Shadcn/UI, Radix UI |
| **Backend** | Python 3.10+, FastAPI, SQLAlchemy (async), Pydantic |
| **Database** | NeonDB (PostgreSQL via asyncpg) / SQLite (local fallback) |
| **Auth** | JWT (python-jose), bcrypt |
| **Deployment** | Vercel (frontend) |

---

## ⚡ Quickstart — Full Stack

### Prerequisites
- **Node.js** v18+ and npm
- **Python** 3.10+
- **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/Nav0711/pitchsap-idea-launchpad.git
cd pitchsap-idea-launchpad
```

---

### 2. Run the Frontend

```bash
cd frontend
npm install
npm run dev
```

> Frontend runs at **http://localhost:8080**

See [`frontend/README.md`](./frontend/README.md) for full details.

---

### 3. Run the Backend

```bash
cd backend

# Create and activate virtual environment
python3 -m venv venv
source venv/bin/activate      # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env          # Then edit .env with your values

# Start the server
uvicorn app.main:app --reload
```

> Backend API runs at **http://localhost:8000**
> Swagger docs at **http://localhost:8000/docs**

See [`backend/README.md`](./backend/README.md) for full details.

---

## 🌍 Deployment

The frontend is deployed on **Vercel**:  
🔗 **https://pitchsap-idea-launchpad.vercel.app/**

---

## 📄 License

MIT © 2024 Pitchsap
