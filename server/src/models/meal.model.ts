import { BaseRecord } from './base.model';

/**
 * Meal Model
 * Tracks meal entries (breakfast, lunch, dinner, snack)
 */
export interface Meal extends BaseRecord {
  type: string; // e.g., 'breakfast', 'lunch', 'dinner', 'snack'
  created: string;
  items: string[]; // Array of meal item IDs
  userId: string;
}

export interface CreateMealDto {
  type: string;
  created: string;
  items: string[];
}

export interface UpdateMealDto extends Partial<CreateMealDto> {}

/**
 * Meal Item Model
 * Individual items within a meal
 */
export interface MealItem extends BaseRecord {
  foodId: string;
  userId: string;
  quantity: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface CreateMealItemDto {
  foodId: string;
  quantity: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UpdateMealItemDto extends Partial<CreateMealItemDto> {}
