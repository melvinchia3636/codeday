import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface TargetsPanelProps {
  targetsRef: RefObject<HTMLDivElement | null>;
  currentWeight: number;
  targetWeight: number;
  targetType: "lose" | "gain" | "maintain";
}

export function TargetsPanel({
  targetsRef,
  currentWeight,
  targetWeight,
  targetType,
}: TargetsPanelProps) {
  const targetLabels = {
    lose: "REDUCE",
    gain: "INCREASE",
    maintain: "MAINTAIN",
  };

  return (
    <div
      ref={targetsRef}
      className="bg-zinc-900/80 border-2 border-pink-500/50 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)] relative"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
      <div className="relative">
        <h3 className="text-xl font-bold text-pink-400 tracking-[0.2em] mb-6 flex items-center gap-3 border-b border-pink-500/30 pb-3">
          <Icon icon="pixelarticons:target" className="w-6 h-6" />
          WEIGHT_TARGETS
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-zinc-800/50 border border-pink-500/30">
            <span className="text-sm text-pink-400/70 tracking-wider">
              CURRENT
            </span>
            <span className="text-2xl font-bold text-white">
              {currentWeight} <span className="text-sm text-pink-400">KG</span>
            </span>
          </div>
          <div className="flex items-center justify-center">
            <Icon
              icon="pixelarticons:arrow-down"
              className={`w-8 h-8 ${
                targetType === "lose"
                  ? "text-cyan-400"
                  : targetType === "gain"
                  ? "text-pink-400 rotate-180"
                  : "text-fuchsia-400"
              }`}
            />
          </div>
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-cyan-500/50">
            <span className="text-sm text-cyan-400/70 tracking-wider">
              TARGET
            </span>
            <span className="text-2xl font-bold text-cyan-400">
              {targetWeight} <span className="text-sm">KG</span>
            </span>
          </div>
          <div className="flex justify-center">
            <span
              className={`px-4 py-2 text-sm font-bold tracking-wider ${
                targetType === "lose"
                  ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                  : targetType === "gain"
                  ? "bg-pink-500/20 text-pink-400 border border-pink-500/50"
                  : "bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50"
              }`}
            >
              MODE: {targetLabels[targetType]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
