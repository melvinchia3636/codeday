import { Router } from 'express';
import { createUserRoutes } from './user.routes';
import { createHealthRoutes } from './health.routes';
import PocketBase from 'pocketbase';

/**
 * Create main router with all API routes
 */
export const createRoutes = (pb: PocketBase): Router => {
  const router = Router();

  // API routes
  router.use('/users', createUserRoutes(pb));

  // Health Tracker API routes (mounted at root to match API spec)
  // Endpoints: /daily-summaries, /food-logs, /me, /meals, /settings,
  //            /streaks, /waifu, /water-logs, /weight-targets, /workouts
  router.use('/', createHealthRoutes(pb));

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
