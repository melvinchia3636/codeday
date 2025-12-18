import { useEffect, type RefObject } from "react";
import { animate, createTimeline, stagger, random } from "animejs";

interface UseProfileAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  avatarRef: RefObject<HTMLDivElement | null>;
  userInfoRef: RefObject<HTMLDivElement | null>;
  settingsRef: RefObject<HTMLDivElement | null>;
  targetsRef: RefObject<HTMLDivElement | null>;
  waifuRef: RefObject<HTMLDivElement | null>;
  dangerZoneRef: RefObject<HTMLDivElement | null>;
  sideBarsRef: RefObject<HTMLDivElement[]>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
  isReady?: boolean;
}

/**
 * Profile page-specific animations.
 * Header animation is handled by PageHeader component.
 * Decoration animations are handled by usePageDecorationsAnimations.
 */
export function useProfileAnimations(props: UseProfileAnimationsProps) {
  const {
    containerRef,
    avatarRef,
    userInfoRef,
    settingsRef,
    targetsRef,
    waifuRef,
    dangerZoneRef,
    sideBarsRef,
    glitchOverlayRef,
    isReady = true,
  } = props;

  useEffect(() => {
    // Wait until ready (data loaded) and container exists
    if (!isReady || !containerRef.current) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    // Container entrance
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    });

    // Avatar epic entrance
    if (avatarRef.current) {
      tl.add(
        avatarRef.current,
        {
          opacity: [0, 1],
          scale: [0.5, 1.1, 1],
          rotateY: [180, 0],
          duration: 1200,
          ease: "outElastic(1, .5)",
        },
        "-=400"
      );
      // Continuous glow pulse
      animate(avatarRef.current, {
        boxShadow: [
          "0 0 30px rgba(236,72,153,0.5), inset 0 0 20px rgba(236,72,153,0.3)",
          "0 0 60px rgba(34,211,238,0.7), inset 0 0 40px rgba(34,211,238,0.4)",
          "0 0 30px rgba(236,72,153,0.5), inset 0 0 20px rgba(236,72,153,0.3)",
        ],
        duration: 3000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // User info cards stagger
    if (userInfoRef.current) {
      const cards = userInfoRef.current.querySelectorAll(".info-card");
      tl.add(
        cards,
        {
          opacity: [0, 1],
          translateX: [-30, 0],
          rotateY: [45, 0],
          delay: stagger(100),
          duration: 600,
        },
        "-=600"
      );
    }

    // Settings panel
    if (settingsRef.current) {
      tl.add(
        settingsRef.current,
        { opacity: [0, 1], translateY: [30, 0], duration: 600 },
        "-=300"
      );
      const items = settingsRef.current.querySelectorAll(".setting-item");
      animate(items, {
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: stagger(80, { start: 500 }),
        duration: 400,
      });
    }

    // Targets panel
    if (targetsRef.current) {
      tl.add(
        targetsRef.current,
        { opacity: [0, 1], translateX: [30, 0], duration: 600 },
        "-=400"
      );
    }

    // Waifu panel with bounce
    if (waifuRef.current) {
      tl.add(
        waifuRef.current,
        {
          opacity: [0, 1],
          scale: [0.8, 1],
          duration: 1000,
          ease: "outElastic(1, .6)",
        },
        "-=400"
      );
    }

    // Danger zone panel with warning effect
    if (dangerZoneRef.current) {
      tl.add(
        dangerZoneRef.current,
        {
          opacity: [0, 1],
          translateY: [20, 0],
          duration: 600,
        },
        "-=300"
      );
    }

    // Side bars (Profile-specific decoration)
    sideBarsRef.current.forEach((bar, i) => {
      if (bar) {
        animate(bar, {
          scaleY: [0, 1],
          opacity: [0, 1],
          duration: 500,
          delay: 800 + i * 100,
          ease: "outExpo",
        });
        setTimeout(() => {
          animate(bar, {
            scaleY: [1, 0.4, 1],
            opacity: [1, 0.5, 1],
            duration: 2000,
            delay: i * 120,
            ease: "inOutSine",
            loop: true,
          });
        }, 1300 + i * 100);
      }
    });

    // Glitch overlay (Profile-specific)
    const glitchInterval = setInterval(() => {
      if (glitchOverlayRef.current && Math.random() > 0.7) {
        animate(glitchOverlayRef.current, {
          opacity: [0, 0.3, 0],
          translateX: [0, random(-10, 10), 0],
          skewX: [0, random(-2, 2), 0],
          duration: 100,
          ease: "inOutQuad",
        });
      }
    }, random(2000, 4000));

    // Stat value counting animation
    document.querySelectorAll(".stat-value").forEach((el) => {
      const target = parseFloat(el.getAttribute("data-value") || "0");
      animate(el, {
        innerHTML: [0, target],
        round: el.classList.contains("decimal") ? 10 : 1,
        duration: 2000,
        delay: 1000,
        ease: "outExpo",
      });
    });

    return () => {
      clearInterval(glitchInterval);
    };
  }, [isReady]);
}

export function useInputAnimations() {
  const handleInputFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    animate(e.target, {
      boxShadow:
        "0 0 20px rgba(236,72,153,0.6), inset 0 0 10px rgba(236,72,153,0.2)",
      borderColor: "rgba(236,72,153,1)",
      duration: 200,
      ease: "outQuad",
    });
  };

  const handleInputBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    animate(e.target, {
      boxShadow: "0 0 0 transparent",
      borderColor: "rgba(236,72,153,0.4)",
      duration: 200,
      ease: "outQuad",
    });
  };

  return { handleInputFocus, handleInputBlur };
}

export function useButtonAnimations() {
  const handleButtonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    animate(e.currentTarget, {
      scale: 1.05,
      boxShadow: "0 0 30px rgba(236,72,153,0.6)",
      duration: 150,
      ease: "outQuad",
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      boxShadow: "0 0 0 transparent",
      duration: 150,
      ease: "outQuad",
    });
  };

  return { handleButtonHover, handleButtonLeave };
}
