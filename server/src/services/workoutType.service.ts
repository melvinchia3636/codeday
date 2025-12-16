import { BaseService } from './base.service';
import { WorkoutType, CreateWorkoutTypeDto, UpdateWorkoutTypeDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Workout Type Service
 * Handles custom workout type management
 */
export class WorkoutTypeService extends BaseService<WorkoutType> {
  constructor(pb: PocketBase) {
    super(pb, 'workout_types');
  }

  /**
   * Get all workout types for a user
   */
  async getByUserId(userId: string): Promise<WorkoutType[]> {
    const result = await this.pb.collection(this.collectionName).getFullList({
      filter: `userId="${userId}"`,
      sort: 'name',
    });
    return result as WorkoutType[];
  }

  /**
   * Get a workout type by ID
   */
  async getById(id: string): Promise<WorkoutType> {
    return (await this.pb.collection(this.collectionName).getOne(id)) as WorkoutType;
  }

  /**
   * Create a new workout type
   */
  async createType(userId: string, data: CreateWorkoutTypeDto): Promise<WorkoutType> {
    return await this.create({
      ...data,
      userId,
    });
  }

  /**
   * Update a workout type
   */
  async updateType(id: string, data: UpdateWorkoutTypeDto): Promise<WorkoutType> {
    return await this.update(id, data);
  }

  /**
   * Delete a workout type
   */
  async deleteType(id: string): Promise<boolean> {
    return await this.delete(id);
  }

  /**
   * Check if user owns the workout type
   */
  async isOwnedBy(id: string, userId: string): Promise<boolean> {
    try {
      const type = await this.getById(id);
      return type.userId === userId;
    } catch {
      return false;
    }
  }
}
