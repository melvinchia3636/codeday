import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { animate } from "animejs";
import { CyberpunkModal } from "../../../components/CyberpunkModal";

interface CreateFoodModalProps {
  isVisible: boolean;
  initialData?: {
    id?: string;
    foodId: string;
    quantity: number;
    protein: number;
    carbs: number;
    fat: number;
  };
  onConfirm: (data: {
    id?: string;
    foodId: string;
    quantity: number;
    protein: number;
    carbs: number;
    fat: number;
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CreateFoodModal({
  isVisible,
  initialData,
  onConfirm,
  onCancel,
  isLoading = false,
}: CreateFoodModalProps) {
  const isEditMode = !!initialData;

  const [foodId, setFoodId] = useState("");
  const [quantity, setQuantity] = useState(100);
  const [protein, setProtein] = useState(0);
  const [carbs, setCarbs] = useState(0);
  const [fat, setFat] = useState(0);

  const previewRef = useRef<HTMLDivElement>(null);

  // Calculate calories from macros (protein * 4 + carbs * 4 + fat * 9)
  const calories = Math.round(protein * 4 + carbs * 4 + fat * 9);

  // Reset form when modal opens
  useEffect(() => {
    if (!isVisible) return;

    if (initialData) {
      setFoodId(initialData.foodId);
      setQuantity(initialData.quantity);
      setProtein(initialData.protein);
      setCarbs(initialData.carbs);
      setFat(initialData.fat);
    } else {
      setFoodId("");
      setQuantity(100);
      setProtein(0);
      setCarbs(0);
      setFat(0);
    }
  }, [isVisible, initialData]);

  // Preview animation when calories change
  useEffect(() => {
    if (previewRef.current && isVisible) {
      animate(previewRef.current, {
        scale: [1, 1.1, 1],
        duration: 400,
        ease: "outElastic(1, 0.5)",
      });
    }
  }, [calories, isVisible]);

  const handleSubmit = () => {
    if (foodId.trim()) {
      onConfirm({
        id: initialData?.id,
        foodId: foodId.trim(),
        quantity,
        protein,
        carbs,
        fat,
      });
    }
  };

  return (
    <CyberpunkModal
      isVisible={isVisible}
      onClose={onCancel}
      title={isEditMode ? "EDIT_MEAL_ITEM" : "LOG_MEAL_ITEM"}
      titleIcon="pixelarticons:coin"
      color="pink"
      isLoading={isLoading}
      statusText="NUTRITION_LOG_ACTIVE"
    >
      {/* Calorie Preview (Auto-calculated) */}
      <div className="flex justify-center mb-6">
        <div
          ref={previewRef}
          className="relative w-28 h-28 flex flex-col items-center justify-center border-2 border-pink-500/60 bg-zinc-800/80"
          style={{
            boxShadow:
              "0 0 30px rgba(236,72,153,0.5), 0 0 60px rgba(236,72,153,0.3)",
          }}
        >
          {/* Corner decorations */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />

          <span
            className="text-3xl font-bold text-pink-400"
            style={{ textShadow: "0 0 10px rgba(236,72,153,0.8)" }}
          >
            {calories}
          </span>
          <span className="text-xs text-pink-400/60 tracking-widest">KCAL</span>
          <span className="text-[8px] text-cyan-400/40 tracking-wider mt-1">
            AUTO_CALC
          </span>
        </div>
      </div>

      {/* Food ID / Name input */}
      <div className="mb-4">
        <label className="text-xs text-fuchsia-400/70 tracking-widest mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-fuchsia-400" />
          FOOD_IDENTIFIER
        </label>
        <input
          type="text"
          value={foodId}
          onChange={(e) => setFoodId(e.target.value)}
          placeholder="ENTER_FOOD_NAME"
          className="w-full bg-zinc-800/80 border-2 border-pink-500/40 px-4 py-3 text-white font-bold tracking-widest focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all placeholder:text-zinc-600"
        />
      </div>

      {/* Quantity input */}
      <div className="mb-4">
        <label className="text-xs text-cyan-400/70 tracking-widest mb-2 flex items-center gap-2">
          <Icon icon="pixelarticons:chart-bar" className="w-3 h-3" />
          QUANTITY
        </label>
        <div className="relative">
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min={1}
            max={9999}
            className="w-full bg-zinc-800/80 border-2 border-cyan-500/40 px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-cyan-400 focus:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-cyan-400/50 text-xs tracking-widest">
            g
          </span>
        </div>
      </div>

      {/* Macro nutrients section */}
      <div className="mb-6">
        <label className="text-xs text-fuchsia-400/70 tracking-widest mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-fuchsia-400 animate-pulse" />
          MACRO_NUTRIENTS
          <span className="flex-1 h-px bg-linear-to-r from-fuchsia-500/50 to-transparent" />
        </label>

        <div className="p-4 bg-zinc-800/50 border border-pink-500/30">
          {/* Macro input grid */}
          <div className="grid grid-cols-3 gap-4">
            {/* Protein */}
            <div>
              <label className="text-[10px] text-pink-400 tracking-widest mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-pink-400" />
                PROTEIN
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={protein}
                  onChange={(e) => setProtein(Number(e.target.value))}
                  min={0}
                  max={999}
                  step={0.1}
                  className="w-full bg-zinc-900/80 border-2 border-pink-500/30 px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-pink-400 transition-all"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-pink-400/40 text-xs">
                  g
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-zinc-700 overflow-hidden relative">
                <div
                  className="h-full bg-linear-to-r from-pink-600 to-pink-400 transition-all"
                  style={{ width: `${Math.min((protein / 50) * 100, 100)}%` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-pulse" />
              </div>
              <div className="mt-1 text-[9px] text-pink-400/40 font-mono">
                = {(protein * 4).toFixed(0)} KCAL
              </div>
            </div>

            {/* Carbs */}
            <div>
              <label className="text-[10px] text-cyan-400 tracking-widest mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-cyan-400" />
                CARBS
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={carbs}
                  onChange={(e) => setCarbs(Number(e.target.value))}
                  min={0}
                  max={999}
                  step={0.1}
                  className="w-full bg-zinc-900/80 border-2 border-cyan-500/30 px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-cyan-400 transition-all"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-cyan-400/40 text-xs">
                  g
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-zinc-700 overflow-hidden relative">
                <div
                  className="h-full bg-linear-to-r from-cyan-600 to-cyan-400 transition-all"
                  style={{ width: `${Math.min((carbs / 100) * 100, 100)}%` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-pulse" />
              </div>
              <div className="mt-1 text-[9px] text-cyan-400/40 font-mono">
                = {(carbs * 4).toFixed(0)} KCAL
              </div>
            </div>

            {/* Fat */}
            <div>
              <label className="text-[10px] text-fuchsia-400 tracking-widest mb-1 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-fuchsia-400" />
                FAT
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={fat}
                  onChange={(e) => setFat(Number(e.target.value))}
                  min={0}
                  max={999}
                  step={0.1}
                  className="w-full bg-zinc-900/80 border-2 border-fuchsia-500/30 px-3 py-2 text-white text-lg font-bold focus:outline-none focus:border-fuchsia-400 transition-all"
                />
                <span className="absolute right-2 top-1/2 -translate-y-1/2 text-fuchsia-400/40 text-xs">
                  g
                </span>
              </div>
              <div className="mt-2 h-1.5 bg-zinc-700 overflow-hidden relative">
                <div
                  className="h-full bg-linear-to-r from-fuchsia-600 to-fuchsia-400 transition-all"
                  style={{ width: `${Math.min((fat / 50) * 100, 100)}%` }}
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-pulse" />
              </div>
              <div className="mt-1 text-[9px] text-fuchsia-400/40 font-mono">
                = {(fat * 9).toFixed(0)} KCAL
              </div>
            </div>
          </div>

          {/* Calorie calculation breakdown */}
          <div className="mt-4 pt-3 border-t border-pink-500/20">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-500 tracking-wider font-mono">
                P({protein}×4) + C({carbs}×4) + F({fat}×9)
              </span>
              <div className="flex items-center gap-2">
                <span className="text-zinc-400">=</span>
                <span className="font-mono font-bold px-2 py-0.5 border text-green-400 border-green-500/30 bg-green-500/10">
                  {calories} KCAL
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={onCancel}
          disabled={isLoading}
          className="group relative flex-1 py-4 bg-zinc-800/80 border-2 border-zinc-600 text-zinc-300 font-bold tracking-widest uppercase overflow-hidden transition-all hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <span className="relative flex items-center justify-center gap-2">
            <Icon icon="pixelarticons:close" className="w-5 h-5" />
            ABORT
          </span>
        </button>

        <button
          onClick={handleSubmit}
          disabled={isLoading || !foodId.trim()}
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
                SYNCING...
              </>
            ) : (
              <>
                <Icon icon="pixelarticons:check" className="w-5 h-5" />
                {isEditMode ? "UPDATE" : "LOG_ITEM"}
              </>
            )}
          </span>
        </button>
      </div>
    </CyberpunkModal>
  );
}
