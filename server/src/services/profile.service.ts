import { BaseService } from './base.service';
import { UserProfile, CreateUserProfileDto, UpdateUserProfileDto } from '../models/health.model';
import PocketBase from 'pocketbase';

/**
 * Profile Service
 * Handles user profile operations (extends PocketBase users)
 */
export class ProfileService extends BaseService<UserProfile> {
  constructor(pb: PocketBase) {
    // Using 'user_profiles' as a separate collection that references users
    // Alternatively, could extend the 'users' collection with custom fields
    super(pb, 'user_profiles');
  }

  /**
   * Get profile for current authenticated user
   */
  async getByUserId(userId: string): Promise<UserProfile | null> {
    return await this.findOne(`id="${userId}"`) || await this.findOne(`userId="${userId}"`);
  }

  /**
   * Calculate BMI from height and weight
   */
  private calculateBMI(heightCm: number, weightKg: number): number {
    /**
     * TODO-LIST: Verify BMI calculation formula
     * - [ ] Standard formula: weight(kg) / height(m)^2
     * - [ ] Should we round to specific decimal places?
     * - [ ] Should we handle edge cases (missing height/weight)?
     */
    if (!heightCm || !weightKg || heightCm <= 0 || weightKg <= 0) {
      return 0;
    }
    const heightM = heightCm / 100;
    return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
  }

  /**
   * Get profile with computed BMI
   */
  async getProfileWithBMI(userId: string): Promise<(UserProfile & { bmi: number }) | null> {
    const profile = await this.getByUserId(userId);
    if (!profile) return null;

    const bmi = this.calculateBMI(profile.heightCm || 0, profile.weightKg || 0);
    return {
      ...profile,
      bmi,
    };
  }

  /**
   * Create user profile
   */
  async createProfile(data: CreateUserProfileDto): Promise<UserProfile> {
    return await this.create(data);
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: UpdateUserProfileDto): Promise<UserProfile> {
    const existing = await this.getByUserId(userId);
    if (existing) {
      return await this.update(existing.id, data);
    }
    // If profile doesn't exist, create it
    return await this.create({
      ...data,
      userId,
    } as any);
  }

  /**
   * Delete user profile
   */
  async deleteProfile(userId: string): Promise<boolean> {
    const existing = await this.getByUserId(userId);
    if (existing) {
      return await this.delete(existing.id);
    }
    return false;
  }
}
