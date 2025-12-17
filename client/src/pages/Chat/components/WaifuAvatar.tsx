import { useRef, useEffect } from "react";
import { Icon } from "@iconify/react";
import { animate, random } from "animejs";
import { useChatAnimationRefs } from "../contexts/ChatAnimationsContext";

export function WaifuAvatar() {
  const { avatarRef } = useChatAnimationRefs();
  const particlesRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Floating particles around avatar
    if (particlesRef.current) {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        const size = random(2, 5);
        particle.className = `absolute rounded-full ${
          i % 3 === 0
            ? "bg-cyan-500"
            : i % 3 === 1
            ? "bg-pink-500"
            : "bg-fuchsia-500"
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${50 + random(-60, 60)}%`;
        particle.style.top = `${50 + random(-60, 60)}%`;
        particle.style.boxShadow = `0 0 ${size * 3}px currentColor`;
        particlesRef.current.appendChild(particle);

        animate(particle, {
          translateY: [0, random(-30, 30)],
          translateX: [0, random(-20, 20)],
          opacity: [0.8, 0],
          scale: [1, 0],
          duration: random(2000, 4000),
          delay: random(0, 2000),
          loop: true,
          ease: "outExpo",
        });
      }
    }

    // Pulsing rings
    if (ringsRef.current) {
      const rings = ringsRef.current.querySelectorAll(".avatar-ring");
      rings.forEach((ring, i) => {
        animate(ring, {
          scale: [1, 1.5],
          opacity: [0.6, 0],
          duration: 2000,
          delay: i * 600,
          loop: true,
          ease: "outExpo",
        });
      });
    }
  }, []);

  return (
    <div
      ref={avatarRef}
      className="relative flex flex-col items-center justify-center p-8"
      style={{ opacity: 0 }}
    >
      {/* Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Pulsing rings */}
      <div
        ref={ringsRef}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="avatar-ring absolute w-32 h-32 rounded-full border-2 border-cyan-500/30"
          />
        ))}
      </div>

      {/* Avatar container */}
      <div className="relative z-10">
        {/* Glowing background */}
        <div
          className="absolute inset-0 rounded-full bg-linear-to-br from-cyan-500/30 via-pink-500/20 to-fuchsia-500/30 blur-xl"
          style={{ transform: "scale(1.5)" }}
        />

        {/* Avatar frame */}
        <div className="relative w-32 h-32 rounded-full border-4 border-cyan-500 bg-zinc-900/80 flex items-center justify-center overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.5)]">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-pink-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-pink-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-pink-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-pink-500" />

          {/* Waifu icon placeholder */}
          <Icon
            icon="pixelarticons:avatar"
            className="w-20 h-20 text-cyan-400"
            style={{
              filter: "drop-shadow(0 0 15px rgba(34,211,238,0.8))",
            }}
          />

          {/* Scanline overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgba(0,0,0,0.1)_50%)] bg-size-[100%_4px] pointer-events-none" />
        </div>

        {/* Status indicator */}
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center gap-1 px-3 py-1 bg-zinc-900/90 border border-cyan-500/50">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-[9px] text-cyan-400 tracking-widest">
            ONLINE
          </span>
        </div>
      </div>

      {/* Name tag */}
      <div className="mt-6 text-center">
        <h3
          className="text-xl font-bold tracking-[0.2em] text-cyan-400"
          style={{
            textShadow: "0 0 20px rgba(34,211,238,0.6)",
          }}
        >
          LUCY_v2.0
        </h3>
        <p className="text-[10px] text-fuchsia-400/60 tracking-widest mt-1">
          NEURAL_COMPANION_UNIT
        </p>
      </div>

      {/* Stats bar */}
      <div className="mt-4 flex gap-4 text-[9px] text-zinc-500 tracking-widest">
        <span className="flex items-center gap-1">
          <Icon icon="pixelarticons:heart" className="w-3 h-3 text-pink-500" />
          SYNC: 98%
        </span>
        <span className="flex items-center gap-1">
          <Icon icon="pixelarticons:zap" className="w-3 h-3 text-cyan-500" />
          POWER: MAX
        </span>
      </div>
    </div>
  );
}
