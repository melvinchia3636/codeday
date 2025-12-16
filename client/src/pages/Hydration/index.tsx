import { useRef } from "react";
import { useHydrationAnimations } from "./hooks/useHydrationAnimations";
import { PageDecorations } from "./components/PageDecorations";
import { PageHeader } from "./components/PageHeader";
import { WaterTank } from "./components/WaterTank";
import { StatsGrid } from "./components/StatsGrid";
import { WaterLogs } from "./components/WaterLogs";
import { QuickAdd } from "./components/QuickAdd";

const waterLogs = [
  { id: 1, amount: 500, time: "08:00" },
  { id: 2, amount: 250, time: "10:30" },
  { id: 3, amount: 500, time: "12:15" },
  { id: 4, amount: 350, time: "14:45" },
  { id: 5, amount: 400, time: "17:00" },
];

const quickAmounts = [100, 250, 350, 500];

export function Hydration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tankRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useHydrationAnimations({
    containerRef,
    headerRef,
    tankRef,
    statsRef,
    historyRef,
    logRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
    bubblesRef,
  });

  const totalWater = waterLogs.reduce((s, l) => s + l.amount, 0);
  const targetWater = 3000;
  const percentage = Math.min((totalWater / targetWater) * 100, 100);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-[8px] border-cyan-500 p-6 shadow-[0_0_30px_rgba(34,211,238,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-cyan-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations
        particlesRef={particlesRef}
        gridRef={gridRef}
        scanlineRef={scanlineRef}
        topLineRef={topLineRef}
        bottomLineRef={bottomLineRef}
        orbsRef={orbsRef}
        cornersRef={cornersRef}
      />

      <PageHeader
        headerRef={headerRef}
        totalWater={totalWater}
        targetWater={targetWater}
      />

      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        <div className="col-span-4 flex flex-col items-center justify-center">
          <WaterTank
            tankRef={tankRef}
            bubblesRef={bubblesRef}
            percentage={percentage}
          />
          <StatsGrid
            statsRef={statsRef}
            totalWater={totalWater}
            targetWater={targetWater}
            logsCount={waterLogs.length}
          />
        </div>

        <WaterLogs historyRef={historyRef} logs={waterLogs} />
        <QuickAdd logRef={logRef} quickAmounts={quickAmounts} />
      </div>
    </div>
  );
}
