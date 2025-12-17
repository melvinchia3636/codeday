import { BaseRecord } from './base.model';

/**
 * Daily Summary Model
 * Tracks daily health scores
 */
export interface DailySummary extends BaseRecord {
  date: string;
  dietScore: number;
  hydroScore: number;
  effortScore: number;
  totalScore: number;
  waifuId: string;
  userId: string;
}

export interface CreateDailySummaryDto {
  date: string;
  dietScore?: number;
  hydroScore?: number;
  effortScore?: number;
  totalScore?: number;
  waifuId?: string;
}

export interface UpdateDailySummaryDto extends Partial<CreateDailySummaryDto> {}
