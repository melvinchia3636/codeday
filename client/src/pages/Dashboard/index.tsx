import { useRef } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import { Header } from "./components/Header";
import { UserProfile } from "./components/UserProfile";
import { WorkoutCard } from "./components/WorkoutCard";
import { DietCard } from "./components/DietCard";
import { WaterCard } from "./components/WaterCard";
import { ActivityTimeline } from "./components/ActivityTimeline";
import { VitalsPanel } from "./components/VitalsPanel";
import { ObjectivesPanel } from "./components/ObjectivesPanel";
import { WaifuPanel } from "./components/WaifuPanel";
import { DashboardDecorations } from "./components/DashboardDecorations";
import { useDashboardAnimations } from "./hooks/useDashboardAnimations";

export function Dashboard() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainPanelRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const timelinePanelRef = useRef<HTMLDivElement>(null);
  const waifuPanelRef = useRef<HTMLElement>(null);
  const bottomBarRef = useRef<HTMLElement>(null);

  // Decoration refs
  const particlesRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const dataStreamRef = useRef<HTMLDivElement>(null);
  const hexGridRef = useRef<HTMLDivElement>(null);
  const matrixRainRef = useRef<HTMLDivElement>(null);
  const energyFieldRef = useRef<HTMLDivElement>(null);
  const cyberGridRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const sideBarsTopRef = useRef<HTMLDivElement[]>([]);
  const sideBarsBottomRef = useRef<HTMLDivElement[]>([]);
  const neonLinesRef = useRef<HTMLDivElement[]>([]);
  const hologramRingsRef = useRef<HTMLDivElement[]>([]);
  const circuitLinesRef = useRef<HTMLDivElement[]>([]);
  const pulseRingsRef = useRef<HTMLDivElement[]>([]);

  useDashboardAnimations({
    containerRef,
    mainPanelRef,
    particlesRef,
    scanlineRef,
    glitchOverlayRef,
    dataStreamRef,
    hexGridRef,
    orbsRef,
    cornersRef,
    sideBarsTopRef,
    sideBarsBottomRef,
    neonLinesRef,
    hologramRingsRef,
    circuitLinesRef,
    headerRef,
    cardsContainerRef,
    timelinePanelRef,
    waifuPanelRef,
    bottomBarRef,
    matrixRainRef,
    pulseRingsRef,
    energyFieldRef,
    cyberGridRef,
  });

  return (
    <div
      ref={containerRef}
      className="dashboard-border flex-1 flex-col flex gap-4 border-[8px] border-pink-500 p-4 shadow-[0_0_30px_rgba(236,72,153,0.5)] relative overflow-hidden"
      style={{ opacity: 0, perspective: "1500px" }}
    >
      <DashboardDecorations
        matrixRainRef={matrixRainRef}
        cyberGridRef={cyberGridRef}
        hexGridRef={hexGridRef}
        particlesRef={particlesRef}
        dataStreamRef={dataStreamRef}
        scanlineRef={scanlineRef}
        glitchOverlayRef={glitchOverlayRef}
        energyFieldRef={energyFieldRef}
        orbsRef={orbsRef}
        hologramRingsRef={hologramRingsRef}
        pulseRingsRef={pulseRingsRef}
        neonLinesRef={neonLinesRef}
        cornersRef={cornersRef}
        sideBarsTopRef={sideBarsTopRef}
        sideBarsBottomRef={sideBarsBottomRef}
      />

      {/* Main content */}
      <section className="flex-1 flex gap-4 relative z-30">
        <section
          ref={mainPanelRef}
          className="border-[4px] border-pink-500 w-8/12 bg-gradient-to-br from-zinc-900/95 via-zinc-950/95 to-fuchsia-950/40 p-6 relative overflow-hidden flex flex-col backdrop-blur-sm shadow-[0_0_40px_rgba(236,72,153,0.3)]"
          style={{ opacity: 0 }}
        >
          {/* Inner grid overlay */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.3)_1px,transparent_1px)] bg-[size:20px_20px]" />
          {/* Inner glow border */}
          <div className="absolute inset-0 border-2 border-pink-500/20 m-2 pointer-events-none" />

          <div
            ref={headerRef}
            className="relative z-10 flex justify-between items-start mb-6"
            style={{ opacity: 0 }}
          >
            <Header />
            <UserProfile />
          </div>

          <div
            ref={cardsContainerRef}
            className="relative z-10 flex gap-4"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex-1 grid grid-cols-3 gap-4">
              <div className="stat-card" style={{ opacity: 0 }}>
                <WorkoutCard />
              </div>
              <div className="stat-card" style={{ opacity: 0 }}>
                <DietCard />
              </div>
              <div className="stat-card" style={{ opacity: 0 }}>
                <WaterCard />
              </div>
            </div>
          </div>

          <div
            ref={timelinePanelRef}
            className="relative z-10 mt-4 flex gap-4 flex-1"
            style={{ opacity: 0 }}
          >
            <ActivityTimeline />
            <VitalsPanel />
            <ObjectivesPanel />
          </div>

          {/* Bottom gradient line */}
          <div className="absolute bottom-4 left-6 right-6 h-px bg-gradient-to-r from-transparent via-pink-500/50 to-transparent" />
        </section>

        <section
          ref={waifuPanelRef}
          className="w-4/12 flex"
          style={{ opacity: 0 }}
        >
          <WaifuPanel />
        </section>
      </section>

      <section
        ref={bottomBarRef}
        className="p-2 px-4 flex items-center justify-between border-[4px] border-pink-500 relative overflow-hidden bg-zinc-900/80 backdrop-blur-sm"
        style={{ opacity: 0 }}
      >
        {/* Bottom bar decorations */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.3)_1px,transparent_1px)] bg-[size:15px_15px]" />
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500" />

        {/* Left - Fancy Logout Button */}
        <div className="relative z-10 w-48">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500/30 via-fuchsia-500/20 to-cyan-500/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <div
              className="absolute -inset-0.5 border border-pink-500/50 animate-pulse"
              style={{ animationDuration: "2s" }}
            />
            <button className="relative w-full flex items-center gap-3 px-4 py-3 bg-zinc-900/90 border-2 border-pink-500/40 group-hover:border-cyan-400 transition-all">
              <div className="relative">
                <div className="absolute -inset-1 bg-pink-500/20 rounded-full blur-sm animate-pulse" />
                <Icon
                  icon="pixelarticons:logout"
                  className="relative w-5 h-5 text-pink-400 group-hover:text-cyan-400 drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] transition-colors"
                />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm text-pink-400 group-hover:text-cyan-400 tracking-widest font-bold drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] transition-colors">
                  LOGOUT
                </span>
                <span className="text-[8px] text-pink-400/60 tracking-[0.2em]">
                  END_SESSION
                </span>
              </div>
              <div className="ml-auto flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-pink-500/60 group-hover:bg-cyan-500/60 animate-pulse transition-colors"
                    style={{
                      height: `${12 - i * 3}px`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
            </button>
          </div>
        </div>

        {/* Center - Fancy App Icons with Central Logo */}
        <div className="relative z-10 flex items-center gap-3">
          {/* Left icons */}
          {[
            { icon: "pixelarticons:home", label: "HOME", path: "/" },
            { icon: "pixelarticons:user", label: "PROFILE", path: "/profile" },
            {
              icon: "pixelarticons:human-run",
              label: "WORKOUTS",
              path: "/workouts",
            },
          ].map((app, i) => (
            <Link
              key={i}
              to={app.path}
              className="relative flex flex-col items-center justify-center w-16 h-14 bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 border-2 border-pink-500/30 hover:border-pink-500 hover:shadow-[0_0_25px_rgba(236,72,153,0.5),inset_0_0_15px_rgba(236,72,153,0.2)] transition-all duration-300 group overflow-hidden"
              title={app.label}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icon
                icon={app.icon}
                className="relative z-10 w-6 h-6 text-zinc-400 group-hover:text-pink-400 group-hover:drop-shadow-[0_0_8px_rgba(236,72,153,0.8)] transition-all duration-300"
              />
              <span className="text-[7px] text-zinc-500 group-hover:text-pink-400 tracking-widest mt-1 transition-colors">
                {app.label}
              </span>
            </Link>
          ))}

          {/* Central Fancy Logo */}
          <div className="relative mx-4">
            <div className="absolute -inset-4 bg-gradient-to-r from-pink-500/20 via-cyan-500/20 to-pink-500/20 blur-xl rounded-full animate-pulse" />
            <div
              className="absolute -inset-2 border-2 border-pink-500/40 rounded-full animate-spin"
              style={{ animationDuration: "8s" }}
            />
            <div
              className="absolute -inset-3 border border-cyan-500/20 rounded-full animate-spin"
              style={{
                animationDuration: "12s",
                animationDirection: "reverse",
              }}
            />
            <Link
              to="/"
              className="relative flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-500 via-fuchsia-500 to-cyan-500 rounded-full shadow-[0_0_30px_rgba(236,72,153,0.6),0_0_60px_rgba(34,211,238,0.3)] hover:shadow-[0_0_50px_rgba(236,72,153,0.8),0_0_80px_rgba(34,211,238,0.5)] transition-all duration-500 group overflow-hidden"
            >
              <div className="absolute inset-1 bg-zinc-900 rounded-full" />
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500/30 to-cyan-500/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icon
                icon="pixelarticons:heart"
                className="relative z-10 w-7 h-7 text-pink-400 group-hover:text-cyan-400 group-hover:scale-110 transition-all duration-300 drop-shadow-[0_0_10px_rgba(236,72,153,0.8)]"
              />
            </Link>
          </div>

          {/* Right icons */}
          {[
            {
              icon: "pixelarticons:coin",
              label: "NUTRITION",
              path: "/nutrition",
            },
            {
              icon: "pixelarticons:drop",
              label: "HYDRATION",
              path: "/hydration",
            },
            {
              icon: "pixelarticons:timeline",
              label: "ACTIVITY",
              path: "/activity",
            },
          ].map((app, i) => (
            <Link
              key={i}
              to={app.path}
              className="relative flex flex-col items-center justify-center w-16 h-14 bg-gradient-to-b from-zinc-800/80 to-zinc-900/80 border-2 border-cyan-500/30 hover:border-cyan-500 hover:shadow-[0_0_25px_rgba(34,211,238,0.5),inset_0_0_15px_rgba(34,211,238,0.2)] transition-all duration-300 group overflow-hidden"
              title={app.label}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <Icon
                icon={app.icon}
                className="relative z-10 w-6 h-6 text-zinc-400 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)] transition-all duration-300"
              />
              <span className="text-[7px] text-zinc-500 group-hover:text-cyan-400 tracking-widest mt-1 transition-colors">
                {app.label}
              </span>
            </Link>
          ))}
        </div>

        {/* Right - Combined FANCY DateTime */}
        <div className="relative z-10 w-48">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/30 via-pink-500/20 to-cyan-500/30 blur-md opacity-60 group-hover:opacity-100 transition-opacity" />
            <div
              className="absolute -inset-0.5 border border-cyan-500/50 animate-pulse"
              style={{ animationDuration: "2s" }}
            />
            <div className="relative w-full flex items-center gap-3 px-4 py-3 bg-zinc-900/90 border-2 border-cyan-500/40 group-hover:border-cyan-400 transition-all">
              <div className="flex gap-0.5">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1 bg-cyan-500/60 animate-pulse"
                    style={{
                      height: `${8 + i * 2}px`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
              <div className="flex flex-col items-center flex-1">
                <span className="text-lg text-cyan-400 tracking-widest font-mono font-bold drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                  {new Date().toLocaleTimeString("en-US", {
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: false,
                  })}
                </span>
                <span className="text-[8px] text-pink-400/80 tracking-[0.15em]">
                  {new Date()
                    .toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                    .toUpperCase()}
                </span>
              </div>
              <div className="relative">
                <div className="absolute -inset-1 bg-cyan-500/20 rounded-full blur-sm animate-pulse" />
                <Icon
                  icon="pixelarticons:clock"
                  className="relative w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
