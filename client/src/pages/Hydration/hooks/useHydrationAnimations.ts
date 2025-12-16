import { useEffect, type RefObject } from "react";
import { animate, createTimeline, stagger, random } from "animejs";

interface UseHydrationAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  tankRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  historyRef: RefObject<HTMLDivElement | null>;
  logRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  particlesRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
  bubblesRef: RefObject<HTMLDivElement | null>;
}

export function useHydrationAnimations(props: UseHydrationAnimationsProps) {
  const {
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
  } = props;

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    });

    const lines = [topLineRef.current, bottomLineRef.current].filter(Boolean);
    if (lines.length > 0)
      tl.add(lines, { scaleX: [0, 1], duration: 1000 }, "-=600");

    if (gridRef.current) {
      tl.add(gridRef.current, { opacity: [0, 0.15], duration: 800 }, "-=800");
    }

    if (headerRef.current)
      tl.add(
        headerRef.current,
        { opacity: [0, 1], translateY: [-30, 0], duration: 800 },
        "-=600"
      );

    if (tankRef.current) {
      tl.add(
        tankRef.current,
        {
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 1000,
          ease: "outElastic(1, .6)",
        },
        "-=400"
      );
      // Note: Water level animation is now handled by WaterTank component
      // to support dynamic percentage from API data
    }

    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll(".stat-card");
      tl.add(
        cards,
        {
          opacity: [0, 1],
          translateY: [30, 0],
          delay: stagger(100),
          duration: 500,
        },
        "-=400"
      );
    }

    if (historyRef.current) {
      tl.add(
        historyRef.current,
        { opacity: [0, 1], translateX: [-30, 0], duration: 600 },
        "-=400"
      );
      const items = historyRef.current.querySelectorAll(".log-item");
      animate(items, {
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: stagger(80, { start: 600 }),
        duration: 400,
      });
    }

    if (logRef.current)
      tl.add(
        logRef.current,
        { opacity: [0, 1], translateX: [30, 0], duration: 600 },
        "-=400"
      );

    // Bubbles animation
    if (bubblesRef.current) {
      for (let i = 0; i < 20; i++) {
        const bubble = document.createElement("div");
        const size = random(4, 12);
        bubble.className =
          "absolute rounded-full bg-cyan-400/30 border border-cyan-400/50";
        bubble.style.cssText = `width:${size}px;height:${size}px;left:${random(
          10,
          90
        )}%;bottom:0`;
        bubblesRef.current.appendChild(bubble);
        animate(bubble, {
          translateY: [0, random(-150, -250)],
          opacity: [0.8, 0],
          scale: [1, 0.5],
          duration: random(2000, 4000),
          ease: "outQuad",
          loop: true,
          delay: random(0, 2000),
        });
      }
    }

    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: 800,
          delay: 600 + i * 150,
          ease: "outElastic(1, .5)",
        });
        setTimeout(
          () =>
            animate(corner, {
              opacity: [1, 0.3, 1],
              borderColor: [
                "rgba(34,211,238,1)",
                "rgba(236,72,153,1)",
                "rgba(34,211,238,1)",
              ],
              duration: 2500,
              delay: i * 300,
              ease: "inOutSine",
              loop: true,
            }),
          1500
        );
      }
    });

    orbsRef.current.forEach((orb, i) => {
      if (orb)
        animate(orb, {
          translateX: [0, random(-50, 50)],
          translateY: [0, random(-50, 50)],
          scale: [1, random(0.7, 1.4)],
          opacity: [0.3, random(0.1, 0.6)],
          duration: random(4000, 7000),
          ease: "inOutSine",
          loop: true,
          alternate: true,
          delay: i * 400,
        });
    });

    if (particlesRef.current) {
      for (let i = 0; i < 35; i++) {
        const particle = document.createElement("div");
        const size = random(2, 5);
        particle.className = `absolute rounded-full ${
          i % 2 === 0 ? "bg-cyan-500/50" : "bg-pink-500/40"
        }`;
        particle.style.cssText = `width:${size}px;height:${size}px;left:${random(
          0,
          100
        )}%;top:${random(0, 100)}%;box-shadow:0 0 ${size * 2}px currentColor`;
        particlesRef.current.appendChild(particle);
        animate(particle, {
          translateY: [0, random(-200, -350)],
          opacity: [0.8, 0],
          scale: [1, 0],
          duration: random(4000, 7000),
          ease: "outExpo",
          loop: true,
          delay: random(0, 3000),
        });
      }
    }

    if (scanlineRef.current)
      animate(scanlineRef.current, {
        translateY: ["-100%", "200vh"],
        duration: 3000,
        ease: "linear",
        loop: true,
      });
  }, []);
}
