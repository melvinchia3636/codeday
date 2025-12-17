import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { WorkoutTypeService } from '../services/workoutType.service';
import { WorkoutType, CreateWorkoutTypeDto, UpdateWorkoutTypeDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Workout Type Controller
 * Handles custom workout type HTTP requests
 */
export class WorkoutTypeController extends BaseController<WorkoutType> {
  private workoutTypeService: WorkoutTypeService;

  constructor(pb: PocketBase) {
    super();
    this.workoutTypeService = new WorkoutTypeService(pb);
  }

  /**
   * Get all workout types for authenticated user
   * GET /workout-types
   */
  async getAll(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const types = await this.workoutTypeService.getByUserId(userId);
      return this.success(res, types);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get workout type by ID
   * GET /workout-types/:id
   */
  async getById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const userId = req.userId!;
      const type = await this.workoutTypeService.getById(id);

      // Check ownership
      if (type.userId !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      return this.success(res, type);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create workout type
   * POST /workout-types
   */
  async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    console.log(req.body);
    try {
      const userId = req.userId!;
      const data: CreateWorkoutTypeDto = req.body;
      const type = await this.workoutTypeService.createType(userId, data);
      return this.success(res, type, 'Workout type timestamp', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update workout type
   * PUT /workout-types/:id
   */
  async update(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const userId = req.userId!;

      // Check ownership
      if (!(await this.workoutTypeService.isOwnedBy(id, userId))) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const data: UpdateWorkoutTypeDto = req.body;
      const type = await this.workoutTypeService.updateType(id, data);
      return this.success(res, type, 'Workout type updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete workout type
   * DELETE /workout-types/:id
   */
  async delete(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const userId = req.userId!;

      // Check ownership
      if (!(await this.workoutTypeService.isOwnedBy(id, userId))) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await this.workoutTypeService.deleteType(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
