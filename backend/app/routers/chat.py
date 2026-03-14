from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import desc
from typing import List
import asyncio

from ..database import get_db
from ..models.message import Message
from ..models.user import User
from ..schemas import MessageCreate, MessageResponse
from ..core.security import get_current_user

router = APIRouter()

@router.get("/history", response_model=List[MessageResponse])
async def get_chat_history(
    limit: int = 50,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Fetch recent messages for the authenticated user"""
    # Using window function or order_by to get latest, then reverse in Python or subquery
    result = await db.execute(
        select(Message)
        .where(Message.user_id == current_user.id)
        .order_by(Message.created_at.asc())
        .limit(limit)
    )
    messages = result.scalars().all()
    return messages

@router.post("/send", response_model=MessageResponse)
async def send_message(
    msg: MessageCreate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Save user message, and generate a basic mock AI response to demo interaction"""
    
    # 1. Save the user's message
    user_msg = Message(
        user_id=current_user.id,
        content=msg.content,
        sender_type="user"
    )
    db.add(user_msg)
    await db.commit()
    await db.refresh(user_msg)
    
    # In a real app, you would pass the message to an LLM / AI worker here
    # For now we create a mock "pitching expert" reply based on length.
    
    # 2. Add an AI response asynchronously
    asyncio.create_task(generate_ai_response(current_user.id, user_msg.content, db))
    
    return user_msg

# Helper for fake AI processing
async def generate_ai_response(user_id: int, user_content: str, db: AsyncSession):
    # Simulate processing delay
    await asyncio.sleep(1.5)
    
    response_text = "That's an interesting point."
    if "?" in user_content:
        response_text = "Great question! When validating that, you should look at user acquisition costs first."
    elif len(user_content) > 50:
        response_text = "I see exactly where you're going. Let's break down the go-to-market strategy for that feature specifically."
    
    ai_msg = Message(
        user_id=user_id,
        content=response_text,
        sender_type="ai"
    )
    db.add(ai_msg)
    await db.commit()
