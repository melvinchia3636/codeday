import { useEffect, type RefObject } from "react";
import { animate, createTimeline, stagger, random } from "animejs";

interface UseHydrationAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  tankRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  historyRef: RefObject<HTMLDivElement | null>;
  logRef: RefObject<HTMLDivElement | null>;
  bubblesRef: RefObject<HTMLDivElement | null>;
}

/**
 * Hydration page-specific animations.
 * Header animation is handled by PageHeader component.
 * Decoration animations are handled by usePageDecorationsAnimations.
 */
export function useHydrationAnimations(props: UseHydrationAnimationsProps) {
  const { containerRef, tankRef, statsRef, historyRef, logRef, bubblesRef } =
    props;

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    });

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

    // Bubbles animation (Hydration-specific)
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
  }, []);
}
