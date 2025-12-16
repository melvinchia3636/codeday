import { useRef, useEffect, type ReactNode } from "react";
import { Icon } from "@iconify/react";
import { animate } from "animejs";
import { BackToDashboardButton } from "./BackToDashboardButton";

interface PageHeaderProps {
  /** Icon name from iconify (e.g., "pixelarticons:human-run") */
  icon: string;
  /** Page title (e.g., "WORKOUT_LOG") */
  title: string;
  /** Status content displayed on the right side */
  status?: ReactNode;
  /** Color theme: 'pink' (default) or 'cyan' */
  color?: "pink" | "cyan";
}

/**
 * Reusable page header component for sub-pages.
 * Includes back button, title with icon, optional status, and entrance animation.
 */
export function PageHeader({
  icon,
  title,
  status,
  color = "pink",
}: PageHeaderProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  const isPink = color === "pink";

  // Title gradient based on theme
  const titleGradient = isPink
    ? "from-pink-400 via-fuchsia-400 to-cyan-400"
    : "from-cyan-400 via-pink-400 to-cyan-400";

  // Icon color based on theme
  const iconColor = isPink ? "text-pink-500" : "text-cyan-500";

  // Status text color based on theme
  const statusColor = isPink ? "text-pink-400/60" : "text-cyan-400/60";

  // Header entrance animation
  useEffect(() => {
    if (headerRef.current) {
      animate(headerRef.current, {
        opacity: [0, 1],
        translateY: [-30, 0],
        duration: 800,
        delay: 200,
        ease: "outExpo",
      });
    }
  }, []);

  return (
    <div
      ref={headerRef}
      className="relative z-10 flex items-center justify-between mb-6"
      style={{ opacity: 0 }}
    >
      <BackToDashboardButton color={color} />
      <h1
        className={`text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-linear-to-r ${titleGradient} flex items-center gap-3`}
      >
        <Icon icon={icon} className={`w-8 h-8 ${iconColor}`} />
        {title}
      </h1>
      {status && (
        <div className={`text-xs ${statusColor} tracking-wider`}>{status}</div>
      )}
    </div>
  );
}
