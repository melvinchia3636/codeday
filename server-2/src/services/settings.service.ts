import { BaseService } from './base.service';
import { Settings, CreateSettingsDto, UpdateSettingsDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Settings Service
 * Handles user settings operations
 */
export class SettingsService extends BaseService<Settings> {
  constructor(pb: PocketBase) {
    super(pb, 'settings');
  }

  /**
   * Get settings for a user
   * Each user should have one settings record
   */
  async getByUserId(userId: string): Promise<Settings | null> {
    return await this.findOne(`userId="${userId}"`);
  }

  /**
   * Create or update settings for a user
   * Uses upsert pattern - creates if not exists, updates if exists
   */
  async upsertSettings(userId: string, data: CreateSettingsDto | UpdateSettingsDto): Promise<Settings> {
    const existing = await this.getByUserId(userId);
    
    if (existing) {
      return await this.update(existing.id, data);
    }
    
    // Create with defaults if not specified
    const defaults: CreateSettingsDto = {
      dietCalorieTarget: 2000,
      hydroTargetMl: 2000,
      hydroIntervalMin: 60,
      expectedMealsPerDay: 3,
      timezone: 'UTC',
    };
    
    return await this.create({
      ...defaults,
      ...data,
      userId,
    });
  }

  /**
   * Create settings
   */
  async createSettings(userId: string, data: CreateSettingsDto): Promise<Settings> {
    return await this.upsertSettings(userId, data);
  }

  /**
   * Update settings
   */
  async updateSettings(userId: string, data: UpdateSettingsDto): Promise<Settings> {
    return await this.upsertSettings(userId, data);
  }

  /**
   * Delete settings for a user
   */
  async deleteByUserId(userId: string): Promise<boolean> {
    const existing = await this.getByUserId(userId);
    if (existing) {
      return await this.delete(existing.id);
    }
    return false;
  }
}
