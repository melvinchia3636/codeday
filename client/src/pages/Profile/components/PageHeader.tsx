import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useProfileAnimationRefs } from "../contexts/ProfileAnimationsContext";
import { useAuth } from "../../../contexts/AuthContext";

export function PageHeader() {
  const { user } = useAuth();
  const { headerRef } = useProfileAnimationRefs();

  return (
    <div
      ref={headerRef}
      className="relative z-10 flex items-center justify-between mb-6"
      style={{ opacity: 0 }}
    >
      <div className="flex items-center gap-4">
        <Link
          to="/"
          className="flex items-center p-2 gap-2 text-pink-400 hover:text-cyan-400 transition-colors"
        >
          <Icon icon="pixelarticons:arrow-left" className="w-6 h-6" />
          <span className="tracking-widest text-sm">RETURN_TO_DASHBOARD</span>
        </Link>
      </div>
      <h1 className="text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 flex items-center gap-3">
        <Icon icon="pixelarticons:user" className="w-8 h-8 text-pink-500" />
        OPERATOR_PROFILE
      </h1>
      <div className="text-xs text-pink-400/60 tracking-wider">
        ID: {user?.id}
      </div>
    </div>
  );
}
