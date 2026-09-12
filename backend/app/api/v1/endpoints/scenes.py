import uuid
from typing import Any, List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select

from app.core.database import get_db
from app.models.domain import Scene, Story, User
from app.schemas.domain_schemas import SceneCreate, SceneUpdate, SceneResponse
from app.api.deps import get_current_admin

router = APIRouter()

@router.post("/stories/{story_id}/scenes", response_model=SceneResponse)
async def create_scene(
    *,
    db: AsyncSession = Depends(get_db),
    story_id: str,
    scene_in: SceneCreate,
    current_admin: User = Depends(get_current_admin)
) -> Any:
    # Verify story exists
    result = await db.execute(select(Story).where(Story.id == story_id))
    if not result.scalar_one_or_none():
        raise HTTPException(status_code=404, detail="Story not found")
        
    db_scene = Scene(
        id=str(uuid.uuid4()),
        story_id=story_id,
        chapter_id=scene_in.chapter_id,
        order=scene_in.order,
        config_json=scene_in.config_json
    )
    db.add(db_scene)
    await db.commit()
    await db.refresh(db_scene)
    return db_scene

@router.put("/scenes/{scene_id}", response_model=SceneResponse)
async def update_scene(
    *,
    db: AsyncSession = Depends(get_db),
    scene_id: str,
    scene_in: SceneUpdate,
    current_admin: User = Depends(get_current_admin)
) -> Any:
    result = await db.execute(select(Scene).where(Scene.id == scene_id))
    db_scene = result.scalar_one_or_none()
    if not db_scene:
        raise HTTPException(status_code=404, detail="Scene not found")
        
    update_data = scene_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_scene, field, value)
        
    await db.commit()
    await db.refresh(db_scene)
    return db_scene

@router.delete("/scenes/{scene_id}")
async def delete_scene(
    *,
    db: AsyncSession = Depends(get_db),
    scene_id: str,
    current_admin: User = Depends(get_current_admin)
) -> Any:
    result = await db.execute(select(Scene).where(Scene.id == scene_id))
    db_scene = result.scalar_one_or_none()
    if not db_scene:
        raise HTTPException(status_code=404, detail="Scene not found")
        
    await db.delete(db_scene)
    await db.commit()
    return {"ok": True}
