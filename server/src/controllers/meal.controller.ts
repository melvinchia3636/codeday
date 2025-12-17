import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { MealService } from '../services/meal.service';
import { Meal, CreateMealDto, UpdateMealDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Meal Controller
 * Handles meal log HTTP requests
 */
export class MealController extends BaseController<Meal> {
  private mealService: MealService;

  constructor(pb: PocketBase) {
    super();
    this.mealService = new MealService(pb);
  }

  /**
   * Get all meals for authenticated user
   * GET /meals
   */
  async getAll(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const meals = await this.mealService.getByUserId(userId);
      return this.success(res, meals);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get today's meals for authenticated user
   * GET /meals/today
   */
  async getToday(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const meals = await this.mealService.getTodayMeals(userId);
      return this.success(res, meals);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get meal by ID
   * GET /meals/:id
   */
  async getById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const userId = req.userId!;
      const meal = await this.mealService.getById(id);

      // Check ownership
      if (meal.userId !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      return this.success(res, meal);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create meal
   * POST /meals
   */
  async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateMealDto = req.body;
      const meal = await this.mealService.createMeal(userId, data);
      return this.success(res, meal, 'Meal timestamp', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update meal
   * PUT /meals/:id
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
      if (!(await this.mealService.isOwnedBy(id, userId))) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const data: UpdateMealDto = req.body;
      const meal = await this.mealService.updateMeal(id, data);
      return this.success(res, meal, 'Meal updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete meal
   * DELETE /meals/:id
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
      if (!(await this.mealService.isOwnedBy(id, userId))) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await this.mealService.deleteMeal(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
