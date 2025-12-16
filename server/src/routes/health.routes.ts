import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';

// Controllers
import { DailySummaryController } from '../controllers/dailySummary.controller';
import { FoodLogController } from '../controllers/foodLog.controller';
import { MealController } from '../controllers/meal.controller';
import { SettingsController } from '../controllers/settings.controller';
import { StreaksController } from '../controllers/streaks.controller';
import { ProfileController } from '../controllers/profile.controller';
import { WaifuController } from '../controllers/waifu.controller';
import { WaterLogController } from '../controllers/waterLog.controller';
import { WeightTargetController } from '../controllers/weightTarget.controller';
import { WorkoutController } from '../controllers/workout.controller';
import { WorkoutTypeController } from '../controllers/workoutType.controller';

// Validators
import {
  createDailySummarySchema,
  updateDailySummarySchema,
  createFoodLogSchema,
  updateFoodLogSchema,
  createMealItemSchema,
  updateMealItemSchema,
  createSettingsSchema,
  updateSettingsSchema,
  createStreaksSchema,
  updateStreaksSchema,
  createUserProfileSchema,
  updateUserProfileSchema,
  setWaifuEmotionSchema,
  setWaifuGreetingSchema,
  createWaterLogSchema,
  updateWaterLogSchema,
  createWeightTargetSchema,
  updateWeightTargetSchema,
  createWorkoutSchema,
  updateWorkoutSchema,
} from '../validators/health.validator';

/**
 * Create health-related routes
 * All routes require authentication via authMiddleware
 */
export const createHealthRoutes = (pb: PocketBase): Router => {
  const router = Router();

  // Initialize controllers
  const dailySummaryController = new DailySummaryController(pb);
  const foodLogController = new FoodLogController(pb);
  const mealController = new MealController(pb);
  const settingsController = new SettingsController(pb);
  const streaksController = new StreaksController(pb);
  const profileController = new ProfileController(pb);
  const waifuController = new WaifuController(pb);
  const waterLogController = new WaterLogController(pb);
  const weightTargetController = new WeightTargetController(pb);
  const workoutController = new WorkoutController(pb);
  const workoutTypeController = new WorkoutTypeController(pb);

  // ==========================================
  // Daily Summaries - /daily-summaries
  // ==========================================
  router.get('/daily-summaries', authMiddleware, (req, res, next) =>
    dailySummaryController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post(
    '/daily-summaries',
    authMiddleware,
    validate(createDailySummarySchema),
    (req, res, next) => dailySummaryController.create(req as AuthenticatedRequest, res, next)
  );
  router.put(
    '/daily-summaries',
    authMiddleware,
    validate(updateDailySummarySchema),
    (req, res, next) => dailySummaryController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/daily-summaries', authMiddleware, (req, res, next) =>
    dailySummaryController.delete(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Food Logs - /food-logs
  // ==========================================
  router.get('/food-logs', authMiddleware, (req, res, next) =>
    foodLogController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.get('/food-logs/calories', authMiddleware, (req, res, next) =>
    foodLogController.getCalories(req as AuthenticatedRequest, res, next)
  );
  router.post('/food-logs', authMiddleware, validate(createFoodLogSchema), (req, res, next) =>
    foodLogController.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/food-logs', authMiddleware, validate(updateFoodLogSchema), (req, res, next) =>
    foodLogController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/food-logs', authMiddleware, (req, res, next) =>
    foodLogController.delete(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Me (User Profile) - /me
  // ==========================================
  router.get('/me', authMiddleware, (req, res, next) =>
    profileController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.put('/me', authMiddleware, validate(updateUserProfileSchema), (req, res, next) =>
    profileController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/me', authMiddleware, (req, res, next) =>
    profileController.delete(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Meals - /meals
  // ==========================================
  router.get('/meals/items', authMiddleware, (req, res, next) =>
    mealController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.get('/meals/total-calories', authMiddleware, (req, res, next) =>
    mealController.getTotalCalories(req as AuthenticatedRequest, res, next)
  );
  router.post('/meals/items', authMiddleware, validate(createMealItemSchema), (req, res, next) =>
    mealController.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/meals/items', authMiddleware, validate(updateMealItemSchema), (req, res, next) =>
    mealController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/meals/items', authMiddleware, (req, res, next) =>
    mealController.delete(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Settings - /settings
  // ==========================================
  router.get('/settings', authMiddleware, (req, res, next) =>
    settingsController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post('/settings', authMiddleware, validate(createSettingsSchema), (req, res, next) =>
    settingsController.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/settings', authMiddleware, validate(updateSettingsSchema), (req, res, next) =>
    settingsController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/settings', authMiddleware, (req, res, next) =>
    settingsController.delete(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Streaks - /streaks
  // ==========================================
  router.get('/streaks', authMiddleware, (req, res, next) =>
    streaksController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post('/streaks', authMiddleware, validate(createStreaksSchema), (req, res, next) =>
    streaksController.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/streaks', authMiddleware, validate(updateStreaksSchema), (req, res, next) =>
    streaksController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/streaks', authMiddleware, (req, res, next) =>
    streaksController.delete(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Waifu - /waifu
  // ==========================================
  // Emotion endpoints
  router.get('/waifu/emotion', authMiddleware, (req, res, next) =>
    waifuController.getEmotion(req as AuthenticatedRequest, res, next)
  );
  router.post('/waifu/emotion', authMiddleware, validate(setWaifuEmotionSchema), (req, res, next) =>
    waifuController.setEmotion(req as AuthenticatedRequest, res, next)
  );
  router.put('/waifu/emotion', authMiddleware, validate(setWaifuEmotionSchema), (req, res, next) =>
    waifuController.updateEmotion(req as AuthenticatedRequest, res, next)
  );
  router.delete('/waifu/emotion', authMiddleware, (req, res, next) =>
    waifuController.deleteEmotion(req as AuthenticatedRequest, res, next)
  );

  // Greeting endpoints
  router.get('/waifu/greeting', authMiddleware, (req, res, next) =>
    waifuController.getGreeting(req as AuthenticatedRequest, res, next)
  );
  router.post(
    '/waifu/greeting',
    authMiddleware,
    validate(setWaifuGreetingSchema),
    (req, res, next) => waifuController.setGreeting(req as AuthenticatedRequest, res, next)
  );
  router.put(
    '/waifu/greeting',
    authMiddleware,
    validate(setWaifuGreetingSchema),
    (req, res, next) => waifuController.updateGreeting(req as AuthenticatedRequest, res, next)
  );
  router.delete('/waifu/greeting', authMiddleware, (req, res, next) =>
    waifuController.deleteGreeting(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Water Logs - /water-logs
  // ==========================================
  // Get today's logs list
  router.get('/water-logs', authMiddleware, (req, res, next) =>
    waterLogController.getTodayLogs(req as AuthenticatedRequest, res, next)
  );
  // Get today's summary
  router.get('/water-logs/summary', authMiddleware, (req, res, next) =>
    waterLogController.getSummary(req as AuthenticatedRequest, res, next)
  );
  // Get today's total amount
  router.get('/water-logs/amount', authMiddleware, (req, res, next) =>
    waterLogController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post(
    '/water-logs/amount',
    authMiddleware,
    validate(createWaterLogSchema),
    (req, res, next) => waterLogController.create(req as AuthenticatedRequest, res, next)
  );
  router.put(
    '/water-logs/amount',
    authMiddleware,
    validate(updateWaterLogSchema),
    (req, res, next) => waterLogController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/water-logs/amount', authMiddleware, (req, res, next) =>
    waterLogController.delete(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Weight Targets - /weight-targets
  // ==========================================
  router.get('/weight-targets', authMiddleware, (req, res, next) =>
    weightTargetController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post(
    '/weight-targets',
    authMiddleware,
    validate(createWeightTargetSchema),
    (req, res, next) => weightTargetController.create(req as AuthenticatedRequest, res, next)
  );
  router.put(
    '/weight-targets',
    authMiddleware,
    validate(updateWeightTargetSchema),
    (req, res, next) => weightTargetController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/weight-targets', authMiddleware, (req, res, next) =>
    weightTargetController.delete(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Workouts - /workouts
  // ==========================================
  router.get('/workouts/effort-units', authMiddleware, (req, res, next) =>
    workoutController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post(
    '/workouts/effort-units',
    authMiddleware,
    validate(createWorkoutSchema),
    (req, res, next) => workoutController.create(req as AuthenticatedRequest, res, next)
  );
  router.put(
    '/workouts/effort-units',
    authMiddleware,
    validate(updateWorkoutSchema),
    (req, res, next) => workoutController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/workouts/effort-units', authMiddleware, (req, res, next) =>
    workoutController.delete(req as AuthenticatedRequest, res, next)
  );

  // ==========================================
  // Workout Types - /workout-types
  // ==========================================
  router.get('/workout-types', authMiddleware, (req, res, next) =>
    workoutTypeController.getAll(req as AuthenticatedRequest, res, next)
  );
  router.get('/workout-types/:id', authMiddleware, (req, res, next) =>
    workoutTypeController.getById(req as AuthenticatedRequest, res, next)
  );
  router.post('/workout-types', authMiddleware, (req, res, next) =>
    workoutTypeController.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/workout-types/:id', authMiddleware, (req, res, next) =>
    workoutTypeController.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/workout-types/:id', authMiddleware, (req, res, next) =>
    workoutTypeController.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
