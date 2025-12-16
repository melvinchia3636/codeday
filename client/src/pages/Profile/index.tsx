import { useRef } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import {
  useProfileAnimations,
  useInputAnimations,
  useButtonAnimations,
} from "./hooks/useProfileAnimations";

// Mock data based on class diagram
const userData = {
  id: "usr_001",
  name: "OPERATOR_01",
  email: "operator@nexus.io",
  gender: "prefer_not_to_say" as const,
  dob: "1995-03-15",
  height_cm: 175,
  weight_kg: 72.5,
  get_bmi: () => 23.7,
};

const userSettings = {
  diet_calorie_target: 2200,
  hydro_target_ml: 3000,
  hydro_interval_min: 45,
  expected_meals_per_day: 4,
  timezone: "Asia/Tokyo",
};

const userTargets = {
  target_weight_kg: 70,
  target_type: "lose" as const,
};

const waifuProfile = {
  id: "waifu_001",
  name: "ARIA-7",
  yandere_level: "medium" as "none" | "low" | "medium" | "high",
};

export function Profile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const avatarRef = useRef<HTMLDivElement>(null);
  const userInfoRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);
  const targetsRef = useRef<HTMLDivElement>(null);
  const waifuRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const sideBarsRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useProfileAnimations({
    containerRef,
    headerRef,
    avatarRef,
    userInfoRef,
    settingsRef,
    targetsRef,
    waifuRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    sideBarsRef,
    particlesRef,
    scanlineRef,
    glitchOverlayRef,
    gridRef,
  });

  const { handleInputFocus, handleInputBlur } = useInputAnimations();
  const { handleButtonHover, handleButtonLeave } = useButtonAnimations();

  const genderLabels = {
    male: "MALE",
    female: "FEMALE",
    other: "OTHER",
    prefer_not_to_say: "CLASSIFIED",
  };
  const targetLabels = {
    lose: "REDUCE",
    gain: "INCREASE",
    maintain: "MAINTAIN",
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 flex flex-col border-[8px] border-pink-500 p-6 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0, perspective: "1500px" }}
    >
      {/* Background Effects */}
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
        ref={glitchOverlayRef}
        className="absolute inset-0 bg-gradient-to-r from-pink-500/20 via-transparent to-cyan-500/20 pointer-events-none z-40 mix-blend-overlay"
        style={{ opacity: 0 }}
      />

      {/* Neon Lines */}
      <div
        ref={topLineRef}
        className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500 z-10 origin-left shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ transform: "scaleX(0)" }}
      />
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 w-full h-1.5 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 z-10 origin-right shadow-[0_0_20px_rgba(34,211,238,0.8)]"
        style={{ transform: "scaleX(0)" }}
      />

      {/* Floating Orbs */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`orb-${i}`}
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
          style={{ left: `${(i * 20) % 100}%`, top: `${(i * 25 + 10) % 100}%` }}
        />
      ))}

      {/* Corner Brackets */}
      <div
        ref={(el) => {
          if (el) cornersRef.current[0] = el;
        }}
        className="absolute top-4 left-4 w-10 h-10 border-l-4 border-t-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[1] = el;
        }}
        className="absolute top-4 right-4 w-10 h-10 border-r-4 border-t-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[2] = el;
        }}
        className="absolute bottom-4 left-4 w-10 h-10 border-l-4 border-b-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[3] = el;
        }}
        className="absolute bottom-4 right-4 w-10 h-10 border-r-4 border-b-4 border-pink-500 z-20 shadow-[0_0_15px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />

      {/* Side Bars */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 space-y-2 z-10">
        {[...Array(8)].map((_, i) => (
          <div
            key={`bar-${i}`}
            ref={(el) => {
              if (el) sideBarsRef.current[i] = el;
            }}
            className={`w-1.5 ${
              i % 2 === 0 ? "h-5 bg-pink-500/70" : "h-3 bg-cyan-500/50"
            } shadow-[0_0_10px_currentColor]`}
            style={{ opacity: 0 }}
          />
        ))}
      </div>

      {/* Header */}
      <div
        ref={headerRef}
        className="relative z-10 flex items-center justify-between mb-6"
        style={{ opacity: 0 }}
      >
        <div className="flex items-center gap-4">
          <Link
            to="/"
            className="flex items-center p-2 gap-2 text-pink-400 hover:text-cyan-400 transition-colors"
          >
            <Icon icon="pixelarticons:arrow-left" className="w-6 h-6" />
            <span className="tracking-widest text-sm">RETURN_TO_DASHBOARD</span>
          </Link>
        </div>
        <h1 className="text-3xl font-bold tracking-[0.3em] text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 flex items-center gap-3">
          <Icon icon="pixelarticons:user" className="w-8 h-8 text-pink-500" />
          OPERATOR_PROFILE
        </h1>
        <div className="text-xs text-pink-400/60 tracking-wider">
          ID: {userData.id}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex-1 grid grid-cols-12 gap-6 overflow-auto">
        {/* Left Column - Avatar & User Info */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Avatar Section */}
          <div
            ref={avatarRef}
            className="bg-zinc-900/80 border-2 border-pink-500/50 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)] relative"
            style={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.1)_1px,transparent_1px)] bg-[size:15px_15px]" />
            <div className="relative flex flex-col items-center">
              <div className="w-36 h-36 rounded-full border-4 border-pink-500 bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center relative overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.5)]">
                <Icon
                  icon="pixelarticons:avatar"
                  className="w-24 h-24 text-pink-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/30 to-transparent" />
              </div>
              <h2 className="mt-4 text-2xl font-bold text-pink-400 tracking-widest">
                {userData.name}
              </h2>
              <p className="text-cyan-400/70 text-sm tracking-wider">
                {userData.email}
              </p>
              <div className="mt-4 flex gap-2">
                <span className="px-3 py-1 bg-pink-500/20 border border-pink-500/40 text-pink-400 text-xs tracking-wider">
                  LVL 42
                </span>
                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 text-xs tracking-wider">
                  ELITE
                </span>
              </div>
            </div>
          </div>

          {/* User Info Cards */}
          <div ref={userInfoRef} className="space-y-3">
            {[
              {
                icon: "pixelarticons:human",
                label: "GENDER",
                value: genderLabels[userData.gender],
              },
              {
                icon: "pixelarticons:calendar",
                label: "BIRTH_DATE",
                value: userData.dob,
              },
              {
                icon: "pixelarticons:scale",
                label: "HEIGHT",
                value: `${userData.height_cm} CM`,
              },
              {
                icon: "pixelarticons:heart",
                label: "WEIGHT",
                value: `${userData.weight_kg} KG`,
                dataValue: userData.weight_kg,
                decimal: true,
              },
              {
                icon: "pixelarticons:speed-medium",
                label: "BMI_INDEX",
                value: userData.get_bmi().toFixed(1),
                dataValue: userData.get_bmi(),
                decimal: true,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="info-card bg-zinc-900/70 border border-pink-500/30 p-4 flex items-center gap-4 backdrop-blur-sm hover:border-cyan-400/50 transition-all hover:shadow-[0_0_20px_rgba(34,211,238,0.3)]"
                style={{ opacity: 0 }}
              >
                <Icon icon={item.icon} className="w-6 h-6 text-pink-500" />
                <div className="flex-1">
                  <p className="text-xs text-pink-400/60 tracking-widest">
                    {item.label}
                  </p>
                  <p
                    className={`text-lg font-bold text-white ${
                      item.decimal ? "stat-value decimal" : ""
                    }`}
                    data-value={item.dataValue}
                  >
                    {item.value}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column - Settings */}
        <div
          ref={settingsRef}
          className="col-span-4 bg-zinc-900/80 border-2 border-pink-500/50 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)] relative"
          style={{ opacity: 0 }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
          <div className="relative">
            <h3 className="text-xl font-bold text-pink-400 tracking-[0.2em] mb-6 flex items-center gap-3 border-b border-pink-500/30 pb-3">
              <Icon icon="pixelarticons:sliders" className="w-6 h-6" />
              USER_SETTINGS
            </h3>
            <div className="space-y-5">
              {[
                {
                  icon: "pixelarticons:coin",
                  label: "CALORIE_TARGET",
                  value: userSettings.diet_calorie_target,
                  unit: "KCAL",
                  color: "pink",
                },
                {
                  icon: "pixelarticons:drop",
                  label: "HYDRATION_TARGET",
                  value: userSettings.hydro_target_ml,
                  unit: "ML",
                  color: "cyan",
                },
                {
                  icon: "pixelarticons:clock",
                  label: "HYDRO_INTERVAL",
                  value: userSettings.hydro_interval_min,
                  unit: "MIN",
                  color: "fuchsia",
                },
                {
                  icon: "pixelarticons:loader",
                  label: "MEALS_PER_DAY",
                  value: userSettings.expected_meals_per_day,
                  unit: "MEALS",
                  color: "purple",
                },
                {
                  icon: "pixelarticons:globe",
                  label: "TIMEZONE",
                  value: userSettings.timezone,
                  unit: "",
                  color: "cyan",
                },
              ].map((item, i) => (
                <div key={i} className="setting-item" style={{ opacity: 0 }}>
                  <label className="flex items-center gap-2 text-xs text-pink-400/70 tracking-widest mb-2">
                    <Icon
                      icon={item.icon}
                      className={`w-4 h-4 text-${item.color}-400`}
                    />
                    {item.label}
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type={typeof item.value === "number" ? "number" : "text"}
                      defaultValue={item.value}
                      onFocus={handleInputFocus}
                      onBlur={handleInputBlur}
                      className="flex-1 bg-zinc-800/80 border border-pink-500/40 px-4 py-2.5 text-white focus:outline-none transition-all"
                    />
                    {item.unit && (
                      <span className="text-pink-400/60 text-xs tracking-wider w-12">
                        {item.unit}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Targets & Waifu */}
        <div className="col-span-4 flex flex-col gap-6">
          {/* Targets Panel */}
          <div
            ref={targetsRef}
            className="bg-zinc-900/80 border-2 border-pink-500/50 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)] relative"
            style={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="relative">
              <h3 className="text-xl font-bold text-pink-400 tracking-[0.2em] mb-6 flex items-center gap-3 border-b border-pink-500/30 pb-3">
                <Icon icon="pixelarticons:target" className="w-6 h-6" />
                WEIGHT_TARGETS
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-zinc-800/50 border border-pink-500/30">
                  <span className="text-sm text-pink-400/70 tracking-wider">
                    CURRENT
                  </span>
                  <span className="text-2xl font-bold text-white">
                    {userData.weight_kg}{" "}
                    <span className="text-sm text-pink-400">KG</span>
                  </span>
                </div>
                <div className="flex items-center justify-center">
                  <Icon
                    icon="pixelarticons:arrow-down"
                    className={`w-8 h-8 ${
                      userTargets.target_type === "lose"
                        ? "text-cyan-400"
                        : userTargets.target_type === "gain"
                        ? "text-pink-400 rotate-180"
                        : "text-fuchsia-400"
                    }`}
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 border border-cyan-500/50">
                  <span className="text-sm text-cyan-400/70 tracking-wider">
                    TARGET
                  </span>
                  <span className="text-2xl font-bold text-cyan-400">
                    {userTargets.target_weight_kg}{" "}
                    <span className="text-sm">KG</span>
                  </span>
                </div>
                <div className="flex justify-center">
                  <span
                    className={`px-4 py-2 text-sm font-bold tracking-wider ${
                      userTargets.target_type === "lose"
                        ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/50"
                        : userTargets.target_type === "gain"
                        ? "bg-pink-500/20 text-pink-400 border border-pink-500/50"
                        : "bg-fuchsia-500/20 text-fuchsia-400 border border-fuchsia-500/50"
                    }`}
                  >
                    MODE: {targetLabels[userTargets.target_type]}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Waifu Panel */}
          <div
            ref={waifuRef}
            className="flex-1 bg-zinc-900/80 border-2 border-pink-500/50 p-6 backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)] relative"
            style={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-[size:20px_20px]" />
            <div className="relative h-full flex flex-col">
              <h3 className="text-xl font-bold text-pink-400 tracking-[0.2em] mb-4 flex items-center gap-3 border-b border-pink-500/30 pb-3">
                <Icon icon="pixelarticons:mood-happy" className="w-6 h-6" />
                WAIFU_PROFILE
              </h3>
              <div className="flex-1 flex flex-col gap-3">
                <div className="p-3 bg-zinc-800/50 border border-pink-500/30">
                  <p className="text-xs text-pink-400/60 tracking-widest mb-1">
                    DESIGNATION
                  </p>
                  <p className="text-lg font-bold text-cyan-400">
                    {waifuProfile.name}
                  </p>
                </div>
                <div className="p-3 bg-zinc-800/50 border border-pink-500/30">
                  <p className="text-xs text-pink-400/60 tracking-widest mb-2">
                    YANDERE_LEVEL
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {(["none", "low", "medium", "high"] as const).map(
                      (level) => {
                        const isActive = waifuProfile.yandere_level === level;
                        const levelConfig = {
                          none: {
                            label: "NONE",
                            color: "zinc",
                            icon: "pixelarticons:mood-happy",
                          },
                          low: {
                            label: "LOW",
                            color: "cyan",
                            icon: "pixelarticons:mood-neutral",
                          },
                          medium: {
                            label: "MED",
                            color: "pink",
                            icon: "pixelarticons:mood-sad",
                          },
                          high: {
                            label: "HIGH",
                            color: "fuchsia",
                            icon: "pixelarticons:alert",
                          },
                        };
                        const config = levelConfig[level];
                        return (
                          <div
                            key={level}
                            className={`p-3 border-2 text-center ${
                              isActive
                                ? `bg-${config.color}-500/20 border-${config.color}-500 shadow-[0_0_15px_rgba(236,72,153,0.4)]`
                                : "bg-zinc-800/50 border-zinc-600/50"
                            }`}
                          >
                            <Icon
                              icon={config.icon}
                              className={`w-6 h-6 mx-auto mb-1 ${
                                isActive
                                  ? `text-${config.color}-400`
                                  : "text-zinc-500"
                              }`}
                            />
                            <p
                              className={`text-xs font-bold tracking-wider ${
                                isActive
                                  ? `text-${config.color}-400`
                                  : "text-zinc-500"
                              }`}
                            >
                              {config.label}
                            </p>
                          </div>
                        );
                      }
                    )}
                  </div>
                  <p className="text-[10px] text-pink-400/40 mt-2 text-center tracking-wider">
                    WARNING: HIGH LEVELS MAY CAUSE POSSESSIVE BEHAVIOR
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="relative z-10 mt-6 flex justify-end gap-4">
        <button
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="px-8 py-3 border-2 border-pink-500/50 text-pink-400 font-bold tracking-widest uppercase text-sm hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-2"
        >
          <Icon icon="pixelarticons:close" className="w-5 h-5" />
          RESET_CHANGES
        </button>
        <button
          onMouseEnter={handleButtonHover}
          onMouseLeave={handleButtonLeave}
          className="px-8 py-3 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-bold tracking-widest uppercase text-sm hover:shadow-[0_0_30px_rgba(236,72,153,0.6)] transition-all flex items-center gap-2"
        >
          <Icon icon="pixelarticons:save" className="w-5 h-5" />
          SAVE_PROFILE
        </button>
      </div>
    </div>
  );
}
