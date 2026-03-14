from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List

# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: int
    created_at: datetime
    
    model_config = {"from_attributes": True}

# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# Chat Message Schemas
class MessageBase(BaseModel):
    content: str
    sender_type: str # 'user', 'ai', 'expert'

class MessageCreate(MessageBase):
    pass

class MessageResponse(MessageBase):
    id: int
    user_id: int
    created_at: datetime

    model_config = {"from_attributes": True}
