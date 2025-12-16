import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { animate, stagger, random } from "animejs";

interface AuthLoadingOverlayProps {
  isVisible: boolean;
  message?: string;
  color?: "pink" | "cyan";
  onComplete?: () => void;
}

export function AuthLoadingOverlay({
  isVisible,
  message = "PROCESSING...",
  color = "pink",
  onComplete,
}: AuthLoadingOverlayProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const progressBarsRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const percentRef = useRef<HTMLSpanElement>(null);
  const [progress, setProgress] = useState(0);

  // Ref to always have latest onComplete callback
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const totalSegments = 15;

  useEffect(() => {
    if (!isVisible) {
      setProgress(0);
      return;
    }

    // Create particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = "";
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = `absolute rounded-full ${
          color === "pink" ? "bg-pink-500" : "bg-cyan-500"
        }`;
        const size = random(1, 3);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = "0";
        particlesRef.current.appendChild(particle);
      }
    }

    // Overlay fade in
    if (overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 300,
        ease: "outQuad",
      });
    }

    // Progress animation
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      const increment = Math.random() * 15 + 5;
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(Math.floor(currentProgress));

      if (currentProgress >= 100) {
        clearInterval(progressInterval);
        // Small delay after hitting 100% before calling onComplete
        setTimeout(() => {
          onCompleteRef.current?.();
        }, 500);
      }
    }, 200);

    // Animate progress segments
    if (progressBarsRef.current) {
      const segments =
        progressBarsRef.current.querySelectorAll(".progress-segment");
      animate(segments, {
        opacity: [0.2, 1],
        scale: [0.8, 1],
        duration: 300,
        delay: stagger(100),
        ease: "outExpo",
      });
    }

    // Glitch effect
    const glitchInterval = setInterval(() => {
      if (glitchRef.current) {
        animate(glitchRef.current, {
          translateX: [
            { to: random(-5, 5), duration: 30 },
            { to: random(-3, 3), duration: 30 },
            { to: 0, duration: 30 },
          ],
          skewX: [
            { to: random(-2, 2), duration: 30 },
            { to: 0, duration: 30 },
          ],
          ease: "linear",
        });
      }
    }, 200);

    // Particle animation
    if (particlesRef.current) {
      animate(particlesRef.current.children, {
        opacity: [0, 0.8, 0],
        translateY: () => random(-100, 100),
        translateX: () => random(-50, 50),
        scale: [0, 1, 0],
        duration: 2000,
        delay: stagger(30, { from: "random" }),
        loop: true,
        ease: "outQuad",
      });
    }

    return () => {
      clearInterval(glitchInterval);
      clearInterval(progressInterval);
    };
  }, [isVisible, color]);

  if (!isVisible) return null;

  const colorClass = color === "pink" ? "pink" : "cyan";
  const rgbColor = color === "pink" ? "236,72,153" : "34,211,238";
  const activeSegments = Math.floor((progress / 100) * totalSegments);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-md"
      style={{ opacity: 0 }}
    >
      {/* Background grid */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(rgba(${rgbColor},0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(${rgbColor},0.03)_1px,transparent_1px)] bg-[size:20px_20px]`}
      />

      {/* Animated circuit lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
        <defs>
          <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={`rgb(${rgbColor})`} stopOpacity="0" />
            <stop offset="50%" stopColor={`rgb(${rgbColor})`} stopOpacity="1" />
            <stop
              offset="100%"
              stopColor={`rgb(${rgbColor})`}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>
        <line
          x1="0"
          y1="30%"
          x2="100%"
          y2="30%"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          className="animate-pulse"
        />
        <line
          x1="0"
          y1="70%"
          x2="100%"
          y2="70%"
          stroke="url(#lineGrad)"
          strokeWidth="1"
          className="animate-pulse"
        />
      </svg>

      {/* Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Scanlines */}
      <div className="absolute inset-0 pointer-events-none bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(0,0,0,0.1)_2px,rgba(0,0,0,0.1)_4px)]" />

      {/* Main content */}
      <div ref={glitchRef} className="relative z-10 w-full max-w-xl px-8">
        {/* Top label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <div
            className={`w-8 h-0.5 bg-gradient-to-r from-transparent to-${colorClass}-500`}
          />
          <span
            className={`text-${colorClass}-400 text-xs tracking-[0.4em] uppercase`}
          >
            {message}
          </span>
          <div
            className={`w-8 h-0.5 bg-gradient-to-l from-transparent to-${colorClass}-500`}
          />
        </div>

        {/* Progress bar container */}
        <div className="relative">
          {/* Outer frame */}
          <div
            className={`relative border-2 border-${colorClass}-500/70 bg-zinc-900/80 p-3`}
            style={{
              clipPath:
                "polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)",
              boxShadow: `0 0 30px rgba(${rgbColor},0.3), inset 0 0 20px rgba(${rgbColor},0.1)`,
            }}
          >
            {/* Glow effect */}
            <div
              className={`absolute inset-0 bg-gradient-to-r from-${colorClass}-500/10 via-${colorClass}-500/5 to-${colorClass}-500/10`}
            />

            {/* Inner progress container */}
            <div
              ref={progressBarsRef}
              className={`relative border border-${colorClass}-500/40 bg-zinc-950/60 p-2`}
              style={{ boxShadow: `inset 0 0 15px rgba(${rgbColor},0.2)` }}
            >
              {/* Segments */}
              <div className="flex gap-1.5">
                {Array.from({ length: totalSegments }).map((_, i) => {
                  const isActive = i < activeSegments;
                  const isAnimating = i === activeSegments - 1;

                  return (
                    <div
                      key={i}
                      className={`progress-segment relative h-10 flex-1 transition-all duration-150 ${
                        isActive
                          ? `bg-gradient-to-b from-${colorClass}-400 via-${colorClass}-500 to-${colorClass}-600`
                          : `bg-${colorClass}-500/10 border border-${colorClass}-500/20`
                      }`}
                      style={{
                        boxShadow: isActive
                          ? `0 0 15px rgba(${rgbColor},0.8), 0 0 30px rgba(${rgbColor},0.4), inset 0 0 10px rgba(255,255,255,0.2)`
                          : "none",
                        animation: isAnimating
                          ? "pulse 0.3s ease-in-out"
                          : "none",
                      }}
                    >
                      {/* Segment shine */}
                      {isActive && (
                        <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-white/40 to-transparent" />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Corner accents */}
            <div
              className={`absolute top-0 left-0 w-3 h-3 border-l-2 border-t-2 border-${colorClass}-400`}
            />
            <div
              className={`absolute top-0 right-0 w-3 h-3 border-r-2 border-t-2 border-${colorClass}-400`}
            />
            <div
              className={`absolute bottom-0 left-0 w-3 h-3 border-l-2 border-b-2 border-${colorClass}-400`}
            />
            <div
              className={`absolute bottom-0 right-0 w-3 h-3 border-r-2 border-b-2 border-${colorClass}-400`}
            />
          </div>

          {/* Bottom HUD elements */}
          <div className="mt-4 flex items-center justify-between">
            {/* Left status */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 bg-${colorClass}-500 animate-pulse shadow-[0_0_10px_rgba(${rgbColor},0.8)]`}
              />
              <span
                className={`text-${colorClass}-400/70 text-[10px] tracking-widest uppercase`}
              >
                <Icon
                  icon="pixelarticons:radio-signal"
                  className="inline w-3 h-3 mr-1"
                />
                ACTIVE
              </span>
            </div>

            {/* Center percentage */}
            <div
              className={`relative px-6 py-1 border border-${colorClass}-500/50 bg-zinc-900/80`}
            >
              <span
                ref={percentRef}
                className={`text-${colorClass}-400 text-xl font-bold tracking-[0.2em] tabular-nums`}
                style={{ textShadow: `0 0 20px rgba(${rgbColor},0.8)` }}
              >
                {progress.toString().padStart(2, "0")}%
              </span>
              <div
                className={`absolute -top-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-${colorClass}-500`}
              />
              <div
                className={`absolute -bottom-px left-1/2 -translate-x-1/2 w-8 h-0.5 bg-${colorClass}-500`}
              />
            </div>

            {/* Right status */}
            <div className="flex items-center gap-2">
              <span
                className={`text-${colorClass}-400/70 text-[10px] tracking-widest uppercase`}
              >
                SECURE
                <Icon
                  icon="pixelarticons:lock"
                  className="inline w-3 h-3 ml-1"
                />
              </span>
              <div
                className={`w-2 h-2 bg-${colorClass}-500 animate-pulse shadow-[0_0_10px_rgba(${rgbColor},0.8)]`}
              />
            </div>
          </div>

          {/* Decorative lines */}
          <div className="mt-3 flex justify-center gap-1">
            {Array.from({ length: 9 }).map((_, i) => (
              <div
                key={i}
                className={`h-1 ${
                  i === 4 ? "w-8" : "w-4"
                } bg-${colorClass}-500/${i === 4 ? "60" : "30"}`}
              />
            ))}
          </div>
        </div>

        {/* Bottom message */}
        <div
          className={`mt-6 text-center text-[10px] text-${colorClass}-400/50 tracking-[0.3em] uppercase flex items-center justify-center gap-2`}
        >
          <Icon icon="pixelarticons:shield" className="w-3 h-3" />
          ENCRYPTED_TRANSMISSION_IN_PROGRESS
          <Icon icon="pixelarticons:shield" className="w-3 h-3" />
        </div>
      </div>

      {/* Corner frame decorations */}
      <div
        className={`absolute top-6 left-6 w-16 h-16 border-l-2 border-t-2 border-${colorClass}-500/50`}
      />
      <div
        className={`absolute top-6 right-6 w-16 h-16 border-r-2 border-t-2 border-${colorClass}-500/50`}
      />
      <div
        className={`absolute bottom-6 left-6 w-16 h-16 border-l-2 border-b-2 border-${colorClass}-500/50`}
      />
      <div
        className={`absolute bottom-6 right-6 w-16 h-16 border-r-2 border-b-2 border-${colorClass}-500/50`}
      />

      {/* Animated corner dots */}
      {[
        "top-8 left-8",
        "top-8 right-8",
        "bottom-8 left-8",
        "bottom-8 right-8",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-1.5 h-1.5 bg-${colorClass}-500 animate-ping`}
          style={{ animationDelay: `${i * 200}ms` }}
        />
      ))}
    </div>
  );
}
