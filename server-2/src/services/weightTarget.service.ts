import { BaseService } from './base.service';
import { WeightTarget, CreateWeightTargetDto, UpdateWeightTargetDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Weight Target Service
 * Handles user weight target operations
 */
export class WeightTargetService extends BaseService<WeightTarget> {
  constructor(pb: PocketBase) {
    super(pb, 'weight_targets');
  }

  /**
   * Get weight target for a user
   * Each user should have one active weight target
   */
  async getByUserId(userId: string): Promise<WeightTarget | null> {
    return await this.findOne(`userId="${userId}"`);
  }

  /**
   * Create or update weight target for a user
   */
  async upsertTarget(userId: string, data: CreateWeightTargetDto | UpdateWeightTargetDto): Promise<WeightTarget> {
    const existing = await this.getByUserId(userId);
    
    if (existing) {
      return await this.update(existing.id, data);
    }
    
    return await this.create({
      ...data,
      userId,
    } as any);
  }

  /**
   * Create weight target
   */
  async createTarget(userId: string, data: CreateWeightTargetDto): Promise<WeightTarget> {
    return await this.upsertTarget(userId, data);
  }

  /**
   * Update weight target
   */
  async updateTarget(userId: string, data: UpdateWeightTargetDto): Promise<WeightTarget> {
    return await this.upsertTarget(userId, data);
  }

  /**
   * Delete weight target for a user
   */
  async deleteByUserId(userId: string): Promise<boolean> {
    const existing = await this.getByUserId(userId);
    if (existing) {
      return await this.delete(existing.id);
    }
    return false;
  }
}
