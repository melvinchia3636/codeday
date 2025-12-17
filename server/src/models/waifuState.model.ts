import { BaseRecord } from './base.model';

/**
 * Waifu State Model
 * Tracks the virtual companion's emotional state
 */
export interface WaifuState extends BaseRecord {
  emotionScore: number;
  emotion: string;
  greeting: string;
  userId: string;
}

export interface SetWaifuEmotionDto {
  emotion: string;
}

export interface SetWaifuGreetingDto {
  greeting: string;
}
