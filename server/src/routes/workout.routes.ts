import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { WorkoutController } from '../controllers/workout.controller';
import { createWorkoutSchema, updateWorkoutSchema } from '../validators/health.validator';

export const createWorkoutRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new WorkoutController(pb);

  // Get all workouts for user (history)
  router.get('/', authMiddleware, (req, res, next) =>
    controller.getHistory(req as AuthenticatedRequest, res, next)
  );
  // Get workout by ID
  router.get('/:id', authMiddleware, (req, res, next) =>
    controller.getById(req as AuthenticatedRequest, res, next)
  );
  // Create new workout
  router.post('/', authMiddleware, validate(createWorkoutSchema), (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  // Update workout by ID
  router.put('/:id', authMiddleware, validate(updateWorkoutSchema), (req, res, next) =>
    controller.updateById(req as AuthenticatedRequest, res, next)
  );
  // Delete workout by ID
  router.delete('/:id', authMiddleware, (req, res, next) =>
    controller.deleteById(req as AuthenticatedRequest, res, next)
  );

  // Effort Units (today's summary) - legacy endpoints
  router.get('/effort-units', authMiddleware, (req, res, next) =>
    controller.getAll(req as AuthenticatedRequest, res, next)
  );
  router.post('/effort-units', authMiddleware, validate(createWorkoutSchema), (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );
  router.put('/effort-units', authMiddleware, validate(updateWorkoutSchema), (req, res, next) =>
    controller.update(req as AuthenticatedRequest, res, next)
  );
  router.delete('/effort-units', authMiddleware, (req, res, next) =>
    controller.delete(req as AuthenticatedRequest, res, next)
  );

  return router;
};
