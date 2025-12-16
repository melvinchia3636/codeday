import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { animate, random } from "animejs";
import { Link } from "react-router";

export function UserProfile() {
  const containerRef = useRef<HTMLAnchorElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const avatarRingRef = useRef<HTMLDivElement>(null);
  const usernameRef = useRef<HTMLHeadingElement>(null);
  const levelRef = useRef<HTMLParagraphElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Avatar ring rotation
    if (avatarRingRef.current) {
      animate(avatarRingRef.current, {
        rotate: [0, 360],
        duration: 10000,
        ease: "linear",
        loop: true,
      });
    }

    // Avatar pulse and glow
    if (avatarRef.current) {
      animate(avatarRef.current, {
        scale: [1, 1.05, 1],
        boxShadow: [
          "0 0 10px rgba(236,72,153,0.5), inset 0 0 10px rgba(236,72,153,0.3)",
          "0 0 25px rgba(34,211,238,0.7), inset 0 0 20px rgba(34,211,238,0.5)",
          "0 0 10px rgba(236,72,153,0.5), inset 0 0 10px rgba(236,72,153,0.3)",
        ],
        duration: 2000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Username glitch effect
    if (usernameRef.current) {
      const glitchInterval = setInterval(() => {
        if (usernameRef.current) {
          animate(usernameRef.current, {
            translateX: [0, random(-3, 3), 0],
            textShadow: [
              "0 0 0 transparent",
              `${random(-3, 3)}px 0 0 rgba(34,211,238,0.5), ${random(
                -3,
                3
              )}px 0 0 rgba(236,72,153,0.5)`,
              "0 0 0 transparent",
            ],
            duration: 100,
            ease: "inOutQuad",
          });
        }
      }, random(5000, 8000));

      return () => clearInterval(glitchInterval);
    }
  }, []);

  useEffect(() => {
    // Level text flicker
    if (levelRef.current) {
      animate(levelRef.current, {
        opacity: [0.5, 1, 0.5],
        duration: 3000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Container glow effect
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.3, 0.7, 0.3],
        duration: 3000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Scanline animation
    if (scanlineRef.current) {
      animate(scanlineRef.current, {
        translateY: ["-100%", "200%"],
        duration: 2000,
        ease: "linear",
        loop: true,
      });
    }

    // Container border animation
    if (containerRef.current) {
      animate(containerRef.current, {
        borderColor: [
          "rgba(236,72,153,0.5)",
          "rgba(34,211,238,0.6)",
          "rgba(236,72,153,0.5)",
        ],
        boxShadow: [
          "0 0 0 transparent",
          "0 0 20px rgba(34,211,238,0.3)",
          "0 0 0 transparent",
        ],
        duration: 4000,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, []);

  return (
    <Link
      to="/profile"
      ref={containerRef}
      className="flex items-center gap-3 bg-zinc-900/80 border border-pink-500/50 px-4 py-2 relative overflow-hidden backdrop-blur-sm cursor-pointer transition-all duration-300 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:bg-zinc-800/80 group"
    >
      {/* Scanline effect */}
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent pointer-events-none z-10"
      ></div>

      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute -inset-4 bg-gradient-to-r from-pink-500/10 via-fuchsia-500/5 to-cyan-500/10 blur-xl pointer-events-none group-hover:from-cyan-500/20 group-hover:via-pink-500/10 group-hover:to-fuchsia-500/20 transition-all"
      ></div>

      {/* Avatar container with rotating ring */}
      <div className="relative">
        <div
          ref={avatarRingRef}
          className="absolute -inset-1 border-2 border-dashed border-cyan-500/50 rounded-sm"
        ></div>
        <div
          ref={avatarRef}
          className="w-10 h-10 border-2 border-pink-500 bg-gradient-to-br from-fuchsia-600 to-cyan-600 flex items-center justify-center shadow-[0_0_10px_rgba(236,72,153,0.5)] relative z-10"
        >
          <Icon
            icon="pixelarticons:avatar"
            className="w-6 h-6 text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.8)]"
          />
        </div>
      </div>

      <div className="relative z-10">
        <h2
          ref={usernameRef}
          className="text-pink-400 font-bold tracking-widest text-sm drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]"
        >
          USER_01
        </h2>
        <p ref={levelRef} className="text-xs text-pink-300/50 tracking-wider">
          LVL 42 // <span className="text-cyan-400">ELITE</span>
        </p>
      </div>
    </Link>
  );
}
