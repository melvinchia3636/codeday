import { BaseService } from './base.service';
import { FoodLog, CreateFoodLogDto, UpdateFoodLogDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Food Log Service
 * Handles food logging operations
 *
 * Calorie aggregation is for today (single day) only.
 * Uses PocketBase filtering for date-based queries.
 */
export class FoodLogService extends BaseService<FoodLog> {
  // Default daily calorie target
  private readonly DEFAULT_CALORIE_TARGET = 2000;

  constructor(pb: PocketBase) {
    super(pb, 'food_logs');
  }

  /**
   * Get today's date string in YYYY-MM-DD format
   */
  private getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Get all food logs for a user
   */
  async getByUserId(userId: string): Promise<FoodLog[]> {
    return await this.findByFilter(`userId="${userId}"`);
  }

  /**
   * Get food logs for today only
   */
  async getTodayLogs(userId: string): Promise<FoodLog[]> {
    const today = this.getTodayDateString();
    return await this.findByFilter(`userId="${userId}" && timestamp~"${today}"`);
  }

  /**
   * Get total calories for today
   * Single day aggregation only
   */
  async getTotalCalories(userId: string): Promise<number> {
    const todayLogs = await this.getTodayLogs(userId);
    return todayLogs.reduce((total, log) => total + (log.calories || 0), 0);
  }

  /**
   * Calculate diet score (0-100) based on calorie intake
   * Score decreases if over or significantly under target
   */
  async calculateDietScore(
    userId: string,
    targetCalories: number = this.DEFAULT_CALORIE_TARGET
  ): Promise<number> {
    const totalCalories = await this.getTotalCalories(userId);

    // Perfect score if within +/- 10% of target
    const lowerBound = targetCalories * 0.9;
    const upperBound = targetCalories * 1.1;

    if (totalCalories >= lowerBound && totalCalories <= upperBound) {
      return 100;
    }

    // Calculate deviation from target
    if (totalCalories < lowerBound) {
      // Under-eating: score based on how close to lower bound
      const ratio = totalCalories / lowerBound;
      return Math.max(0, Math.round(ratio * 100));
    } else {
      // Over-eating: decrease score for going over
      const excess = totalCalories - upperBound;
      const penalty = Math.min(100, Math.round((excess / targetCalories) * 200));
      return Math.max(0, 100 - penalty);
    }
  }

  /**
   * Get calorie summary for today
   */
  async getTodaySummary(
    userId: string,
    targetCalories: number = this.DEFAULT_CALORIE_TARGET
  ): Promise<{
    totalCalories: number;
    targetCalories: number;
    percentage: number;
    remainingCalories: number;
    logsCount: number;
    status: 'under' | 'optimal' | 'over';
  }> {
    const [totalCalories, logs] = await Promise.all([
      this.getTotalCalories(userId),
      this.getTodayLogs(userId),
    ]);

    const lowerBound = targetCalories * 0.9;
    const upperBound = targetCalories * 1.1;

    let status: 'under' | 'optimal' | 'over';
    if (totalCalories < lowerBound) {
      status = 'under';
    } else if (totalCalories > upperBound) {
      status = 'over';
    } else {
      status = 'optimal';
    }

    return {
      totalCalories,
      targetCalories,
      percentage: Math.round((totalCalories / targetCalories) * 100),
      remainingCalories: Math.max(0, targetCalories - totalCalories),
      logsCount: logs.length,
      status,
    };
  }

  /**
   * Create a food log entry
   */
  async createLog(userId: string, data: CreateFoodLogDto): Promise<FoodLog> {
    return await this.create({
      ...data,
      userId,
      timestamp: data.timestamp || new Date().toISOString(),
    });
  }

  /**
   * Update a food log entry
   */
  async updateLog(id: string, data: UpdateFoodLogDto): Promise<FoodLog> {
    return await this.update(id, data);
  }

  /**
   * Delete all food logs for a user (today only)
   */
  async deleteTodayLogs(userId: string): Promise<boolean> {
    const logs = await this.getTodayLogs(userId);
    for (const log of logs) {
      await this.delete(log.id);
    }
    return true;
  }
}
