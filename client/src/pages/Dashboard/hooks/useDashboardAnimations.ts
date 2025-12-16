import { useEffect, type RefObject } from "react";
import { animate, createTimeline, stagger, random } from "animejs";

interface UseDashboardAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  mainPanelRef: RefObject<HTMLElement | null>;
  particlesRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
  dataStreamRef: RefObject<HTMLDivElement | null>;
  hexGridRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  sideBarsTopRef: RefObject<HTMLDivElement[]>;
  sideBarsBottomRef: RefObject<HTMLDivElement[]>;
  neonLinesRef: RefObject<HTMLDivElement[]>;
  hologramRingsRef: RefObject<HTMLDivElement[]>;
  circuitLinesRef: RefObject<HTMLDivElement[]>;
  headerRef: RefObject<HTMLDivElement | null>;
  cardsContainerRef: RefObject<HTMLDivElement | null>;
  timelinePanelRef: RefObject<HTMLDivElement | null>;
  waifuPanelRef: RefObject<HTMLElement | null>;
  bottomBarRef: RefObject<HTMLElement | null>;
  matrixRainRef: RefObject<HTMLDivElement | null>;
  pulseRingsRef: RefObject<HTMLDivElement[]>;
  energyFieldRef: RefObject<HTMLDivElement | null>;
  cyberGridRef: RefObject<HTMLDivElement | null>;
}

export function useDashboardAnimations(props: UseDashboardAnimationsProps) {
  const {
    containerRef,
    mainPanelRef,
    particlesRef,
    scanlineRef,
    glitchOverlayRef,
    dataStreamRef,
    hexGridRef,
    orbsRef,
    cornersRef,
    sideBarsTopRef,
    sideBarsBottomRef,
    neonLinesRef,
    hologramRingsRef,
    circuitLinesRef,
    headerRef,
    cardsContainerRef,
    timelinePanelRef,
    waifuPanelRef,
    bottomBarRef,
    matrixRainRef,
    pulseRingsRef,
    energyFieldRef,
    cyberGridRef,
  } = props;

  useEffect(() => {
    if (!containerRef.current || !mainPanelRef.current) return;

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    // Container entrance
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.9, 1],
      rotateX: [5, 0],
      duration: 1200,
    });

    // Main panel slide
    tl.add(
      mainPanelRef.current,
      { opacity: [0, 1], translateX: [-50, 0], skewX: [5, 0], duration: 1000 },
      "-=800"
    );

    // Header entrance
    if (headerRef.current) {
      tl.add(
        headerRef.current,
        {
          opacity: [0, 1],
          translateY: [-30, 0],
          scale: [0.95, 1],
          duration: 800,
        },
        "-=600"
      );
    }

    // Cards stagger entrance
    if (cardsContainerRef.current) {
      const cards = cardsContainerRef.current.querySelectorAll(".stat-card");
      if (cards.length > 0) {
        tl.add(
          cards,
          {
            opacity: [0, 1],
            rotateY: [90, 0],
            translateZ: [100, 0],
            delay: stagger(150),
            duration: 800,
          },
          "-=400"
        );
      }
    }

    // Timeline panel
    if (timelinePanelRef.current) {
      tl.add(
        timelinePanelRef.current,
        { opacity: [0, 1], translateY: [50, 0], duration: 800 },
        "-=400"
      );
    }

    // Waifu panel
    if (waifuPanelRef.current) {
      tl.add(
        waifuPanelRef.current,
        {
          opacity: [0, 1],
          translateX: [100, 0],
          scale: [0.8, 1],
          duration: 1000,
          ease: "outElastic(1, .6)",
        },
        "-=600"
      );
    }

    // Bottom bar
    if (bottomBarRef.current) {
      tl.add(
        bottomBarRef.current,
        { opacity: [0, 1], translateY: [30, 0], duration: 600 },
        "-=300"
      );
    }

    // Matrix rain
    if (matrixRainRef.current) {
      const chars =
        "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789";
      for (let i = 0; i < 50; i++) {
        const column = document.createElement("div");
        column.className =
          "absolute text-pink-500/20 text-xs whitespace-nowrap";
        column.style.left = `${random(0, 100)}%`;
        column.style.top = `-${random(0, 200)}px`;
        let text = "";
        for (let j = 0; j < random(10, 30); j++)
          text += chars[Math.floor(Math.random() * chars.length)] + "\n";
        column.style.writingMode = "vertical-rl";
        column.textContent = text;
        matrixRainRef.current.appendChild(column);
        animate(column, {
          translateY: [0, window.innerHeight + 300],
          opacity: [0.5, 0],
          duration: random(4000, 8000),
          ease: "linear",
          loop: true,
          delay: random(0, 3000),
        });
      }
    }

    // Floating particles
    if (particlesRef.current) {
      for (let i = 0; i < 60; i++) {
        const particle = document.createElement("div");
        const size = random(2, 6);
        particle.className = `absolute rounded-full ${
          i % 3 === 0
            ? "bg-pink-500/40"
            : i % 3 === 1
            ? "bg-cyan-500/40"
            : "bg-fuchsia-500/40"
        }`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${random(0, 100)}%`;
        particle.style.top = `${random(0, 100)}%`;
        particle.style.boxShadow = `0 0 ${size * 2}px currentColor`;
        particlesRef.current.appendChild(particle);
        animate(particle, {
          translateY: [0, random(-150, -300)],
          translateX: [0, random(-80, 80)],
          opacity: [0.8, 0],
          scale: [1, 0],
          duration: random(4000, 8000),
          ease: "outExpo",
          loop: true,
          delay: random(0, 4000),
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

    // Hex grid
    if (hexGridRef.current) {
      for (let i = 0; i < 30; i++) {
        const hex = document.createElement("div");
        hex.className = "absolute border border-pink-500/10 rotate-45";
        hex.style.width = `${random(20, 60)}px`;
        hex.style.height = `${random(20, 60)}px`;
        hex.style.left = `${random(0, 100)}%`;
        hex.style.top = `${random(0, 100)}%`;
        hexGridRef.current.appendChild(hex);
        animate(hex, {
          opacity: [0.1, 0.5, 0.1],
          scale: [0.8, 1.2, 0.8],
          rotate: [45, 225, 45],
          duration: random(4000, 8000),
          ease: "inOutSine",
          loop: true,
          delay: random(0, 2000),
        });
      }
    }

    // Data streams
    if (dataStreamRef.current) {
      for (let i = 0; i < 20; i++) {
        const stream = document.createElement("div");
        stream.className =
          "absolute h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent";
        stream.style.width = `${random(50, 200)}px`;
        stream.style.left = `${random(-20, 100)}%`;
        stream.style.top = `${random(0, 100)}%`;
        dataStreamRef.current.appendChild(stream);
        animate(stream, {
          translateX: [0, window.innerWidth],
          opacity: [0, 1, 0],
          duration: random(2000, 5000),
          ease: "linear",
          loop: true,
          delay: random(0, 3000),
        });
      }
    }

    // Corner brackets
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
    sideBarsTopRef.current.forEach((bar, i) => {
      if (bar) {
        animate(bar, {
          scaleX: [0, 1],
          opacity: [0, 1],
          translateX: [-20, 0],
          duration: 600,
          delay: 1000 + i * 100,
          ease: "outExpo",
        });
        setTimeout(() => {
          animate(bar, {
            scaleX: [1, 0.5, 1],
            opacity: [1, 0.5, 1],
            duration: 2000,
            delay: i * 150,
            ease: "inOutSine",
            loop: true,
          });
        }, 1600 + i * 100);
      }
    });

    sideBarsBottomRef.current.forEach((bar, i) => {
      if (bar) {
        animate(bar, {
          scaleX: [0, 1],
          opacity: [0, 1],
          translateX: [20, 0],
          duration: 600,
          delay: 1000 + i * 100,
          ease: "outExpo",
        });
        setTimeout(() => {
          animate(bar, {
            scaleX: [1, 0.5, 1],
            opacity: [1, 0.5, 1],
            duration: 2000,
            delay: i * 150,
            ease: "inOutSine",
            loop: true,
          });
        }, 1600 + i * 100);
      }
    });

    // Neon lines
    neonLinesRef.current.forEach((line, i) => {
      if (line) {
        animate(line, {
          scaleX: [0, 1],
          opacity: [0, 1],
          duration: 1000,
          delay: 800 + i * 200,
          ease: "outExpo",
        });
        setTimeout(() => {
          animate(line, {
            opacity: [1, 0.3, 1],
            boxShadow: [
              "0 0 10px rgba(236,72,153,0.5)",
              "0 0 30px rgba(34,211,238,0.8)",
              "0 0 10px rgba(236,72,153,0.5)",
            ],
            duration: 3000,
            ease: "inOutSine",
            loop: true,
            delay: i * 400,
          });
        }, 1800 + i * 200);
      }
    });

    // Hologram rings
    hologramRingsRef.current.forEach((ring, i) => {
      if (ring) {
        animate(ring, {
          scale: [0, 1],
          opacity: [0, 0.5],
          rotate: [0, 360],
          duration: 2000,
          delay: 1200 + i * 300,
          ease: "outExpo",
        });
        setTimeout(() => {
          animate(ring, {
            rotate: [0, 360],
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.2, 0.5],
            duration: 8000 + i * 1000,
            ease: "linear",
            loop: true,
          });
        }, 3200 + i * 300);
      }
    });

    // Circuit lines
    circuitLinesRef.current.forEach((circuit, i) => {
      if (circuit)
        animate(circuit, {
          strokeDashoffset: [1000, 0],
          opacity: [0, 1],
          duration: 2000,
          delay: 1500 + i * 200,
          ease: "outExpo",
        });
    });

    // Pulse rings
    pulseRingsRef.current.forEach((ring, i) => {
      if (ring)
        animate(ring, {
          scale: [0.5, 2],
          opacity: [0.8, 0],
          duration: 3000,
          delay: i * 1000,
          ease: "outExpo",
          loop: true,
        });
    });

    // Floating orbs
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

    // Energy field
    if (energyFieldRef.current) {
      animate(energyFieldRef.current, {
        background: [
          "radial-gradient(ellipse at center, rgba(236,72,153,0.1) 0%, transparent 70%)",
          "radial-gradient(ellipse at center, rgba(34,211,238,0.15) 0%, transparent 70%)",
          "radial-gradient(ellipse at center, rgba(168,85,247,0.1) 0%, transparent 70%)",
          "radial-gradient(ellipse at center, rgba(236,72,153,0.1) 0%, transparent 70%)",
        ],
        duration: 5000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Cyber grid
    if (cyberGridRef.current) {
      animate(cyberGridRef.current, {
        backgroundPosition: ["0px 0px", "40px 40px"],
        duration: 2000,
        ease: "linear",
        loop: true,
      });
    }

    // Glitch effects
    const glitchInterval = setInterval(() => {
      if (glitchOverlayRef.current)
        animate(glitchOverlayRef.current, {
          opacity: [0, 0.3, 0],
          translateX: [0, random(-10, 10), 0],
          skewX: [0, random(-2, 2), 0],
          duration: 150,
          ease: "inOutQuad",
        });
      if (mainPanelRef.current && Math.random() > 0.7)
        animate(mainPanelRef.current, {
          translateX: [0, random(-3, 3), 0],
          filter: [
            "hue-rotate(0deg)",
            `hue-rotate(${random(-20, 20)}deg)`,
            "hue-rotate(0deg)",
          ],
          duration: 100,
          ease: "inOutQuad",
        });
    }, random(3000, 6000));

    // Card floating
    const floatInterval = setInterval(() => {
      if (cardsContainerRef.current) {
        const cards = cardsContainerRef.current.querySelectorAll(".stat-card");
        cards.forEach((card, i) =>
          animate(card, {
            translateY: [0, random(-5, 5), 0],
            duration: 2000,
            delay: i * 200,
            ease: "inOutSine",
          })
        );
      }
    }, 4000);

    // Border glow
    animate(".dashboard-border", {
      boxShadow: [
        "0 0 30px rgba(236,72,153,0.5), inset 0 0 30px rgba(236,72,153,0.1)",
        "0 0 60px rgba(34,211,238,0.6), inset 0 0 60px rgba(34,211,238,0.15)",
        "0 0 30px rgba(236,72,153,0.5), inset 0 0 30px rgba(236,72,153,0.1)",
      ],
      duration: 4000,
      ease: "inOutSine",
      loop: true,
    });

    return () => {
      clearInterval(glitchInterval);
      clearInterval(floatInterval);
    };
  }, []);
}
