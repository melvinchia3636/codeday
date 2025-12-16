import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { StreaksService } from '../services/streaks.service';
import { Streaks, CreateStreaksDto, UpdateStreaksDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Streaks Controller
 * Handles streaks HTTP requests
 */
export class StreaksController extends BaseController<Streaks> {
  private streaksService: StreaksService;

  constructor(pb: PocketBase) {
    super();
    this.streaksService = new StreaksService(pb);
  }

  /**
   * Get streaks for authenticated user
   * GET /streaks
   */
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const streaks = await this.streaksService.getByUserId(userId);
      return this.success(res, streaks);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get streaks by ID (not used in spec but required by base)
   */
  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const streaks = await this.streaksService.getByUserId(userId);
      return this.success(res, streaks);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create streaks
   * POST /streaks
   */
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateStreaksDto = req.body;
      const streaks = await this.streaksService.createStreaks(userId, data);
      return this.success(res, streaks, 'Streaks created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update streaks
   * PUT /streaks
   */
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: UpdateStreaksDto = req.body;
      const streaks = await this.streaksService.updateStreaks(userId, data);
      return this.success(res, streaks, 'Streaks updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete streaks
   * DELETE /streaks
   */
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      await this.streaksService.deleteByUserId(userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
