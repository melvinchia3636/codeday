import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { animate, random, createTimeline, stagger } from "animejs";

const MIN_DESKTOP_WIDTH = 1024;

function isMobileOrTablet(): boolean {
  const userAgent = navigator.userAgent.toLowerCase();
  const mobileKeywords = [
    "android",
    "webos",
    "iphone",
    "ipad",
    "ipod",
    "blackberry",
    "windows phone",
    "opera mini",
    "mobile",
    "tablet",
  ];
  return mobileKeywords.some((keyword) => userAgent.includes(keyword));
}

/**
 * Full-screen overlay that blocks usage on mobile/small screens
 * with sweet waifu messaging and cyberpunk aesthetics
 */
export function MobileBlockScreen() {
  const [shouldBlock, setShouldBlock] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pulseRingsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const scanlineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkDevice = () => {
      const isMobile = isMobileOrTablet();
      const isSmallScreen = window.innerWidth < MIN_DESKTOP_WIDTH;
      setShouldBlock(isMobile || isSmallScreen);
    };

    checkDevice();
    window.addEventListener("resize", checkDevice);

    return () => window.removeEventListener("resize", checkDevice);
  }, []);

  useEffect(() => {
    if (!shouldBlock || !containerRef.current) return;

    // Matrix rain effect
    if (matrixRef.current) {
      matrixRef.current.innerHTML = "";
      for (let i = 0; i < 25; i++) {
        const column = document.createElement("div");
        column.className = "absolute text-pink-500/20 text-xs font-mono";
        column.style.left = `${i * 4}%`;
        column.style.top = "-100%";
        column.textContent = Array.from({ length: 12 }, () =>
          String.fromCharCode(0x30a0 + Math.random() * 96)
        ).join("\n");
        matrixRef.current.appendChild(column);

        animate(column, {
          translateY: ["0vh", "150vh"],
          opacity: [0.6, 0],
          duration: random(4000, 8000),
          delay: random(0, 3000),
          loop: true,
          ease: "linear",
        });
      }
    }

    // Floating particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = "";
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        const size = random(2, 8);
        particle.className = `absolute rounded-full ${
          i % 4 === 0
            ? "bg-pink-500"
            : i % 4 === 1
            ? "bg-fuchsia-500"
            : i % 4 === 2
            ? "bg-cyan-500"
            : "bg-purple-500"
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${random(0, 100)}%`;
        particle.style.top = `${random(0, 100)}%`;
        particle.style.boxShadow = `0 0 ${size * 3}px currentColor`;
        particlesRef.current.appendChild(particle);

        animate(particle, {
          translateY: [0, random(-150, 150)],
          translateX: [0, random(-80, 80)],
          opacity: [0.8, 0],
          scale: [1, 0],
          duration: random(3000, 6000),
          delay: random(0, 2000),
          loop: true,
          ease: "outExpo",
        });
      }
    }

    // Scanline effect
    if (scanlineRef.current) {
      animate(scanlineRef.current, {
        translateY: ["-100%", "200vh"],
        duration: 3000,
        ease: "linear",
        loop: true,
      });
    }

    // Glow pulse
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.3, 0.8, 0.3],
        scale: [0.9, 1.2, 0.9],
        duration: 3000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Heart beat animation
    if (heartRef.current) {
      animate(heartRef.current, {
        scale: [1, 1.3, 1, 1.2, 1],
        duration: 1200,
        ease: "inOutQuad",
        loop: true,
      });
    }

    // Pulse rings
    pulseRingsRef.current.forEach((ring, i) => {
      if (ring) {
        animate(ring, {
          scale: [0.5, 3],
          opacity: [0.8, 0],
          duration: 3500 + i * 600,
          delay: i * 700,
          ease: "outExpo",
          loop: true,
        });
      }
    });

    // Corners animation
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [1, 0.4, 1],
          borderColor: [
            "rgba(236,72,153,1)",
            "rgba(34,211,238,1)",
            "rgba(236,72,153,1)",
          ],
          duration: 2500,
          delay: i * 300,
          ease: "inOutSine",
          loop: true,
        });
      }
    });

    // Main timeline
    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    tl.add(containerRef.current, {
      opacity: [0, 1],
      duration: 800,
    });

    if (titleRef.current) {
      tl.add(
        titleRef.current.querySelectorAll(".title-line"),
        {
          opacity: [0, 1],
          translateY: [40, 0],
          scale: [0.8, 1],
          delay: stagger(150),
          duration: 800,
          ease: "outBack",
        },
        "-=400"
      );
    }

    if (messageRef.current) {
      tl.add(
        messageRef.current.querySelectorAll(".message-line"),
        {
          opacity: [0, 1],
          translateY: [20, 0],
          delay: stagger(100),
          duration: 600,
        },
        "-=600"
      );
    }

    // Title glitch effect
    const titleGlitch = setInterval(() => {
      if (titleRef.current) {
        animate(titleRef.current, {
          translateX: [
            { to: random(-4, 4), duration: 50 },
            { to: random(-2, 2), duration: 50 },
            { to: 0, duration: 50 },
          ],
          skewX: [
            { to: random(-2, 2), duration: 50 },
            { to: 0, duration: 50 },
          ],
          ease: "linear",
        });
      }
    }, 4000);

    return () => clearInterval(titleGlitch);
  }, [shouldBlock]);

  if (!shouldBlock) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex items-center justify-center bg-zinc-950 overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Matrix rain background */}
      <div
        ref={matrixRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      {/* Radial glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[600px] sm:h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.3) 0%, rgba(217,70,239,0.15) 40%, transparent 70%)",
        }}
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(236,72,153,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(236,72,153,0.03) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Floating particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Scanline */}
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-[2px] bg-linear-to-r from-transparent via-pink-500/40 to-transparent pointer-events-none"
        style={{ boxShadow: "0 0 15px rgba(236,72,153,0.5)" }}
      />

      {/* Pulse rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) pulseRingsRef.current[i] = el;
            }}
            className="absolute rounded-full border-2 border-pink-500/30"
            style={{
              width: `${200 + i * 80}px`,
              height: `${200 + i * 80}px`,
            }}
          />
        ))}
      </div>

      {/* Corner decorations */}
      <div
        ref={(el) => {
          if (el) cornersRef.current[0] = el;
        }}
        className="absolute top-3 left-3 sm:top-6 sm:left-6 w-8 h-8 sm:w-16 sm:h-16 border-l-2 border-t-2 sm:border-l-4 sm:border-t-4 border-pink-500"
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[1] = el;
        }}
        className="absolute top-3 right-3 sm:top-6 sm:right-6 w-8 h-8 sm:w-16 sm:h-16 border-r-2 border-t-2 sm:border-r-4 sm:border-t-4 border-cyan-500"
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[2] = el;
        }}
        className="absolute bottom-3 left-3 sm:bottom-6 sm:left-6 w-8 h-8 sm:w-16 sm:h-16 border-l-2 border-b-2 sm:border-l-4 sm:border-b-4 border-cyan-500"
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[3] = el;
        }}
        className="absolute bottom-3 right-3 sm:bottom-6 sm:right-6 w-8 h-8 sm:w-16 sm:h-16 border-r-2 border-b-2 sm:border-r-4 sm:border-b-4 border-pink-500"
      />

      {/* Gradient top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-500" />
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-linear-to-r from-cyan-500 via-fuchsia-500 to-pink-500" />

      {/* Main content */}
      <div className="relative z-10 text-center px-4 sm:px-8 max-w-lg w-full">
        {/* Animated heart icon */}
        <div className="relative mb-4 sm:mb-8 flex justify-center">
          <div
            ref={heartRef}
            className="relative"
            style={{ filter: "drop-shadow(0 0 30px rgba(236,72,153,0.8))" }}
          >
            <Icon
              icon="pixelarticons:heart"
              className="w-16 h-16 sm:w-24 sm:h-24 text-pink-500"
            />
          </div>
        </div>

        {/* Title section */}
        <div ref={titleRef} className="mb-4 sm:mb-8 space-y-2 sm:space-y-3">
          <div
            className="title-line text-pink-400 text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.4em] uppercase flex items-center justify-center gap-1 sm:gap-2"
            style={{ opacity: 0 }}
          >
            <span className="w-4 sm:w-8 h-px bg-linear-to-r from-transparent to-pink-500" />
            <Icon
              icon="pixelarticons:alert"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            SYSTEM_NOTICE
            <Icon
              icon="pixelarticons:alert"
              className="w-3 h-3 sm:w-4 sm:h-4"
            />
            <span className="w-4 sm:w-8 h-px bg-linear-to-l from-transparent to-pink-500" />
          </div>
          <h1
            className="title-line text-xl sm:text-3xl font-bold tracking-wide bg-linear-to-r from-pink-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent"
            style={{
              opacity: 0,
              textShadow: "0 0 40px rgba(236,72,153,0.6)",
            }}
          >
            ♡ Hey There, Darling! ♡
          </h1>
        </div>

        {/* Sweet message box */}
        <div className="relative bg-zinc-900/90 border-2 border-pink-500/60 p-3 sm:p-6 mb-4 sm:mb-8 backdrop-blur-sm">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-t-2 sm:border-l-3 sm:border-t-3 border-pink-500" />
          <div className="absolute top-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-t-2 sm:border-r-3 sm:border-t-3 border-cyan-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 sm:w-6 sm:h-6 border-l-2 border-b-2 sm:border-l-3 sm:border-b-3 border-cyan-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 sm:w-6 sm:h-6 border-r-2 border-b-2 sm:border-r-3 sm:border-b-3 border-pink-500" />

          {/* Glowing border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow:
                "0 0 40px rgba(236,72,153,0.3), inset 0 0 30px rgba(236,72,153,0.1)",
            }}
          />

          <div ref={messageRef} className="space-y-2 sm:space-y-4 text-left">
            <p
              className="message-line text-fuchsia-300 text-xs sm:text-sm leading-relaxed"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:mood-happy"
                className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-pink-400"
              />
              I noticed you're on a smaller screen, sweetie~
            </p>
            <p
              className="message-line text-pink-200/80 text-xs sm:text-sm leading-relaxed"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:monitor"
                className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-cyan-400"
              />
              I can only give you the{" "}
              <span className="text-pink-400 font-bold">
                full loving experience
              </span>{" "}
              on a PC, laptop, or larger display...
            </p>
            <p
              className="message-line text-fuchsia-300/90 text-xs sm:text-sm leading-relaxed"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:heart"
                className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-pink-400"
              />
              Please visit me on your computer so we can have the{" "}
              <span className="text-cyan-400 font-bold">
                best time together
              </span>
              !
            </p>
            <p
              className="message-line text-pink-300 text-xs sm:text-sm leading-relaxed italic"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:close"
                className="inline w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-fuchsia-400"
              />
              I'll be waiting for you... Don't keep me lonely, okay? ♡
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-1 sm:gap-3 flex-wrap">
          <div className="hidden sm:flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${
                  i % 2 === 0 ? "bg-pink-500" : "bg-fuchsia-500"
                } animate-pulse`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
          <span className="text-pink-400/70 text-[10px] sm:text-xs tracking-[0.1em] sm:tracking-[0.2em] uppercase">
            awaiting_desktop_connection
          </span>
          <div className="hidden sm:flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 ${
                  i % 2 === 0 ? "bg-fuchsia-500" : "bg-cyan-500"
                } animate-pulse`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Love signature */}
        <div className="mt-4 sm:mt-6 text-center">
          <p className="text-pink-500/50 text-[10px] sm:text-xs tracking-widest">
            — with love, your waifu ♡ —
          </p>
        </div>
      </div>

      {/* Side decorations */}
      <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div
              className={`w-6 h-0.5 ${
                i % 2 === 0 ? "bg-pink-500/40" : "bg-pink-500/20"
              }`}
            />
            <div className="w-1 h-1 bg-pink-500/60" />
          </div>
        ))}
      </div>
      <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex flex-col gap-2">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="flex items-center gap-1">
            <div className="w-1 h-1 bg-pink-500/60" />
            <div
              className={`w-6 h-0.5 ${
                i % 2 === 0 ? "bg-pink-500/40" : "bg-pink-500/20"
              }`}
            />
          </div>
        ))}
      </div>

      {/* Blinking corner dots - hidden on very small screens */}
      {[
        "top-4 left-4 sm:top-8 sm:left-8",
        "top-4 right-4 sm:top-8 sm:right-8",
        "bottom-4 left-4 sm:bottom-8 sm:left-8",
        "bottom-4 right-4 sm:bottom-8 sm:right-8",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-2 h-2 sm:w-3 sm:h-3 ${
            i % 2 === 0 ? "bg-pink-500" : "bg-cyan-500"
          } animate-ping`}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}
    </div>
  );
}
