# 🔧 Pitchsap – Backend

> REST API powering the Pitchsap platform, built with **FastAPI**, **SQLAlchemy (async)**, and **NeonDB (PostgreSQL)**.

---

## 🏗️ Architecture Overview

```
backend/
├── app/
│   ├── core/
│   │   └── security.py     # JWT creation/verification, bcrypt password hashing
│   ├── models/
│   │   ├── user.py         # User ORM model (id, email, full_name, hashed_password)
│   │   └── message.py      # Message ORM model (id, user_id, role, content, timestamp)
│   ├── routers/
│   │   ├── auth.py         # /api/auth — register, login, /me
│   │   └── chat.py         # /api/chat — AI message endpoint
│   ├── database.py         # Async SQLAlchemy engine + session factory
│   ├── main.py             # FastAPI app creation, middleware, lifespan
│   └── schemas.py          # Pydantic schemas (UserCreate, UserResponse, Token, Message…)
└── requirements.txt
```

---

## 📡 API Endpoints

### Authentication — `/api/auth`
| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user | ❌ |
| `POST` | `/api/auth/login` | Login and receive a JWT | ❌ |
| `GET` | `/api/auth/me` | Get current user profile | ✅ Bearer token |

### Chat — `/api/chat`
| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| `POST` | `/api/chat/message` | Send a message to the AI | ✅ Bearer token |
| `GET` | `/api/chat/history` | Fetch full chat history | ✅ Bearer token |

### Health
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Server uptime check |

---

## 🗄️ Database Models

### `User`
| Column | Type | Notes |
|---|---|---|
| `id` | Integer | Primary key |
| `email` | String | Unique, indexed |
| `full_name` | String | Display name |
| `hashed_password` | String | bcrypt hash |
| `created_at` | DateTime | Auto-set |

### `Message`
| Column | Type | Notes |
|---|---|---|
| `id` | Integer | Primary key |
| `user_id` | Integer | FK → users.id |
| `role` | String | `"user"` or `"assistant"` |
| `content` | Text | Message body |
| `created_at` | DateTime | Auto-set |

---

## 🔐 Security

- **Passwords** are hashed with `bcrypt` (no plaintext ever stored).
- **JWT tokens** are signed with `HS256` using a `SECRET_KEY` environment variable.
- **Token expiry**: 7 days.
- CORS is restricted to the known frontend origins.

---

## ⚙️ Environment Variables

Create a `.env` file in the `backend/` directory:

```env
DATABASE_URL=postgresql+asyncpg://username:password@ep-xxx.region.aws.neon.tech/neondb
SECRET_KEY=your-super-secret-key-here
```

| Variable | Description |
|---|---|
| `DATABASE_URL` | Full async PostgreSQL connection string (NeonDB or local) |
| `SECRET_KEY` | Secret used to sign JWT tokens — keep this secure! |

> If `DATABASE_URL` is not set, the app falls back to a local **SQLite** file (`pitchsap.db`) automatically.

---

## 🚀 Running the Backend

### 1. Prerequisites
- Python 3.10+
- pip

### 2. Create & activate virtual environment

```bash
cd backend
python3 -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Set up environment variables

```bash
# Copy the example and fill in your values
cp .env.example .env
```

### 5. Start the server

```bash
uvicorn app.main:app --reload
```

The server starts at **http://localhost:8000**  
Interactive API docs available at **http://localhost:8000/docs**

### 6. Stop the server

Press `Ctrl + C` in the terminal.

To kill all backend processes at once:
```bash
pkill -f uvicorn
```

---

## 📦 Dependencies

| Package | Purpose |
|---|---|
| `fastapi` | Web framework |
| `uvicorn[standard]` | ASGI server |
| `sqlalchemy` | ORM (async) |
| `asyncpg` | PostgreSQL async driver |
| `aiosqlite` | SQLite async driver (local fallback) |
| `psycopg2-binary` | Sync Postgres driver (optional tooling) |
| `python-jose[cryptography]` | JWT encode/decode |
| `bcrypt` | Password hashing |
| `python-dotenv` | Load `.env` files |
