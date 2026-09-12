import uuid
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy.orm import selectinload

from app.core.database import get_db
from app.models.domain import Story, User
from app.schemas.domain_schemas import StoryCreate, StoryUpdate, StoryResponse
from app.api.deps import get_current_admin, get_current_user

router = APIRouter()

@router.get("/", response_model=List[StoryResponse])
async def list_stories(
    db: AsyncSession = Depends(get_db),
    skip: int = 0,
    limit: int = 100
) -> Any:
    """Retrieve all public/published stories (no auth required)."""
    # For now, return all stories. In prod, filter by status="published" for public readers.
    query = select(Story).options(selectinload(Story.chapters)).offset(skip).limit(limit)
    result = await db.execute(query)
    stories = result.scalars().all()
    return stories

@router.get("/admin", response_model=List[StoryResponse])
async def list_stories_admin(
    db: AsyncSession = Depends(get_db),
    current_admin: User = Depends(get_current_admin)
) -> Any:
    """Retrieve all stories for admin dashboard."""
    query = select(Story).options(selectinload(Story.chapters))
    result = await db.execute(query)
    return result.scalars().all()

@router.get("/{slug}", response_model=StoryResponse)
async def get_story(
    slug: str,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """Get a specific story by slug (public)."""
    # Note: Added selectinload chaining for deep relations to prevent N+1
    query = select(Story).where(Story.slug == slug).options(
        selectinload(Story.chapters).selectinload(Story.chapters.prop.mapper.class_.scenes)
    )
    result = await db.execute(query)
    story = result.scalar_one_or_none()
    
    if not story:
        raise HTTPException(status_code=404, detail="Story not found")
    return story

@router.post("/", response_model=StoryResponse)
async def create_story(
    *,
    db: AsyncSession = Depends(get_db),
    story_in: StoryCreate,
    current_admin: User = Depends(get_current_admin)
) -> Any:
    """Create a new story (Admin only)."""
    # Check if slug exists
    query = select(Story).where(Story.slug == story_in.slug)
    result = await db.execute(query)
    if result.scalar_one_or_none():
        raise HTTPException(status_code=400, detail="Slug already exists")

    db_story = Story(
        id=str(uuid.uuid4()),
        title=story_in.title,
        slug=story_in.slug,
        description=story_in.description,
        status=story_in.status
    )
    db.add(db_story)
    await db.commit()
    await db.refresh(db_story)
    return db_story

@router.put("/{story_id}", response_model=StoryResponse)
async def update_story(
    *,
    db: AsyncSession = Depends(get_db),
    story_id: str,
    story_in: StoryUpdate,
    current_admin: User = Depends(get_current_admin)
) -> Any:
    """Update a story (Admin only)."""
    query = select(Story).where(Story.id == story_id)
    result = await db.execute(query)
    db_story = result.scalar_one_or_none()
    
    if not db_story:
        raise HTTPException(status_code=404, detail="Story not found")
        
    update_data = story_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_story, field, value)
        
    await db.commit()
    await db.refresh(db_story)
    return db_story
