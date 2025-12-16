import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { SettingsService } from '../services/settings.service';
import { Settings, CreateSettingsDto, UpdateSettingsDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Settings Controller
 * Handles settings HTTP requests
 */
export class SettingsController extends BaseController<Settings> {
  private settingsService: SettingsService;

  constructor(pb: PocketBase) {
    super();
    this.settingsService = new SettingsService(pb);
  }

  /**
   * Get settings for authenticated user
   * GET /settings
   */
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const settings = await this.settingsService.getByUserId(userId);
      return this.success(res, settings);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get settings by ID (not used in spec but required by base)
   */
  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const settings = await this.settingsService.getByUserId(userId);
      return this.success(res, settings);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create settings
   * POST /settings
   */
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateSettingsDto = req.body;
      const settings = await this.settingsService.createSettings(userId, data);
      return this.success(res, settings, 'Settings created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update settings
   * PUT /settings
   */
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: UpdateSettingsDto = req.body;
      const settings = await this.settingsService.updateSettings(userId, data);
      return this.success(res, settings, 'Settings updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete settings
   * DELETE /settings
   */
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      await this.settingsService.deleteByUserId(userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
