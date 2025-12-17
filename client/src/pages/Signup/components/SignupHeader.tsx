import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface SignupHeaderProps {
  logoRef: RefObject<HTMLHeadingElement | null>;
  cursorRef: RefObject<HTMLSpanElement | null>;
}

export function SignupHeader({ logoRef, cursorRef }: SignupHeaderProps) {
  return (
    <div className="text-center mb-8">
      <h1
        ref={logoRef}
        style={{ opacity: 0 }}
        className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-400 tracking-widest uppercase mb-2 flex items-center justify-center gap-2"
      >
        <Icon
          icon="pixelarticons:user-plus"
          className="w-8 h-8 text-cyan-400"
        />
        Lucy <span className="text-cyan-500">Fit</span>
        <span
          ref={cursorRef}
          className="text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
        >
          _
        </span>
        <Icon icon="pixelarticons:zap" className="w-8 h-8 text-cyan-400" />
      </h1>
      <p className="text-cyan-300/60 text-sm tracking-[0.3em] flex items-center justify-center gap-2">
        <Icon icon="pixelarticons:code" className="w-4 h-4" /> IDENTITY_CREATION
        v2.0 <Icon icon="pixelarticons:code" className="w-4 h-4" />
      </p>
    </div>
  );
}
