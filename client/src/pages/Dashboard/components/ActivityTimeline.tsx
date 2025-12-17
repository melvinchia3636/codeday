import { Icon } from "@iconify/react";
import { useEffect, useRef, useMemo, useState } from "react";
import { animate, stagger, random } from "animejs";
import {
  useWorkoutsQuery,
  useDeleteWorkoutMutation,
} from "../../../hooks/useWorkoutQueries";
import {
  useTodayMealsQuery,
  useDeleteMealMutation,
} from "../../../hooks/useMealQueries";
import {
  useTodayLogsQuery,
  useDeleteWaterLogMutation,
} from "../../../hooks/useHydrationQueries";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { deleteActivityModalConfig } from "../../../components/confirmModalConfigs";

type ActivityItem = {
  id: string;
  originalId: string;
  timestamp: Date;
  type: "workout" | "meal" | "water";
  description: string;
  value: string;
};

export function ActivityTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const dataStreamRef = useRef<HTMLDivElement>(null);

  const { data: workouts = [] } = useWorkoutsQuery();
  const { data: meals = [] } = useTodayMealsQuery();
  const { data: waterLogs = [] } = useTodayLogsQuery();

  const deleteWorkoutMutation = useDeleteWorkoutMutation();
  const deleteMealMutation = useDeleteMealMutation();
  const deleteWaterLogMutation = useDeleteWaterLogMutation();

  const [contextMenu, setContextMenu] = useState<{
    id: string;
    x: number;
    y: number;
  } | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingActivity, setDeletingActivity] = useState<ActivityItem | null>(
    null
  );

  const activities = useMemo(() => {
    const items: ActivityItem[] = [];

    workouts.forEach((w) => {
      items.push({
        id: `workout-${w.id}`,
        originalId: w.id,
        timestamp: new Date(w.timestamp),
        type: "workout",
        description: `${w.type} workout completed`,
        value: `+${w.caloriesBurned} cal`,
      });
    });

    meals.forEach((m) => {
      const mealTypeLabel = m.type.charAt(0).toUpperCase() + m.type.slice(1);
      const itemCount = m.items?.length || 0;
      items.push({
        id: `meal-${m.id}`,
        originalId: m.id,
        timestamp: new Date(m.timestamp),
        type: "meal",
        description: `${mealTypeLabel} logged (${itemCount} items)`,
        value: `logged`,
      });
    });

    waterLogs.forEach((w) => {
      items.push({
        id: `water-${w.id}`,
        originalId: w.id,
        timestamp: new Date(w.timestamp || w.timestamp || new Date()),
        type: "water",
        description: `Hydration logged`,
        value: `+${w.amountMl}ml`,
      });
    });

    return items
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, 25);
  }, [workouts, meals, waterLogs]);

  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `[${hours}:${minutes}]`;
  };

  const getTypeStyles = (type: ActivityItem["type"]) => {
    switch (type) {
      case "workout":
        return {
          border: "border-pink-500/50",
          dot: "bg-pink-500 shadow-[0_0_8px_rgba(236,72,153,0.8)]",
          value: "text-pink-500",
        };
      case "meal":
        return {
          border: "border-fuchsia-500/50",
          dot: "bg-fuchsia-500 shadow-[0_0_8px_rgba(168,85,247,0.8)]",
          value: "text-fuchsia-500",
        };
      case "water":
        return {
          border: "border-cyan-500/50",
          dot: "bg-cyan-500 shadow-[0_0_8px_rgba(34,211,238,0.8)]",
          value: "text-cyan-500",
        };
    }
  };

  const handleContextMenu = (e: React.MouseEvent, activity: ActivityItem) => {
    e.preventDefault();
    setContextMenu({ id: activity.id, x: e.clientX, y: e.clientY });
  };

  const handleCloseContextMenu = () => {
    setContextMenu(null);
  };

  const handleDeleteClick = (activity: ActivityItem) => {
    setDeletingActivity(activity);
    setShowDeleteModal(true);
    setContextMenu(null);
  };

  const handleDeleteConfirm = () => {
    if (!deletingActivity) return;

    switch (deletingActivity.type) {
      case "workout":
        deleteWorkoutMutation.mutate(deletingActivity.originalId);
        break;
      case "meal":
        deleteMealMutation.mutate(deletingActivity.originalId);
        break;
      case "water":
        deleteWaterLogMutation.mutate(deletingActivity.originalId);
        break;
    }

    setShowDeleteModal(false);
    setDeletingActivity(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setDeletingActivity(null);
  };

  useEffect(() => {
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        delay: 1200,
        ease: "outExpo",
      });
    }

    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll(".timeline-item");

      animate(items, {
        opacity: [0, 1],
        translateX: [-30, 0],
        delay: stagger(80, { start: 1400 }),
        duration: 400,
        ease: "outExpo",
      });

      const dots = itemsRef.current.querySelectorAll(".activity-dot");
      setTimeout(() => {
        animate(dots, {
          scale: [1, 1.3, 1],
          opacity: [1, 0.6, 1],
          delay: stagger(150),
          duration: 2000,
          ease: "inOutSine",
          loop: true,
        });
      }, 2500);
    }

    if (scanlineRef.current) {
      animate(scanlineRef.current, {
        translateY: ["-100%", "300%"],
        duration: 4000,
        ease: "linear",
        loop: true,
      });
    }

    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.02, 0.1, 0.02],
        duration: 4000,
        ease: "inOutSine",
        loop: true,
      });
    }

    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: 500,
          delay: 400 + i * 100,
          ease: "outBack",
        });
      }
    });

    if (dataStreamRef.current) {
      dataStreamRef.current.innerHTML = "";
      for (let i = 0; i < 6; i++) {
        const stream = document.createElement("div");
        stream.className =
          "absolute h-px bg-linear-to-r from-transparent via-pink-500/20 to-transparent";
        stream.style.width = `${random(30, 80)}%`;
        stream.style.left = `${random(-10, 50)}%`;
        stream.style.top = `${random(10, 90)}%`;
        dataStreamRef.current.appendChild(stream);

        animate(stream, {
          translateX: [0, "200%"],
          opacity: [0, 0.5, 0],
          duration: random(3000, 6000),
          ease: "linear",
          loop: true,
          delay: random(0, 2000),
        });
      }
    }

    if (containerRef.current) {
      animate(containerRef.current, {
        borderColor: [
          "rgba(236,72,153,0.3)",
          "rgba(34,211,238,0.4)",
          "rgba(236,72,153,0.3)",
        ],
        duration: 5000,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, [activities]);

  return (
    <>
      {/* Context menu backdrop */}
      {contextMenu && (
        <div
          className="fixed inset-0 z-40 w-full h-dvh top-0 left-0"
          onClick={handleCloseContextMenu}
        />
      )}

      <div
        ref={containerRef}
        className="flex-1 bg-zinc-900/50 border border-pink-500/30 p-4 relative overflow-hidden backdrop-blur-sm flex flex-col"
      >
        <div
          ref={dataStreamRef}
          className="absolute inset-0 pointer-events-none overflow-hidden"
        ></div>

        <div
          ref={scanlineRef}
          className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none z-10"
        ></div>

        <div
          ref={glowRef}
          className="absolute inset-0 bg-gradient-radial from-pink-500/10 to-transparent pointer-events-none"
        ></div>

        <div
          ref={(el) => {
            if (el) cornersRef.current[0] = el;
          }}
          className="absolute top-1 left-1 w-3 h-3 border-l border-t border-pink-500/50"
          style={{ opacity: 0 }}
        ></div>
        <div
          ref={(el) => {
            if (el) cornersRef.current[1] = el;
          }}
          className="absolute top-1 right-1 w-3 h-3 border-r border-t border-pink-500/50"
          style={{ opacity: 0 }}
        ></div>
        <div
          ref={(el) => {
            if (el) cornersRef.current[2] = el;
          }}
          className="absolute bottom-1 left-1 w-3 h-3 border-l border-b border-pink-500/50"
          style={{ opacity: 0 }}
        ></div>
        <div
          ref={(el) => {
            if (el) cornersRef.current[3] = el;
          }}
          className="absolute bottom-1 right-1 w-3 h-3 border-r border-b border-pink-500/50"
          style={{ opacity: 0 }}
        ></div>

        <div
          ref={titleRef}
          className="text-pink-400 text-xs tracking-widest mb-3 flex items-center gap-2 relative z-10"
          style={{ opacity: 0 }}
        >
          <Icon icon="pixelarticons:timeline" className="w-4 h-4" />{" "}
          ACTIVITY_STREAM
        </div>

        <div
          ref={itemsRef}
          className="space-y-2 relative z-10 overflow-y-auto flex-1"
        >
          {activities.length > 0 ? (
            activities.map((activity) => {
              const styles = getTypeStyles(activity.type);
              return (
                <div key={activity.id} className="relative">
                  <div
                    onContextMenu={(e) => handleContextMenu(e, activity)}
                    className={`timeline-item flex items-center gap-3 text-xs bg-zinc-800/30 p-1.5 border-l-2 ${styles.border} cursor-context-menu hover:bg-zinc-800/50 transition-colors`}
                    style={{ opacity: 0 }}
                  >
                    <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                      {formatTime(activity.timestamp)}
                    </span>
                    <span
                      className={`activity-dot w-2 h-2 ${styles.dot}`}
                    ></span>
                    <span className="text-zinc-400 truncate flex-1">
                      {activity.description}
                    </span>
                    <span
                      className={`activity-value ${styles.value} ml-auto whitespace-nowrap`}
                    >
                      {activity.value}
                    </span>
                  </div>

                  {/* Context menu */}
                  {contextMenu?.id === activity.id && (
                    <div
                      className="fixed bg-zinc-900 border-2 border-pink-500/50 shadow-[0_0_20px_rgba(236,72,153,0.3)] min-w-[140px] z-50"
                      style={{ left: contextMenu.x, top: contextMenu.y }}
                    >
                      <button
                        onClick={() => handleDeleteClick(activity)}
                        className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-red-500/20 flex items-center gap-2 tracking-widest"
                      >
                        <Icon icon="pixelarticons:trash" className="w-4 h-4" />
                        DELETE
                      </button>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="text-zinc-500 text-xs text-center py-4">
              No activity recorded yet
            </div>
          )}
        </div>
      </div>

      {/* Delete confirmation modal */}
      <ConfirmModal
        isVisible={showDeleteModal}
        onConfirm={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        config={deleteActivityModalConfig}
      />
    </>
  );
}
