import type { RefObject } from "react";

interface PageDecorationsProps {
  particlesRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  sideBarsLeftRef: RefObject<HTMLDivElement[]>;
  sideBarsRightRef: RefObject<HTMLDivElement[]>;
}

export function PageDecorations({
  particlesRef,
  topLineRef,
  bottomLineRef,
  orbsRef,
  cornersRef,
  sideBarsLeftRef,
  sideBarsRightRef,
}: PageDecorationsProps) {
  return (
    <>
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <div
        ref={topLineRef}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500 origin-left"
      />
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 origin-right"
      />

      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full blur-3xl ${
            i % 3 === 0
              ? "w-64 h-64 bg-pink-500/20"
              : i % 3 === 1
              ? "w-48 h-48 bg-fuchsia-500/20"
              : "w-32 h-32 bg-cyan-500/15"
          }`}
          style={{ left: `${(i * 20) % 100}%`, top: `${(i * 25 + 10) % 100}%` }}
        />
      ))}

      {[...Array(4)].map((_, i) => (
        <div
          key={`corner-${i}`}
          ref={(el) => {
            if (el) cornersRef.current[i] = el;
          }}
          className={`absolute w-6 h-6 border-pink-500 ${
            i === 0
              ? "top-4 left-4 border-l-2 border-t-2"
              : i === 1
              ? "top-4 right-4 border-r-2 border-t-2"
              : i === 2
              ? "bottom-4 left-4 border-l-2 border-b-2"
              : "bottom-4 right-4 border-r-2 border-b-2"
          }`}
          style={{ opacity: 0 }}
        />
      ))}

      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) sideBarsLeftRef.current[i] = el;
            }}
            className="flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            <div
              className={`w-8 h-1 ${
                i % 2 === 0 ? "bg-pink-500/40" : "bg-pink-500/20"
              }`}
            />
            <div className="w-1 h-1 bg-pink-500/60" />
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) sideBarsRightRef.current[i] = el;
            }}
            className="flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            <div className="w-1 h-1 bg-pink-500/60" />
            <div
              className={`w-8 h-1 ${
                i % 2 === 0 ? "bg-pink-500/40" : "bg-pink-500/20"
              }`}
            />
          </div>
        ))}
      </div>
    </>
  );
}
