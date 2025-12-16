import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { DailySummaryController } from '../controllers/dailySummary.controller';
import { createDailySummarySchema, updateDailySummarySchema } from '../validators/health.validator';

export const createDailySummaryRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new DailySummaryController(pb);

  router.get('/', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post('/', authMiddleware, validate(createDailySummarySchema), (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/', authMiddleware, validate(updateDailySummarySchema), (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
