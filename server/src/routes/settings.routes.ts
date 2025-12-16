import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { SettingsController } from '../controllers/settings.controller';
import { createSettingsSchema, updateSettingsSchema } from '../validators/health.validator';

export const createSettingsRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new SettingsController(pb);

  router.get('/', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post('/', authMiddleware, validate(createSettingsSchema), (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/', authMiddleware, validate(updateSettingsSchema), (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
