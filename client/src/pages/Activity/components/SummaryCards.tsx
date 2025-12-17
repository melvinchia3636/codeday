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

export function SummaryCards({
  summaryRef,
  today,
  emotionIcons,
  emotionColors,
}: SummaryCardsProps) {
  // Calculate how "red" the diet bar should be based on overconsumption
  // 100% = normal, 200% = full red
  const getDietBarGradient = (value: number) => {
    if (value <= 100) {
      return "from-pink-500 to-fuchsia-500";
    }
    // Interpolate from pink/fuchsia to orange/red based on excess
    const excess = Math.min(100, value - 100); // cap at 200% total
    const redPercent = excess; // 0-100 maps to 100%-200%

    if (redPercent < 30) {
      return "from-orange-400 to-pink-500";
    } else if (redPercent < 60) {
      return "from-orange-500 to-red-400";
    } else {
      return "from-red-500 to-red-600";
    }
  };

  const cards = [
    {
      label: "DIET_SCORE",
      value: today.diet,
      icon: "pixelarticons:coin",
      color: today.diet > 100 ? "red" : "pink",
      barGradient: getDietBarGradient(today.diet),
    },
    {
      label: "HYDRO_SCORE",
      value: today.hydro,
      icon: "pixelarticons:drop",
      color: "cyan",
      barGradient: "from-cyan-500 to-pink-500",
    },
    {
      label: "EFFORT_SCORE",
      value: today.effort,
      icon: "pixelarticons:zap",
      color: "fuchsia",
      barGradient: "from-fuchsia-500 to-cyan-500",
    },
    {
      label: "TOTAL_SCORE",
      value: today.total,
      icon: "pixelarticons:chart-bar",
      color: "pink",
      barGradient: "from-pink-500 to-fuchsia-500",
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
          className={`summary-card bg-zinc-900/80 border border-${s.color}-500/40 p-4 backdrop-blur-sm hover:border-${s.color}-400/60 transition-all`}
          style={{ opacity: 0 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Icon icon={s.icon} className={`w-5 h-5 text-${s.color}-500`} />
            <span className="text-xs text-pink-400/60 tracking-widest">
              {s.label}
            </span>
          </div>
          <p
            className={`text-2xl font-bold ${
              typeof s.value === "number" && s.value > 100
                ? "text-red-400"
                : "text-white"
            }`}
          >
            {typeof s.value === "number" ? `${s.value}%` : s.value}
          </p>
          {typeof s.value === "number" && s.barGradient && (
            <div className="mt-2 h-1.5 bg-zinc-700 rounded overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${s.barGradient}`}
                style={{ width: `${Math.min(100, s.value)}%` }}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
