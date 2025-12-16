import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface MealType {
  id: string;
  icon: string;
  label: string;
  time: string;
}

interface MealItem {
  name: string;
  cal: number;
}

interface Meal {
  id: number;
  type: string;
  items: MealItem[];
  total: number;
}

interface MealTimelineProps {
  mealsRef: RefObject<HTMLDivElement | null>;
  mealTypes: MealType[];
  todayMeals: Meal[];
}

export function MealTimeline({
  mealsRef,
  mealTypes,
  todayMeals,
}: MealTimelineProps) {
  return (
    <div
      ref={mealsRef}
      className="col-span-2 bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
        <Icon icon="pixelarticons:calendar" className="w-5 h-5" />
        TODAY'S_MEALS
      </h3>
      <div className="space-y-4">
        {mealTypes.map((type) => {
          const meal = todayMeals.find((m) => m.type === type.id);
          return (
            <div
              key={type.id}
              className="meal-item p-4 bg-zinc-800/50 border border-pink-500/20 hover:border-cyan-400/40 transition-all"
              style={{ opacity: 0 }}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Icon icon={type.icon} className="w-6 h-6 text-pink-500" />
                  <span className="font-bold text-white tracking-widest">
                    {type.label}
                  </span>
                  <span className="text-xs text-pink-400/60">{type.time}</span>
                </div>
                <span className="text-cyan-400 font-bold">
                  {meal?.total || 0} kcal
                </span>
              </div>
              {meal ? (
                <div className="flex flex-wrap gap-2 ml-9">
                  {meal.items.map((item, j) => (
                    <span
                      key={j}
                      className="px-2 py-1 bg-pink-500/10 border border-pink-500/30 text-xs text-pink-400"
                    >
                      {item.name} ({item.cal})
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-pink-400/40 ml-9">No items logged</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
