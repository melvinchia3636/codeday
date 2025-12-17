import { useMemo } from "react";
import { Icon } from "@iconify/react";
import { useWorkoutsAnimationRefs } from "../contexts/WorkoutsAnimationsContext";
import { useWorkouts } from "../../../contexts/WorkoutsContext";

export function StatsCards() {
  const { statsRef } = useWorkoutsAnimationRefs();
  const { workouts } = useWorkouts();

  const stats = useMemo(() => {
    const totalWorkouts = workouts.length;
    const totalCalories = workouts.reduce(
      (sum, w) => sum + (w.caloriesBurned || 0),
      0
    );
    const totalMinutes = workouts.reduce(
      (sum, w) => sum + (w.durationMin || 0),
      0
    );

    const formatCalories = (cal: number) => {
      if (cal >= 1000) {
        return `${(cal / 1000).toFixed(1)}K`;
      }
      return cal.toString();
    };

    const formatDuration = (minutes: number) => {
      if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
      }
      return `${minutes}m`;
    };

    return [
      {
        label: "TOTAL_WORKOUTS",
        value: totalWorkouts.toString(),
        icon: "pixelarticons:chart-bar",
      },
      {
        label: "CALORIES_BURNED",
        value: formatCalories(totalCalories),
        icon: "pixelarticons:coin",
      },
      {
        label: "TOTAL_DURATION",
        value: formatDuration(totalMinutes),
        icon: "pixelarticons:clock",
      },
    ];
  }, [workouts]);

  return (
    <div
      ref={statsRef}
      className="relative z-10 grid grid-cols-3 gap-4 mb-6"
      style={{ transformStyle: "preserve-3d" }}
    >
      {stats.map((s, i) => (
        <div
          key={i}
          className="stat-card bg-zinc-900/80 border border-pink-500/40 p-4 backdrop-blur-sm hover:border-cyan-400/60 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon icon={s.icon} className="w-5 h-5 text-pink-500" />
            <span className="text-xs text-pink-400/60 tracking-widest">
              {s.label}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
