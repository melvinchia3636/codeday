import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface ProfileAvatarProps {
  avatarRef: RefObject<HTMLDivElement | null>;
  name: string;
  email: string;
}

export function ProfileAvatar({ avatarRef, name, email }: ProfileAvatarProps) {
  return (
    <div
      ref={avatarRef}
      className="bg-zinc-900/80 border-2 border-pink-500/50 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)] relative"
      style={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.1)_1px,transparent_1px)] bg-[size:15px_15px]" />
      <div className="relative flex flex-col items-center">
        <div className="w-36 h-36 rounded-full border-4 border-pink-500 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.5)]">
          <Icon
            icon="pixelarticons:avatar"
            className="w-24 h-24 text-pink-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent" />
        </div>
        <h2 className="mt-4 text-2xl font-bold text-pink-400 tracking-widest">
          {name}
        </h2>
        <p className="text-cyan-400/70 text-sm tracking-wider">{email}</p>
        <div className="mt-4 flex gap-2">
          <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/40 text-pink-400 text-xs tracking-wider">
            LVL 42
          </span>
          <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs tracking-wider">
            ELITE
          </span>
        </div>
      </div>
    </div>
  );
}
