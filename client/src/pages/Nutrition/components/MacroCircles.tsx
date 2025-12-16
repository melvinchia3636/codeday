import type { RefObject } from "react";

interface Macro {
  label: string;
  current: number;
  target: number;
  color: string;
  unit: string;
}

interface MacroCirclesProps {
  macrosRef: RefObject<HTMLDivElement | null>;
  macros: Macro[];
  totalCalories: number;
  targetCalories: number;
}

export function MacroCircles({
  macrosRef,
  macros,
  totalCalories,
  targetCalories,
}: MacroCirclesProps) {
  return (
    <div
      ref={macrosRef}
      className="relative z-10 flex justify-center gap-8 mb-6"
    >
      {macros.map((m, i) => (
        <div
          key={i}
          className={`macro-circle flex flex-col items-center p-4 bg-zinc-900/80 border-2 border-${m.color}-500/50 backdrop-blur-sm`}
          style={{ opacity: 0 }}
        >
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                className="text-zinc-700"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                className={`text-${m.color}-500`}
                strokeWidth="3"
                strokeDasharray={`${(m.current / m.target) * 94} 94`}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {Math.round((m.current / m.target) * 100)}%
              </span>
            </div>
          </div>
          <p className="text-xs text-pink-400/70 tracking-widest mt-2">
            {m.label}
          </p>
          <p className="text-sm text-white font-bold">
            {m.current}/{m.target}
            {m.unit}
          </p>
        </div>
      ))}
      <div
        className="macro-circle flex flex-col items-center p-4 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border-2 border-pink-500/50 backdrop-blur-sm"
        style={{ opacity: 0 }}
      >
        <div className="relative w-20 h-20">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="currentColor"
              className="text-zinc-700"
              strokeWidth="3"
            />
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              stroke="url(#cal-gradient)"
              strokeWidth="3"
              strokeDasharray={`${(totalCalories / targetCalories) * 94} 94`}
              strokeLinecap="round"
            />
            <defs>
              <linearGradient id="cal-gradient">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="100%" stopColor="#22d3ee" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold text-white">
              {Math.round((totalCalories / targetCalories) * 100)}%
            </span>
          </div>
        </div>
        <p className="text-xs text-pink-400/70 tracking-widest mt-2">
          CALORIES
        </p>
        <p className="text-sm text-white font-bold">
          {totalCalories}/{targetCalories}
        </p>
      </div>
    </div>
  );
}
