import { api } from "./api";

// ============================================
// Workout Type Interfaces
// ============================================
export interface WorkoutType {
  id: string;
  name: string;
  icon: string;
  color: string;
  caloriesPerMinute: number;
  userId: string;
  created: string;
  updated: string;
}

export interface CreateWorkoutTypeDto {
  name: string;
  icon: string;
  color: string;
  caloriesPerMinute: number;
}

export interface UpdateWorkoutTypeDto {
  name?: string;
  icon?: string;
  color?: string;
  caloriesPerMinute?: number;
}

// ============================================
// Workout Type API Client
// ============================================
export const workoutTypeApi = {
  /**
   * Get all workout types for the current user
   */
  getAll: async (): Promise<WorkoutType[]> => {
    const response = await api.get<WorkoutType[]>("/workout-types");
    return response.data;
  },

  /**
   * Get a specific workout type by ID
   */
  getById: async (id: string): Promise<WorkoutType> => {
    const response = await api.get<WorkoutType>(`/workout-types/${id}`);
    return response.data;
  },

  /**
   * Create a new workout type
   */
  create: async (data: CreateWorkoutTypeDto): Promise<WorkoutType> => {
    const response = await api.post<WorkoutType>("/workout-types", data);
    return response.data;
  },

  /**
   * Update a workout type
   */
  update: async (
    id: string,
    data: UpdateWorkoutTypeDto
  ): Promise<WorkoutType> => {
    const response = await api.put<WorkoutType>(`/workout-types/${id}`, data);
    return response.data;
  },

  /**
   * Delete a workout type
   */
  delete: async (id: string): Promise<void> => {
    await api.delete(`/workout-types/${id}`);
  },
};

// ============================================
// Default Workout Types (for new users)
// ============================================
export const defaultWorkoutTypes = [
  {
    name: "STRETCH",
    icon: "pixelarticons:human",
    color: "cyan",
    caloriesPerMinute: 3,
  },
  {
    name: "WALKING",
    icon: "pixelarticons:human-run",
    color: "pink",
    caloriesPerMinute: 5,
  },
  {
    name: "RUNNING",
    icon: "pixelarticons:speed-fast",
    color: "fuchsia",
    caloriesPerMinute: 12,
  },
  {
    name: "SWIMMING",
    icon: "pixelarticons:drop",
    color: "cyan",
    caloriesPerMinute: 10,
  },
  {
    name: "STRENGTH",
    icon: "pixelarticons:trophy",
    color: "pink",
    caloriesPerMinute: 8,
  },
  {
    name: "YOGA",
    icon: "pixelarticons:heart",
    color: "purple",
    caloriesPerMinute: 4,
  },
  {
    name: "CYCLING",
    icon: "pixelarticons:speed-medium",
    color: "green",
    caloriesPerMinute: 9,
  },
  {
    name: "HIIT",
    icon: "pixelarticons:zap",
    color: "orange",
    caloriesPerMinute: 15,
  },
];

// Color name to rgba mapping for inline styles
export const colorMap: Record<string, string> = {
  cyan: "rgba(34,211,238,",
  pink: "rgba(236,72,153,",
  fuchsia: "rgba(217,70,239,",
  purple: "rgba(168,85,247,",
  green: "rgba(34,197,94,",
  orange: "rgba(249,115,22,",
  amber: "rgba(245,158,11,",
  red: "rgba(239,68,68,",
};
