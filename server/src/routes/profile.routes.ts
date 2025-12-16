import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { ProfileController } from '../controllers/profile.controller';
import { updateUserProfileSchema } from '../validators/health.validator';

export const createProfileRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new ProfileController(pb);

  router.get('/', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.put('/', authMiddleware, validate(updateUserProfileSchema), (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
