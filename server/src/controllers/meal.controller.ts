import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { MealService } from '../services/meal.service';
import { MealItem, CreateMealItemDto, UpdateMealItemDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Meal Controller
 * Handles meal item HTTP requests
 */
export class MealController extends BaseController<MealItem> {
  private mealService: MealService;

  constructor(pb: PocketBase) {
    super();
    this.mealService = new MealService(pb);
  }

  /**
   * Get all meal items for authenticated user
   * GET /meals/items
   */
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const items = await this.mealService.getByUserId(userId);
      return this.success(res, items);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get meal item by ID
   */
  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.params;
      const item = await this.mealService.findById(id);
      return this.success(res, item);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get total calories from meals
   * GET /meals/total-calories
   */
  async getTotalCalories(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const { date } = req.query;
      const calories = await this.mealService.getTotalCalories(userId, date as string);
      return res.json(calories);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create meal item
   * POST /meals/items
   */
  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const data: CreateMealItemDto = req.body;
      const item = await this.mealService.createItem(data);
      return this.success(res, item, 'Meal item created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update meal item
   * PUT /meals/items
   */
  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.body;
      const data: UpdateMealItemDto = req.body;
      const item = await this.mealService.updateItem(id, data);
      return this.success(res, item, 'Meal item updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete meal item
   * DELETE /meals/items
   */
  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const { id } = req.body;
      await this.mealService.delete(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
