import { useEffect, useRef } from "react";
import { animate, random } from "animejs";
import { usePageDecorationsRefs } from "../contexts/PageDecorationsContext";

/**
 * Unified hook for page decoration animations.
 * Handles animations for grid, scanline, particles, orbs, and corner decorations.
 * Uses refs from PageDecorationsContext.
 */
export function usePageDecorationsAnimations() {
  const {
    particlesRef,
    gridRef,
    scanlineRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    color,
  } = usePageDecorationsRefs();

  // Track if animations have been initialized
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    const isPink = color === "pink";
    const primaryColor = isPink ? "rgba(236,72,153,1)" : "rgba(34,211,238,1)";
    const secondaryColor = isPink ? "rgba(34,211,238,1)" : "rgba(236,72,153,1)";

    // Lines animation
    const lines = [topLineRef.current, bottomLineRef.current].filter(Boolean);
    if (lines.length > 0) {
      animate(lines, {
        scaleX: [0, 1],
        duration: 1000,
        ease: "outExpo",
        delay: 200,
      });
    }

    // Grid animation
    if (gridRef.current) {
      animate(gridRef.current, {
        opacity: [0, 0.15],
        duration: 800,
        ease: "outExpo",
      });
      animate(gridRef.current, {
        backgroundPosition: ["0px 0px", "40px 40px"],
        duration: 4000,
        ease: "linear",
        loop: true,
      });
    }

    // Corners animation
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.3, 1],
          duration: 800,
          delay: 600 + i * 150,
          ease: "outElastic(1, .5)",
        });
        // Delayed looping animation
        setTimeout(
          () =>
            animate(corner, {
              opacity: [1, 0.3, 1],
              borderColor: [primaryColor, secondaryColor, primaryColor],
              duration: 2500,
              delay: i * 300,
              ease: "inOutSine",
              loop: true,
            }),
          1500
        );
      }
    });

    // Orbs animation
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
      }
    });

    // Particles animation
    if (particlesRef.current) {
      const particleCount = 40;
      for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        const size = random(2, 5);

        // Determine particle color based on theme
        let particleClass: string;
        if (isPink) {
          particleClass =
            i % 3 === 0
              ? "bg-pink-500/50"
              : i % 3 === 1
              ? "bg-cyan-500/50"
              : "bg-fuchsia-500/50";
        } else {
          particleClass = i % 2 === 0 ? "bg-cyan-500/50" : "bg-pink-500/40";
        }

        particle.className = `absolute rounded-full ${particleClass}`;
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

    // Scanline animation
    if (scanlineRef.current) {
      animate(scanlineRef.current, {
        translateY: ["-100%", "200vh"],
        duration: 3000,
        ease: "linear",
        loop: true,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color]);
}
