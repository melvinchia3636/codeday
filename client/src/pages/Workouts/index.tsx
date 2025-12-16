import { useRef } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useWorkoutsAnimations } from "./hooks/useWorkoutsAnimations";

const workoutTypes = [
  {
    id: "stretch",
    icon: "pixelarticons:human",
    label: "STRETCH",
    color: "cyan",
  },
  {
    id: "walking",
    icon: "pixelarticons:human-run",
    label: "WALKING",
    color: "pink",
  },
  {
    id: "running",
    icon: "pixelarticons:speed-fast",
    label: "RUNNING",
    color: "fuchsia",
  },
  {
    id: "swimming",
    icon: "pixelarticons:drop",
    label: "SWIMMING",
    color: "cyan",
  },
  {
    id: "strength",
    icon: "pixelarticons:trophy",
    label: "STRENGTH",
    color: "pink",
  },
];

const workoutHistory = [
  {
    id: 1,
    type: "running",
    duration: 45,
    calories: 420,
    effort: 85,
    date: "2024-12-16 08:30",
  },
  {
    id: 2,
    type: "strength",
    duration: 60,
    calories: 380,
    effort: 90,
    date: "2024-12-15 17:00",
  },
  {
    id: 3,
    type: "walking",
    duration: 30,
    calories: 150,
    effort: 40,
    date: "2024-12-15 07:00",
  },
  {
    id: 4,
    type: "stretch",
    duration: 20,
    calories: 60,
    effort: 25,
    date: "2024-12-14 22:00",
  },
  {
    id: 5,
    type: "swimming",
    duration: 40,
    calories: 350,
    effort: 75,
    date: "2024-12-14 11:00",
  },
];

const stats = [
  { label: "TOTAL_WORKOUTS", value: "156", icon: "pixelarticons:chart-bar" },
  { label: "CALORIES_BURNED", value: "48.5K", icon: "pixelarticons:coin" },
  { label: "TOTAL_DURATION", value: "72h", icon: "pixelarticons:clock" },
  { label: "AVG_EFFORT", value: "78%", icon: "pixelarticons:zap" },
];

export function Workouts() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const typesRef = useRef<HTMLDivElement>(null);
  const logFormRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useWorkoutsAnimations({
    containerRef,
    headerRef,
    statsRef,
    historyRef,
    typesRef,
    logFormRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
  });

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-[8px] border-pink-500 p-6 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />
      <div
        ref={gridRef}
        className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.2)_1px,transparent_1px)] bg-[size:40px_40px] z-0"
        style={{ opacity: 0 }}
      />
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent pointer-events-none z-50"
      />
      <div
        ref={topLineRef}
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500 z-10 origin-left shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 z-10 origin-right"
        style={{ transform: "scaleX(0)" }}
      />

      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full blur-3xl pointer-events-none z-0 ${
            i % 3 === 0
              ? "w-64 h-64 bg-pink-500/20"
              : i % 3 === 1
              ? "w-48 h-48 bg-cyan-500/20"
              : "w-56 h-56 bg-fuchsia-500/20"
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
          }-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]`}
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
          className="flex items-center gap-2 text-pink-400 hover:text-cyan-400 transition-colors"
        >
          <Icon icon="pixelarticons:arrow-left" className="w-5 h-5" />
          <span className="tracking-widest text-sm">DASHBOARD</span>
        </Link>
        <h1 className="text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 flex items-center gap-3">
          <Icon
            icon="pixelarticons:human-run"
            className="w-8 h-8 text-pink-500"
          />
          WORKOUT_LOG
        </h1>
        <div className="text-xs text-pink-400/60 tracking-wider">
          SESSION: ACTIVE
        </div>
      </div>

      <div
        ref={statsRef}
        className="relative z-10 grid grid-cols-4 gap-4 mb-6"
        style={{ transformStyle: "preserve-3d" }}
      >
        {stats.map((s, i) => (
          <div
            key={i}
            className="stat-card bg-zinc-900/80 border border-pink-500/40 p-4 backdrop-blur-sm hover:border-cyan-400/60 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon icon={s.icon} className="w-5 h-5 text-pink-500" />
              <span className="text-xs text-pink-400/60 tracking-widest">
                {s.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">{s.value}</p>
          </div>
        ))}
      </div>

      <div
        ref={typesRef}
        className="relative z-10 flex gap-3 mb-6 justify-center"
      >
        {workoutTypes.map((t) => (
          <button
            key={t.id}
            className={`type-btn px-6 py-3 bg-${t.color}-500/10 border border-${t.color}-500/40 text-${t.color}-400 font-bold tracking-widest text-sm hover:bg-${t.color}-500/20 hover:border-${t.color}-400 transition-all flex items-center gap-2`}
            style={{ opacity: 0 }}
          >
            <Icon icon={t.icon} className="w-5 h-5" />
            {t.label}
          </button>
        ))}
      </div>

      <div className="relative z-10 flex-1 grid grid-cols-2 gap-6 overflow-hidden">
        <div
          ref={historyRef}
          className="bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
          style={{ opacity: 0 }}
        >
          <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
            <Icon icon="pixelarticons:calendar" className="w-5 h-5" />
            WORKOUT_HISTORY
          </h3>
          <div className="space-y-3">
            {workoutHistory.map((w) => (
              <div
                key={w.id}
                className="history-item p-3 bg-zinc-800/50 border border-pink-500/20 hover:border-cyan-400/40 transition-all flex items-center gap-4"
                style={{ opacity: 0 }}
              >
                <Icon
                  icon={workoutTypes.find((t) => t.id === w.type)?.icon || ""}
                  className="w-8 h-8 text-pink-500"
                />
                <div className="flex-1">
                  <p className="text-sm font-bold text-white uppercase">
                    {w.type}
                  </p>
                  <p className="text-xs text-pink-400/60">{w.date}</p>
                </div>
                <div className="text-right">
                  <p className="text-cyan-400 font-bold">{w.duration} min</p>
                  <p className="text-xs text-pink-400/60">{w.calories} kcal</p>
                </div>
                <div className="w-16 h-2 bg-zinc-700 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-cyan-500"
                    style={{ width: `${w.effort}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div
          ref={logFormRef}
          className="bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm"
          style={{ opacity: 0 }}
        >
          <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
            <Icon icon="pixelarticons:edit" className="w-5 h-5" />
            LOG_NEW_WORKOUT
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-xs text-pink-400/70 tracking-widest mb-2 block">
                WORKOUT_TYPE
              </label>
              <select className="w-full bg-zinc-800/80 border border-pink-500/40 px-4 py-3 text-white focus:outline-none focus:border-pink-500">
                {workoutTypes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-pink-400/70 tracking-widest mb-2 block">
                  DURATION (MIN)
                </label>
                <input
                  type="number"
                  defaultValue={30}
                  className="w-full bg-zinc-800/80 border border-pink-500/40 px-4 py-3 text-white focus:outline-none focus:border-pink-500"
                />
              </div>
              <div>
                <label className="text-xs text-pink-400/70 tracking-widest mb-2 block">
                  CALORIES
                </label>
                <input
                  type="number"
                  defaultValue={200}
                  className="w-full bg-zinc-800/80 border border-pink-500/40 px-4 py-3 text-white focus:outline-none focus:border-pink-500"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-pink-400/70 tracking-widest mb-2 block">
                EFFORT_LEVEL
              </label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue={75}
                className="w-full accent-pink-500"
              />
            </div>
            <button className="w-full py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-bold tracking-widest uppercase hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all flex items-center justify-center gap-2">
              <Icon icon="pixelarticons:check" className="w-5 h-5" />
              SAVE_WORKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
