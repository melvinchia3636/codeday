import { useRef } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useHydrationAnimations } from "./hooks/useHydrationAnimations";

const waterLogs = [
  { id: 1, amount: 500, time: "08:00" },
  { id: 2, amount: 250, time: "10:30" },
  { id: 3, amount: 500, time: "12:15" },
  { id: 4, amount: 350, time: "14:45" },
  { id: 5, amount: 400, time: "17:00" },
];

const quickAmounts = [100, 250, 350, 500];

export function Hydration() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const tankRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<HTMLDivElement>(null);

  useHydrationAnimations({
    containerRef,
    headerRef,
    tankRef,
    statsRef,
    historyRef,
    logRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
    bubblesRef,
  });

  const totalWater = waterLogs.reduce((s, l) => s + l.amount, 0);
  const targetWater = 3000;
  const percentage = Math.min((totalWater / targetWater) * 100, 100);

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-[8px] border-cyan-500 p-6 shadow-[0_0_30px_rgba(34,211,238,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-cyan-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.2)_1px,transparent_1px)] bg-[size:40px_40px] z-0"
        style={{ opacity: 0 }}
      />
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-pink-500/30 to-transparent pointer-events-none z-50"
      />
      <div
        ref={topLineRef}
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-pink-500 to-cyan-500 z-10 origin-left"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-cyan-500 to-pink-500 z-10 origin-right"
        style={{ transform: "scaleX(0)" }}
      />

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full blur-3xl pointer-events-none z-0 ${
            i % 2 === 0
              ? "w-64 h-64 bg-cyan-500/20"
              : "w-48 h-48 bg-pink-500/20"
          }`}
          style={{ left: `${(i * 22) % 100}%`, top: `${(i * 28 + 10) % 100}%` }}
        />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) cornersRef.current[i] = el;
          }}
          className={`absolute ${i < 2 ? "top-4" : "bottom-4"} ${
            i % 2 === 0 ? "left-4" : "right-4"
          } w-8 h-8 border-${i % 2 === 0 ? "l" : "r"}-4 border-${
            i < 2 ? "t" : "b"
          }-4 border-cyan-500 z-20`}
          style={{ opacity: 0 }}
        />
      ))}

      <div
        ref={headerRef}
        className="relative z-10 flex items-center justify-between mb-6"
        style={{ opacity: 0 }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-cyan-400 hover:text-pink-400 transition-colors"
        >
          <Icon icon="pixelarticons:arrow-left" className="w-5 h-5" />
          <span className="tracking-widest text-sm">DASHBOARD</span>
        </Link>
        <h1 className="text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-pink-400 to-cyan-400 flex items-center gap-3">
          <Icon icon="pixelarticons:drop" className="w-8 h-8 text-cyan-500" />
          HYDRATION_LOG
        </h1>
        <div className="text-xs text-cyan-400/60 tracking-wider">
          {totalWater} / {targetWater} ML
        </div>
      </div>

      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* Water Tank */}
        <div className="col-span-4 flex flex-col items-center justify-center">
          <div
            ref={tankRef}
            className="relative w-48 h-72 border-4 border-cyan-500 bg-zinc-900/80 rounded-b-3xl overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.3)]"
            style={{ opacity: 0 }}
          >
            <div
              ref={bubblesRef}
              className="absolute inset-0 pointer-events-none z-10"
            />
            <div
              className="water-level absolute bottom-0 left-0 right-0 bg-gradient-to-t from-cyan-500 via-cyan-400/80 to-cyan-300/60"
              style={{ height: "0%" }}
            >
              <div className="absolute top-0 left-0 right-0 h-2 bg-cyan-200/50 animate-[wave_2s_ease-in-out_infinite]" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="text-center">
                <p className="text-4xl font-bold text-white drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]">
                  {Math.round(percentage)}%
                </p>
                <p className="text-xs text-cyan-400/80 tracking-widest mt-1">
                  HYDRATED
                </p>
              </div>
            </div>
            {[25, 50, 75].map((level) => (
              <div
                key={level}
                className="absolute left-0 right-0 border-t border-cyan-500/30 flex items-center"
                style={{ bottom: `${level}%` }}
              >
                <span className="text-[10px] text-cyan-400/50 ml-1">
                  {level}%
                </span>
              </div>
            ))}
          </div>
          <div
            ref={statsRef}
            className="mt-6 grid grid-cols-2 gap-3 w-full max-w-xs"
          >
            {[
              {
                label: "TODAY",
                value: `${totalWater}ml`,
                icon: "pixelarticons:drop",
              },
              {
                label: "REMAINING",
                value: `${targetWater - totalWater}ml`,
                icon: "pixelarticons:drop-half",
              },
              {
                label: "LOGS",
                value: waterLogs.length,
                icon: "pixelarticons:chart-bar",
              },
              {
                label: "INTERVAL",
                value: "45min",
                icon: "pixelarticons:clock",
              },
            ].map((s, i) => (
              <div
                key={i}
                className="stat-card bg-zinc-900/80 border border-cyan-500/40 p-3 backdrop-blur-sm"
                style={{ opacity: 0 }}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Icon icon={s.icon} className="w-4 h-4 text-cyan-500" />
                  <span className="text-[10px] text-cyan-400/60 tracking-widest">
                    {s.label}
                  </span>
                </div>
                <p className="text-lg font-bold text-white">{s.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* History */}
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
            {waterLogs.map((log) => (
              <div
                key={log.id}
                className="log-item p-3 bg-zinc-800/50 border border-cyan-500/20 hover:border-pink-400/40 transition-all flex items-center gap-4"
                style={{ opacity: 0 }}
              >
                <Icon
                  icon="pixelarticons:drop"
                  className="w-6 h-6 text-cyan-500"
                />
                <div className="flex-1">
                  <p className="text-lg font-bold text-white">
                    {log.amount} ml
                  </p>
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

        {/* Quick Add */}
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
      </div>
    </div>
  );
}
