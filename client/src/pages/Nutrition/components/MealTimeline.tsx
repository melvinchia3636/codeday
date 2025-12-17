import { useState, useEffect, useRef, type RefObject } from "react";
import { Icon } from "@iconify/react";
import { animate } from "animejs";
import { MealLogModal } from "./MealLogModal";
import {
  useTodayMealsQuery,
  useCreateMealMutation,
  useUpdateMealMutation,
} from "../../../hooks/useMealQueries";
import { useMealItemsQuery } from "../../../hooks/useMealItemQueries";
import { calculateCalories } from "../../../lib/mealItem";
import type { CreateMealDto, UpdateMealDto } from "../../../lib/meal";
import {
  useLucyToast,
  type NutritionAction,
} from "../../../contexts/LucyToastContext";

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
  const { showToast } = useLucyToast();

  const { data: todayMeals = [], isLoading: mealsLoading } =
    useTodayMealsQuery();
  const { data: foodLibrary = [] } = useMealItemsQuery();
  const createMutation = useCreateMealMutation();
  const updateMutation = useUpdateMealMutation();

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
    const items = data.items.map((i) => ({
      foodId: i.mealItemId,
      quantity: i.quantity,
    }));

    const getMealAction = (type: string): NutritionAction => {
      const normalizedType = type.toLowerCase();
      if (normalizedType === "breakfast") return "breakfast";
      if (normalizedType === "lunch") return "lunch";
      if (normalizedType === "dinner") return "dinner";
      return "snack";
    };

    const mealType = data.type;

    const onSuccess = () => {
      setIsModalOpen(false);
      setSelectedMealType(null);
      setEditingMeal(null);

      showToast("logged_nutrition", getMealAction(mealType));
    };

    const onError = (error: Error) => {
      console.error("Failed to save meal:", error);
    };

    if (data.id) {
      const updateData: UpdateMealDto = {
        type: data.type,
        items,
      };
      updateMutation.mutate(
        { id: data.id, data: updateData },
        { onSuccess, onError }
      );
    } else {
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

  const getMealItems = (
    items: { foodId: string; quantity: number }[] | null | undefined
  ) => {
    if (!items) return [];
    return items
      .map((item) => foodLibrary.find((f) => f.id === item.foodId))
      .filter(Boolean);
  };

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

            <div className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
            <div className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
            <div className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-pink-500/50 group-hover:border-cyan-400 transition-colors" />
          </button>
        </h3>

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
              const mealsOfType = todayMeals.filter((m) => m.type === type.id);
              const totalCalories = mealsOfType
                .reduce((sum, meal) => sum + getMealTotal(meal.items), 0)
                .toFixed(2);
              const allItems = mealsOfType.flatMap((m) =>
                getMealItems(m.items)
              );

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
