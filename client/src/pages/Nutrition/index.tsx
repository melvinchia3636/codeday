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

const todayMeals = [
  {
    id: 1,
    type: "breakfast",
    items: [
      { name: "Oatmeal", cal: 150 },
      { name: "Banana", cal: 90 },
    ],
    total: 240,
  },
  {
    id: 2,
    type: "lunch",
    items: [
      { name: "Grilled Chicken", cal: 350 },
      { name: "Brown Rice", cal: 200 },
      { name: "Salad", cal: 80 },
    ],
    total: 630,
  },
  {
    id: 3,
    type: "snack",
    items: [{ name: "Protein Bar", cal: 180 }],
    total: 180,
  },
];

const foodLibrary = [
  { id: 1, name: "Chicken Breast", cal: 165, icon: "pixelarticons:coin" },
  { id: 2, name: "Brown Rice", cal: 112, icon: "pixelarticons:coin" },
  { id: 3, name: "Broccoli", cal: 34, icon: "pixelarticons:coin" },
  { id: 4, name: "Salmon", cal: 208, icon: "pixelarticons:coin" },
  { id: 5, name: "Egg", cal: 78, icon: "pixelarticons:coin" },
  { id: 6, name: "Avocado", cal: 160, icon: "pixelarticons:coin" },
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

  const totalCalories = todayMeals.reduce((s, m) => s + m.total, 0);
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
        <MealTimeline
          mealsRef={mealsRef}
          mealTypes={mealTypes}
          todayMeals={todayMeals}
        />
        <FoodLibrary foodsRef={foodsRef} foods={foodLibrary} />
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
