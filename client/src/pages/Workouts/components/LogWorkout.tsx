import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface WorkoutType {
  id: string;
  icon: string;
  label: string;
  color: string;
}

interface LogWorkoutProps {
  logFormRef: RefObject<HTMLDivElement | null>;
  workoutTypes: WorkoutType[];
}

export function LogWorkout({ logFormRef, workoutTypes }: LogWorkoutProps) {
  return (
    <div
      ref={logFormRef}
      className="bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
        <Icon icon="pixelarticons:edit" className="w-5 h-5" />
        LOG_NEW_WORKOUT
      </h3>
      <div className="space-y-4">
        <div>
          <label className="text-xs text-pink-400/70 tracking-widest mb-2 block">
            WORKOUT_TYPE
          </label>
          <select className="w-full bg-zinc-800/80 border border-pink-500/40 px-4 py-3 text-white focus:outline-none focus:border-pink-500">
            {workoutTypes.map((t) => (
              <option key={t.id} value={t.id}>
                {t.label}
              </option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs text-pink-400/70 tracking-widest mb-2 block">
              DURATION (MIN)
            </label>
            <input
              type="number"
              defaultValue={30}
              className="w-full bg-zinc-800/80 border border-pink-500/40 px-4 py-3 text-white focus:outline-none focus:border-pink-500"
            />
          </div>
          <div>
            <label className="text-xs text-pink-400/70 tracking-widest mb-2 block">
              CALORIES
            </label>
            <input
              type="number"
              defaultValue={200}
              className="w-full bg-zinc-800/80 border border-pink-500/40 px-4 py-3 text-white focus:outline-none focus:border-pink-500"
            />
          </div>
        </div>
        <div>
          <label className="text-xs text-pink-400/70 tracking-widest mb-2 block">
            EFFORT_LEVEL
          </label>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue={75}
            className="w-full accent-pink-500"
          />
        </div>
        <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all flex items-center justify-center gap-2">
          <Icon icon="pixelarticons:check" className="w-5 h-5" />
          SAVE_WORKOUT
        </button>
      </div>
    </div>
  );
}
