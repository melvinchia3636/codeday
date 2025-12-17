import { api } from "./api";

/**
 * Meal Item in a meal entry
 */
export interface MealItemEntry {
  foodId: string;
  quantity: number;
}

/**
 * Meal Interface
 * A meal entry (breakfast, lunch, dinner, snack) with food items
 */
export interface Meal {
  id: string;
  type: string; // 'breakfast', 'lunch', 'dinner', 'snack'
  items: MealItemEntry[];
  userId: string;
  timestamp: string;
  updated: string;
}

export interface CreateMealDto {
  type: string;
  items: MealItemEntry[];
}

export interface UpdateMealDto {
  type?: string;
  items?: MealItemEntry[];
}

/**
 * Meal API Client
 */
export const mealApi = {
  /**
   * Get all meals for the current user
   */
  getAll: async (): Promise<Meal[]> => {
    const response = await api.get<Meal[]>("/meals");
    return response.data;
  },

  /**
   * Get today's meals for the current user
   */
  getToday: async (): Promise<Meal[]> => {
    const response = await api.get<Meal[]>("/meals/today");
    return response.data;
  },

  /**
   * Get a specific meal by ID
   */
  getById: async (id: string): Promise<Meal> => {
    const response = await api.get<Meal>(`/meals/${id}`);
    return response.data;
  },

  /**
   * Create a new meal
   */
  create: async (data: CreateMealDto): Promise<Meal> => {
    const response = await api.post<Meal>("/meals", data);
    return response.data;
  },

  /**
   * Update a meal
   */
  update: async (id: string, data: UpdateMealDto): Promise<Meal> => {
    const response = await api.put<Meal>(`/meals/${id}`, data);
    return response.data;
  },

  /**
   * Delete a meal
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/meals/${id}`);
  },
};
