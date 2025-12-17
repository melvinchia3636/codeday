import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface DailySummary {
  date: string;
  diet: number;
  hydro: number;
  effort: number;
  total: number;
  emotion: string;
}

interface SummaryCardsProps {
  summaryRef: RefObject<HTMLDivElement | null>;
  today: DailySummary;
  emotionIcons: Record<string, string>;
  emotionColors: Record<string, string>;
}

const borderClasses: Record<string, string> = {
  pink: "border-pink-500/40 hover:border-pink-400/60",
  cyan: "border-cyan-500/40 hover:border-cyan-400/60",
  fuchsia: "border-fuchsia-500/40 hover:border-fuchsia-400/60",
};

const textClasses: Record<string, string> = {
  pink: "text-pink-500",
  cyan: "text-cyan-500",
  fuchsia: "text-fuchsia-500",
};

const gradientClasses: Record<string, string> = {
  pink: "bg-linear-to-r from-pink-500 to-fuchsia-500",
  cyan: "bg-linear-to-r from-cyan-500 to-pink-500",
  fuchsia: "bg-linear-to-r from-fuchsia-500 to-cyan-500",
};

export function SummaryCards({
  summaryRef,
  today,
  emotionIcons,
  emotionColors,
}: SummaryCardsProps) {
  const cards = [
    {
      label: "DIET_SCORE",
      value: today.diet,
      icon: "pixelarticons:coin",
      color: "pink",
    },
    {
      label: "HYDRO_SCORE",
      value: today.hydro,
      icon: "pixelarticons:drop",
      color: "cyan",
    },
    {
      label: "EFFORT_SCORE",
      value: today.effort,
      icon: "pixelarticons:zap",
      color: "fuchsia",
    },
    {
      label: "TOTAL_SCORE",
      value: today.total,
      icon: "pixelarticons:chart-bar",
      color: "pink",
    },
    {
      label: "WAIFU_MOOD",
      value: today.emotion.toUpperCase(),
      icon: emotionIcons[today.emotion],
      color: emotionColors[today.emotion],
    },
  ];

  return (
    <div
      ref={summaryRef}
      className="relative z-10 grid grid-cols-5 gap-4 mb-6"
      style={{ transformStyle: "preserve-3d" }}
    >
      {cards.map((s, i) => (
        <div
          key={i}
          className={`summary-card bg-zinc-900/80 border ${
            borderClasses[s.color] || borderClasses.pink
          } p-4 backdrop-blur-sm transition-all`}
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon
              icon={s.icon}
              className={`w-5 h-5 ${textClasses[s.color] || textClasses.pink}`}
            />
            <span className="text-xs text-pink-400/60 tracking-widest">
              {s.label}
            </span>
          </div>
          <p className="text-2xl font-bold text-white">
            {typeof s.value === "number" ? `${s.value}%` : s.value}
          </p>
          {typeof s.value === "number" && (
            <div className="mt-2 h-1.5 bg-zinc-700 rounded overflow-hidden">
              <div
                className={`h-full ${
                  gradientClasses[s.color] || gradientClasses.pink
                }`}
                style={{ width: `${s.value}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
