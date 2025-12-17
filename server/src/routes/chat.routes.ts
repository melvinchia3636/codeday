import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();
const chatController = new ChatController();

/**
 * Chat Routes
 * All routes require authentication
 */

// POST /api/v1/chat - Send message to Lucy
router.post('/', authMiddleware, chatController.chat);

// POST /api/v1/chat/greeting - Get AI greeting for dashboard
router.post('/greeting', authMiddleware, chatController.greeting);

export default router;
