import { BaseRecord } from './base.model';

/**
 * Settings Model
 * User health tracking preferences
 */
export interface Settings extends BaseRecord {
  dietCalorieTarget: number;
  hydroTargetMl: number;
  hydroIntervalMin: number;
  expectedMealsPerDay: number;
  timezone: string;
  userId: string;
}

export interface CreateSettingsDto {
  dietCalorieTarget?: number;
  hydroTargetMl?: number;
  hydroIntervalMin?: number;
  expectedMealsPerDay?: number;
  timezone?: string;
}

export interface UpdateSettingsDto extends Partial<CreateSettingsDto> {}
