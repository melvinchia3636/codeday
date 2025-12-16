import { useState, useEffect, useRef } from "react";
import { Icon } from "@iconify/react";
import { animate, random } from "animejs";
import type { WorkoutType } from "../../../lib/workout";

interface WorkoutTypeModalProps {
  isVisible: boolean;
  initialData?: WorkoutType; // If provided, modal is in edit mode
  onConfirm: (data: {
    id?: string; // Present when editing
    name: string;
    icon: string;
    color: string;
    caloriesPerMinute: number;
  }) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

// Available icons for selection
const availableIcons = [
  "pixelarticons:human",
  "pixelarticons:human-run",
  "pixelarticons:speed-fast",
  "pixelarticons:speed-medium",
  "pixelarticons:drop",
  "pixelarticons:trophy",
  "pixelarticons:heart",
  "pixelarticons:zap",
  "pixelarticons:coin",
  "pixelarticons:clock",
  "pixelarticons:chart-bar",
  "pixelarticons:zap",
  "pixelarticons:shield",
  "pixelarticons:sun",
  "pixelarticons:moon",
  "pixelarticons:music",
];

// Available colors
const availableColors = [
  { name: "cyan", class: "bg-cyan-500", glow: "rgba(34,211,238," },
  { name: "pink", class: "bg-pink-500", glow: "rgba(236,72,153," },
  { name: "fuchsia", class: "bg-fuchsia-500", glow: "rgba(217,70,239," },
  { name: "purple", class: "bg-purple-500", glow: "rgba(168,85,247," },
  { name: "green", class: "bg-green-500", glow: "rgba(34,197,94," },
  { name: "orange", class: "bg-orange-500", glow: "rgba(249,115,22," },
  { name: "amber", class: "bg-amber-500", glow: "rgba(245,158,11," },
  { name: "red", class: "bg-red-500", glow: "rgba(239,68,68," },
];

export function WorkoutTypeModal({
  isVisible,
  initialData,
  onConfirm,
  onCancel,
  isLoading = false,
}: WorkoutTypeModalProps) {
  const isEditMode = !!initialData;

  const [name, setName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState(availableIcons[0]);
  const [selectedColor, setSelectedColor] = useState(availableColors[0]);
  const [caloriesPerMinute, setCaloriesPerMinute] = useState(5);

  // Refs for animations
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);
  const matrixRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const ringsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isVisible) return;

    // Initialize form with data (edit mode) or defaults (create mode)
    if (initialData) {
      setName(initialData.name);
      setSelectedIcon(initialData.icon);
      const foundColor = availableColors.find(
        (c) => c.name === initialData.color
      );
      setSelectedColor(foundColor || availableColors[0]);
      setCaloriesPerMinute(initialData.caloriesPerMinute);
    } else {
      setName("");
      setSelectedIcon(availableIcons[0]);
      setSelectedColor(availableColors[0]);
      setCaloriesPerMinute(5);
    }

    // Create matrix rain effect
    if (matrixRef.current) {
      matrixRef.current.innerHTML = "";
      for (let i = 0; i < 30; i++) {
        const column = document.createElement("div");
        column.className = "absolute text-pink-500/30 text-xs font-mono";
        column.style.left = `${i * 3.33}%`;
        column.style.top = "-100%";
        column.textContent = Array.from({ length: 15 }, () =>
          String.fromCharCode(0x30a0 + Math.random() * 96)
        ).join("\n");
        matrixRef.current.appendChild(column);

        animate(column, {
          translateY: ["0vh", "150vh"],
          opacity: [0.8, 0],
          duration: random(3000, 6000),
          delay: random(0, 2000),
          loop: true,
          ease: "linear",
        });
      }
    }

    // Create floating particles
    if (particlesRef.current) {
      particlesRef.current.innerHTML = "";
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        const size = random(2, 6);
        particle.className = `absolute rounded-full ${
          i % 3 === 0
            ? "bg-pink-500"
            : i % 3 === 1
            ? "bg-fuchsia-500"
            : "bg-cyan-500"
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${random(0, 100)}%`;
        particle.style.top = `${random(0, 100)}%`;
        particle.style.boxShadow = `0 0 ${size * 2}px currentColor`;
        particlesRef.current.appendChild(particle);

        animate(particle, {
          translateY: [0, random(-100, 100)],
          translateX: [0, random(-50, 50)],
          opacity: [0.8, 0],
          scale: [1, 0],
          duration: random(2000, 4000),
          delay: random(0, 1500),
          loop: true,
          ease: "outExpo",
        });
      }
    }

    // Overlay fade in
    if (overlayRef.current) {
      animate(overlayRef.current, {
        opacity: [0, 1],
        duration: 500,
        ease: "outQuad",
      });
    }

    // Modal entrance with power-up effect
    if (modalRef.current) {
      animate(modalRef.current, {
        opacity: [0, 1],
        scale: [0.3, 1.05, 1],
        rotate: [5, -2, 0],
        duration: 800,
        ease: "outElastic(1, 0.6)",
      });
    }

    // Title glitch animation
    if (titleRef.current) {
      const glitchInterval = setInterval(() => {
        if (titleRef.current) {
          animate(titleRef.current, {
            translateX: [
              { to: random(-5, 5), duration: 50 },
              { to: random(-3, 3), duration: 50 },
              { to: 0, duration: 50 },
            ],
            skewX: [
              { to: random(-2, 2), duration: 50 },
              { to: 0, duration: 50 },
            ],
            ease: "linear",
          });
        }
      }, 3000);

      return () => clearInterval(glitchInterval);
    }
  }, [isVisible]);

  // Preview animation on icon/color change
  useEffect(() => {
    if (previewRef.current && isVisible) {
      animate(previewRef.current, {
        scale: [1, 1.3, 1],
        rotate: [0, -15, 15, 0],
        duration: 500,
        ease: "outElastic(1, 0.5)",
      });
    }
  }, [selectedIcon, selectedColor, isVisible]);

  const handleSubmit = () => {
    if (name.trim()) {
      onConfirm({
        id: initialData?.id,
        name: name.toUpperCase().replace(/\s+/g, "_"),
        icon: selectedIcon,
        color: selectedColor.name,
        caloriesPerMinute,
      });
    }
  };

  if (!isVisible) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/95 backdrop-blur-lg"
      style={{ opacity: 0 }}
      onClick={(e) => e.target === e.currentTarget && !isLoading && onCancel()}
    >
      {/* Matrix rain background */}
      <div
        ref={matrixRef}
        className="absolute inset-0 overflow-hidden pointer-events-none"
      />

      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at center, ${selectedColor.glow}0.3) 0%, transparent 60%)`,
        }}
      />

      {/* Cyberpunk grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.03)_1px,transparent_1px)] bg-[size:30px_30px] pointer-events-none" />

      {/* Particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Pulsing rings */}
      <div ref={ringsRef} className="absolute inset-0 pointer-events-none">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-pink-500/20 animate-ping"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: "3s",
            }}
          />
        ))}
      </div>

      {/* Modal */}
      <div
        ref={modalRef}
        className="relative z-10 bg-zinc-900/95 border-2 border-pink-500/60 p-8 max-w-lg w-full mx-4"
        style={{
          opacity: 0,
          boxShadow: `0 0 60px ${selectedColor.glow}0.4), 0 0 120px rgba(236,72,153,0.2), inset 0 0 40px ${selectedColor.glow}0.1)`,
        }}
      >
        {/* Holographic border effect */}
        <div className="absolute inset-0 border-2 border-fuchsia-500/20 animate-pulse pointer-events-none" />

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-10 h-10 border-l-4 border-t-4 border-pink-500 pointer-events-none" />
        <div className="absolute top-0 right-0 w-10 h-10 border-r-4 border-t-4 border-cyan-500 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-10 h-10 border-l-4 border-b-4 border-cyan-500 pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-10 h-10 border-r-4 border-b-4 border-pink-500 pointer-events-none" />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-pink-500 via-fuchsia-500 to-cyan-500 animate-pulse pointer-events-none" />

        {/* Form content wrapper with higher z-index */}
        <div className="relative z-20">
          {/* Status indicator */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex items-center gap-2 px-4 py-1 border border-fuchsia-500/50 bg-fuchsia-500/10">
              <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />
              <span className="text-fuchsia-400 text-xs tracking-[0.3em] uppercase">
                NEURAL_LINK_ACTIVE
              </span>
              <div className="w-2 h-2 bg-fuchsia-400 rounded-full animate-pulse" />
            </div>
          </div>

          {/* Title */}
          <div ref={titleRef}>
            <h2
              className="text-2xl font-bold tracking-[0.15em] text-pink-400 text-center mb-6 flex items-center justify-center gap-3"
              style={{
                textShadow:
                  "0 0 25px rgba(236,72,153,0.8), 0 0 50px rgba(236,72,153,0.4)",
              }}
            >
              <Icon icon="pixelarticons:zap" className="w-6 h-6" />
              CREATE_WORKOUT_TYPE
              <Icon icon="pixelarticons:zap" className="w-6 h-6" />
            </h2>
          </div>

          {/* Preview */}
          <div className="flex justify-center mb-6">
            <div
              ref={previewRef}
              className="w-24 h-24 flex items-center justify-center border-2"
              style={{
                borderColor: `${selectedColor.glow}1)`,
                backgroundColor: `${selectedColor.glow}0.2)`,
                boxShadow: `0 0 30px ${selectedColor.glow}0.5), 0 0 60px ${selectedColor.glow}0.3)`,
              }}
            >
              <Icon
                icon={selectedIcon}
                className="w-12 h-12"
                style={{
                  color: `${selectedColor.glow}1)`,
                  filter: `drop-shadow(0 0 10px ${selectedColor.glow}0.8))`,
                }}
              />
            </div>
          </div>

          {/* Name input */}
          <div className="mb-4">
            <label className="text-xs text-fuchsia-400/70 tracking-widest mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-fuchsia-400" />
              DESIGNATION_CODE
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ENTER_WORKOUT_NAME"
              className="w-full bg-zinc-800/80 border-2 border-pink-500/40 px-4 py-3 text-white font-bold tracking-widest focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all placeholder:text-zinc-600"
            />
          </div>

          {/* Calories per minute input */}
          <div className="mb-6">
            <label className="text-xs text-fuchsia-400/70 tracking-widest mb-2 flex items-center gap-2">
              <Icon icon="pixelarticons:coin" className="w-3 h-3" />
              CALORIES_PER_MINUTE
            </label>
            <div className="relative">
              <input
                type="number"
                value={caloriesPerMinute}
                onChange={(e) => setCaloriesPerMinute(Number(e.target.value))}
                min={1}
                max={50}
                className="w-full bg-zinc-800/80 border-2 border-pink-500/40 px-4 py-3 text-white text-xl font-bold focus:outline-none focus:border-pink-400 focus:shadow-[0_0_20px_rgba(236,72,153,0.4)] transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-pink-400/50 text-sm tracking-widest">
                KCAL/MIN
              </span>
            </div>
            <p className="mt-1 text-[10px] text-pink-400/40 tracking-wider">
              ESTIMATED_BURN_RATE: {caloriesPerMinute * 30} KCAL / 30 MIN
            </p>
          </div>

          {/* Icon selector */}
          <div className="mb-6">
            <label className="text-xs text-fuchsia-400/70 tracking-widest mb-2 block">
              GLYPH_SELECTOR
            </label>
            <div className="grid grid-cols-8 gap-2 p-3 bg-zinc-800/50 border border-pink-500/30">
              {availableIcons.map((icon) => (
                <button
                  key={icon}
                  onClick={() => setSelectedIcon(icon)}
                  className={`p-2 border transition-all flex items-center justify-center ${
                    selectedIcon === icon
                      ? ""
                      : "border-zinc-700 hover:border-pink-500/50 hover:bg-pink-500/10"
                  }`}
                  style={
                    selectedIcon === icon
                      ? {
                          borderColor: `${selectedColor.glow}1)`,
                          backgroundColor: `${selectedColor.glow}0.2)`,
                          boxShadow: `0 0 15px ${selectedColor.glow}0.5)`,
                        }
                      : undefined
                  }
                >
                  <Icon
                    icon={icon}
                    className="w-6 h-6"
                    style={{
                      color:
                        selectedIcon === icon
                          ? `${selectedColor.glow}1)`
                          : "rgba(236,72,153,0.5)",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Color selector - CHROMA MATRIX */}
          <div className="mb-6">
            <label className="text-xs text-fuchsia-400/70 tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-fuchsia-400 animate-pulse" />
              CHROMA_MATRIX
              <span className="flex-1 h-px bg-linear-to-r from-fuchsia-500/50 to-transparent" />
            </label>
            <div className="relative p-3 bg-zinc-800/50 border border-pink-500/30">
              {/* Animated background grid */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(236,72,153,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.05)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse pointer-events-none" />

              {/* Scanning line effect */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-full h-0.5 bg-linear-to-r from-transparent via-pink-500/50 to-transparent animate-[scan_2s_linear_infinite]" />
              </div>

              <div className="relative grid grid-cols-8 gap-2">
                {availableColors.map((color) => (
                  <div
                    key={color.name}
                    className="group flex flex-col items-center gap-1"
                  >
                    <button
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-full aspect-square ${
                        color.class
                      } transition-all duration-200 border-2 ${
                        selectedColor.name === color.name
                          ? "border-white scale-105"
                          : "border-transparent opacity-60 hover:opacity-100 hover:border-white/50"
                      }`}
                      style={{
                        boxShadow:
                          selectedColor.name === color.name
                            ? `0 0 15px ${color.glow}0.8), inset 0 0 10px ${color.glow}0.3)`
                            : undefined,
                      }}
                    >
                      {/* Inner gradient */}
                      <div className="absolute inset-0 bg-linear-to-br from-white/20 via-transparent to-black/20" />

                      {/* Selection indicator */}
                      {selectedColor.name === color.name && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Icon
                            icon="pixelarticons:check"
                            className="w-4 h-4 text-white drop-shadow-lg"
                          />
                        </div>
                      )}
                    </button>
                    <span
                      className={`text-[8px] tracking-wider uppercase transition-all ${
                        selectedColor.name === color.name
                          ? "opacity-100"
                          : "opacity-0 group-hover:opacity-70"
                      }`}
                      style={{ color: `${color.glow}1)` }}
                    >
                      {color.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom HUD line */}
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="w-12 h-px bg-linear-to-r from-transparent to-pink-500/50" />
                <div className="flex gap-0.5">
                  {availableColors.map((c, i) => (
                    <div
                      key={i}
                      className={`w-1.5 transition-all ${
                        selectedColor.name === c.name ? "h-4" : "h-2"
                      }`}
                      style={{
                        background: `${c.glow}${
                          selectedColor.name === c.name ? "1)" : "0.3)"
                        }`,
                        boxShadow:
                          selectedColor.name === c.name
                            ? `0 0 6px ${c.glow}0.8)`
                            : undefined,
                      }}
                    />
                  ))}
                </div>
                <div className="w-12 h-px bg-linear-to-l from-transparent to-cyan-500/50" />
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="group relative flex-1 py-4 bg-zinc-800/80 border-2 border-zinc-600 text-zinc-300 font-bold tracking-widest uppercase overflow-hidden transition-all hover:border-cyan-500 hover:text-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center gap-2">
                <Icon icon="pixelarticons:close" className="w-5 h-5" />
                ABORT
              </span>
            </button>

            <button
              onClick={handleSubmit}
              disabled={isLoading || !name.trim()}
              className="group relative flex-1 py-4 bg-linear-to-r from-pink-600 via-fuchsia-500 to-pink-600 text-white font-bold tracking-widest uppercase overflow-hidden transition-all hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                boxShadow: "0 0 30px rgba(236,72,153,0.4)",
                backgroundSize: "200% 100%",
                animation: "shimmer 3s linear infinite",
              }}
            >
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Icon
                      icon="pixelarticons:loader"
                      className="w-5 h-5 animate-spin"
                    />
                    SYNCING...
                  </>
                ) : (
                  <>
                    <Icon icon="pixelarticons:check" className="w-5 h-5" />
                    {isEditMode ? "UPDATE" : "INITIALIZE"}
                  </>
                )}
              </span>
            </button>
          </div>

          {/* Bottom HUD */}
          <div className="mt-6 flex items-center justify-between text-[10px]">
            <span className="text-fuchsia-400/60 tracking-widest">
              <Icon
                icon="pixelarticons:mood-happy"
                className="inline w-3 h-3 mr-1"
              />
              SYSTEM_READY
            </span>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className={`w-1.5 h-1.5 ${
                    i < 3 ? "bg-pink-500" : "bg-fuchsia-500"
                  } animate-pulse`}
                  style={{ animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
            <span className="text-cyan-400/60 tracking-widest">
              DATA_STREAM_ACTIVE
              <Icon icon="pixelarticons:zap" className="inline w-3 h-3 ml-1" />
            </span>
          </div>
        </div>
      </div>

      {/* Outer corner decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-pink-500/40" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-pink-500/40" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-pink-500/40" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-pink-500/40" />

      {/* Pinging corner dots */}
      {[
        "top-10 left-10",
        "top-10 right-10",
        "bottom-10 left-10",
        "bottom-10 right-10",
      ].map((pos, i) => (
        <div
          key={i}
          className={`absolute ${pos} w-3 h-3 ${
            i % 2 === 0 ? "bg-pink-500" : "bg-cyan-500"
          } animate-ping`}
          style={{ animationDelay: `${i * 150}ms` }}
        />
      ))}

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
