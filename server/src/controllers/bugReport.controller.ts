import { Request, Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { BugReportService } from '../services/bugReport.service';
import { BugReport, CreateBugReportDto, UpdateBugReportDto } from '../models/bugReport.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Bug Report Controller
 * Handles all bug report-related HTTP requests
 */
export class BugReportController extends BaseController<BugReport> {
  private bugReportService: BugReportService;

  constructor(pb: PocketBase) {
    super();
    this.bugReportService = new BugReportService(pb);
  }

  /**
   * Get all bug reports (admin / not used in this implementation)
   * GET /bug-reports/all
   */
  async getAll(_req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const reports = await this.bugReportService.findAllReports();
      return this.success(res, reports, 'Bug reports retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create new bug report
   * POST /bug-reports
   */
  async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateBugReportDto = req.body;
      const bugReport = await this.bugReportService.createBugReport(userId, data);
      return this.success(res, bugReport, 'Bug report created successfully', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get all bug reports for current user
   * GET /bug-reports
   */
  async getMyReports(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const reports = await this.bugReportService.findByUser(userId);
      return this.success(res, reports, 'Bug reports retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get bug report by ID
   * GET /bug-reports/:id
   */
  async getById(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const report = await this.bugReportService.findById(id);
      return this.success(res, report, 'Bug report retrieved successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update bug report
   * PATCH /bug-reports/:id
   */
  async update(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const data: UpdateBugReportDto = req.body;
      const report = await this.bugReportService.updateBugReport(id, data);
      return this.success(res, report, 'Bug report updated successfully');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete bug report
   * DELETE /bug-reports/:id
   */
  async delete(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      await this.bugReportService.delete(id);
      return this.success(res, null, 'Bug report deleted successfully');
    } catch (error) {
      next(error);
    }
  }
}
