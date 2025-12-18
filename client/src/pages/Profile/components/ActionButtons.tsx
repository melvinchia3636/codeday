import { useState } from "react";
import { useNavigate } from "react-router";
import { Icon } from "@iconify/react";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { useAuth } from "../../../contexts/AuthContext";
import { useButtonAnimations } from "../hooks/useProfileAnimations";
import { ConfirmModal } from "../../../components/ConfirmModal";
import {
  resetProfileModalConfig,
  deleteAccountModalConfig,
} from "../../../components/confirmModalConfigs";
import { auth } from "../../../lib/auth";

interface ActionButtonsProps {
  onSave: () => void;
}

export function ActionButtons({ onSave }: ActionButtonsProps) {
  const { resetForm } = useUserProfile();
  const { logout } = useAuth();
  const { handleButtonHover, handleButtonLeave } = useButtonAnimations();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const navigate = useNavigate();

  const handleResetClick = () => {
    setShowResetModal(true);
  };

  const handleResetConfirm = () => {
    resetForm();
    setShowResetModal(false);
  };

  const handleResetCancel = () => {
    setShowResetModal(false);
  };

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await auth.deleteAccount();
      logout(); // Clear the auth context state
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
      <div className="relative z-10 mt-6 flex justify-between">
        <button
          onClick={handleDeleteClick}
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="px-8 py-3 border-2 border-red-500/50 text-red-400 font-bold tracking-widest uppercase text-sm hover:border-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all flex items-center gap-2"
        >
          <Icon icon="pixelarticons:trash" className="w-5 h-5" />
          DELETE_ACCOUNT
        </button>
        <div className="flex gap-4">
          <button
            onClick={handleResetClick}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="px-8 py-3 border-2 border-pink-500/50 text-pink-400 font-bold tracking-widest uppercase text-sm hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-2"
          >
            <Icon icon="pixelarticons:close" className="w-5 h-5" />
            RESET_CHANGES
          </button>
          <button
            onClick={onSave}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="px-8 py-3 bg-linear-to-r from-pink-500 to-fuchsia-500 text-white font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all flex items-center gap-2"
          >
            <Icon icon="pixelarticons:save" className="w-5 h-5" />
            SAVE_PROFILE
          </button>
        </div>
      </div>

      <ConfirmModal
        isVisible={showResetModal}
        onConfirm={handleResetConfirm}
        onCancel={handleResetCancel}
        config={resetProfileModalConfig}
      />

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
