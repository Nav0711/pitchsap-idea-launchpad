from sqlalchemy import Column, Integer, String, DateTime, ForeignKey, Text
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from ..database import Base

class Message(Base):
    __tablename__ = "messages"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), index=True, nullable=False)
    content = Column(Text, nullable=False)
    sender_type = Column(String, nullable=False) # 'user', 'ai', 'expert'
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    # We won't strictly enforce relationship fetching for chat speed,
    # but defining it here is good practice.
    # user = relationship("User")
