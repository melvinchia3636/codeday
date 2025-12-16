import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { StreaksController } from '../controllers/streaks.controller';
import { createStreaksSchema, updateStreaksSchema } from '../validators/health.validator';

export const createStreaksRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new StreaksController(pb);

  router.get('/', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post('/', authMiddleware, validate(createStreaksSchema), (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/', authMiddleware, validate(updateStreaksSchema), (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
