import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface TimelineItem {
  id: number;
  type: string;
  title: string;
  desc: string;
  time: string;
  icon: string;
  color: string;
}

interface ActivityTimelineProps {
  timelineRef: RefObject<HTMLDivElement | null>;
  items: TimelineItem[];
}

export function ActivityTimeline({
  timelineRef,
  items,
}: ActivityTimelineProps) {
  return (
    <div
      ref={timelineRef}
      className="col-span-7 bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
        <Icon icon="pixelarticons:timeline" className="w-5 h-5" />
        TODAY'S_TIMELINE
      </h3>
      <div className="relative pl-8">
        <div
          className="timeline-line absolute left-3 top-0 bottom-0 w-0.5 bg-zinc-600 origin-top"
          style={{ transform: "scaleY(0)" }}
        />
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="timeline-item relative flex items-start gap-4"
              style={{ opacity: 0 }}
            >
              <div
                className={`absolute left-[-26px] w-4 h-4 rounded-full bg-${item.color}-500 border-2 border-zinc-900 shadow-[0_0_10px_rgba(236,72,153,0.5)]`}
              />
              <div
                className={`flex-1 p-3 bg-zinc-800/50 border border-${item.color}-500/30 hover:border-${item.color}-400/60 transition-all`}
              >
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <Icon
                      icon={item.icon}
                      className={`w-5 h-5 text-${item.color}-500`}
                    />
                    <span className="font-bold text-white">{item.title}</span>
                  </div>
                  <span className="text-xs text-pink-400/60">{item.time}</span>
                </div>
                <p className="text-sm text-zinc-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
