import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { UserService } from '../services/user.service';
import { User, CreateUserDto, UpdateUserDto } from '../models/user.model';
import PocketBase from 'pocketbase';

/**
 * User Controller
 * Handles all user-related HTTP requests
 */
export class UserController extends BaseController<User> {
  private userService: UserService;

  constructor(pb: PocketBase) {
    super();
    this.userService = new UserService(pb);
  }

  /**
   * Get all users
   * GET /users
   */
  async getAll(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { page, perPage, sort, filter } = req.query;
      const users = await this.userService.findAll({
        page: page ? Number(page) : undefined,
        perPage: perPage ? Number(perPage) : undefined,
        sort: sort as string,
        filter: filter as string,
      });
      return this.success(res, users, 'Users retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by ID
   * GET /users/:id
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const user = await this.userService.findById(id);
      return this.success(res, user, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new user
   * POST /users
   */
  async create(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userData: CreateUserDto = req.body;
      const user = await this.userService.createUser(userData);
      return this.success(res, user, 'User created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user
   * PATCH /users/:id
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const userData: UpdateUserDto = req.body;
      const user = await this.userService.updateUser(id, userData);
      return this.success(res, user, 'User updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user
   * DELETE /users/:id
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      await this.userService.delete(id);
      return this.success(res, null, 'User deleted successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by email
   * GET /users/email/:email
   */
  async getByEmail(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { email } = req.params;
      const user = await this.userService.findByEmail(email);
      if (!user) {
        return this.error(res, 'User not found', 404);
      }
      return this.success(res, user, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get user by username
   * GET /users/username/:username
   */
  async getByUsername(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { username } = req.params;
      const user = await this.userService.findByUsername(username);
      if (!user) {
        return this.error(res, 'User not found', 404);
      }
      return this.success(res, user, 'User retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Authenticate user
   * POST /users/auth/login
   */
  async login(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { identity, password } = req.body;
      const authData = await this.userService.authenticate(identity, password);
      return this.success(res, authData, 'Login successful');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Request password reset
   * POST /users/auth/request-password-reset
   */
  async requestPasswordReset(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email } = req.body;
      await this.userService.requestPasswordReset(email);
      return this.success(res, null, 'Password reset email sent');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Confirm password reset
   * POST /users/auth/confirm-password-reset
   */
  async confirmPasswordReset(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { token, password, passwordConfirm } = req.body;
      await this.userService.confirmPasswordReset(token, password, passwordConfirm);
      return this.success(res, null, 'Password reset successful');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Request email verification
   * POST /users/auth/request-verification
   */
  async requestVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { email } = req.body;
      await this.userService.requestVerification(email);
      return this.success(res, null, 'Verification email sent');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Confirm email verification
   * POST /users/auth/confirm-verification
   */
  async confirmVerification(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { token } = req.body;
      await this.userService.confirmVerification(token);
      return this.success(res, null, 'Email verified successfully');
    } catch (error) {
      next(error);
    }
  }
}
