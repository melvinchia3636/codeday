import { BaseService } from './base.service';
import { MealItem, CreateMealItemDto, UpdateMealItemDto, Meal } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Meal Service
 * Handles meal and meal item operations
 */
export class MealService extends BaseService<MealItem> {
  constructor(pb: PocketBase) {
    super(pb, 'meal_items');
  }

  /**
   * Get all meal items for a user
   * Note: Meal items are linked to meals, which are linked to users
   */
  async getByUserId(userId: string): Promise<MealItem[]> {
    /**
     * TODO-LIST: Implement proper relation query
     * - [ ] Meal items should be fetched via meals table
     * - [ ] Define the relation structure: meal_items -> meals -> user
     * - [ ] Consider using PocketBase expand feature
     */
    const result = await this.pb.collection('meals').getList<Meal>(1, 100, {
      filter: `userId="${userId}"`,
    });

    const mealIds = result.items.map((m) => m.id);
    if (mealIds.length === 0) return [];

    const filter = mealIds.map((id) => `mealId="${id}"`).join(' || ');
    return await this.findByFilter(filter);
  }

  /**
   * Get total calories from all meal items for a user
   */
  async getTotalCalories(userId: string, date?: string): Promise<number> {
    /**
     * TODO-LIST: Define calorie aggregation logic
     * - [ ] Should this be for today only or all time?
     * - [ ] Should we filter by meal time/date?
     * - [ ] Need to traverse meals -> meal_items relation
     */
    let mealFilter = `userId="${userId}"`;
    if (date) {
      mealFilter += ` && time~"${date}"`;
    }

    const meals = await this.pb.collection('meals').getList<Meal>(1, 100, {
      filter: mealFilter,
    });

    const mealIds = meals.items.map((m) => m.id);
    if (mealIds.length === 0) return 0;

    const filter = mealIds.map((id) => `mealId="${id}"`).join(' || ');
    const items = await this.findByFilter(filter);

    return items.reduce((total, item) => total + (item.calories || 0), 0);
  }

  /**
   * Create a meal item
   */
  async createItem(data: CreateMealItemDto): Promise<MealItem> {
    return await this.create(data);
  }

  /**
   * Update a meal item
   */
  async updateItem(id: string, data: UpdateMealItemDto): Promise<MealItem> {
    return await this.update(id, data);
  }
}
