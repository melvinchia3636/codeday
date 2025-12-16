import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  workoutTypeApi,
  type WorkoutType,
  type CreateWorkoutTypeDto,
  type UpdateWorkoutTypeDto,
} from "../lib/workout";
import { auth } from "../lib/auth";

// Query keys for cache management
export const workoutQueryKeys = {
  all: ["workouts"] as const,
  types: () => [...workoutQueryKeys.all, "types"] as const,
  type: (id: string) => [...workoutQueryKeys.types(), id] as const,
};

/**
 * Query hook to fetch all workout types
 */
export function useWorkoutTypesQuery() {
  return useQuery({
    queryKey: workoutQueryKeys.types(),
    queryFn: () => workoutTypeApi.getAll(),
    enabled: auth.isAuthenticated(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Query hook to fetch a specific workout type
 */
export function useWorkoutTypeQuery(id: string) {
  return useQuery({
    queryKey: workoutQueryKeys.type(id),
    queryFn: () => workoutTypeApi.getById(id),
    enabled: auth.isAuthenticated() && !!id,
  });
}

/**
 * Mutation hook to create a workout type
 */
export function useCreateWorkoutTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkoutTypeDto) => workoutTypeApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutQueryKeys.types() });
    },
  });
}

/**
 * Mutation hook to update a workout type
 */
export function useUpdateWorkoutTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateWorkoutTypeDto }) =>
      workoutTypeApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutQueryKeys.types() });
    },
  });
}

/**
 * Mutation hook to delete a workout type
 */
export function useDeleteWorkoutTypeMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => workoutTypeApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: workoutQueryKeys.types() });
    },
  });
}
