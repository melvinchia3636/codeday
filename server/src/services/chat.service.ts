import { GoogleGenerativeAI, Content } from '@google/generative-ai';
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
 * Chat Service - Handles Gemini interactions for Lucy chat
 */
export class ChatService {
  private genAI: GoogleGenerativeAI | null = null;

  /**
   * Lazy initialization of Gemini client to ensure env vars are loaded
   */
  private getClient(): GoogleGenerativeAI {
    if (!this.genAI) {
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        throw new Error('GEMINI_API_KEY environment variable is not set');
      }
      this.genAI = new GoogleGenerativeAI(apiKey);
    }
    return this.genAI;
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
  async chat(_userId: string, request: ChatRequest): Promise<ChatResponse> {
    try {
      const client = this.getClient();
      const model = client.getGenerativeModel({
        model: 'gemini-2.5-flash-lite',
        systemInstruction: `${CHAT_SYSTEM_PROMPT}\n\n${this.buildContextMessage(request)}`,
        generationConfig: {
          maxOutputTokens: 3000,
          temperature: 0.8 + request.yandereLevel * 0.1, // Higher temp for higher yandere
        },
      });

      // Build conversation history for Gemini
      const history: Content[] = [];

      if (request.conversationHistory && request.conversationHistory.length > 0) {
        // Only keep last 10 messages to avoid token limits
        const recentHistory = request.conversationHistory.slice(-10);
        for (const msg of recentHistory) {
          if (msg.role === 'user') {
            history.push({ role: 'user', parts: [{ text: msg.content }] });
          } else if (msg.role === 'assistant') {
            history.push({ role: 'model', parts: [{ text: msg.content }] });
          }
        }
      }

      const chat = model.startChat({ history });
      const result = await chat.sendMessage(request.message);
      const responseMessage =
        result.response.text() ||
        "...I can't find the words right now. But I'm thinking of you. Always.";

      return {
        message: responseMessage,
        yandereLevel: request.yandereLevel,
      };
    } catch (error) {
      console.error('Gemini API error:', error);
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
      const model = client.getGenerativeModel({
        model: 'gemini-2.5-flash-lite',
        systemInstruction: GREETING_SYSTEM_PROMPT,
        generationConfig: {
          maxOutputTokens: 200,
          temperature: 0.9,
        },
      });

      const result = await model.generateContent(greetingInput);
      console.log(result.response.text());
      return result.response.text()?.trim() || "I'm watching over you...";
    } catch (error) {
      console.error('Gemini greeting error:', error);
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
