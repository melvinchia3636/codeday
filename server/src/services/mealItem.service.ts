import { BaseService } from './base.service';
import { MealItem, CreateMealItemDto, UpdateMealItemDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Meal Item Service
 * Handles individual meal item/food logging operations
 */
export class MealItemService extends BaseService<MealItem> {
  constructor(pb: PocketBase) {
    super(pb, 'meal_items');
  }

  /**
   * Get all meal items for a user
   */
  async getByUserId(userId: string): Promise<MealItem[]> {
    const result = await this.pb.collection(this.collectionName).getFullList({
      filter: `userId="${userId}"`,
      sort: '-created',
    });
    return result as MealItem[];
  }

  /**
   * Get a meal item by ID
   */
  async getById(id: string): Promise<MealItem> {
    return (await this.pb.collection(this.collectionName).getOne(id)) as MealItem;
  }

  /**
   * Create a new meal item
   */
  async createItem(userId: string, data: CreateMealItemDto): Promise<MealItem> {
    return await this.create({
      ...data,
      userId,
    });
  }

  /**
   * Update a meal item
   */
  async updateItem(id: string, data: UpdateMealItemDto): Promise<MealItem> {
    return await this.update(id, data);
  }

  /**
   * Delete a meal item
   */
  async deleteItem(id: string): Promise<boolean> {
    return await this.delete(id);
  }

  /**
   * Check if user owns the meal item
   */
  async isOwnedBy(id: string, userId: string): Promise<boolean> {
    try {
      const item = await this.getById(id);
      return item.userId === userId;
    } catch {
      return false;
    }
  }

  /**
   * Calculate calories from macros (protein * 4 + carbs * 4 + fat * 9)
   */
  calculateCalories(item: { protein: number; carbs: number; fat: number }): number {
    return Math.round(item.protein * 4 + item.carbs * 4 + item.fat * 9);
  }

  /**
   * Get today's meal items for a user
   */
  async getTodayItems(userId: string): Promise<MealItem[]> {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const today = `${year}-${month}-${day}`;

    const result = await this.pb.collection(this.collectionName).getFullList({
      filter: `userId="${userId}" && created~"${today}"`,
      sort: '-created',
    });
    return result as MealItem[];
  }
}
