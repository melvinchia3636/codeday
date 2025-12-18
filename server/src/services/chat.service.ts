import OpenAI from 'openai';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Load system prompt from chat_prompt.md (for conversations)
 */
function loadChatPrompt(): string {
  try {
    const promptPath = path.join(__dirname, '../config/chat_prompt.md');
    return fs.readFileSync(promptPath, 'utf-8');
  } catch (error) {
    console.error('Failed to load chat system prompt:', error);
    return 'You are Lucy, a helpful and affectionate health coach assistant.';
  }
}

/**
 * Load system prompt from greeting_prompt.md (for dashboard greetings)
 */
function loadGreetingPrompt(): string {
  try {
    const promptPath = path.join(__dirname, '../config/greeting_prompt.md');
    return fs.readFileSync(promptPath, 'utf-8');
  } catch (error) {
    console.error('Failed to load greeting system prompt:', error);
    return 'You are Lucy, a helpful health coach. Generate JSON with yandere_score and messages.';
  }
}

const CHAT_SYSTEM_PROMPT = loadChatPrompt();
const GREETING_SYSTEM_PROMPT = loadGreetingPrompt();

export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChatRequest {
  message: string;
  username?: string;
  yandereLevel: number;
  totalScore: number;
  nutritionScore: number;
  hydrationScore: number;
  workoutScore: number;
  conversationHistory?: ChatMessage[];
}

export interface ChatResponse {
  message: string;
  yandereLevel: number;
}

export interface GreetingRequest {
  username?: string;
  yandereLevel: number;
  totalScore: number;
  nutritionScore: number;
  hydrationScore: number;
  workoutScore: number;
}

/**
 * Chat Service - Handles OpenAI interactions for Lucy chat
 */
export class ChatService {
  private openai: OpenAI | null = null;

  /**
   * Lazy initialization of OpenAI client to ensure env vars are loaded
   */
  private getClient(): OpenAI {
    if (!this.openai) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        throw new Error('OPENAI_API_KEY environment variable is not set');
      }
      this.openai = new OpenAI({ apiKey });
    }
    return this.openai;
  }

  /**
   * Build context message with current health stats
   */
  private buildContextMessage(request: ChatRequest): string {
    const usernameInfo = request.username
      ? `- Username: ${request.username} (address the user by this name)\n`
      : '';
    return `[CURRENT USER HEALTH STATUS]
${usernameInfo}- Total Score: ${request.totalScore}/100
- Nutrition Score: ${request.nutritionScore}/100
- Hydration Score: ${request.hydrationScore}/100
- Workout Score: ${request.workoutScore}/100
- Current Yandere Level: ${request.yandereLevel} (0=happy, 1=neutral, 2=tsundere, 3=yandere)

Respond according to yandere_level ${request.yandereLevel}. Remember your personality guidelines.${request.username ? ` Address the user as "${request.username}" occasionally.` : ''}`;
  }

  /**
   * Send message to Lucy and get response
   */
  async chat(userId: string, request: ChatRequest): Promise<ChatResponse> {
    const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
      { role: 'system', content: CHAT_SYSTEM_PROMPT },
      { role: 'system', content: this.buildContextMessage(request) },
    ];

    // Add conversation history if provided
    if (request.conversationHistory && request.conversationHistory.length > 0) {
      // Only keep last 10 messages to avoid token limits
      const recentHistory = request.conversationHistory.slice(-10);
      for (const msg of recentHistory) {
        if (msg.role === 'user' || msg.role === 'assistant') {
          messages.push({ role: msg.role, content: msg.content });
        }
      }
    }

    // Add current user message
    messages.push({ role: 'user', content: request.message });

    try {
      const client = this.getClient();
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages,
        max_tokens: 300,
        temperature: 0.8 + request.yandereLevel * 0.1, // Higher temp for higher yandere
      });

      const responseMessage =
        completion.choices[0]?.message?.content ||
        "...I can't find the words right now. But I'm thinking of you. Always.";

      return {
        message: responseMessage,
        yandereLevel: request.yandereLevel,
      };
    } catch (error) {
      console.error('OpenAI API error:', error);
      throw new Error('Failed to get response from Lucy');
    }
  }

  /**
   * Generate a short greeting/CTA message for the dashboard
   */
  async generateGreeting(request: GreetingRequest): Promise<string> {
    // Build structured input for the greeting prompt
    const greetingInput = JSON.stringify({
      username: request.username || 'User',
      yandere_level: request.yandereLevel,
      health_score: request.totalScore,
      nutrition_score: request.nutritionScore,
      hydration_score: request.hydrationScore,
      workout_score: request.workoutScore,
    });

    try {
      const client = this.getClient();
      const completion = await client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: GREETING_SYSTEM_PROMPT },
          { role: 'user', content: greetingInput },
        ],
        max_tokens: 100,
        temperature: 0.9,
      });

      return completion.choices[0]?.message?.content?.trim() || "I'm watching over you...";
    } catch (error) {
      console.error('OpenAI greeting error:', error);
      // Return fallback based on level
      const fallbacks = [
        'Take care of yourself today~ ♡',
        "I've got my eyes on you~",
        "Don't disappoint me today...",
        "I won't let you neglect yourself.",
      ];
      return fallbacks[request.yandereLevel] || fallbacks[0];
    }
  }
}
