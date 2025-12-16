// Common types used across the application

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
}

export interface QueryParams {
  sort?: string;
  filter?: string;
}
