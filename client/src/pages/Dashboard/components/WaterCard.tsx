import { Icon } from "@iconify/react";
import { useEffect, useRef, useMemo } from "react";
import { animate, random } from "animejs";
import { Link } from "react-router";
import { useWaterSummaryQuery } from "../../../hooks/useHydrationQueries";
import { useUserProfile } from "../../../contexts/UserProfileContext";

export function WaterCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const barsContainerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const waveRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);
  const lastAmountRef = useRef<number>(0);

  const { settings } = useUserProfile();
  const targetMl = settings?.hydroTargetMl || 3000;
  const { data: summary } = useWaterSummaryQuery(targetMl);

  // Calculate hydration stats from summary
  const hydrationStats = useMemo(() => {
    const currentMl = summary?.totalMl || 0;
    const progress = summary?.percentage || 0;
    const liters = (currentMl / 1000).toFixed(1);
    const targetLiters = (targetMl / 1000).toFixed(1);

    // Calculate filled bars (8 bars total)
    const filledBars = Math.round((progress / 100) * 8);

    return { currentMl, targetMl, progress, liters, targetLiters, filledBars };
  }, [summary, targetMl]);

  useEffect(() => {
    // Animated value
    if (valueRef.current) {
      const startValue = lastAmountRef.current;
      const endValue = hydrationStats.currentMl;
      lastAmountRef.current = endValue;

      const counter = { value: startValue / 1000 };
      animate(counter, {
        value: [startValue / 1000, endValue / 1000],
        duration: 1200,
        delay: 300,
        ease: "outExpo",
        onUpdate: function () {
          if (valueRef.current) {
            valueRef.current.textContent = `${counter.value.toFixed(1)}L`;
          }
        },
      });

      // Glow pulse
      setTimeout(() => {
        if (valueRef.current) {
          animate(valueRef.current, {
            textShadow: [
              "0 0 0 transparent",
              "0 0 25px rgba(34,211,238,0.8)",
              "0 0 0 transparent",
            ],
            duration: 2000,
            ease: "inOutSine",
            loop: true,
          });
        }
      }, 1500);
    }

    // Water bars fill animation
    if (barsContainerRef.current) {
      const bars = barsContainerRef.current.querySelectorAll(".water-bar");
      bars.forEach((bar, i) => {
        const isFilled = i < hydrationStats.filledBars;
        animate(bar, {
          scaleY: isFilled ? [0, 1] : 1,
          opacity: isFilled ? [0, 1] : 1,
          duration: 500,
          delay: 400 + i * 80,
          ease: "outBack",
        });
      });
    }

    // Icon water drop animation
    if (iconRef.current) {
      animate(iconRef.current, {
        translateY: [0, -5, 0],
        scale: [1, 1.2, 1],
        duration: 1000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Floating orb
    if (orbRef.current) {
      animate(orbRef.current, {
        translateX: [0, random(-30, 30)],
        translateY: [0, random(-30, 30)],
        scale: [1, random(1.4, 1.8), 1],
        opacity: [0.1, 0.5, 0.1],
        duration: random(3500, 5500),
        ease: "inOutSine",
        loop: true,
      });
    }

    // Top line glow
    if (topLineRef.current) {
      animate(topLineRef.current, {
        opacity: [0.5, 1, 0.5],
        boxShadow: [
          "0 0 5px rgba(34,211,238,0.3)",
          "0 0 25px rgba(34,211,238,0.9)",
          "0 0 5px rgba(34,211,238,0.3)",
        ],
        duration: 2000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Corners
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: 500,
          delay: 300 + i * 100,
          ease: "outBack",
        });
      }
    });

    // Wave effect
    if (waveRef.current) {
      animate(waveRef.current, {
        translateX: ["-25%", "0%"],
        duration: 3000,
        ease: "linear",
        loop: true,
      });
    }

    // Container animation
    if (containerRef.current) {
      animate(containerRef.current, {
        borderColor: [
          "rgba(34,211,238,0.5)",
          "rgba(139,92,246,0.6)",
          "rgba(34,211,238,0.5)",
        ],
        duration: 4000,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, [hydrationStats]);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      animate(containerRef.current, {
        scale: 1.02,
        boxShadow: "0 0 30px rgba(139,92,246,0.5)",
        duration: 300,
        ease: "outQuad",
      });
    }
  };

  const handleMouseLeave = () => {
    if (containerRef.current) {
      animate(containerRef.current, {
        scale: 1,
        boxShadow: "0 0 0 transparent",
        duration: 300,
        ease: "outQuad",
      });
    }
  };

  return (
    <Link to="/hydration" className="block">
      <div
        ref={containerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="group bg-zinc-900/80 border-2 border-cyan-500/50 p-4 relative overflow-hidden transition-all duration-300 backdrop-blur-sm cursor-pointer"
      >
        {/* Particles */}
        <div
          ref={particlesRef}
          className="absolute inset-0 pointer-events-none"
        ></div>

        {/* Bubbles */}
        <div
          ref={bubblesRef}
          className="absolute inset-0 pointer-events-none"
        ></div>

        {/* Wave effect at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-8 overflow-hidden pointer-events-none opacity-20">
          <div
            ref={waveRef}
            className="absolute bottom-0 left-0 w-[200%] h-full"
            style={{
              background:
                "repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(34,211,238,0.3) 50px, rgba(34,211,238,0.3) 100px)",
            }}
          ></div>
        </div>

        {/* Top line */}
        <div
          ref={topLineRef}
          className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-cyan-500 via-blue-500 to-transparent"
        ></div>

        {/* Orb */}
        <div
          ref={orbRef}
          className="absolute -top-10 -right-10 w-20 h-20 bg-cyan-500/10 rounded-full blur-xl"
        ></div>

        {/* Corners */}
        <div
          ref={(el) => {
            if (el) cornersRef.current[0] = el;
          }}
          className="absolute top-1 left-1 w-3 h-3 border-l border-t border-cyan-500/50"
          style={{ opacity: 0 }}
        ></div>
        <div
          ref={(el) => {
            if (el) cornersRef.current[1] = el;
          }}
          className="absolute top-1 right-1 w-3 h-3 border-r border-t border-cyan-500/50"
          style={{ opacity: 0 }}
        ></div>
        <div
          ref={(el) => {
            if (el) cornersRef.current[2] = el;
          }}
          className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-cyan-500/50"
          style={{ opacity: 0 }}
        ></div>
        <div
          ref={(el) => {
            if (el) cornersRef.current[3] = el;
          }}
          className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-cyan-500/50"
          style={{ opacity: 0 }}
        ></div>

        <div className="text-cyan-400 text-xs tracking-widest mb-2 flex items-center gap-2 relative z-10">
          <span ref={iconRef}>
            <Icon icon="pixelarticons:drop-full" className="w-4 h-4" />
          </span>
          HYDRO.log
        </div>

        <div
          ref={valueRef}
          className="text-4xl font-bold text-white mb-1 relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)]"
        >
          0.0L
        </div>

        <div className="text-cyan-300/60 text-xs relative z-10">
          WATER INTAKE
        </div>

        <div
          ref={barsContainerRef}
          className="mt-3 flex gap-1 justify-center relative z-10"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
            const isFilled = i <= hydrationStats.filledBars;
            return (
              <div
                key={i}
                className={`water-bar w-3 h-8 border origin-bottom ${
                  isFilled
                    ? "bg-linear-to-t from-cyan-500 to-blue-400 border-cyan-400"
                    : "bg-zinc-800 border-zinc-700"
                }`}
                style={{
                  transform: isFilled ? "scaleY(0)" : "scaleY(1)",
                  opacity: isFilled ? 0 : 1,
                }}
              ></div>
            );
          })}
        </div>

        <div className="mt-2 text-xs text-cyan-300/40 border-t border-cyan-500/20 pt-2 relative z-10">
          ▸ TARGET: {hydrationStats.targetLiters}L ▸{" "}
          <span className="text-cyan-400">
            {Math.round(hydrationStats.progress)}%
          </span>
        </div>
      </div>
    </Link>
  );
}
