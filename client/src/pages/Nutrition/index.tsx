import { useRef } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { useNutritionAnimations } from "./hooks/useNutritionAnimations";

const mealTypes = [
  {
    id: "breakfast",
    icon: "pixelarticons:sun",
    label: "BREAKFAST",
    time: "07:30",
  },
  { id: "lunch", icon: "pixelarticons:sun-alt", label: "LUNCH", time: "12:00" },
  {
    id: "dinner",
    icon: "pixelarticons:moon-stars",
    label: "DINNER",
    time: "19:00",
  },
  { id: "snack", icon: "pixelarticons:coin", label: "SNACK", time: "15:00" },
];

const todayMeals = [
  {
    id: 1,
    type: "breakfast",
    items: [
      { name: "Oatmeal", cal: 150 },
      { name: "Banana", cal: 90 },
    ],
    total: 240,
  },
  {
    id: 2,
    type: "lunch",
    items: [
      { name: "Grilled Chicken", cal: 350 },
      { name: "Brown Rice", cal: 200 },
      { name: "Salad", cal: 80 },
    ],
    total: 630,
  },
  {
    id: 3,
    type: "snack",
    items: [{ name: "Protein Bar", cal: 180 }],
    total: 180,
  },
];

const foodLibrary = [
  { id: 1, name: "Chicken Breast", cal: 165, icon: "pixelarticons:coin" },
  { id: 2, name: "Brown Rice", cal: 112, icon: "pixelarticons:coin" },
  { id: 3, name: "Broccoli", cal: 34, icon: "pixelarticons:coin" },
  { id: 4, name: "Salmon", cal: 208, icon: "pixelarticons:coin" },
  { id: 5, name: "Egg", cal: 78, icon: "pixelarticons:coin" },
  { id: 6, name: "Avocado", cal: 160, icon: "pixelarticons:coin" },
];

const macros = [
  { label: "PROTEIN", current: 95, target: 120, color: "pink", unit: "g" },
  { label: "CARBS", current: 180, target: 250, color: "cyan", unit: "g" },
  { label: "FAT", current: 55, target: 70, color: "fuchsia", unit: "g" },
];

export function Nutrition() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const macrosRef = useRef<HTMLDivElement>(null);
  const mealsRef = useRef<HTMLDivElement>(null);
  const foodsRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useNutritionAnimations({
    containerRef,
    headerRef,
    macrosRef,
    mealsRef,
    foodsRef,
    logRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
  });

  const totalCalories = todayMeals.reduce((s, m) => s + m.total, 0);
  const targetCalories = 2200;

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
          <Icon icon="pixelarticons:coin" className="w-8 h-8 text-pink-500" />
          NUTRITION_LOG
        </h1>
        <div className="text-xs text-pink-400/60 tracking-wider">
          {totalCalories} / {targetCalories} KCAL
        </div>
      </div>

      <div
        ref={macrosRef}
        className="relative z-10 flex justify-center gap-8 mb-6"
      >
        {macros.map((m, i) => (
          <div
            key={i}
            className={`macro-circle flex flex-col items-center p-4 bg-zinc-900/80 border-2 border-${m.color}-500/50 backdrop-blur-sm`}
            style={{ opacity: 0 }}
          >
            <div className="relative w-20 h-20">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  className="text-zinc-700"
                  strokeWidth="3"
                />
                <circle
                  cx="18"
                  cy="18"
                  r="15"
                  fill="none"
                  stroke="currentColor"
                  className={`text-${m.color}-500`}
                  strokeWidth="3"
                  strokeDasharray={`${(m.current / m.target) * 94} 94`}
                  strokeLinecap="round"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-lg font-bold text-white">
                  {Math.round((m.current / m.target) * 100)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-pink-400/70 tracking-widest mt-2">
              {m.label}
            </p>
            <p className="text-sm text-white font-bold">
              {m.current}/{m.target}
              {m.unit}
            </p>
          </div>
        ))}
        <div
          className="macro-circle flex flex-col items-center p-4 bg-gradient-to-br from-pink-500/20 to-cyan-500/20 border-2 border-pink-500/50 backdrop-blur-sm"
          style={{ opacity: 0 }}
        >
          <div className="relative w-20 h-20">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="currentColor"
                className="text-zinc-700"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="url(#cal-gradient)"
                strokeWidth="3"
                strokeDasharray={`${(totalCalories / targetCalories) * 94} 94`}
                strokeLinecap="round"
              />
              <defs>
                <linearGradient id="cal-gradient">
                  <stop offset="0%" stopColor="#ec4899" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-bold text-white">
                {Math.round((totalCalories / targetCalories) * 100)}%
              </span>
            </div>
          </div>
          <p className="text-xs text-pink-400/70 tracking-widest mt-2">
            CALORIES
          </p>
          <p className="text-sm text-white font-bold">
            {totalCalories}/{targetCalories}
          </p>
        </div>
      </div>

      <div className="relative z-10 flex-1 grid grid-cols-3 gap-6 overflow-hidden">
        <div
          ref={mealsRef}
          className="col-span-2 bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
          style={{ opacity: 0 }}
        >
          <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
            <Icon icon="pixelarticons:calendar" className="w-5 h-5" />
            TODAY'S_MEALS
          </h3>
          <div className="space-y-4">
            {mealTypes.map((type) => {
              const meal = todayMeals.find((m) => m.type === type.id);
              return (
                <div
                  key={type.id}
                  className="meal-item p-4 bg-zinc-800/50 border border-pink-500/20 hover:border-cyan-400/40 transition-all"
                  style={{ opacity: 0 }}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={type.icon}
                        className="w-6 h-6 text-pink-500"
                      />
                      <span className="font-bold text-white tracking-widest">
                        {type.label}
                      </span>
                      <span className="text-xs text-pink-400/60">
                        {type.time}
                      </span>
                    </div>
                    <span className="text-cyan-400 font-bold">
                      {meal?.total || 0} kcal
                    </span>
                  </div>
                  {meal ? (
                    <div className="flex flex-wrap gap-2 ml-9">
                      {meal.items.map((item, j) => (
                        <span
                          key={j}
                          className="px-2 py-1 bg-pink-500/10 border border-pink-500/30 text-xs text-pink-400"
                        >
                          {item.name} ({item.cal})
                        </span>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-pink-400/40 ml-9">
                      No items logged
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div
          ref={foodsRef}
          className="bg-zinc-900/80 border-2 border-pink-500/50 p-5 backdrop-blur-sm overflow-auto"
          style={{ opacity: 0 }}
        >
          <h3 className="text-lg font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-2 border-b border-pink-500/30 pb-2">
            <Icon icon="pixelarticons:coin" className="w-5 h-5" />
            FOOD_LIBRARY
          </h3>
          <div className="space-y-2">
            {foodLibrary.map((f) => (
              <button
                key={f.id}
                className="food-item w-full p-3 bg-zinc-800/50 border border-pink-500/20 hover:border-cyan-400/40 hover:bg-zinc-700/50 transition-all flex items-center justify-between"
                style={{ opacity: 0 }}
              >
                <span className="text-white text-sm">{f.name}</span>
                <span className="text-cyan-400 text-xs">{f.cal} kcal/100g</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
