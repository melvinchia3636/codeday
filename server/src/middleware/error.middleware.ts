import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/common';

/**
 * Global error handler middleware
 */
export const errorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  console.error('Error.status:', err.status);
  console.error('Error.data:', err.data);
  console.error('Error.data?.data:', err.data?.data);

  // PocketBase errors
  if (err.status && err.data) {
    // Extract field-level errors from PocketBase response
    const fieldErrors: Record<string, string[]> | undefined = err.data.data
      ? Object.fromEntries(
          Object.entries(err.data.data).map(([field, fieldErr]: [string, any]) => [
            field,
            [fieldErr.message || 'Invalid value'],
          ])
        )
      : undefined;

    const response: ApiResponse & { errors?: Record<string, string[]>; message?: string } = {
      success: false,
      error: err.data.message || 'PocketBase error',
      message: err.data.message || 'PocketBase error',
      errors: fieldErrors,
      data: err.data,
    };
    return res.status(err.status).json(response);
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const response: ApiResponse & { message?: string } = {
    success: false,
    error: err.message || 'Internal server error',
    message: err.message || 'Internal server error',
  };

  res.status(statusCode).json(response);
};

/**
 * 404 Not Found handler
 */
export const notFoundHandler = (req: Request, res: Response) => {
  const response: ApiResponse = {
    success: false,
    error: 'Resource not found',
  };
  res.status(404).json(response);
};
