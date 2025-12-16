import { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

/**
 * Request logger middleware
 */
export const requestLogger = morgan('combined', {
  skip: (req: Request) => {
    // Skip logging for health check endpoint
    return req.url === '/health';
  },
});

/**
 * Custom request logger for development
 */
export const devLogger = morgan('dev');
