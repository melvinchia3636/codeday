import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";
import { useHydrationAnimationRefs } from "../contexts/HydrationAnimationsContext";
import { useHydration } from "../../../contexts/HydrationContext";

export function WaterTank() {
  const { tankRef, bubblesRef } = useHydrationAnimationRefs();
  const { percentage } = useHydration();

  const waterLevelRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLParagraphElement>(null);
  const hasInitialized = useRef(false);
  const [displayedPercentage, setDisplayedPercentage] = useState(0);

  // Check if we're in overflow mode (above 100%)
  const isOverflow = percentage > 100;
  // Cap visual height at 100% but allow percentage text to show actual value
  const visualPercentage = Math.min(percentage, 100);

  // Animate water level when percentage changes
  useEffect(() => {
    if (!waterLevelRef.current) return;

    // Always animate from 0 on first render, then from current to new
    const fromValue = hasInitialized.current
      ? waterLevelRef.current.style.height || "0%"
      : "0%";

    animate(waterLevelRef.current, {
      height: [fromValue, `${visualPercentage}%`],
      duration: hasInitialized.current ? 800 : 1500,
      delay: hasInitialized.current ? 0 : 500,
      ease: "outElastic(1, .6)",
    });

    hasInitialized.current = true;
  }, [visualPercentage]);

  // Animate the percentage number
  useEffect(() => {
    const targetValue = Math.round(percentage);
    const startValue = displayedPercentage;

    if (startValue === targetValue) return;

    // Animate the number counting up/down
    const duration = hasInitialized.current ? 600 : 1200;
    const delay = hasInitialized.current ? 0 : 500;

    const obj = { value: startValue };
    animate(obj, {
      value: targetValue,
      duration,
      delay,
      ease: "outExpo",
      onUpdate: () => {
        setDisplayedPercentage(Math.round(obj.value));
      },
    });

    // Pop animation on the text
    if (percentageRef.current && hasInitialized.current) {
      animate(percentageRef.current, {
        scale: [1, 1.15, 1],
        duration: 400,
        ease: "outElastic(1, .5)",
      });
    }
  }, [percentage]);

  return (
    <div
      ref={tankRef}
      className="relative w-48 h-72 border-4 border-cyan-500 bg-zinc-900/80 rounded-b-3xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.3)]"
      style={{ opacity: 0 }}
    >
      <div
        ref={bubblesRef}
        className="absolute inset-0 pointer-events-none z-10"
      />
      <div
        ref={waterLevelRef}
        className={`water-level absolute bottom-0 left-0 right-0 transition-colors duration-500 ${
          isOverflow
            ? "bg-linear-to-t from-orange-500 via-orange-400/80 to-orange-300/60"
            : "bg-linear-to-t from-cyan-500 via-cyan-400/80 to-cyan-300/60"
        }`}
        style={{ height: "0%" }}
      >
        <div
          className={`absolute top-0 left-0 right-0 h-2 animate-[wave_2s_ease-in-out_infinite] ${
            isOverflow ? "bg-orange-200/50" : "bg-cyan-200/50"
          }`}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="text-center">
          <p
            ref={percentageRef}
            className={`text-4xl font-bold text-white ${
              isOverflow
                ? "drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]"
                : "drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]"
            }`}
          >
            {displayedPercentage}%
          </p>
          <p
            className={`text-xs tracking-widest mt-1 ${
              isOverflow ? "text-orange-400/80" : "text-cyan-400/80"
            }`}
          >
            {isOverflow ? "OVERFLOW!" : "HYDRATED"}
          </p>
        </div>
      </div>
      {[25, 50, 75].map((level) => (
        <div
          key={level}
          className="absolute left-0 right-0 border-t border-cyan-500/30 flex items-center"
          style={{ bottom: `${level}%` }}
        >
          <span className="text-[10px] text-cyan-400/50 ml-1">{level}%</span>
        </div>
      ))}
    </div>
  );
}
