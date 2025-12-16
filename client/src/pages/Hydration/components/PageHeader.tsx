import type { RefObject } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";

interface PageHeaderProps {
  headerRef: RefObject<HTMLDivElement | null>;
  totalWater: number;
  targetWater: number;
}

export function PageHeader({
  headerRef,
  totalWater,
  targetWater,
}: PageHeaderProps) {
  return (
    <div
      ref={headerRef}
      className="relative z-10 flex items-center justify-between mb-6"
      style={{ opacity: 0 }}
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-cyan-400 hover:text-pink-400 transition-colors"
      >
        <Icon icon="pixelarticons:arrow-left" className="w-5 h-5" />
        <span className="tracking-widest text-sm">DASHBOARD</span>
      </Link>
      <h1 className="text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400 flex items-center gap-3">
        <Icon icon="pixelarticons:drop" className="w-8 h-8 text-cyan-500" />
        HYDRATION_LOG
      </h1>
      <div className="text-xs text-cyan-400/60 tracking-wider">
        {totalWater} / {targetWater} ML
      </div>
    </div>
  );
}
