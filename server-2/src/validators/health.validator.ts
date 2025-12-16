import { z } from 'zod';

/**
 * Health Tracking Validation Schemas
 * Zod schemas for all health-related API request bodies
 */

// ============================================
// Daily Summary Validators
// ============================================
export const createDailySummarySchema = z.object({
  date: z.string().min(1, 'Date is required'),
  dietScore: z.number().int().min(0).max(100).optional(),
  hydroScore: z.number().int().min(0).max(100).optional(),
  effortScore: z.number().int().min(0).max(100).optional(),
  totalScore: z.number().int().min(0).max(100).optional(),
  waifuId: z.string().optional(),
});

export const updateDailySummarySchema = createDailySummarySchema.partial();

// ============================================
// Food Log Validators
// ============================================
export const createFoodLogSchema = z.object({
  foodId: z.string().min(1, 'Food ID is required'),
  calories: z.number().int().min(0, 'Calories must be positive'),
  timestamp: z.string().optional(),
});

export const updateFoodLogSchema = createFoodLogSchema.partial();

// ============================================
// Meal Item Validators
// ============================================
export const createMealItemSchema = z.object({
  foodId: z.string().min(1, 'Food ID is required'),
  quantity: z.number().positive('Quantity must be positive'),
  calories: z.number().int().min(0, 'Calories must be positive'),
  mealId: z.string().optional(),
});

export const updateMealItemSchema = createMealItemSchema.partial();

// ============================================
// Settings Validators
// ============================================
export const createSettingsSchema = z.object({
  dietCalorieTarget: z.number().int().min(0).optional(),
  hydroTargetMl: z.number().int().min(0).optional(),
  hydroIntervalMin: z.number().int().min(0).optional(),
  expectedMealsPerDay: z.number().int().min(1).max(10).optional(),
  timezone: z.string().optional(),
});

export const updateSettingsSchema = createSettingsSchema.partial();

// ============================================
// Streaks Validators
// ============================================
export const createStreaksSchema = z.object({
  dietDays: z.number().int().min(0).optional(),
  hydroDays: z.number().int().min(0).optional(),
  workoutDays: z.number().int().min(0).optional(),
  perfectDays: z.number().int().min(0).optional(),
});

export const updateStreaksSchema = createStreaksSchema.partial();

// ============================================
// User Profile Validators
// ============================================
export const createUserProfileSchema = z.object({
  email: z.string().email('Invalid email address'),
  gender: z.string().optional(),
  dob: z.string().optional(),
  heightCm: z.number().positive().optional(),
  weightKg: z.number().positive().optional(),
});

export const updateUserProfileSchema = z.object({
  gender: z.string().optional(),
  dob: z.string().optional(),
  heightCm: z.number().positive().optional(),
  weightKg: z.number().positive().optional(),
});

// ============================================
// Waifu Validators
// ============================================
export const setWaifuEmotionSchema = z.object({
  emotion: z.string().min(1, 'Emotion is required'),
});

export const setWaifuGreetingSchema = z.object({
  greeting: z.string().min(1, 'Greeting is required'),
});

// ============================================
// Water Log Validators
// ============================================
export const createWaterLogSchema = z.object({
  amountMl: z.number().int().min(0, 'Amount must be positive'),
  timestamp: z.string().optional(),
});

export const updateWaterLogSchema = createWaterLogSchema.partial();

// ============================================
// Weight Target Validators
// ============================================
export const createWeightTargetSchema = z.object({
  targetWeightKg: z.number().positive('Target weight must be positive'),
  targetType: z.string().min(1, 'Target type is required'),
});

export const updateWeightTargetSchema = createWeightTargetSchema.partial();

// ============================================
// Workout Validators
// ============================================
export const createWorkoutSchema = z.object({
  type: z.string().min(1, 'Workout type is required'),
  durationMin: z.number().int().min(1, 'Duration must be at least 1 minute'),
  caloriesBurned: z.number().int().min(0).optional(),
  effortUnits: z.number().int().min(0).optional(),
});

export const updateWorkoutSchema = createWorkoutSchema.partial();

// ============================================
// Type Exports
// ============================================
export type CreateDailySummaryInput = z.infer<typeof createDailySummarySchema>;
export type UpdateDailySummaryInput = z.infer<typeof updateDailySummarySchema>;
export type CreateFoodLogInput = z.infer<typeof createFoodLogSchema>;
export type UpdateFoodLogInput = z.infer<typeof updateFoodLogSchema>;
export type CreateMealItemInput = z.infer<typeof createMealItemSchema>;
export type UpdateMealItemInput = z.infer<typeof updateMealItemSchema>;
export type CreateSettingsInput = z.infer<typeof createSettingsSchema>;
export type UpdateSettingsInput = z.infer<typeof updateSettingsSchema>;
export type CreateStreaksInput = z.infer<typeof createStreaksSchema>;
export type UpdateStreaksInput = z.infer<typeof updateStreaksSchema>;
export type CreateUserProfileInput = z.infer<typeof createUserProfileSchema>;
export type UpdateUserProfileInput = z.infer<typeof updateUserProfileSchema>;
export type SetWaifuEmotionInput = z.infer<typeof setWaifuEmotionSchema>;
export type SetWaifuGreetingInput = z.infer<typeof setWaifuGreetingSchema>;
export type CreateWaterLogInput = z.infer<typeof createWaterLogSchema>;
export type UpdateWaterLogInput = z.infer<typeof updateWaterLogSchema>;
export type CreateWeightTargetInput = z.infer<typeof createWeightTargetSchema>;
export type UpdateWeightTargetInput = z.infer<typeof updateWeightTargetSchema>;
export type CreateWorkoutInput = z.infer<typeof createWorkoutSchema>;
export type UpdateWorkoutInput = z.infer<typeof updateWorkoutSchema>;
