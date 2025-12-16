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
  async findAll(params?: QueryParams): Promise<PaginatedResponse<T>> {
    const { page = 1, perPage = 20, sort, filter } = params || {};

    const result = await this.pb.collection(this.collectionName).getList<T>(page, perPage, {
      sort: sort || '-created',
      filter: filter || '',
    });

    return {
      items: result.items,
      page: result.page,
      perPage: result.perPage,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
    };
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
  async findByFilter(filter: string, params?: QueryParams): Promise<PaginatedResponse<T>> {
    const { page = 1, perPage = 20, sort } = params || {};

    const result = await this.pb.collection(this.collectionName).getList<T>(page, perPage, {
      sort: sort || '-created',
      filter,
    });

    return {
      items: result.items,
      page: result.page,
      perPage: result.perPage,
      totalItems: result.totalItems,
      totalPages: result.totalPages,
    };
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
