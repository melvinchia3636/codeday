import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface DailySummary {
  date: string;
  diet: number;
  hydro: number;
  effort: number;
  total: number;
  emotion: string;
}

interface HistoryCalendarProps {
  calendarRef: RefObject<HTMLDivElement | null>;
  summaries: DailySummary[];
  emotionIcons: Record<string, string>;
  emotionColors: Record<string, string>;
}

export function HistoryCalendar({
  calendarRef,
  summaries,
  emotionIcons,
  emotionColors,
}: HistoryCalendarProps) {
  return (
    <div
      ref={calendarRef}
      className="col-span-5 bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
        <Icon icon="pixelarticons:calendar" className="w-5 h-5" />
        HISTORY
      </h3>
      <div className="space-y-3">
        {summaries.map((day) => (
          <div
            key={day.date}
            className="day-cell p-3 bg-zinc-800/50 border border-pink-500/20 hover:border-cyan-400/40 transition-all flex items-center gap-4"
            style={{ opacity: 0 }}
          >
            <div className="text-center min-w-[60px]">
              <p className="text-xs text-pink-400/60">
                {new Date(day.date).toLocaleDateString("en", {
                  weekday: "short",
                })}
              </p>
              <p className="text-lg font-bold text-white">
                {new Date(day.date).getDate()}
              </p>
            </div>
            <div className="flex-1 grid grid-cols-4 gap-2">
              {[
                { v: day.diet, c: "pink" },
                { v: day.hydro, c: "cyan" },
                { v: day.effort, c: "fuchsia" },
                { v: day.total, c: "pink" },
              ].map((s, i) => (
                <div
                  key={i}
                  className="h-2 bg-zinc-700 rounded overflow-hidden"
                >
                  <div
                    className={`h-full bg-${s.c}-500`}
                    style={{ width: `${s.v}%` }}
                  />
                </div>
              ))}
            </div>
            <Icon
              icon={emotionIcons[day.emotion]}
              className={`w-6 h-6 text-${emotionColors[day.emotion]}-400`}
            />
            <span className="text-lg font-bold text-white w-12 text-right">
              {day.total}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
