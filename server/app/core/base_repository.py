"""
Abstract base repository for data access layer
"""
from abc import ABC, abstractmethod
from typing import Generic, TypeVar, Optional, List, Dict, Any
from pocketbase import PocketBase
from pydantic import BaseModel


ModelType = TypeVar("ModelType", bound=BaseModel)
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)


class BaseRepository(ABC, Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    """
    Abstract base repository implementing common CRUD operations
    
    Type Parameters:
        ModelType: The domain model type
        CreateSchemaType: Schema for creating new records
        UpdateSchemaType: Schema for updating existing records
    """
    
    def __init__(self, db: PocketBase, collection_name: str, model_class: type[ModelType]):
        """
        Initialize repository
        
        Args:
            db: PocketBase client instance
            collection_name: Name of the PocketBase collection
            model_class: Model class for type conversion
        """
        self.db = db
        self.collection_name = collection_name
        self.model_class = model_class
    
    def _record_to_model(self, record: Any) -> ModelType:
        """Convert PocketBase record to domain model"""
        if hasattr(record, '__dict__'):
            record_dict = record.__dict__
        else:
            record_dict = dict(record)
        return self.model_class(**record_dict)
    
    def create(self, data: CreateSchemaType) -> ModelType:
        """
        Create a new record
        
        Args:
            data: Data for creating the record
            
        Returns:
            Created model instance
        """
        record_data = data.model_dump(exclude_none=True)
        record = self.db.collection(self.collection_name).create(record_data)
        return self._record_to_model(record)
    
    def get_by_id(self, record_id: str) -> Optional[ModelType]:
        """
        Get a record by ID
        
        Args:
            record_id: Record ID
            
        Returns:
            Model instance or None if not found
        """
        try:
            record = self.db.collection(self.collection_name).get_one(record_id)
            return self._record_to_model(record)
        except Exception:
            return None
    
    def get_all(
        self, 
        page: int = 1, 
        per_page: int = 30,
        sort: str = "-created",
        filters: Optional[str] = None
    ) -> List[ModelType]:
        """
        Get all records with pagination
        
        Args:
            page: Page number (1-indexed)
            per_page: Number of records per page
            sort: Sort order (e.g., '-created', 'name')
            filters: PocketBase filter query
            
        Returns:
            List of model instances
        """
        result = self.db.collection(self.collection_name).get_list(
            page=page,
            per_page=per_page,
            query_params={
                "sort": sort,
                "filter": filters or ""
            }
        )
        return [self._record_to_model(record) for record in result.items]
    
    def update(self, record_id: str, data: UpdateSchemaType) -> Optional[ModelType]:
        """
        Update a record
        
        Args:
            record_id: Record ID
            data: Data for updating the record
            
        Returns:
            Updated model instance or None if not found
        """
        try:
            record_data = data.model_dump(exclude_none=True)
            record = self.db.collection(self.collection_name).update(record_id, record_data)
            return self._record_to_model(record)
        except Exception:
            return None
    
    def delete(self, record_id: str) -> bool:
        """
        Delete a record
        
        Args:
            record_id: Record ID
            
        Returns:
            True if deleted successfully, False otherwise
        """
        try:
            self.db.collection(self.collection_name).delete(record_id)
            return True
        except Exception:
            return False
    
    def find_one(self, filters: str) -> Optional[ModelType]:
        """
        Find one record matching the filter
        
        Args:
            filters: PocketBase filter query
            
        Returns:
            Model instance or None if not found
        """
        try:
            record = self.db.collection(self.collection_name).get_first_list_item(filters)
            return self._record_to_model(record)
        except Exception:
            return None
    
    def count(self, filters: Optional[str] = None) -> int:
        """
        Count records matching the filter
        
        Args:
            filters: PocketBase filter query
            
        Returns:
            Number of records
        """
        try:
            result = self.db.collection(self.collection_name).get_list(
                page=1,
                per_page=1,
                query_params={"filter": filters or ""}
            )
            return result.total_items
        except Exception:
            return 0
