import uuid
from typing import Any
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from app.core.database import get_db
from app.core.security import verify_password, get_password_hash, create_access_token
from app.models.domain import User, Role
from app.api.deps import get_current_user
from pydantic import BaseModel, EmailStr

router = APIRouter()

class Token(BaseModel):
    access_token: str
    token_type: str

class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    role: str
    is_active: bool

@router.post("/login", response_model=Token)
async def login_access_token(
    db: AsyncSession = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends()
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    # Fetch user by email (OAuth2 form uses 'username' for email)
    result = await db.execute(select(User).where(User.email == form_data.username))
    user = result.scalar_one_or_none()
    
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect email or password")
    elif not user.is_active:
        raise HTTPException(status_code=400, detail="Inactive user")
        
    access_token = create_access_token(user.id)
    return {
        "access_token": access_token,
        "token_type": "bearer",
    }

@router.post("/register", response_model=UserResponse)
async def register_user(
    user_in: UserCreate,
    db: AsyncSession = Depends(get_db)
) -> Any:
    """
    Register a new user. First user defaults to Admin for setup purposes.
    """
    result = await db.execute(select(User).where(User.email == user_in.email))
    if result.scalar_one_or_none():
        raise HTTPException(
            status_code=400,
            detail="The user with this email already exists in the system.",
        )
        
    # Check if any users exist to make the first one an ADMIN
    users_count = await db.execute(select(User))
    is_first_user = len(users_count.scalars().all()) == 0
    
    user = User(
        id=str(uuid.uuid4()),
        email=user_in.email,
        hashed_password=get_password_hash(user_in.password),
        role=Role.ADMIN if is_first_user else Role.USER
    )
    db.add(user)
    await db.commit()
    await db.refresh(user)
    return user

@router.get("/me", response_model=UserResponse)
async def read_user_me(
    current_user: User = Depends(get_current_user)
) -> Any:
    """
    Get current user.
    """
    return current_user
