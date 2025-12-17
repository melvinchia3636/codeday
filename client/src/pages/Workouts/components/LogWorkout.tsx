import { useState } from "react";
import { Icon } from "@iconify/react";
import { useWorkoutsAnimationRefs } from "../contexts/WorkoutsAnimationsContext";
import { useWorkouts } from "../../../contexts/WorkoutsContext";
import { defaultWorkoutTypes, colorMap } from "../../../lib/workout";
import { NumberInput } from "../../../components/NumberInput";
import {
  useLucyToast,
  type WorkoutAction,
} from "../../../contexts/LucyToastContext";

export function LogWorkout() {
  const { logFormRef } = useWorkoutsAnimationRefs();
  const { workoutTypes, createWorkout, isCreatingWorkout } = useWorkouts();
  const { showToast } = useLucyToast();

  const [selectedTypeIndex, setSelectedTypeIndex] = useState(0);
  const [duration, setDuration] = useState(30);

  const defaultDisplayTypes = defaultWorkoutTypes.map((t, i) => ({
    id: `default-${i}`,
    icon: t.icon,
    label: t.name,
    color: t.color,
    caloriesPerMinute: t.caloriesPerMinute,
  }));

  const customDisplayTypes = workoutTypes.map((t) => ({
    id: t.id,
    icon: t.icon,
    label: t.name,
    color: t.color,
    caloriesPerMinute: t.caloriesPerMinute,
  }));

  const displayTypes = [...defaultDisplayTypes, ...customDisplayTypes];

  const selectedType = displayTypes[selectedTypeIndex] || displayTypes[0];
  const rgba = colorMap[selectedType?.color] || colorMap.pink;

  const calculatedCalories = duration * (selectedType?.caloriesPerMinute || 5);

  // Determine workout intensity based on duration
  const getWorkoutIntensity = (durationMin: number): WorkoutAction => {
    if (durationMin >= 45) return "heavy_workout";
    if (durationMin >= 20) return "moderate_workout";
    return "light_workout";
  };

  const handleSave = () => {
    if (!selectedType) return;
    createWorkout({
      type: selectedType.label.toLowerCase(),
      durationMin: duration,
      caloriesBurned: calculatedCalories,
    });

    // Show Lucy toast based on workout intensity
    showToast("logged_workout", getWorkoutIntensity(duration));

    setSelectedTypeIndex(0);
    setDuration(30);
  };

  return (
    <div
      ref={logFormRef}
      className="relative bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-size-[20px_20px] pointer-events-none" />

      <div className="absolute top-0 left-0 w-6 h-6 border-l-2 border-t-2 border-pink-500" />
      <div className="absolute top-0 right-0 w-6 h-6 border-r-2 border-t-2 border-cyan-500" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-l-2 border-b-2 border-cyan-500" />
      <div className="absolute bottom-0 right-0 w-6 h-6 border-r-2 border-b-2 border-pink-500" />

      <div className="relative z-10">
        <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
          <Icon icon="pixelarticons:edit" className="w-5 h-5" />
          LOG_NEW_WORKOUT
          <span className="ml-auto text-[10px] text-fuchsia-400/60 tracking-wider flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-fuchsia-400 animate-pulse" />
            READY
          </span>
        </h3>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-pink-400/70 tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-pink-400" />
              WORKOUT_TYPE
            </label>
            <div className="grid grid-cols-4 gap-2 max-h-40 overflow-y-auto">
              {displayTypes.map((t, i) => {
                const tRgba = colorMap[t.color] || colorMap.pink;
                const isSelected = i === selectedTypeIndex;
                return (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTypeIndex(i)}
                    className={`p-2 border-2 transition-all flex flex-col items-center gap-1 ${
                      isSelected
                        ? ""
                        : "border-zinc-700 hover:border-pink-500/50"
                    }`}
                    style={
                      isSelected
                        ? {
                            borderColor: `${tRgba}1)`,
                            backgroundColor: `${tRgba}0.2)`,
                            boxShadow: `0 0 15px ${tRgba}0.4)`,
                          }
                        : undefined
                    }
                  >
                    <Icon
                      icon={t.icon}
                      className="w-5 h-5"
                      style={{
                        color: isSelected
                          ? `${tRgba}1)`
                          : "rgba(236,72,153,0.5)",
                      }}
                    />
                    <span
                      className="text-[9px] tracking-wider"
                      style={{
                        color: isSelected
                          ? `${tRgba}1)`
                          : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {t.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <NumberInput
            label="DURATION"
            icon="pixelarticons:clock"
            unit="MIN"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          />

          <div className="p-4 bg-zinc-800/50 border border-pink-500/30">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Icon
                  icon="pixelarticons:coin"
                  className="w-5 h-5 text-pink-400"
                />
                <span className="text-xs text-pink-400/70 tracking-widest">
                  ESTIMATED_BURN
                </span>
              </div>
              <div
                className="text-2xl font-bold tracking-wider"
                style={{
                  color: `${rgba}1)`,
                  textShadow: `0 0 10px ${rgba}0.5)`,
                }}
              >
                {calculatedCalories} KCAL
              </div>
            </div>
            <p className="mt-2 text-[10px] text-pink-400/40 tracking-wider">
              {selectedType?.label}: {selectedType?.caloriesPerMinute} KCAL/MIN
              × {duration} MIN
            </p>
          </div>

          <button
            onClick={handleSave}
            disabled={isCreatingWorkout}
            className="group relative w-full py-4 bg-linear-to-r from-pink-600 via-fuchsia-500 to-pink-600 text-white font-bold tracking-widest uppercase overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundSize: "200% 100%" }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-2">
              <Icon
                icon={
                  isCreatingWorkout
                    ? "pixelarticons:loader"
                    : "pixelarticons:check"
                }
                className={`w-5 h-5 ${isCreatingWorkout ? "animate-spin" : ""}`}
              />
              {isCreatingWorkout ? "SAVING..." : "SAVE_WORKOUT"}
            </span>
          </button>
        </div>

        <div className="mt-4 flex items-center justify-between text-[10px]">
          <span className="text-pink-400/50 tracking-widest flex items-center gap-1">
            <Icon icon="pixelarticons:mood-happy" className="w-3 h-3" />
            FORM_VALID
          </span>
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-2 bg-pink-500 animate-pulse"
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
          <span className="text-cyan-400/50 tracking-widest flex items-center gap-1">
            DATA_READY
            <Icon icon="pixelarticons:zap" className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
