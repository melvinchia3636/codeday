import { Header } from "./components/Header";
import { UserProfile } from "./components/UserProfile";
import { WorkoutCard } from "./components/WorkoutCard";
import { DietCard } from "./components/DietCard";
import { WaterCard } from "./components/WaterCard";
import { ActivityTimeline } from "./components/ActivityTimeline";
import { VitalsPanel } from "./components/VitalsPanel";
import { ObjectivesPanel } from "./components/ObjectivesPanel";
import { WaifuPanel } from "./components/WaifuPanel";
import { DashboardDecorations } from "./components/DashboardDecorations";
import { BottomBar } from "./components/BottomBar";
import {
  DashboardAnimationsProvider,
  useDashboardAnimationRefs,
} from "./contexts/DashboardAnimationsContext";

function DashboardContent() {
  const {
    containerRef,
    mainPanelRef,
    headerRef,
    cardsContainerRef,
    timelinePanelRef,
    waifuPanelRef,
  } = useDashboardAnimationRefs();

  return (
    <div
      ref={containerRef}
      className="dashboard-border flex-1 flex-col flex gap-4 border-8 border-pink-500 p-4 shadow-[0_0_30px_rgba(236,72,153,0.5)] relative overflow-hidden"
      style={{ opacity: 0, perspective: "1500px" }}
    >
      <DashboardDecorations />
      <section className="flex-1 flex gap-4 relative z-30">
        <section
          ref={mainPanelRef}
          className="border-4 border-pink-500 w-8/12 bg-linear-to-br from-zinc-900/95 via-zinc-950/95 to-fuchsia-950/40 p-6 relative overflow-hidden flex flex-col backdrop-blur-sm shadow-[0_0_40px_rgba(236,72,153,0.3)]"
          style={{ opacity: 0 }}
        >
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.3)_1px,transparent_1px)] bg-size-[20px_20px]" />
          <div className="absolute inset-0 border-2 border-pink-500/20 m-2 pointer-events-none" />
          <div
            ref={headerRef}
            className="relative z-10 flex justify-between items-start mb-6"
            style={{ opacity: 0 }}
          >
            <Header />
            <UserProfile />
          </div>
          <div
            ref={cardsContainerRef}
            className="relative z-10 flex gap-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="stat-card" style={{ opacity: 0 }}>
                <WorkoutCard />
              </div>
              <div className="stat-card" style={{ opacity: 0 }}>
                <DietCard />
              </div>
              <div className="stat-card" style={{ opacity: 0 }}>
                <WaterCard />
              </div>
            </div>
          </div>
          <div
            ref={timelinePanelRef}
            className="relative z-10 mt-4 flex gap-4 flex-1"
            style={{ opacity: 0 }}
          >
            <ActivityTimeline />
            <VitalsPanel />
            <ObjectivesPanel />
          </div>
          <div className="absolute bottom-4 left-6 right-6 h-px bg-linear-to-r from-transparent via-pink-500/50 to-transparent" />
        </section>
        <section
          ref={waifuPanelRef}
          className="w-4/12 flex"
          style={{ opacity: 0 }}
        >
          <WaifuPanel />
        </section>
      </section>

      <BottomBar />
    </div>
  );
}

export function Dashboard() {
  return (
    <DashboardAnimationsProvider>
      <DashboardContent />
    </DashboardAnimationsProvider>
  );
}
