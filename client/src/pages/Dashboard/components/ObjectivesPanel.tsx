import { Icon } from "@iconify/react";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";

export function ObjectivesPanel() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const objectives = [
    { label: "10K STEPS", done: true },
    { label: "LOG 3 MEALS", done: true },
    { label: "DRINK 3L WATER", done: false },
    { label: "30MIN CARDIO", done: true },
  ];

  useEffect(() => {
    if (titleRef.current) {
      animate(titleRef.current, {
        opacity: [0, 1],
        translateY: [-10, 0],
        duration: 600,
        delay: 350,
        ease: "outExpo",
      });
      const icon = titleRef.current.querySelector(".title-icon");
      if (icon)
        animate(icon, {
          scale: [1, 1.2, 1],
          duration: 2000,
          ease: "inOutSine",
          loop: true,
        });
    }

    if (itemsRef.current) {
      const items = itemsRef.current.querySelectorAll(".objective-item");
      animate(items, {
        opacity: [0, 1],
        translateX: [-20, 0],
        scale: [0.9, 1],
        delay: stagger(150, { start: 500 }),
        duration: 500,
        ease: "outBack",
      });

      setTimeout(() => {
        items.forEach((item, i) => {
          if (objectives[i].done) {
            animate(item, {
              boxShadow: [
                "0 0 0 transparent",
                "0 0 15px rgba(236,72,153,0.3)",
                "0 0 0 transparent",
              ],
              duration: 2000,
              delay: i * 200,
              ease: "inOutSine",
              loop: true,
            });
          }
        });
      }, 1200);

      const checkboxes = itemsRef.current.querySelectorAll(".checkbox-icon");
      checkboxes.forEach((checkbox, i) => {
        if (objectives[i].done) {
          animate(checkbox, {
            scale: [1, 1.3, 1],
            rotate: [0, 5, -5, 0],
            duration: 2000,
            delay: i * 300,
            ease: "inOutSine",
            loop: true,
          });
        } else {
          animate(checkbox, {
            opacity: [0.6, 1, 0.6],
            duration: 1500,
            ease: "inOutSine",
            loop: true,
          });
        }
      });
    }

    if (progressBarRef.current) {
      animate(progressBarRef.current, {
        scaleX: [0, 0.75],
        duration: 1500,
        delay: 800,
        ease: "outExpo",
      });
    }

    if (containerRef.current) {
      animate(containerRef.current, {
        borderColor: [
          "rgba(236,72,153,0.3)",
          "rgba(168,85,247,0.4)",
          "rgba(236,72,153,0.3)",
        ],
        duration: 5000,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-48 bg-zinc-900/50 border border-pink-500/30 p-4 relative overflow-hidden backdrop-blur-sm"
    >
      <div
        ref={titleRef}
        className="text-xs text-pink-400 tracking-widest mb-3 flex items-center gap-2 relative z-10"
        style={{ opacity: 0 }}
      >
        <Icon icon="pixelarticons:checklist" className="title-icon w-4 h-4" />{" "}
        OBJECTIVES
      </div>
      <div className="mb-3 h-1 bg-zinc-800 overflow-hidden relative z-10">
        <div
          ref={progressBarRef}
          className="h-full bg-gradient-to-r from-pink-500 via-fuchsia-500 to-pink-400 origin-left"
          style={{ transform: "scaleX(0)" }}
        ></div>
      </div>
      <div ref={itemsRef} className="space-y-2 relative z-10">
        {objectives.map((goal, i) => (
          <div
            key={i}
            className={`objective-item flex items-center gap-2 text-xs p-1.5 ${
              goal.done
                ? "bg-pink-500/10 border border-pink-500/30"
                : "bg-zinc-800/30 border border-zinc-700/50"
            }`}
            style={{ opacity: 0 }}
          >
            <span
              className={`checkbox-icon ${
                goal.done ? "text-pink-400" : "text-zinc-600"
              }`}
            >
              {goal.done ? (
                <Icon
                  icon="pixelarticons:checkbox-on"
                  className="w-4 h-4 drop-shadow-[0_0_5px_rgba(236,72,153,0.8)]"
                />
              ) : (
                <Icon icon="pixelarticons:checkbox" className="w-4 h-4" />
              )}
            </span>
            <span className={goal.done ? "text-pink-300" : "text-zinc-500"}>
              {goal.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
