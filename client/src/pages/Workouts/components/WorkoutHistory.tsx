import { Icon } from "@iconify/react";
import { useWorkoutsAnimationRefs } from "../contexts/WorkoutsAnimationsContext";
import { useWorkouts } from "../../../contexts/WorkoutsContext";
import { defaultWorkoutTypes } from "../../../lib/workout";

const workoutHistory = [
  {
    id: 1,
    type: "running",
    duration: 45,
    calories: 420,
    effort: 85,
    date: "2024-12-16 08:30",
  },
  {
    id: 2,
    type: "strength",
    duration: 60,
    calories: 380,
    effort: 90,
    date: "2024-12-15 17:00",
  },
  {
    id: 3,
    type: "walking",
    duration: 30,
    calories: 150,
    effort: 40,
    date: "2024-12-15 07:00",
  },
  {
    id: 4,
    type: "stretch",
    duration: 20,
    calories: 60,
    effort: 25,
    date: "2024-12-14 22:00",
  },
  {
    id: 5,
    type: "swimming",
    duration: 40,
    calories: 350,
    effort: 75,
    date: "2024-12-14 11:00",
  },
];

export function WorkoutHistory() {
  const { historyRef } = useWorkoutsAnimationRefs();
  const { workoutTypes } = useWorkouts();

  // Use custom types if available, otherwise use defaults
  const displayTypes =
    workoutTypes.length > 0
      ? workoutTypes.map((t) => ({
          id: t.name.toLowerCase(),
          icon: t.icon,
          label: t.name,
          color: t.color,
        }))
      : defaultWorkoutTypes.map((t) => ({
          id: t.name.toLowerCase(),
          icon: t.icon,
          label: t.name,
          color: t.color,
        }));

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
              icon={
                displayTypes.find((t) => t.id === w.type)?.icon ||
                "pixelarticons:human"
              }
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
