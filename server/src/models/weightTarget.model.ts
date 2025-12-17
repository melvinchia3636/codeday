import { BaseRecord } from './base.model';

/**
 * Weight Target Model
 * User's weight goals
 */
export interface WeightTarget extends BaseRecord {
  targetWeightKg: number;
  targetType: string; // e.g., 'lose', 'gain', 'maintain'
  userId: string;
}

export interface CreateWeightTargetDto {
  targetWeightKg: number;
  targetType: string;
}

export interface UpdateWeightTargetDto extends Partial<CreateWeightTargetDto> {}
