import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { animate } from "animejs";
import type { WorkoutType } from "../../../lib/workout";
import {
  CyberpunkModal,
  type ModalColor,
} from "../../../components/CyberpunkModal";

interface WorkoutTypeModalProps {
  isVisible: boolean;
  initialData?: WorkoutType;
  onConfirm: (data: {
    id?: string;
    name: string;
    icon: string;
    color: string;
    caloriesPerMinute: number;
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// Available icons for selection
const availableIcons = [
  "pixelarticons:human",
  "pixelarticons:human-run",
  "pixelarticons:speed-fast",
  "pixelarticons:speed-medium",
  "pixelarticons:drop",
  "pixelarticons:trophy",
  "pixelarticons:heart",
  "pixelarticons:zap",
  "pixelarticons:coin",
  "pixelarticons:clock",
  "pixelarticons:chart-bar",
  "pixelarticons:zap",
  "pixelarticons:shield",
  "pixelarticons:sun",
  "pixelarticons:moon",
  "pixelarticons:music",
];

// Available colors matching ModalColor type
const availableColors: { name: ModalColor; class: string; glow: string }[] = [
  { name: "cyan", class: "bg-cyan-500", glow: "rgba(34,211,238," },
  { name: "pink", class: "bg-pink-500", glow: "rgba(236,72,153," },
  { name: "fuchsia", class: "bg-fuchsia-500", glow: "rgba(217,70,239," },
  { name: "purple", class: "bg-purple-500", glow: "rgba(168,85,247," },
  { name: "green", class: "bg-green-500", glow: "rgba(34,197,94," },
  { name: "orange", class: "bg-orange-500", glow: "rgba(249,115,22," },
  { name: "amber", class: "bg-amber-500", glow: "rgba(245,158,11," },
  { name: "red", class: "bg-red-500", glow: "rgba(239,68,68," },
];

export function WorkoutTypeModal({
  isVisible,
  initialData,
  onConfirm,
  onCancel,
  isLoading = false,
}: WorkoutTypeModalProps) {
  const isEditMode = !!initialData;

  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(availableIcons[0]);
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [caloriesPerMinute, setCaloriesPerMinute] = useState(5);

  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    // Initialize form with data (edit mode) or defaults (create mode)
    if (initialData) {
      setName(initialData.name);
      setSelectedIcon(initialData.icon);
      const foundColor = availableColors.find(
        (c) => c.name === initialData.color
      );
      setSelectedColor(foundColor || availableColors[0]);
      setCaloriesPerMinute(initialData.caloriesPerMinute);
    } else {
      setName("");
      setSelectedIcon(availableIcons[0]);
      setSelectedColor(availableColors[0]);
      setCaloriesPerMinute(5);
    }
  }, [isVisible, initialData]);

  // Preview animation on icon/color change
  useEffect(() => {
    if (previewRef.current && isVisible) {
      animate(previewRef.current, {
        scale: [1, 1.3, 1],
        rotate: [0, -15, 15, 0],
        duration: 500,
        ease: "outElastic(1, 0.5)",
      });
    }
  }, [selectedIcon, selectedColor, isVisible]);

  const handleSubmit = () => {
    if (name.trim()) {
      onConfirm({
        id: initialData?.id,
        name: name.toUpperCase().replace(/\s+/g, "_"),
        icon: selectedIcon,
        color: selectedColor.name,
        caloriesPerMinute,
      });
    }
  };

  return (
    <CyberpunkModal
      isVisible={isVisible}
      onClose={onCancel}
      title={isEditMode ? "EDIT_WORKOUT_TYPE" : "CREATE_WORKOUT_TYPE"}
      titleIcon="pixelarticons:zap"
      color={selectedColor.name}
      isLoading={isLoading}
      statusText="NEURAL_LINK_ACTIVE"
    >
      {/* Preview */}
      <div className="flex justify-center mb-6">
        <div
          ref={previewRef}
          className="w-24 h-24 flex items-center justify-center border-2"
          style={{
            borderColor: `${selectedColor.glow}1)`,
            backgroundColor: `${selectedColor.glow}0.2)`,
            boxShadow: `0 0 30px ${selectedColor.glow}0.5), 0 0 60px ${selectedColor.glow}0.3)`,
          }}
        >
          <Icon
            icon={selectedIcon}
            className="w-12 h-12"
            style={{
              color: `${selectedColor.glow}1)`,
              filter: `drop-shadow(0 0 10px ${selectedColor.glow}0.8))`,
            }}
          />
        </div>
      </div>

      {/* Name input */}
      <div className="mb-4">
        <label className="text-xs text-fuchsia-400/70 tracking-widest mb-2 flex items-center gap-2">
          <span className="w-1.5 h-1.5 bg-fuchsia-400" />
          DESIGNATION_CODE
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="ENTER_WORKOUT_NAME"
          className="w-full bg-zinc-800/80 border-2 border-pink-500/40 px-4 py-3 text-white font-bold tracking-widest focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all placeholder:text-zinc-600"
        />
      </div>

      {/* Calories per minute input */}
      <div className="mb-6">
        <label className="text-xs text-fuchsia-400/70 tracking-widest mb-2 flex items-center gap-2">
          <Icon icon="pixelarticons:coin" className="w-3 h-3" />
          CALORIES_PER_MINUTE
        </label>
        <div className="relative">
          <input
            type="number"
            value={caloriesPerMinute}
            onChange={(e) => setCaloriesPerMinute(Number(e.target.value))}
            min={1}
            max={50}
            className="w-full bg-zinc-800/80 border-2 border-pink-500/40 px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400/50 text-sm tracking-widest">
            KCAL/MIN
          </span>
        </div>
        <p className="mt-1 text-[10px] text-pink-400/40 tracking-wider">
          ESTIMATED_BURN_RATE: {caloriesPerMinute * 30} KCAL / 30 MIN
        </p>
      </div>

      {/* Icon selector */}
      <div className="mb-6">
        <label className="text-xs text-fuchsia-400/70 tracking-widest mb-2 block">
          GLYPH_SELECTOR
        </label>
        <div className="grid grid-cols-8 gap-2 p-3 bg-zinc-800/50 border border-pink-500/30">
          {availableIcons.map((icon) => (
            <button
              key={icon}
              onClick={() => setSelectedIcon(icon)}
              className={`p-2 border transition-all flex items-center justify-center ${
                selectedIcon === icon
                  ? ""
                  : "border-zinc-700 hover:border-pink-500/50 hover:bg-pink-500/10"
              }`}
              style={
                selectedIcon === icon
                  ? {
                      borderColor: `${selectedColor.glow}1)`,
                      backgroundColor: `${selectedColor.glow}0.2)`,
                      boxShadow: `0 0 15px ${selectedColor.glow}0.5)`,
                    }
                  : undefined
              }
            >
              <Icon
                icon={icon}
                className="w-6 h-6"
                style={{
                  color:
                    selectedIcon === icon
                      ? `${selectedColor.glow}1)`
                      : "rgba(236,72,153,0.5)",
                }}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Color selector */}
      <div className="mb-6">
        <label className="text-xs text-fuchsia-400/70 tracking-widest mb-3 flex items-center gap-2">
          <span className="w-2 h-2 bg-fuchsia-400 animate-pulse" />
          CHROMA_MATRIX
          <span className="flex-1 h-px bg-linear-to-r from-fuchsia-500/50 to-transparent" />
        </label>
        <div className="relative p-3 bg-zinc-800/50 border border-pink-500/30">
          <div className="relative grid grid-cols-8 gap-2">
            {availableColors.map((color) => (
              <div
                key={color.name}
                className="group flex flex-col items-center gap-1"
              >
                <button
                  onClick={() => setSelectedColor(color)}
                  className={`relative w-full aspect-square ${
                    color.class
                  } transition-all duration-200 border-2 ${
                    selectedColor.name === color.name
                      ? "border-white scale-105"
                      : "border-transparent opacity-60 hover:opacity-100 hover:border-white/50"
                  }`}
                  style={{
                    boxShadow:
                      selectedColor.name === color.name
                        ? `0 0 15px ${color.glow}0.8), inset 0 0 10px ${color.glow}0.3)`
                        : undefined,
                  }}
                >
                  <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-black/20" />
                  {selectedColor.name === color.name && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Icon
                        icon="pixelarticons:check"
                        className="w-4 h-4 text-white drop-shadow-lg"
                      />
                    </div>
                  )}
                </button>
                <span
                  className={`text-[8px] tracking-wider uppercase transition-all ${
                    selectedColor.name === color.name
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-70"
                  }`}
                  style={{ color: `${color.glow}1)` }}
                >
                  {color.name}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom bar indicator */}
          <div className="mt-4 flex items-center justify-center gap-2">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-pink-500/50" />
            <div className="flex gap-0.5">
              {availableColors.map((c) => (
                <div
                  key={c.name}
                  className={`w-1.5 transition-all ${
                    selectedColor.name === c.name ? "h-4" : "h-2"
                  }`}
                  style={{
                    background: `${c.glow}${
                      selectedColor.name === c.name ? "1)" : "0.3)"
                    }`,
                    boxShadow:
                      selectedColor.name === c.name
                        ? `0 0 6px ${c.glow}0.8)`
                        : undefined,
                  }}
                />
              ))}
            </div>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-cyan-500/50" />
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
          disabled={isLoading || !name.trim()}
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
                {isEditMode ? "UPDATE" : "INITIALIZE"}
              </>
            )}
          </span>
        </button>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </CyberpunkModal>
  );
}
