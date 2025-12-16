import { BaseService } from './base.service';
import { Streaks, CreateStreaksDto, UpdateStreaksDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Streaks Service
 * Handles user streaks tracking operations
 */
export class StreaksService extends BaseService<Streaks> {
  constructor(pb: PocketBase) {
    super(pb, 'streaks');
  }

  /**
   * Get streaks for a user
   * Each user should have one streaks record
   */
  async getByUserId(userId: string): Promise<Streaks | null> {
    return await this.findOne(`userId="${userId}"`);
  }

  /**
   * Create or update streaks for a user
   */
  async upsertStreaks(userId: string, data: CreateStreaksDto | UpdateStreaksDto): Promise<Streaks> {
    const existing = await this.getByUserId(userId);
    
    if (existing) {
      return await this.update(existing.id, data);
    }
    
    // Create with zeros if not specified
    const defaults: CreateStreaksDto = {
      dietDays: 0,
      hydroDays: 0,
      workoutDays: 0,
      perfectDays: 0,
    };
    
    return await this.create({
      ...defaults,
      ...data,
      userId,
    });
  }

  /**
   * Increment a specific streak type
   */
  async incrementStreak(userId: string, streakType: keyof Omit<CreateStreaksDto, 'userId'>): Promise<Streaks> {
    const existing = await this.getByUserId(userId);
    
    if (existing) {
      const currentValue = existing[streakType] || 0;
      return await this.update(existing.id, {
        [streakType]: currentValue + 1,
      });
    }
    
    return await this.upsertStreaks(userId, {
      [streakType]: 1,
    });
  }

  /**
   * Reset a specific streak type
   */
  async resetStreak(userId: string, streakType: keyof Omit<CreateStreaksDto, 'userId'>): Promise<Streaks> {
    const existing = await this.getByUserId(userId);
    
    if (existing) {
      return await this.update(existing.id, {
        [streakType]: 0,
      });
    }
    
    return await this.upsertStreaks(userId, {
      [streakType]: 0,
    });
  }

  /**
   * Create streaks
   */
  async createStreaks(userId: string, data: CreateStreaksDto): Promise<Streaks> {
    return await this.upsertStreaks(userId, data);
  }

  /**
   * Update streaks
   */
  async updateStreaks(userId: string, data: UpdateStreaksDto): Promise<Streaks> {
    return await this.upsertStreaks(userId, data);
  }

  /**
   * Delete streaks for a user
   */
  async deleteByUserId(userId: string): Promise<boolean> {
    const existing = await this.getByUserId(userId);
    if (existing) {
      return await this.delete(existing.id);
    }
    return false;
  }
}
