import { Response, NextFunction } from 'express';
import { BaseController } from './base.controller';
import { WaifuService } from '../services/waifu.service';
import { StreaksService } from '../services/streaks.service';
import { FoodLogService } from '../services/foodLog.service';
import { WaterLogService } from '../services/waterLog.service';
import { WorkoutService } from '../services/workout.service';
import { WaifuState, SetWaifuEmotionDto, SetWaifuGreetingDto } from '../models/health.model';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import PocketBase from 'pocketbase';

/**
 * Waifu Controller
 * Handles waifu emotion and greeting HTTP requests
 * Integrates with OpenAI for AI-generated responses
 */
export class WaifuController extends BaseController<WaifuState> {
  private waifuService: WaifuService;
  private streaksService: StreaksService;
  private foodLogService: FoodLogService;
  private waterLogService: WaterLogService;
  private workoutService: WorkoutService;

  constructor(pb: PocketBase) {
    super();
    this.waifuService = new WaifuService(pb);
    this.streaksService = new StreaksService(pb);
    this.foodLogService = new FoodLogService(pb);
    this.waterLogService = new WaterLogService(pb);
    this.workoutService = new WorkoutService(pb);
  }

  // Base controller methods - redirect to emotion for default behavior
  async getAll(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    return this.getEmotion(req, res, next);
  }

  async getById(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    return this.getEmotion(req, res, next);
  }

  async create(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    return this.setEmotion(req, res, next);
  }

  async update(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    return this.updateEmotion(req, res, next);
  }

  async delete(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    return this.deleteEmotion(req, res, next);
  }

  /**
   * Calculate current health score for user
   */
  private async calculateHealthScore(userId: string): Promise<number> {
    const [dietScore, hydroScore, effortScore] = await Promise.all([
      this.foodLogService.calculateDietScore(userId),
      this.waterLogService.calculateHydroScore(userId),
      this.workoutService.calculateEffortScore(userId)
    ]);

    // Weighted average: diet 40%, hydration 30%, exercise 30%
    return Math.round((dietScore * 0.4) + (hydroScore * 0.3) + (effortScore * 0.3));
  }

  // ==========================================
  // Emotion endpoints
  // ==========================================

  /**
   * Get waifu emotion
   * GET /waifu/emotion
   */
  async getEmotion(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const emotion = await this.waifuService.getEmotion(userId);
      return res.json(emotion);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Set waifu emotion
   * POST /waifu/emotion
   */
  async setEmotion(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: SetWaifuEmotionDto = req.body;
      await this.waifuService.setEmotion(userId, data);
      return res.status(201).json({ message: 'Emotion timestamp' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update waifu emotion
   * PUT /waifu/emotion
   */
  async updateEmotion(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: SetWaifuEmotionDto = req.body;
      await this.waifuService.setEmotion(userId, data);
      return res.json({ message: 'Emotion updated' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete waifu emotion
   * DELETE /waifu/emotion
   */
  async deleteEmotion(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      await this.waifuService.deleteEmotion(userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }

  // ==========================================
  // Greeting endpoints
  // ==========================================

  /**
   * Get waifu greeting (AI-generated based on health data)
   * GET /waifu/greeting
   */
  async getGreeting(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      
      // Get user's streaks and health score
      const [streaks, healthScore] = await Promise.all([
        this.streaksService.getByUserId(userId),
        this.calculateHealthScore(userId)
      ]);

      // Generate AI response
      const waifuResponse = await this.waifuService.getWaifuGreetingWithAI(
        userId,
        healthScore,
        streaks
      );

      return res.json(waifuResponse);
    } catch (error) {
      next(error);
    }
  }

  /**
   * Set waifu greeting
   * POST /waifu/greeting
   */
  async setGreeting(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: SetWaifuGreetingDto = req.body;
      await this.waifuService.setGreeting(userId, data);
      return res.status(201).json({ message: 'Greeting timestamp' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Update waifu greeting
   * PUT /waifu/greeting
   */
  async updateGreeting(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      const data: SetWaifuGreetingDto = req.body;
      await this.waifuService.setGreeting(userId, data);
      return res.json({ message: 'Greeting updated' });
    } catch (error) {
      next(error);
    }
  }

  /**
   * Delete waifu greeting
   * DELETE /waifu/greeting
   */
  async deleteGreeting(req: AuthenticatedRequest, res: Response, next: NextFunction): Promise<Response | void> {
    try {
      const userId = req.userId!;
      await this.waifuService.deleteGreeting(userId);
      return res.status(204).send();
    } catch (error) {
      next(error);
    }
  }
}
