import { useEffect, useRef, type RefObject } from "react";
import { animate, createTimeline, stagger } from "animejs";

interface UseActivityAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  summaryRef: RefObject<HTMLDivElement | null>;
  timelineRef: RefObject<HTMLDivElement | null>;
  calendarRef: RefObject<HTMLDivElement | null>;
  itemsCount?: number;
  summariesCount?: number;
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
    summariesCount = 0,
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
    }
  }, [containerRef, summaryRef, timelineRef, calendarRef]);

  // Day cells animation (runs when summaries are loaded or updated)
  const prevSummariesCountRef = useRef(0);
  useEffect(() => {
    if (!calendarRef.current || summariesCount === 0) return;

    const days = calendarRef.current.querySelectorAll(".day-cell");
    const prevCount = prevSummariesCountRef.current;

    if (prevCount === 0) {
      // First load - animate all items
      animate(days, {
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: stagger(50, { start: 100 }),
        duration: 300,
      });
    } else if (summariesCount > prevCount) {
      // New items added - animate only the new ones and ensure all are visible
      const newDays = Array.from(days).slice(0, summariesCount - prevCount);
      animate(newDays, {
        opacity: [0, 1],
        scale: [0.5, 1],
        delay: stagger(50, { start: 50 }),
        duration: 300,
      });
      // Ensure existing days are visible
      Array.from(days)
        .slice(summariesCount - prevCount)
        .forEach((day) => {
          (day as HTMLElement).style.opacity = "1";
        });
    }

    prevSummariesCountRef.current = summariesCount;
  }, [calendarRef, summariesCount]);

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
