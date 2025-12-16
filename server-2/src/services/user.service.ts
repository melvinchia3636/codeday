import { BaseService } from './base.service';
import { User, CreateUserDto, UpdateUserDto } from '../models/user.model';
import PocketBase from 'pocketbase';

/**
 * User Service
 * Handles all user-related operations
 */
export class UserService extends BaseService<User> {
  constructor(pb: PocketBase) {
    super(pb, 'users');
  }

  /**
   * Create a new user
   */
  async createUser(data: CreateUserDto): Promise<User> {
    return await this.create(data as any);
  }

  /**
   * Update user
   */
  async updateUser(id: string, data: UpdateUserDto): Promise<User> {
    return await this.update(id, data as any);
  }

  /**
   * Find user by email
   */
  async findByEmail(email: string): Promise<User | null> {
    return await this.findOne(`email="${email}"`);
  }

  /**
   * Find user by username
   */
  async findByUsername(username: string): Promise<User | null> {
    return await this.findOne(`username="${username}"`);
  }

  /**
   * Authenticate user
   */
  async authenticate(identity: string, password: string): Promise<{ token: string; user: User }> {
    const authData = await this.pb.collection('users').authWithPassword(identity, password);
    return {
      token: authData.token,
      user: authData.record as User,
    };
  }

  /**
   * Request password reset
   */
  async requestPasswordReset(email: string): Promise<boolean> {
    return await this.pb.collection('users').requestPasswordReset(email);
  }

  /**
   * Confirm password reset
   */
  async confirmPasswordReset(
    token: string,
    password: string,
    passwordConfirm: string
  ): Promise<boolean> {
    return await this.pb
      .collection('users')
      .confirmPasswordReset(token, password, passwordConfirm);
  }

  /**
   * Request email verification
   */
  async requestVerification(email: string): Promise<boolean> {
    return await this.pb.collection('users').requestVerification(email);
  }

  /**
   * Confirm email verification
   */
  async confirmVerification(token: string): Promise<boolean> {
    return await this.pb.collection('users').confirmVerification(token);
  }
}
