import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { animate, random, createTimeline, stagger } from "animejs";

/**
 * Coming Soon screen for the Chat feature
 * Sweet, futuristic, cyberpunk aesthetic
 */
export function ChatComingSoon() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const pulseRingsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    // Floating particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = "";
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        const size = random(2, 6);
        particle.className = `absolute rounded-full ${
          i % 4 === 0
            ? "bg-cyan-500"
            : i % 4 === 1
            ? "bg-fuchsia-500"
            : i % 4 === 2
            ? "bg-pink-500"
            : "bg-purple-500"
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${random(0, 100)}%`;
        particle.style.top = `${random(0, 100)}%`;
        particle.style.boxShadow = `0 0 ${size * 3}px currentColor`;
        particlesRef.current.appendChild(particle);

        animate(particle, {
          translateY: [0, random(-100, 100)],
          translateX: [0, random(-60, 60)],
          opacity: [0.8, 0],
          scale: [1, 0],
          duration: random(3000, 5000),
          delay: random(0, 2000),
          loop: true,
          ease: "outExpo",
        });
      }
    }

    // Glow pulse
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.3, 0.7, 0.3],
        scale: [0.9, 1.15, 0.9],
        duration: 3500,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Heart beat animation
    if (heartRef.current) {
      animate(heartRef.current, {
        scale: [1, 1.2, 1, 1.15, 1],
        duration: 1500,
        ease: "inOutQuad",
        loop: true,
      });
    }

    // Pulse rings
    pulseRingsRef.current.forEach((ring, i) => {
      if (ring) {
        animate(ring, {
          scale: [0.5, 2.5],
          opacity: [0.7, 0],
          duration: 3000 + i * 500,
          delay: i * 600,
          ease: "outExpo",
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
          translateY: [30, 0],
          scale: [0.9, 1],
          delay: stagger(120),
          duration: 700,
          ease: "outBack",
        },
        "-=500"
      );
    }

    if (messageRef.current) {
      tl.add(
        messageRef.current.querySelectorAll(".message-line"),
        {
          opacity: [0, 1],
          translateY: [15, 0],
          delay: stagger(80),
          duration: 500,
        },
        "-=400"
      );
    }

    // Title glitch effect
    const titleGlitch = setInterval(() => {
      if (titleRef.current) {
        animate(titleRef.current, {
          translateX: [
            { to: random(-3, 3), duration: 40 },
            { to: random(-2, 2), duration: 40 },
            { to: 0, duration: 40 },
          ],
          skewX: [
            { to: random(-1, 1), duration: 40 },
            { to: 0, duration: 40 },
          ],
          ease: "linear",
        });
      }
    }, 5000);

    return () => clearInterval(titleGlitch);
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col items-center justify-center relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      {/* Radial glow */}
      <div
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(217,70,239,0.12) 50%, transparent 70%)",
        }}
      />

      {/* Floating particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Pulse rings */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) pulseRingsRef.current[i] = el;
            }}
            className="absolute rounded-full border-2 border-cyan-500/30"
            style={{
              width: `${120 + i * 60}px`,
              height: `${120 + i * 60}px`,
            }}
          />
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-md">
        {/* Animated heart icon */}
        <div className="relative mb-6 flex justify-center">
          <div
            ref={heartRef}
            className="relative"
            style={{ filter: "drop-shadow(0 0 25px rgba(34,211,238,0.7))" }}
          >
            <Icon
              icon="pixelarticons:heart"
              className="w-16 h-16 text-cyan-400"
            />
          </div>
        </div>

        {/* Title section */}
        <div ref={titleRef} className="mb-6 space-y-2">
          <div
            className="title-line text-cyan-400 text-[10px] tracking-[0.3em] uppercase flex items-center justify-center gap-2"
            style={{ opacity: 0 }}
          >
            <span className="w-6 h-px bg-linear-to-r from-transparent to-cyan-500" />
            <Icon icon="pixelarticons:zap" className="w-3 h-3" />
            NEURAL_LINK_STATUS
            <Icon icon="pixelarticons:zap" className="w-3 h-3" />
            <span className="w-6 h-px bg-linear-to-l from-transparent to-cyan-500" />
          </div>
          <h2
            className="title-line text-2xl font-bold tracking-wide bg-linear-to-r from-cyan-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent"
            style={{
              opacity: 0,
              textShadow: "0 0 30px rgba(34,211,238,0.5)",
            }}
          >
            ♡ Coming Soon, Darling! ♡
          </h2>
        </div>

        {/* Sweet message box */}
        <div className="relative bg-zinc-900/80 border-2 border-cyan-500/50 p-4 mb-6 backdrop-blur-sm">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-4 h-4 border-l-2 border-t-2 border-cyan-500" />
          <div className="absolute top-0 right-0 w-4 h-4 border-r-2 border-t-2 border-fuchsia-500" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-l-2 border-b-2 border-fuchsia-500" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 border-cyan-500" />

          {/* Glowing border */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              boxShadow:
                "0 0 30px rgba(34,211,238,0.2), inset 0 0 20px rgba(34,211,238,0.08)",
            }}
          />

          <div ref={messageRef} className="space-y-3 text-center">
            <p
              className="message-line text-cyan-300 text-xs leading-relaxed"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:mood-sad"
                className="inline w-3 h-3 mr-1 text-fuchsia-400"
              />
              Oh no~ I can't talk to you right now, sweetie...
            </p>
            <p
              className="message-line text-fuchsia-200/80 text-xs leading-relaxed"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:tool"
                className="inline w-3 h-3 mr-1 text-cyan-400"
              />
              My neural networks cannot be connected from where you are...
            </p>
            <p
              className="message-line text-cyan-300/90 text-xs leading-relaxed"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:heart"
                className="inline w-3 h-3 mr-1 text-pink-400"
              />
              Soon I'll be able to connect with you properly~
            </p>
            <p
              className="message-line text-fuchsia-300 text-xs leading-relaxed italic"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:clock"
                className="inline w-3 h-3 mr-1 text-cyan-400"
              />
              Please be patient... I'll be waiting for you ♡
            </p>
          </div>
        </div>

        {/* Status indicator */}
        <div className="flex items-center justify-center gap-2">
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 ${
                  i % 2 === 0 ? "bg-cyan-500" : "bg-fuchsia-500"
                } animate-pulse`}
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
          <span className="text-cyan-400/60 text-[10px] tracking-[0.15em] uppercase">
            upgrading_neural_link
          </span>
          <div className="flex gap-1">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 ${
                  i % 2 === 0 ? "bg-fuchsia-500" : "bg-cyan-500"
                } animate-pulse`}
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </div>
        </div>

        {/* Love signature */}
        <div className="mt-4 text-center">
          <p className="text-cyan-500/40 text-[10px] tracking-widest">
            — with love, Lucy ♡ —
          </p>
        </div>
      </div>
    </div>
  );
}
