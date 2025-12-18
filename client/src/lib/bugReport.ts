import { api } from "./api";

export interface BugReport {
  id: string;
  userId: string;
  description: string;
  url: string;
  userAgent: string;
  status: "open" | "in_progress" | "resolved" | "closed";
  created: string;
  updated: string;
}

export interface CreateBugReportData {
  description: string;
  url: string;
  userAgent: string;
}

/**
 * Create a new bug report
 */
export async function createBugReport(
  data: CreateBugReportData
): Promise<BugReport> {
  const response = await api.post<BugReport>("/bug-reports", data);
  return response.data;
}

/**
 * Get all bug reports for the current user
 */
export async function getBugReports(): Promise<BugReport[]> {
  const response = await api.get<BugReport[]>("/bug-reports");
  return response.data || [];
}

/**
 * Get a bug report by ID
 */
export async function getBugReport(id: string): Promise<BugReport> {
  const response = await api.get<BugReport>(`/bug-reports/${id}`);
  return response.data;
}

/**
 * Delete a bug report
 */
export async function deleteBugReport(id: string): Promise<void> {
  await api.delete(`/bug-reports/${id}`);
}
