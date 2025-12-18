import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { animate, stagger, random } from "animejs";

export interface ConfirmModalConfig {
  /** Title displayed at the top */
  title: string;
  /** Main message/question */
  message: string;
  /** Secondary message (optional) */
  subMessage?: string;
  /** Status badge text */
  statusText?: string;
  /** Icon for the modal center */
  icon: string;
  /** Confirm button text */
  confirmText: string;
  /** Cancel button text */
  cancelText?: string;
  /** Color theme: 'danger' for logout-style, 'warning' for reset-style */
  theme?: "danger" | "warning";
  /** Bottom left warning text */
  warningText?: string;
  /** Bottom right warning text */
  irreversibleText?: string;
}

interface ConfirmModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  isLoading?: boolean;
  config: ConfirmModalConfig;
}

const themes = {
  danger: {
    primary: "pink",
    accent: "amber",
    glow: "rgba(236,72,153,",
    iconGlow: "rgba(245,158,11,0.8)",
    radialGlow: "rgba(239,68,68,0.15)",
  },
  warning: {
    primary: "cyan",
    accent: "amber",
    glow: "rgba(34,211,238,",
    iconGlow: "rgba(34,211,238,0.8)",
    radialGlow: "rgba(34,211,238,0.15)",
  },
};

export function ConfirmModal({
  isVisible,
  onConfirm,
  onCancel,
  isLoading = false,
  config,
}: ConfirmModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const warningBarsRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);

  const theme = themes[config.theme || "danger"];
  const isPrimary = config.theme === "warning" ? "cyan" : "pink";
  const isAccent = "amber";

  useEffect(() => {
    if (!isVisible) return;

    if (particlesRef.current) {
      particlesRef.current.innerHTML = "";
      for (let i = 0; i < 25; i++) {
        const particle = document.createElement("div");
        const isWarning = Math.random() > 0.5;
        particle.className = `absolute rounded-full ${
          isWarning ? `bg-${isAccent}-500` : `bg-${isPrimary}-500`
        }`;
        const size = random(2, 4);
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.opacity = "0";
        particlesRef.current.appendChild(particle);
      }
    }

    if (overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 400,
        ease: "outQuad",
      });
    }

    if (modalRef.current) {
      animate(modalRef.current, {
        opacity: [0, 1],
        translateY: [60, 0],
        scale: [0.9, 1.02, 1],
        duration: 600,
        ease: "outElastic(1, 0.7)",
      });
    }

    if (iconRef.current) {
      animate(iconRef.current, {
        scale: [0, 1.3, 1],
        rotate: [0, -10, 10, -5, 5, 0],
        duration: 800,
        delay: 200,
        ease: "outElastic(1, 0.5)",
      });
    }

    if (warningBarsRef.current) {
      const bars = warningBarsRef.current.querySelectorAll(".warning-bar");
      animate(bars, {
        scaleX: [0, 1],
        opacity: [0, 1, 0.7],
        duration: 500,
        delay: stagger(80),
        ease: "outExpo",
      });
    }

    if (particlesRef.current) {
      animate(particlesRef.current.children, {
        opacity: [0, 0.8, 0],
        translateY: () => random(-80, 80),
        translateX: () => random(-40, 40),
        scale: [0, 1, 0],
        duration: 2500,
        delay: stagger(50, { from: "random" }),
        loop: true,
        ease: "outQuad",
      });
    }

    const glitchInterval = setInterval(() => {
      if (glitchRef.current) {
        animate(glitchRef.current, {
          translateX: [
            { to: random(-3, 3), duration: 30 },
            { to: random(-2, 2), duration: 30 },
            { to: 0, duration: 30 },
          ],
          skewX: [
            { to: random(-1, 1), duration: 30 },
            { to: 0, duration: 30 },
          ],
          ease: "linear",
        });
      }
    }, 2500);

    return () => clearInterval(glitchInterval);
  }, [isVisible, isPrimary, isAccent]);

  if (!isVisible) return null;

  const primaryColor =
    config.theme === "warning" ? "text-cyan-400" : "text-pink-400";
  const primaryBorder =
    config.theme === "warning" ? "border-cyan-500" : "border-pink-500";
  const primaryBg = config.theme === "warning" ? "bg-cyan-500" : "bg-pink-500";

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-md"
      style={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && !isLoading && onCancel()}
    >
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, ${theme.radialGlow} 0%, transparent 50%)`,
        }}
      />

      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div
          className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_20px,rgba(239,68,68,1)_20px,rgba(239,68,68,1)_40px)]"
          style={{ animation: "slide 2s linear infinite" }}
        />
      </div>

      <div
        className={`absolute inset-0 bg-[linear-gradient(rgba(${
          config.theme === "warning" ? "34,211,238" : "236,72,153"
        },0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(${
          config.theme === "warning" ? "34,211,238" : "236,72,153"
        },0.02)_1px,transparent_1px)] bg-size-[25px_25px]`}
      />

      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      <div
        ref={warningBarsRef}
        className="absolute top-0 left-0 right-0 flex flex-col gap-1 p-2"
      >
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="warning-bar h-0.5 bg-linear-to-r from-transparent via-amber-500/60 to-transparent"
            style={{ transform: "scaleX(0)", transformOrigin: "center" }}
          />
        ))}
      </div>

      <div
        ref={modalRef}
        className={`relative bg-zinc-900/95 border-2 ${primaryBorder}/60 p-10 max-w-xl w-full mx-4`}
        style={{
          opacity: 0,
          boxShadow: `0 0 50px ${theme.glow}0.3), 0 0 100px rgba(239,68,68,0.15), inset 0 0 30px ${theme.glow}0.1)`,
        }}
      >
        <div
          className={`absolute inset-0 border-2 ${primaryBorder}/30 animate-pulse`}
          style={{ animationDuration: "1.5s" }}
        />

        <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-amber-500/80" />
        <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-amber-500/80" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-amber-500/80" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-amber-500/80" />

        <div
          className={`absolute top-0 left-0 w-full h-1 bg-linear-to-r from-amber-500 via-${isPrimary}-500 to-amber-500 animate-pulse`}
        />

        <div className="relative w-24 h-24 mx-auto mb-6">
          <div
            className={`absolute inset-0 border-2 ${primaryBorder}/30 rounded-full animate-ping`}
            style={{ animationDuration: "2s" }}
          />
          <div
            className="absolute inset-2 border-2 border-amber-500/30 rounded-full animate-ping"
            style={{ animationDuration: "2.5s", animationDelay: "0.5s" }}
          />

          <div
            ref={iconRef}
            className={`relative z-10 w-full h-full flex items-center justify-center bg-linear-to-br from-${isPrimary}-500/20 to-amber-500/20 border-2 ${primaryBorder} rounded-full`}
            style={{
              transform: "scale(0)",
              boxShadow: `0 0 30px ${theme.glow}0.5), 0 0 60px rgba(245,158,11,0.3), inset 0 0 20px ${theme.glow}0.2)`,
            }}
          >
            <Icon
              icon={config.icon}
              className={`w-12 h-12 ${primaryColor}`}
              style={{ filter: `drop-shadow(0 0 10px ${theme.iconGlow})` }}
            />
          </div>

          <div
            className={`absolute inset-0 ${primaryBg}/20 rounded-full blur-xl animate-pulse`}
          />
        </div>

        {config.statusText && (
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 border border-amber-500/50 bg-amber-500/10">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <span className="text-amber-400 text-xs tracking-[0.3em] uppercase">
                {config.statusText}
              </span>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
            </div>
          </div>
        )}

        <div ref={glitchRef}>
          <h2
            className={`text-2xl font-bold tracking-[0.15em] ${primaryColor} text-center mb-2 flex items-center justify-center gap-3`}
            style={{
              textShadow: `0 0 25px ${theme.glow}0.8), 0 0 50px ${theme.glow}0.4)`,
            }}
          >
            <Icon icon={config.icon} className="w-6 h-6" />
            {config.title}
            <Icon icon={config.icon} className="w-6 h-6" />
          </h2>
        </div>

        <div className="flex items-center justify-center gap-2 mb-5">
          <div className={`w-12 h-px ${primaryBg}/50`} />
          <Icon
            icon="pixelarticons:alert"
            className="w-4 h-4 text-amber-500 animate-pulse"
          />
          <div className={`w-12 h-px ${primaryBg}/50`} />
        </div>

        <p className="text-zinc-300 text-center tracking-wide mb-8 text-sm leading-relaxed">
          {config.message}
          {config.subMessage && (
            <>
              <br />
              <span className="text-amber-400/80 text-xs">
                {config.subMessage}
              </span>
            </>
          )}
        </p>

        <div className="flex gap-4">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="group relative flex-1 py-4 bg-zinc-800/80 border-2 border-zinc-600 text-zinc-300 font-bold tracking-widest uppercase overflow-hidden transition-all hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center gap-2">
              <Icon icon="pixelarticons:close" className="w-5 h-5" />
              {config.cancelText || "CANCEL"}
            </span>
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="group relative flex-1 py-4 bg-linear-to-r from-pink-600 via-red-500 to-pink-600 text-white font-bold tracking-widest uppercase overflow-hidden transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              boxShadow: "0 0 30px rgba(236,72,153,0.4)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s linear infinite",
            }}
          >
            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center justify-center gap-2">
              {isLoading ? (
                <>
                  <Icon
                    icon="pixelarticons:loader"
                    className="w-5 h-5 animate-spin"
                  />
                  LOADING...
                </>
              ) : (
                <>
                  <Icon icon={config.icon} className="w-5 h-5" />
                  {config.confirmText}
                </>
              )}
            </span>
          </button>
        </div>

        <div className="mt-6 flex items-center justify-between text-[10px]">
          <span className="text-amber-400/60 tracking-widest">
            <Icon
              icon="pixelarticons:warning"
              className="inline w-3 h-3 mr-1"
            />
            {config.warningText || "WARNING"}
          </span>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-1.5 h-1.5 ${
                  i < 3 ? primaryBg : "bg-amber-500"
                } animate-pulse`}
                style={{ animationDelay: `${i * 100}ms` }}
              />
            ))}
          </div>
          <span className="text-pink-400/60 tracking-widest">
            {config.irreversibleText || "IRREVERSIBLE"}
            <Icon icon="pixelarticons:alert" className="inline w-3 h-3 ml-1" />
          </span>
        </div>
      </div>

      <div
        className={`absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 ${primaryBorder}/40`}
      />
      <div
        className={`absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 ${primaryBorder}/40`}
      />
      <div
        className={`absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 ${primaryBorder}/40`}
      />
      <div
        className={`absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 ${primaryBorder}/40`}
      />

      {[
        "top-10 left-10",
        "top-10 right-10",
        "bottom-10 left-10",
        "bottom-10 right-10",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-2 h-2 ${
            i % 2 === 0 ? primaryBg : "bg-amber-500"
          } animate-ping`}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes slide {
          0% { transform: translateX(-40px); }
          100% { transform: translateX(40px); }
        }
      `}</style>
    </div>
  );
}
