import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface FoodItem {
  id: number;
  name: string;
  cal: number;
  icon: string;
}

interface FoodLibraryProps {
  foodsRef: RefObject<HTMLDivElement | null>;
  foods: FoodItem[];
}

export function FoodLibrary({ foodsRef, foods }: FoodLibraryProps) {
  return (
    <div
      ref={foodsRef}
      className="bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
        <Icon icon="pixelarticons:coin" className="w-5 h-5" />
        FOOD_LIBRARY
      </h3>
      <div className="space-y-2">
        {foods.map((f) => (
          <button
            key={f.id}
            className="food-item w-full p-3 bg-zinc-800/50 border border-pink-500/20 hover:border-cyan-400/40 hover:bg-zinc-700/50 transition-all flex items-center justify-between"
            style={{ opacity: 0 }}
          >
            <span className="text-white text-sm">{f.name}</span>
            <span className="text-cyan-400 text-xs">{f.cal} kcal/100g</span>
          </button>
        ))}
      </div>
    </div>
  );
}
