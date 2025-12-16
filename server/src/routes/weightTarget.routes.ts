import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { WeightTargetController } from '../controllers/weightTarget.controller';
import { createWeightTargetSchema, updateWeightTargetSchema } from '../validators/health.validator';

export const createWeightTargetRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new WeightTargetController(pb);

  router.get('/', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post('/', authMiddleware, validate(createWeightTargetSchema), (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/', authMiddleware, validate(updateWeightTargetSchema), (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
