import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/common';

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
    const token = authHeader.startsWith('Bearer ')
      ? authHeader.slice(7)
      : authHeader;

    if (!token) {
      const response: ApiResponse = {
        success: false,
        error: 'Invalid authorization token format',
      };
      return res.status(401).json(response);
    }

    /**
     * TODO-LIST: Implement actual token verification
     * - [ ] Use PocketBase SDK to verify token
     * - [ ] Example: await pb.authStore.loadFromCookie(token) or similar
     * - [ ] Decode JWT to get user ID
     *
     * For now, we'll stub this with a placeholder
     * The token itself is expected to be the user ID for development purposes
     */
    // STUB: In production, replace this with actual JWT verification
    req.userToken = token;

    // TODO-LIST: Replace this stub with actual user ID extraction from token
    // For development, we expect the token to be passed as userId directly
    // In production, decode the JWT and extract the user ID
    req.userId = token; // STUB - replace with actual decode logic

    next();
  } catch (error) {
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
      const token = authHeader.startsWith('Bearer ')
        ? authHeader.slice(7)
        : authHeader;

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
