import {
  createContext,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useHydrationAnimations } from "../hooks/useHydrationAnimations";

interface HydrationAnimationRefs {
  containerRef: RefObject<HTMLDivElement | null>;
  tankRef: RefObject<HTMLDivElement | null>;
  statsRef: RefObject<HTMLDivElement | null>;
  historyRef: RefObject<HTMLDivElement | null>;
  logRef: RefObject<HTMLDivElement | null>;
  bubblesRef: RefObject<HTMLDivElement | null>;
}

interface HydrationAnimationsContextType extends HydrationAnimationRefs {
  isAnimationsReady: boolean;
}

const HydrationAnimationsContext = createContext<
  HydrationAnimationsContextType | undefined
>(undefined);

interface HydrationAnimationsProviderProps {
  children: ReactNode;
}

export function HydrationAnimationsProvider({
  children,
}: HydrationAnimationsProviderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const tankRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<HTMLDivElement>(null);
  const logRef = useRef<HTMLDivElement>(null);

  const bubblesRef = useRef<HTMLDivElement>(null);

  useHydrationAnimations({
    containerRef,
    tankRef,
    statsRef,
    historyRef,
    logRef,
    bubblesRef,
  });

  const value: HydrationAnimationsContextType = {
    containerRef,
    tankRef,
    statsRef,
    historyRef,
    logRef,
    bubblesRef,
    isAnimationsReady: true,
  };

  return (
    <HydrationAnimationsContext.Provider value={value}>
      {children}
    </HydrationAnimationsContext.Provider>
  );
}

export function useHydrationAnimationRefs(): HydrationAnimationsContextType {
  const context = useContext(HydrationAnimationsContext);
  if (context === undefined) {
    throw new Error(
      "useHydrationAnimationRefs must be used within a HydrationAnimationsProvider"
    );
  }
  return context;
}
