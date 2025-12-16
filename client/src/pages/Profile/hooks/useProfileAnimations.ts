import { useEffect, type RefObject } from "react";
import { animate, createTimeline, stagger, random } from "animejs";

interface UseProfileAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  headerRef: RefObject<HTMLDivElement | null>;
  avatarRef: RefObject<HTMLDivElement | null>;
  userInfoRef: RefObject<HTMLDivElement | null>;
  settingsRef: RefObject<HTMLDivElement | null>;
  targetsRef: RefObject<HTMLDivElement | null>;
  waifuRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  sideBarsRef: RefObject<HTMLDivElement[]>;
  particlesRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
  gridRef: RefObject<HTMLDivElement | null>;
}

export function useProfileAnimations(props: UseProfileAnimationsProps) {
  const {
    containerRef,
    headerRef,
    avatarRef,
    userInfoRef,
    settingsRef,
    targetsRef,
    waifuRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    sideBarsRef,
    particlesRef,
    scanlineRef,
    glitchOverlayRef,
    gridRef,
  } = props;

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    // Container entrance
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    });

    // Lines
    const lines = [topLineRef.current, bottomLineRef.current].filter(Boolean);
    if (lines.length > 0)
      tl.add(
        lines,
        { scaleX: [0, 1], duration: 1000, ease: "outExpo" },
        "-=600"
      );

    // Grid animation
    if (gridRef.current) {
      tl.add(gridRef.current, { opacity: [0, 0.15], duration: 800 }, "-=800");
      animate(gridRef.current, {
        backgroundPosition: ["0px 0px", "40px 40px"],
        duration: 4000,
        ease: "linear",
        loop: true,
      });
    }

    // Header entrance
    if (headerRef.current) {
      tl.add(
        headerRef.current,
        { opacity: [0, 1], translateY: [-30, 0], duration: 800 },
        "-=600"
      );
    }

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

    // Corners
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.3, 1],
          rotate: [90, 0],
          duration: 800,
          delay: 600 + i * 150,
          ease: "outElastic(1, .5)",
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
            delay: i * 300,
            ease: "inOutSine",
            loop: true,
          });
        }, 1500);
      }
    });

    // Side bars
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

    // Orbs floating
    orbsRef.current.forEach((orb, i) => {
      if (orb) {
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
        animate(orb, {
          boxShadow: [
            "0 0 50px rgba(236,72,153,0.3)",
            "0 0 100px rgba(34,211,238,0.6)",
            "0 0 50px rgba(236,72,153,0.3)",
          ],
          duration: random(2000, 4000),
          ease: "inOutSine",
          loop: true,
          delay: i * 200,
        });
      }
    });

    // Particles
    if (particlesRef.current) {
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement("div");
        const size = random(2, 5);
        particle.className = `absolute rounded-full ${
          i % 3 === 0
            ? "bg-pink-500/50"
            : i % 3 === 1
            ? "bg-cyan-500/50"
            : "bg-fuchsia-500/50"
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${random(0, 100)}%`;
        particle.style.top = `${random(0, 100)}%`;
        particle.style.boxShadow = `0 0 ${size * 2}px currentColor`;
        particlesRef.current.appendChild(particle);
        animate(particle, {
          translateY: [0, random(-200, -350)],
          translateX: [0, random(-80, 80)],
          opacity: [0.8, 0],
          scale: [1, 0],
          duration: random(4000, 7000),
          ease: "outExpo",
          loop: true,
          delay: random(0, 3000),
        });
      }
    }

    // Scanline
    if (scanlineRef.current) {
      animate(scanlineRef.current, {
        translateY: ["-100%", "200vh"],
        duration: 3000,
        ease: "linear",
        loop: true,
      });
    }

    // Glitch overlay
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
  }, []);
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
