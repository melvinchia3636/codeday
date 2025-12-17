import { Icon } from "@iconify/react";
import { useEffect, useRef, useState } from "react";
import { animate, random } from "animejs";
import {
  useYandereLevel,
  type YandereLevel,
} from "../../../contexts/YandereLevelContext";
import { chatApi } from "../../../lib/chat";

// Level-based styling and images
const levelConfig: Record<
  YandereLevel,
  {
    label: string;
    icon: string;
    color: string;
    borderColor: string;
    image: string;
  }
> = {
  0: {
    label: "HAPPY_MODE",
    icon: "pixelarticons:mood-happy",
    color: "text-cyan-400",
    borderColor: "border-cyan-500",
    image: "/lucy/lvl0.gif",
  },
  1: {
    label: "NEUTRAL_MODE",
    icon: "pixelarticons:mood-neutral",
    color: "text-pink-400",
    borderColor: "border-pink-500",
    image: "/lucy/lvl1.gif",
  },
  2: {
    label: "TSUNDERE_MODE",
    icon: "pixelarticons:mood-sad",
    color: "text-fuchsia-400",
    borderColor: "border-fuchsia-500",
    image: "/lucy/lvl2.gif",
  },
  3: {
    label: "YANDERE_MODE",
    icon: "pixelarticons:heart",
    color: "text-red-400",
    borderColor: "border-red-500",
    image: "/lucy/lvl3.gif",
  },
};

// Fallback greetings by level
const fallbackGreetings: Record<YandereLevel, string> = {
  0: "You're doing great today~ ♡",
  1: "I've got my eyes on you~",
  2: "Don't disappoint me today...",
  3: "I won't let you neglect yourself.",
};

export function WaifuPanel() {
  const {
    yandereLevel,
    totalScore,
    nutritionScore,
    hydrationScore,
    workoutScore,
  } = useYandereLevel();
  const config = levelConfig[yandereLevel];

  const [greeting, setGreeting] = useState<string>(
    fallbackGreetings[yandereLevel]
  );
  const [isLoadingGreeting, setIsLoadingGreeting] = useState(true);

  const containerRef = useRef<HTMLElement>(null);
  const heartRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const hologramRef = useRef<HTMLDivElement>(null);
  const pulseRingsRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);

  // Fetch AI greeting on mount
  useEffect(() => {
    const fetchGreeting = async () => {
      try {
        const aiGreeting = await chatApi.getGreeting({
          yandereLevel,
          totalScore,
          nutritionScore,
          hydrationScore,
          workoutScore,
        });
        setGreeting(aiGreeting);
      } catch (error) {
        console.error("Failed to fetch greeting:", error);
        setGreeting(fallbackGreetings[yandereLevel]);
      } finally {
        setIsLoadingGreeting(false);
      }
    };

    fetchGreeting();
  }, []); // Only run on mount

  useEffect(() => {
    if (heartRef.current) {
      animate(heartRef.current, {
        scale: [1, 1.3, 1, 1.3, 1],
        duration: 1500,
        ease: "inOutSine",
        loop: true,
      });
      animate(heartRef.current, {
        filter: [
          "drop-shadow(0 0 10px rgba(236,72,153,0.5))",
          "drop-shadow(0 0 30px rgba(236,72,153,1))",
          "drop-shadow(0 0 10px rgba(236,72,153,0.5))",
        ],
        duration: 1500,
        ease: "inOutSine",
        loop: true,
      });
    }

    if (imageRef.current) {
      animate(imageRef.current, {
        rotate: [-0.8, 0.8],
        translateX: [-2, 2],
        duration: 5000,
        ease: "inOutSine",
        loop: true,
        alternate: true,
      });

      animate(imageRef.current, {
        scaleY: [1, 1.008, 1],
        scaleX: [1, 0.998, 1],
        duration: 3500,
        ease: "inOutSine",
        loop: true,
      });
    }

    if (textRef.current) {
      const loader = textRef.current.querySelector(".loader-icon");
      if (loader)
        animate(loader, {
          rotate: [0, 360],
          duration: 2000,
          ease: "linear",
          loop: true,
        });

      const glitchInterval = setInterval(() => {
        if (textRef.current) {
          animate(textRef.current, {
            translateX: [0, random(-3, 3), 0],
            duration: 100,
            ease: "inOutQuad",
          });
        }
      }, random(4000, 7000));
      return () => clearInterval(glitchInterval);
    }
  }, []);

  useEffect(() => {
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: 600,
          delay: 200 + i * 100,
          ease: "outBack",
        });
        setTimeout(() => {
          animate(corner, {
            opacity: [1, 0.3, 1],
            borderColor: [
              "rgba(236,72,153,1)",
              "rgba(34,211,238,1)",
              "rgba(236,72,153,1)",
            ],
            duration: 2500,
            delay: i * 200,
            ease: "inOutSine",
            loop: true,
          });
        }, 800 + i * 100);
      }
    });

    if (bottomLineRef.current) {
      animate(bottomLineRef.current, {
        opacity: [0.5, 1, 0.5],
        boxShadow: [
          "0 0 10px rgba(236,72,153,0.3)",
          "0 0 30px rgba(34,211,238,0.8)",
          "0 0 10px rgba(236,72,153,0.3)",
        ],
        duration: 2000,
        ease: "inOutSine",
        loop: true,
      });
    }

    orbsRef.current.forEach((orb, i) => {
      if (orb) {
        animate(orb, {
          translateX: [0, random(-40, 40)],
          translateY: [0, random(-40, 40)],
          scale: [1, random(1.2, 1.6), 1],
          opacity: [0.1, 0.4, 0.1],
          duration: random(4000, 6000),
          ease: "inOutSine",
          loop: true,
          delay: i * 500,
        });
      }
    });

    if (scanlineRef.current) {
      animate(scanlineRef.current, {
        translateY: ["-100%", "200vh"],
        duration: 4000,
        ease: "linear",
        loop: true,
      });
    }

    if (hologramRef.current) {
      animate(hologramRef.current, {
        opacity: [0.02, 0.08, 0.02],
        duration: 3000,
        ease: "inOutSine",
        loop: true,
      });
    }

    pulseRingsRef.current.forEach((ring, i) => {
      if (ring) {
        animate(ring, {
          scale: [0.3, 2],
          opacity: [0.6, 0],
          duration: 3000,
          delay: i * 1000,
          ease: "outExpo",
          loop: true,
        });
      }
    });

    if (particlesRef.current) {
      for (let i = 0; i < 15; i++) {
        const particle = document.createElement("div");
        const size = random(2, 4);
        particle.className = `absolute rounded-full ${
          i % 2 === 0 ? "bg-pink-500/40" : "bg-cyan-500/40"
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${random(10, 90)}%`;
        particle.style.top = `${random(10, 90)}%`;
        particlesRef.current.appendChild(particle);
        animate(particle, {
          translateY: [0, random(-60, -120)],
          translateX: [0, random(-30, 30)],
          opacity: [0.7, 0],
          scale: [1, 0],
          duration: random(3000, 5000),
          ease: "outExpo",
          loop: true,
          delay: random(0, 2000),
        });
      }
    }

    if (containerRef.current) {
      animate(containerRef.current, {
        borderColor: [
          "rgba(236,72,153,1)",
          "rgba(34,211,238,0.8)",
          "rgba(168,85,247,0.8)",
          "rgba(236,72,153,1)",
        ],
        boxShadow: [
          "inset 0 0 30px rgba(236,72,153,0.1)",
          "inset 0 0 50px rgba(34,211,238,0.15)",
          "inset 0 0 30px rgba(236,72,153,0.1)",
        ],
        duration: 6000,
        ease: "inOutSine",
        loop: true,
      });
    }
  }, []);

  return (
    <section
      ref={containerRef}
      className="border-[4px] border-pink-500 w-full h-full bg-gradient-to-b from-zinc-900 to-fuchsia-950/20 relative overflow-hidden flex items-center justify-center backdrop-blur-sm"
    >
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none"
      ></div>
      <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(236,72,153,0.5)_1px,transparent_1px),linear-gradient(90deg,rgba(236,72,153,0.5)_1px,transparent_1px)] bg-[size:15px_15px]"></div>
      <div
        ref={hologramRef}
        className="absolute inset-0 bg-[linear-gradient(0deg,transparent_50%,rgba(34,211,238,0.1)_50%)] bg-[length:100%_4px] pointer-events-none"
      ></div>
      <div
        ref={scanlineRef}
        className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent pointer-events-none z-10"
      ></div>

      {(orbsRef.current = [])}
      {[...Array(4)].map((_, i) => (
        <div
          key={`orb-${i}`}
          ref={(el) => {
            if (el) orbsRef.current[i] = el;
          }}
          className={`absolute rounded-full blur-2xl pointer-events-none ${
            i % 2 === 0
              ? "w-32 h-32 bg-pink-500/20"
              : "w-24 h-24 bg-cyan-500/20"
          }`}
          style={{ left: `${i * 25 + 10}%`, top: `${i * 20 + 15}%` }}
        ></div>
      ))}

      {(pulseRingsRef.current = [])}
      {[...Array(3)].map((_, i) => (
        <div
          key={`pulse-${i}`}
          ref={(el) => {
            if (el) pulseRingsRef.current[i] = el;
          }}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/50 pointer-events-none"
          style={{ width: "60px", height: "60px", opacity: 0 }}
        ></div>
      ))}

      <div
        ref={textRef}
        className="relative z-10 flex flex-col items-center justify-center h-full w-full p-4"
      >
        {/* Speech Bubble */}
        <div className="absolute top-4 left-4 right-4 z-20">
          <div className="relative bg-zinc-900/90 border border-pink-500/50 p-3 rounded-lg backdrop-blur-sm">
            <div className="absolute -bottom-2 left-8 w-4 h-4 bg-zinc-900/90 border-r border-b border-pink-500/50 transform rotate-45" />
            <p className={`text-sm ${config.color} leading-relaxed`}>
              {isLoadingGreeting ? (
                <span className="animate-pulse">...</span>
              ) : (
                greeting
              )}
            </p>
          </div>
        </div>
        <img
          ref={imageRef}
          src={config.image}
          alt="Lucy - Your Waifu Companion"
          className="max-h-full max-w-full object-contain drop-shadow-[0_0_20px_rgba(236,72,153,0.5)]"
          style={{ transformOrigin: "bottom center" }}
        />
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p
            className={`${config.color} text-xs tracking-widest flex items-center justify-center gap-2`}
          >
            <span ref={heartRef}>
              <Icon icon={config.icon} className="w-4 h-4" />
            </span>
            LUCY.exe • {config.label} • {totalScore}%
          </p>
        </div>
      </div>

      <div
        ref={bottomLineRef}
        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-cyan-500"
      ></div>

      {(cornersRef.current = [])}
      <div
        ref={(el) => {
          if (el) cornersRef.current[0] = el;
        }}
        className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-pink-500"
        style={{ opacity: 0 }}
      ></div>
      <div
        ref={(el) => {
          if (el) cornersRef.current[1] = el;
        }}
        className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-pink-500"
        style={{ opacity: 0 }}
      ></div>
      <div
        ref={(el) => {
          if (el) cornersRef.current[2] = el;
        }}
        className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-pink-500"
        style={{ opacity: 0 }}
      ></div>
      <div
        ref={(el) => {
          if (el) cornersRef.current[3] = el;
        }}
        className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-pink-500"
        style={{ opacity: 0 }}
      ></div>
    </section>
  );
}
