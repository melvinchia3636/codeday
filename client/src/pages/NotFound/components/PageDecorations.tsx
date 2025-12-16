import type { RefObject } from "react";

interface PageDecorationsProps {
  noiseCanvasRef: RefObject<HTMLCanvasElement | null>;
  particlesRef: RefObject<HTMLDivElement | null>;
  dataStreamsRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  pulseRingsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  sideBarsLeftRef: RefObject<HTMLDivElement[]>;
  sideBarsRightRef: RefObject<HTMLDivElement[]>;
}

export function PageDecorations({
  noiseCanvasRef,
  particlesRef,
  dataStreamsRef,
  scanlineRef,
  glitchOverlayRef,
  topLineRef,
  bottomLineRef,
  orbsRef,
  pulseRingsRef,
  cornersRef,
  sideBarsLeftRef,
  sideBarsRightRef,
}: PageDecorationsProps) {
  return (
    <>
      <canvas
        ref={noiseCanvasRef}
        className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay"
      />

      {[...Array(5)].map((_, i) => (
        <div
          key={`glitch-line-${i}`}
          className="glitch-line absolute left-0 w-full bg-white/20 pointer-events-none z-45"
          style={{ top: `${20 * i}%`, height: "2px", opacity: 0 }}
        />
      ))}

      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />
      <div
        ref={dataStreamsRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.3)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />

      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-2 bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent pointer-events-none z-50"
      />

      {[...Array(3)].map((_, i) => (
        <div
          key={`scan-${i}`}
          className="absolute left-0 right-0 h-px bg-white/10 pointer-events-none z-45 animate-[scan_1s_linear_infinite]"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}

      <div
        ref={glitchOverlayRef}
        className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-transparent to-cyan-500/30 pointer-events-none z-40 mix-blend-overlay"
        style={{ opacity: 0 }}
      />

      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-30" />

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

      {[...Array(7)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full blur-3xl pointer-events-none z-0 ${
            i % 4 === 0
              ? "w-72 h-72 bg-pink-500/25"
              : i % 4 === 1
              ? "w-56 h-56 bg-cyan-500/20"
              : i % 4 === 2
              ? "w-64 h-64 bg-fuchsia-500/20"
              : "w-48 h-48 bg-purple-500/20"
          }`}
          style={{ left: `${(i * 18) % 100}%`, top: `${(i * 22 + 5) % 100}%` }}
        />
      ))}

      {[...Array(4)].map((_, i) => (
        <div
          key={`pulse-${i}`}
          ref={(el) => {
            if (el) pulseRingsRef.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pink-500/40 pointer-events-none z-0"
          style={{
            width: `${150 + i * 80}px`,
            height: `${150 + i * 80}px`,
            opacity: 0,
          }}
        />
      ))}

      <div
        ref={(el) => {
          if (el) cornersRef.current[0] = el;
        }}
        className="absolute top-6 left-6 w-12 h-12 border-l-4 border-t-4 border-pink-500 z-20 shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[1] = el;
        }}
        className="absolute top-6 right-6 w-12 h-12 border-r-4 border-t-4 border-pink-500 z-20 shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[2] = el;
        }}
        className="absolute bottom-6 left-6 w-12 h-12 border-l-4 border-b-4 border-pink-500 z-20 shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[3] = el;
        }}
        className="absolute bottom-6 right-6 w-12 h-12 border-r-4 border-b-4 border-pink-500 z-20 shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />

      <div className="absolute top-1/2 left-6 -translate-y-1/2 space-y-2 z-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={`left-${i}`}
            ref={(el) => {
              if (el) sideBarsLeftRef.current[i] = el;
            }}
            className={`w-1.5 ${
              i % 2 === 0 ? "h-6 bg-pink-500/70" : "h-4 bg-pink-500/40"
            } shadow-[0_0_10px_currentColor]`}
            style={{ opacity: 0 }}
          />
        ))}
      </div>

      <div className="absolute top-1/2 right-6 -translate-y-1/2 space-y-2 z-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={`right-${i}`}
            ref={(el) => {
              if (el) sideBarsRightRef.current[i] = el;
            }}
            className={`w-1.5 ${
              i % 2 === 0 ? "h-6 bg-pink-500/70" : "h-4 bg-pink-500/40"
            } shadow-[0_0_10px_currentColor]`}
            style={{ opacity: 0 }}
          />
        ))}
      </div>
    </>
  );
}
