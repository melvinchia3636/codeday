import { useState, useRef } from "react";
import { Link } from "react-router";
import { Icon } from "@iconify/react";
import {
  useLoginAnimations,
  useInputAnimations,
  useButtonAnimations,
  useSubmitAnimation,
} from "./hooks/useLoginAnimations";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const sideBarsLeftRef = useRef<HTMLDivElement[]>([]);
  const sideBarsRightRef = useRef<HTMLDivElement[]>([]);
  const indicatorDotsRef = useRef<HTMLDivElement[]>([]);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const glowBorderRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const terminalIndicatorRef = useRef<HTMLSpanElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Use animation hooks
  useLoginAnimations({
    containerRef,
    logoRef,
    cardRef,
    cursorRef,
    glowBorderRef,
    topLineRef,
    bottomLineRef,
    terminalIndicatorRef,
    particlesRef,
    orbsRef,
    cornersRef,
    sideBarsLeftRef,
    sideBarsRightRef,
    indicatorDotsRef,
  });

  const { handleInputFocus, handleInputBlur } = useInputAnimations();
  const { handleButtonHover, handleButtonLeave } = useButtonAnimations();
  const { triggerSubmitAnimation } = useSubmitAnimation(cardRef);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    triggerSubmitAnimation();
    setTimeout(() => setIsLoading(false), 2000);
  };

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center border-[8px] border-pink-500 p-4 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0 }}
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      ></div>
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(236,72,153,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.3)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

      <div
        ref={topLineRef}
        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500 origin-left"
      ></div>
      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-500 via-fuchsia-500 to-pink-500 origin-right"
      ></div>

      {[...Array(5)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full blur-3xl ${
            i % 3 === 0
              ? "w-64 h-64 bg-pink-500/20"
              : i % 3 === 1
              ? "w-48 h-48 bg-fuchsia-500/20"
              : "w-32 h-32 bg-cyan-500/15"
          }`}
          style={{ left: `${(i * 20) % 100}%`, top: `${(i * 25 + 10) % 100}%` }}
        ></div>
      ))}

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <h1
            ref={logoRef}
            style={{ opacity: 0 }}
            className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-fuchsia-400 to-cyan-400 tracking-widest uppercase mb-2 flex items-center justify-center gap-2"
          >
            <Icon
              icon="pixelarticons:human-run"
              className="w-8 h-8 text-pink-400"
            />
            NEON<span className="text-pink-500">FIT</span>
            <span
              ref={cursorRef}
              className="text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
            >
              _
            </span>
            <Icon icon="pixelarticons:zap" className="w-8 h-8 text-pink-400" />
          </h1>
          <p className="text-pink-300/60 text-sm tracking-[0.3em] flex items-center justify-center gap-2">
            <Icon icon="pixelarticons:code" className="w-4 h-4" /> SYSTEM_ACCESS
            v1.0 <Icon icon="pixelarticons:code" className="w-4 h-4" />
          </p>
        </div>

        <div className="relative" style={{ perspective: "1000px" }}>
          <div
            ref={glowBorderRef}
            className="absolute -inset-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500 opacity-30 blur-sm"
          ></div>
          <div
            ref={cardRef}
            className="relative bg-zinc-900/95 border-2 border-pink-500/50 p-10 backdrop-blur-sm"
            style={{ opacity: 0 }}
          >
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-transparent"></div>

            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-pink-500/30">
              <span ref={terminalIndicatorRef} className="text-pink-500">
                <Icon icon="pixelarticons:command" className="w-4 h-4" />
              </span>
              <span className="text-pink-400 text-xs tracking-widest uppercase flex items-center gap-2">
                <Icon icon="pixelarticons:user" className="w-4 h-4" />{" "}
                IDENTITY_VERIFICATION
              </span>
            </div>

            <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2 form-element" style={{ opacity: 0 }}>
                <label className="text-xs text-pink-400 tracking-widest uppercase flex items-center gap-2">
                  <Icon
                    icon="pixelarticons:user"
                    className="w-4 h-4 text-cyan-400"
                  />{" "}
                  USER_HANDLE
                </label>
                <div className="relative group">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="enter_username"
                    className="w-full bg-zinc-800/50 border-2 border-pink-500/30 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-all tracking-wide"
                  />
                  <div className="input-icon absolute right-3 top-1/2 -translate-y-1/2 text-pink-500/50 group-focus-within:text-cyan-400 transition-colors">
                    <Icon icon="pixelarticons:at" className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="space-y-2 form-element" style={{ opacity: 0 }}>
                <label className="text-xs text-pink-400 tracking-widest uppercase flex items-center gap-2">
                  <Icon
                    icon="pixelarticons:lock"
                    className="w-4 h-4 text-cyan-400"
                  />{" "}
                  ACCESS_KEY
                </label>
                <div className="relative group">
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={handleInputFocus}
                    onBlur={handleInputBlur}
                    placeholder="••••••••••••"
                    className="w-full bg-zinc-800/50 border-2 border-pink-500/30 px-4 py-3 text-white placeholder-zinc-600 focus:outline-none transition-all tracking-widest"
                  />
                  <div className="input-icon absolute right-3 top-1/2 -translate-y-1/2 text-pink-500/50 group-focus-within:text-cyan-400 transition-colors">
                    <Icon icon="pixelarticons:shield" className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                onMouseEnter={handleButtonHover}
                onMouseLeave={handleButtonLeave}
                style={{ opacity: 0 }}
                className="submit-btn form-element relative w-full py-4 bg-gradient-to-r from-pink-500 to-fuchsia-500 text-white font-bold tracking-widest uppercase overflow-hidden group transition-all disabled:opacity-50"
              >
                <span
                  className={`relative z-10 flex items-center justify-center gap-3 ${
                    isLoading ? "opacity-0" : ""
                  }`}
                >
                  <Icon icon="pixelarticons:zap" className="w-5 h-5" />{" "}
                  AUTHENTICATE{" "}
                  <Icon icon="pixelarticons:arrow-right" className="w-5 h-5" />
                </span>
                {isLoading && (
                  <span className="absolute inset-0 flex items-center justify-center">
                    <Icon
                      icon="pixelarticons:loader"
                      className="w-6 h-6 animate-spin"
                    />
                  </span>
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </button>
            </form>

            <div
              className="mt-8 text-center form-element"
              style={{ opacity: 0 }}
            >
              <p className="text-xs text-zinc-500 flex items-center justify-center gap-2">
                <Icon icon="pixelarticons:user" className="w-4 h-4" />{" "}
                NO_ACCOUNT?{" "}
                <Link
                  to="/signup"
                  className="text-pink-400 hover:text-cyan-400 transition-colors tracking-wider flex items-center gap-1"
                >
                  <Icon icon="pixelarticons:user-plus" className="w-4 h-4" />{" "}
                  CREATE_IDENTITY
                </Link>
              </p>
            </div>

            <div className="absolute bottom-2 right-2 text-[10px] text-pink-500/30 tracking-widest flex items-center gap-1">
              <Icon icon="pixelarticons:shield" className="w-3 h-3" />{" "}
              SEC_LEVEL: MAX
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                if (el) indicatorDotsRef.current[i] = el;
              }}
              className="w-2 h-2 border border-pink-500/50"
              style={{
                backgroundColor:
                  i === 2 ? "rgba(236,72,153,0.5)" : "transparent",
                opacity: 0,
              }}
            ></div>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-600 mt-4 tracking-wider flex items-center justify-center gap-2">
          <Icon icon="pixelarticons:lock" className="w-4 h-4" />{" "}
          ENCRYPTED_TRANSMISSION{" "}
          <Icon icon="pixelarticons:radio-signal" className="w-4 h-4" />
        </p>
      </div>

      {[...Array(4)].map((_, i) => (
        <div
          key={`corner-${i}`}
          ref={(el) => {
            if (el) cornersRef.current[i] = el;
          }}
          className={`absolute w-6 h-6 border-pink-500 ${
            i === 0
              ? "top-4 left-4 border-l-2 border-t-2"
              : i === 1
              ? "top-4 right-4 border-r-2 border-t-2"
              : i === 2
              ? "bottom-4 left-4 border-l-2 border-b-2"
              : "bottom-4 right-4 border-r-2 border-b-2"
          }`}
          style={{ opacity: 0 }}
        ></div>
      ))}

      <div className="absolute left-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) sideBarsLeftRef.current[i] = el;
            }}
            className="flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            <div
              className={`w-8 h-1 ${
                i % 2 === 0 ? "bg-pink-500/40" : "bg-pink-500/20"
              }`}
            ></div>
            <div className="w-1 h-1 bg-pink-500/60"></div>
          </div>
        ))}
      </div>

      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-3">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) sideBarsRightRef.current[i] = el;
            }}
            className="flex items-center gap-2"
            style={{ opacity: 0 }}
          >
            <div className="w-1 h-1 bg-pink-500/60"></div>
            <div
              className={`w-8 h-1 ${
                i % 2 === 0 ? "bg-pink-500/40" : "bg-pink-500/20"
              }`}
            ></div>
          </div>
        ))}
      </div>
    </div>
  );
}
