import { api } from "./api";

/**
 * MealItem Interface
 * Individual food/meal entries
 */
export interface MealItem {
  id: string;
  foodId: string;
  userId: string;
  quantity: number;
  protein: number;
  carbs: number;
  fat: number;
  timestamp: string;
  updated: string;
}

export interface CreateMealItemDto {
  foodId: string;
  quantity: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface UpdateMealItemDto {
  foodId?: string;
  quantity?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

/**
 * MealItem API Client
 */
export const mealItemApi = {
  /**
   * Get all meal items for the current user
   */
  getAll: async (): Promise<MealItem[]> => {
    const response = await api.get<MealItem[]>("/meal-items");
    return response.data;
  },

  /**
   * Get today's meal items for the current user
   */
  getToday: async (): Promise<MealItem[]> => {
    const response = await api.get<MealItem[]>("/meal-items/today");
    return response.data;
  },

  /**
   * Get a specific meal item by ID
   */
  getById: async (id: string): Promise<MealItem> => {
    const response = await api.get<MealItem>(`/meal-items/${id}`);
    return response.data;
  },

  /**
   * Create a new meal item
   */
  create: async (data: CreateMealItemDto): Promise<MealItem> => {
    const response = await api.post<MealItem>("/meal-items", data);
    return response.data;
  },

  /**
   * Update a meal item
   */
  update: async (id: string, data: UpdateMealItemDto): Promise<MealItem> => {
    const response = await api.put<MealItem>(`/meal-items/${id}`, data);
    return response.data;
  },

  /**
   * Delete a meal item
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/meal-items/${id}`);
  },
};

/**
 * Calculate calories from macros
 */
export const calculateCalories = (item: {
  protein: number;
  carbs: number;
  fat: number;
}): number => {
  return Math.round(item.protein * 4 + item.carbs * 4 + item.fat * 9);
};
