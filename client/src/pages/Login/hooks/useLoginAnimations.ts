import { useEffect, type RefObject } from "react";
import { animate, createTimeline, stagger } from "animejs";

interface UseLoginAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  logoRef: RefObject<HTMLHeadingElement | null>;
  cardRef: RefObject<HTMLDivElement | null>;
  cursorRef: RefObject<HTMLSpanElement | null>;
  glowBorderRef: RefObject<HTMLDivElement | null>;
  terminalIndicatorRef: RefObject<HTMLSpanElement | null>;
  sideBarsLeftRef: RefObject<HTMLDivElement[]>;
  sideBarsRightRef: RefObject<HTMLDivElement[]>;
  indicatorDotsRef: RefObject<HTMLDivElement[]>;
}

/**
 * Login page-specific animations.
 * Decoration animations (grid, particles, corners, etc.) are handled by usePageDecorationsAnimations.
 */
export function useLoginAnimations({
  containerRef,
  logoRef,
  cardRef,
  cursorRef,
  glowBorderRef,
  terminalIndicatorRef,
  sideBarsLeftRef,
  sideBarsRightRef,
  indicatorDotsRef,
}: UseLoginAnimationsProps) {
  useEffect(() => {
    if (!containerRef.current || !logoRef.current || !cardRef.current) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    // Container entrance
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    });

    // Logo entrance
    tl.add(
      logoRef.current,
      {
        opacity: [0, 1],
        translateY: [-50, 0],
        duration: 1000,
        ease: "outElastic(1, .6)",
      },
      "-=600"
    );

    // Cursor blink
    if (cursorRef.current) {
      animate(cursorRef.current, {
        opacity: [1, 0],
        duration: 500,
        ease: "inOutQuad",
        loop: true,
        alternate: true,
      });
    }

    // Card entrance
    tl.add(
      cardRef.current,
      { opacity: [0, 1], translateY: [30, 0], rotateX: [10, 0], duration: 800 },
      "-=600"
    );

    // Glow border rotation
    if (glowBorderRef.current) {
      animate(glowBorderRef.current, {
        background: [
          "linear-gradient(0deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3), rgba(34,211,238,0.3))",
          "linear-gradient(90deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3), rgba(34,211,238,0.3))",
          "linear-gradient(180deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3), rgba(34,211,238,0.3))",
          "linear-gradient(270deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3), rgba(34,211,238,0.3))",
          "linear-gradient(360deg, rgba(236,72,153,0.3), rgba(168,85,247,0.3), rgba(34,211,238,0.3))",
        ],
        duration: 4000,
        ease: "linear",
        loop: true,
      });
    }

    // Form elements stagger
    const formElements = cardRef.current?.querySelectorAll(".form-element");
    if (formElements && formElements.length > 0) {
      tl.add(
        formElements,
        {
          opacity: [0, 1],
          translateX: [-20, 0],
          delay: stagger(100),
          duration: 600,
        },
        "-=400"
      );
    }

    // Terminal indicator pulse
    if (terminalIndicatorRef.current) {
      animate(terminalIndicatorRef.current, {
        scale: [1, 1.5, 1],
        opacity: [1, 0.5, 1],
        duration: 1000,
        ease: "inOutQuad",
        loop: true,
      });
    }

    // Side bars left (Login-specific)
    sideBarsLeftRef.current.forEach((bar, i) => {
      if (bar) {
        animate(bar, {
          scaleX: [0, 1],
          opacity: [0, 1],
          duration: 500,
          delay: 1000 + i * 80,
          ease: "outExpo",
        });
        const innerDiv = bar.querySelector("div:first-child");
        if (innerDiv)
          animate(innerDiv, {
            scaleX: [0.5, 1, 0.5],
            duration: 1500,
            delay: i * 100,
            ease: "inOutSine",
            loop: true,
          });
      }
    });

    // Side bars right (Login-specific)
    sideBarsRightRef.current.forEach((bar, i) => {
      if (bar) {
        animate(bar, {
          scaleX: [0, 1],
          opacity: [0, 1],
          duration: 500,
          delay: 1000 + i * 80,
          ease: "outExpo",
        });
        const innerDiv = bar.querySelector("div:last-child");
        if (innerDiv)
          animate(innerDiv, {
            scaleX: [0.5, 1, 0.5],
            duration: 1500,
            delay: i * 100,
            ease: "inOutSine",
            loop: true,
          });
      }
    });

    // Indicator dots
    if (indicatorDotsRef.current.length > 0) {
      animate(indicatorDotsRef.current, {
        scale: [0, 1],
        opacity: [0, 1],
        delay: stagger(100, { start: 1200 }),
        duration: 400,
        ease: "outBack",
      });
      animate(indicatorDotsRef.current, {
        scale: [1, 1.2, 1],
        duration: 1000,
        delay: stagger(150),
        ease: "inOutSine",
        loop: true,
      });
    }

    // Periodic glitch effect
    const glitchInterval = setInterval(() => {
      if (logoRef.current) {
        animate(logoRef.current, {
          translateX: [0, -3, 3, -2, 2, 0],
          duration: 200,
          ease: "inOutQuad",
        });
        animate(logoRef.current, {
          textShadow: [
            "0 0 0 transparent",
            "-2px 0 0 rgba(236,72,153,0.5), 2px 0 0 rgba(34,211,238,0.5)",
            "0 0 0 transparent",
          ],
          duration: 200,
          ease: "inOutQuad",
        });
      }
    }, 5000);

    return () => clearInterval(glitchInterval);
  }, []);
}

export function useInputAnimations() {
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    animate(e.target, {
      boxShadow: [
        "0 0 0 rgba(34, 211, 238, 0)",
        "0 0 20px rgba(34, 211, 238, 0.4)",
      ],
      borderColor: ["rgba(236, 72, 153, 0.3)", "rgba(34, 211, 238, 1)"],
      duration: 300,
      ease: "outQuad",
    });
    const inputIcon = e.target.parentElement?.querySelector(".input-icon");
    if (inputIcon)
      animate(inputIcon, {
        scale: [1, 1.3, 1],
        rotate: [0, 180],
        duration: 500,
        ease: "outElastic(1, .5)",
      });
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    animate(e.target, {
      boxShadow: "0 0 0 rgba(34, 211, 238, 0)",
      borderColor: "rgba(236, 72, 153, 0.3)",
      duration: 300,
      ease: "outQuad",
    });
  };

  return { handleInputFocus, handleInputBlur };
}

export function useButtonAnimations() {
  const handleButtonHover = () => {
    animate(".submit-btn", {
      scale: 1.02,
      boxShadow: "0 0 40px rgba(236, 72, 153, 0.6)",
      duration: 300,
      ease: "outQuad",
    });
  };

  const handleButtonLeave = () => {
    animate(".submit-btn", {
      scale: 1,
      boxShadow: "0 0 0 rgba(236, 72, 153, 0)",
      duration: 300,
      ease: "outQuad",
    });
  };

  return { handleButtonHover, handleButtonLeave };
}

export function useSubmitAnimation(cardRef: RefObject<HTMLDivElement | null>) {
  const triggerSubmitAnimation = () => {
    animate(".submit-btn", {
      scale: [1, 0.98, 1],
      duration: 300,
      ease: "inOutQuad",
    });
    if (cardRef.current) {
      animate(cardRef.current, {
        translateX: [0, -5, 5, -3, 3, 0],
        duration: 500,
        ease: "inOutQuad",
      });
    }
  };

  return { triggerSubmitAnimation };
}
