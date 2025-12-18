import { Router } from 'express';
import PocketBase from 'pocketbase';
import { ChatController } from '../controllers/chat.controller';
import { authMiddleware, AuthenticatedRequest } from '../middleware/auth.middleware';
import { ChatHistoryService } from '../services/chatHistory.service';

export const createChatRoutes = (pb: PocketBase): Router => {
  const router = Router();
  const chatController = new ChatController(pb);
  const chatHistoryService = new ChatHistoryService(pb);

  /**
   * Chat Routes
   * All routes require authentication
   */

  // POST /api/v1/chat - Send message to Lucy
  router.post('/', authMiddleware, chatController.chat);

  // POST /api/v1/chat/greeting - Get AI greeting for dashboard
  router.post('/greeting', authMiddleware, chatController.greeting);

  // GET /api/v1/chat/history - Get chat history
  router.get('/history', authMiddleware, async (req, res, next) => {
    try {
      const userId = (req as AuthenticatedRequest).userId!;
      const history = await chatHistoryService.getHistory(userId);
      res.json({ data: history });
    } catch (error) {
      next(error);
    }
  });

  // POST /api/v1/chat/history - Save a message to history
  router.post('/history', authMiddleware, async (req, res, next) => {
    try {
      const userId = (req as AuthenticatedRequest).userId!;
      const { role, content } = req.body;
      const message = await chatHistoryService.addMessage(userId, { role, content });
      res.json({ data: message });
    } catch (error) {
      next(error);
    }
  });

  // DELETE /api/v1/chat/history - Clear chat history
  router.delete('/history', authMiddleware, async (req, res, next) => {
    try {
      const userId = (req as AuthenticatedRequest).userId!;
      await chatHistoryService.clearHistory(userId);
      res.status(204).send();
    } catch (error) {
      next(error);
    }
  });

  return router;
};

export default createChatRoutes;
