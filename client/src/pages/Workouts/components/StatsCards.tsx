import { Icon } from "@iconify/react";
import { useWorkoutsAnimationRefs } from "../contexts/WorkoutsAnimationsContext";

const stats = [
  { label: "TOTAL_WORKOUTS", value: "156", icon: "pixelarticons:chart-bar" },
  { label: "CALORIES_BURNED", value: "48.5K", icon: "pixelarticons:coin" },
  { label: "TOTAL_DURATION", value: "72h", icon: "pixelarticons:clock" },
];

export function StatsCards() {
  const { statsRef } = useWorkoutsAnimationRefs();

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
