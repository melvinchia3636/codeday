import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { WorkoutService } from '../services/workout.service';
import { Workout, CreateWorkoutDto, UpdateWorkoutDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Workout Controller
 * Handles workout HTTP requests
 */
export class WorkoutController extends BaseController<Workout> {
  private workoutService: WorkoutService;

  constructor(pb: PocketBase) {
    super();
    this.workoutService = new WorkoutService(pb);
  }

  /**
   * Get total effort units for authenticated user
   * GET /workouts/effort-units
   */
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      // Effort units are aggregated for today only
      const effortUnits = await this.workoutService.getTotalEffortUnits(userId);
      return res.json(effortUnits);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get workout by ID
   */
  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const workout = await this.workoutService.findById(id);
      return this.success(res, workout);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create workout
   * POST /workouts/effort-units
   */
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateWorkoutDto = req.body;
      const workout = await this.workoutService.createWorkout(userId, data);
      return this.success(res, workout, 'Workout created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update workout
   * PUT /workouts/effort-units
   */
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.body;
      const data: UpdateWorkoutDto = req.body;
      const workout = await this.workoutService.updateWorkout(id, data);
      return this.success(res, workout, 'Workout updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete workouts
   * DELETE /workouts/effort-units
   */
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      // Delete today's workouts only
      await this.workoutService.deleteTodayWorkouts(userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
