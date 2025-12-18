import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from '../middleware/auth.middleware';
import { ChatService, ChatRequest, GreetingRequest } from '../services/chat.service';
import { UserService } from '../services/user.service';
import PocketBase from 'pocketbase';

/**
 * Chat Controller - Handles chat endpoint requests
 */
export class ChatController {
  private chatService: ChatService;
  private userService: UserService;

  constructor(pb: PocketBase) {
    this.chatService = new ChatService();
    this.userService = new UserService(pb);
  }

  /**
   * Send a chat message to Lucy
   * POST /api/v1/chat
   */
  chat = async (
    req: AuthenticatedRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }

      const {
        message,
        yandereLevel,
        totalScore,
        nutritionScore,
        hydrationScore,
        workoutScore,
        conversationHistory,
      } = req.body as ChatRequest;

      if (!message || typeof message !== 'string') {
        return res.status(400).json({ success: false, error: 'Message is required' });
      }

      if (typeof yandereLevel !== 'number' || yandereLevel < 0 || yandereLevel > 3) {
        return res
          .status(400)
          .json({ success: false, error: 'Valid yandereLevel (0-3) is required' });
      }

      // Fetch user to get username for personalization
      const user = await this.userService.findById(userId);

      const response = await this.chatService.chat(userId, {
        message,
        username: user?.username || user?.name,
        yandereLevel,
        totalScore: totalScore ?? 0,
        nutritionScore: nutritionScore ?? 0,
        hydrationScore: hydrationScore ?? 0,
        workoutScore: workoutScore ?? 0,
        conversationHistory,
      });

      return res.json({
        success: true,
        data: response,
      });
    } catch (error) {
      console.error('Chat error:', error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to process chat',
      });
    }
  };

  /**
   * Generate a greeting message for the dashboard
   * POST /api/v1/chat/greeting
   */
  greeting = async (
    req: AuthenticatedRequest,
    res: Response,
    _next: NextFunction
  ): Promise<Response | void> => {
    try {
      const userId = req.userId;
      if (!userId) {
        return res.status(401).json({ success: false, error: 'Unauthorized' });
      }

      const { yandereLevel, totalScore, nutritionScore, hydrationScore, workoutScore } =
        req.body as GreetingRequest;

      if (typeof yandereLevel !== 'number' || yandereLevel < 0 || yandereLevel > 3) {
        return res
          .status(400)
          .json({ success: false, error: 'Valid yandereLevel (0-3) is required' });
      }

      // Fetch user to get username for personalization
      const user = await this.userService.findById(userId);

      const greeting = await this.chatService.generateGreeting({
        username: user?.username || user?.name,
        yandereLevel,
        totalScore: totalScore ?? 0,
        nutritionScore: nutritionScore ?? 0,
        hydrationScore: hydrationScore ?? 0,
        workoutScore: workoutScore ?? 0,
      });

      return res.json({
        success: true,
        data: { greeting },
      });
    } catch (error) {
      console.error('Greeting error:', error);
      return res.status(500).json({
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate greeting',
      });
    }
  };
}
