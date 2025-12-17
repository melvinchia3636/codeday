import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useWorkoutsQuery } from "../hooks/useWorkoutQueries";
import { useTodayMealsQuery } from "../hooks/useMealQueries";
import { useTodayMealItemsQuery } from "../hooks/useMealItemQueries";
import { useTodayLogsQuery } from "../hooks/useHydrationQueries";
import { useUserProfile } from "./UserProfileContext";
import { calculateCalories } from "../lib/mealItem";

/**
 * Yandere Level: 0-3
 * 0 = Happy (score >= 80)
 * 1 = Neutral (score >= 60)
 * 2 = Tsundere (score >= 40)
 * 3 = Yandere (score < 40)
 */
export type YandereLevel = 0 | 1 | 2 | 3;

interface YandereLevelData {
  nutritionScore: number;
  hydrationScore: number;
  workoutScore: number;

  totalScore: number;

  yandereLevel: YandereLevel;

  isLoading: boolean;
}

const YandereLevelContext = createContext<YandereLevelData | undefined>(
  undefined
);

interface YandereLevelProviderProps {
  children: ReactNode;
}

/**
 * Universal scoring function for all categories
 * Zone A (0-100%): score = percentage
 * Zone B (100-120%): score = 100 (optimal range)
 * Zone C (120-150%): score = 100 - (percentage - 120) × 1.5
 * Zone D (150-200%+): score = max(0, 55 - (percentage - 150) × 1.1)
 */
const calculateZoneScore = (percentage: number): number => {
  if (percentage <= 100) {
    return Math.round(percentage);
  } else if (percentage <= 120) {
    return 100;
  } else if (percentage <= 150) {
    return Math.round(100 - (percentage - 120) * 1.5);
  } else {
    return Math.max(0, Math.round(55 - (percentage - 150) * 1.1));
  }
};

const determineYandereLevel = (score: number): YandereLevel => {
  if (score >= 80) return 0;
  if (score >= 60) return 1;
  if (score >= 40) return 2;
  return 3;
};

export function YandereLevelProvider({ children }: YandereLevelProviderProps) {
  const { data: workouts = [], isLoading: workoutsLoading } =
    useWorkoutsQuery();
  const { data: meals = [], isLoading: mealsLoading } = useTodayMealsQuery();
  const { data: foodLibrary = [], isLoading: foodLoading } =
    useTodayMealItemsQuery();
  const { data: waterLogs = [], isLoading: waterLoading } = useTodayLogsQuery();
  const { settings, isSettingsLoading } = useUserProfile();

  const isLoading =
    workoutsLoading ||
    mealsLoading ||
    foodLoading ||
    waterLoading ||
    isSettingsLoading;

  const levelData = useMemo<YandereLevelData>(() => {
    /**
     * Time-Adjusted Scoring System
     * - Active hours: 8am to 12am (16 hours)
     * - Early in the day: more tolerance
     * - Late in the day: stricter scoring
     */
    const calculateTimeAdjustedPercentage = (
      actualPercentage: number
    ): number => {
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();

      // Active time window: 8am (8) to 12am (24)
      const activeStartHour = 8;
      const activeEndHour = 24;
      const totalActiveHours = activeEndHour - activeStartHour; // 16 hours

      // Calculate elapsed time since active start
      const currentHour = hours + minutes / 60;
      let elapsedHours = currentHour - activeStartHour;

      // Clamp to active window
      if (elapsedHours < 0) elapsedHours = 0;
      if (elapsedHours > totalActiveHours) elapsedHours = totalActiveHours;

      // Step 1: Time progress (0-1)
      const timeProgress = elapsedHours / totalActiveHours;

      // Step 2: Expected percentage (0-100)
      const expectedPercentage = timeProgress * 100;

      // Step 3: Tolerance window - at least 20%, or 60% of expected
      const tolerance = Math.max(20, expectedPercentage * 0.6);

      // Step 4: Effective percentage - don't punish below (expected - tolerance)
      const effectivePercentage = Math.max(
        actualPercentage,
        expectedPercentage - tolerance
      );

      return effectivePercentage;
    };

    // --- NUTRITION ---
    const caloriesTarget = settings?.dietCalorieTarget || 2000;
    let caloriesConsumed = 0;
    for (const meal of meals) {
      if (!meal.items) continue;
      for (const item of meal.items) {
        const foodItem = foodLibrary.find((f) => f.id === item.foodId);
        if (foodItem) {
          const ratio = item.quantity / 100;
          caloriesConsumed += calculateCalories(foodItem) * ratio;
        }
      }
    }
    const nutritionPercentage =
      caloriesTarget > 0 ? (caloriesConsumed / caloriesTarget) * 100 : 0;
    // Apply time adjustment to nutrition
    const adjustedNutritionPercentage =
      calculateTimeAdjustedPercentage(nutritionPercentage);
    const nutritionScore = calculateZoneScore(adjustedNutritionPercentage);

    // --- HYDRATION ---
    const waterConsumed = waterLogs.reduce(
      (sum, w) => sum + (w.amountMl || 0),
      0
    );
    const waterTarget = settings?.hydroTargetMl || 2500;
    const hydrationPercentage =
      waterTarget > 0 ? (waterConsumed / waterTarget) * 100 : 0;
    // Apply time adjustment to hydration
    const adjustedHydrationPercentage =
      calculateTimeAdjustedPercentage(hydrationPercentage);
    const hydrationScore = calculateZoneScore(adjustedHydrationPercentage);

    // --- WORKOUT ---
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date(todayStart);
    todayEnd.setDate(todayEnd.getDate() + 1);

    const todayWorkouts = workouts.filter((w) => {
      const date = new Date(w.created);
      return date >= todayStart && date < todayEnd;
    });

    const workoutMinutes = todayWorkouts.reduce(
      (sum, w) => sum + (w.durationMin || 0),
      0
    );
    const workoutTarget = 60;
    const workoutPercentage =
      workoutTarget > 0 ? (workoutMinutes / workoutTarget) * 100 : 0;
    // No diminishing return for workout - just cap at 100
    // Also apply time adjustment for fair early-day scoring
    const adjustedWorkoutPercentage =
      calculateTimeAdjustedPercentage(workoutPercentage);
    const workoutScore = Math.min(100, Math.round(adjustedWorkoutPercentage));

    const totalScore = Math.round(
      (nutritionScore * 5 + workoutScore * 3 + hydrationScore * 2) / 10
    );

    const yandereLevel = determineYandereLevel(totalScore);

    return {
      nutritionScore,
      hydrationScore,
      workoutScore,
      totalScore,
      yandereLevel,
      isLoading,
    };
  }, [meals, waterLogs, workouts, settings, foodLibrary, isLoading]);

  return (
    <YandereLevelContext.Provider value={levelData}>
      {children}
    </YandereLevelContext.Provider>
  );
}

export function useYandereLevel(): YandereLevelData {
  const context = useContext(YandereLevelContext);
  if (context === undefined) {
    throw new Error(
      "useYandereLevel must be used within a YandereLevelProvider"
    );
  }
  return context;
}
