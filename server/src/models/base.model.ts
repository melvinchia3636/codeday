/**
 * Base PocketBase Record Interface
 * All PocketBase records inherit from this
 */
export interface BaseRecord {
  id: string;
  collectionId: string;
  collectionName: string;
  timestamp: string;
  updated: string;
}
