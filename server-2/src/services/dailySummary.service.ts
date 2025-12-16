import { BaseService } from './base.service';
import { DailySummary, CreateDailySummaryDto, UpdateDailySummaryDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Daily Summary Service
 * Handles daily health summary operations
 */
export class DailySummaryService extends BaseService<DailySummary> {
  constructor(pb: PocketBase) {
    super(pb, 'daily_summaries');
  }

  /**
   * Get all summaries for a user
   */
  async getByUserId(userId: string): Promise<DailySummary[]> {
    const result = await this.findByFilter(`userId="${userId}"`);
    return result.items;
  }

  /**
   * Get summary for a specific date
   */
  async getByDate(userId: string, date: string): Promise<DailySummary | null> {
    return await this.findOne(`userId="${userId}" && date="${date}"`);
  }

  /**
   * Create a daily summary
   */
  async createSummary(userId: string, data: CreateDailySummaryDto): Promise<DailySummary> {
    /**
     * TODO-LIST: Calculate total score if not provided
     * - [ ] Define formula for totalScore calculation
     * - [ ] Should it be average of dietScore, hydroScore, effortScore?
     * - [ ] Are there weights for each score?
     */
    return await this.create({
      ...data,
      userId,
    });
  }

  /**
   * Update a daily summary
   */
  async updateSummary(id: string, data: UpdateDailySummaryDto): Promise<DailySummary> {
    return await this.update(id, data);
  }
}
