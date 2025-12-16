import { useEffect, type RefObject } from "react";
import { animate, createTimeline, stagger, random } from "animejs";

interface UseNutritionAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  macrosRef: RefObject<HTMLDivElement | null>;
  mealsRef: RefObject<HTMLDivElement | null>;
  foodsRef: RefObject<HTMLDivElement | null>;
  logRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  particlesRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

export function useNutritionAnimations(props: UseNutritionAnimationsProps) {
  const {
    containerRef,
    headerRef,
    macrosRef,
    mealsRef,
    foodsRef,
    logRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    particlesRef,
    scanlineRef,
    gridRef,
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
      animate(gridRef.current, {
        backgroundPosition: ["0px 0px", "40px 40px"],
        duration: 4000,
        ease: "linear",
        loop: true,
      });
    }

    if (headerRef.current)
      tl.add(
        headerRef.current,
        { opacity: [0, 1], translateY: [-30, 0], duration: 800 },
        "-=600"
      );

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
                "rgba(236,72,153,1)",
                "rgba(34,211,238,1)",
                "rgba(236,72,153,1)",
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
          i % 3 === 0
            ? "bg-pink-500/50"
            : i % 3 === 1
            ? "bg-cyan-500/50"
            : "bg-fuchsia-500/50"
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
