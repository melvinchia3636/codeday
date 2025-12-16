import type { RefObject } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

interface PageHeaderProps {
  headerRef: RefObject<HTMLDivElement | null>;
}

export function PageHeader({ headerRef }: PageHeaderProps) {
  return (
    <div
      ref={headerRef}
      className="relative z-10 flex items-center justify-between mb-6"
      style={{ opacity: 0 }}
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-pink-400 hover:text-cyan-400 transition-colors"
      >
        <Icon icon="pixelarticons:arrow-left" className="w-5 h-5" />
        <span className="tracking-widest text-sm">DASHBOARD</span>
      </Link>
      <h1 className="text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 flex items-center gap-3">
        <Icon
          icon="pixelarticons:human-run"
          className="w-8 h-8 text-pink-500"
        />
        WORKOUT_LOG
      </h1>
      <div className="text-xs text-pink-400/60 tracking-wider">
        SESSION: ACTIVE
      </div>
    </div>
  );
}
