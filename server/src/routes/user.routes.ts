import { Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import {
  createUserSchema,
  updateUserSchema,
  loginSchema,
  queryParamsSchema,
  idParamSchema,
  emailSchema,
  passwordResetSchema,
  verificationTokenSchema,
} from '../validators/user.validator';
import PocketBase from 'pocketbase';

/**
 * Create user routes
 */
export const createUserRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const userController = new UserController(pb);

  // CRUD routes
  router.get('/', validate(queryParamsSchema, 'query'), (req, res, next) =>
    userController.getAll(req, res, next)
  );

  // Current user routes (must be before /:id to avoid conflict)
  router.get('/me', authMiddleware, (req, res, next) =>
    userController.getMe(req as AuthenticatedRequest, res, next)
  );

  router.patch('/me', authMiddleware, validate(updateUserSchema), (req, res, next) =>
    userController.updateMe(req as AuthenticatedRequest, res, next)
  );

  router.get('/:id', validate(idParamSchema, 'params'), (req, res, next) =>
    userController.getById(req, res, next)
  );

  router.post('/', validate(createUserSchema), (req, res, next) =>
    userController.create(req, res, next)
  );

  router.patch(
    '/:id',
    validate(idParamSchema, 'params'),
    validate(updateUserSchema),
    (req, res, next) => userController.update(req, res, next)
  );

  router.delete('/:id', validate(idParamSchema, 'params'), (req, res, next) =>
    userController.delete(req, res, next)
  );

  // Search routes
  router.get('/email/:email', (req, res, next) => userController.getByEmail(req, res, next));

  router.get('/username/:username', (req, res, next) =>
    userController.getByUsername(req, res, next)
  );

  // Authentication routes
  router.post('/auth/login', validate(loginSchema), (req, res, next) =>
    userController.login(req, res, next)
  );

  router.post('/auth/request-password-reset', validate(emailSchema), (req, res, next) =>
    userController.requestPasswordReset(req, res, next)
  );

  router.post('/auth/confirm-password-reset', validate(passwordResetSchema), (req, res, next) =>
    userController.confirmPasswordReset(req, res, next)
  );

  router.post('/auth/request-verification', validate(emailSchema), (req, res, next) =>
    userController.requestVerification(req, res, next)
  );

  router.post('/auth/confirm-verification', validate(verificationTokenSchema), (req, res, next) =>
    userController.confirmVerification(req, res, next)
  );

  return router;
};
