import { useState, useEffect, useRef, type RefObject } from "react";
import { Icon } from "@iconify/react";
import { animate } from "animejs";
import { MealLogModal } from "./MealLogModal";
import {
  useTodayMealsQuery,
  useCreateMealMutation,
  useUpdateMealMutation,
} from "../../../hooks/useMealQueries";
import { useTodayMealItemsQuery } from "../../../hooks/useMealItemQueries";
import { calculateCalories } from "../../../lib/mealItem";
import type { CreateMealDto, UpdateMealDto } from "../../../lib/meal";

interface MealType {
  id: string;
  icon: string;
  label: string;
  time: string;
}

interface MealTimelineProps {
  mealsRef: RefObject<HTMLDivElement | null>;
  mealTypes: MealType[];
}

export function MealTimeline({ mealsRef, mealTypes }: MealTimelineProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMealType, setSelectedMealType] = useState<string | null>(null);
  const hasAnimated = useRef(false);

  const { data: todayMeals = [], isLoading: mealsLoading } =
    useTodayMealsQuery();
  const { data: foodLibrary = [] } = useTodayMealItemsQuery();
  const createMutation = useCreateMealMutation();
  const updateMutation = useUpdateMealMutation();

  // Animate meal items in when data is loaded
  useEffect(() => {
    if (!mealsLoading && !hasAnimated.current && mealsRef.current) {
      hasAnimated.current = true;
      const items = mealsRef.current.querySelectorAll(".meal-item");
      if (items.length > 0) {
        animate(items, {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: (_el, i) => i * 100,
          duration: 400,
          easing: "easeOutCubic",
        });
      }
    }
  }, [mealsLoading, mealsRef]);

  // Editing meal state - now uses {foodId, quantity}[] structure
  const [editingMeal, setEditingMeal] = useState<{
    id: string;
    type: string;
    items: { foodId: string; quantity: number }[];
  } | null>(null);

  const handleMealClick = (
    typeId: string,
    mealToEdit?: {
      id: string;
      type: string;
      items: { foodId: string; quantity: number }[];
    }
  ) => {
    if (mealToEdit) {
      setEditingMeal(mealToEdit);
    } else {
      setEditingMeal(null);
    }
    setSelectedMealType(typeId);
    setIsModalOpen(true);
  };

  const handleConfirm = (data: {
    id?: string;
    type: string;
    items: { mealItemId: string; quantity: number }[];
  }) => {
    // Convert to new {foodId, quantity} structure
    const items = data.items.map((i) => ({
      foodId: i.mealItemId,
      quantity: i.quantity,
    }));

    const onSuccess = () => {
      setIsModalOpen(false);
      setSelectedMealType(null);
      setEditingMeal(null);
    };

    const onError = (error: Error) => {
      console.error("Failed to save meal:", error);
    };

    if (data.id) {
      // Edit mode - update existing meal
      const updateData: UpdateMealDto = {
        type: data.type,
        items,
      };
      updateMutation.mutate(
        { id: data.id, data: updateData },
        { onSuccess, onError }
      );
    } else {
      // Create mode - new meal
      const createData: CreateMealDto = {
        type: data.type,
        items,
      };
      createMutation.mutate(createData, { onSuccess, onError });
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    setSelectedMealType(null);
    setEditingMeal(null);
  };

  // Helper to get meal items for a meal - with null checks
  const getMealItems = (
    items: { foodId: string; quantity: number }[] | null | undefined
  ) => {
    if (!items) return [];
    return items
      .map((item) => foodLibrary.find((f) => f.id === item.foodId))
      .filter(Boolean);
  };

  // Helper to calculate meal total - with null checks
  const getMealTotal = (
    items: { foodId: string; quantity: number }[] | null | undefined
  ) => {
    if (!items) return 0;
    return items.reduce((sum, item) => {
      const foodItem = foodLibrary.find((f) => f.id === item.foodId);
      if (foodItem) {
        const ratio = item.quantity / 100;
        return sum + calculateCalories(foodItem) * ratio;
      }
      return sum;
    }, 0);
  };

  return (
    <>
      <div
        ref={mealsRef}
        className="bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
        style={{ opacity: 0 }}
      >
        <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
          <Icon icon="pixelarticons:calendar" className="w-5 h-5" />
          TODAY'S_MEALS
          <button
            onClick={() => {
              setSelectedMealType("breakfast");
              setIsModalOpen(true);
            }}
            className="ml-auto group relative flex items-center gap-1.5 px-3 py-1.5 bg-pink-500/20 border border-pink-500/50 hover:border-cyan-400 hover:bg-cyan-400/20 transition-all duration-300"
          >
            <Icon
              icon="pixelarticons:plus"
              className="w-4 h-4 text-pink-400 group-hover:text-cyan-400 transition-colors"
            />
            <span className="text-xs text-pink-400 group-hover:text-cyan-400 tracking-widest transition-colors">
              LOG
            </span>
            {/* Corner accents */}
            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
          </button>
        </h3>

        {/* Loading state */}
        {mealsLoading && (
          <div className="flex items-center justify-center py-8">
            <Icon
              icon="pixelarticons:loader"
              className="w-8 h-8 text-pink-400 animate-spin"
            />
          </div>
        )}

        {!mealsLoading && (
          <div className="space-y-4">
            {mealTypes.map((type) => {
              // Find all meals of this type for today
              const mealsOfType = todayMeals.filter((m) => m.type === type.id);
              const totalCalories = mealsOfType.reduce(
                (sum, meal) => sum + getMealTotal(meal.items),
                0
              );
              const allItems = mealsOfType.flatMap((m) =>
                getMealItems(m.items)
              );
              // Get the first meal of this type to edit (if any)
              const mealToEdit =
                mealsOfType.length > 0 ? mealsOfType[0] : undefined;

              return (
                <button
                  key={type.id}
                  onClick={() => handleMealClick(type.id, mealToEdit)}
                  className="w-full meal-item p-4 bg-zinc-800/50 border border-pink-500/20 hover:border-cyan-400/40 hover:bg-zinc-700/50 transition-all text-left"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={type.icon}
                        className="w-6 h-6 text-pink-500"
                      />
                      <span className="font-bold text-white tracking-widest">
                        {type.label}
                      </span>
                      <span className="text-xs text-pink-400/60">
                        {type.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-cyan-400 font-bold">
                        {totalCalories} kcal
                      </span>
                      <Icon
                        icon="pixelarticons:plus"
                        className="w-4 h-4 text-pink-400/40"
                      />
                    </div>
                  </div>
                  {allItems.length > 0 ? (
                    <div className="flex flex-wrap gap-2 ml-9">
                      {allItems.map((item, j) =>
                        item ? (
                          <span
                            key={`${item.id}-${j}`}
                            className="px-2 py-1 bg-pink-500/10 border border-pink-500/30 text-xs text-pink-400"
                          >
                            {item.foodId.toUpperCase()} (
                            {calculateCalories(item)})
                          </span>
                        ) : null
                      )}
                    </div>
                  ) : (
                    <p className="text-xs text-pink-400/40 ml-9">
                      Click to add items
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Meal Log Modal */}
      <MealLogModal
        isVisible={isModalOpen}
        defaultMealType={selectedMealType || "breakfast"}
        initialData={editingMeal || undefined}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        isLoading={createMutation.isPending}
      />
    </>
  );
}
