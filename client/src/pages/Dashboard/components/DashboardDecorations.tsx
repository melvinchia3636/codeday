import { type RefObject } from "react";

interface DashboardDecorationsProps {
  matrixRainRef: RefObject<HTMLDivElement | null>;
  cyberGridRef: RefObject<HTMLDivElement | null>;
  hexGridRef: RefObject<HTMLDivElement | null>;
  particlesRef: RefObject<HTMLDivElement | null>;
  dataStreamRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
  energyFieldRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  hologramRingsRef: RefObject<HTMLDivElement[]>;
  pulseRingsRef: RefObject<HTMLDivElement[]>;
  neonLinesRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  sideBarsTopRef: RefObject<HTMLDivElement[]>;
  sideBarsBottomRef: RefObject<HTMLDivElement[]>;
}

export function DashboardDecorations({
  matrixRainRef,
  cyberGridRef,
  hexGridRef,
  particlesRef,
  dataStreamRef,
  scanlineRef,
  glitchOverlayRef,
  energyFieldRef,
  orbsRef,
  hologramRingsRef,
  pulseRingsRef,
  neonLinesRef,
  cornersRef,
  sideBarsTopRef,
  sideBarsBottomRef,
}: DashboardDecorationsProps) {
  return (
    <>
      {/* Matrix rain background */}
      <div
        ref={matrixRainRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />

      {/* Cyber grid */}
      <div
        ref={cyberGridRef}
        className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(236,72,153,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.2)_1px,transparent_1px)] bg-[size:40px_40px] z-0"
      />

      {/* Hex grid overlay */}
      <div
        ref={hexGridRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />

      {/* Floating particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />

      {/* Data streams */}
      <div
        ref={dataStreamRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />

      {/* Scanline effect */}
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent pointer-events-none z-50"
      />

      {/* Glitch overlay */}
      <div
        ref={glitchOverlayRef}
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-transparent to-cyan-500/20 pointer-events-none z-40 mix-blend-overlay"
        style={{ opacity: 0 }}
      />

      {/* Energy field */}
      <div
        ref={energyFieldRef}
        className="absolute inset-0 pointer-events-none z-0"
      />

      {/* Floating orbs */}
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
          style={{
            left: `${(i * 20) % 100}%`,
            top: `${(i * 25 + 10) % 100}%`,
          }}
        />
      ))}

      {/* Hologram rings */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`ring-${i}`}
          ref={(el) => {
            if (el) hologramRingsRef.current[i] = el;
          }}
          className={`absolute rounded-full border-2 pointer-events-none z-0 ${
            i % 3 === 0
              ? "border-pink-500/30"
              : i % 3 === 1
              ? "border-cyan-500/30"
              : "border-fuchsia-500/30"
          }`}
          style={{
            width: `${150 + i * 100}px`,
            height: `${150 + i * 100}px`,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 0,
          }}
        />
      ))}

      {/* Pulse rings */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`pulse-${i}`}
          ref={(el) => {
            if (el) pulseRingsRef.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/50 pointer-events-none z-0"
          style={{ width: "200px", height: "200px", opacity: 0 }}
        />
      ))}

      {/* Neon accent lines */}
      <div
        ref={(el) => {
          if (el) neonLinesRef.current[0] = el;
        }}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500 z-10 origin-left shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0, transform: "scaleX(0)" }}
      />
      <div
        ref={(el) => {
          if (el) neonLinesRef.current[1] = el;
        }}
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 z-10 origin-right shadow-[0_0_20px_rgba(34,211,238,0.8)]"
        style={{ opacity: 0, transform: "scaleX(0)" }}
      />
      <div
        ref={(el) => {
          if (el) neonLinesRef.current[2] = el;
        }}
        className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-pink-500 via-fuchsia-500 to-cyan-500 z-10 origin-top shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0, transform: "scaleY(0)" }}
      />
      <div
        ref={(el) => {
          if (el) neonLinesRef.current[3] = el;
        }}
        className="absolute top-0 right-0 w-1 h-full bg-gradient-to-b from-cyan-500 via-fuchsia-500 to-pink-500 z-10 origin-top shadow-[0_0_20px_rgba(34,211,238,0.8)]"
        style={{ opacity: 0, transform: "scaleY(0)" }}
      />

      {/* Corner brackets */}
      <div
        ref={(el) => {
          if (el) cornersRef.current[0] = el;
        }}
        className="absolute top-6 left-6 w-10 h-10 border-l-4 border-t-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[1] = el;
        }}
        className="absolute top-6 right-6 w-10 h-10 border-r-4 border-t-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[2] = el;
        }}
        className="absolute bottom-6 left-6 w-10 h-10 border-l-4 border-b-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[3] = el;
        }}
        className="absolute bottom-6 right-6 w-10 h-10 border-r-4 border-b-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />

      {/* Side bars - Top */}
      <div className="absolute left-12 top-8 flex gap-2 z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`top-bar-${i}`}
            ref={(el) => {
              if (el) sideBarsTopRef.current[i] = el;
            }}
            className={`h-2 ${
              i % 2 === 0 ? "w-6 bg-pink-500/60" : "w-4 bg-cyan-500/40"
            } shadow-[0_0_10px_currentColor]`}
            style={{ opacity: 0, transform: "scaleX(0)" }}
          />
        ))}
      </div>

      {/* Side bars - Bottom */}
      <div className="absolute right-12 bottom-8 flex gap-2 z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`bottom-bar-${i}`}
            ref={(el) => {
              if (el) sideBarsBottomRef.current[i] = el;
            }}
            className={`h-2 ${
              i % 2 === 0 ? "w-6 bg-cyan-500/60" : "w-4 bg-pink-500/40"
            } shadow-[0_0_10px_currentColor]`}
            style={{ opacity: 0, transform: "scaleX(0)" }}
          />
        ))}
      </div>
    </>
  );
}
