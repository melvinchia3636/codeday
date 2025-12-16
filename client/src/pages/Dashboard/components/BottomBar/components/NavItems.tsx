import { Icon } from "@iconify/react";
import { Link } from "react-router";

export default function NavItem({
  icon,
  label,
  path,
  color,
}: {
  icon: string;
  label: string;
  path: string;
  color: "pink" | "cyan";
}) {
  const isPink = color === "pink";
  const borderColor = isPink ? "border-pink-500/30" : "border-cyan-500/30";
  const hoverBorder = isPink
    ? "hover:border-pink-500"
    : "hover:border-cyan-500";
  const hoverShadow = isPink
    ? "hover:shadow-[0_0_25px_rgba(236,72,153,0.5),inset_0_0_15px_rgba(236,72,153,0.2)]"
    : "hover:shadow-[0_0_25px_rgba(34,211,238,0.5),inset_0_0_15px_rgba(34,211,238,0.2)]";
  const hoverText = isPink
    ? "group-hover:text-pink-400"
    : "group-hover:text-cyan-400";
  const hoverGlow = isPink
    ? "group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)]"
    : "group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]";
  const gradientFrom = isPink ? "from-pink-500/10" : "from-cyan-500/10";

  return (
    <Link
      to={path}
      className={`relative flex flex-col items-center justify-center w-16 h-14 bg-linear-to-b from-zinc-800/80 to-zinc-900/80 border-2 ${borderColor} ${hoverBorder} ${hoverShadow} transition-all duration-300 group overflow-hidden`}
      title={label}
    >
      <div
        className={`absolute inset-0 bg-linear-to-t ${gradientFrom} to-transparent opacity-0 group-hover:opacity-100 transition-opacity`}
      />
      <Icon
        icon={icon}
        className={`relative z-10 w-6 h-6 text-zinc-400 ${hoverText} ${hoverGlow} transition-all duration-300`}
      />
      <span
        className={`text-[7px] text-zinc-500 ${hoverText} tracking-widest mt-1 transition-colors`}
      >
        {label}
      </span>
    </Link>
  );
}
