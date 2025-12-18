import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../../../contexts/AuthContext";
import { ConfirmModal } from "../../../../components/ConfirmModal";
import { logoutModalConfig } from "../../../../components/confirmModalConfigs";
import { useDashboardAnimationRefs } from "../../contexts/DashboardAnimationsContext";
import LogoutButton from "./components/LogoutButton";
import NavigationIcons from "./components/NavigationIcons";
import SystemStatus from "./components/SystemStatus";
import { BugReportModal } from "../../../../components/BugReportButton";

export function BottomBar() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const { bottomBarRef } = useDashboardAnimationRefs();
  const [showBugModal, setShowBugModal] = useState(false);

  return (
    <>
      <section
        ref={bottomBarRef}
        className="p-2 px-4 flex items-center justify-between border-4 border-pink-500 relative overflow-hidden bg-zinc-900/80 backdrop-blur-sm"
        style={{ opacity: 0 }}
      >
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.3)_1px,transparent_1px)] bg-size-[15px_15px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-500" />
        <LogoutButton onLogout={() => setShowLogoutModal(true)} />
        <NavigationIcons />
        <SystemStatus setShowBugModal={setShowBugModal} />
      </section>
      <ConfirmModal
        isVisible={showLogoutModal}
        onCancel={() => setShowLogoutModal(false)}
        onConfirm={() => {
          logout();
          navigate("/login");
        }}
        config={logoutModalConfig}
      />
      <BugReportModal
        isOpen={showBugModal}
        onClose={() => setShowBugModal(false)}
      />
    </>
  );
}
