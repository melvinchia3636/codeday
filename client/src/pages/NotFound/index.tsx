import { useRef } from "react";
import {
  useNotFoundAnimations,
  useButtonAnimations,
} from "./hooks/useNotFoundAnimations";
import { PageDecorations } from "./components/PageDecorations";
import { ErrorDisplay } from "./components/ErrorDisplay";
import { ActionButtons } from "./components/ActionButtons";

export function NotFound() {
  const containerRef = useRef<HTMLDivElement>(null);
  const errorCodeRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);
  const errorLogRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const topLineRef = useRef<HTMLDivElement>(null);
  const bottomLineRef = useRef<HTMLDivElement>(null);
  const orbsRef = useRef<HTMLDivElement[]>([]);
  const cornersRef = useRef<HTMLDivElement[]>([]);
  const sideBarsLeftRef = useRef<HTMLDivElement[]>([]);
  const sideBarsRightRef = useRef<HTMLDivElement[]>([]);
  const particlesRef = useRef<HTMLDivElement>(null);
  const dataStreamsRef = useRef<HTMLDivElement>(null);
  const scanlineRef = useRef<HTMLDivElement>(null);
  const glitchOverlayRef = useRef<HTMLDivElement>(null);
  const pulseRingsRef = useRef<HTMLDivElement[]>([]);
  const warningBarsRef = useRef<HTMLDivElement[]>([]);
  const noiseCanvasRef = useRef<HTMLCanvasElement>(null);

  useNotFoundAnimations({
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
  });

  const { handleButtonHover, handleButtonLeave } = useButtonAnimations();

  return (
    <div
      ref={containerRef}
      className="flex-1 flex items-center justify-center border-[8px] border-pink-500 p-4 shadow-[0_0_30px_rgba(236,72,153,0.5)] bg-gradient-to-br from-zinc-900 via-zinc-950 to-fuchsia-950/30 relative overflow-hidden"
      style={{ opacity: 0, perspective: "1500px" }}
    >
      <PageDecorations
        noiseCanvasRef={noiseCanvasRef}
        particlesRef={particlesRef}
        dataStreamsRef={dataStreamsRef}
        scanlineRef={scanlineRef}
        glitchOverlayRef={glitchOverlayRef}
        topLineRef={topLineRef}
        bottomLineRef={bottomLineRef}
        orbsRef={orbsRef}
        pulseRingsRef={pulseRingsRef}
        cornersRef={cornersRef}
        sideBarsLeftRef={sideBarsLeftRef}
        sideBarsRightRef={sideBarsRightRef}
      />

      <div className="relative z-10 text-center max-w-2xl">
        <ErrorDisplay
          errorCodeRef={errorCodeRef}
          glowRef={glowRef}
          messageRef={messageRef}
          errorLogRef={errorLogRef}
        />

        <ActionButtons
          buttonsRef={buttonsRef}
          warningBarsRef={warningBarsRef}
          handleButtonHover={handleButtonHover}
          handleButtonLeave={handleButtonLeave}
        />
      </div>
    </div>
  );
}
