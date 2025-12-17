import { Icon } from "@iconify/react";
import { useNavigate } from "react-router";
import NavItem from "./NavItems";

const leftNavItems = [
  { icon: "pixelarticons:home", label: "HOME", path: "/" },
  { icon: "pixelarticons:user", label: "PROFILE", path: "/profile" },
  { icon: "pixelarticons:human-run", label: "WORKOUTS", path: "/workouts" },
];

const rightNavItems = [
  { icon: "pixelarticons:drop", label: "HYDRATION", path: "/hydration" },
  { icon: "pixelarticons:coin", label: "NUTRITION", path: "/nutrition" },
  { icon: "pixelarticons:chart", label: "ACTIVITY", path: "/activity" },
];

export default function NavigationIcons() {
  const navigate = useNavigate();

  return (
    <div className="relative z-10 flex items-center gap-3">
      {leftNavItems.map((app, i) => (
        <NavItem key={i} {...app} color="pink" />
      ))}

      <button
        onClick={() => navigate("/chat")}
        className="relative mx-6 cursor-pointer group"
      >
        <div className="absolute -inset-4 bg-linear-to-r from-pink-500/20 via-fuchsia-500/30 to-cyan-500/20 rounded-full blur-xl animate-pulse group-hover:from-pink-500/30 group-hover:via-fuchsia-500/40 group-hover:to-cyan-500/30 transition-all" />
        <div className="absolute -inset-2 border-2 border-pink-500/30 rounded-full animate-spin-slow" />
        <div className="relative w-14 h-14 bg-linear-to-br from-zinc-800 to-zinc-900 border-2 border-pink-500 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.5),inset_0_0_20px_rgba(236,72,153,0.3)] group-hover:shadow-[0_0_40px_rgba(236,72,153,0.7),inset_0_0_25px_rgba(236,72,153,0.4)] transition-all group-hover:scale-105">
          <Icon
            icon="pixelarticons:message"
            className="w-7 h-7 text-pink-400 drop-shadow-[0_0_10px_rgba(236,72,153,1)] group-hover:text-pink-300 transition-colors"
          />
        </div>
      </button>

      {rightNavItems.map((app, i) => (
        <NavItem key={i} {...app} color="cyan" />
      ))}
    </div>
  );
}
