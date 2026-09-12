from pydantic import BaseModel, ConfigDict
from typing import Optional, List, Any, Dict
from datetime import datetime

# --- SCENES ---
class SceneBase(BaseModel):
    order: int
    config_json: Dict[str, Any]

class SceneCreate(SceneBase):
    chapter_id: Optional[str] = None

class SceneUpdate(BaseModel):
    order: Optional[int] = None
    config_json: Optional[Dict[str, Any]] = None

class SceneResponse(SceneBase):
    id: str
    story_id: str
    chapter_id: Optional[str]
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


# --- CHAPTERS ---
class ChapterBase(BaseModel):
    title: str
    order: int

class ChapterCreate(ChapterBase):
    pass

class ChapterUpdate(BaseModel):
    title: Optional[str] = None
    order: Optional[int] = None

class ChapterResponse(ChapterBase):
    id: str
    story_id: str
    created_at: datetime
    scenes: List[SceneResponse] = []
    
    model_config = ConfigDict(from_attributes=True)


# --- STORIES ---
class StoryBase(BaseModel):
    title: str
    slug: str
    description: Optional[str] = None
    status: str = "draft"

class StoryCreate(StoryBase):
    pass

class StoryUpdate(BaseModel):
    title: Optional[str] = None
    slug: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class StoryResponse(StoryBase):
    id: str
    created_at: datetime
    chapters: List[ChapterResponse] = []
    
    model_config = ConfigDict(from_attributes=True)
