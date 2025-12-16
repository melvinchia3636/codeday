import { useRef } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import {
  useNotFoundAnimations,
  useButtonAnimations,
} from "./hooks/useNotFoundAnimations";

export function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const errorCodeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const errorLogRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const sideBarsLeftRef = useRef<HTMLDivElement[]>([]);
  const sideBarsRightRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const dataStreamsRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const pulseRingsRef = useRef<HTMLDivElement[]>([]);
  const warningBarsRef = useRef<HTMLDivElement[]>([]);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);

  useNotFoundAnimations({
    containerRef,
    errorCodeRef,
    glowRef,
    messageRef,
    errorLogRef,
    buttonsRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    sideBarsLeftRef,
    sideBarsRightRef,
    particlesRef,
    dataStreamsRef,
    scanlineRef,
    glitchOverlayRef,
    pulseRingsRef,
    warningBarsRef,
    noiseCanvasRef,
  });

  const { handleButtonHover, handleButtonLeave } = useButtonAnimations();

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center border-[8px] border-pink-500 p-4 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0, perspective: "1500px" }}
    >
      {/* TV Noise Canvas */}
      <canvas
        ref={noiseCanvasRef}
        className="absolute inset-0 pointer-events-none z-50 mix-blend-overlay"
      />

      {/* Horizontal glitch lines */}
      {[...Array(5)].map((_, i) => (
        <div
          key={`glitch-line-${i}`}
          className="glitch-line absolute left-0 w-full bg-white/20 pointer-events-none z-45"
          style={{ top: `${20 * i}%`, height: "2px", opacity: 0 }}
        />
      ))}

      {/* Background layers */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />
      <div
        ref={dataStreamsRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
      />
      <div className="absolute inset-0 opacity-15 bg-[linear-gradient(rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.3)_1px,transparent_1px)] bg-[size:30px_30px] z-0" />

      {/* Scanline */}
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-2 bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent pointer-events-none z-50"
      />

      {/* Multiple fast scanlines */}
      {[...Array(3)].map((_, i) => (
        <div
          key={`scan-${i}`}
          className="absolute left-0 right-0 h-px bg-white/10 pointer-events-none z-45 animate-[scan_1s_linear_infinite]"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
      ))}

      {/* Glitch overlay */}
      <div
        ref={glitchOverlayRef}
        className="absolute inset-0 bg-gradient-to-r from-pink-500/30 via-transparent to-cyan-500/30 pointer-events-none z-40 mix-blend-overlay"
        style={{ opacity: 0 }}
      />

      {/* CRT vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] pointer-events-none z-30" />

      {/* Neon lines */}
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

      {/* Floating orbs */}
      {[...Array(7)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full blur-3xl pointer-events-none z-0 ${
            i % 4 === 0
              ? "w-72 h-72 bg-pink-500/25"
              : i % 4 === 1
              ? "w-56 h-56 bg-cyan-500/20"
              : i % 4 === 2
              ? "w-64 h-64 bg-fuchsia-500/20"
              : "w-48 h-48 bg-purple-500/20"
          }`}
          style={{ left: `${(i * 18) % 100}%`, top: `${(i * 22 + 5) % 100}%` }}
        />
      ))}

      {/* Pulse rings around 404 */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`pulse-${i}`}
          ref={(el) => {
            if (el) pulseRingsRef.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pink-500/40 pointer-events-none z-0"
          style={{
            width: `${150 + i * 80}px`,
            height: `${150 + i * 80}px`,
            opacity: 0,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center max-w-2xl">
        {/* 404 Error Code */}
        <div className="relative inline-block mb-8">
          <div
            ref={glowRef}
            className="absolute -inset-16 bg-pink-500/20 blur-3xl rounded-full"
            style={{ opacity: 0 }}
          />
          <div
            ref={errorCodeRef}
            className="text-[14rem] font-black leading-none text-transparent bg-clip-text bg-gradient-to-b from-pink-400 via-fuchsia-500 to-pink-600 select-none tracking-tighter"
            style={{ opacity: 0, textShadow: "0 0 100px rgba(236,72,153,0.5)" }}
          >
            404
          </div>
          <div className="absolute inset-0 text-[14rem] font-black leading-none text-pink-500/10 blur-2xl select-none tracking-tighter">
            404
          </div>
          <div className="absolute -inset-4 border-2 border-pink-500/40 shadow-[inset_0_0_30px_rgba(236,72,153,0.2)]" />
          <div className="absolute -inset-8 border border-pink-500/20" />
          <div className="absolute -inset-12 border border-pink-500/10" />
        </div>

        {/* Messages */}
        <div ref={messageRef} className="space-y-4 mb-10">
          <p
            className="message-item text-pink-400 text-2xl tracking-[0.4em] uppercase flex items-center justify-center gap-3"
            style={{ opacity: 0 }}
          >
            <Icon icon="pixelarticons:warning-box" className="w-7 h-7" />
            SYSTEM_ERROR
            <Icon icon="pixelarticons:warning-box" className="w-7 h-7" />
          </p>
          <div
            className="message-item flex items-center justify-center gap-3 text-red-400 text-sm"
            style={{ opacity: 0 }}
          >
            <span className="w-3 h-3 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
            <span className="tracking-[0.3em]">ROUTE_NOT_FOUND.exe</span>
            <span className="w-3 h-3 bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
          </div>
          <p
            className="message-item text-fuchsia-300/70 text-base max-w-lg mx-auto tracking-wide leading-relaxed"
            style={{ opacity: 0 }}
          >
            <Icon icon="pixelarticons:code" className="inline w-4 h-4 mr-2" />
            The requested neural pathway does not exist in this dimension.
            <br />
            Please verify your coordinates and try again.
            <Icon icon="pixelarticons:code" className="inline w-4 h-4 ml-2" />
          </p>
        </div>

        {/* Error log */}
        <div
          ref={errorLogRef}
          className="bg-zinc-900/90 border-2 border-pink-500/50 p-5 mb-10 max-w-lg mx-auto backdrop-blur-sm shadow-[0_0_30px_rgba(236,72,153,0.2)]"
          style={{ opacity: 0 }}
        >
          <div className="text-xs text-pink-400 tracking-[0.3em] mb-3 text-left flex items-center gap-2 border-b border-pink-500/30 pb-2">
            <Icon icon="pixelarticons:file" className="w-4 h-4" />
            ERROR_LOG //
          </div>
          <div className="font-mono text-sm text-left space-y-2">
            <p
              className="log-line text-cyan-400 flex items-center gap-2"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:clock"
                className="w-4 h-4 text-zinc-500"
              />
              <span className="text-zinc-500">[TIMESTAMP]</span> Connection
              terminated
            </p>
            <p
              className="log-line text-fuchsia-400 flex items-center gap-2"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:warning-box"
                className="w-4 h-4 text-zinc-500"
              />
              <span className="text-zinc-500">[STATUS]</span> 404 - Not Found
            </p>
            <p
              className="log-line text-pink-400 flex items-center gap-2"
              style={{ opacity: 0 }}
            >
              <Icon
                icon="pixelarticons:arrow-right"
                className="w-4 h-4 text-zinc-500"
              />
              <span className="text-zinc-500">[ACTION]</span> Redirect
              recommended
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row gap-5 justify-center items-center"
        >
          <Link
            to="/"
            className="action-btn home-btn group relative px-10 py-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-bold tracking-[0.2em] uppercase text-sm overflow-hidden transition-all flex items-center gap-3"
            style={{ opacity: 0 }}
            onMouseEnter={() =>
              handleButtonHover(".home-btn", "rgba(236,72,153,0.6)")
            }
            onMouseLeave={() => handleButtonLeave(".home-btn")}
          >
            <Icon icon="pixelarticons:home" className="w-5 h-5" />
            <span className="relative z-10">RETURN_HOME</span>
            <Icon icon="pixelarticons:arrow-left" className="w-5 h-5" />
            <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
          <button
            onClick={() => window.history.back()}
            className="action-btn back-btn px-10 py-4 border-2 border-pink-500/60 text-pink-400 font-bold tracking-[0.2em] uppercase text-sm hover:border-cyan-400 hover:text-cyan-400 transition-all flex items-center gap-3"
            style={{ opacity: 0 }}
            onMouseEnter={() =>
              handleButtonHover(".back-btn", "rgba(34,211,238,0.5)")
            }
            onMouseLeave={() => handleButtonLeave(".back-btn")}
          >
            <Icon icon="pixelarticons:undo" className="w-5 h-5" />
            <span>GO_BACK</span>
          </button>
        </div>

        {/* Warning bars */}
        <div className="mt-14 flex justify-center gap-3">
          {[...Array(7)].map((_, i) => (
            <div
              key={`bar-${i}`}
              ref={(el) => {
                if (el) warningBarsRef.current[i] = el;
              }}
              className="w-1.5 h-10 bg-gradient-to-t from-pink-500/0 via-pink-500 to-pink-500/0 shadow-[0_0_10px_rgba(236,72,153,0.5)]"
              style={{ opacity: 0 }}
            />
          ))}
        </div>
      </div>

      {/* Corner brackets */}
      <div
        ref={(el) => {
          if (el) cornersRef.current[0] = el;
        }}
        className="absolute top-6 left-6 w-12 h-12 border-l-4 border-t-4 border-pink-500 z-20 shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[1] = el;
        }}
        className="absolute top-6 right-6 w-12 h-12 border-r-4 border-t-4 border-pink-500 z-20 shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[2] = el;
        }}
        className="absolute bottom-6 left-6 w-12 h-12 border-l-4 border-b-4 border-pink-500 z-20 shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />
      <div
        ref={(el) => {
          if (el) cornersRef.current[3] = el;
        }}
        className="absolute bottom-6 right-6 w-12 h-12 border-r-4 border-b-4 border-pink-500 z-20 shadow-[0_0_20px_rgba(236,72,153,0.8)]"
        style={{ opacity: 0 }}
      />

      {/* Side bars left */}
      <div className="absolute top-1/2 left-6 -translate-y-1/2 space-y-2 z-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={`left-${i}`}
            ref={(el) => {
              if (el) sideBarsLeftRef.current[i] = el;
            }}
            className={`w-1.5 ${
              i % 2 === 0 ? "h-6 bg-pink-500/70" : "h-4 bg-pink-500/40"
            } shadow-[0_0_10px_currentColor]`}
            style={{ opacity: 0 }}
          />
        ))}
      </div>

      {/* Side bars right */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 space-y-2 z-10">
        {[...Array(10)].map((_, i) => (
          <div
            key={`right-${i}`}
            ref={(el) => {
              if (el) sideBarsRightRef.current[i] = el;
            }}
            className={`w-1.5 ${
              i % 2 === 0 ? "h-6 bg-pink-500/70" : "h-4 bg-pink-500/40"
            } shadow-[0_0_10px_currentColor]`}
            style={{ opacity: 0 }}
          />
        ))}
      </div>
    </div>
  );
}
