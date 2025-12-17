import { Icon } from "@iconify/react";
import { useEffect, useRef, useMemo } from "react";
import { animate, stagger, random } from "animejs";
import { useWorkoutsQuery } from "../../../hooks/useWorkoutQueries";
import { useTodayMealsQuery } from "../../../hooks/useMealQueries";
import { useTodayLogsQuery } from "../../../hooks/useHydrationQueries";

type ActivityItem = {
  id: string;
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

  // Combine and sort all activities
  const activities = useMemo(() => {
    const items: ActivityItem[] = [];

    // Add workouts
    workouts.forEach((w) => {
      items.push({
        id: `workout-${w.id}`,
        timestamp: new Date(w.created),
        type: "workout",
        description: `${w.type} workout completed`,
        value: `+${w.caloriesBurned} cal`,
      });
    });

    // Add meals
    meals.forEach((m) => {
      const mealTypeLabel = m.type.charAt(0).toUpperCase() + m.type.slice(1);
      const itemCount = m.items?.length || 0;
      items.push({
        id: `meal-${m.id}`,
        timestamp: new Date(m.created),
        type: "meal",
        description: `${mealTypeLabel} logged (${itemCount} items)`,
        value: `logged`,
      });
    });

    // Add water logs
    waterLogs.forEach((w) => {
      items.push({
        id: `water-${w.id}`,
        timestamp: new Date(w.timestamp || w.created || new Date()),
        type: "water",
        description: `Hydration logged`,
        value: `+${w.amountMl}ml`,
      });
    });

    // Sort by timestamp descending (newest first) and take 25
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

  useEffect(() => {
    // Title animation - wait for parent container
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateX: [-20, 0],
        duration: 600,
        delay: 1200, // Wait for parent container animation
        ease: "outExpo",
      });
    }

    // Timeline items stagger animation - wait for parent container
    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll(".timeline-item");

      animate(items, {
        opacity: [0, 1],
        translateX: [-30, 0],
        delay: stagger(80, { start: 1400 }), // Start after parent container + title
        duration: 400,
        ease: "outExpo",
      });

      // Pulse dots - start after items animate
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

    // Scanline effect
    if (scanlineRef.current) {
      animate(scanlineRef.current, {
        translateY: ["-100%", "300%"],
        duration: 4000,
        ease: "linear",
        loop: true,
      });
    }

    // Background glow
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.02, 0.1, 0.02],
        duration: 4000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Corners animation
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

    // Data stream background
    if (dataStreamRef.current) {
      // Clear existing streams
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

    // Container border animation
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
    <div
      ref={containerRef}
      className="flex-1 bg-zinc-900/50 border border-pink-500/30 p-4 relative overflow-hidden backdrop-blur-sm flex flex-col"
    >
      {/* Data streams background */}
      <div
        ref={dataStreamRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      ></div>

      {/* Scanline */}
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-0.5 bg-linear-to-r from-transparent via-cyan-500/30 to-transparent pointer-events-none z-10"
      ></div>

      {/* Background glow */}
      <div
        ref={glowRef}
        className="absolute inset-0 bg-gradient-radial from-pink-500/10 to-transparent pointer-events-none"
      ></div>

      {/* Corners */}
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
              <div
                key={activity.id}
                className={`timeline-item flex items-center gap-3 text-xs bg-zinc-800/30 p-1.5 border-l-2 ${styles.border}`}
                style={{ opacity: 0 }}
              >
                <span className="text-cyan-400 drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]">
                  {formatTime(activity.timestamp)}
                </span>
                <span className={`activity-dot w-2 h-2 ${styles.dot}`}></span>
                <span className="text-zinc-400 truncate flex-1">
                  {activity.description}
                </span>
                <span
                  className={`activity-value ${styles.value} ml-auto whitespace-nowrap`}
                >
                  {activity.value}
                </span>
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
  );
}
