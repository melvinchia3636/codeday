import { BaseService } from './base.service';
import { WaifuState, SetWaifuEmotionDto, SetWaifuGreetingDto, Streaks } from '../models/health.model';
import PocketBase from 'pocketbase';
import OpenAIService from '../config/openai';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Waifu Response Interface
 */
interface WaifuResponse {
  yandere_score: number;
  messages: string[];
}

/**
 * Waifu Service
 * Handles waifu state operations (emotion, greeting) with OpenAI integration
 */
export class WaifuService extends BaseService<WaifuState> {
  private systemPrompt: string;

  constructor(pb: PocketBase) {
    super(pb, 'waifu_states');
    // Load system prompt from file
    this.systemPrompt = this.loadSystemPrompt();
  }

  /**
   * Load system prompt from prompt.md
   */
  private loadSystemPrompt(): string {
    try {
      const promptPath = path.join(__dirname, '../config/prompt.md');
      return fs.readFileSync(promptPath, 'utf-8');
    } catch (error) {
      console.error('Failed to load waifu system prompt:', error);
      return 'You are a helpful health coach assistant.';
    }
  }

  /**
   * Get waifu state for a user
   */
  async getByUserId(userId: string): Promise<WaifuState | null> {
    return await this.findOne(`userId="${userId}"`);
  }

  /**
   * Calculate health score from user data
   * Score is 0-100 based on daily performance
   * Note: This method is used by the controller to calculate health score
   */
  public static calculateHealthScoreFromScores(
    dietScore: number,
    hydroScore: number,
    effortScore: number
  ): number {
    // Weighted average: diet 40%, hydration 30%, exercise 30%
    const score = (dietScore * 0.4) + (hydroScore * 0.3) + (effortScore * 0.3);
    return Math.min(100, Math.max(0, Math.round(score)));
  }

  /**
   * Calculate yandere score based on health score and streaks
   */
  private calculateYandereScore(healthScore: number, streaks: Streaks | null): number {
    // Check for broken/declining streaks
    const hasDecreasingStreaks = streaks && (
      streaks.dietDays === 0 ||
      streaks.hydroDays === 0 ||
      streaks.workoutDays === 0
    );

    if (healthScore >= 80) return 0;
    if (healthScore >= 60) return 1;
    if (healthScore < 60 && hasDecreasingStreaks) return 3;
    return 2;
  }

  /**
   * Generate waifu response using OpenAI
   */
  async generateWaifuResponse(
    _userId: string,
    healthScore: number,
    streaks: Streaks | null
  ): Promise<WaifuResponse> {
    if (!OpenAIService.isConfigured()) {
      // Fallback response when OpenAI is not configured
      const yandereScore = this.calculateYandereScore(healthScore, streaks);
      return {
        yandere_score: yandereScore,
        messages: [
          'Hello, my dear~',
          `Your health score is ${healthScore}. ${healthScore >= 80 ? 'I\'m so proud of you!' : 'Please take better care of yourself...'}`,
          'Remember to stay hydrated and exercise regularly!'
        ]
      };
    }

    try {
      const openai = OpenAIService.getInstance();
      
      const userMessage = JSON.stringify({
        health_score: healthScore,
        streaks: streaks ? {
          water: streaks.hydroDays,
          workout: streaks.workoutDays,
          diet: streaks.dietDays,
          perfect: streaks.perfectDays
        } : { water: 0, workout: 0, diet: 0, perfect: 0 }
      });

      const response = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: this.systemPrompt },
          { role: 'user', content: userMessage }
        ],
        temperature: 0.8,
        max_tokens: 300,
        response_format: { type: 'json_object' }
      });

      const content = response.choices[0]?.message?.content;
      if (content) {
        const parsed = JSON.parse(content) as WaifuResponse;
        return parsed;
      }
    } catch (error) {
      console.error('OpenAI API error:', error);
    }

    // Fallback response
    return {
      yandere_score: this.calculateYandereScore(healthScore, streaks),
      messages: [
        'Hello~',
        `Health score: ${healthScore}`,
        'Stay healthy!'
      ]
    };
  }

  /**
   * Get current emotion for a user (with AI-generated response)
   */
  async getEmotion(userId: string): Promise<string> {
    const state = await this.getByUserId(userId);
    return state?.emotion || '';
  }

  /**
   * Get AI-generated waifu greeting and emotional response
   */
  async getWaifuGreetingWithAI(
    userId: string,
    healthScore: number,
    streaks: Streaks | null
  ): Promise<WaifuResponse> {
    const response = await this.generateWaifuResponse(userId, healthScore, streaks);
    
    // Update waifu state with the new emotion
    const emotionMap: Record<number, string> = {
      0: 'cheerful',
      1: 'clingy',
      2: 'obsessive',
      3: 'yandere'
    };
    
    await this.upsertState(userId, {
      emotionScore: response.yandere_score,
      emotion: emotionMap[response.yandere_score] || 'neutral',
      greeting: response.messages.join(' ')
    });

    return response;
  }

  /**
   * Upsert waifu state
   */
  private async upsertState(userId: string, data: Partial<WaifuState>): Promise<WaifuState> {
    const existing = await this.getByUserId(userId);
    
    if (existing) {
      return await this.update(existing.id, data);
    }
    
    return await this.create({
      userId,
      emotionScore: data.emotionScore || 50,
      emotion: data.emotion || 'neutral',
      greeting: data.greeting || '',
    } as any);
  }

  /**
   * Set emotion for a user
   */
  async setEmotion(userId: string, data: SetWaifuEmotionDto): Promise<WaifuState> {
    return await this.upsertState(userId, { emotion: data.emotion });
  }

  /**
   * Get current greeting for a user
   */
  async getGreeting(userId: string): Promise<string> {
    const state = await this.getByUserId(userId);
    return state?.greeting || '';
  }

  /**
   * Set greeting for a user
   */
  async setGreeting(userId: string, data: SetWaifuGreetingDto): Promise<WaifuState> {
    return await this.upsertState(userId, { greeting: data.greeting });
  }

  /**
   * Delete waifu state (emotion)
   */
  async deleteEmotion(userId: string): Promise<boolean> {
    const existing = await this.getByUserId(userId);
    if (existing) {
      await this.update(existing.id, { emotion: '' });
      return true;
    }
    return false;
  }

  /**
   * Delete waifu greeting
   */
  async deleteGreeting(userId: string): Promise<boolean> {
    const existing = await this.getByUserId(userId);
    if (existing) {
      await this.update(existing.id, { greeting: '' });
      return true;
    }
    return false;
  }
}
