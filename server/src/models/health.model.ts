/**
 * Health Tracking Models
 * TypeScript interfaces for all health tracking entities
 */

// ============================================
// Base PocketBase Record Interface
// ============================================
export interface BaseRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
}

// ============================================
// Daily Summary
// ============================================
export interface DailySummary extends BaseRecord {
  date: string;
  dietScore: number;
  hydroScore: number;
  effortScore: number;
  totalScore: number;
  waifuId: string;
  userId: string;
}

export interface CreateDailySummaryDto {
  date: string;
  dietScore?: number;
  hydroScore?: number;
  effortScore?: number;
  totalScore?: number;
  waifuId?: string;
}

export interface UpdateDailySummaryDto extends Partial<CreateDailySummaryDto> {}

// ============================================
// Food
// ============================================
export interface Food extends BaseRecord {
  name: string;
  caloriesPer100g: number;
  icon?: string;
}

// ============================================
// Food Log
// ============================================
export interface FoodLog extends BaseRecord {
  foodId: string;
  calories: number;
  timestamp: string;
  userId: string;
}

export interface CreateFoodLogDto {
  foodId: string;
  calories: number;
  timestamp?: string;
}

export interface UpdateFoodLogDto extends Partial<CreateFoodLogDto> {}

// ============================================
// Meal
// ============================================
export interface Meal extends BaseRecord {
  type: string; // e.g., 'breakfast', 'lunch', 'dinner', 'snack'
  time: string;
  totalCalories: number;
  isComplete: boolean;
  userId: string;
}

// ============================================
// Meal Item
// ============================================
export interface MealItem extends BaseRecord {
  foodId: string;
  quantity: number;
  calories: number;
  mealId: string;
}

export interface CreateMealItemDto {
  foodId: string;
  quantity: number;
  calories: number;
  mealId?: string;
}

export interface UpdateMealItemDto extends Partial<CreateMealItemDto> {}

// ============================================
// Settings
// ============================================
export interface Settings extends BaseRecord {
  dietCalorieTarget: number;
  hydroTargetMl: number;
  hydroIntervalMin: number;
  expectedMealsPerDay: number;
  timezone: string;
  userId: string;
}

export interface CreateSettingsDto {
  dietCalorieTarget?: number;
  hydroTargetMl?: number;
  hydroIntervalMin?: number;
  expectedMealsPerDay?: number;
  timezone?: string;
}

export interface UpdateSettingsDto extends Partial<CreateSettingsDto> {}

// ============================================
// Streaks
// ============================================
export interface Streaks extends BaseRecord {
  dietDays: number;
  hydroDays: number;
  workoutDays: number;
  perfectDays: number;
  userId: string;
}

export interface CreateStreaksDto {
  dietDays?: number;
  hydroDays?: number;
  workoutDays?: number;
  perfectDays?: number;
}

export interface UpdateStreaksDto extends Partial<CreateStreaksDto> {}

// ============================================
// User Profile (extends built-in user)
// ============================================
export interface UserProfile extends BaseRecord {
  email: string;
  gender?: string;
  dob?: string; // Date of birth
  heightCm?: number;
  weightKg?: number;
  // Computed field
  bmi?: number;
}

export interface CreateUserProfileDto {
  email: string;
  gender?: string;
  dob?: string;
  heightCm?: number;
  weightKg?: number;
}

export interface UpdateUserProfileDto extends Partial<Omit<CreateUserProfileDto, 'email'>> {}

// ============================================
// Waifu State
// ============================================
export interface WaifuState extends BaseRecord {
  emotionScore: number;
  emotion: string;
  greeting: string;
  userId: string;
}

export interface SetWaifuEmotionDto {
  emotion: string;
}

export interface SetWaifuGreetingDto {
  greeting: string;
}

// ============================================
// Water Log
// ============================================
export interface WaterLog extends BaseRecord {
  amountMl: number;
  timestamp: string;
  userId: string;
}

export interface CreateWaterLogDto {
  amountMl: number;
  timestamp?: string;
}

export interface UpdateWaterLogDto extends Partial<CreateWaterLogDto> {}

// ============================================
// Weight Target
// ============================================
export interface WeightTarget extends BaseRecord {
  targetWeightKg: number;
  targetType: string; // e.g., 'lose', 'gain', 'maintain'
  userId: string;
}

export interface CreateWeightTargetDto {
  targetWeightKg: number;
  targetType: string;
}

export interface UpdateWeightTargetDto extends Partial<CreateWeightTargetDto> {}

// ============================================
// Workout
// ============================================
export interface Workout extends BaseRecord {
  type: string; // e.g., 'running', 'weights', 'yoga'
  durationMin: number;
  caloriesBurned: number;
  effortUnits: number;
  userId: string;
}

export interface CreateWorkoutDto {
  type: string;
  durationMin: number;
  caloriesBurned?: number;
  effortUnits?: number;
}

export interface UpdateWorkoutDto extends Partial<CreateWorkoutDto> {}

// ============================================
// Workout Type (Custom user-defined types)
// ============================================
export interface WorkoutType extends BaseRecord {
  name: string;
  icon: string;
  color: string;
  caloriesPerMinute: number;
  userId: string;
}

export interface CreateWorkoutTypeDto {
  name: string;
  icon: string;
  color: string;
  caloriesPerMinute: number;
}

export interface UpdateWorkoutTypeDto extends Partial<CreateWorkoutTypeDto> {}
