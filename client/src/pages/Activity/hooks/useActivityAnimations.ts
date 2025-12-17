import { useEffect, useRef, type RefObject } from "react";
import { animate, createTimeline, stagger } from "animejs";

interface UseActivityAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  summaryRef: RefObject<HTMLDivElement | null>;
  timelineRef: RefObject<HTMLDivElement | null>;
  calendarRef: RefObject<HTMLDivElement | null>;
  itemsCount?: number;
}

/**
 * Activity page-specific animations.
 * Header animation is handled by PageHeader component.
 * Decoration animations are handled by usePageDecorationsAnimations.
 */
export function useActivityAnimations(props: UseActivityAnimationsProps) {
  const {
    containerRef,
    summaryRef,
    timelineRef,
    calendarRef,
    itemsCount = 0,
  } = props;
  const hasAnimatedContainerRef = useRef(false);

  // Container and summary animation (runs once)
  useEffect(() => {
    if (!containerRef.current || hasAnimatedContainerRef.current) return;

    hasAnimatedContainerRef.current = true;
    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    });

    if (summaryRef.current) {
      const cards = summaryRef.current.querySelectorAll(".summary-card");
      tl.add(
        cards,
        {
          opacity: [0, 1],
          rotateX: [90, 0],
          delay: stagger(100),
          duration: 600,
        },
        "-=400"
      );
    }

    if (timelineRef.current) {
      tl.add(
        timelineRef.current,
        { opacity: [0, 1], translateX: [-30, 0], duration: 600 },
        "-=400"
      );
    }

    if (calendarRef.current) {
      tl.add(
        calendarRef.current,
        { opacity: [0, 1], translateX: [30, 0], duration: 600 },
        "-=400"
      );
      const days = calendarRef.current.querySelectorAll(".day-cell");
      animate(days, {
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: stagger(20, { start: 800, grid: [7, 5], from: "center" }),
        duration: 300,
      });
    }
  }, [containerRef, summaryRef, timelineRef, calendarRef]);

  // Timeline items animation (runs when items change)
  useEffect(() => {
    if (!timelineRef.current || itemsCount === 0) return;

    const items = timelineRef.current.querySelectorAll(".timeline-item");
    const line = timelineRef.current.querySelector(".timeline-line");

    if (line) {
      animate(line, {
        scaleY: [0, 1],
        duration: 1500,
        delay: 200,
        ease: "outExpo",
      });
    }

    animate(items, {
      opacity: [0, 1],
      translateX: [-20, 0],
      delay: stagger(100, { start: 300 }),
      duration: 400,
    });
  }, [timelineRef, itemsCount]);
}
