import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { animate, random } from "animejs";

export function WorkoutCard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const valueRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Number counting animation
    if (valueRef.current) {
      const counter = { value: 0 };
      animate(counter, {
        value: [0, 847],
        duration: 2000,
        delay: 500,
        ease: "outExpo",
        onUpdate: function () {
          if (valueRef.current) {
            valueRef.current.textContent = Math.round(counter.value).toString();
          }
        },
      });

      // Continuous glow pulse
      animate(valueRef.current, {
        textShadow: [
          "0 0 0 transparent",
          "0 0 30px rgba(255,255,255,0.8)",
          "0 0 0 transparent",
        ],
        duration: 2000,
        ease: "inOutSine",
        loop: true,
        delay: 2500,
      });
    }

    // Progress bar animation
    if (progressRef.current) {
      animate(progressRef.current, {
        width: ["0%", "75%"],
        duration: 1500,
        delay: 800,
        ease: "outExpo",
      });

      // Continuous shimmer effect
      setTimeout(() => {
        if (progressRef.current) {
          animate(progressRef.current, {
            backgroundPosition: ["0% 0%", "200% 0%"],
            duration: 2000,
            ease: "linear",
            loop: true,
          });
        }
      }, 2300);
    }

    // Icon animation
    if (iconRef.current) {
      animate(iconRef.current, {
        translateX: [0, 5, -5, 5, 0],
        duration: 500,
        ease: "inOutQuad",
        loop: true,
        delay: function () {
          return random(0, 2000);
        },
      });
    }

    // Floating orb
    if (orbRef.current) {
      animate(orbRef.current, {
        translateX: [0, random(-20, 20)],
        translateY: [0, random(-20, 20)],
        scale: [1, random(1.2, 1.5), 1],
        opacity: [0.1, 0.4, 0.1],
        duration: random(3000, 5000),
        ease: "inOutSine",
        loop: true,
      });
    }

    // Top line glow
    if (topLineRef.current) {
      animate(topLineRef.current, {
        opacity: [0.5, 1, 0.5],
        boxShadow: [
          "0 0 5px rgba(236,72,153,0.3)",
          "0 0 20px rgba(236,72,153,0.8)",
          "0 0 5px rgba(236,72,153,0.3)",
        ],
        duration: 2000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Corner pulse
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.5, 1],
          duration: 500,
          delay: 200 + i * 100,
          ease: "outBack",
        });

        setTimeout(() => {
          animate(corner, {
            opacity: [1, 0.3, 1],
            duration: 2000,
            delay: i * 200,
            ease: "inOutSine",
            loop: true,
          });
        }, 700 + i * 100);
      }
    });

    // Create floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        particle.className = "absolute w-1 h-1 bg-pink-500/50 rounded-full";
        particle.style.left = `${random(10, 90)}%`;
        particle.style.top = `${random(10, 90)}%`;
        particlesRef.current.appendChild(particle);

        animate(particle, {
          translateY: [0, random(-30, -60)],
          translateX: [0, random(-20, 20)],
          opacity: [0.6, 0],
          scale: [1, 0],
          duration: random(2000, 4000),
          ease: "outExpo",
          loop: true,
          delay: random(0, 2000),
        });
      }
    }

    // Container hover-like effect
    if (containerRef.current) {
      animate(containerRef.current, {
        borderColor: [
          "rgba(236,72,153,0.5)",
          "rgba(34,211,238,0.6)",
          "rgba(236,72,153,0.5)",
        ],
        duration: 5000,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, []);

  const handleMouseEnter = () => {
    if (containerRef.current) {
      animate(containerRef.current, {
        scale: 1.02,
        boxShadow: "0 0 30px rgba(34,211,238,0.5)",
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
    <div
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group bg-zinc-900/80 border-2 border-pink-500/50 p-4 relative overflow-hidden transition-all duration-300 backdrop-blur-sm"
    >
      {/* Floating particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      ></div>

      {/* Top accent line */}
      <div
        ref={topLineRef}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-transparent"
      ></div>

      {/* Floating orb */}
      <div
        ref={orbRef}
        className="absolute -top-10 -right-10 w-20 h-20 bg-pink-500/10 rounded-full blur-xl"
      ></div>

      {/* Corner decorations */}
      <div
        ref={(el) => {
          if (el) cornersRef.current[0] = el;
        }}
        className="absolute top-1 left-1 w-3 h-3 border-l border-t border-pink-500/50"
        style={{ opacity: 0 }}
      ></div>
      <div
        ref={(el) => {
          if (el) cornersRef.current[1] = el;
        }}
        className="absolute top-1 right-1 w-3 h-3 border-r border-t border-pink-500/50"
        style={{ opacity: 0 }}
      ></div>
      <div
        ref={(el) => {
          if (el) cornersRef.current[2] = el;
        }}
        className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-pink-500/50"
        style={{ opacity: 0 }}
      ></div>
      <div
        ref={(el) => {
          if (el) cornersRef.current[3] = el;
        }}
        className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-pink-500/50"
        style={{ opacity: 0 }}
      ></div>

      <div className="text-pink-400 text-xs tracking-widest mb-2 flex items-center gap-2 relative z-10">
        <span ref={iconRef}>
          <Icon icon="pixelarticons:human-run" className="w-4 h-4" />
        </span>
        WORKOUT.exe
      </div>

      <div
        ref={valueRef}
        className="text-4xl font-bold text-white mb-1 relative z-10 drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]"
      >
        0
      </div>

      <div className="text-pink-300/60 text-xs relative z-10">
        CALORIES BURNED
      </div>

      <div className="mt-3 flex items-center gap-2 relative z-10">
        <div className="h-2 flex-1 bg-zinc-800 overflow-hidden border border-pink-500/20">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-400 bg-[length:200%_100%]"
            style={{ width: "0%" }}
          ></div>
        </div>
        <span className="text-cyan-400 text-xs drop-shadow-[0_0_5px_rgba(34,211,238,0.8)]">
          75%
        </span>
      </div>

      <div className="mt-3 text-xs text-pink-300/40 border-t border-pink-500/20 pt-2 relative z-10">
        ▸ HIIT SESSION: 45min
        <br />▸ STRENGTH: 30min
      </div>
    </div>
  );
}
