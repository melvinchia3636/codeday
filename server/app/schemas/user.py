"""
User schemas for request/response validation
"""
from typing import Optional
from pydantic import EmailStr, Field, field_validator
from app.core.base_model import BaseModelSchema
from datetime import datetime


class UserBase(BaseModelSchema):
    """Base user schema with common fields"""
    
    username: str = Field(..., min_length=3, max_length=150, description="Username")
    email: EmailStr = Field(..., description="Email address")
    name: Optional[str] = Field(default=None, max_length=255, description="Full name")
    
    @field_validator('username')
    @classmethod
    def validate_username(cls, v: str) -> str:
        """Validate username format"""
        if not v.replace('_', '').replace('-', '').isalnum():
            raise ValueError('Username must contain only letters, numbers, hyphens, and underscores')
        return v.lower()


class UserCreate(UserBase):
    """Schema for creating a new user"""
    
    password: str = Field(..., min_length=8, max_length=72, description="Password")
    password_confirm: str = Field(..., min_length=8, max_length=72, description="Password confirmation")
    
    @field_validator('password')
    @classmethod
    def validate_password(cls, v: str) -> str:
        """Validate password strength"""
        if len(v) < 8:
            raise ValueError('Password must be at least 8 characters long')
        if not any(c.isupper() for c in v):
            raise ValueError('Password must contain at least one uppercase letter')
        if not any(c.islower() for c in v):
            raise ValueError('Password must contain at least one lowercase letter')
        if not any(c.isdigit() for c in v):
            raise ValueError('Password must contain at least one digit')
        return v


class UserUpdate(BaseModelSchema):
    """Schema for updating a user"""
    
    username: Optional[str] = Field(default=None, min_length=3, max_length=150, description="Username")
    email: Optional[EmailStr] = Field(default=None, description="Email address")
    name: Optional[str] = Field(default=None, max_length=255, description="Full name")
    email_visibility: Optional[bool] = Field(default=None, description="Email visibility")
    
    @field_validator('username')
    @classmethod
    def validate_username(cls, v: Optional[str]) -> Optional[str]:
        """Validate username format"""
        if v is not None:
            if not v.replace('_', '').replace('-', '').isalnum():
                raise ValueError('Username must contain only letters, numbers, hyphens, and underscores')
            return v.lower()
        return v


class UserResponse(BaseModelSchema):
    """Schema for user response"""
    
    id: str = Field(..., description="User ID")
    username: str = Field(..., description="Username")
    email: EmailStr = Field(..., description="Email address")
    name: Optional[str] = Field(default=None, description="Full name")
    avatar: Optional[str] = Field(default=None, description="Avatar URL")
    verified: bool = Field(default=False, description="Email verification status")
    email_visibility: bool = Field(default=False, description="Email visibility")
    created: datetime = Field(..., description="Creation timestamp")
    updated: datetime = Field(..., description="Last update timestamp")


class UserListResponse(BaseModelSchema):
    """Schema for paginated user list response"""
    
    page: int = Field(..., description="Current page number")
    per_page: int = Field(..., description="Items per page")
    total_items: int = Field(..., description="Total number of items")
    total_pages: int = Field(..., description="Total number of pages")
    items: list[UserResponse] = Field(..., description="List of users")


class PasswordChange(BaseModelSchema):
    """Schema for password change"""
    
    old_password: str = Field(..., min_length=8, max_length=72, description="Current password")
    password: str = Field(..., min_length=8, max_length=72, description="New password")
    password_confirm: str = Field(..., min_length=8, max_length=72, description="New password confirmation")


class UserLogin(BaseModelSchema):
    """Schema for user login"""
    
    identity: str = Field(..., description="Username or email")
    password: str = Field(..., description="Password")


class TokenResponse(BaseModelSchema):
    """Schema for authentication token response"""
    
    token: str = Field(..., description="Authentication token")
    user: UserResponse = Field(..., description="User information")
