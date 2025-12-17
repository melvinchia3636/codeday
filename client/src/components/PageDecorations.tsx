import { usePageDecorationsRefs } from "../contexts/PageDecorationsContext";
import { usePageDecorationsAnimations } from "../hooks/usePageDecorationsAnimations";

/**
 * Reusable page decorations component with animated grid, orbs, corners, and scanline effects.
 * Uses PageDecorationsContext for refs and color theme.
 * Must be used within a PageDecorationsProvider.
 */
export function PageDecorations() {
  const {
    particlesRef,
    gridRef,
    scanlineRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    color,
  } = usePageDecorationsRefs();

  usePageDecorationsAnimations();

  const isPink = color === "pink";

  const gridColor = isPink ? "rgba(236,72,153,0.2)" : "rgba(34,211,238,0.2)";

  const topGradient = isPink
    ? "from-pink-500 via-fuchsia-500 to-cyan-500"
    : "from-cyan-500 via-pink-500 to-cyan-500";
  const bottomGradient = isPink
    ? "from-cyan-500 via-fuchsia-500 to-pink-500"
    : "from-pink-500 via-cyan-500 to-pink-500";

  const scanlineColor = isPink ? "via-cyan-500/30" : "via-pink-500/30";

  const cornerBorder = isPink ? "border-pink-500" : "border-cyan-500";

  const getOrbClass = (i: number) => {
    if (isPink) {
      if (i % 3 === 0) return "w-64 h-64 bg-pink-500/20";
      if (i % 3 === 1) return "w-48 h-48 bg-cyan-500/20";
      return "w-56 h-56 bg-fuchsia-500/20";
    }
    return i % 2 === 0
      ? "w-64 h-64 bg-cyan-500/20"
      : "w-48 h-48 bg-pink-500/20";
  };

  return (
    <>
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />
      <div
        ref={gridRef}
        className={`absolute inset-0 bg-[linear-gradient(${gridColor}_1px,transparent_1px),linear-gradient(90deg,${gridColor}_1px,transparent_1px)] bg-size-[40px_40px] z-0`}
        style={{ opacity: 0 }}
      />
      <div
        ref={scanlineRef}
        className={`absolute left-0 right-0 h-1 bg-linear-to-b from-transparent ${scanlineColor} to-transparent pointer-events-none z-50`}
      />
      <div
        ref={topLineRef}
        className={`absolute top-0 left-0 w-full h-1.5 bg-linear-to-r ${topGradient} z-10 origin-left`}
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={bottomLineRef}
        className={`absolute bottom-0 left-0 w-full h-1.5 bg-linear-to-r ${bottomGradient} z-10 origin-right`}
        style={{ transform: "scaleX(0)" }}
      />

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full blur-3xl pointer-events-none z-0 ${getOrbClass(
            i
          )}`}
          style={{ left: `${(i * 22) % 100}%`, top: `${(i * 28 + 10) % 100}%` }}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cornersRef.current[i] = el;
          }}
          className={`absolute ${i < 2 ? "top-4" : "bottom-4"} ${
            i % 2 === 0 ? "left-4" : "right-4"
          } w-8 h-8 border-${i % 2 === 0 ? "l" : "r"}-4 border-${
            i < 2 ? "t" : "b"
          }-4 ${cornerBorder} z-20`}
          style={{ opacity: 0 }}
        />
      ))}
    </>
  );
}
