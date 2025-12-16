import { BaseService } from './base.service';
import { WaterLog, CreateWaterLogDto, UpdateWaterLogDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Water Log Service
 * Handles water intake logging operations
 *
 * Water tracking logic:
 * - Users should drink water every 30 minutes
 * - Aggregation is for today only (no timezone consideration)
 * - Target is typically 2000ml per day (8 glasses)
 */
export class WaterLogService extends BaseService<WaterLog> {
  // Recommended interval between water intake (in minutes)
  private readonly WATER_INTERVAL_MINUTES = 30;

  constructor(pb: PocketBase) {
    super(pb, 'water_logs');
  }

  /**
   * Get today's date string in YYYY-MM-DD format
   */
  private getTodayDateString(): string {
    const now = new Date();
    return now.toISOString().split('T')[0]; // e.g., "2025-12-16"
  }

  /**
   * Get all water logs for a user
   */
  async getByUserId(userId: string): Promise<WaterLog[]> {
    return await this.findByFilter(`userId="${userId}"`);
  }

  /**
   * Get water logs for today only
   */
  async getTodayLogs(userId: string): Promise<WaterLog[]> {
    const today = this.getTodayDateString();
    // Use getFullList to get all logs without pagination limit
    const logs = await this.pb.collection(this.collectionName).getFullList<WaterLog>({
      filter: `userId="${userId}" && timestamp~"${today}"`,
      sort: 'timestamp',
    });
    return logs;
  }

  /**
   * Get total water amount for today
   */
  async getTotalAmount(userId: string): Promise<number> {
    const todayLogs = await this.getTodayLogs(userId);
    return todayLogs.reduce((total, log) => total + (log.amountMl || 0), 0);
  }

  /**
   * Calculate hydration score (0-100) based on today's water intake
   * Target: 2000ml per day (can be customized via settings)
   */
  async calculateHydroScore(userId: string, targetMl: number = 2000): Promise<number> {
    const totalAmount = await this.getTotalAmount(userId);
    const score = Math.min(100, Math.round((totalAmount / targetMl) * 100));
    return score;
  }

  /**
   * Check if user should drink water now (based on 30-min intervals)
   */
  async shouldDrinkWater(
    userId: string
  ): Promise<{ shouldDrink: boolean; lastDrink: Date | null; minutesSinceLastDrink: number }> {
    const todayLogs = await this.getTodayLogs(userId);

    if (todayLogs.length === 0) {
      return { shouldDrink: true, lastDrink: null, minutesSinceLastDrink: Infinity };
    }

    // Find the most recent log
    const sortedLogs = todayLogs.sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );

    const lastLog = sortedLogs[0];
    const lastDrinkTime = new Date(lastLog.timestamp);
    const now = new Date();
    const minutesSinceLastDrink = Math.floor(
      (now.getTime() - lastDrinkTime.getTime()) / (1000 * 60)
    );

    return {
      shouldDrink: minutesSinceLastDrink >= this.WATER_INTERVAL_MINUTES,
      lastDrink: lastDrinkTime,
      minutesSinceLastDrink,
    };
  }

  /**
   * Get water intake summary for today
   */
  async getTodaySummary(
    userId: string,
    targetMl: number = 2000
  ): Promise<{
    totalMl: number;
    targetMl: number;
    percentage: number;
    logsCount: number;
    shouldDrinkNow: boolean;
    minutesSinceLastDrink: number;
  }> {
    const [totalMl, logs, drinkStatus] = await Promise.all([
      this.getTotalAmount(userId),
      this.getTodayLogs(userId),
      this.shouldDrinkWater(userId),
    ]);

    return {
      totalMl,
      targetMl,
      percentage: Math.min(100, Math.round((totalMl / targetMl) * 100)),
      logsCount: logs.length,
      shouldDrinkNow: drinkStatus.shouldDrink,
      minutesSinceLastDrink:
        drinkStatus.minutesSinceLastDrink === Infinity ? 0 : drinkStatus.minutesSinceLastDrink,
    };
  }

  /**
   * Create a water log entry
   */
  async createLog(userId: string, data: CreateWaterLogDto): Promise<WaterLog> {
    return await this.create({
      ...data,
      userId,
      timestamp: data.timestamp || new Date().toISOString(),
    });
  }

  /**
   * Update a water log entry
   */
  async updateLog(id: string, data: UpdateWaterLogDto): Promise<WaterLog> {
    return await this.update(id, data);
  }

  /**
   * Delete all water logs for a user (today only)
   */
  async deleteTodayLogs(userId: string): Promise<boolean> {
    const logs = await this.getTodayLogs(userId);
    for (const log of logs) {
      await this.delete(log.id);
    }
    return true;
  }
}
