import PocketBase from 'pocketbase';
import { QueryParams, PaginatedResponse } from '../types/common';

/**
 * Abstract Base Service
 * Provides common CRUD operations using PocketBase SDK
 */
export abstract class BaseService<T> {
  protected pb: PocketBase;
  protected collectionName: string;

  constructor(pb: PocketBase, collectionName: string) {
    this.pb = pb;
    this.collectionName = collectionName;
  }

  /**
   * Get all records with pagination
   */
  async findAll(params?: QueryParams): Promise<T[]> {
    const { sort, filter } = params || {};

    const result = await this.pb.collection(this.collectionName).getFullList<T>({
      sort: sort || '-created',
      filter: filter || '',
    });

    return result;
  }

  /**
   * Get a single record by ID
   */
  async findById(id: string): Promise<T> {
    return await this.pb.collection(this.collectionName).getOne<T>(id);
  }

  /**
   * Create a new record
   */
  async create(data: Partial<T>): Promise<T> {
    return await this.pb.collection(this.collectionName).create<T>(data);
  }

  /**
   * Update a record by ID
   */
  async update(id: string, data: Partial<T>): Promise<T> {
    return await this.pb.collection(this.collectionName).update<T>(id, data);
  }

  /**
   * Delete a record by ID
   */
  async delete(id: string): Promise<boolean> {
    return await this.pb.collection(this.collectionName).delete(id);
  }

  /**
   * Find records by filter
   */
  async findByFilter(filter: string, params?: QueryParams): Promise<T[]> {
    const { sort } = params || {};

    const result = await this.pb.collection(this.collectionName).getFullList<T>({
      sort: sort || '-created',
      filter,
    });

    return result;
  }

  /**
   * Get first record matching filter
   */
  async findOne(filter: string): Promise<T | null> {
    try {
      const result = await this.pb.collection(this.collectionName).getFirstListItem<T>(filter);
      return result;
    } catch (error) {
      return null;
    }
  }
}
