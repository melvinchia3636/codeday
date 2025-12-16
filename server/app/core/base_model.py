"""
Abstract base model for all domain models
"""
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from datetime import datetime


class BaseModelSchema(BaseModel):
    """Base schema for all models with common fields"""
    
    model_config = ConfigDict(
        from_attributes=True,
        validate_assignment=True,
        arbitrary_types_allowed=True,
        populate_by_name=True
    )


class BaseDBModel(BaseModelSchema):
    """Base model for database entities with common PocketBase fields"""
    
    id: Optional[str] = Field(default=None, description="Record ID")
    created: Optional[datetime] = Field(default=None, description="Creation timestamp")
    updated: Optional[datetime] = Field(default=None, description="Last update timestamp")
    
    model_config = ConfigDict(
        from_attributes=True,
        validate_assignment=True,
        arbitrary_types_allowed=True,
        populate_by_name=True
    )
