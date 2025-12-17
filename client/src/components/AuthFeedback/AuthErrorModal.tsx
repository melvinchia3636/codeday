import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { animate } from "animejs";

interface AuthErrorModalProps {
  isVisible: boolean;
  title?: string;
  message?: string;
  buttonText?: string;
  onClose: () => void;
}

export function AuthErrorModal({
  isVisible,
  title = "ACCESS_DENIED",
  message = "Authentication failed. Please try again.",
  buttonText = "TRY_AGAIN",
  onClose,
}: AuthErrorModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const glitchRef = useRef<HTMLDivElement>(null);
  const warningBarsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    if (overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 200,
        ease: "outQuad",
      });
    }

    animate(".error-flash", {
      opacity: [0.5, 0],
      duration: 500,
      ease: "outQuad",
    });

    if (modalRef.current) {
      animate(modalRef.current, {
        opacity: [0, 1],
        translateX: [
          { to: -10, duration: 50 },
          { to: 10, duration: 50 },
          { to: -5, duration: 50 },
          { to: 5, duration: 50 },
          { to: 0, duration: 50 },
        ],
        scale: [0.95, 1],
        ease: "outQuad",
      });
    }

    if (iconRef.current) {
      animate(iconRef.current, {
        scale: [0, 1.3, 1],
        duration: 600,
        delay: 200,
        ease: "outElastic(1, 0.5)",
      });
    }

    if (warningBarsRef.current) {
      animate(warningBarsRef.current.children, {
        opacity: [0, 1, 0.5],
        height: ["0%", "100%"],
        duration: 800,
        delay: (_, i) => i * 100,
        ease: "outQuad",
      });
    }

    const glitchInterval = setInterval(() => {
      if (glitchRef.current) {
        animate(glitchRef.current, {
          translateX: [
            { to: -3, duration: 30 },
            { to: 3, duration: 30 },
            { to: -2, duration: 30 },
            { to: 0, duration: 30 },
          ],
          ease: "linear",
        });
      }
    }, 200);

    return () => {
      clearInterval(glitchInterval);
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-md"
      style={{ opacity: 0 }}
    >
      <div
        className="error-flash absolute inset-0 bg-red-500/30 pointer-events-none"
        style={{ opacity: 0 }}
      />

      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(239,68,68,0.05)_10px,rgba(239,68,68,0.05)_20px)]" />

      <div
        ref={warningBarsRef}
        className="absolute top-0 left-0 right-0 flex justify-center gap-4 p-4"
      >
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-16 bg-gradient-to-b from-red-500 to-red-500/30"
            style={{ opacity: 0 }}
          />
        ))}
      </div>

      <div
        ref={modalRef}
        className="relative bg-zinc-900/95 border-2 border-red-500/70 p-10 max-w-md w-full mx-4 shadow-[0_0_50px_rgba(239,68,68,0.4)]"
        style={{ opacity: 0 }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-orange-500 to-red-500 animate-pulse" />

        <div className="relative w-24 h-24 mx-auto mb-6">
          <div className="absolute inset-0 bg-red-500/20 rounded-full animate-ping" />
          <div
            ref={iconRef}
            className="relative z-10 w-full h-full flex items-center justify-center bg-red-500/20 border-2 border-red-500 rounded-full"
            style={{ transform: "scale(0)" }}
          >
            <Icon
              icon="pixelarticons:close"
              className="w-12 h-12 text-red-400"
            />
          </div>
        </div>

        <div ref={glitchRef}>
          <h2 className="text-3xl font-bold tracking-[0.3em] text-red-400 text-center mb-4 flex items-center justify-center gap-3">
            <Icon icon="pixelarticons:warning-box" className="w-6 h-6" />
            {title}
            <Icon icon="pixelarticons:warning-box" className="w-6 h-6" />
          </h2>
        </div>

        <div className="text-center mb-4">
          <span className="inline-block px-3 py-1 bg-red-500/20 border border-red-500/50 text-red-400 text-xs tracking-widest">
            ERROR_CODE: AUTH_FAILED
          </span>
        </div>

        <p className="text-zinc-300 text-center tracking-wide mb-8 text-sm">
          {message}
        </p>

        <button
          onClick={onClose}
          className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold tracking-[0.2em] uppercase hover:shadow-[0_0_30px_rgba(239,68,68,0.6)] transition-all flex items-center justify-center gap-3"
        >
          <Icon icon="pixelarticons:undo" className="w-5 h-5" />
          {buttonText}
        </button>

        <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-red-500" />
        <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-red-500" />
        <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-red-500" />
        <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-red-500" />
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex justify-center gap-4 p-4">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-16 bg-gradient-to-t from-red-500 to-red-500/30 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          />
        ))}
      </div>
    </div>
  );
}
