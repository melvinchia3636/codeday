import { useRef } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useActivityAnimations } from "./hooks/useActivityAnimations";

const dailySummaries = [
  {
    date: "2024-12-16",
    diet: 85,
    hydro: 67,
    effort: 78,
    total: 77,
    emotion: "happy",
  },
  {
    date: "2024-12-15",
    diet: 92,
    hydro: 100,
    effort: 90,
    total: 94,
    emotion: "happy",
  },
  {
    date: "2024-12-14",
    diet: 70,
    hydro: 80,
    effort: 60,
    total: 70,
    emotion: "neutral",
  },
  {
    date: "2024-12-13",
    diet: 45,
    hydro: 40,
    effort: 30,
    total: 38,
    emotion: "tsundere",
  },
  {
    date: "2024-12-12",
    diet: 88,
    hydro: 95,
    effort: 85,
    total: 89,
    emotion: "happy",
  },
];

const activityTimeline = [
  {
    id: 1,
    type: "workout",
    title: "Running",
    desc: "45 min • 420 kcal",
    time: "08:30",
    icon: "pixelarticons:human-run",
    color: "pink",
  },
  {
    id: 2,
    type: "water",
    title: "Hydration",
    desc: "500 ml",
    time: "10:00",
    icon: "pixelarticons:drop",
    color: "cyan",
  },
  {
    id: 3,
    type: "meal",
    title: "Lunch",
    desc: "630 kcal • Chicken, Rice",
    time: "12:15",
    icon: "pixelarticons:coin",
    color: "fuchsia",
  },
  {
    id: 4,
    type: "water",
    title: "Hydration",
    desc: "350 ml",
    time: "14:45",
    icon: "pixelarticons:drop",
    color: "cyan",
  },
  {
    id: 5,
    type: "workout",
    title: "Strength Training",
    desc: "60 min • 380 kcal",
    time: "17:00",
    icon: "pixelarticons:trophy",
    color: "pink",
  },
  {
    id: 6,
    type: "meal",
    title: "Dinner",
    desc: "720 kcal • Salmon, Vegetables",
    time: "19:30",
    icon: "pixelarticons:coin",
    color: "fuchsia",
  },
  {
    id: 7,
    type: "water",
    title: "Hydration",
    desc: "400 ml",
    time: "21:00",
    icon: "pixelarticons:drop",
    color: "cyan",
  },
];

const emotionIcons: Record<string, string> = {
  happy: "pixelarticons:mood-happy",
  neutral: "pixelarticons:mood-neutral",
  tsundere: "pixelarticons:mood-sad",
  angry: "pixelarticons:mood-angry",
  yandere: "pixelarticons:heart",
};
const emotionColors: Record<string, string> = {
  happy: "cyan",
  neutral: "pink",
  tsundere: "fuchsia",
  angry: "red",
  yandere: "pink",
};

export function Activity() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const summaryRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useActivityAnimations({
    containerRef,
    headerRef,
    summaryRef,
    timelineRef,
    calendarRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
  });

  const today = dailySummaries[0];

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
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500 z-10 origin-left"
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
          }-4 border-pink-500 z-20`}
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
            icon="pixelarticons:timeline"
            className="w-8 h-8 text-pink-500"
          />
          ACTIVITY_LOG
        </h1>
        <div className="text-xs text-pink-400/60 tracking-wider">
          TODAY'S SCORE: {today.total}%
        </div>
      </div>

      {/* Today's Summary */}
      <div
        ref={summaryRef}
        className="relative z-10 grid grid-cols-5 gap-4 mb-6"
        style={{ transformStyle: "preserve-3d" }}
      >
        {[
          {
            label: "DIET_SCORE",
            value: today.diet,
            icon: "pixelarticons:coin",
            color: "pink",
          },
          {
            label: "HYDRO_SCORE",
            value: today.hydro,
            icon: "pixelarticons:drop",
            color: "cyan",
          },
          {
            label: "EFFORT_SCORE",
            value: today.effort,
            icon: "pixelarticons:zap",
            color: "fuchsia",
          },
          {
            label: "TOTAL_SCORE",
            value: today.total,
            icon: "pixelarticons:chart-bar",
            color: "pink",
          },
          {
            label: "WAIFU_MOOD",
            value: today.emotion.toUpperCase(),
            icon: emotionIcons[today.emotion],
            color: emotionColors[today.emotion],
          },
        ].map((s, i) => (
          <div
            key={i}
            className={`summary-card bg-zinc-900/80 border border-${s.color}-500/40 p-4 backdrop-blur-sm hover:border-${s.color}-400/60 transition-all`}
            style={{ opacity: 0 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Icon icon={s.icon} className={`w-5 h-5 text-${s.color}-500`} />
              <span className="text-xs text-pink-400/60 tracking-widest">
                {s.label}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">
              {typeof s.value === "number" ? `${s.value}%` : s.value}
            </p>
            {typeof s.value === "number" && (
              <div className="mt-2 h-1.5 bg-zinc-700 rounded overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r from-${s.color}-500 to-${
                    s.color === "pink"
                      ? "fuchsia"
                      : s.color === "cyan"
                      ? "pink"
                      : "cyan"
                  }-500`}
                  style={{ width: `${s.value}%` }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 overflow-hidden">
        {/* Timeline */}
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
              className="timeline-line absolute left-3 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500 via-fuchsia-500 to-cyan-500 origin-top"
              style={{ transform: "scaleY(0)" }}
            />
            <div className="space-y-4">
              {activityTimeline.map((item) => (
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
                        <span className="font-bold text-white">
                          {item.title}
                        </span>
                      </div>
                      <span className="text-xs text-pink-400/60">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* History Calendar */}
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
            {dailySummaries.map((day) => (
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
      </div>
    </div>
  );
}
