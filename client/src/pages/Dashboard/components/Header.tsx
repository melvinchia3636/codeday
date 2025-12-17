import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { animate, random } from "animejs";

export function Header() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLParagraphElement>(null);
  const iconLeftRef = useRef<HTMLSpanElement>(null);
  const iconRightRef = useRef<HTMLSpanElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      animate(titleRef.current, {
        textShadow: [
          "0 0 0 transparent",
          "-3px 0 0 rgba(236,72,153,0.5), 3px 0 0 rgba(34,211,238,0.5)",
          "0 0 0 transparent",
        ],
        duration: 200,
        ease: "inOutQuad",
      });

      const glitchInterval = setInterval(() => {
        if (titleRef.current) {
          animate(titleRef.current, {
            translateX: [0, random(-4, 4), random(-2, 2), 0],
            textShadow: [
              "0 0 0 transparent",
              `-${random(1, 4)}px 0 0 rgba(236,72,153,0.7), ${random(
                1,
                4
              )}px 0 0 rgba(34,211,238,0.7)`,
              "0 0 0 transparent",
            ],
            filter: [
              "hue-rotate(0deg)",
              `hue-rotate(${random(-15, 15)}deg)`,
              "hue-rotate(0deg)",
            ],
            duration: 150,
            ease: "inOutQuad",
          });
        }
      }, random(4000, 7000));

      return () => clearInterval(glitchInterval);
    }
  }, []);

  useEffect(() => {
    if (cursorRef.current) {
      animate(cursorRef.current, {
        opacity: [1, 0],
        duration: 500,
        ease: "stepEnd",
        loop: true,
        alternate: true,
      });
    }

    if (statusRef.current) {
      animate(statusRef.current, {
        opacity: [0.4, 1, 0.4],
        duration: 2000,
        ease: "inOutSine",
        loop: true,
      });
    }

    if (iconLeftRef.current) {
      animate(iconLeftRef.current, {
        rotate: [0, 360],
        scale: [1, 1.2, 1],
        duration: 4000,
        ease: "inOutSine",
        loop: true,
      });
    }

    if (iconRightRef.current) {
      animate(iconRightRef.current, {
        scale: [1, 1.3, 1],
        duration: 1000,
        ease: "inOutSine",
        loop: true,
      });

      animate(iconRightRef.current, {
        filter: [
          "drop-shadow(0 0 0 transparent)",
          "drop-shadow(0 0 10px rgba(236,72,153,0.8))",
          "drop-shadow(0 0 0 transparent)",
        ],
        duration: 1000,
        ease: "inOutSine",
        loop: true,
      });
    }

    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0, 0.5, 0],
        scale: [0.8, 1.2, 0.8],
        duration: 3000,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <div
        ref={glowRef}
        className="absolute -inset-10 bg-gradient-radial from-pink-500/20 to-transparent rounded-full blur-3xl pointer-events-none"
        style={{ opacity: 0 }}
      ></div>

      <h1
        ref={titleRef}
        className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 tracking-widest uppercase flex items-center gap-2 relative"
      >
        <span ref={iconLeftRef} className="inline-block">
          <Icon
            icon="pixelarticons:human-run"
            className="w-8 h-8 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
          />
        </span>
        Lucy
        <span className="text-pink-500 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]">
          Fit
        </span>
        <span
          ref={cursorRef}
          className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
        >
          _
        </span>
        <span ref={iconRightRef} className="inline-block">
          <Icon
            icon="pixelarticons:heart"
            className="w-8 h-8 text-pink-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
          />
        </span>
      </h1>
      <p
        ref={statusRef}
        className="text-pink-300/60 text-sm tracking-[0.3em] mt-1 flex items-center gap-2"
      >
        <span className="inline-block w-2 h-2 bg-cyan-400 rounded-full animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
        <Icon icon="pixelarticons:radio-on" className="w-4 h-4 text-cyan-400" />{" "}
        SYSTEM_STATUS: <span className="text-cyan-400">ONLINE</span>
      </p>
    </div>
  );
}
