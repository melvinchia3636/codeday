import { useRef, useState } from "react";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageDecorations } from "../../components/PageDecorations";
import { PageHeader } from "../../components/PageHeader";
import { ProfileAvatar } from "./components/ProfileAvatar";
import { UserInfoCards } from "./components/UserInfoCards";
import { SettingsPanel } from "./components/SettingsPanel";
import { TargetsPanel } from "./components/TargetsPanel";
import { WaifuPanel } from "./components/WaifuPanel";
import { ActionButtons } from "./components/ActionButtons";
import { useUserProfile } from "../../contexts/UserProfileContext";
import { useAuth } from "../../contexts/AuthContext";
import {
  ProfileAnimationsProvider,
  useProfileAnimationRefs,
} from "./contexts/ProfileAnimationsContext";
import {
  AuthLoadingOverlay,
  AuthSuccessModal,
} from "../../components/AuthFeedback";

function ProfileContent() {
  const { isLoading, userDataError, settingsError, saveProfile } =
    useUserProfile();
  const { user } = useAuth();
  const { containerRef } = useProfileAnimationRefs();

  const error = userDataError || settingsError;

  const [showSaveOverlay, setShowSaveOverlay] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const saveCompleteRef = useRef(false);

  const handleSave = async () => {
    setShowSaveOverlay(true);
    saveCompleteRef.current = false;

    try {
      await saveProfile();
      saveCompleteRef.current = true;
    } catch (err) {
      console.error("Failed to save profile:", err);
      saveCompleteRef.current = false;
      setShowSaveOverlay(false);
    }
  };

  const handleLoadingComplete = () => {
    setShowSaveOverlay(false);
    if (saveCompleteRef.current) {
      setShowSuccess(true);
    }
  };

  const handleSuccessDismiss = () => {
    setShowSuccess(false);
  };

  const waifuProfile = {
    id: "waifu_001",
    name: "ARIA-7",
    yandere_level: "medium" as "none" | "low" | "medium" | "high",
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950">
        <div className="text-pink-500 text-xl tracking-widest animate-pulse">
          LOADING_PROFILE...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center bg-zinc-950">
        <div className="text-red-500 text-xl tracking-widest">
          ERROR: {error instanceof Error ? error.message : "Failed to load"}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-8 border-pink-500 p-6 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-linear-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0, perspective: "1500px" }}
    >
      <PageDecorations />
      <PageHeader
        icon="pixelarticons:user"
        title="OPERATOR_PROFILE"
        status={`ID: ${user?.id}`}
        color="pink"
      />
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 overflow-auto">
        <div className="col-span-4 flex flex-col gap-6">
          <ProfileAvatar />
          <UserInfoCards />
        </div>
        <SettingsPanel />
        <div className="col-span-4 flex flex-col gap-6">
          <TargetsPanel />
          <WaifuPanel
            name={waifuProfile.name}
            yandereLevel={waifuProfile.yandere_level}
          />
        </div>
      </div>
      <ActionButtons onSave={handleSave} />
      <AuthLoadingOverlay
        isVisible={showSaveOverlay}
        message="SAVING_PROFILE_DATA..."
        onComplete={handleLoadingComplete}
      />
      <AuthSuccessModal
        isVisible={showSuccess}
        onConfirm={handleSuccessDismiss}
        title="PROFILE_UPDATED"
        message="Your neural profile has been synchronized successfully."
        buttonText="CONTINUE"
        color="cyan"
      />
    </div>
  );
}

export function Profile() {
  return (
    <PageDecorationsProvider color="pink">
      <ProfileAnimationsProvider>
        <ProfileContent />
      </ProfileAnimationsProvider>
    </PageDecorationsProvider>
  );
}
