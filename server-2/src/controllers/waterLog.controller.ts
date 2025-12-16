import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { WaterLogService } from '../services/waterLog.service';
import { WaterLog, CreateWaterLogDto, UpdateWaterLogDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Water Log Controller
 * Handles water log HTTP requests
 */
export class WaterLogController extends BaseController<WaterLog> {
  private waterLogService: WaterLogService;

  constructor(pb: PocketBase) {
    super();
    this.waterLogService = new WaterLogService(pb);
  }

  /**
   * Get total water amount for authenticated user
   * GET /water-logs/amount
   */
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      // Water amount is aggregated for today only
      const amount = await this.waterLogService.getTotalAmount(userId);
      return res.json(amount);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get water log by ID
   */
  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const log = await this.waterLogService.findById(id);
      return this.success(res, log);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create water log
   * POST /water-logs/amount
   */
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateWaterLogDto = req.body;
      const log = await this.waterLogService.createLog(userId, data);
      return this.success(res, log, 'Water log created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update water log
   * PUT /water-logs/amount
   */
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.body;
      const data: UpdateWaterLogDto = req.body;
      const log = await this.waterLogService.updateLog(id, data);
      return this.success(res, log, 'Water log updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete water log
   * DELETE /water-logs/amount
   */
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      // Delete today's logs only
      await this.waterLogService.deleteTodayLogs(userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
