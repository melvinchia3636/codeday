import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { WeightTargetService } from '../services/weightTarget.service';
import { WeightTarget, CreateWeightTargetDto, UpdateWeightTargetDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Weight Target Controller
 * Handles weight target HTTP requests
 */
export class WeightTargetController extends BaseController<WeightTarget> {
  private weightTargetService: WeightTargetService;

  constructor(pb: PocketBase) {
    super();
    this.weightTargetService = new WeightTargetService(pb);
  }

  /**
   * Get weight target for authenticated user
   * GET /weight-targets
   */
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const target = await this.weightTargetService.getByUserId(userId);
      return this.success(res, target);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get weight target by ID
   */
  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const target = await this.weightTargetService.getByUserId(userId);
      return this.success(res, target);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create weight target
   * POST /weight-targets
   */
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateWeightTargetDto = req.body;
      const target = await this.weightTargetService.createTarget(userId, data);
      return this.success(res, target, 'Weight target created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update weight target
   * PUT /weight-targets
   */
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: UpdateWeightTargetDto = req.body;
      const target = await this.weightTargetService.updateTarget(userId, data);
      return this.success(res, target, 'Weight target updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete weight target
   * DELETE /weight-targets
   */
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      await this.weightTargetService.deleteByUserId(userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
