import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface WorkoutType {
  id: string;
  icon: string;
  label: string;
  color: string;
}

interface WorkoutEntry {
  id: number;
  type: string;
  duration: number;
  calories: number;
  effort: number;
  date: string;
}

interface WorkoutHistoryProps {
  historyRef: RefObject<HTMLDivElement | null>;
  workoutTypes: WorkoutType[];
  workoutHistory: WorkoutEntry[];
}

export function WorkoutHistory({
  historyRef,
  workoutTypes,
  workoutHistory,
}: WorkoutHistoryProps) {
  return (
    <div
      ref={historyRef}
      className="bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
        <Icon icon="pixelarticons:calendar" className="w-5 h-5" />
        WORKOUT_HISTORY
      </h3>
      <div className="space-y-3">
        {workoutHistory.map((w) => (
          <div
            key={w.id}
            className="history-item p-3 bg-zinc-800/50 border border-pink-500/20 hover:border-cyan-400/40 transition-all flex items-center gap-4"
            style={{ opacity: 0 }}
          >
            <Icon
              icon={workoutTypes.find((t) => t.id === w.type)?.icon || ""}
              className="w-8 h-8 text-pink-500"
            />
            <div className="flex-1">
              <p className="text-sm font-bold text-white uppercase">{w.type}</p>
              <p className="text-xs text-pink-400/60">{w.date}</p>
            </div>
            <div className="text-right">
              <p className="text-cyan-400 font-bold">{w.duration} min</p>
              <p className="text-xs text-pink-400/60">{w.calories} kcal</p>
            </div>
            <div className="w-16 h-2 bg-zinc-700 relative overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-500 to-cyan-500"
                style={{ width: `${w.effort}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
