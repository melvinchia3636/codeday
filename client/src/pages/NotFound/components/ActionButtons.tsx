import type { RefObject } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

interface ActionButtonsProps {
  buttonsRef: RefObject<HTMLDivElement | null>;
  warningBarsRef: RefObject<HTMLDivElement[]>;
  handleButtonHover: (selector: string, color: string) => void;
  handleButtonLeave: (selector: string) => void;
}

export function ActionButtons({
  buttonsRef,
  warningBarsRef,
  handleButtonHover,
  handleButtonLeave,
}: ActionButtonsProps) {
  return (
    <>
      <div
        ref={buttonsRef}
        className="flex flex-col sm:flex-row gap-5 justify-center items-center"
      >
        <Link
          to="/"
          className="action-btn home-btn group relative px-10 py-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-bold tracking-[0.2em] uppercase text-sm overflow-hidden transition-all flex items-center gap-3"
          style={{ opacity: 0 }}
          onMouseEnter={() =>
            handleButtonHover(".home-btn", "rgba(236,72,153,0.6)")
          }
          onMouseLeave={() => handleButtonLeave(".home-btn")}
        >
          <Icon icon="pixelarticons:home" className="w-5 h-5" />
          <span className="relative z-10">RETURN_HOME</span>
          <Icon icon="pixelarticons:arrow-left" className="w-5 h-5" />
          <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </Link>
        <button
          onClick={() => window.history.back()}
          className="action-btn back-btn px-10 py-4 border-2 border-pink-500/60 text-pink-400 font-bold tracking-[0.2em] uppercase text-sm hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-3"
          style={{ opacity: 0 }}
          onMouseEnter={() =>
            handleButtonHover(".back-btn", "rgba(34,211,238,0.5)")
          }
          onMouseLeave={() => handleButtonLeave(".back-btn")}
        >
          <Icon icon="pixelarticons:undo" className="w-5 h-5" />
          <span>GO_BACK</span>
        </button>
      </div>

      <div className="mt-14 flex justify-center gap-3">
        {[...Array(7)].map((_, i) => (
          <div
            key={`bar-${i}`}
            ref={(el) => {
              if (el) warningBarsRef.current[i] = el;
            }}
            className="w-1.5 h-10 bg-gradient-to-t from-pink-500/0 via-pink-500 to-pink-500/0 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
            style={{ opacity: 0 }}
          />
        ))}
      </div>
    </>
  );
}
