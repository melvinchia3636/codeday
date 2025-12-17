import { useEffect, useRef, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { animate, random } from "animejs";

interface CyberpunkModalProps {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  titleIcon?: string;
  /** Color theme: 'pink' or 'cyan' */
  color?: "pink" | "cyan";
  /** Whether the modal is in loading state (prevents closing) */
  isLoading?: boolean;
  /** Status text shown at top */
  statusText?: string;
  children: ReactNode;
}

/**
 * Reusable cyberpunk-styled modal wrapper with animations
 */
export function CyberpunkModal({
  isVisible,
  onClose,
  title,
  titleIcon = "pixelarticons:zap",
  color = "pink",
  isLoading = false,
  statusText = "NEURAL_LINK_ACTIVE",
  children,
}: CyberpunkModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);

  const isPink = color === "pink";
  const primaryColor = isPink ? "pink" : "cyan";
  const primaryGlow = isPink ? "rgba(236,72,153," : "rgba(34,211,238,";
  const accentGlow = isPink ? "rgba(217,70,239," : "rgba(236,72,153,";

  useEffect(() => {
    if (!isVisible) return;

    // Create matrix rain effect
    if (matrixRef.current) {
      matrixRef.current.innerHTML = "";
      for (let i = 0; i < 30; i++) {
        const column = document.createElement("div");
        column.className = `absolute text-${primaryColor}-500/30 text-xs font-mono`;
        column.style.left = `${i * 3.33}%`;
        column.style.top = "-100%";
        column.textContent = Array.from({ length: 15 }, () =>
          String.fromCharCode(0x30a0 + Math.random() * 96)
        ).join("\n");
        matrixRef.current.appendChild(column);

        animate(column, {
          translateY: ["0vh", "150vh"],
          opacity: [0.8, 0],
          duration: random(3000, 6000),
          delay: random(0, 2000),
          loop: true,
          ease: "linear",
        });
      }
    }

    // Create floating particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = "";
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        const size = random(2, 6);
        particle.className = `absolute rounded-full ${
          i % 3 === 0
            ? `bg-${primaryColor}-500`
            : i % 3 === 1
            ? "bg-fuchsia-500"
            : "bg-cyan-500"
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${random(0, 100)}%`;
        particle.style.top = `${random(0, 100)}%`;
        particle.style.boxShadow = `0 0 ${size * 2}px currentColor`;
        particlesRef.current.appendChild(particle);

        animate(particle, {
          translateY: [0, random(-100, 100)],
          translateX: [0, random(-50, 50)],
          opacity: [0.8, 0],
          scale: [1, 0],
          duration: random(2000, 4000),
          delay: random(0, 1500),
          loop: true,
          ease: "outExpo",
        });
      }
    }

    // Overlay fade in
    if (overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 500,
        ease: "outQuad",
      });
    }

    // Modal entrance with power-up effect
    if (modalRef.current) {
      animate(modalRef.current, {
        opacity: [0, 1],
        scale: [0.3, 1.05, 1],
        rotate: [5, -2, 0],
        duration: 800,
        ease: "outElastic(1, 0.6)",
      });
    }

    // Title glitch animation
    if (titleRef.current) {
      const glitchInterval = setInterval(() => {
        if (titleRef.current) {
          animate(titleRef.current, {
            translateX: [
              { to: random(-5, 5), duration: 50 },
              { to: random(-3, 3), duration: 50 },
              { to: 0, duration: 50 },
            ],
            skewX: [
              { to: random(-2, 2), duration: 50 },
              { to: 0, duration: 50 },
            ],
            ease: "linear",
          });
        }
      }, 3000);

      return () => clearInterval(glitchInterval);
    }
  }, [isVisible, primaryColor]);

  const handleClose = () => {
    if (!isLoading) onClose();
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-lg"
      style={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      {/* Matrix rain background */}
      <div
        ref={matrixRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${primaryGlow}0.3) 0%, transparent 60%)`,
        }}
      />

      {/* Cyberpunk grid */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(rgba(${
          isPink ? "236,72,153" : "34,211,238"
        },0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(${
          isPink ? "236,72,153" : "34,211,238"
        },0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none`}
      />

      {/* Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Pulsing rings */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-${primaryColor}-500/20 animate-ping`}
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div
        ref={modalRef}
        className={`relative z-10 bg-zinc-900/95 border-2 border-${primaryColor}-500/60 p-8 max-w-lg w-full mx-4`}
        style={{
          opacity: 0,
          boxShadow: `0 0 60px ${primaryGlow}0.4), 0 0 120px ${accentGlow}0.2), inset 0 0 40px ${primaryGlow}0.1)`,
        }}
      >
        {/* Holographic border effect */}
        <div className="absolute inset-0 border-2 border-fuchsia-500/20 animate-pulse pointer-events-none" />

        {/* Corner accents */}
        <div
          className={`absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-${primaryColor}-500 pointer-events-none`}
        />
        <div className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-cyan-500 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-cyan-500 pointer-events-none" />
        <div
          className={`absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-${primaryColor}-500 pointer-events-none`}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-500 animate-pulse pointer-events-none" />

        {/* Form content wrapper */}
        <div className="relative z-20">
          {/* Status indicator */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 border border-fuchsia-500/50 bg-fuchsia-500/10">
              <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />
              <span className="text-fuchsia-400 text-xs tracking-[0.3em] uppercase">
                {statusText}
              </span>
              <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <div ref={titleRef}>
            <h2
              className={`text-2xl font-bold tracking-[0.15em] text-${primaryColor}-400 text-center mb-6 flex items-center justify-center gap-3`}
              style={{
                textShadow: `0 0 25px ${primaryGlow}0.8), 0 0 50px ${primaryGlow}0.4)`,
              }}
            >
              <Icon icon={titleIcon} className="w-6 h-6" />
              {title}
              <Icon icon={titleIcon} className="w-6 h-6" />
            </h2>
          </div>

          {/* Content from children */}
          {children}

          {/* Bottom HUD */}
          <div className="mt-6 flex items-center justify-between text-[10px]">
            <span className="text-fuchsia-400/60 tracking-widest">
              <Icon
                icon="pixelarticons:mood-happy"
                className="inline w-3 h-3 mr-1"
              />
              SYSTEM_READY
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 ${
                    i < 3 ? `bg-${primaryColor}-500` : "bg-fuchsia-500"
                  } animate-pulse`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <span className="text-cyan-400/60 tracking-widest">
              DATA_STREAM_ACTIVE
              <Icon icon="pixelarticons:zap" className="inline w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Outer corner decorations */}
      <div
        className={`absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-${primaryColor}-500/40`}
      />
      <div
        className={`absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-${primaryColor}-500/40`}
      />
      <div
        className={`absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-${primaryColor}-500/40`}
      />
      <div
        className={`absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-${primaryColor}-500/40`}
      />

      {/* Pinging corner dots */}
      {[
        "top-10 left-10",
        "top-10 right-10",
        "bottom-10 left-10",
        "bottom-10 right-10",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-3 h-3 ${
            i % 2 === 0 ? `bg-${primaryColor}-500` : "bg-cyan-500"
          } animate-ping`}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
