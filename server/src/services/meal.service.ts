import { BaseService } from './base.service';
import { Meal, CreateMealDto, UpdateMealDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Meal Service
 * Handles meal log operations (breakfast, lunch, dinner, snack entries)
 */
export class MealService extends BaseService<Meal> {
  constructor(pb: PocketBase) {
    super(pb, 'meals');
  }

  /**
   * Get all meals for a user
   */
  async getByUserId(userId: string): Promise<Meal[]> {
    const result = await this.pb.collection(this.collectionName).getFullList({
      filter: `userId="${userId}"`,
      sort: '-timestamp',
    });
    return result as Meal[];
  }

  /**
   * Get a meal by ID
   */
  async getById(id: string): Promise<Meal> {
    return (await this.pb.collection(this.collectionName).getOne(id)) as Meal;
  }

  /**
   * Get today's meals for a user
   */
  async getTodayMeals(userId: string): Promise<Meal[]> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    const result = await this.pb.collection(this.collectionName).getFullList({
      filter: `userId="${userId}" && timestamp~"${today}"`,
      sort: '-timestamp',
    });
    return result as Meal[];
  }
  /**
   * Get current timestamp in local timezone format (YYYY-MM-DD HH:mm:ss)
   */
  private getLocalTimestamp(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }

  /**
   * Create a new meal
   */
  async createMeal(userId: string, data: CreateMealDto): Promise<Meal> {
    return await this.create({
      ...data,
      userId,
      timestamp: this.getLocalTimestamp(),
    });
  }

  /**
   * Update a meal
   */
  async updateMeal(id: string, data: UpdateMealDto): Promise<Meal> {
    return await this.update(id, data);
  }

  /**
   * Delete a meal
   */
  async deleteMeal(id: string): Promise<boolean> {
    return await this.delete(id);
  }

  /**
   * Check if user owns the meal
   */
  async isOwnedBy(id: string, userId: string): Promise<boolean> {
    try {
      const meal = await this.getById(id);
      return meal.userId === userId;
    } catch {
      return false;
    }
  }
}
