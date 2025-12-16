"""
Abstract base service for business logic layer
"""
from abc import ABC
from typing import Generic, TypeVar, Optional, List
from pydantic import BaseModel
from app.core.base_repository import BaseRepository


ModelType = TypeVar("ModelType", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)
RepositoryType = TypeVar("RepositoryType", bound=BaseRepository)


class BaseService(ABC, Generic[ModelType, CreateSchemaType, UpdateSchemaType, RepositoryType]):
    """
    Abstract base service implementing common business logic operations
    
    Type Parameters:
        ModelType: The domain model type
        CreateSchemaType: Schema for creating new records
        UpdateSchemaType: Schema for updating existing records
        RepositoryType: Repository type for data access
    """
    
    def __init__(self, repository: RepositoryType):
        """
        Initialize service
        
        Args:
            repository: Repository instance for data access
        """
        self.repository = repository
    
    def create(self, data: CreateSchemaType) -> ModelType:
        """
        Create a new entity
        
        Args:
            data: Data for creating the entity
            
        Returns:
            Created model instance
        """
        return self.repository.create(data)
    
    def get_by_id(self, entity_id: str) -> Optional[ModelType]:
        """
        Get an entity by ID
        
        Args:
            entity_id: Entity ID
            
        Returns:
            Model instance or None if not found
        """
        return self.repository.get_by_id(entity_id)
    
    def get_all(
        self,
        page: int = 1,
        per_page: int = 30,
        sort: str = "-created",
        filters: Optional[str] = None
    ) -> List[ModelType]:
        """
        Get all entities with pagination
        
        Args:
            page: Page number (1-indexed)
            per_page: Number of records per page
            sort: Sort order
            filters: Filter query
            
        Returns:
            List of model instances
        """
        return self.repository.get_all(
            page=page,
            per_page=per_page,
            sort=sort,
            filters=filters
        )
    
    def update(self, entity_id: str, data: UpdateSchemaType) -> Optional[ModelType]:
        """
        Update an entity
        
        Args:
            entity_id: Entity ID
            data: Data for updating the entity
            
        Returns:
            Updated model instance or None if not found
        """
        return self.repository.update(entity_id, data)
    
    def delete(self, entity_id: str) -> bool:
        """
        Delete an entity
        
        Args:
            entity_id: Entity ID
            
        Returns:
            True if deleted successfully, False otherwise
        """
        return self.repository.delete(entity_id)
    
    def count(self, filters: Optional[str] = None) -> int:
        """
        Count entities matching the filter
        
        Args:
            filters: Filter query
            
        Returns:
            Number of entities
        """
        return self.repository.count(filters)
