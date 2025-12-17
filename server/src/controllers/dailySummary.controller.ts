import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { DailySummaryService } from '../services/dailySummary.service';
import { DailySummary, CreateDailySummaryDto, UpdateDailySummaryDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Daily Summary Controller
 * Handles daily summary HTTP requests
 */
export class DailySummaryController extends BaseController<DailySummary> {
  private dailySummaryService: DailySummaryService;

  constructor(pb: PocketBase) {
    super();
    this.dailySummaryService = new DailySummaryService(pb);
  }

  /**
   * Get all daily summaries for authenticated user
   * GET /daily-summaries
   */
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const summaries = await this.dailySummaryService.getByUserId(userId);
      return this.success(res, summaries);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get daily summary by ID (not used in spec but required by base)
   */
  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const summary = await this.dailySummaryService.findById(id);
      return this.success(res, summary);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create daily summary
   * POST /daily-summaries
   */
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateDailySummaryDto = req.body;
      const summary = await this.dailySummaryService.createSummary(userId, data);
      return this.success(res, summary, 'Daily summary timestamp', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update daily summary
   * PUT /daily-summaries
   */
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.body;
      const data: UpdateDailySummaryDto = req.body;
      const summary = await this.dailySummaryService.updateSummary(id, data);
      return this.success(res, summary, 'Daily summary updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete daily summary
   * DELETE /daily-summaries
   */
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.body;
      await this.dailySummaryService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
