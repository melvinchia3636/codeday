"""
User service for business logic
"""
from typing import Optional
from fastapi import HTTPException, status
from app.core.base_service import BaseService
from app.models.user import User
from app.schemas.user import UserCreate, UserUpdate
from app.repositories.user import UserRepository


class UserService(BaseService[User, UserCreate, UserUpdate, UserRepository]):
    """User service implementing user-specific business logic"""
    
    def __init__(self, repository: UserRepository):
        """
        Initialize user service
        
        Args:
            repository: User repository instance
        """
        super().__init__(repository)
    
    def create(self, data: UserCreate) -> User:
        """
        Create a new user with validation
        
        Args:
            data: User creation data
            
        Returns:
            Created user instance
            
        Raises:
            HTTPException: If validation fails or user already exists
        """
        # Validate password confirmation
        if data.password != data.password_confirm:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Passwords do not match"
            )
        
        # Check if username already exists
        if self.repository.username_exists(data.username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Username '{data.username}' is already taken"
            )
        
        # Check if email already exists
        if self.repository.email_exists(data.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Email '{data.email}' is already registered"
            )
        
        # Create user
        try:
            return self.repository.create(data)
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to create user: {str(e)}"
            )
    
    def get_by_id(self, user_id: str) -> User:
        """
        Get user by ID with error handling
        
        Args:
            user_id: User ID
            
        Returns:
            User instance
            
        Raises:
            HTTPException: If user not found
        """
        user = self.repository.get_by_id(user_id)
        if not user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with ID '{user_id}' not found"
            )
        return user
    
    def get_by_username(self, username: str) -> Optional[User]:
        """
        Get user by username
        
        Args:
            username: Username
            
        Returns:
            User instance or None if not found
        """
        return self.repository.get_by_username(username)
    
    def get_by_email(self, email: str) -> Optional[User]:
        """
        Get user by email
        
        Args:
            email: Email address
            
        Returns:
            User instance or None if not found
        """
        return self.repository.get_by_email(email)
    
    def update(self, user_id: str, data: UserUpdate) -> User:
        """
        Update user with validation
        
        Args:
            user_id: User ID
            data: User update data
            
        Returns:
            Updated user instance
            
        Raises:
            HTTPException: If validation fails or user not found
        """
        # Check if user exists
        existing_user = self.repository.get_by_id(user_id)
        if not existing_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with ID '{user_id}' not found"
            )
        
        # Check if username is being changed and if it's available
        if data.username and data.username != existing_user.username:
            if self.repository.username_exists(data.username, exclude_id=user_id):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Username '{data.username}' is already taken"
                )
        
        # Check if email is being changed and if it's available
        if data.email and data.email != existing_user.email:
            if self.repository.email_exists(data.email, exclude_id=user_id):
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"Email '{data.email}' is already registered"
                )
        
        # Update user
        try:
            updated_user = self.repository.update(user_id, data)
            if not updated_user:
                raise HTTPException(
                    status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                    detail="Failed to update user"
                )
            return updated_user
        except HTTPException:
            raise
        except Exception as e:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to update user: {str(e)}"
            )
    
    def delete(self, user_id: str) -> bool:
        """
        Delete user with error handling
        
        Args:
            user_id: User ID
            
        Returns:
            True if deleted successfully
            
        Raises:
            HTTPException: If user not found or deletion fails
        """
        # Check if user exists
        existing_user = self.repository.get_by_id(user_id)
        if not existing_user:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"User with ID '{user_id}' not found"
            )
        
        # Delete user
        success = self.repository.delete(user_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to delete user"
            )
        return success
    
    def authenticate(self, identity: str, password: str) -> Optional[dict]:
        """
        Authenticate user with username/email and password
        
        Args:
            identity: Username or email
            password: Password
            
        Returns:
            Authentication result with user and token, or None if authentication fails
        """
        try:
            # Try to authenticate with PocketBase
            auth_data = self.repository.db.collection("users").auth_with_password(
                identity,
                password
            )
            return {
                "token": auth_data.token,
                "user": self.repository._record_to_model(auth_data.record)
            }
        except Exception:
            return None
    
    def get_verified_users(
        self,
        page: int = 1,
        per_page: int = 30
    ) -> list[User]:
        """
        Get all verified users
        
        Args:
            page: Page number
            per_page: Items per page
            
        Returns:
            List of verified users
        """
        return self.repository.get_verified_users(page=page, per_page=per_page)
