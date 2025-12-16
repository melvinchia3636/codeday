import { Icon } from "@iconify/react";
import { useProfileAnimationRefs } from "../contexts/ProfileAnimationsContext";

export function PageDecorations() {
  const {
    particlesRef,
    gridRef,
    scanlineRef,
    glitchOverlayRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    sideBarsRef,
  } = useProfileAnimationRefs();

  return (
    <>
      {/* Particle field */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Animated grid */}
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.1)_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none"
        style={{ opacity: 0 }}
      />

      {/* Scanline */}
      <div
        ref={scanlineRef}
        className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none"
      />

      {/* Glitch overlay */}
      <div
        ref={glitchOverlayRef}
        className="absolute inset-0 bg-transparent pointer-events-none mix-blend-exclusion"
        style={{ opacity: 0 }}
      />

      {/* Top line */}
      <div
        ref={topLineRef}
        className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-500"
        style={{ transformOrigin: "center", transform: "scaleX(0)" }}
      />

      {/* Bottom line */}
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-cyan-500 via-fuchsia-500 to-pink-500"
        style={{ transformOrigin: "center", transform: "scaleX(0)" }}
      />

      {/* Floating orbs */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full pointer-events-none ${
            i % 2 === 0 ? "bg-pink-500/20" : "bg-cyan-500/20"
          }`}
          style={{
            width: `${30 + i * 20}px`,
            height: `${30 + i * 20}px`,
            left: `${10 + i * 12}%`,
            top: `${15 + (i % 3) * 30}%`,
            filter: "blur(1px)",
            opacity: 0.3,
          }}
        />
      ))}

      {/* Corner decorations */}
      {[
        "top-4 left-4",
        "top-4 right-4",
        "bottom-4 left-4",
        "bottom-4 right-4",
      ].map((pos, i) => (
        <div
          key={`corner-${pos}`}
          ref={(el) => {
            if (el) cornersRef.current[i] = el;
          }}
          className={`absolute ${pos} w-8 h-8 pointer-events-none`}
          style={{ opacity: 0 }}
        >
          <div
            className={`absolute inset-0 ${
              i < 2
                ? "border-t-2 border-pink-500"
                : "border-b-2 border-pink-500"
            } ${
              i % 2 === 0
                ? "border-l-2 border-pink-500"
                : "border-r-2 border-pink-500"
            }`}
          >
            <Icon
              icon="pixelarticons:corner-down-left"
              className={`w-4 h-4 text-pink-500 absolute ${
                i === 0
                  ? "top-0 left-0"
                  : i === 1
                  ? "top-0 right-0 rotate-90"
                  : i === 2
                  ? "bottom-0 left-0 -rotate-90"
                  : "bottom-0 right-0 rotate-180"
              }`}
            />
          </div>
        </div>
      ))}

      {/* Side data bars */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`bar-${i}`}
          ref={(el) => {
            if (el) sideBarsRef.current[i] = el;
          }}
          className="absolute w-1 bg-linear-to-b from-pink-500 via-fuchsia-500 to-transparent pointer-events-none"
          style={{
            height: `${60 + i * 20}px`,
            left: i * 6 + 2 + "px",
            top: "50%",
            transform: "translateY(-50%) scaleY(0)",
            opacity: 0,
          }}
        />
      ))}
    </>
  );
}
