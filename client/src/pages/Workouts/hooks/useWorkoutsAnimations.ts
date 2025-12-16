import { useEffect, useRef, type RefObject } from "react";
import { animate, createTimeline, stagger } from "animejs";

interface UseWorkoutsAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  historyRef: RefObject<HTMLDivElement | null>;
  typesRef: RefObject<HTMLDivElement | null>;
  logFormRef: RefObject<HTMLDivElement | null>;
  isLoading: boolean;
}

/**
 * Workouts page-specific animations.
 * Decoration animations (grid, particles, corners, etc.) are handled by usePageDecorationsAnimations.
 */
export function useWorkoutsAnimations(props: UseWorkoutsAnimationsProps) {
  const {
    containerRef,
    headerRef,
    statsRef,
    historyRef,
    typesRef,
    logFormRef,
    isLoading,
  } = props;

  // Track if animation has run
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    // Wait for loading to complete and only run once
    if (isLoading || hasAnimatedRef.current || !containerRef.current) return;
    hasAnimatedRef.current = true;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    });

    if (headerRef.current)
      tl.add(
        headerRef.current,
        { opacity: [0, 1], translateY: [-30, 0], duration: 800 },
        "-=600"
      );

    if (statsRef.current) {
      const cards = statsRef.current.querySelectorAll(".stat-card");
      tl.add(
        cards,
        {
          opacity: [0, 1],
          rotateY: [90, 0],
          translateZ: [50, 0],
          delay: stagger(100),
          duration: 600,
        },
        "-=400"
      );
    }

    if (typesRef.current) {
      const types = typesRef.current.querySelectorAll(".type-btn");
      tl.add(
        types,
        {
          opacity: [0, 1],
          scale: [0.5, 1],
          delay: stagger(80),
          duration: 500,
          ease: "outBack",
        },
        "-=300"
      );
    }

    if (historyRef.current) {
      tl.add(
        historyRef.current,
        { opacity: [0, 1], translateX: [-30, 0], duration: 600 },
        "-=400"
      );
      const items = historyRef.current.querySelectorAll(".history-item");
      animate(items, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(100, { start: 800 }),
        duration: 400,
      });
    }

    if (logFormRef.current)
      tl.add(
        logFormRef.current,
        { opacity: [0, 1], translateY: [30, 0], duration: 600 },
        "-=300"
      );
  }, [isLoading]);
}
