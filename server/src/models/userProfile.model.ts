import { BaseRecord } from './base.model';

/**
 * User Profile Model
 * Extended user information (extends built-in PocketBase user)
 */
export interface UserProfile extends BaseRecord {
  email: string;
  gender?: string;
  dob?: string; // Date of birth
  heightCm?: number;
  weightKg?: number;
  // Computed field
  bmi?: number;
}

export interface CreateUserProfileDto {
  email: string;
  gender?: string;
  dob?: string;
  heightCm?: number;
  weightKg?: number;
}

export interface UpdateUserProfileDto extends Partial<Omit<CreateUserProfileDto, 'email'>> {}
