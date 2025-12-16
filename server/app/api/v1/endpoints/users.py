"""
User API endpoints
"""
from typing import List, Optional
from fastapi import APIRouter, Depends, Query, status
from pocketbase import PocketBase

from app.core.database import get_db
from app.repositories.user import UserRepository
from app.services.user import UserService
from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserResponse,
    UserLogin,
    TokenResponse
)

router = APIRouter()


def get_user_service(db: PocketBase = Depends(get_db)) -> UserService:
    """Dependency to get user service"""
    repository = UserRepository(db)
    return UserService(repository)


@router.post(
    "/",
    response_model=UserResponse,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new user",
    description="Register a new user account"
)
def create_user(
    user_data: UserCreate,
    service: UserService = Depends(get_user_service)
) -> UserResponse:
    """
    Create a new user account
    
    - **username**: Unique username (3-150 characters)
    - **email**: Valid email address
    - **password**: Strong password (min 8 characters, uppercase, lowercase, digit)
    - **password_confirm**: Password confirmation
    - **name**: Optional full name
    """
    user = service.create(user_data)
    return UserResponse(**user.model_dump())


@router.post(
    "/login",
    response_model=TokenResponse,
    summary="Login user",
    description="Authenticate user and get access token"
)
def login_user(
    login_data: UserLogin,
    service: UserService = Depends(get_user_service)
):
    """
    Authenticate user with username/email and password
    
    - **identity**: Username or email
    - **password**: User password
    
    Returns authentication token and user information
    """
    from fastapi import HTTPException
    
    auth_result = service.authenticate(login_data.identity, login_data.password)
    if not auth_result:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    return TokenResponse(
        token=auth_result["token"],
        user=UserResponse(**auth_result["user"].model_dump())
    )


@router.get(
    "/",
    response_model=List[UserResponse],
    summary="Get all users",
    description="Retrieve a paginated list of users"
)
def get_users(
    page: int = Query(1, ge=1, description="Page number"),
    per_page: int = Query(30, ge=1, le=100, description="Items per page"),
    sort: str = Query("-created", description="Sort order"),
    verified_only: bool = Query(False, description="Get only verified users"),
    service: UserService = Depends(get_user_service)
) -> List[UserResponse]:
    """
    Get all users with pagination
    
    - **page**: Page number (default: 1)
    - **per_page**: Items per page (default: 30, max: 100)
    - **sort**: Sort order (default: -created)
    - **verified_only**: Filter for verified users only
    """
    if verified_only:
        users = service.get_verified_users(page=page, per_page=per_page)
    else:
        users = service.get_all(page=page, per_page=per_page, sort=sort)
    
    return [UserResponse(**user.model_dump()) for user in users]


@router.get(
    "/{user_id}",
    response_model=UserResponse,
    summary="Get user by ID",
    description="Retrieve a specific user by their ID"
)
def get_user(
    user_id: str,
    service: UserService = Depends(get_user_service)
) -> UserResponse:
    """
    Get a specific user by ID
    
    - **user_id**: User ID
    """
    user = service.get_by_id(user_id)
    return UserResponse(**user.model_dump())


@router.get(
    "/username/{username}",
    response_model=UserResponse,
    summary="Get user by username",
    description="Retrieve a specific user by their username"
)
def get_user_by_username(
    username: str,
    service: UserService = Depends(get_user_service)
) -> UserResponse:
    """
    Get a specific user by username
    
    - **username**: Username
    """
    from fastapi import HTTPException
    
    user = service.get_by_username(username)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with username '{username}' not found"
        )
    return UserResponse(**user.model_dump())


@router.patch(
    "/{user_id}",
    response_model=UserResponse,
    summary="Update user",
    description="Update user information"
)
def update_user(
    user_id: str,
    user_data: UserUpdate,
    service: UserService = Depends(get_user_service)
) -> UserResponse:
    """
    Update user information
    
    - **user_id**: User ID
    - **username**: New username (optional)
    - **email**: New email (optional)
    - **name**: New name (optional)
    - **email_visibility**: Email visibility setting (optional)
    """
    user = service.update(user_id, user_data)
    return UserResponse(**user.model_dump())


@router.delete(
    "/{user_id}",
    status_code=status.HTTP_204_NO_CONTENT,
    summary="Delete user",
    description="Delete a user account"
)
def delete_user(
    user_id: str,
    service: UserService = Depends(get_user_service)
):
    """
    Delete a user account
    
    - **user_id**: User ID
    """
    service.delete(user_id)
    return None


@router.get(
    "/count/total",
    response_model=dict,
    summary="Get total user count",
    description="Get the total number of users"
)
def get_user_count(
    verified_only: bool = Query(False, description="Count only verified users"),
    service: UserService = Depends(get_user_service)
) -> dict:
    """
    Get total user count
    
    - **verified_only**: Count only verified users
    """
    filters = "verified = true" if verified_only else None
    count = service.count(filters)
    return {"total": count, "verified_only": verified_only}
