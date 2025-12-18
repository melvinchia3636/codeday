import { Router } from 'express';
import PocketBase from 'pocketbase';
import { createUserRoutes } from './user.routes';
import { createProfileRoutes } from './profile.routes';
import { createMealRoutes } from './meal.routes';
import { createMealItemRoutes } from './mealItem.routes';
import { createSettingsRoutes } from './settings.routes';
import { createStreaksRoutes } from './streaks.routes';
import { createWaterLogRoutes } from './waterLog.routes';
import { createWeightTargetRoutes } from './weightTarget.routes';
import { createWorkoutRoutes } from './workout.routes';
import { createWorkoutTypeRoutes } from './workoutType.routes';
import { createChatRoutes } from './chat.routes';
import { createBugReportRoutes } from './bugReport.routes';

/**
 * Create main router with all API routes
 */
export const createRoutes = (pb: PocketBase): Router => {
  const router = Router();

  // User routes
  router.use('/users', createUserRoutes(pb));

  // Health Tracker API routes
  router.use('/me', createProfileRoutes(pb));
  router.use('/meals', createMealRoutes(pb));
  router.use('/meal-items', createMealItemRoutes(pb));
  router.use('/settings', createSettingsRoutes(pb));
  router.use('/streaks', createStreaksRoutes(pb));
  router.use('/water-logs', createWaterLogRoutes(pb));
  router.use('/weight-targets', createWeightTargetRoutes(pb));
  router.use('/workouts', createWorkoutRoutes(pb));
  router.use('/workout-types', createWorkoutTypeRoutes(pb));

  // Chat routes (Lucy AI)
  router.use('/chat', createChatRoutes(pb));

  // Bug report routes
  router.use('/bug-reports', createBugReportRoutes(pb));

  // Health check
  router.get('/health', (req, res) => {
    res.json({
      success: true,
      message: 'API is running',
      timestamp: new Date().toISOString(),
    });
  });

  return router;
};
