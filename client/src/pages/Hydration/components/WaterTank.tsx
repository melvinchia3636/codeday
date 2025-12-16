import type { RefObject } from "react";

interface WaterTankProps {
  tankRef: RefObject<HTMLDivElement | null>;
  bubblesRef: RefObject<HTMLDivElement | null>;
  percentage: number;
}

export function WaterTank({ tankRef, bubblesRef, percentage }: WaterTankProps) {
  return (
    <div
      ref={tankRef}
      className="relative w-48 h-72 border-4 border-cyan-500 bg-zinc-900/80 rounded-b-3xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.3)]"
      style={{ opacity: 0 }}
    >
      <div
        ref={bubblesRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      <div
        className="water-level absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 via-cyan-400/80 to-cyan-300/60"
        style={{ height: "0%" }}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-cyan-200/50 animate-[wave_2s_ease-in-out_infinite]" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center">
          <p className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
            {Math.round(percentage)}%
          </p>
          <p className="text-xs text-cyan-400/80 tracking-widest mt-1">
            HYDRATED
          </p>
        </div>
      </div>
      {[25, 50, 75].map((level) => (
        <div
          key={level}
          className="absolute left-0 right-0 border-t border-cyan-500/30 flex items-center"
          style={{ bottom: `${level}%` }}
        >
          <span className="text-[10px] text-cyan-400/50 ml-1">{level}%</span>
        </div>
      ))}
    </div>
  );
}
