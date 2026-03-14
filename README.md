# Pitchsap - Idea Launchpad

Pitchsap is a platform designed to help entrepreneurs and creators launch their ideas with a solid foundation. This repository contains both the backend services and the frontend application.

## Project Structure

- `/backend`: FastAPI service handling authentication, chat, and data persistence.
- `/frontend`: React + Vite application with Shadcn UI and Tailwind CSS.

---

## 🚀 Backend Setup

The backend is built with FastAPI and uses a SQLite/NeonDB database.

### Prerequisites
- Python 3.10+
- `pip`

### Setup Steps
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Set up your environment variables:
   - Create a `.env` file based on the provided configuration (ensure `DATABASE_URL` and `SECRET_KEY` are set).
5. Start the server:
   ```bash
   uvicorn app.main:app --reload
   ```
   The API will be available at `http://localhost:8000`.

---

## 💻 Frontend Setup

The frontend is a modern React application.

### Prerequisites
- Node.js (v18+)
- `npm` or `bun`

### Setup Steps
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:8080`.

---

## 🛠 Tech Stack

- **Backend**: FastAPI, SQLAlchemy, Pydantic, SQLite/PostgreSQL.
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Shadcn UI, Framer Motion.
- **Tools**: Vitest, Playwright.

## 📄 License

