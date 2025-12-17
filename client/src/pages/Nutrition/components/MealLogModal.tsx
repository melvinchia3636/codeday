import { useState, useEffect, useCallback } from "react";
import { Icon } from "@iconify/react";
import { CyberpunkModal } from "../../../components/CyberpunkModal";
import { useMealItemsQuery } from "../../../hooks/useMealItemQueries";
import { useTodayMealsQuery } from "../../../hooks/useMealQueries";
import { calculateCalories, type MealItem } from "../../../lib/mealItem";

interface InitialMealData {
  id: string;
  type: string;
  items: { foodId: string; quantity: number }[];
}

interface MealLogModalProps {
  isVisible: boolean;
  defaultMealType?: string;
  initialData?: InitialMealData;
  onConfirm: (data: {
    id?: string;
    type: string;
    items: { mealItemId: string; quantity: number }[];
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

const mealTypes = [
  {
    id: "breakfast",
    icon: "pixelarticons:sun",
    label: "BREAKFAST",
    color: "pink",
  },
  { id: "lunch", icon: "pixelarticons:sun-alt", label: "LUNCH", color: "cyan" },
  {
    id: "dinner",
    icon: "pixelarticons:moon-stars",
    label: "DINNER",
    color: "fuchsia",
  },
  { id: "snack", icon: "pixelarticons:coin", label: "SNACK", color: "purple" },
];

interface SelectedItem {
  mealItemId: string;
  foodId: string;
  quantity: number;
  protein: number;
  carbs: number;
  fat: number;
}

export function MealLogModal({
  isVisible,
  defaultMealType = "breakfast",
  initialData,
  onConfirm,
  onCancel,
  isLoading = false,
}: MealLogModalProps) {
  const { data: foodLibrary = [] } = useMealItemsQuery();
  const { data: todayMeals = [] } = useTodayMealsQuery();

  const [selectedType, setSelectedType] = useState(defaultMealType);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);
  const [editingMealId, setEditingMealId] = useState<string | undefined>(
    undefined
  );

  const populateFromMealItems = useCallback(
    (items: { foodId: string; quantity: number }[] | null | undefined) => {
      if (!items) return [];
      return items
        .map((item) => {
          const foodItem = foodLibrary.find((f) => f.id === item.foodId);
          if (!foodItem) return null;
          return {
            mealItemId: foodItem.id,
            foodId: foodItem.foodId,
            quantity: item.quantity,
            protein: foodItem.protein,
            carbs: foodItem.carbs,
            fat: foodItem.fat,
          };
        })
        .filter(Boolean) as SelectedItem[];
    },
    [foodLibrary]
  );

  useEffect(() => {
    if (!isVisible) return;

    if (initialData && foodLibrary.length > 0) {
      setSelectedType(initialData.type);
      setEditingMealId(initialData.id);
      setSelectedItems(populateFromMealItems(initialData.items));
    } else {
      const existingMeal = todayMeals.find((m) => m.type === defaultMealType);
      if (existingMeal && foodLibrary.length > 0) {
        setSelectedType(existingMeal.type);
        setEditingMealId(existingMeal.id);
        setSelectedItems(populateFromMealItems(existingMeal.items));
      } else {
        setSelectedType(defaultMealType);
        setEditingMealId(undefined);
        setSelectedItems([]);
      }
    }
  }, [
    isVisible,
    defaultMealType,
    initialData,
    foodLibrary,
    todayMeals,
    populateFromMealItems,
  ]);

  const handleTypeChange = (newType: string) => {
    setSelectedType(newType);

    const existingMeal = todayMeals.find((m) => m.type === newType);
    if (existingMeal && foodLibrary.length > 0) {
      setEditingMealId(existingMeal.id);
      setSelectedItems(populateFromMealItems(existingMeal.items));
    } else {
      setEditingMealId(undefined);
      setSelectedItems([]);
    }
  };

  const handleAddItem = (foodItem: MealItem) => {
    const existing = selectedItems.find((i) => i.mealItemId === foodItem.id);
    if (existing) return;

    setSelectedItems([
      ...selectedItems,
      {
        mealItemId: foodItem.id,
        foodId: foodItem.foodId,
        quantity: foodItem.quantity,
        protein: foodItem.protein,
        carbs: foodItem.carbs,
        fat: foodItem.fat,
      },
    ]);
  };

  const handleRemoveItem = (mealItemId: string) => {
    setSelectedItems(selectedItems.filter((i) => i.mealItemId !== mealItemId));
  };

  const handleQuantityChange = (mealItemId: string, quantity: number) => {
    setSelectedItems(
      selectedItems.map((item) =>
        item.mealItemId === mealItemId ? { ...item, quantity } : item
      )
    );
  };

  const handleSubmit = () => {
    if (selectedItems.length > 0) {
      onConfirm({
        id: editingMealId,
        type: selectedType,
        items: selectedItems.map((i) => ({
          mealItemId: i.mealItemId,
          quantity: i.quantity,
        })),
      });
    }
  };

  const isEditMode = !!editingMealId;

  const totalCalories = selectedItems.reduce((sum, item) => {
    const ratio = item.quantity / 100;
    return (
      sum +
      calculateCalories({
        protein: item.protein * ratio,
        carbs: item.carbs * ratio,
        fat: item.fat * ratio,
      })
    );
  }, 0);

  const totalProtein = selectedItems.reduce(
    (sum, item) => sum + (item.protein * item.quantity) / 100,
    0
  );
  const totalCarbs = selectedItems.reduce(
    (sum, item) => sum + (item.carbs * item.quantity) / 100,
    0
  );
  const totalFat = selectedItems.reduce(
    (sum, item) => sum + (item.fat * item.quantity) / 100,
    0
  );

  return (
    <CyberpunkModal
      isVisible={isVisible}
      onClose={onCancel}
      title={isEditMode ? "EDIT_MEAL" : "LOG_MEAL"}
      titleIcon="pixelarticons:calendar"
      color="pink"
      isLoading={isLoading}
      statusText="MEAL_TRACKER_ACTIVE"
    >
      <div className="mb-6">
        <label className="text-xs text-fuchsia-400/70 tracking-widest mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-fuchsia-400 animate-pulse" />
          MEAL_TYPE
          <span className="flex-1 h-px bg-linear-to-r from-fuchsia-500/50 to-transparent" />
        </label>
        <div className="grid grid-cols-4 gap-2">
          {mealTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className={`group relative flex flex-col items-center gap-2 p-3 border-2 transition-all ${
                selectedType === type.id
                  ? `border-${type.color}-500 bg-${type.color}-500/20`
                  : "border-zinc-700 hover:border-pink-500/50"
              }`}
              style={
                selectedType === type.id
                  ? { boxShadow: `0 0 15px rgba(236,72,153,0.3)` }
                  : undefined
              }
            >
              <Icon
                icon={type.icon}
                className={`w-6 h-6 ${
                  selectedType === type.id
                    ? `text-${type.color}-400`
                    : "text-zinc-500"
                }`}
              />
              <span
                className={`text-[10px] tracking-widest ${
                  selectedType === type.id
                    ? `text-${type.color}-400`
                    : "text-zinc-500"
                }`}
              >
                {type.label}
              </span>
              {selectedType === type.id && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-pink-500 flex items-center justify-center">
                  <Icon
                    icon="pixelarticons:check"
                    className="w-2 h-2 text-white"
                  />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <label className="text-xs text-fuchsia-400/70 tracking-widest mb-3 flex items-center gap-2">
          <Icon icon="pixelarticons:coin" className="w-3 h-3" />
          SELECT_FOOD_ITEMS
          <span className="ml-auto text-cyan-400/50 font-mono text-[10px]">
            [{foodLibrary.length}] AVAILABLE
          </span>
        </label>

        {foodLibrary.length === 0 ? (
          <div className="p-4 bg-zinc-800/50 border border-pink-500/30 text-center">
            <p className="text-zinc-500 text-xs tracking-wider">
              No food items in library. Add foods first.
            </p>
          </div>
        ) : (
          <div className="max-h-32 overflow-y-auto p-2 bg-zinc-800/50 border border-pink-500/30 space-y-1">
            {foodLibrary.map((food) => {
              const isSelected = selectedItems.some(
                (i) => i.mealItemId === food.id
              );
              return (
                <button
                  key={food.id}
                  onClick={() => handleAddItem(food)}
                  disabled={isSelected}
                  className={`w-full flex items-center justify-between p-2 border transition-all text-left ${
                    isSelected
                      ? "border-cyan-500/50 bg-cyan-500/10 opacity-50"
                      : "border-zinc-700 hover:border-pink-500/50 hover:bg-pink-500/10"
                  }`}
                >
                  <span className="text-sm text-white tracking-wider">
                    {food.foodId.toUpperCase()}
                  </span>
                  <span className="text-xs text-pink-400/60 font-mono">
                    {calculateCalories(food)} kcal
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <div className="mb-6">
        <label className="text-xs text-fuchsia-400/70 tracking-widest mb-3 flex items-center gap-2">
          <Icon icon="pixelarticons:check" className="w-3 h-3" />
          SELECTED_ITEMS
          <span className="ml-auto text-cyan-400/50 font-mono text-[10px]">
            [{selectedItems.length}] ITEMS
          </span>
        </label>

        {selectedItems.length === 0 ? (
          <div className="p-4 bg-zinc-800/50 border border-pink-500/30 text-center">
            <p className="text-zinc-500 text-xs tracking-wider">
              No items selected. Click on foods above to add.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {selectedItems.map((item) => (
              <div
                key={item.mealItemId}
                className="flex items-center gap-3 p-3 bg-zinc-800/50 border border-pink-500/30"
              >
                <div className="flex-1">
                  <p className="text-sm text-white tracking-wider">
                    {item.foodId.toUpperCase()}
                  </p>
                  <p className="text-[10px] text-pink-400/50 font-mono">
                    P:{item.protein}g C:{item.carbs}g F:{item.fat}g
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleQuantityChange(
                        item.mealItemId,
                        Number(e.target.value)
                      )
                    }
                    min={1}
                    max={9999}
                    className="w-20 bg-zinc-900 border border-cyan-500/30 px-2 py-1 text-white text-sm font-mono text-center focus:outline-none focus:border-cyan-400"
                  />
                  <span className="text-xs text-cyan-400/50">g</span>
                  <button
                    onClick={() => handleRemoveItem(item.mealItemId)}
                    className="p-1 text-red-400/60 hover:text-red-400 transition-colors"
                  >
                    <Icon icon="pixelarticons:close" className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItems.length > 0 && (
        <div className="mb-6 p-4 bg-zinc-800/50 border border-pink-500/30">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-fuchsia-400/70 tracking-widest">
              MEAL_TOTALS
            </span>
            <span
              className="text-lg font-bold text-pink-400"
              style={{ textShadow: "0 0 10px rgba(236,72,153,0.5)" }}
            >
              {Math.round(totalCalories)} KCAL
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-[10px] text-pink-400/50 tracking-widest">
                PROTEIN
              </p>
              <p className="text-sm font-mono text-pink-400">
                {totalProtein.toFixed(1)}g
              </p>
            </div>
            <div>
              <p className="text-[10px] text-cyan-400/50 tracking-widest">
                CARBS
              </p>
              <p className="text-sm font-mono text-cyan-400">
                {totalCarbs.toFixed(1)}g
              </p>
            </div>
            <div>
              <p className="text-[10px] text-fuchsia-400/50 tracking-widest">
                FAT
              </p>
              <p className="text-sm font-mono text-fuchsia-400">
                {totalFat.toFixed(1)}g
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="group relative flex-1 py-4 bg-zinc-800/80 border-2 border-zinc-600 text-zinc-300 font-bold tracking-widest uppercase overflow-hidden transition-all hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center justify-center gap-2">
            <Icon icon="pixelarticons:close" className="w-5 h-5" />
            CANCEL
          </span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={isLoading || selectedItems.length === 0}
          className="group relative flex-1 py-4 bg-linear-to-r from-pink-600 via-fuchsia-500 to-pink-600 text-white font-bold tracking-widest uppercase overflow-hidden transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            boxShadow: "0 0 30px rgba(236,72,153,0.4)",
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          <span className="relative flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Icon
                  icon="pixelarticons:loader"
                  className="w-5 h-5 animate-spin"
                />
                SAVING...
              </>
            ) : (
              <>
                <Icon icon="pixelarticons:check" className="w-5 h-5" />
                {isEditMode ? "UPDATE" : "LOG_MEAL"}
              </>
            )}
          </span>
        </button>
      </div>
    </CyberpunkModal>
  );
}
