import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { animate, stagger, random } from "animejs";

export function ActivityTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const dataStreamRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        delay: 200,
        ease: "outExpo",
      });

      // Continuous pulse
      setTimeout(() => {
        if (titleRef.current) {
          animate(titleRef.current, {
            opacity: [1, 0.7, 1],
            duration: 2000,
            ease: "inOutSine",
            loop: true,
          });
        }
      }, 800);
    }

    // Timeline items stagger animation
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll(".timeline-item");

      // Entrance animation
      animate(items, {
        opacity: [0, 1],
        translateX: [-30, 0],
        delay: stagger(200, { start: 400 }),
        duration: 600,
        ease: "outExpo",
      });

      // Continuous subtle hover effect
      setTimeout(() => {
        items.forEach((item, i) => {
          animate(item, {
            translateX: [0, 3, 0],
            duration: 3000,
            delay: i * 500,
            ease: "inOutSine",
            loop: true,
          });
        });
      }, 1400);

      // Pulse dots
      const dots = itemsRef.current.querySelectorAll(".activity-dot");
      animate(dots, {
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1],
        delay: stagger(300, { start: 600 }),
        duration: 1500,
        ease: "inOutSine",
        loop: true,
      });

      // Value highlights
      const values = itemsRef.current.querySelectorAll(".activity-value");
      animate(values, {
        textShadow: [
          "0 0 0 transparent",
          "0 0 10px currentColor",
          "0 0 0 transparent",
        ],
        delay: stagger(200, { start: 800 }),
        duration: 2000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Scanline effect
    if (scanlineRef.current) {
      animate(scanlineRef.current, {
        translateY: ["-100%", "300%"],
        duration: 4000,
        ease: "linear",
        loop: true,
      });
    }

    // Background glow
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.02, 0.1, 0.02],
        duration: 4000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Corners animation
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: 500,
          delay: 400 + i * 100,
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
        }, 900 + i * 100);
      }
    });

    // Data stream background
    if (dataStreamRef.current) {
      for (let i = 0; i < 6; i++) {
        const stream = document.createElement("div");
        stream.className =
          "absolute h-px bg-gradient-to-r from-transparent via-pink-500/20 to-transparent";
        stream.style.width = `${random(30, 80)}%`;
        stream.style.left = `${random(-10, 50)}%`;
        stream.style.top = `${random(10, 90)}%`;
        dataStreamRef.current.appendChild(stream);

        animate(stream, {
          translateX: [0, "200%"],
          opacity: [0, 0.5, 0],
          duration: random(3000, 6000),
          ease: "linear",
          loop: true,
          delay: random(0, 2000),
        });
      }
    }

    // Container border animation
    if (containerRef.current) {
      animate(containerRef.current, {
        borderColor: [
          "rgba(236,72,153,0.3)",
          "rgba(34,211,238,0.4)",
          "rgba(236,72,153,0.3)",
        ],
        boxShadow: [
          "inset 0 0 20px rgba(236,72,153,0.05)",
          "inset 0 0 30px rgba(34,211,238,0.1)",
          "inset 0 0 20px rgba(236,72,153,0.05)",
        ],
        duration: 5000,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 bg-zinc-900/50 border border-pink-500/30 p-4 relative overflow-hidden backdrop-blur-sm"
    >
      {/* Data streams background */}
      <div
        ref={dataStreamRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      ></div>

      {/* Scanline */}
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none z-10"
      ></div>

      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 bg-gradient-radial from-pink-500/10 to-transparent pointer-events-none"
      ></div>

      {/* Corners */}
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

      <div
        ref={titleRef}
        className="text-pink-400 text-xs tracking-widest mb-3 flex items-center gap-2 relative z-10"
        style={{ opacity: 0 }}
      >
        <Icon icon="pixelarticons:timeline" className="w-4 h-4" />{" "}
        ACTIVITY_STREAM
      </div>

      <div ref={itemsRef} className="space-y-2 relative z-10">
        <div
          className="timeline-item flex items-center gap-3 text-xs bg-zinc-800/30 p-1.5 border-l-2 border-pink-500/50"
          style={{ opacity: 0 }}
        >
          <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
            [08:30]
          </span>
          <span className="activity-dot w-2 h-2 bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]"></span>
          <span className="text-zinc-400">Morning workout completed</span>
          <span className="activity-value text-pink-500 ml-auto">+320 cal</span>
        </div>
        <div
          className="timeline-item flex items-center gap-3 text-xs bg-zinc-800/30 p-1.5 border-l-2 border-fuchsia-500/50"
          style={{ opacity: 0 }}
        >
          <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
            [12:15]
          </span>
          <span className="activity-dot w-2 h-2 bg-fuchsia-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]"></span>
          <span className="text-zinc-400">
            Lunch logged: Grilled chicken bowl
          </span>
          <span className="activity-value text-fuchsia-500 ml-auto">
            580 kcal
          </span>
        </div>
        <div
          className="timeline-item flex items-center gap-3 text-xs bg-zinc-800/30 p-1.5 border-l-2 border-cyan-500/50"
          style={{ opacity: 0 }}
        >
          <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
            [14:00]
          </span>
          <span className="activity-dot w-2 h-2 bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]"></span>
          <span className="text-zinc-400">Hydration checkpoint reached</span>
          <span className="activity-value text-cyan-500 ml-auto">+500ml</span>
        </div>
      </div>
    </div>
  );
}
