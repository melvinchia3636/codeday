import { api } from "./api";

export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface ChatRequest {
  message: string;
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
  yandereLevel: number;
  totalScore: number;
  nutritionScore: number;
  hydrationScore: number;
  workoutScore: number;
}

/**
 * Chat API Client
 */
export const chatApi = {
  /**
   * Send a message to Lucy
   */
  sendMessage: async (request: ChatRequest): Promise<ChatResponse> => {
    const response = await api.post<ChatResponse>("/chat", request);
    return response.data;
  },

  /**
   * Get AI greeting for dashboard
   */
  getGreeting: async (request: GreetingRequest): Promise<string> => {
    const response = await api.post<{ greeting: string }>(
      "/chat/greeting",
      request
    );
    return response.data.greeting;
  },
};
