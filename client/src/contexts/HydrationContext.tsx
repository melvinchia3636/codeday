import { createContext, useContext, useMemo, type ReactNode } from "react";
import {
  useTodayLogsQuery,
  useAddWaterLogMutation,
  useResetWaterLogsMutation,
} from "../hooks/useHydrationQueries";
import { useSettingsQuery } from "../hooks/useProfileQueries";
import type { WaterLog } from "../lib/hydration";

interface HydrationContextValue {
  // Data
  logs: WaterLog[];
  totalWater: number;
  targetWater: number;
  percentage: number;
  logsCount: number;
  remaining: number;
  isOverflow: boolean;

  // Loading states
  isLoading: boolean;
  isAddingWater: boolean;
  isResetting: boolean;

  // Actions
  addWater: (amountMl: number) => void;
  resetToday: () => void;
}

const HydrationContext = createContext<HydrationContextValue | null>(null);

interface HydrationProviderProps {
  children: ReactNode;
}

export function HydrationProvider({ children }: HydrationProviderProps) {
  // Fetch data
  const { data: logs = [], isLoading: isLoadingLogs } = useTodayLogsQuery();
  const { data: settings } = useSettingsQuery();

  // Mutations
  const addWaterLogMutation = useAddWaterLogMutation();
  const resetWaterLogsMutation = useResetWaterLogsMutation();

  // Calculated values
  const targetWater = settings?.hydroTargetMl || 3000;
  const totalWater = useMemo(
    () => logs.reduce((sum, log) => sum + (log.amountMl || 0), 0),
    [logs]
  );
  const percentage = (totalWater / targetWater) * 100;
  const remaining = Math.max(0, targetWater - totalWater);
  const isOverflow = percentage > 100;

  // Actions
  const addWater = (amountMl: number) => {
    addWaterLogMutation.mutate({ amountMl });
  };

  const resetToday = () => {
    resetWaterLogsMutation.mutate();
  };

  const value: HydrationContextValue = {
    // Data
    logs,
    totalWater,
    targetWater,
    percentage,
    logsCount: logs.length,
    remaining,
    isOverflow,

    // Loading states
    isLoading: isLoadingLogs,
    isAddingWater: addWaterLogMutation.isPending,
    isResetting: resetWaterLogsMutation.isPending,

    // Actions
    addWater,
    resetToday,
  };

  return (
    <HydrationContext.Provider value={value}>
      {children}
    </HydrationContext.Provider>
  );
}

export function useHydration(): HydrationContextValue {
  const context = useContext(HydrationContext);
  if (!context) {
    throw new Error("useHydration must be used within a HydrationProvider");
  }
  return context;
}
