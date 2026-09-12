import uuid
from datetime import datetime
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime, Text, Enum
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import relationship
from app.core.database import Base
import enum

class StatusEnum(str, enum.Enum):
    DRAFT = "draft"
    PUBLISHED = "published"
    ARCHIVED = "archived"

class AssetTypeEnum(str, enum.Enum):
    IMAGE = "image"
    AUDIO = "audio"
    PDF = "pdf"
    VIDEO = "video"

class LayerTypeEnum(str, enum.Enum):
    BACKGROUND = "background"
    CHARACTER = "character"
    DIALOGUE = "dialogue"
    OBJECT = "object"
    TEXT = "text"

class User(Base):
    __tablename__ = "users"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(255))
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

    stories = relationship("Story", back_populates="author")

class Story(Base):
    __tablename__ = "stories"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    slug = Column(String(255), unique=True, index=True, nullable=False)
    description = Column(Text)
    status = Column(Enum(StatusEnum), default=StatusEnum.DRAFT)
    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    cover_image_url = Column(String(500))
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    author = relationship("User", back_populates="stories")
    chapters = relationship("Chapter", back_populates="story", cascade="all, delete-orphan", order_by="Chapter.order_index")

class Chapter(Base):
    __tablename__ = "chapters"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    story_id = Column(UUID(as_uuid=True), ForeignKey("stories.id", ondelete="CASCADE"), nullable=False)
    title = Column(String(255))
    order_index = Column(Integer, nullable=False, default=0)
    status = Column(Enum(StatusEnum), default=StatusEnum.DRAFT)
    
    story = relationship("Story", back_populates="chapters")
    scenes = relationship("Scene", back_populates="chapter", cascade="all, delete-orphan", order_by="Scene.order_index")

class Asset(Base):
    __tablename__ = "assets"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    type = Column(Enum(AssetTypeEnum), nullable=False)
    url = Column(String(1000), nullable=False)
    filename = Column(String(255))
    created_at = Column(DateTime, default=datetime.utcnow)

class Scene(Base):
    __tablename__ = "scenes"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    chapter_id = Column(UUID(as_uuid=True), ForeignKey("chapters.id", ondelete="CASCADE"), nullable=False)
    order_index = Column(Integer, nullable=False, default=0)
    scroll_duration = Column(Integer, default=8, comment="Viewport height multiplier for scroll scrub")
    status = Column(Enum(StatusEnum), default=StatusEnum.DRAFT)
    camera_config = Column(JSONB, default=lambda: {})
    
    chapter = relationship("Chapter", back_populates="scenes")
    layers = relationship("SceneLayer", back_populates="scene", cascade="all, delete-orphan", order_by="SceneLayer.z_index")

class SceneLayer(Base):
    __tablename__ = "scene_layers"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    scene_id = Column(UUID(as_uuid=True), ForeignKey("scenes.id", ondelete="CASCADE"), nullable=False)
    asset_id = Column(UUID(as_uuid=True), ForeignKey("assets.id", ondelete="SET NULL"), nullable=True)
    layer_type = Column(Enum(LayerTypeEnum), nullable=False)
    z_index = Column(Integer, default=10)
    
    # Store text content, specific styling (x, y, scale, rotation, font_size, etc)
    content = Column(JSONB, default=lambda: {})
    
    # Store GSAP animation configurations (preset, duration, delay, start, end)
    animation_config = Column(JSONB, default=lambda: {})

    scene = relationship("Scene", back_populates="layers")
    asset = relationship("Asset")
