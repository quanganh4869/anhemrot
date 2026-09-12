import uuid
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.domain import Chapter, Story, User
from app.schemas.domain_schemas import ChapterCreate, ChapterUpdate, ChapterResponse
from app.api.deps import get_current_admin

router = APIRouter()

@router.post("/stories/{story_id}/chapters", response_model=ChapterResponse)
async def create_chapter(
    *,
    db: AsyncSession = Depends(get_db),
    story_id: str,
    chapter_in: ChapterCreate,
    current_admin: User = Depends(get_current_admin)
) -> Any:
    # Verify story exists
    result = await db.execute(select(Story).where(Story.id == story_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Story not found")
        
    db_chapter = Chapter(
        id=str(uuid.uuid4()),
        story_id=story_id,
        title=chapter_in.title,
        order=chapter_in.order
    )
    db.add(db_chapter)
    await db.commit()
    await db.refresh(db_chapter)
    return db_chapter

@router.put("/chapters/{chapter_id}", response_model=ChapterResponse)
async def update_chapter(
    *,
    db: AsyncSession = Depends(get_db),
    chapter_id: str,
    chapter_in: ChapterUpdate,
    current_admin: User = Depends(get_current_admin)
) -> Any:
    result = await db.execute(select(Chapter).where(Chapter.id == chapter_id))
    db_chapter = result.scalar_one_or_none()
    if not db_chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
        
    update_data = chapter_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_chapter, field, value)
        
    await db.commit()
    await db.refresh(db_chapter)
    return db_chapter

@router.delete("/chapters/{chapter_id}")
async def delete_chapter(
    *,
    db: AsyncSession = Depends(get_db),
    chapter_id: str,
    current_admin: User = Depends(get_current_admin)
) -> Any:
    result = await db.execute(select(Chapter).where(Chapter.id == chapter_id))
    db_chapter = result.scalar_one_or_none()
    if not db_chapter:
        raise HTTPException(status_code=404, detail="Chapter not found")
        
    await db.delete(db_chapter)
    await db.commit()
    return {"ok": True}
