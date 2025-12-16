"""
User repository for data access
"""
from typing import Optional
from pocketbase import PocketBase
from app.core.base_repository import BaseRepository
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate


class UserRepository(BaseRepository[User, UserCreate, UserUpdate]):
    """User repository implementing user-specific data access operations"""
    
    def __init__(self, db: PocketBase):
        """
        Initialize user repository
        
        Args:
            db: PocketBase client instance
        """
        super().__init__(db, "users", User)
    
    def get_by_username(self, username: str) -> Optional[User]:
        """
        Get user by username
        
        Args:
            username: Username to search for
            
        Returns:
            User instance or None if not found
        """
        filter_query = f'username = "{username}"'
        return self.find_one(filter_query)
    
    def get_by_email(self, email: str) -> Optional[User]:
        """
        Get user by email
        
        Args:
            email: Email to search for
            
        Returns:
            User instance or None if not found
        """
        filter_query = f'email = "{email}"'
        return self.find_one(filter_query)
    
    def username_exists(self, username: str, exclude_id: Optional[str] = None) -> bool:
        """
        Check if username already exists
        
        Args:
            username: Username to check
            exclude_id: User ID to exclude from check (for updates)
            
        Returns:
            True if username exists, False otherwise
        """
        filter_query = f'username = "{username}"'
        if exclude_id:
            filter_query += f' && id != "{exclude_id}"'
        return self.count(filter_query) > 0
    
    def email_exists(self, email: str, exclude_id: Optional[str] = None) -> bool:
        """
        Check if email already exists
        
        Args:
            email: Email to check
            exclude_id: User ID to exclude from check (for updates)
            
        Returns:
            True if email exists, False otherwise
        """
        filter_query = f'email = "{email}"'
        if exclude_id:
            filter_query += f' && id != "{exclude_id}"'
        return self.count(filter_query) > 0
    
    def get_verified_users(
        self,
        page: int = 1,
        per_page: int = 30
    ) -> list[User]:
        """
        Get all verified users
        
        Args:
            page: Page number (1-indexed)
            per_page: Number of records per page
            
        Returns:
            List of verified users
        """
        return self.get_all(
            page=page,
            per_page=per_page,
            filters="verified = true"
        )
