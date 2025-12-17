import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  hydrationApi,
  type CreateWaterLogData,
  type WaterLog,
  type WaterLogSummary,
} from "../lib/hydration";
import { auth } from "../lib/auth";

export const hydrationQueryKeys = {
  all: ["hydration"] as const,
  logs: () => [...hydrationQueryKeys.all, "logs"] as const,
  amount: () => [...hydrationQueryKeys.all, "amount"] as const,
  summary: (targetMl?: number) =>
    [...hydrationQueryKeys.all, "summary", targetMl] as const,
};

/**
 * Query hook for fetching today's water logs list
 */
export function useTodayLogsQuery() {
  return useQuery<WaterLog[]>({
    queryKey: hydrationQueryKeys.logs(),
    queryFn: hydrationApi.getTodayLogs,
    enabled: auth.isAuthenticated(),
    refetchInterval: 30000,
  });
}

/**
 * Query hook for fetching today's total water amount
 */
export function useTodayWaterAmountQuery() {
  return useQuery<number>({
    queryKey: hydrationQueryKeys.amount(),
    queryFn: hydrationApi.getTodayAmount,
    enabled: auth.isAuthenticated(),
    refetchInterval: 30000,
  });
}

/**
 * Query hook for fetching today's water summary
 */
export function useWaterSummaryQuery(targetMl?: number) {
  return useQuery<WaterLogSummary>({
    queryKey: hydrationQueryKeys.summary(targetMl),
    queryFn: () => hydrationApi.getSummary(targetMl),
    enabled: auth.isAuthenticated(),
    refetchInterval: 30000,
  });
}

/**
 * Mutation hook for adding a water log
 */
export function useAddWaterLogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWaterLogData) => hydrationApi.addWaterLog(data),
    onMutate: async (newData) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: hydrationQueryKeys.logs() });

      // Snapshot the previous value
      const previousLogs = queryClient.getQueryData<WaterLog[]>(
        hydrationQueryKeys.logs()
      );

      // Optimistically update to the new value
      if (previousLogs) {
        const optimisticLog: WaterLog = {
          id: `temp-${Date.now()}`,
          amountMl: newData.amountMl,
          timestamp: newData.timestamp || new Date().toISOString(),
          userId: "",
        };
        queryClient.setQueryData<WaterLog[]>(hydrationQueryKeys.logs(), [
          ...previousLogs,
          optimisticLog,
        ]);
      }

      return { previousLogs };
    },
    onError: (_err, _newData, context) => {
      // Rollback on error
      if (context?.previousLogs) {
        queryClient.setQueryData(
          hydrationQueryKeys.logs(),
          context.previousLogs
        );
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: hydrationQueryKeys.all });
    },
  });
}

/**
 * Mutation hook for resetting today's water logs
 */
export function useResetWaterLogsMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => hydrationApi.resetTodayLogs(),
    onMutate: async () => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: hydrationQueryKeys.logs() });

      // Snapshot previous logs
      const previousLogs = queryClient.getQueryData<WaterLog[]>(
        hydrationQueryKeys.logs()
      );

      // Optimistically set logs to empty
      queryClient.setQueryData<WaterLog[]>(hydrationQueryKeys.logs(), []);

      return { previousLogs };
    },
    onError: (_err, _vars, context) => {
      // Rollback on error
      if (context?.previousLogs) {
        queryClient.setQueryData(
          hydrationQueryKeys.logs(),
          context.previousLogs
        );
      }
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: hydrationQueryKeys.all });
    },
  });
}

/**
 * Mutation hook for deleting a single water log
 */
export function useDeleteWaterLogMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => hydrationApi.deleteWaterLog(id),
    onMutate: async (id: string) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: hydrationQueryKeys.logs() });

      // Snapshot previous logs
      const previousLogs = queryClient.getQueryData<WaterLog[]>(
        hydrationQueryKeys.logs()
      );

      // Optimistically remove the log
      if (previousLogs) {
        queryClient.setQueryData<WaterLog[]>(
          hydrationQueryKeys.logs(),
          previousLogs.filter((log) => log.id !== id)
        );
      }

      return { previousLogs };
    },
    onError: (_err, _vars, context) => {
      // Rollback on error
      if (context?.previousLogs) {
        queryClient.setQueryData(
          hydrationQueryKeys.logs(),
          context.previousLogs
        );
      }
    },
    onSettled: () => {
      // Always refetch after mutation
      queryClient.invalidateQueries({ queryKey: hydrationQueryKeys.all });
    },
  });
}
