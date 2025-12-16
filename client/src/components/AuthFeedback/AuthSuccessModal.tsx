import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { animate, stagger, random } from "animejs";

interface AuthSuccessModalProps {
  isVisible: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
  onConfirm: () => void;
  color?: "pink" | "cyan";
}

export function AuthSuccessModal({
  isVisible,
  title = "SUCCESS",
  message = "Operation completed successfully.",
  buttonText = "PROCEED",
  onConfirm,
  color = "cyan",
}: AuthSuccessModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const dataLinesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    // Create rings
    if (ringsRef.current) {
      ringsRef.current.innerHTML = "";
      for (let i = 0; i < 5; i++) {
        const ring = document.createElement("div");
        ring.className = `absolute inset-0 border-2 ${
          color === "cyan" ? "border-cyan-500/40" : "border-pink-500/40"
        } rounded-full`;
        ring.style.transform = `scale(${1 + i * 0.4})`;
        ring.style.opacity = "0";
        ringsRef.current.appendChild(ring);
      }
    }

    // Create particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = "";
      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = `absolute rounded-full ${
          color === "cyan" ? "bg-cyan-500" : "bg-pink-500"
        }`;
        const size = random(2, 4);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${50 + (Math.random() - 0.5) * 80}%`;
        particle.style.top = `${50 + (Math.random() - 0.5) * 80}%`;
        particle.style.opacity = "0";
        particlesRef.current.appendChild(particle);
      }
    }

    // Overlay fade in
    if (overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 400,
        ease: "outQuad",
      });
    }

    // Modal entrance - dramatic scale and bounce
    if (modalRef.current) {
      animate(modalRef.current, {
        opacity: [0, 1],
        translateY: [100, 0],
        scale: [0.8, 1.02, 1],
        duration: 800,
        delay: 200,
        ease: "outElastic(1, 0.6)",
      });
    }

    // Icon animation - spin and pulse
    if (iconRef.current) {
      animate(iconRef.current, {
        scale: [0, 1.5, 1],
        rotate: [0, 720],
        duration: 1200,
        delay: 400,
        ease: "outElastic(1, 0.4)",
      });
    }

    // Ring pulse
    if (ringsRef.current) {
      animate(ringsRef.current.children, {
        scale: [1, 3],
        opacity: [0.8, 0],
        duration: 2000,
        delay: stagger(150),
        loop: true,
        ease: "outQuad",
      });
    }

    // Particles burst
    if (particlesRef.current) {
      animate(particlesRef.current.children, {
        opacity: [0, 1, 0],
        translateX: () => random(-100, 100),
        translateY: () => random(-100, 100),
        scale: [0, 1.5, 0],
        duration: 1500,
        delay: stagger(30, { from: "center" }),
        ease: "outExpo",
      });
    }

    // Data lines animation
    if (dataLinesRef.current) {
      const lines = dataLinesRef.current.querySelectorAll(".data-line");
      animate(lines, {
        scaleX: [0, 1],
        opacity: [0, 1],
        duration: 600,
        delay: stagger(100, { start: 600 }),
        ease: "outExpo",
      });
    }
  }, [isVisible, color]);

  if (!isVisible) return null;

  const colorClass = color === "cyan" ? "cyan" : "pink";
  const rgbColor = color === "cyan" ? "34,211,238" : "236,72,153";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-md"
      style={{ opacity: 0 }}
    >
      {/* Background radial glow */}
      <div
        className={`absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(${rgbColor},0.2)_0%,transparent_50%)]`}
      />

      {/* Grid pattern */}
      <div
        className={`absolute inset-0 bg-[linear-gradient(rgba(${rgbColor},0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(${rgbColor},0.03)_1px,transparent_1px)] bg-[size:30px_30px]`}
      />

      {/* Particles container */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Data stream lines */}
      <div
        ref={dataLinesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`data-line absolute h-px bg-gradient-to-r from-transparent via-${colorClass}-500/50 to-transparent`}
            style={{
              top: `${15 + i * 10}%`,
              left: "10%",
              right: "10%",
              transformOrigin: "left",
              transform: "scaleX(0)",
            }}
          />
        ))}
      </div>

      {/* Main modal */}
      <div
        ref={modalRef}
        className={`relative bg-zinc-900/95 border-2 border-${colorClass}-500/70 p-12 max-w-xl w-full mx-4`}
        style={{
          opacity: 0,
          boxShadow: `0 0 60px rgba(${rgbColor},0.4), inset 0 0 30px rgba(${rgbColor},0.1)`,
        }}
      >
        {/* Animated corner glows */}
        <div
          className={`absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-${colorClass}-500/30 to-transparent`}
        />
        <div
          className={`absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-${colorClass}-500/30 to-transparent`}
        />

        {/* Top accent line with animation */}
        <div
          className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-${colorClass}-400 to-transparent animate-pulse`}
        />

        {/* Success icon with rings */}
        <div className="relative w-28 h-28 mx-auto mb-8">
          <div ref={ringsRef} className="absolute inset-0" />
          <div
            ref={iconRef}
            className={`relative z-10 w-full h-full flex items-center justify-center bg-${colorClass}-500/20 border-3 border-${colorClass}-500 rounded-full`}
            style={{
              transform: "scale(0)",
              boxShadow: `0 0 40px rgba(${rgbColor},0.6), inset 0 0 20px rgba(${rgbColor},0.3)`,
            }}
          >
            <Icon
              icon="pixelarticons:check"
              className={`w-14 h-14 text-${colorClass}-300`}
            />
          </div>
          {/* Glow pulse behind icon */}
          <div
            className={`absolute inset-0 bg-${colorClass}-500/30 rounded-full blur-xl animate-pulse`}
          />
        </div>

        {/* Status badge */}
        <div className="flex justify-center mb-4">
          <div
            className={`inline-flex items-center gap-2 px-4 py-1 border border-${colorClass}-500/50 bg-${colorClass}-500/10`}
          >
            <div
              className={`w-2 h-2 bg-${colorClass}-400 animate-ping rounded-full`}
            />
            <span
              className={`text-${colorClass}-400 text-xs tracking-[0.3em] uppercase`}
            >
              STATUS: COMPLETE
            </span>
            <div
              className={`w-2 h-2 bg-${colorClass}-400 animate-ping rounded-full`}
            />
          </div>
        </div>

        {/* Title with glitch-style effect */}
        <h2
          className={`text-3xl font-bold tracking-[0.2em] text-${colorClass}-300 text-center mb-2 flex items-center justify-center gap-3`}
          style={{ textShadow: `0 0 30px rgba(${rgbColor},0.8)` }}
        >
          <Icon icon="pixelarticons:zap" className="w-7 h-7 animate-pulse" />
          {title}
          <Icon icon="pixelarticons:zap" className="w-7 h-7 animate-pulse" />
        </h2>

        {/* Decorative divider */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className={`w-16 h-px bg-${colorClass}-500/50`} />
          <Icon
            icon="pixelarticons:radio-signal"
            className={`w-4 h-4 text-${colorClass}-500`}
          />
          <div className={`w-16 h-px bg-${colorClass}-500/50`} />
        </div>

        {/* Message */}
        <p className="text-zinc-300 text-center tracking-wide mb-8 text-sm leading-relaxed">
          {message}
        </p>

        {/* Confirm button - extra fancy */}
        <button
          onClick={onConfirm}
          className={`group relative w-full py-5 bg-gradient-to-r from-${colorClass}-500 via-fuchsia-500 to-${colorClass}-500 text-white font-bold tracking-[0.15em] uppercase overflow-hidden transition-all hover:scale-[1.02]`}
          style={{
            boxShadow: `0 0 30px rgba(${rgbColor},0.5)`,
            backgroundSize: "200% 100%",
            animation: "shimmer 3s linear infinite",
          }}
        >
          {/* Button shine effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

          <span className="relative flex items-center justify-center gap-3">
            <Icon icon="pixelarticons:check" className="w-5 h-5" />
            {buttonText}
            <Icon icon="pixelarticons:arrow-right" className="w-5 h-5" />
          </span>
        </button>

        {/* Bottom HUD elements */}
        <div className="mt-6 flex items-center justify-between text-[10px]">
          <span className={`text-${colorClass}-400/60 tracking-widest`}>
            <Icon icon="pixelarticons:shield" className="inline w-3 h-3 mr-1" />
            VERIFIED
          </span>
          <div className="flex gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 ${
                  i < 5 ? `bg-${colorClass}-500` : `bg-${colorClass}-500/30`
                }`}
              />
            ))}
          </div>
          <span className={`text-${colorClass}-400/60 tracking-widest`}>
            SECURE
            <Icon icon="pixelarticons:lock" className="inline w-3 h-3 ml-1" />
          </span>
        </div>

        {/* Corner accents */}
        <div
          className={`absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 border-${colorClass}-400`}
        />
        <div
          className={`absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 border-${colorClass}-400`}
        />
        <div
          className={`absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 border-${colorClass}-400`}
        />
        <div
          className={`absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 border-${colorClass}-400`}
        />
      </div>

      {/* Outer corner decorations */}
      <div
        className={`absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-${colorClass}-500/40`}
      />
      <div
        className={`absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-${colorClass}-500/40`}
      />
      <div
        className={`absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-${colorClass}-500/40`}
      />
      <div
        className={`absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-${colorClass}-500/40`}
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
          className={`absolute ${pos} w-2 h-2 bg-${colorClass}-500 animate-ping`}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}

      {/* Add shimmer keyframes */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
