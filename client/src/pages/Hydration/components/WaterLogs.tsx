import { useEffect, useRef, useState, useMemo } from "react";
import { Icon } from "@iconify/react";
import { animate } from "animejs";
import { useHydrationAnimationRefs } from "../contexts/HydrationAnimationsContext";
import { useHydration } from "../../../contexts/HydrationContext";

export function WaterLogs() {
  const { historyRef } = useHydrationAnimationRefs();
  const { logs } = useHydration();

  const logsContainerRef = useRef<HTMLDivElement>(null);
  const [animatedIds, setAnimatedIds] = useState<Set<string | number>>(
    new Set()
  );

  const displayLogs = useMemo(
    () =>
      logs.map((log) => ({
        id: log.id,
        amount: log.amountMl,
        time: new Date(log.timestamp).toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
      })),
    [logs]
  );

  useEffect(() => {
    if (!logsContainerRef.current || displayLogs.length === 0) return;

    const newLogIds = displayLogs
      .filter((log) => !animatedIds.has(log.id))
      .map((log) => log.id);

    if (newLogIds.length === 0) return;

    requestAnimationFrame(() => {
      if (!logsContainerRef.current) return;

      newLogIds.forEach((id) => {
        const item = logsContainerRef.current?.querySelector(
          `[data-log-id="${id}"]`
        );
        if (item) {
          animate(item, {
            opacity: [0, 1],
            translateX: [-20, 0],
            scale: [0.9, 1],
            duration: 400,
            ease: "outExpo",
          });
        }
      });

      setAnimatedIds((prev) => {
        const next = new Set(prev);
        newLogIds.forEach((id) => next.add(id));
        return next;
      });
    });
  }, [displayLogs, animatedIds]);

  useEffect(() => {
    if (displayLogs.length === 0) {
      setAnimatedIds(new Set());
    }
  }, [displayLogs.length]);

  return (
    <div
      ref={historyRef}
      className="col-span-4 min-h-0 bg-zinc-900/80 border-2 border-cyan-500/50 p-5 flex flex-col backdrop-blur-sm"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-cyan-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-cyan-500/30 pb-2">
        <Icon icon="pixelarticons:clock" className="w-5 h-5" />
        TODAY'S_LOGS
      </h3>
      <div ref={logsContainerRef} className="space-y-3 min-h-0 overflow-auto">
        {displayLogs.length === 0 ? (
          <div className="text-center text-cyan-400/50 py-8">
            <Icon
              icon="pixelarticons:drop"
              className="w-12 h-12 mx-auto mb-2 opacity-30"
            />
            <p className="text-sm tracking-widest">NO_LOGS_TODAY</p>
          </div>
        ) : (
          displayLogs.map((log) => (
            <div
              key={log.id}
              data-log-id={log.id}
              className="log-item p-3 bg-zinc-800/50 border border-cyan-500/20 hover:border-pink-400/40 transition-all flex items-center gap-4"
              style={{ opacity: animatedIds.has(log.id) ? 1 : 0 }}
            >
              <Icon
                icon="pixelarticons:drop"
                className="w-6 h-6 text-cyan-500"
              />
              <div className="flex-1">
                <p className="text-lg font-bold text-white">{log.amount} ml</p>
                <p className="text-xs text-cyan-400/60">{log.time}</p>
              </div>
              <div className="w-24 h-2 bg-zinc-700 relative overflow-hidden rounded">
                <div
                  className="h-full bg-linear-to-r from-cyan-500 to-pink-500"
                  style={{
                    width: `${Math.min((log.amount / 500) * 100, 100)}%`,
                  }}
                />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
