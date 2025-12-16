"""
User domain model
"""
from typing import Optional
from pydantic import EmailStr, Field
from app.core.base_model import BaseDBModel


class User(BaseDBModel):
    """User domain model"""
    
    username: str = Field(..., min_length=3, max_length=150, description="Username")
    email: EmailStr = Field(..., description="Email address")
    name: Optional[str] = Field(default=None, max_length=255, description="Full name")
    avatar: Optional[str] = Field(default=None, description="Avatar URL")
    verified: bool = Field(default=False, description="Email verification status")
    email_visibility: bool = Field(default=False, description="Email visibility")
    
    # Note: password is not included in the model for security reasons
    # It's handled separately during authentication
