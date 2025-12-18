import { Router } from 'express';
import PocketBase from 'pocketbase';
import { BugReportController } from '../controllers/bugReport.controller';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';

/**
 * Create bug report routes
 */
export const createBugReportRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new BugReportController(pb);

  // Create bug report
  router.post('/', authMiddleware, (req, res, next) =>
    controller.create(req as AuthenticatedRequest, res, next)
  );

  // Get all bug reports for current user
  router.get('/', authMiddleware, (req, res, next) =>
    controller.getMyReports(req as AuthenticatedRequest, res, next)
  );

  // Get bug report by ID
  router.get('/:id', authMiddleware, (req, res, next) => controller.getById(req, res, next));

  // Update bug report
  router.patch('/:id', authMiddleware, (req, res, next) => controller.update(req, res, next));

  // Delete bug report
  router.delete('/:id', authMiddleware, (req, res, next) => controller.delete(req, res, next));

  return router;
};
