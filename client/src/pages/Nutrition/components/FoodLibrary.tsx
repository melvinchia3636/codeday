import { useState, type RefObject } from "react";
import { Icon } from "@iconify/react";
import { CreateFoodModal } from "./CreateFoodModal";
import {
  useCreateMealItemMutation,
  useTodayMealItemsQuery,
} from "../../../hooks/useMealItemQueries";
import {
  calculateCalories,
  type CreateMealItemDto,
  type MealItem,
} from "../../../lib/mealItem";

interface FoodLibraryProps {
  foodsRef: RefObject<HTMLDivElement | null>;
}

export function FoodLibrary({ foodsRef }: FoodLibraryProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: mealItems = [], isLoading } = useTodayMealItemsQuery();
  const createMutation = useCreateMealItemMutation();

  const handleAddFood = () => {
    setIsModalOpen(true);
  };

  const handleConfirm = (data: CreateMealItemDto) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        setIsModalOpen(false);
      },
      onError: (error) => {
        console.error("Failed to create meal item:", error);
      },
    });
  };

  return (
    <>
      <div
        ref={foodsRef}
        className="col-span-2 bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
        style={{ opacity: 0 }}
      >
        {/* Header with scan effect */}
        <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
          <Icon icon="pixelarticons:coin" className="w-5 h-5" />
          FOOD_LIBRARY
          <span className="ml-auto flex items-center gap-3">
            <span className="text-xs text-cyan-400/60 font-mono">
              [{mealItems.length}] ENTRIES
            </span>
            {/* Add button */}
            <button
              onClick={handleAddFood}
              className="group relative flex items-center gap-1.5 px-3 py-1.5 bg-pink-500/20 border border-pink-500/50 hover:border-cyan-400 hover:bg-cyan-400/20 transition-all duration-300"
            >
              <Icon
                icon="pixelarticons:plus"
                className="w-4 h-4 text-pink-400 group-hover:text-cyan-400 transition-colors"
              />
              <span className="text-xs text-pink-400 group-hover:text-cyan-400 tracking-widest transition-colors">
                ADD
              </span>
              {/* Glow effect */}
              <div className="absolute inset-0 bg-pink-500/0 group-hover:bg-cyan-400/10 transition-colors" />
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
              <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
            </button>
          </span>
        </h3>

        {/* Loading state */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Icon
              icon="pixelarticons:loader"
              className="w-8 h-8 text-pink-400 animate-spin"
            />
          </div>
        )}

        {/* Empty state */}
        {!isLoading && mealItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Icon
              icon="pixelarticons:coin"
              className="w-12 h-12 text-pink-400/30 mb-4"
            />
            <p className="text-pink-400/50 tracking-widest text-sm mb-2">
              NO_ENTRIES_FOUND
            </p>
            <p className="text-zinc-500 text-xs tracking-wider">
              Click ADD to add food to the library
            </p>
          </div>
        )}

        {/* Meal items grid */}
        {!isLoading && mealItems.length > 0 && (
          <div className="grid grid-cols-2 gap-3">
            {mealItems.map((item) => (
              <MealItemCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>

      {/* Add Food Modal */}
      <CreateFoodModal
        isVisible={isModalOpen}
        onConfirm={handleConfirm}
        onCancel={() => setIsModalOpen(false)}
        isLoading={createMutation.isPending}
      />
    </>
  );
}

/**
 * Individual meal item card component
 */
function MealItemCard({ item }: { item: MealItem }) {
  const calories = calculateCalories(item);
  const createdTime = new Date(item.created).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div className="food-item group relative p-4 bg-zinc-800/70 border border-pink-500/30 hover:border-cyan-400/60 hover:bg-zinc-700/60 transition-all duration-300 text-left overflow-hidden">
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-linear-to-r from-pink-500/0 via-cyan-500/5 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] pointer-events-none opacity-30" />

      {/* Corner brackets */}
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-400/50" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-400/50" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-400/50" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-400/50" />

      {/* Food name and calories */}
      <div className="relative z-10 flex items-center justify-between mb-3">
        <span className="text-white text-sm font-bold tracking-wider group-hover:text-cyan-300 transition-colors">
          {item.foodId.toUpperCase()}
        </span>
        <span className="text-xs font-mono bg-pink-500/20 border border-pink-500/40 px-2 py-0.5 text-pink-300">
          {calories} KCAL
        </span>
      </div>

      {/* Quantity and time */}
      <div className="relative z-10 flex items-center justify-between mb-3 text-[10px]">
        <span className="text-cyan-400/70 font-mono">{item.quantity}g</span>
        <span className="text-zinc-500 font-mono">{createdTime}</span>
      </div>

      {/* Macro bars */}
      <div className="relative z-10 space-y-2">
        {/* Protein */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-pink-400 font-mono w-8 tracking-wider">
            PRO
          </span>
          <div className="flex-1 h-1.5 bg-zinc-700/80 relative overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-pink-500 to-pink-400 transition-all duration-500"
              style={{ width: `${Math.min((item.protein / 35) * 100, 100)}%` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-pulse" />
          </div>
          <span className="text-[10px] text-pink-300 font-mono w-8 text-right">
            {item.protein}g
          </span>
        </div>

        {/* Carbs */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-cyan-400 font-mono w-8 tracking-wider">
            CRB
          </span>
          <div className="flex-1 h-1.5 bg-zinc-700/80 relative overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-cyan-500 to-cyan-400 transition-all duration-500"
              style={{ width: `${Math.min((item.carbs / 30) * 100, 100)}%` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-pulse" />
          </div>
          <span className="text-[10px] text-cyan-300 font-mono w-8 text-right">
            {item.carbs}g
          </span>
        </div>

        {/* Fat */}
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-fuchsia-400 font-mono w-8 tracking-wider">
            FAT
          </span>
          <div className="flex-1 h-1.5 bg-zinc-700/80 relative overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-fuchsia-500 to-fuchsia-400 transition-all duration-500"
              style={{ width: `${Math.min((item.fat / 20) * 100, 100)}%` }}
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] animate-pulse" />
          </div>
          <span className="text-[10px] text-fuchsia-300 font-mono w-8 text-right">
            {item.fat}g
          </span>
        </div>
      </div>
    </div>
  );
}
