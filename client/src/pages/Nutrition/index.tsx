import { useRef } from "react";
import { useNutritionAnimations } from "./hooks/useNutritionAnimations";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageDecorations } from "../../components/PageDecorations";
import { PageHeader } from "../../components/PageHeader";
import { MacroCircles } from "./components/MacroCircles";
import { MealTimeline } from "./components/MealTimeline";
import { FoodLibrary } from "./components/FoodLibrary";

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

const macros = [
  { label: "PROTEIN", current: 95, target: 120, color: "pink", unit: "g" },
  { label: "CARBS", current: 180, target: 250, color: "cyan", unit: "g" },
  { label: "FAT", current: 55, target: 70, color: "fuchsia", unit: "g" },
];

function NutritionContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const macrosRef = useRef<HTMLDivElement>(null);
  const mealsRef = useRef<HTMLDivElement>(null);
  const foodsRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  useNutritionAnimations({
    containerRef,
    macrosRef,
    mealsRef,
    foodsRef,
    logRef,
  });

  // TODO: Calculate from actual meal data
  const totalCalories = 1050;
  const targetCalories = 2200;

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
