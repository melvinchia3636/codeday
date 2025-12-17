import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { MealItemService } from '../services/mealItem.service';
import { MealItem, CreateMealItemDto, UpdateMealItemDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Meal Item Controller
 * Handles meal item/food logging HTTP requests
 */
export class MealItemController extends BaseController<MealItem> {
  private mealItemService: MealItemService;

  constructor(pb: PocketBase) {
    super();
    this.mealItemService = new MealItemService(pb);
  }

  /**
   * Get all meal items for authenticated user
   * GET /meal-items
   */
  async getAll(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const items = await this.mealItemService.getByUserId(userId);
      return this.success(res, items);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get today's meal items for authenticated user
   * GET /meal-items/today
   */
  async getToday(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const items = await this.mealItemService.getTodayItems(userId);
      return this.success(res, items);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Get meal item by ID
   * GET /meal-items/:id
   */
  async getById(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const { id } = req.params;
      const userId = req.userId!;
      const item = await this.mealItemService.getById(id);

      // Check ownership
      if (item.userId !== userId) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      return this.success(res, item);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Create meal item
   * POST /meal-items
   */
  async create(
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: CreateMealItemDto = req.body;
      const item = await this.mealItemService.createItem(userId, data);
      return this.success(res, item, 'Meal item created', 201);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update meal item
   * PUT /meal-items/:id
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
      if (!(await this.mealItemService.isOwnedBy(id, userId))) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      const data: UpdateMealItemDto = req.body;
      const item = await this.mealItemService.updateItem(id, data);
      return this.success(res, item, 'Meal item updated');
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete meal item
   * DELETE /meal-items/:id
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
      if (!(await this.mealItemService.isOwnedBy(id, userId))) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      await this.mealItemService.deleteItem(id);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
