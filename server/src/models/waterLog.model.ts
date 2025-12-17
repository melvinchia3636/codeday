import { BaseRecord } from './base.model';

/**
 * Water Log Model
 * Tracks water intake entries
 */
export interface WaterLog extends BaseRecord {
  amountMl: number;
  timestamp: string;
  userId: string;
}

export interface CreateWaterLogDto {
  amountMl: number;
  timestamp?: string;
}

export interface UpdateWaterLogDto extends Partial<CreateWaterLogDto> {}
