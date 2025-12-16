import type { RefObject } from "react";
import { Icon } from "@iconify/react";

interface QuickAddProps {
  logRef: RefObject<HTMLDivElement | null>;
  quickAmounts: number[];
}

export function QuickAdd({ logRef, quickAmounts }: QuickAddProps) {
  return (
    <div
      ref={logRef}
      className="col-span-4 bg-zinc-900/80 border-2 border-cyan-500/50 p-5 backdrop-blur-sm flex flex-col"
      style={{ opacity: 0 }}
    >
      <h3 className="text-lg font-bold text-cyan-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-cyan-500/30 pb-2">
        <Icon icon="pixelarticons:plus" className="w-5 h-5" />
        QUICK_ADD
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {quickAmounts.map((amount) => (
          <button
            key={amount}
            className="p-4 bg-cyan-500/10 border-2 border-cyan-500/40 text-cyan-400 font-bold tracking-widest hover:bg-cyan-500/20 hover:border-cyan-400 transition-all flex flex-col items-center gap-1"
          >
            <Icon icon="pixelarticons:drop" className="w-8 h-8" />
            <span>{amount} ml</span>
          </button>
        ))}
      </div>
      <div className="mt-auto">
        <label className="text-xs text-cyan-400/70 tracking-widest mb-2 block">
          CUSTOM_AMOUNT (ML)
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            defaultValue={250}
            className="flex-1 bg-zinc-800/80 border border-cyan-500/40 px-4 py-3 text-white focus:outline-none focus:border-cyan-400"
          />
          <button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-pink-500 text-white font-bold tracking-widest hover:shadow-[0_0_30px_rgba(34,211,238,0.6)] transition-all">
            <Icon icon="pixelarticons:plus" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
