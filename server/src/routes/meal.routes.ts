import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { MealController } from '../controllers/meal.controller';
import { createMealItemSchema, updateMealItemSchema } from '../validators/health.validator';

export const createMealRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new MealController(pb);

  router.get('/items', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.get('/total-calories', authMiddleware, (req, res, next) =>
    controller.getTotalCalories(req as AuthenticatedRequest, res, next)
  );
  router.post('/items', authMiddleware, validate(createMealItemSchema), (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/items', authMiddleware, validate(updateMealItemSchema), (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/items', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
