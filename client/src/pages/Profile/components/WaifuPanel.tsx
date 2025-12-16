import { Icon } from "@iconify/react";
import { useProfileAnimationRefs } from "../contexts/ProfileAnimationsContext";

interface WaifuPanelProps {
  name: string;
  yandereLevel: "none" | "low" | "medium" | "high";
}

export function WaifuPanel({ name, yandereLevel }: WaifuPanelProps) {
  const { waifuRef } = useProfileAnimationRefs();

  const levelConfig = {
    none: { label: "NONE", color: "zinc", icon: "pixelarticons:mood-happy" },
    low: { label: "LOW", color: "cyan", icon: "pixelarticons:mood-neutral" },
    medium: { label: "MED", color: "pink", icon: "pixelarticons:mood-sad" },
    high: { label: "HIGH", color: "fuchsia", icon: "pixelarticons:alert" },
  };

  return (
    <div
      ref={waifuRef}
      className="flex-1 bg-zinc-900/80 border-2 border-pink-500/50 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)] relative"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-size-[20px_20px]" />
      <div className="relative h-full flex flex-col">
        <h3 className="text-xl font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-3 border-b border-pink-500/30 pb-3">
          <Icon icon="pixelarticons:mood-happy" className="w-6 h-6" />
          WAIFU_PROFILE
        </h3>
        <div className="flex-1 flex flex-col gap-3">
          <div className="p-3 bg-zinc-800/50 border border-pink-500/30">
            <p className="text-xs text-pink-400/60 tracking-widest mb-1">
              DESIGNATION
            </p>
            <p className="text-lg font-bold text-cyan-400">{name}</p>
          </div>
          <div className="p-3 bg-zinc-800/50 border border-pink-500/30">
            <p className="text-xs text-pink-400/60 tracking-widest mb-2">
              YANDERE_LEVEL
            </p>
            <div className="grid grid-cols-4 gap-2">
              {(["none", "low", "medium", "high"] as const).map((level) => {
                const isActive = yandereLevel === level;
                const config = levelConfig[level];
                return (
                  <div
                    key={level}
                    className={`p-3 border-2 text-center ${
                      isActive
                        ? `bg-${config.color}-500/20 border-${config.color}-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]`
                        : "bg-zinc-800/50 border-zinc-600/50"
                    }`}
                  >
                    <Icon
                      icon={config.icon}
                      className={`w-6 h-6 mx-auto mb-1 ${
                        isActive ? `text-${config.color}-400` : "text-zinc-500"
                      }`}
                    />
                    <p
                      className={`text-xs font-bold tracking-wider ${
                        isActive ? `text-${config.color}-400` : "text-zinc-500"
                      }`}
                    >
                      {config.label}
                    </p>
                  </div>
                );
              })}
            </div>
            <p className="text-[10px] text-pink-400/40 mt-2 text-center tracking-wider">
              WARNING: HIGH LEVELS MAY CAUSE POSSESSIVE BEHAVIOR
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
