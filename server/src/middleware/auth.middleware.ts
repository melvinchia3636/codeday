import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/common';
import PocketBaseService from '../config/pocketbase';

/**
 * Extended Request interface with user information
 */
export interface AuthenticatedRequest extends Request {
  userId?: string;
  userToken?: string;
}

/**
 * Authentication Middleware
 *
 * TODO-LIST: Implement actual authentication logic
 * - [ ] Parse JWT token from Authorization header
 * - [ ] Verify token with PocketBase
 * - [ ] Extract user ID from token payload
 * - [ ] Handle token expiration
 * - [ ] Handle refresh tokens if neededD
 */
export const authMiddleware = async (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): Promise<void | Response> => {
  const pb = PocketBaseService.getInstance();

  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      const response: ApiResponse = {
        success: false,
        error: 'Authorization header is required',
      };
      return res.status(401).json(response);
    }

    // Extract token from "Bearer <token>" format
    const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

    if (!token) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid authorization token format',
      };
      return res.status(401).json(response);
    }

    pb.authStore.save(token, null);

    await pb.collection('users').authRefresh({
      requestKey: Math.random(),
    });

    if (!pb.authStore.isValid || !pb.authStore.model?.id) {
      throw new Error('Invalid authentication token');
    }

    req.userToken = token;
    req.userId = pb.authStore.model.id;

    next();
  } catch (error) {
    console.error(error);
    const response: ApiResponse = {
      success: false,
      error: 'Authentication failed',
    };
    return res.status(401).json(response);
  }
};

/**
 * Optional auth middleware - doesn't fail if no auth provided
 * Useful for endpoints that work with or without authentication
 */
export const optionalAuthMiddleware = async (
  req: AuthenticatedRequest,
  _res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.headers.authorization;

    if (authHeader) {
      const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : authHeader;

      if (token) {
        req.userToken = token;
        req.userId = token; // STUB - replace with actual decode logic
      }
    }

    next();
  } catch (error) {
    // Silently continue without auth
    next();
  }
};
