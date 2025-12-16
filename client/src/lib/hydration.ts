import { api } from "./api";

/**
 * Water Log types
 */
export interface WaterLog {
  id: string;
  amountMl: number;
  timestamp: string;
  userId: string;
  created?: string;
  updated?: string;
}

export interface CreateWaterLogData {
  amountMl: number;
  timestamp?: string;
}

export interface UpdateWaterLogData {
  id: string;
  amountMl?: number;
  timestamp?: string;
}

/**
 * Water Log Summary
 */
export interface WaterLogSummary {
  totalMl: number;
  targetMl: number;
  percentage: number;
  logsCount: number;
  shouldDrinkNow: boolean;
  minutesSinceLastDrink: number;
}

/**
 * Hydration API functions
 */
export const hydrationApi = {
  /**
   * Get today's water logs list
   */
  getTodayLogs: async (): Promise<WaterLog[]> => {
    const response = await api.get<WaterLog[]>("/water-logs");
    return response.data ?? [];
  },

  /**
   * Get today's total water amount in ml
   */
  getTodayAmount: async (): Promise<number> => {
    const response = await api.get<number | null>("/water-logs/amount");
    return response.data ?? 0;
  },

  /**
   * Get today's water summary
   */
  getSummary: async (targetMl?: number): Promise<WaterLogSummary> => {
    const queryParam = targetMl ? `?targetMl=${targetMl}` : "";
    const response = await api.get<WaterLogSummary>(
      `/water-logs/summary${queryParam}`
    );
    return (
      response.data ?? {
        totalMl: 0,
        targetMl: targetMl || 2000,
        percentage: 0,
        logsCount: 0,
        shouldDrinkNow: true,
        minutesSinceLastDrink: 0,
      }
    );
  },

  /**
   * Add a water log entry
   */
  addWaterLog: async (data: CreateWaterLogData): Promise<WaterLog> => {
    const response = await api.post<WaterLog>("/water-logs/amount", data);
    return response.data;
  },

  /**
   * Update a water log entry
   */
  updateWaterLog: async (data: UpdateWaterLogData): Promise<WaterLog> => {
    const response = await api.put<WaterLog>("/water-logs/amount", data);
    return response.data;
  },

  /**
   * Delete today's water logs (reset)
   */
  resetTodayLogs: async (): Promise<void> => {
    await api.delete<void>("/water-logs/amount");
  },
};
