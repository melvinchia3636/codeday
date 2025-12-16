import { Icon } from "@iconify/react";

export default function LogoutButton({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="relative z-10 w-48">
      <div className="relative group">
        <div className="absolute -inset-1 bg-linear-to-r from-pink-500/30 via-fuchsia-500/20 to-cyan-500/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
        <div
          className="absolute -inset-0.5 border border-pink-500/50 animate-pulse"
          style={{ animationDuration: "2s" }}
        />
        <button
          onClick={onLogout}
          className="relative w-full flex items-center gap-3 px-4 py-3 bg-zinc-900/90 border-2 border-pink-500/40 group-hover:border-cyan-400 transition-all"
        >
          <div className="relative">
            <div className="absolute -inset-1 bg-pink-500/20 rounded-full blur-sm animate-pulse" />
            <Icon
              icon="pixelarticons:logout"
              className="relative w-5 h-5 text-pink-400 group-hover:text-cyan-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] transition-colors"
            />
          </div>
          <div className="flex flex-col items-start">
            <span className="text-sm text-pink-400 group-hover:text-cyan-400 tracking-widest font-bold drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] transition-colors">
              LOGOUT
            </span>
            <span className="text-[8px] text-pink-400/60 tracking-[0.2em]">
              END_SESSION
            </span>
          </div>
          <div className="ml-auto flex gap-0.5">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 bg-pink-500/60 group-hover:bg-cyan-500/60 animate-pulse transition-colors"
                style={{
                  height: `${12 - i * 3}px`,
                  animationDelay: `${i * 0.2}s`,
                }}
              />
            ))}
          </div>
        </button>
      </div>
    </div>
  );
}
