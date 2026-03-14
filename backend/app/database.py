import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import declarative_base

# The NeonDB connection string provided via environment variables
# e.g. postgresql+asyncpg://user:password@ep-name.region.aws.neon.tech/neondb
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite+aiosqlite:///./pitchsap.db")

engine = create_async_engine(
    DATABASE_URL,
    echo=False,
    # SSL is required for Neon
    connect_args={"ssl": "require"} if "neon.tech" in DATABASE_URL else {}
)

AsyncSessionLocal = async_sessionmaker(
    engine, class_=AsyncSession, expire_on_commit=False
)

Base = declarative_base()

# Dependency for FastAPI
async def get_db():
    async with AsyncSessionLocal() as session:
         yield session
