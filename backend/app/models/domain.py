from datetime import datetime
from enum import Enum
from typing import Optional, List, Dict, Any
from sqlalchemy import Column, String, Integer, DateTime, Boolean, ForeignKey, JSON, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class JobStatus(str, Enum):
    PENDING = "pending"
    PROCESSING = "processing"
    COMPLETED = "completed"
    FAILED = "failed"

class ImportJob(Base):
    __tablename__ = "import_jobs"

    id = Column(String, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    status = Column(String, default=JobStatus.PENDING)
    progress = Column(Integer, default=0) # 0 to 100
    error_message = Column(Text, nullable=True)
    result_metadata = Column(JSON, nullable=True) # Info about extracted pages/assets
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

class Asset(Base):
    __tablename__ = "assets"

    id = Column(String, primary_key=True, index=True)
    filename = Column(String, nullable=False)
    storage_url = Column(String, nullable=False) # object key or public URL
    mime_type = Column(String, nullable=False)
    width = Column(Integer, nullable=True)
    height = Column(Integer, nullable=True)
    file_size = Column(Integer, nullable=False) # bytes
    
    # Optional relation to the job that created it
    import_job_id = Column(String, ForeignKey("import_jobs.id"), nullable=True)
    
    created_at = Column(DateTime, default=datetime.utcnow)
    
    job = relationship("ImportJob")

# Story models placeholders from previous architecture...
class Story(Base):
    __tablename__ = "stories"
    id = Column(String, primary_key=True, index=True)
    title = Column(String, nullable=False)
    slug = Column(String, unique=True, index=True)
    description = Column(Text)
    status = Column(String, default="draft")
    created_at = Column(DateTime, default=datetime.utcnow)

class Scene(Base):
    __tablename__ = "scenes"
    id = Column(String, primary_key=True, index=True)
    story_id = Column(String, ForeignKey("stories.id"))
    chapter_id = Column(String, nullable=True)
    order = Column(Integer, default=0)
    config_json = Column(JSON, nullable=False) # Validated by Zod on frontend
    created_at = Column(DateTime, default=datetime.utcnow)
