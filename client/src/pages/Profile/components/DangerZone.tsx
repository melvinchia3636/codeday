import { useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { useAuth } from "../../../contexts/AuthContext";
import { useProfileAnimationRefs } from "../contexts/ProfileAnimationsContext";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { deleteAccountModalConfig } from "../../../components/confirmModalConfigs";
import { auth } from "../../../lib/auth";

export function DangerZone() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { dangerZoneRef } = useProfileAnimationRefs();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await auth.deleteAccount();
      logout();
      setShowDeleteModal(false);
      navigate("/login");
    } catch (error) {
      console.error("Failed to delete account:", error);
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        ref={dangerZoneRef}
        className="bg-zinc-900/80 border-2 border-red-500/50 p-6 backdrop-blur-sm relative overflow-hidden group shadow-[0_0_20px_rgba(239,68,68,0.2)]"
        style={{ opacity: 0 }}
      >
        {/* Animated hazard stripes background */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `repeating-linear-gradient(
                45deg,
                transparent,
                transparent 10px,
                rgba(239,68,68,0.3) 10px,
                rgba(239,68,68,0.3) 20px
              )`,
            }}
          />
        </div>

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            background:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(239,68,68,0.1) 2px, rgba(239,68,68,0.1) 4px)",
          }}
        />

        {/* Warning bar at top */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-red-500 via-amber-500 to-red-500" />

        {/* Grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(239,68,68,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(239,68,68,0.03)_1px,transparent_1px)] bg-size-[20px_20px]" />

        <div className="relative z-10">
          {/* Header */}
          <h3 className="text-xl font-bold text-red-400 tracking-[0.2em] mb-4 flex items-center gap-3 border-b border-red-500/30 pb-3">
            <div className="relative">
              <Icon
                icon="pixelarticons:warning-box"
                className="w-6 h-6 animate-pulse"
              />
              <div className="absolute inset-0 bg-red-500/50 blur-md animate-pulse" />
            </div>
            <span className="relative">DANGER_ZONE</span>
            <div className="flex-1 flex justify-end gap-1">
              {[...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 bg-red-500 animate-pulse"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </h3>

          {/* Warning message */}
          <div className="mb-4 p-3 bg-red-950/30 border border-red-500/30 relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-red-500" />
            <p className="text-xs text-red-400/80 tracking-wider pl-4 flex items-start gap-2">
              <Icon
                icon="pixelarticons:alert"
                className="w-4 h-4 mt-0.5 shrink-0"
              />
              <span>
                CRITICAL OPERATIONS ZONE. Actions performed here are{" "}
                <span className="text-red-300 font-bold">IRREVERSIBLE</span> and
                may result in permanent data loss.
              </span>
            </p>
          </div>

          {/* Delete account section */}
          <div className="p-4 bg-zinc-800/50 border border-red-500/30 relative">
            <div className="text-center mb-4">
              <p className="text-sm font-bold text-red-400 tracking-wider flex items-center justify-center gap-2 mb-2">
                <Icon icon="pixelarticons:trash" className="w-4 h-4" />
                TERMINATE_ACCOUNT
              </p>
              <p className="text-xs text-zinc-500 tracking-wide">
                Permanently delete your operator profile and all associated
                data.
              </p>
            </div>

            <button
              onClick={handleDeleteClick}
              className="w-full px-6 py-3 bg-red-950/30 border border-red-500/50 text-red-400 font-bold tracking-widest uppercase text-sm transition-all hover:border-red-500 hover:bg-red-900/40 hover:text-red-300 flex items-center justify-center gap-2"
            >
              <Icon icon="pixelarticons:trash" className="w-5 h-5" />
              DELETE_ACCOUNT
            </button>

            {/* Bottom warning text */}
            <div className="mt-3 pt-3 border-t border-red-500/20 flex items-center justify-center gap-2">
              <Icon
                icon="pixelarticons:shield"
                className="w-3 h-3 text-red-500/50"
              />
              <p className="text-[10px] text-red-500/50 tracking-widest uppercase">
                This action cannot be undone
              </p>
              <Icon
                icon="pixelarticons:shield"
                className="w-3 h-3 text-red-500/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* CSS Keyframes */}
      <style>{`
        @keyframes slide {
          from {
            transform: translateX(-20px);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes shimmer {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(100%);
          }
        }
        @keyframes borderGlow {
          0%, 100% {
            filter: hue-rotate(0deg) brightness(1);
          }
          50% {
            filter: hue-rotate(30deg) brightness(1.2);
          }
        }
        @keyframes pulseGlow {
          0%, 100% {
            opacity: 0.3;
          }
          50% {
            opacity: 0.6;
          }
        }
      `}</style>

      <ConfirmModal
        isVisible={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        config={deleteAccountModalConfig}
        isLoading={isDeleting}
      />
    </>
  );
}
