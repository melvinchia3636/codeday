import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { FoodLogService } from '../services/foodLog.service';
import { FoodLog, CreateFoodLogDto, UpdateFoodLogDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Food Log Controller
 * Handles food log HTTP requests
 */
export class FoodLogController extends BaseController<FoodLog> {
  private foodLogService: FoodLogService;

  constructor(pb: PocketBase) {
    super();
    this.foodLogService = new FoodLogService(pb);
  }

  /**
   * Get all food logs for authenticated user
   * GET /food-logs
   */
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const logs = await this.foodLogService.getByUserId(userId);
      return this.success(res, logs);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get food log by ID
   */
  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const log = await this.foodLogService.findById(id);
      return this.success(res, log);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get total calories
   * GET /food-logs/calories
   */
  async getCalories(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      // Calories are aggregated for today only
      const calories = await this.foodLogService.getTotalCalories(userId);
      return res.json(calories);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create food log
   * POST /food-logs
   */
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateFoodLogDto = req.body;
      const log = await this.foodLogService.createLog(userId, data);
      return this.success(res, log, 'Food log created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update food log
   * PUT /food-logs
   */
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.body;
      const data: UpdateFoodLogDto = req.body;
      const log = await this.foodLogService.updateLog(id, data);
      return this.success(res, log, 'Food log updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete food log
   * DELETE /food-logs
   */
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.body;
      await this.foodLogService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
