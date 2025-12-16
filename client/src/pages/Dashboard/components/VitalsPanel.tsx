import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { animate, stagger, random } from "animejs";

export function VitalsPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const pulseRingRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Title animation
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 600,
        delay: 300,
        ease: "outExpo",
      });

      const icon = titleRef.current.querySelector(".title-icon");
      if (icon) {
        animate(icon, {
          rotate: [0, 360],
          duration: 4000,
          ease: "linear",
          loop: true,
        });
      }
    }

    // Vitals items stagger animation
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll(".vital-item");

      animate(items, {
        opacity: [0, 1],
        translateX: [-20, 0],
        scale: [0.9, 1],
        delay: stagger(150, { start: 400 }),
        duration: 600,
        ease: "outBack",
      });

      // Border pulse animation for each item
      setTimeout(() => {
        items.forEach((item, i) => {
          const borderColors = [
            ["rgba(236,72,153,1)", "rgba(34,211,238,1)", "rgba(236,72,153,1)"],
            ["rgba(34,211,238,1)", "rgba(168,85,247,1)", "rgba(34,211,238,1)"],
            ["rgba(168,85,247,1)", "rgba(236,72,153,1)", "rgba(168,85,247,1)"],
          ];

          animate(item, {
            borderLeftColor: borderColors[i % 3],
            boxShadow: [
              "inset 0 0 0 transparent",
              `inset 0 0 15px ${
                i === 0
                  ? "rgba(236,72,153,0.1)"
                  : i === 1
                  ? "rgba(34,211,238,0.1)"
                  : "rgba(168,85,247,0.1)"
              }`,
              "inset 0 0 0 transparent",
            ],
            duration: 2500,
            delay: i * 400,
            ease: "inOutSine",
            loop: true,
          });
        });
      }, 1000);

      // Value number animations
      const values = itemsRef.current.querySelectorAll(".vital-value");
      values.forEach((value, i) => {
        animate(value, {
          textShadow: [
            "0 0 0 transparent",
            "0 0 15px currentColor",
            "0 0 0 transparent",
          ],
          duration: 2000,
          delay: i * 300 + 500,
          ease: "inOutSine",
          loop: true,
        });
      });

      // Icon animations
      const icons = itemsRef.current.querySelectorAll(".vital-icon");
      icons.forEach((icon, i) => {
        animate(icon, {
          scale: [1, 1.3, 1],
          rotate: [0, 10, -10, 0],
          duration: 2000,
          delay: i * 300,
          ease: "inOutSine",
          loop: true,
        });
      });
    }

    // Pulse ring effect
    if (pulseRingRef.current) {
      animate(pulseRingRef.current, {
        scale: [0.8, 1.5],
        opacity: [0.5, 0],
        duration: 2000,
        ease: "outExpo",
        loop: true,
      });
    }

    // Background glow
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.02, 0.1, 0.02],
        background: [
          "radial-gradient(ellipse at center, rgba(236,72,153,0.1) 0%, transparent 70%)",
          "radial-gradient(ellipse at center, rgba(34,211,238,0.1) 0%, transparent 70%)",
          "radial-gradient(ellipse at center, rgba(236,72,153,0.1) 0%, transparent 70%)",
        ],
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
          delay: 500 + i * 100,
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
        }, 1000 + i * 100);
      }
    });

    // Floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 8; i++) {
        const particle = document.createElement("div");
        const size = random(1, 3);
        particle.className = `absolute rounded-full ${
          i % 3 === 0
            ? "bg-pink-500/40"
            : i % 3 === 1
            ? "bg-cyan-500/40"
            : "bg-fuchsia-500/40"
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${random(10, 90)}%`;
        particle.style.top = `${random(10, 90)}%`;
        particlesRef.current.appendChild(particle);

        animate(particle, {
          translateY: [0, random(-40, -80)],
          translateX: [0, random(-20, 20)],
          opacity: [0.6, 0],
          scale: [1, 0],
          duration: random(2500, 4000),
          ease: "outExpo",
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
          "rgba(168,85,247,0.4)",
          "rgba(236,72,153,0.3)",
        ],
        duration: 6000,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-48 bg-zinc-900/50 border border-pink-500/30 p-4 relative overflow-hidden backdrop-blur-sm"
    >
      {/* Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      ></div>

      {/* Pulse ring */}
      <div
        ref={pulseRingRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full border border-pink-500/30 pointer-events-none"
      ></div>

      {/* Background glow */}
      <div ref={glowRef} className="absolute inset-0 pointer-events-none"></div>

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
        className="text-xs text-pink-400 tracking-widest mb-3 flex items-center gap-2 relative z-10"
        style={{ opacity: 0 }}
      >
        <Icon icon="pixelarticons:chart" className="title-icon w-4 h-4" />{" "}
        VITALS
      </div>

      <div ref={itemsRef} className="space-y-2 relative z-10">
        <div
          className="vital-item bg-zinc-800/50 p-2 border-l-2 border-pink-500"
          style={{ opacity: 0 }}
        >
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1">
              <Icon icon="pixelarticons:zap" className="vital-icon w-3 h-3" />{" "}
              STREAK
            </span>
            <span className="vital-value text-pink-400 font-bold flex items-center gap-1">
              14 DAYS <Icon icon="pixelarticons:sun-alt" className="w-3 h-3" />
            </span>
          </div>
        </div>
        <div
          className="vital-item bg-zinc-800/50 p-2 border-l-2 border-cyan-500"
          style={{ opacity: 0 }}
        >
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1">
              <Icon icon="pixelarticons:scale" className="vital-icon w-3 h-3" />{" "}
              WEIGHT
            </span>
            <span className="vital-value text-cyan-400 font-bold flex items-center gap-1">
              72.4 KG{" "}
              <Icon icon="pixelarticons:trending-down" className="w-3 h-3" />
            </span>
          </div>
        </div>
        <div
          className="vital-item bg-zinc-800/50 p-2 border-l-2 border-fuchsia-500"
          style={{ opacity: 0 }}
        >
          <div className="flex justify-between text-xs">
            <span className="text-zinc-400 flex items-center gap-1">
              <Icon
                icon="pixelarticons:bullseye"
                className="vital-icon w-3 h-3"
              />{" "}
              GOAL
            </span>
            <span className="vital-value text-fuchsia-400 font-bold flex items-center gap-1">
              68.0 KG <Icon icon="pixelarticons:trophy" className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
