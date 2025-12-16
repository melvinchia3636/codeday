import { Icon } from "@iconify/react";

export default function SystemStatus() {
  return (
    <div className="relative z-10 w-48 flex justify-end">
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-l from-cyan-500/30 via-fuchsia-500/20 to-pink-500/30 blur-md opacity-60" />
        <div className="relative flex items-center gap-3 px-4 py-3 bg-zinc-900/90 border-2 border-cyan-500/40">
          <div className="flex flex-col items-end">
            <span className="text-sm text-cyan-400 tracking-widest font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
              {new Date()
                .toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: false,
                })
                .toUpperCase()}
            </span>
            <span className="text-[8px] text-cyan-400/60 tracking-[0.2em]">
              {new Date()
                .toLocaleDateString("en-US", { weekday: "short" })
                .toUpperCase()}
            </span>
          </div>
          <div className="relative">
            <div className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm animate-pulse" />
            <Icon
              icon="pixelarticons:clock"
              className="relative w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
