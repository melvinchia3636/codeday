/**
 * Bug Report Model
 * Represents a bug report in the PocketBase bug_reports collection
 */
export interface BugReport {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
  userId: string;
  description: string;
  url: string;
  userAgent: string;
  status: 'open' | 'in_progress' | 'resolved' | 'closed';
}

/**
 * Bug report creation data
 */
export interface CreateBugReportDto {
  description: string;
  url: string;
  userAgent: string;
}

/**
 * Bug report update data
 */
export interface UpdateBugReportDto {
  status?: 'open' | 'in_progress' | 'resolved' | 'closed';
  description?: string;
}
