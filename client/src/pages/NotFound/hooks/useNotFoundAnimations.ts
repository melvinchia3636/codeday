import { useEffect, type RefObject } from "react";
import { animate, createTimeline, stagger, random } from "animejs";

interface UseNotFoundAnimationsProps {
  containerRef: RefObject<HTMLDivElement | null>;
  errorCodeRef: RefObject<HTMLDivElement | null>;
  glowRef: RefObject<HTMLDivElement | null>;
  messageRef: RefObject<HTMLDivElement | null>;
  errorLogRef: RefObject<HTMLDivElement | null>;
  buttonsRef: RefObject<HTMLDivElement | null>;
  topLineRef: RefObject<HTMLDivElement | null>;
  bottomLineRef: RefObject<HTMLDivElement | null>;
  orbsRef: RefObject<HTMLDivElement[]>;
  cornersRef: RefObject<HTMLDivElement[]>;
  sideBarsLeftRef: RefObject<HTMLDivElement[]>;
  sideBarsRightRef: RefObject<HTMLDivElement[]>;
  particlesRef: RefObject<HTMLDivElement | null>;
  dataStreamsRef: RefObject<HTMLDivElement | null>;
  scanlineRef: RefObject<HTMLDivElement | null>;
  glitchOverlayRef: RefObject<HTMLDivElement | null>;
  pulseRingsRef: RefObject<HTMLDivElement[]>;
  warningBarsRef: RefObject<HTMLDivElement[]>;
  noiseCanvasRef: RefObject<HTMLCanvasElement | null>;
}

export function useNotFoundAnimations(props: UseNotFoundAnimationsProps) {
  const {
    containerRef,
    errorCodeRef,
    glowRef,
    messageRef,
    errorLogRef,
    buttonsRef,
    topLineRef,
    bottomLineRef,
    orbsRef,
    cornersRef,
    sideBarsLeftRef,
    sideBarsRightRef,
    particlesRef,
    dataStreamsRef,
    scanlineRef,
    glitchOverlayRef,
    pulseRingsRef,
    warningBarsRef,
    noiseCanvasRef,
  } = props;

  useEffect(() => {
    if (!containerRef.current) return;

    // TV Noise effect
    let noiseAnimationId: number;
    if (noiseCanvasRef.current) {
      const canvas = noiseCanvasRef.current;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const resizeCanvas = () => {
          canvas.width = window.innerWidth;
          canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        const generateNoise = () => {
          const imageData = ctx.createImageData(canvas.width, canvas.height);
          const data = imageData.data;
          for (let i = 0; i < data.length; i += 4) {
            const value = Math.random() * 255;
            data[i] = value;
            data[i + 1] = value;
            data[i + 2] = value;
            data[i + 3] = Math.random() * 50;
          }
          ctx.putImageData(imageData, 0, 0);
          noiseAnimationId = requestAnimationFrame(generateNoise);
        };
        generateNoise();
      }
    }

    // Crazy page-wide glitch effect
    const pageGlitchInterval = setInterval(() => {
      if (containerRef.current && Math.random() > 0.2) {
        const intensity = Math.random() * 2 + 0.5;
        animate(containerRef.current, {
          translateX: [
            0,
            random(-50, 50) * intensity,
            random(-30, 30),
            random(-15, 15),
            0,
          ],
          translateY: [0, random(-30, 30) * intensity, random(-15, 15), 0],
          skewX: [0, random(-15, 15) * intensity, random(-8, 8), 0],
          skewY: [0, random(-5, 5) * intensity, 0],
          rotate: [0, random(-3, 3), 0],
          filter: [
            "hue-rotate(0deg) saturate(1) brightness(1)",
            `hue-rotate(${random(-120, 120)}deg) saturate(${random(
              0.3,
              3
            )}) brightness(${random(0.7, 1.5)})`,
            `hue-rotate(${random(-60, 60)}deg) saturate(${random(0.5, 2)})`,
            "hue-rotate(0deg) saturate(1) brightness(1)",
          ],
          duration: random(30, 100),
          ease: "inOutQuad",
        });
      }
    }, random(80, 300));

    // Horizontal line distortion
    const distortionInterval = setInterval(() => {
      if (containerRef.current && Math.random() > 0.5) {
        const lines = document.querySelectorAll(".glitch-line");
        lines.forEach((line) => {
          (line as HTMLElement).style.top = `${random(0, 100)}%`;
          (line as HTMLElement).style.opacity = String(random(0.3, 1));
          (line as HTMLElement).style.height = `${random(1, 8)}px`;
        });
      }
    }, random(100, 300));

    // RGB split effect on random intervals
    const rgbSplitInterval = setInterval(() => {
      if (containerRef.current && Math.random() > 0.6) {
        containerRef.current.style.textShadow = `
          ${random(-5, 5)}px 0 rgba(255,0,0,0.5),
          ${random(-5, 5)}px 0 rgba(0,255,0,0.5),
          ${random(-5, 5)}px 0 rgba(0,0,255,0.5)
        `;
        setTimeout(() => {
          if (containerRef.current)
            containerRef.current.style.textShadow = "none";
        }, random(50, 150));
      }
    }, random(800, 2000));

    const tl = createTimeline({ defaults: { ease: "outExpo" } });

    // Container entrance
    tl.add(containerRef.current, {
      opacity: [0, 1],
      scale: [0.95, 1],
      duration: 800,
    });

    // Lines
    const lines = [topLineRef.current, bottomLineRef.current].filter(
      Boolean
    ) as HTMLDivElement[];
    if (lines.length > 0)
      tl.add(
        lines,
        { scaleX: [0, 1], duration: 1000, ease: "outExpo" },
        "-=600"
      );

    // Error code massive entrance with glitch
    if (errorCodeRef.current) {
      tl.add(
        errorCodeRef.current,
        {
          opacity: [0, 1],
          scale: [0.5, 1.1, 1],
          rotateX: [90, 0],
          duration: 1200,
          ease: "outElastic(1, .5)",
        },
        "-=600"
      );

      // Continuous glitch
      const glitchInterval = setInterval(() => {
        if (errorCodeRef.current) {
          animate(errorCodeRef.current, {
            translateX: [
              0,
              random(-30, 30),
              random(-20, 20),
              random(-10, 10),
              0,
            ],
            translateY: [0, random(-20, 20), random(-10, 10), 0],
            skewX: [0, random(-10, 10), random(-5, 5), 0],
            skewY: [0, random(-5, 5), 0],
            scale: [1, random(0.95, 1.08), 1],
            filter: [
              "hue-rotate(0deg) brightness(1)",
              `hue-rotate(${random(-90, 90)}deg) brightness(${random(
                0.8,
                1.4
              )})`,
              `hue-rotate(${random(-45, 45)}deg)`,
              "hue-rotate(0deg) brightness(1)",
            ],
            duration: 80,
            ease: "inOutQuad",
          });
        }
      }, random(300, 800));

      // Text shadow glitch
      animate(errorCodeRef.current, {
        textShadow: [
          "0 0 0 transparent",
          "-12px 0 0 rgba(34,211,238,0.9), 12px 0 0 rgba(236,72,153,0.9)",
          "8px 5px 0 rgba(255,0,0,0.7), -8px -5px 0 rgba(0,255,255,0.7)",
          "-15px 0 0 rgba(34,211,238,0.8), 15px 0 0 rgba(236,72,153,0.8)",
          "0 0 0 transparent",
        ],
        duration: 120,
        delay: 200,
        loop: true,
        direction: "alternate",
      });

      setTimeout(() => clearInterval(glitchInterval), 60000);
    }

    // Glow pulse
    if (glowRef.current) {
      animate(glowRef.current, {
        opacity: [0.2, 0.8, 0.2],
        scale: [0.9, 1.1, 0.9],
        duration: 2000,
        ease: "inOutSine",
        loop: true,
      });
    }

    // Message stagger
    if (messageRef.current) {
      tl.add(
        messageRef.current.querySelectorAll(".message-item"),
        {
          opacity: [0, 1],
          translateY: [30, 0],
          delay: stagger(100),
          duration: 600,
        },
        "-=800"
      );
    }

    // Error log typing effect
    if (errorLogRef.current) {
      tl.add(
        errorLogRef.current,
        { opacity: [0, 1], translateY: [20, 0], duration: 600 },
        "-=400"
      );
      const logLines = errorLogRef.current.querySelectorAll(".log-line");
      animate(logLines, {
        opacity: [0, 1],
        translateX: [-20, 0],
        delay: stagger(150, { start: 1000 }),
        duration: 400,
      });
    }

    // Buttons entrance
    if (buttonsRef.current) {
      tl.add(
        buttonsRef.current.querySelectorAll(".action-btn"),
        {
          opacity: [0, 1],
          translateY: [30, 0],
          scale: [0.8, 1],
          delay: stagger(150),
          duration: 600,
          ease: "outBack",
        },
        "-=200"
      );
    }

    // Orbs floating
    orbsRef.current.forEach((orb, i) => {
      if (orb) {
        animate(orb, {
          translateX: [0, random(-40, 40)],
          translateY: [0, random(-40, 40)],
          scale: [1, random(0.8, 1.3)],
          opacity: [0.3, random(0.1, 0.5)],
          duration: random(3000, 6000),
          ease: "inOutSine",
          loop: true,
          alternate: true,
          delay: i * 300,
        });
        animate(orb, {
          boxShadow: [
            "0 0 50px rgba(236,72,153,0.3)",
            "0 0 100px rgba(34,211,238,0.5)",
            "0 0 50px rgba(236,72,153,0.3)",
          ],
          duration: random(2000, 4000),
          ease: "inOutSine",
          loop: true,
          delay: i * 200,
        });
      }
    });

    // Corners
    cornersRef.current.forEach((corner, i) => {
      if (corner) {
        animate(corner, {
          opacity: [0, 1],
          scale: [0.3, 1],
          rotate: [90, 0],
          duration: 800,
          delay: 800 + i * 150,
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
    sideBarsLeftRef.current.forEach((bar, i) => {
      if (bar) {
        animate(bar, {
          scaleY: [0, 1],
          opacity: [0, 1],
          duration: 500,
          delay: 1000 + i * 80,
          ease: "outExpo",
        });
        setTimeout(() => {
          animate(bar, {
            scaleY: [1, 0.3, 1],
            opacity: [1, 0.5, 1],
            duration: 1500,
            delay: i * 100,
            ease: "inOutSine",
            loop: true,
          });
        }, 1500 + i * 80);
      }
    });
    sideBarsRightRef.current.forEach((bar, i) => {
      if (bar) {
        animate(bar, {
          scaleY: [0, 1],
          opacity: [0, 1],
          duration: 500,
          delay: 1000 + i * 80,
          ease: "outExpo",
        });
        setTimeout(() => {
          animate(bar, {
            scaleY: [1, 0.3, 1],
            opacity: [1, 0.5, 1],
            duration: 1500,
            delay: i * 100,
            ease: "inOutSine",
            loop: true,
          });
        }, 1500 + i * 80);
      }
    });

    // Particles
    if (particlesRef.current) {
      for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        const size = random(2, 6);
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
          translateY: [0, random(-200, -400)],
          translateX: [0, random(-100, 100)],
          opacity: [1, 0],
          scale: [1, 0],
          duration: random(3000, 7000),
          ease: "outExpo",
          loop: true,
          delay: random(0, 3000),
        });
      }
    }

    // Data streams
    if (dataStreamsRef.current) {
      for (let i = 0; i < 15; i++) {
        const stream = document.createElement("div");
        stream.className =
          "absolute h-px bg-gradient-to-r from-transparent via-pink-500/60 to-transparent";
        stream.style.width = `${random(80, 200)}px`;
        stream.style.left = `${random(-20, 100)}%`;
        stream.style.top = `${random(0, 100)}%`;
        dataStreamsRef.current.appendChild(stream);
        animate(stream, {
          translateX: [0, window.innerWidth + 200],
          opacity: [0, 1, 0],
          duration: random(2000, 4000),
          ease: "linear",
          loop: true,
          delay: random(0, 2000),
        });
      }
    }

    // Scanline
    if (scanlineRef.current) {
      animate(scanlineRef.current, {
        translateY: ["-100%", "200vh"],
        duration: 2500,
        ease: "linear",
        loop: true,
      });
    }

    // Glitch overlay
    const overlayGlitch = setInterval(() => {
      if (glitchOverlayRef.current) {
        animate(glitchOverlayRef.current, {
          opacity: [0, 0.4, 0],
          translateX: [0, random(-15, 15), 0],
          skewX: [0, random(-3, 3), 0],
          duration: 100,
          ease: "inOutQuad",
        });
      }
    }, random(2000, 5000));

    // Pulse rings
    pulseRingsRef.current.forEach((ring, i) => {
      if (ring)
        animate(ring, {
          scale: [0.5, 3],
          opacity: [0.8, 0],
          duration: 3000 + i * 500,
          delay: i * 800,
          ease: "outExpo",
          loop: true,
        });
    });

    // Warning bars
    warningBarsRef.current.forEach((bar, i) => {
      if (bar) {
        animate(bar, {
          opacity: [0, 1],
          scaleX: [0, 1],
          duration: 400,
          delay: 1200 + i * 100,
          ease: "outExpo",
        });
        setTimeout(() => {
          animate(bar, {
            opacity: [1, 0.3, 1],
            duration: 1000,
            delay: i * 150,
            ease: "inOutSine",
            loop: true,
          });
        }, 1600 + i * 100);
      }
    });

    return () => {
      clearInterval(overlayGlitch);
      clearInterval(pageGlitchInterval);
      clearInterval(distortionInterval);
      clearInterval(rgbSplitInterval);
      if (noiseAnimationId) cancelAnimationFrame(noiseAnimationId);
    };
  }, []);
}

export function useButtonAnimations() {
  const handleButtonHover = (selector: string, color: string) => {
    animate(selector, {
      scale: 1.05,
      boxShadow: `0 0 40px ${color}`,
      duration: 200,
      ease: "outQuad",
    });
  };

  const handleButtonLeave = (selector: string) => {
    animate(selector, {
      scale: 1,
      boxShadow: "0 0 0 transparent",
      duration: 200,
      ease: "outQuad",
    });
  };

  return { handleButtonHover, handleButtonLeave };
}
