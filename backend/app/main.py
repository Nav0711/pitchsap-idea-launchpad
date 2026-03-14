from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import auth, chat
from .database import engine, Base

# Create tables
# Note: For production, use Alembic migrations instead of this.
# But for this demo, we can let SQLAlchemy create tables on startup.
import asyncio
from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
    yield

app = FastAPI(title="Pitchsap API", lifespan=lifespan)

# CORS configuration to allow the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(chat.router, prefix="/api/chat", tags=["Chat"])

@app.get("/api/health")
async def health_check():
    return {"status": "ok", "message": "Pitchsap backend is running"}
