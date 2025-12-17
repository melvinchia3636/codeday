import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  mealItemApi,
  type MealItem,
  type CreateMealItemDto,
  type UpdateMealItemDto,
} from "../lib/mealItem";
import { auth } from "../lib/auth";

export const mealItemQueryKeys = {
  all: ["mealItems"] as const,
  lists: () => [...mealItemQueryKeys.all, "list"] as const,
  list: (filters: string) =>
    [...mealItemQueryKeys.lists(), { filters }] as const,
  today: () => [...mealItemQueryKeys.all, "today"] as const,
  details: () => [...mealItemQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...mealItemQueryKeys.details(), id] as const,
};

/**
 * Query hook for fetching all meal items
 */
export function useMealItemsQuery() {
  return useQuery<MealItem[]>({
    queryKey: mealItemQueryKeys.lists(),
    queryFn: mealItemApi.getAll,
    enabled: auth.isAuthenticated(),
    staleTime: 30000,
  });
}

/**
 * Query hook for fetching today's meal items
 */
export function useTodayMealItemsQuery() {
  return useQuery<MealItem[]>({
    queryKey: mealItemQueryKeys.today(),
    queryFn: mealItemApi.getToday,
    enabled: auth.isAuthenticated(),
    staleTime: 30000,
  });
}

/**
 * Query hook for fetching a single meal item
 */
export function useMealItemQuery(id: string) {
  return useQuery<MealItem>({
    queryKey: mealItemQueryKeys.detail(id),
    queryFn: () => mealItemApi.getById(id),
    enabled: auth.isAuthenticated() && !!id,
  });
}

/**
 * Mutation hook for creating a meal item
 */
export function useCreateMealItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateMealItemDto) => mealItemApi.create(data),
    onSuccess: () => {
      // Invalidate and refetch meal items
      queryClient.invalidateQueries({ queryKey: mealItemQueryKeys.all });
    },
  });
}

/**
 * Mutation hook for updating a meal item
 */
export function useUpdateMealItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateMealItemDto }) =>
      mealItemApi.update(id, data),
    onSuccess: (_, { id }) => {
      // Invalidate the specific item and lists
      queryClient.invalidateQueries({ queryKey: mealItemQueryKeys.detail(id) });
      queryClient.invalidateQueries({ queryKey: mealItemQueryKeys.lists() });
      queryClient.invalidateQueries({ queryKey: mealItemQueryKeys.today() });
    },
  });
}

/**
 * Mutation hook for deleting a meal item
 */
export function useDeleteMealItemMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => mealItemApi.delete(id),
    onSuccess: () => {
      // Invalidate all meal item queries
      queryClient.invalidateQueries({ queryKey: mealItemQueryKeys.all });
    },
  });
}
