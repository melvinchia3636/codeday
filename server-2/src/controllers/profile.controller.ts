import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { ProfileService } from '../services/profile.service';
import { UserProfile, CreateUserProfileDto, UpdateUserProfileDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Profile Controller
 * Handles /me endpoint requests
 */
export class ProfileController extends BaseController<UserProfile> {
  private profileService: ProfileService;

  constructor(pb: PocketBase) {
    super();
    this.profileService = new ProfileService(pb);
  }

  /**
   * Get profile for authenticated user
   * GET /me
   */
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const profile = await this.profileService.getProfileWithBMI(userId);
      return this.success(res, profile);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get profile by ID (not used in spec but required by base)
   */
  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const profile = await this.profileService.getProfileWithBMI(userId);
      return this.success(res, profile);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create user profile
   * POST /me
   */
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const data: CreateUserProfileDto = req.body;
      const profile = await this.profileService.createProfile(data);
      return this.success(res, profile, 'User created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update user profile
   * PUT /me
   */
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: UpdateUserProfileDto = req.body;
      const profile = await this.profileService.updateProfile(userId, data);
      return this.success(res, profile, 'User updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete user profile
   * DELETE /me
   */
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      await this.profileService.deleteProfile(userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
