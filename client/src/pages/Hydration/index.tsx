import {
  HydrationAnimationsProvider,
  useHydrationAnimationRefs,
} from "./contexts/HydrationAnimationsContext";
import {
  HydrationProvider,
  useHydration,
} from "../../contexts/HydrationContext";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageDecorations } from "../../components/PageDecorations";
import { PageHeader } from "../../components/PageHeader";
import { WaterTank } from "./components/WaterTank";
import { StatsGrid } from "./components/StatsGrid";
import { WaterLogs } from "./components/WaterLogs";
import { QuickAdd } from "./components/QuickAdd";

function HydrationContent() {
  const { containerRef } = useHydrationAnimationRefs();
  const { totalWater, targetWater } = useHydration();

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-8 border-cyan-500 p-6 shadow-[0_0_30px_rgba(34,211,238,0.5)] bg-linear-to-br from-zinc-900 via-zinc-950 to-cyan-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations />
      <PageHeader
        icon="pixelarticons:drop"
        title="HYDRATION_LOG"
        status={`${totalWater} / ${targetWater} ML`}
        color="cyan"
      />
      <div className="relative min-h-0 z-10 flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        <div className="col-span-4 flex flex-col items-center justify-center">
          <WaterTank />
          <StatsGrid />
        </div>
        <WaterLogs />
        <QuickAdd />
      </div>
    </div>
  );
}

export function Hydration() {
  return (
    <HydrationProvider>
      <PageDecorationsProvider color="cyan">
        <HydrationAnimationsProvider>
          <HydrationContent />
        </HydrationAnimationsProvider>
      </PageDecorationsProvider>
    </HydrationProvider>
  );
}
