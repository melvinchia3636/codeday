import OpenAI from 'openai';

/**
 * OpenAI Client Service
 * Singleton pattern to manage OpenAI connection
 */
class OpenAIService {
  private static instance: OpenAI;

  private constructor() {}

  /**
   * Get OpenAI instance
   */
  static getInstance(): OpenAI {
    if (!OpenAIService.instance) {
      const apiKey = process.env.OPENAI_API_KEY;
      
      if (!apiKey) {
        console.warn('⚠️  Warning: OPENAI_API_KEY not set in environment');
      }
      
      OpenAIService.instance = new OpenAI({
        apiKey: apiKey || '',
      });
    }
    return OpenAIService.instance;
  }

  /**
   * Check if OpenAI is configured
   */
  static isConfigured(): boolean {
    return !!process.env.OPENAI_API_KEY;
  }
}

export default OpenAIService;
