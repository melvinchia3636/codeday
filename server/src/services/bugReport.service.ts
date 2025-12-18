import { BaseService } from './base.service';
import { BugReport, CreateBugReportDto, UpdateBugReportDto } from '../models/bugReport.model';
import PocketBase from 'pocketbase';

/**
 * Bug Report Service
 * Handles all bug report-related operations
 */
export class BugReportService extends BaseService<BugReport> {
  constructor(pb: PocketBase) {
    super(pb, 'bug_reports');
  }

  /**
   * Create a new bug report
   */
  async createBugReport(userId: string, data: CreateBugReportDto): Promise<BugReport> {
    return await this.create({
      ...data,
      userId,
      status: 'open',
    } as any);
  }

  /**
   * Update bug report
   */
  async updateBugReport(id: string, data: UpdateBugReportDto): Promise<BugReport> {
    return await this.update(id, data as any);
  }

  /**
   * Get all bug reports for a user
   */
  async findByUser(userId: string): Promise<BugReport[]> {
    return await this.findAll({
      filter: `userId="${userId}"`,
      sort: '-created',
    });
  }

  /**
   * Get all bug reports (admin)
   */
  async findAllReports(status?: string): Promise<BugReport[]> {
    const filter = status ? `status="${status}"` : '';
    return await this.findAll({
      filter,
      sort: '-created',
    });
  }
}
