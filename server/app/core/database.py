"""
PocketBase database connection and management
"""
from pocketbase import PocketBase
from app.config import settings
from typing import Optional


class DatabaseConnection:
    """Singleton class for managing PocketBase connection"""
    
    _instance: Optional['DatabaseConnection'] = None
    _client: Optional[PocketBase] = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
        return cls._instance
    
    def __init__(self):
        """Initialize PocketBase client"""
        if self._client is None:
            self._client = PocketBase(settings.POCKETBASE_URL)
    
    @property
    def client(self) -> PocketBase:
        """Get PocketBase client instance"""
        if self._client is None:
            self._client = PocketBase(settings.POCKETBASE_URL)
        return self._client
    
    def authenticate_admin(self) -> bool:
        """Authenticate as admin if credentials are provided"""
        if settings.POCKETBASE_ADMIN_EMAIL and settings.POCKETBASE_ADMIN_PASSWORD:
            try:
                self._client.admins.auth_with_password(
                    settings.POCKETBASE_ADMIN_EMAIL,
                    settings.POCKETBASE_ADMIN_PASSWORD
                )
                return True
            except Exception as e:
                print(f"Admin authentication failed: {e}")
                return False
        return False
    
    def disconnect(self):
        """Disconnect from PocketBase"""
        if self._client:
            self._client = None


# Global database connection instance
db_connection = DatabaseConnection()


def get_db() -> PocketBase:
    """Dependency to get database client"""
    return db_connection.client
