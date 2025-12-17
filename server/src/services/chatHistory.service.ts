import { BaseService } from './base.service';
import PocketBase from 'pocketbase';

/**
 * Chat History Entry
 */
export interface ChatHistory {
  id: string;
  userId: string;
  role: 'user' | 'assistant';
  content: string;
  created: string;
  updated?: string;
}

export interface CreateChatHistoryDto {
  role: 'user' | 'assistant';
  content: string;
}

/**
 * Chat History Service
 * Handles persistence of chat messages
 */
export class ChatHistoryService extends BaseService<ChatHistory> {
  constructor(pb: PocketBase) {
    super(pb, 'chat_histories');
  }

  /**
   * Get all chat history for a user, ordered by creation time
   */
  async getHistory(userId: string): Promise<ChatHistory[]> {
    return await this.findByFilter(`userId="${userId}"`, { sort: 'created' });
  }

  /**
   * Add a message to chat history
   */
  async addMessage(userId: string, data: CreateChatHistoryDto): Promise<ChatHistory> {
    return await this.create({
      userId,
      role: data.role,
      content: data.content,
    });
  }

  /**
   * Clear all chat history for a user
   */
  async clearHistory(userId: string): Promise<boolean> {
    const messages = await this.getHistory(userId);
    for (const msg of messages) {
      await this.delete(msg.id);
    }
    return true;
  }
}
