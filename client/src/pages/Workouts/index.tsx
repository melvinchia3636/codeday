import {
  WorkoutsAnimationsProvider,
  useWorkoutsAnimationRefs,
} from "./contexts/WorkoutsAnimationsContext";
import { WorkoutsProvider } from "../../contexts/WorkoutsContext";
import { PageDecorationsProvider } from "../../contexts/PageDecorationsContext";
import { PageHeader } from "../../components/PageHeader";
import { StatsCards } from "./components/StatsCards";
import { WorkoutTypes } from "./components/WorkoutTypes";
import { WorkoutHistory } from "./components/WorkoutHistory";
import { LogWorkout } from "./components/LogWorkout";
import { PageDecorations } from "../../components/PageDecorations";

function WorkoutsContent() {
  const { containerRef } = useWorkoutsAnimationRefs();

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-8 border-pink-500 p-6 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-linear-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations />
      <PageHeader
        icon="pixelarticons:human-run"
        title="WORKOUT_LOG"
        status="SESSION: ACTIVE"
        color="pink"
      />
      <StatsCards />
      <WorkoutTypes />
      <div className="relative z-10 flex-1 grid grid-cols-2 gap-6 overflow-hidden">
        <WorkoutHistory />
        <LogWorkout />
      </div>
    </div>
  );
}

export function Workouts() {
  return (
    <WorkoutsProvider>
      <PageDecorationsProvider color="pink">
        <WorkoutsAnimationsProvider>
          <WorkoutsContent />
        </WorkoutsAnimationsProvider>
      </PageDecorationsProvider>
    </WorkoutsProvider>
  );
}
