import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  mealApi,
  type Meal,
  type CreateMealDto,
  type UpdateMealDto,
} from "../lib/meal";
import { auth } from "../lib/auth";

export const mealQueryKeys = {
  all: ["meals"] as const,
  lists: () => [...mealQueryKeys.all, "list"] as const,
  today: () => [...mealQueryKeys.all, "today"] as const,
  details: () => [...mealQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...mealQueryKeys.details(), id] as const,
};

/**
 * Query hook for fetching all meals
 */
export function useMealsQuery() {
  return useQuery<Meal[]>({
    queryKey: mealQueryKeys.lists(),
    queryFn: mealApi.getAll,
    enabled: auth.isAuthenticated(),
    staleTime: 30000,
  });
}

/**
 * Query hook for fetching today's meals
 */
export function useTodayMealsQuery() {
  return useQuery<Meal[]>({
    queryKey: mealQueryKeys.today(),
    queryFn: mealApi.getToday,
    enabled: auth.isAuthenticated(),
    staleTime: 30000,
  });
}

/**
 * Query hook for fetching a single meal
 */
export function useMealQuery(id: string) {
  return useQuery<Meal>({
    queryKey: mealQueryKeys.detail(id),
    queryFn: () => mealApi.getById(id),
    enabled: auth.isAuthenticated() && !!id,
  });
}

/**
 * Mutation hook for creating a meal
 */
export function useCreateMealMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMealDto) => mealApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch meals
      queryClient.invalidateQueries({ queryKey: mealQueryKeys.all });
    },
  });
}

/**
 * Mutation hook for updating a meal
 */
export function useUpdateMealMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMealDto }) =>
      mealApi.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate the specific meal and lists
      queryClient.invalidateQueries({ queryKey: mealQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: mealQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: mealQueryKeys.today() });
    },
  });
}

/**
 * Mutation hook for deleting a meal
 */
export function useDeleteMealMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mealApi.delete(id),
    onSuccess: () => {
      // Invalidate all meal queries
      queryClient.invalidateQueries({ queryKey: mealQueryKeys.all });
    },
  });
}
