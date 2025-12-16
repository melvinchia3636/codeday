import {
  WorkoutsAnimationsProvider,
  useWorkoutsAnimationRefs,
} from "./contexts/WorkoutsAnimationsContext";
import { WorkoutsProvider } from "../../contexts/WorkoutsContext";
import { PageDecorations } from "./components/PageDecorations";
import { PageHeader } from "./components/PageHeader";
import { StatsCards } from "./components/StatsCards";
import { WorkoutTypes } from "./components/WorkoutTypes";
import { WorkoutHistory } from "./components/WorkoutHistory";
import { LogWorkout } from "./components/LogWorkout";

function WorkoutsContent() {
  const { containerRef } = useWorkoutsAnimationRefs();

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-[8px] border-pink-500 p-6 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <PageDecorations />
      <PageHeader />
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
      <WorkoutsAnimationsProvider>
        <WorkoutsContent />
      </WorkoutsAnimationsProvider>
    </WorkoutsProvider>
  );
}
