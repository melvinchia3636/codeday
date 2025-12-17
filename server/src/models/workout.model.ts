import { BaseRecord } from './base.model';

/**
 * Workout Model
 * Tracks workout sessions
 */
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

/**
 * Workout Type Model
 * Custom user-defined workout types
 */
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
