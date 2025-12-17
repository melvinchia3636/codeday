import { BaseService } from './base.service';
import { Workout, CreateWorkoutDto, UpdateWorkoutDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Effort Units Calculation Logic:
 *
 * Effort units are calculated based on workout type and duration.
 * Different workout types have different intensity multipliers:
 *
 * | Workout Type   | Multiplier | Description                    |
 * |----------------|------------|--------------------------------|
 * | running        | 2.0        | High-intensity cardio          |
 * | hiit           | 2.5        | Very high-intensity interval   |
 * | cycling        | 1.8        | Moderate-high intensity        |
 * | swimming       | 2.0        | Full-body high intensity       |
 * | weights        | 1.5        | Strength training              |
 * | yoga           | 0.8        | Low intensity, flexibility     |
 * | walking        | 0.5        | Low intensity cardio           |
 * | stretching     | 0.3        | Very low intensity             |
 * | other          | 1.0        | Default multiplier             |
 *
 * Formula: effortUnits = duration (minutes) × intensity multiplier
 *
 * Daily target: 60 effort units (equivalent to 30 min running or 40 min weights)
 */

const WORKOUT_INTENSITY: Record<string, number> = {
  hiit: 2.5,
  running: 2.0,
  swimming: 2.0,
  cycling: 1.8,
  weights: 1.5,
  basketball: 1.8,
  soccer: 1.8,
  tennis: 1.6,
  dancing: 1.2,
  yoga: 0.8,
  pilates: 0.9,
  walking: 0.5,
  stretching: 0.3,
  other: 1.0,
};

// Default calories burned per minute by workout type (approximate)
const CALORIES_PER_MINUTE: Record<string, number> = {
  hiit: 15,
  running: 12,
  swimming: 11,
  cycling: 10,
  weights: 6,
  basketball: 9,
  soccer: 10,
  tennis: 8,
  dancing: 7,
  yoga: 3,
  pilates: 4,
  walking: 4,
  stretching: 2,
  other: 5,
};

/**
 * Workout Service
 * Handles workout logging operations with effort units calculation
 */
export class WorkoutService extends BaseService<Workout> {
  // Daily effort units target
  private readonly DAILY_EFFORT_TARGET = 60;

  constructor(pb: PocketBase) {
    super(pb, 'workouts');
  }

  /**
   * Get today's date string
   */
  private getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }

  /**
   * Calculate effort units for a workout
   */
  calculateEffortUnits(type: string, durationMin: number): number {
    const intensity = WORKOUT_INTENSITY[type.toLowerCase()] || WORKOUT_INTENSITY.other;
    return Math.round(durationMin * intensity);
  }

  /**
   * Calculate estimated calories burned
   */
  calculateCaloriesBurned(type: string, durationMin: number): number {
    const caloriesPerMin = CALORIES_PER_MINUTE[type.toLowerCase()] || CALORIES_PER_MINUTE.other;
    return Math.round(durationMin * caloriesPerMin);
  }

  /**
   * Get all workouts for a user
   */
  async getByUserId(userId: string): Promise<Workout[]> {
    return await this.findByFilter(`userId="${userId}"`);
  }

  /**
   * Get today's workouts for a user
   */
  async getTodayWorkouts(userId: string): Promise<Workout[]> {
    const today = this.getTodayDateString();
    return await this.findByFilter(`userId="${userId}" && timestamp~"${today}"`);
  }

  /**
   * Get total effort units for today
   */
  async getTotalEffortUnits(userId: string): Promise<number> {
    const todayWorkouts = await this.getTodayWorkouts(userId);
    return todayWorkouts.reduce((total, workout) => total + (workout.effortUnits || 0), 0);
  }

  /**
   * Calculate effort score (0-100) based on today's effort units
   */
  async calculateEffortScore(userId: string): Promise<number> {
    const totalEffort = await this.getTotalEffortUnits(userId);
    const score = Math.min(100, Math.round((totalEffort / this.DAILY_EFFORT_TARGET) * 100));
    return score;
  }

  /**
   * Get workout summary for today
   */
  async getTodaySummary(userId: string): Promise<{
    totalEffortUnits: number;
    targetEffortUnits: number;
    percentage: number;
    workoutsCount: number;
    totalDurationMin: number;
    totalCaloriesBurned: number;
  }> {
    const todayWorkouts = await this.getTodayWorkouts(userId);

    const summary = todayWorkouts.reduce(
      (acc, workout) => {
        return {
          totalEffortUnits: acc.totalEffortUnits + (workout.effortUnits || 0),
          totalDurationMin: acc.totalDurationMin + (workout.durationMin || 0),
          totalCaloriesBurned: acc.totalCaloriesBurned + (workout.caloriesBurned || 0),
        };
      },
      { totalEffortUnits: 0, totalDurationMin: 0, totalCaloriesBurned: 0 }
    );

    return {
      ...summary,
      targetEffortUnits: this.DAILY_EFFORT_TARGET,
      percentage: Math.min(
        100,
        Math.round((summary.totalEffortUnits / this.DAILY_EFFORT_TARGET) * 100)
      ),
      workoutsCount: todayWorkouts.length,
    };
  }

  /**
   * Create a workout entry with auto-calculated effort units and calories
   */
  async createWorkout(userId: string, data: CreateWorkoutDto): Promise<Workout> {
    const effortUnits = data.effortUnits || this.calculateEffortUnits(data.type, data.durationMin);
    const caloriesBurned =
      data.caloriesBurned || this.calculateCaloriesBurned(data.type, data.durationMin);

    return await this.create({
      ...data,
      userId,
      effortUnits,
      caloriesBurned,
    });
  }

  /**
   * Update a workout entry
   */
  async updateWorkout(id: string, data: UpdateWorkoutDto): Promise<Workout> {
    // Recalculate effort units if type or duration changed
    if (data.type && data.durationMin) {
      data.effortUnits = data.effortUnits || this.calculateEffortUnits(data.type, data.durationMin);
      data.caloriesBurned =
        data.caloriesBurned || this.calculateCaloriesBurned(data.type, data.durationMin);
    }
    return await this.update(id, data);
  }

  /**
   * Delete all workouts for a user (today only)
   */
  async deleteTodayWorkouts(userId: string): Promise<boolean> {
    const workouts = await this.getTodayWorkouts(userId);
    for (const workout of workouts) {
      await this.delete(workout.id);
    }
    return true;
  }
}
