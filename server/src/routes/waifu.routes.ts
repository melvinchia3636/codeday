import { Router } from 'express';
import PocketBase from 'pocketbase';
import { validate } from '../middleware/validation.middleware';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { WaifuController } from '../controllers/waifu.controller';
import { setWaifuEmotionSchema, setWaifuGreetingSchema } from '../validators/health.validator';

export const createWaifuRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const controller = new WaifuController(pb);

  // Emotion endpoints
  router.get('/emotion', authMiddleware, (req, res, next) =>
    controller.getEmotion(req as AuthenticatedRequest, res, next)
  );
  router.post('/emotion', authMiddleware, validate(setWaifuEmotionSchema), (req, res, next) =>
    controller.setEmotion(req as AuthenticatedRequest, res, next)
  );
  router.put('/emotion', authMiddleware, validate(setWaifuEmotionSchema), (req, res, next) =>
    controller.updateEmotion(req as AuthenticatedRequest, res, next)
  );
  router.delete('/emotion', authMiddleware, (req, res, next) =>
    controller.deleteEmotion(req as AuthenticatedRequest, res, next)
  );

  // Greeting endpoints
  router.get('/greeting', authMiddleware, (req, res, next) =>
    controller.getGreeting(req as AuthenticatedRequest, res, next)
  );
  router.post('/greeting', authMiddleware, validate(setWaifuGreetingSchema), (req, res, next) =>
    controller.setGreeting(req as AuthenticatedRequest, res, next)
  );
  router.put('/greeting', authMiddleware, validate(setWaifuGreetingSchema), (req, res, next) =>
    controller.updateGreeting(req as AuthenticatedRequest, res, next)
  );
  router.delete('/greeting', authMiddleware, (req, res, next) =>
    controller.deleteGreeting(req as AuthenticatedRequest, res, next)
  );

  return router;
};
