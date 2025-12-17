import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { WaterLogController } from '../controllers/waterLog.controller';
import { createWaterLogSchema, updateWaterLogSchema } from '../validators/health.validator';

export const createWaterLogRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new WaterLogController(pb);

  // Get today's logs list
  router.get('/', authMiddleware, (req, res, next) =>
    controller.getTodayLogs(req as AuthenticatedRequest, res, next)
  );
  // Get all logs (history)
  router.get('/all', authMiddleware, (req, res, next) =>
    controller.getAllLogs(req as AuthenticatedRequest, res, next)
  );
  // Get today's summary
  router.get('/summary', authMiddleware, (req, res, next) =>
    controller.getSummary(req as AuthenticatedRequest, res, next)
  );
  // Get today's total amount
  router.get('/amount', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post('/amount', authMiddleware, validate(createWaterLogSchema), (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/amount', authMiddleware, validate(updateWaterLogSchema), (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/amount', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  // Delete a specific water log by ID
  router.delete('/:id', authMiddleware, (req, res, next) =>
    controller.deleteById(req as AuthenticatedRequest, res, next)
  );

  return router;
};
