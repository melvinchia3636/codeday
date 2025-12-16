import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface WaterLog {
  id: number;
  amount: number;
  time: string;
}

interface WaterLogsProps {
  historyRef: RefObject<HTMLDivElement | null>;
  logs: WaterLog[];
}

export function WaterLogs({ historyRef, logs }: WaterLogsProps) {
  return (
    <div
      ref={historyRef}
      className="col-span-4 bg-zinc-900/80 border-2 border-cyan-500/50 p-5 backdrop-blur-sm overflow-auto"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-cyan-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-cyan-500/30 pb-2">
        <Icon icon="pixelarticons:clock" className="w-5 h-5" />
        TODAY'S_LOGS
      </h3>
      <div className="space-y-3">
        {logs.map((log) => (
          <div
            key={log.id}
            className="log-item p-3 bg-zinc-800/50 border border-cyan-500/20 hover:border-pink-400/40 transition-all flex items-center gap-4"
            style={{ opacity: 0 }}
          >
            <Icon icon="pixelarticons:drop" className="w-6 h-6 text-cyan-500" />
            <div className="flex-1">
              <p className="text-lg font-bold text-white">{log.amount} ml</p>
              <p className="text-xs text-cyan-400/60">{log.time}</p>
            </div>
            <div className="w-24 h-2 bg-zinc-700 relative overflow-hidden rounded">
              <div
                className="h-full bg-gradient-to-r from-cyan-500 to-pink-500"
                style={{ width: `${(log.amount / 500) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
