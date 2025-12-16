import type { RefObject } from "react";

interface PageDecorationsProps {
  particlesRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  sideBarsRef: RefObject<HTMLDivElement[]>;
}

export function PageDecorations({
  particlesRef,
  gridRef,
  scanlineRef,
  glitchOverlayRef,
  topLineRef,
  bottomLineRef,
  orbsRef,
  cornersRef,
  sideBarsRef,
}: PageDecorationsProps) {
  return (
    <>
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.2)_1px,transparent_1px)] bg-[size:40px_40px] z-0"
        style={{ opacity: 0 }}
      />
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent pointer-events-none z-50"
      />
      <div
        ref={glitchOverlayRef}
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-transparent to-cyan-500/20 pointer-events-none z-40 mix-blend-overlay"
        style={{ opacity: 0 }}
      />

      <div
        ref={topLineRef}
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500 z-10 origin-left shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 z-10 origin-right shadow-[0_0_20px_rgba(34,211,238,0.8)]"
        style={{ transform: "scaleX(0)" }}
      />

      {[...Array(6)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full blur-3xl pointer-events-none z-0 ${
            i % 3 === 0
              ? "w-64 h-64 bg-pink-500/20"
              : i % 3 === 1
              ? "w-48 h-48 bg-cyan-500/20"
              : "w-56 h-56 bg-fuchsia-500/20"
          }`}
          style={{ left: `${(i * 20) % 100}%`, top: `${(i * 25 + 10) % 100}%` }}
        />
      ))}

      <div
        ref={(el) => {
          if (el) cornersRef.current[0] = el;
        }}
        className="absolute top-4 left-4 w-10 h-10 border-l-4 border-t-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[1] = el;
        }}
        className="absolute top-4 right-4 w-10 h-10 border-r-4 border-t-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[2] = el;
        }}
        className="absolute bottom-4 left-4 w-10 h-10 border-l-4 border-b-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[3] = el;
        }}
        className="absolute bottom-4 right-4 w-10 h-10 border-r-4 border-b-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />

      <div className="absolute top-1/2 left-4 -translate-y-1/2 space-y-2 z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`bar-${i}`}
            ref={(el) => {
              if (el) sideBarsRef.current[i] = el;
            }}
            className={`w-1.5 ${
              i % 2 === 0 ? "h-5 bg-pink-500/70" : "h-3 bg-cyan-500/50"
            } shadow-[0_0_10px_currentColor]`}
            style={{ opacity: 0 }}
          />
        ))}
      </div>
    </>
  );
}
