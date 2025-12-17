import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { animate, stagger } from "animejs";
import { useWorkoutsAnimationRefs } from "../contexts/WorkoutsAnimationsContext";
import { useWorkouts } from "../../../contexts/WorkoutsContext";
import { defaultWorkoutTypes, colorMap } from "../../../lib/workout";

export function WorkoutHistory() {
  const { historyRef } = useWorkoutsAnimationRefs();
  const {
    workoutTypes,
    filteredWorkouts,
    isLoadingWorkouts,
    selectedTypeFilter,
  } = useWorkouts();
  const prevWorkoutsLengthRef = useRef(filteredWorkouts.length);

  useEffect(() => {
    if (!historyRef.current || isLoadingWorkouts) return;

    const items = historyRef.current.querySelectorAll(".history-item");
    if (items.length === 0) return;

    const isNewItemAdded =
      filteredWorkouts.length > prevWorkoutsLengthRef.current;
    prevWorkoutsLengthRef.current = filteredWorkouts.length;

    if (isNewItemAdded) {
      const firstItem = items[0];
      if (firstItem) {
        animate(firstItem, {
          opacity: [0, 1],
          translateY: [-20, 0],
          scale: [0.9, 1],
          duration: 400,
          ease: "outBack",
        });
      }

      for (let i = 1; i < items.length; i++) {
        (items[i] as HTMLElement).style.opacity = "1";
      }
    } else {
      animate(items, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(60),
        duration: 300,
      });
    }
  }, [filteredWorkouts, isLoadingWorkouts, historyRef, selectedTypeFilter]);

  const allTypes = [
    ...defaultWorkoutTypes.map((t) => ({
      id: t.name.toLowerCase(),
      icon: t.icon,
      label: t.name,
      color: t.color,
    })),
    ...workoutTypes.map((t) => ({
      id: t.name.toLowerCase(),
      icon: t.icon,
      label: t.name,
      color: t.color,
    })),
  ];

  const findType = (typeName: string) => {
    return (
      allTypes.find((t) => t.id === typeName.toLowerCase()) || {
        id: typeName,
        icon: "pixelarticons:human",
        label: typeName,
        color: "pink",
      }
    );
  };

  const formatDate = (dateStr: string) => {
    const [datePart, timePart] = dateStr.split(" ");
    const [year, month, day] = datePart.split("-").map(Number);
    const [hour, minute] = timePart ? timePart.split(":").map(Number) : [0, 0];

    const date = new Date(year, month - 1, day, hour, minute);
    return date.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const sortedWorkouts = [...filteredWorkouts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );

  return (
    <div
      ref={historyRef}
      className="bg-zinc-900/80 border-2 min-h-0 flex flex-col border-pink-500/50 p-5 backdrop-blur-sm"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
        <Icon icon="pixelarticons:calendar" className="w-5 h-5" />
        WORKOUT_HISTORY
        <span className="ml-auto text-[10px] text-fuchsia-400/60 tracking-wider">
          {filteredWorkouts.length} RECORDS
        </span>
      </h3>

      {isLoadingWorkouts ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="p-3 bg-zinc-800/50 border border-pink-500/20 flex items-center gap-4 animate-pulse"
            >
              <div className="w-8 h-8 bg-zinc-700 rounded" />
              <div className="flex-1 space-y-2">
                <div className="w-24 h-4 bg-zinc-700 rounded" />
                <div className="w-16 h-3 bg-zinc-700 rounded" />
              </div>
              <div className="space-y-2">
                <div className="w-16 h-4 bg-zinc-700 rounded" />
                <div className="w-12 h-3 bg-zinc-700 rounded" />
              </div>
            </div>
          ))}
        </div>
      ) : sortedWorkouts.length === 0 ? (
        <div className="text-center py-8 text-pink-400/50">
          <Icon
            icon="pixelarticons:mood-sad"
            className="w-12 h-12 mx-auto mb-2"
          />
          <p className="text-sm tracking-widest">NO_WORKOUTS_LOGGED</p>
          <p className="text-xs mt-1">Start by logging your first workout!</p>
        </div>
      ) : (
        <div className="space-y-3 overflow-auto min-h-0">
          {sortedWorkouts.map((w) => {
            const type = findType(w.type);
            const typeColor = colorMap[type.color] || colorMap.pink;

            return (
              <div
                key={w.id}
                className="history-item p-3 bg-zinc-800/50 border border-pink-500/20 hover:border-cyan-400/40 transition-all flex items-center gap-4"
                style={{ opacity: 0 }}
              >
                <Icon
                  icon={type.icon}
                  className="w-8 h-8"
                  style={{ color: `${typeColor}1)` }}
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white uppercase">
                    {w.type}
                  </p>
                  <p className="text-xs text-pink-400/60">
                    {formatDate(w.timestamp)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-bold">{w.durationMin} min</p>
                  <p className="text-xs text-pink-400/60">
                    {w.caloriesBurned} kcal
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
