import { api } from "./api";

/**
 * User data types (from users collection)
 */
export interface UserData {
  id: string;
  username?: string;
  email?: string;
  name?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  dob?: string;
  heightCm?: number;
  weightKg?: number;
  timestamp?: string;
  updated?: string;
}

export interface UpdateUserData {
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  dob?: string;
  heightCm?: number;
  weightKg?: number;
}

/**
 * User profile types (from profiles collection - legacy)
 */
export interface UserProfile {
  id: string;
  userId?: string;
  name?: string;
  email?: string;
  username?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  dob?: string;
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  timestamp?: string;
  updated?: string;
}

export interface UpdateProfileData {
  name?: string;
  gender?: "male" | "female" | "other" | "prefer_not_to_say";
  dob?: string;
  heightCm?: number;
  weightKg?: number;
}

/**
 * User settings types
 */
export interface UserSettings {
  id: string;
  userId: string;
  dietCalorieTarget: number;
  workoutCalorieTarget: number;
  hydroTargetMl: number;
  hydroIntervalMin: number;
  expectedMealsPerDay: number;
  timezone: string;
  timestamp?: string;
  updated?: string;
}

export interface UpdateSettingsData {
  dietCalorieTarget?: number;
  workoutCalorieTarget?: number;
  hydroTargetMl?: number;
  hydroIntervalMin?: number;
  expectedMealsPerDay?: number;
  timezone?: string;
}

/**
 * Weight target types
 */
export interface WeightTarget {
  id: string;
  userId: string;
  targetWeightKg: number;
  targetType: "lose" | "gain" | "maintain";
  timestamp?: string;
  updated?: string;
}

export interface UpdateWeightTargetData {
  targetWeightKg?: number;
  targetType?: "lose" | "gain" | "maintain";
}

/**
 * Profile API functions
 */
export const profileApi = {
  /**
   * Get current user's data from users collection (gender, dob, height, weight)
   */
  getUserData: async (): Promise<UserData | null> => {
    const response = await api.get<UserData | null>("/users/me");
    return response.data;
  },

  /**
   * Get current user's profile (from /me endpoint - user_profiles collection)
   */
  getProfile: async (): Promise<UserProfile | null> => {
    const response = await api.get<UserProfile | null>("/me");
    return response.data;
  },

  /**
   * Update current user's profile (profiles collection)
   */
  updateProfile: async (data: UpdateProfileData): Promise<UserProfile> => {
    const response = await api.put<UserProfile>("/me", data);
    return response.data;
  },

  /**
   * Update current user's data (users collection via /users/me)
   */
  updateUserData: async (data: UpdateUserData): Promise<UserData> => {
    const response = await api.patch<UserData>("/users/me", data);
    return response.data;
  },

  /**
   * Get current user's settings
   */
  getSettings: async (): Promise<UserSettings | null> => {
    const response = await api.get<UserSettings | null>("/settings");
    return response.data;
  },

  /**
   * Update current user's settings
   */
  updateSettings: async (data: UpdateSettingsData): Promise<UserSettings> => {
    const response = await api.put<UserSettings>("/settings", data);
    return response.data;
  },

  /**
   * Get current user's weight target
   */
  getWeightTarget: async (): Promise<WeightTarget | null> => {
    const response = await api.get<WeightTarget | null>("/weight-targets");
    return response.data;
  },

  /**
   * Update current user's weight target
   */
  updateWeightTarget: async (
    data: UpdateWeightTargetData
  ): Promise<WeightTarget> => {
    const response = await api.put<WeightTarget>("/weight-targets", data);
    return response.data;
  },

  /**
   * Create weight target
   */
  createWeightTarget: async (
    data: UpdateWeightTargetData
  ): Promise<WeightTarget> => {
    const response = await api.post<WeightTarget>("/weight-targets", data);
    return response.data;
  },
};
