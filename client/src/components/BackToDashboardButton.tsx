import { Link } from "react-router";
import { Icon } from "@iconify/react";

/**
 * Reusable back to dashboard navigation link
 * Used across all page headers for consistent navigation
 */
export function BackToDashboardButton({
  color = "pink",
}: {
  /** Color theme: 'pink' (default) or 'cyan' */
  color?: "pink" | "cyan";
}) {
  const colorClasses =
    color === "cyan"
      ? "text-cyan-400 hover:text-pink-400"
      : "text-pink-400 hover:text-cyan-400";

  return (
    <Link
      to="/"
      className={`flex p-2 items-center gap-2 transition-colors ${colorClasses}`}
    >
      <Icon icon="pixelarticons:arrow-left" className="w-5 h-5" />
      <span className="tracking-widest text-sm">RETURN_TO_DASHBOARD</span>
    </Link>
  );
}
