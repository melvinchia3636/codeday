/**
 * Health Tracking Models
 * Re-exports all health tracking entities from individual model files
 */

// Base
export { BaseRecord } from './base.model';

// Daily Summary
export { DailySummary, CreateDailySummaryDto, UpdateDailySummaryDto } from './dailySummary.model';

// Meal
export {
  Meal,
  CreateMealDto,
  UpdateMealDto,
  MealItem,
  CreateMealItemDto,
  UpdateMealItemDto,
} from './meal.model';

// Settings
export { Settings, CreateSettingsDto, UpdateSettingsDto } from './settings.model';

// Streaks
export { Streaks, CreateStreaksDto, UpdateStreaksDto } from './streaks.model';

// User Profile
export { UserProfile, CreateUserProfileDto, UpdateUserProfileDto } from './userProfile.model';

// Waifu State
export { WaifuState, SetWaifuEmotionDto, SetWaifuGreetingDto } from './waifuState.model';

// Water Log
export { WaterLog, CreateWaterLogDto, UpdateWaterLogDto } from './waterLog.model';

// Weight Target
export { WeightTarget, CreateWeightTargetDto, UpdateWeightTargetDto } from './weightTarget.model';

// Workout
export {
  Workout,
  CreateWorkoutDto,
  UpdateWorkoutDto,
  WorkoutType,
  CreateWorkoutTypeDto,
  UpdateWorkoutTypeDto,
} from './workout.model';
