import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { FoodLogController } from '../controllers/foodLog.controller';
import { createFoodLogSchema, updateFoodLogSchema } from '../validators/health.validator';

export const createFoodLogRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new FoodLogController(pb);

  router.get('/', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.get('/calories', authMiddleware, (req, res, next) =>
    controller.getCalories(req as AuthenticatedRequest, res, next)
  );
  router.post('/', authMiddleware, validate(createFoodLogSchema), (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/', authMiddleware, validate(updateFoodLogSchema), (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
