import { useEffect } from "react";
import { animate, stagger } from "animejs";
import { useChatAnimationRefs } from "../contexts/ChatAnimationsContext";

export function useChatAnimations() {
  const { containerRef, messagesRef, inputRef, avatarRef } =
    useChatAnimationRefs();

  useEffect(() => {
    // Container entrance
    if (containerRef.current) {
      animate(containerRef.current, {
        opacity: [0, 1],
        scale: [0.95, 1],
        duration: 800,
        ease: "outExpo",
      });
    }

    // Avatar entrance with bounce
    if (avatarRef.current) {
      animate(avatarRef.current, {
        opacity: [0, 1],
        translateY: [-50, 0],
        scale: [0.5, 1.1, 1],
        duration: 1000,
        delay: 300,
        ease: "outElastic(1, 0.5)",
      });

      // Continuous floating animation
      setTimeout(() => {
        if (avatarRef.current) {
          animate(avatarRef.current, {
            translateY: [0, -10, 0],
            rotate: [-2, 2, -2],
            duration: 4000,
            ease: "inOutSine",
            loop: true,
          });
        }
      }, 1300);
    }

    // Messages container
    if (messagesRef.current) {
      animate(messagesRef.current, {
        opacity: [0, 1],
        translateX: [-30, 0],
        duration: 600,
        delay: 400,
        ease: "outExpo",
      });

      // Animate existing messages
      const messages = messagesRef.current.querySelectorAll(".chat-message");
      if (messages.length > 0) {
        animate(messages, {
          opacity: [0, 1],
          translateY: [20, 0],
          scale: [0.9, 1],
          delay: stagger(100, { start: 600 }),
          duration: 400,
          ease: "outBack",
        });
      }
    }

    // Input area
    if (inputRef.current) {
      animate(inputRef.current, {
        opacity: [0, 1],
        translateY: [30, 0],
        duration: 600,
        delay: 600,
        ease: "outExpo",
      });

      // Glow pulse effect
      setTimeout(() => {
        if (inputRef.current) {
          animate(inputRef.current, {
            boxShadow: [
              "0 0 20px rgba(236,72,153,0.3)",
              "0 0 40px rgba(34,211,238,0.4)",
              "0 0 20px rgba(236,72,153,0.3)",
            ],
            duration: 3000,
            ease: "inOutSine",
            loop: true,
          });
        }
      }, 1200);
    }
  }, [containerRef, messagesRef, inputRef, avatarRef]);
}
