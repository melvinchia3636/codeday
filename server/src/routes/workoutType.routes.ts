import { Router } from 'express';
import PocketBase from 'pocketbase';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { WorkoutTypeController } from '../controllers/workoutType.controller';

export const createWorkoutTypeRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new WorkoutTypeController(pb);

  router.get('/', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.get('/:id', authMiddleware, (req, res, next) =>
    controller.getById(req as AuthenticatedRequest, res, next)
  );
  router.post('/', authMiddleware, (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/:id', authMiddleware, (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/:id', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
