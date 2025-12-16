import { useRef } from "react";
import { useWorkoutsAnimations } from "./hooks/useWorkoutsAnimations";
import { PageDecorations } from "./components/PageDecorations";
import { PageHeader } from "./components/PageHeader";
import { StatsCards } from "./components/StatsCards";
import { WorkoutTypes } from "./components/WorkoutTypes";
import { WorkoutHistory } from "./components/WorkoutHistory";
import { LogWorkout } from "./components/LogWorkout";

const workoutTypes = [
  {
    id: "stretch",
    icon: "pixelarticons:human",
    label: "STRETCH",
    color: "cyan",
  },
  {
    id: "walking",
    icon: "pixelarticons:human-run",
    label: "WALKING",
    color: "pink",
  },
  {
    id: "running",
    icon: "pixelarticons:speed-fast",
    label: "RUNNING",
    color: "fuchsia",
  },
  {
    id: "swimming",
    icon: "pixelarticons:drop",
    label: "SWIMMING",
    color: "cyan",
  },
  {
    id: "strength",
    icon: "pixelarticons:trophy",
    label: "STRENGTH",
    color: "pink",
  },
];

const workoutHistory = [
  {
    id: 1,
    type: "running",
    duration: 45,
    calories: 420,
    effort: 85,
    date: "2024-12-16 08:30",
  },
  {
    id: 2,
    type: "strength",
    duration: 60,
    calories: 380,
    effort: 90,
    date: "2024-12-15 17:00",
  },
  {
    id: 3,
    type: "walking",
    duration: 30,
    calories: 150,
    effort: 40,
    date: "2024-12-15 07:00",
  },
  {
    id: 4,
    type: "stretch",
    duration: 20,
    calories: 60,
    effort: 25,
    date: "2024-12-14 22:00",
  },
  {
    id: 5,
    type: "swimming",
    duration: 40,
    calories: 350,
    effort: 75,
    date: "2024-12-14 11:00",
  },
];

const stats = [
  { label: "TOTAL_WORKOUTS", value: "156", icon: "pixelarticons:chart-bar" },
  { label: "CALORIES_BURNED", value: "48.5K", icon: "pixelarticons:coin" },
  { label: "TOTAL_DURATION", value: "72h", icon: "pixelarticons:clock" },
  { label: "AVG_EFFORT", value: "78%", icon: "pixelarticons:zap" },
];

export function Workouts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const logFormRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useWorkoutsAnimations({
    containerRef,
    headerRef,
    statsRef,
    historyRef,
    typesRef,
    logFormRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
  });

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-[8px] border-pink-500 p-6 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
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

      <PageHeader headerRef={headerRef} />
      <StatsCards statsRef={statsRef} stats={stats} />
      <WorkoutTypes typesRef={typesRef} types={workoutTypes} />

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-6 overflow-hidden">
        <WorkoutHistory
          historyRef={historyRef}
          workoutTypes={workoutTypes}
          workoutHistory={workoutHistory}
        />
        <LogWorkout logFormRef={logFormRef} workoutTypes={workoutTypes} />
      </div>
    </div>
  );
}
