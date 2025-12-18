import { useState } from "react";
import { Icon } from "@iconify/react";
import { useUserProfile } from "../../../contexts/UserProfileContext";
import { useButtonAnimations } from "../hooks/useProfileAnimations";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { resetProfileModalConfig } from "../../../components/confirmModalConfigs";

interface ActionButtonsProps {
  onSave: () => void;
}

export function ActionButtons({ onSave }: ActionButtonsProps) {
  const { resetForm } = useUserProfile();
  const { handleButtonHover, handleButtonLeave } = useButtonAnimations();
  const [showResetModal, setShowResetModal] = useState(false);

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

  return (
    <>
      <div className="relative z-10 mt-6 flex justify-end gap-4">
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

      <ConfirmModal
        isVisible={showResetModal}
        onConfirm={handleResetConfirm}
        onCancel={handleResetCancel}
        config={resetProfileModalConfig}
      />
    </>
  );
}
