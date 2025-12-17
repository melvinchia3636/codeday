import { useRef, useMemo } from "react";
import { useNutritionAnimations } from "./hooks/useNutritionAnimations";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageDecorations } from "../../components/PageDecorations";
import { PageHeader } from "../../components/PageHeader";
import { MacroCircles } from "./components/MacroCircles";
import { MealTimeline } from "./components/MealTimeline";
import { FoodLibrary } from "./components/FoodLibrary";
import { useTodayMealsQuery } from "../../hooks/useMealQueries";
import { useTodayMealItemsQuery } from "../../hooks/useMealItemQueries";
import { calculateCalories } from "../../lib/mealItem";
import { useUserProfile } from "../../contexts/UserProfileContext";

const mealTypes = [
  {
    id: "breakfast",
    icon: "pixelarticons:sun",
    label: "BREAKFAST",
    time: "07:30",
  },
  { id: "lunch", icon: "pixelarticons:sun-alt", label: "LUNCH", time: "12:00" },
  {
    id: "dinner",
    icon: "pixelarticons:moon-stars",
    label: "DINNER",
    time: "19:00",
  },
  { id: "snack", icon: "pixelarticons:coin", label: "SNACK", time: "15:00" },
];

// Protein: 25% of calories (4 cal/g)
// Carbs: 50% of calories (4 cal/g)
// Fat: 25% of calories (9 cal/g)
const PROTEIN_RATIO = 0.25;
const CARBS_RATIO = 0.5;
const FAT_RATIO = 0.25;

function NutritionContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const macrosRef = useRef<HTMLDivElement>(null);
  const mealsRef = useRef<HTMLDivElement>(null);
  const foodsRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const { settings } = useUserProfile();
  const { data: todayMeals = [] } = useTodayMealsQuery();
  const { data: foodLibrary = [] } = useTodayMealItemsQuery();

  useNutritionAnimations({
    containerRef,
    macrosRef,
    mealsRef,
    foodsRef,
    logRef,
  });

  // Get calorie target from user settings (default 2000)
  const targetCalories = settings?.dietCalorieTarget || 2000;

  // Derive macro targets from calorie target
  // Protein: 4 calories per gram
  // Carbs: 4 calories per gram
  // Fat: 9 calories per gram
  const targetProtein = Math.round((targetCalories * PROTEIN_RATIO) / 4);
  const targetCarbs = Math.round((targetCalories * CARBS_RATIO) / 4);
  const targetFat = Math.round((targetCalories * FAT_RATIO) / 9);

  // Calculate actual totals from today's meals
  const { totalProtein, totalCarbs, totalFat, totalCalories } = useMemo(() => {
    let protein = 0;
    let carbs = 0;
    let fat = 0;
    let calories = 0;

    // Iterate through all meals and their items - with null checks
    for (const meal of todayMeals) {
      if (!meal.items) continue;
      for (const item of meal.items) {
        const foodItem = foodLibrary.find((f) => f.id === item.foodId);
        if (foodItem) {
          const ratio = item.quantity / 100;
          protein += foodItem.protein * ratio;
          carbs += foodItem.carbs * ratio;
          fat += foodItem.fat * ratio;
          calories += calculateCalories(foodItem) * ratio;
        }
      }
    }

    return {
      totalProtein: Math.round(protein),
      totalCarbs: Math.round(carbs),
      totalFat: Math.round(fat),
      totalCalories: Math.round(calories),
    };
  }, [todayMeals, foodLibrary]);

  // Build macros array with actual values
  const macros = [
    {
      label: "PROTEIN",
      current: totalProtein,
      target: targetProtein,
      color: "pink",
      unit: "g",
    },
    {
      label: "CARBS",
      current: totalCarbs,
      target: targetCarbs,
      color: "cyan",
      unit: "g",
    },
    {
      label: "FAT",
      current: totalFat,
      target: targetFat,
      color: "fuchsia",
      unit: "g",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-8 border-pink-500 p-6 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-linear-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations />
      <PageHeader
        icon="pixelarticons:coin"
        title="NUTRITION_LOG"
        status={`${totalCalories} / ${targetCalories} KCAL`}
        color="pink"
      />
      <MacroCircles
        macrosRef={macrosRef}
        macros={macros}
        totalCalories={totalCalories}
        targetCalories={targetCalories}
      />
      <div className="relative z-10 flex-1 grid grid-cols-3 gap-6 overflow-hidden">
        <MealTimeline mealsRef={mealsRef} mealTypes={mealTypes} />
        <FoodLibrary foodsRef={foodsRef} />
      </div>
    </div>
  );
}

export function Nutrition() {
  return (
    <PageDecorationsProvider color="pink">
      <NutritionContent />
    </PageDecorationsProvider>
  );
}
