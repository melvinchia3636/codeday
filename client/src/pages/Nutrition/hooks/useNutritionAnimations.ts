import { useEffect, type RefObject } from "react";
import { animate, createTimeline, stagger } from "animejs";

interface UseNutritionAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  macrosRef: RefObject<HTMLDivElement | null>;
  mealsRef: RefObject<HTMLDivElement | null>;
  foodsRef: RefObject<HTMLDivElement | null>;
  logRef: RefObject<HTMLDivElement | null>;
}

/**
 * Nutrition page-specific animations.
 * Header animation is handled by PageHeader component.
 * Decoration animations are handled by usePageDecorationsAnimations.
 */
export function useNutritionAnimations(props: UseNutritionAnimationsProps) {
  const { containerRef, macrosRef, mealsRef, foodsRef, logRef } = props;

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    });

    if (macrosRef.current) {
      const circles = macrosRef.current.querySelectorAll(".macro-circle");
      tl.add(
        circles,
        {
          opacity: [0, 1],
          scale: [0.5, 1],
          rotate: [180, 0],
          delay: stagger(120),
          duration: 800,
          ease: "outElastic(1, .6)",
        },
        "-=400"
      );
    }

    if (mealsRef.current) {
      tl.add(
        mealsRef.current,
        { opacity: [0, 1], translateX: [-30, 0], duration: 600 },
        "-=400"
      );
      const items = mealsRef.current.querySelectorAll(".meal-item");
      animate(items, {
        opacity: [0, 1],
        translateY: [20, 0],
        delay: stagger(80, { start: 600 }),
        duration: 400,
      });
    }

    if (foodsRef.current) {
      tl.add(
        foodsRef.current,
        { opacity: [0, 1], translateX: [30, 0], duration: 600 },
        "-=400"
      );
      const foods = foodsRef.current.querySelectorAll(".food-item");
      animate(foods, {
        opacity: [0, 1],
        scale: [0.8, 1],
        delay: stagger(60, { start: 800 }),
        duration: 400,
        ease: "outBack",
      });
    }

    if (logRef.current)
      tl.add(
        logRef.current,
        { opacity: [0, 1], translateY: [30, 0], duration: 600 },
        "-=300"
      );
  }, []);
}
