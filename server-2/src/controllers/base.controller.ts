import { Request, Response, NextFunction } from 'express';
import { ApiResponse } from '../types/common';

/**
 * Abstract Base Controller
 * Provides common CRUD operations that can be extended by specific controllers
 */
export abstract class BaseController<T> {
  /**
   * Handle success response
   */
  protected success(res: Response, data: any, message?: string, statusCode = 200): Response {
    const response: ApiResponse<typeof data> = {
      success: true,
      data,
      message,
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Handle error response
   */
  protected error(res: Response, error: string, statusCode = 400): Response {
    const response: ApiResponse = {
      success: false,
      error,
    };
    return res.status(statusCode).json(response);
  }

  /**
   * Abstract CRUD methods - to be implemented by child controllers
   */
  abstract getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  abstract getById(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  abstract create(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  abstract update(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
  abstract delete(req: Request, res: Response, next: NextFunction): Promise<Response | void>;
}
