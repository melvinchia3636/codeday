import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface StatsGridProps {
  statsRef: RefObject<HTMLDivElement | null>;
  totalWater: number;
  targetWater: number;
  logsCount: number;
}

export function StatsGrid({
  statsRef,
  totalWater,
  targetWater,
  logsCount,
}: StatsGridProps) {
  const stats = [
    { label: "TODAY", value: `${totalWater}ml`, icon: "pixelarticons:drop" },
    {
      label: "REMAINING",
      value: `${targetWater - totalWater}ml`,
      icon: "pixelarticons:drop-half",
    },
    { label: "LOGS", value: logsCount, icon: "pixelarticons:chart-bar" },
    { label: "INTERVAL", value: "45min", icon: "pixelarticons:clock" },
  ];

  return (
    <div ref={statsRef} className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs">
      {stats.map((s, i) => (
        <div
          key={i}
          className="stat-card bg-zinc-900/80 border border-cyan-500/40 p-3 backdrop-blur-sm"
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2 mb-1">
            <Icon icon={s.icon} className="w-4 h-4 text-cyan-500" />
            <span className="text-[10px] text-cyan-400/60 tracking-widest">
              {s.label}
            </span>
          </div>
          <p className="text-lg font-bold text-white">{s.value}</p>
        </div>
      ))}
    </div>
  );
}
