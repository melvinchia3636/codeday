import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/common';

/**
 * Global error handler middleware
 */
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);

  // PocketBase errors
  if (err.status && err.data) {
    const response: ApiResponse = {
      success: false,
      error: err.data.message || 'PocketBase error',
      data: err.data,
    };
    return res.status(err.status).json(response);
  }

  // Default error response
  const statusCode = err.statusCode || 500;
  const response: ApiResponse = {
    success: false,
    error: err.message || 'Internal server error',
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
