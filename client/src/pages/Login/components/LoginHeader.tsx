import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface LoginHeaderProps {
  logoRef: RefObject<HTMLHeadingElement | null>;
  cursorRef: RefObject<HTMLSpanElement | null>;
}

export function LoginHeader({ logoRef, cursorRef }: LoginHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1
        ref={logoRef}
        style={{ opacity: 0 }}
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 tracking-widest uppercase mb-2 flex items-center justify-center gap-2"
      >
        <Icon
          icon="pixelarticons:human-run"
          className="w-8 h-8 text-pink-400"
        />
        Lucy <span className="text-pink-500">Fit</span>
        <span
          ref={cursorRef}
          className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        >
          _
        </span>
        <Icon icon="pixelarticons:zap" className="w-8 h-8 text-pink-400" />
      </h1>
      <p className="text-pink-300/60 text-sm tracking-[0.3em] flex items-center justify-center gap-2">
        <Icon icon="pixelarticons:code" className="w-4 h-4" /> SYSTEM_ACCESS
        v1.0 <Icon icon="pixelarticons:code" className="w-4 h-4" />
      </p>
    </div>
  );
}
