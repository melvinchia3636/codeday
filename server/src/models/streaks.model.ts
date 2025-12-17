import { BaseRecord } from './base.model';

/**
 * Streaks Model
 * Tracks consecutive day achievements
 */
export interface Streaks extends BaseRecord {
  dietDays: number;
  hydroDays: number;
  workoutDays: number;
  perfectDays: number;
  userId: string;
}

export interface CreateStreaksDto {
  dietDays?: number;
  hydroDays?: number;
  workoutDays?: number;
  perfectDays?: number;
}

export interface UpdateStreaksDto extends Partial<CreateStreaksDto> {}
